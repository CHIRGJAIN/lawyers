export type Message = {
  id: string
  conversationId: string
  senderId: string
  text: string
  timestamp: string
}

export type Conversation = {
  id: string
  participantId: string
  lastMessage: string
  lastTimestamp: string
  unread: number
}

export const conversations: Conversation[] = [
  {
    id: 'conv-arjun',
    participantId: 'arjun-sengupta',
    lastMessage: 'Will send the bundle for pre-hearing review tonight.',
    lastTimestamp: '2025-10-24T19:42:00.000Z',
    unread: 1,
  },
  {
    id: 'conv-meera',
    participantId: 'meera-joshi',
    lastMessage: 'Uploading the draft policy in the shared drive.',
    lastTimestamp: '2025-10-24T16:05:00.000Z',
    unread: 0,
  },
]

export const messages: Message[] = [
  {
    id: 'msg-1',
    conversationId: 'conv-arjun',
    senderId: 'arjun-sengupta',
    text: 'Quick update: tribunal fixed hearing on 6 Nov. Need your slides by Monday.',
    timestamp: '2025-10-24T19:38:00.000Z',
  },
  {
    id: 'msg-2',
    conversationId: 'conv-arjun',
    senderId: 'priya-menon',
    text: 'Noted. I will circulate the data-room risk heatmap tonight.',
    timestamp: '2025-10-24T19:40:00.000Z',
  },
  {
    id: 'msg-3',
    conversationId: 'conv-arjun',
    senderId: 'arjun-sengupta',
    text: 'Will send the bundle for pre-hearing review tonight.',
    timestamp: '2025-10-24T19:42:00.000Z',
  },
  {
    id: 'msg-4',
    conversationId: 'conv-meera',
    senderId: 'meera-joshi',
    text: 'Sharing POSH handbook updates and sample CEO comms.',
    timestamp: '2025-10-24T16:00:00.000Z',
  },
  {
    id: 'msg-5',
    conversationId: 'conv-meera',
    senderId: 'priya-menon',
    text: 'Great, I will incorporate into the VC portfolio memo.',
    timestamp: '2025-10-24T16:03:00.000Z',
  },
  {
    id: 'msg-6',
    conversationId: 'conv-meera',
    senderId: 'meera-joshi',
    text: 'Uploading the draft policy in the shared drive.',
    timestamp: '2025-10-24T16:05:00.000Z',
  },
]

