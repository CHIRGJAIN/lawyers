import type { Lawyer } from './lawyers'

export type FeedAttachment = {
  id: string
  fileName: string
  category: 'memo' | 'evidence'
}

export type FeedPost = {
  id: string
  authorId: string
  category: 'update' | 'case' | 'insight' | 'event'
  title: string
  summary: string
  createdAt: string
  tags: string[]
  reactions: {
    likes: number
    comments: number
    reposts: number
  }
  attachments?: FeedAttachment[]
}

export const posts: FeedPost[] = [
  {
    id: 'post-101',
    authorId: 'priya-menon',
    category: 'insight',
    title: 'Navigating AI Compliance in Cross-Border M&A Diligence',
    summary:
      'Shared the 8-point diligence checklist we now run for AI-enabled SaaS acquisitions covering localisation, bias audit trails and privacy stitching.',
    createdAt: '2h ago',
    tags: ['AI', 'M&A', 'RegTech'],
    reactions: { likes: 186, comments: 38, reposts: 22 },
  },
  {
    id: 'post-102',
    authorId: 'arjun-sengupta',
    category: 'case',
    title: 'Award enforced in LNG terminal dispute – key reliefs and drafting lessons',
    summary:
      'Relief worth ₹640 crore upheld with tribunal emphasising contemporaneous delay logs. Summarised takeaways for EPC and infra clients.',
    createdAt: '5h ago',
    tags: ['Arbitration', 'Infrastructure'],
    reactions: { likes: 143, comments: 25, reposts: 14 },
  },
  {
    id: 'post-103',
    authorId: 'meera-joshi',
    category: 'event',
    title: 'Workshop: Designing hybrid work policies after the latest labour code draft',
    summary:
      'Hosting an invite-only clinic next Friday. Participants receive our compliance template pack and illustrative risk matrix.',
    createdAt: '1d ago',
    tags: ['Employment', 'Policy Design'],
    reactions: { likes: 98, comments: 17, reposts: 19 },
  },
]

export const categories: Array<{ id: FeedPost['category']; label: string }> = [
  { id: 'update', label: 'Network Updates' },
  { id: 'case', label: 'Case Wins' },
  { id: 'insight', label: 'Legal Insights' },
  { id: 'event', label: 'Events & Webinars' },
]

export const buildAuthorMap = (lawyers: Lawyer[]) =>
  Object.fromEntries(lawyers.map((lawyer) => [lawyer.id, lawyer]))
