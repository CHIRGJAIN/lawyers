import { lawyers, type Lawyer } from './data'

export type Message = {
  id: string
  senderId: string
  text: string
  timestamp: string
}

export type Conversation = {
  id: string
  participant: Lawyer
  messages: Message[]
  unread: number
}

const messageSeeds: Array<Pick<Conversation, 'id' | 'messages'>> = [
  {
    id: 'arjun-singh',
    messages: [
      {
        id: 'msg-1',
        senderId: 'arjun-singh',
        text: 'Let me know if you need the arbitration precedent on construction delay claims.',
        timestamp: '2024-06-17T08:15:00Z',
      },
      {
        id: 'msg-2',
        senderId: 'me',
        text: 'Thanks Arjun, please email the brief. I will review before our client call tomorrow.',
        timestamp: '2024-06-17T08:17:00Z',
      },
    ],
  },
  {
    id: 'meera-joshi',
    messages: [
      {
        id: 'msg-3',
        senderId: 'meera-joshi',
        text: 'Can we co-author the POSH compliance checklist by Friday?',
        timestamp: '2024-06-16T15:30:00Z',
      },
    ],
  },
  {
    id: 'farhan-ali',
    messages: [
      {
        id: 'msg-4',
        senderId: 'farhan-ali',
        text: 'Sharing draft defence strategy for the white-collar investigation.',
        timestamp: '2024-06-15T10:05:00Z',
      },
    ],
  },
]

const me = lawyers.find((lawyer) => lawyer.id === 'me')

export const currentUser = me

export const getSeedConversations = (): Conversation[] =>
  messageSeeds
    .map((seed) => {
      const participant = lawyers.find((lawyer) => lawyer.id === seed.id)
      if (!participant) return null
      return {
        id: seed.id,
        participant,
        messages: seed.messages,
        unread: seed.messages.some((message) => message.senderId === participant.id) ? 1 : 0,
      }
    })
    .filter(Boolean) as Conversation[]

