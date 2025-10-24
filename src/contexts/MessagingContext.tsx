import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { socket } from '@/lib/socket';
import { mockLawyers, type Lawyer } from '@/lib/mockData';

interface ChatMessage {
  id: string;
  text: string;
  senderId: string;
  recipientId: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  partnerId: string;
  messages: ChatMessage[];
  lastMessage?: string;
  timestamp?: string;
  unread: number;
}

interface MessagingContextType {
  isMessageBarExpanded: boolean;
  setIsMessageBarExpanded: (expanded: boolean) => void;
  selectedPartnerId: string | null;
  setSelectedPartnerId: (partnerId: string | null) => void;
  conversations: Record<string, Conversation>;
  addMessage: (partnerId: string, text: string) => void;
  openConversation: (lawyer: Lawyer) => boolean;
  currentUser: Lawyer | null;
  registeredLawyers: Lawyer[];
  onlineLawyerIds: string[];
}

const MessagingContext = createContext<MessagingContextType | null>(null);

const buildConversationId = (userA: string, userB: string) => [userA, userB].sort().join(':');

const generateMessageId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const MessagingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const registeredLawyers = useMemo<Lawyer[]>(() => {
    const verifiedOnly = mockLawyers.filter((lawyer) => lawyer.verified);
    return verifiedOnly.length > 0 ? verifiedOnly : mockLawyers;
  }, []);
  const currentUser = useMemo(() => registeredLawyers[0] ?? null, [registeredLawyers]);

  const [isMessageBarExpanded, setIsMessageBarExpanded] = useState(false);
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Record<string, Conversation>>({});
  const [onlineLawyerIds, setOnlineLawyerIds] = useState<string[]>([]);

  const registeredLawyerIds = useMemo(
    () => new Set(registeredLawyers.map((lawyer) => lawyer.id)),
    [registeredLawyers]
  );

  const selectedPartnerRef = useRef<string | null>(null);
  const barExpandedRef = useRef(false);

  useEffect(() => {
    selectedPartnerRef.current = selectedPartnerId;
  }, [selectedPartnerId]);

  useEffect(() => {
    barExpandedRef.current = isMessageBarExpanded;
  }, [isMessageBarExpanded]);

  useEffect(() => {
    if (!currentUser) {
      return () => undefined;
    }

    if (!socket.connected) {
      socket.connect();
    }

    const handleConnect = () => {
      socket.emit('join', { userId: currentUser.id });
    };

    const handlePresenceUpdate = (ids: string[]) => {
      setOnlineLawyerIds(ids);
    };

    const handleIncomingMessage = ({
      conversationId,
      message,
    }: {
      conversationId: string;
      message: ChatMessage;
    }) => {
      const partnerId =
        message.senderId === currentUser.id ? message.recipientId : message.senderId;

      if (!partnerId) {
        return;
      }

      setConversations((prev) => {
        const existing = prev[partnerId] ?? {
          id: conversationId,
          partnerId,
          messages: [],
          unread: 0,
        };

        const messageExists = existing.messages.some((item) => item.id === message.id);
        const nextMessages = messageExists ? existing.messages : [...existing.messages, message];
        const isIncoming = message.senderId !== currentUser.id;
        const isActive = barExpandedRef.current && selectedPartnerRef.current === partnerId;

        return {
          ...prev,
          [partnerId]: {
            ...existing,
            id: conversationId,
            partnerId,
            messages: nextMessages,
            lastMessage: message.text,
            timestamp: message.timestamp,
            unread: isIncoming && !isActive ? existing.unread + 1 : isActive ? 0 : existing.unread,
          },
        };
      });
    };

    socket.on('connect', handleConnect);
    socket.on('presence:update', handlePresenceUpdate);
    socket.on('message:receive', handleIncomingMessage);

    if (socket.connected) {
      handleConnect();
    }

    return () => {
      socket.off('connect', handleConnect);
      socket.off('presence:update', handlePresenceUpdate);
      socket.off('message:receive', handleIncomingMessage);
      socket.disconnect();
    };
  }, [currentUser]);

  const addMessage = (partnerId: string, text: string) => {
    if (!currentUser || !registeredLawyerIds.has(partnerId) || !text.trim()) {
      return;
    }

    const conversationId = buildConversationId(currentUser.id, partnerId);
    const outgoingMessage: ChatMessage = {
      id: generateMessageId(),
      text,
      senderId: currentUser.id,
      recipientId: partnerId,
      timestamp: new Date().toISOString(),
    };

    setConversations((prev) => {
      const existing = prev[partnerId] ?? {
        id: conversationId,
        partnerId,
        messages: [],
        unread: 0,
      };

      return {
        ...prev,
        [partnerId]: {
          ...existing,
          id: conversationId,
          messages: [...existing.messages, outgoingMessage],
          lastMessage: outgoingMessage.text,
          timestamp: outgoingMessage.timestamp,
          unread: 0,
        },
      };
    });

    socket.emit('message:send', {
      conversationId,
      message: outgoingMessage,
    });
  };

  const openConversation = (lawyer: Lawyer) => {
    if (!currentUser) {
      return false;
    }

    if (!registeredLawyerIds.has(currentUser.id) || !registeredLawyerIds.has(lawyer.id)) {
      return false;
    }

    const conversationId = buildConversationId(currentUser.id, lawyer.id);

    if (!conversations[lawyer.id]) {
      socket.emit('conversation:history', { conversationId }, (history: ChatMessage[]) => {
        setConversations((prev) => {
          const latest = history.at(-1);
          return {
            ...prev,
            [lawyer.id]: {
              id: conversationId,
              partnerId: lawyer.id,
              messages: history,
              lastMessage: latest?.text,
              timestamp: latest?.timestamp,
              unread: 0,
            },
          };
        });
      });
    } else {
      setConversations((prev) => ({
        ...prev,
        [lawyer.id]: {
          ...prev[lawyer.id],
          unread: 0,
        },
      }));
    }

    setSelectedPartnerId(lawyer.id);
    setIsMessageBarExpanded(true);
    return true;
  };

  return (
    <MessagingContext.Provider
      value={{
        isMessageBarExpanded,
        setIsMessageBarExpanded,
        selectedPartnerId,
        setSelectedPartnerId,
        conversations,
        addMessage,
        openConversation,
        currentUser,
        registeredLawyers,
        onlineLawyerIds,
      }}
    >
      {children}
    </MessagingContext.Provider>
  );
};

export const useMessaging = () => {
  const context = useContext(MessagingContext);
  if (!context) {
    throw new Error('useMessaging must be used within MessagingProvider');
  }
  return context;
};
