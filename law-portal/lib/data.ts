import { routes, routeParams } from './routes';

export type Lawyer = {
  id: string;
  name: string;
  headline: string;
  firm: string;
  avatar: string;
  jurisdiction: string;
  yearsExperience: number;
  practiceAreas: string[];
  languages: string[];
  barId: string;
  feeRange: string;
  availability: string;
  verified?: boolean;
};

export type FeedPost = {
  id: string;
  authorId: string;
  type: 'article' | 'update' | 'case-note' | 'judgment' | 'event';
  title: string;
  content: string;
  createdAt: string;
  coverImage?: string;
  reactions: {
    likes: number;
    comments: number;
    shares: number;
  };
};

export const lawyers: Lawyer[] = [
  {
    id: 'me',
    name: 'Adv. Priya Menon',
    headline: 'Managing Partner • Corporate & Technology Law',
    firm: 'Menon & Associates',
    avatar: '/avatars/priya-menon.svg',
    jurisdiction: 'Supreme Court of India',
    yearsExperience: 14,
    practiceAreas: ['Corporate Law', 'Technology Regulations', 'Data Privacy'],
    languages: ['English', 'Hindi', 'Malayalam'],
    barId: 'A/1234/2010',
    feeRange: 'INR 8,000/hr',
    availability: 'Accepting new consultations',
    verified: true,
  },
  {
    id: 'arjun-singh',
    name: 'Adv. Arjun Singh',
    headline: 'Senior Counsel • Arbitration & Infrastructure',
    firm: 'LexArb Chambers',
    avatar: '/avatars/arjun-singh.svg',
    jurisdiction: 'Delhi High Court',
    yearsExperience: 18,
    practiceAreas: ['Arbitration', 'Infrastructure', 'Energy'],
    languages: ['English', 'Hindi'],
    barId: 'D/742/2006',
    feeRange: 'INR 10,500/hr',
    availability: 'Available within 2 weeks',
    verified: true,
  },
  {
    id: 'meera-joshi',
    name: 'Adv. Meera Joshi',
    headline: 'Partner • Employment & Labour Law',
    firm: 'Joshi Legal',
    avatar: '/avatars/meera-joshi.svg',
    jurisdiction: 'Bombay High Court',
    yearsExperience: 12,
    practiceAreas: ['Employment', 'Industrial Relations', 'Compliance'],
    languages: ['English', 'Marathi', 'Gujarati'],
    barId: 'MH/3321/2012',
    feeRange: 'INR 6,000/hr',
    availability: 'Responds within 24 hours',
  },
  {
    id: 'farhan-ali',
    name: 'Adv. Farhan Ali',
    headline: 'Of Counsel • White Collar Defence',
    firm: 'Integrity Law Group',
    avatar: '/avatars/farhan-ali.svg',
    jurisdiction: 'NIA & ED Matters',
    yearsExperience: 15,
    practiceAreas: ['White Collar', 'Investigations', 'Compliance'],
    languages: ['English', 'Hindi', 'Urdu'],
    barId: 'UP/833/2009',
    feeRange: 'INR 9,500/hr',
    availability: 'Accepting urgent briefs',
    verified: true,
  },
];

export const feed: FeedPost[] = [
  {
    id: 'post-1',
    authorId: 'me',
    type: 'judgment',
    title: 'Supreme Court clarifies liability in cross-border data transfers',
    content:
      'Key ratio: organisations must implement verifiable audit trails and explicit client consent. Sharing our compliance checklist for tech startups seeking overseas expansion.',
    createdAt: '2h',
    coverImage: '/feed/judgment-data-transfer.svg',
    reactions: { likes: 214, comments: 43, shares: 18 },
  },
  {
    id: 'post-2',
    authorId: 'arjun-singh',
    type: 'case-note',
    title: 'Arbitral award enforcement: SEAMEC Ltd v Oil India Ltd',
    content:
      'High Court reiterates limited scope of Section 34 challenges. Practical takeaways for EPC contractors and in-house counsel managing multi-crore infrastructure disputes.',
    createdAt: '5h',
    coverImage: '/feed/arbitration-seamec.svg',
    reactions: { likes: 156, comments: 29, shares: 11 },
  },
  {
    id: 'post-3',
    authorId: 'meera-joshi',
    type: 'event',
    title: 'Invite: Hybrid masterclass on POSH compliance for startups',
    content:
      'Covering latest amendments and board accountability obligations. Register to receive our model policy & reporting templates. Seats limited to 70 participants.',
    createdAt: '1d',
    reactions: { likes: 98, comments: 17, shares: 21 },
  },
];

export const legalNews = [
  {
    id: 'news-1',
    title: 'SEBI issues consultative paper on ESG disclosures for listed companies',
    source: 'Legally India',
    time: '45m ago',
  },
  {
    id: 'news-2',
    title: 'NCLT fast-tracks insolvency resolution timelines for MSMEs',
    source: 'IBC Monitor',
    time: '2h ago',
  },
  {
    id: 'news-3',
    title: 'MCA notifies LLP governance amendments effective April 2025',
    source: 'Corporate Law Brief',
    time: '4h ago',
  },
];

export const quickLinks = [
  { id: 'saved-items', label: 'Saved items', href: routes.home() + '#saved' },
  { id: 'groups', label: 'Practice groups', href: routes.network() },
  { id: 'newsletters', label: 'Legal newsletters', href: routes.home() + '#newsletters' },
  { id: 'events', label: 'Events & webinars', href: routes.opportunities() },
];

export const shortcutStats = [
  { id: 'profile-views', label: 'Profile views this week', value: 86 },
  { id: 'search-appearances', label: 'Search appearances', value: 142 },
];

export const suggestedConnections = lawyers.filter((lawyer) => lawyer.id !== 'me');

export const consultationLink = (lawyerId: string) =>
  routes.messages(routeParams.consultation(lawyerId));
