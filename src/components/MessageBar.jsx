import React, { useEffect, useMemo, useRef, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { MoreHorizontal, Edit3, ChevronUp, ChevronDown, Send, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useMessaging } from '@/contexts/MessagingContext';
import { toast } from 'sonner';

const formatTimestampLabel = (timestamp) => {
  if (!timestamp) return 'Just now';
  const parsed = new Date(timestamp);
  if (Number.isNaN(parsed.getTime())) {
    return 'Just now';
  }
  return formatDistanceToNow(parsed, { addSuffix: true });
};

const MessageBar = () => {
  const {
    isMessageBarExpanded,
    setIsMessageBarExpanded,
    selectedPartnerId,
    setSelectedPartnerId,
    conversations,
    addMessage,
    openConversation,
    registeredLawyers,
    onlineLawyerIds,
    currentUser,
  } = useMessaging();

  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messageBarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        messageBarRef.current &&
        !messageBarRef.current.contains(event.target) &&
        isMessageBarExpanded
      ) {
        setIsMessageBarExpanded(false);
        setSelectedPartnerId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMessageBarExpanded, setIsMessageBarExpanded, setSelectedPartnerId]);

  const registeredLawyerMap = useMemo(() => {
    const map = new Map();
    registeredLawyers.forEach((lawyer) => {
      map.set(lawyer.id, lawyer);
    });
    return map;
  }, [registeredLawyers]);

  const onlineSet = useMemo(() => new Set(onlineLawyerIds), [onlineLawyerIds]);

  const conversationList = useMemo(() => {
    return Object.entries(conversations)
      .map(([partnerId, convo]) => {
        const lawyer = registeredLawyerMap.get(partnerId);

        const lastMessageTimestamp =
          convo.timestamp ||
          (convo.messages.length
            ? convo.messages[convo.messages.length - 1].timestamp
            : undefined);

        return {
          id: partnerId,
          lawyer,
          name: lawyer?.name || 'Unknown Lawyer',
          title: lawyer?.specialty || 'Legal Professional',
          avatar: lawyer?.profileImage || '',
          isOnline: onlineSet.has(partnerId),
          lastMessage: convo.lastMessage,
          timestamp: formatTimestampLabel(lastMessageTimestamp),
          timestampIso: lastMessageTimestamp,
          unread: convo.unread,
        };
      })
      .sort((a, b) => {
        const timeA = a.timestampIso ? new Date(a.timestampIso).getTime() : 0;
        const timeB = b.timestampIso ? new Date(b.timestampIso).getTime() : 0;
        return timeB - timeA;
      });
  }, [conversations, registeredLawyerMap, onlineSet]);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredConversations = useMemo(() => {
    if (!normalizedQuery) {
      return conversationList;
    }

    return conversationList.filter((conversation) => {
      const haystack = `${conversation.name} ${conversation.title}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [conversationList, normalizedQuery]);

  const suggestedLawyers = useMemo(() => {
    return registeredLawyers
      .filter((lawyer) => lawyer.id !== currentUser?.id)
      .filter((lawyer) => {
        const inConversation = Boolean(conversations[lawyer.id]);
        if (!normalizedQuery) {
          return !inConversation;
        }
        const haystack = `${lawyer.name} ${lawyer.specialty} ${lawyer.location}`.toLowerCase();
        return haystack.includes(normalizedQuery);
      });
  }, [registeredLawyers, currentUser?.id, conversations, normalizedQuery]);

  const visibleConversations = normalizedQuery ? filteredConversations : conversationList;
  const showSuggestions = visibleConversations.length === 0 && suggestedLawyers.length > 0;

  const toggleMinimized = () => {
    const nextState = !isMessageBarExpanded;
    setIsMessageBarExpanded(nextState);
    if (!nextState) {
      setSelectedPartnerId(null);
      setMessage('');
      setSearchQuery('');
    }
  };

  const handleConversationSelect = (conversation) => {
    setSelectedPartnerId(conversation.id);
    if (!isMessageBarExpanded) {
      setIsMessageBarExpanded(true);
    }
  };

  const handleStartConversation = (lawyer) => {
    const opened = openConversation(lawyer);
    if (!opened) {
      toast.error('Messaging is limited to registered lawyers.');
      return;
    }
    setSearchQuery('');
  };

  const sendMessage = () => {
    if (!selectedPartnerId) {
      return;
    }
    const trimmed = message.trim();
    if (!trimmed) {
      return;
    }
    addMessage(selectedPartnerId, trimmed);
    setMessage('');
  };

  const selectedConversationData = useMemo(() => {
    if (!selectedPartnerId) {
      return null;
    }

    const fromConversation = conversationList.find((item) => item.id === selectedPartnerId);
    if (fromConversation) {
      return fromConversation;
    }

    const lawyer = registeredLawyerMap.get(selectedPartnerId);
    if (!lawyer) {
      return null;
    }

    return {
      id: lawyer.id,
      lawyer,
      name: lawyer.name,
      title: lawyer.specialty,
      avatar: lawyer.profileImage,
      isOnline: onlineSet.has(lawyer.id),
    };
  }, [selectedPartnerId, conversationList, registeredLawyerMap, onlineSet]);

  const selectedMessages = selectedPartnerId
    ? conversations[selectedPartnerId]?.messages ?? []
    : [];

  if (!currentUser?.verified) {
    return null;
  }

  return (
    <div
      className="message-bar-container fixed bottom-4 right-4 z-[9999] max-w-[380px] w-80 sm:w-80 xs:w-72 xs:right-2"
      ref={messageBarRef}
    >
      <div
        className={`message-bar-popup bg-white border border-gray-200 shadow-2xl rounded-lg transition-all duration-300 ease-in-out ${
          !isMessageBarExpanded ? 'h-12' : 'h-96 max-h-[80vh]'
        } ${isMessageBarExpanded ? 'shadow-[0_8px_30px_rgb(0,0,0,0.12)]' : 'shadow-lg'} overflow-hidden`}
      >
        <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 rounded-t-lg relative z-10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="w-8 h-8">
                <AvatarImage src={currentUser.profileImage} />
                <AvatarFallback>
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <span className="text-sm font-medium text-gray-900">Messaging</span>
          </div>

          <div className="flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-gray-100 rounded-full">
                  <MoreHorizontal className="w-4 h-4 text-gray-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onSelect={() => setIsMessageBarExpanded(true)}>
                  View all messages
                </DropdownMenuItem>
                <DropdownMenuItem>Mark all as read</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0 hover:bg-gray-100 rounded-full"
              onClick={() => setSelectedPartnerId(null)}
            >
              <Edit3 className="w-4 h-4 text-gray-600" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0 hover:bg-gray-100 rounded-full"
              onClick={toggleMinimized}
            >
              {!isMessageBarExpanded ? (
                <ChevronUp className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-600" />
              )}
            </Button>
          </div>
        </div>

        {isMessageBarExpanded && (
          <div className="h-80 max-h-[calc(80vh-48px)] flex flex-col bg-white relative">
            {!selectedPartnerId ? (
              <>
                <div className="p-3 border-b border-gray-100 flex-shrink-0">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                    <Input
                      placeholder="Search messages or lawyers"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-8 bg-gray-50 border-gray-200 rounded-full text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <ScrollArea className="flex-1 overflow-hidden">
                  <div className="p-1 space-y-1">
                    {visibleConversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        onClick={() => handleConversationSelect(conversation)}
                        className="flex items-center gap-3 p-2 hover:bg-gray-50 cursor-pointer rounded-lg transition-colors mx-1"
                      >
                        <div className="relative">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={conversation.avatar} alt={conversation.name} />
                            <AvatarFallback>
                              <User className="w-5 h-5" />
                            </AvatarFallback>
                          </Avatar>
                          {conversation.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0 overflow-hidden">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-sm text-gray-900 truncate pr-2">
                              {conversation.name}
                            </h4>
                            <span className="text-xs text-gray-500 flex-shrink-0">{conversation.timestamp}</span>
                          </div>
                          <p className="text-xs text-gray-600 truncate">
                            {conversation.lastMessage || `${conversation.title}  Available for consultation`}
                          </p>
                        </div>

                        {conversation.unread > 0 && (
                          <div className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">
                            {conversation.unread}
                          </div>
                        )}
                      </div>
                    ))}

                    {showSuggestions && (
                      <div className="px-3 py-2">
                        <p className="text-xs uppercase text-gray-400 mb-2">Start a new conversation</p>
                        <div className="space-y-1">
                          {suggestedLawyers.map((lawyer) => (
                            <div
                              key={lawyer.id}
                              onClick={() => handleStartConversation(lawyer)}
                              className="flex items-center gap-3 p-2 hover:bg-gray-50 cursor-pointer rounded-lg transition-colors"
                            >
                              <div className="relative">
                                <Avatar className="w-10 h-10">
                                  <AvatarImage src={lawyer.profileImage} alt={lawyer.name} />
                                  <AvatarFallback>
                                    <User className="w-5 h-5" />
                                  </AvatarFallback>
                                </Avatar>
                                {onlineSet.has(lawyer.id) && (
                                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm text-gray-900 truncate">{lawyer.name}</h4>
                                <p className="text-xs text-gray-600 truncate">{lawyer.specialty}</p>
                              </div>
                              <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">
                                Message
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {!showSuggestions && visibleConversations.length === 0 && (
                      <div className="px-3 py-6 text-center text-sm text-gray-500">
                        No conversations yet. Use search to find a colleague.
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 p-3 border-b border-gray-100 flex-shrink-0 bg-white">
                  <button
                    onClick={() => setSelectedPartnerId(null)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                     Back
                  </button>
                  <div className="relative">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={selectedConversationData?.avatar} />
                      <AvatarFallback>
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    {selectedConversationData?.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-900">{selectedConversationData?.name}</h4>
                    <p className="text-xs text-gray-500">{selectedConversationData?.title}</p>
                  </div>
                </div>

                <ScrollArea className="flex-1 overflow-hidden">
                  <div className="p-3 space-y-3">
                    {selectedMessages.length === 0 && (
                      <div className="text-center text-xs text-gray-500 py-2">
                        Say hello to start the conversation.
                      </div>
                    )}

                    {selectedMessages.map((msg) => {
                      const isMe = msg.senderId === currentUser.id;
                      const timestamp = new Date(msg.timestamp);
                      const timeLabel = Number.isNaN(timestamp.getTime())
                        ? ''
                        : timestamp.toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                          });

                      return (
                        <div key={msg.id} className={`flex gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
                          {!isMe && (
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={selectedConversationData?.avatar} />
                              <AvatarFallback>
                                <User className="w-3 h-3" />
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={`p-2 rounded-lg max-w-[70%] ${
                              isMe
                                ? 'bg-blue-600 text-white rounded-tr-none'
                                : 'bg-gray-100 text-gray-900 rounded-tl-none'
                            }`}
                          >
                            <p className="text-sm">{msg.text}</p>
                            {timeLabel && (
                              <p className={`text-xs mt-1 ${isMe ? 'text-blue-100' : 'text-gray-500'}`}>{timeLabel}</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>

                <div className="p-3 border-t border-gray-100 flex-shrink-0 bg-white">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Write a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                      className="flex-1 h-8 text-sm border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <Button
                      size="sm"
                      onClick={sendMessage}
                      className="h-8 w-8 p-0 bg-blue-600 hover:bg-blue-700 flex-shrink-0"
                      disabled={!message.trim()}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBar;
