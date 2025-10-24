import { io } from 'socket.io-client';

const DEFAULT_URL = 'http://localhost:4000';
const serverUrl = import.meta.env.VITE_CHAT_SERVER_URL || DEFAULT_URL;

export const socket = io(serverUrl, {
  autoConnect: false,
  transports: ['websocket'],
});
