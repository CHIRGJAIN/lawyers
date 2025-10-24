import { createServer } from 'http';
import { randomUUID } from 'crypto';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 4000;

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
  transports: ['websocket', 'polling'],
});

const conversations = new Map(); // conversationId -> Message[]
const userRooms = new Map(); // socket.id -> userId

const broadcastPresence = () => {
  const onlineUsers = Array.from(new Set(userRooms.values()));
  io.emit('presence:update', onlineUsers);
};

io.on('connection', (socket) => {
  socket.on('join', ({ userId }) => {
    if (!userId) {
      return;
    }

    userRooms.set(socket.id, userId);
    socket.join(userId);
    broadcastPresence();
  });

  socket.on('conversation:history', ({ conversationId }, callback) => {
    const history = conversations.get(conversationId) || [];
    if (typeof callback === 'function') {
      callback(history);
    }
  });

  socket.on('message:send', ({ conversationId, message }) => {
    if (!conversationId || !message) {
      return;
    }

    const incomingMessage = {
      ...message,
      id: message.id || randomUUID(),
      timestamp: message.timestamp || new Date().toISOString(),
    };

    if (!conversations.has(conversationId)) {
      conversations.set(conversationId, []);
    }

    conversations.get(conversationId).push(incomingMessage);

    const { senderId, recipientId } = incomingMessage;
    if (senderId) {
      io.to(senderId).emit('message:receive', { conversationId, message: incomingMessage });
    }
    if (recipientId) {
      io.to(recipientId).emit('message:receive', { conversationId, message: incomingMessage });
    }
  });

  socket.on('disconnect', () => {
    userRooms.delete(socket.id);
    broadcastPresence();
  });
});

httpServer.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Chat server listening on http://localhost:${PORT}`);
});
