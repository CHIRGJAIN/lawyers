export interface Lawyer {
  id: string;
  name: string;
  role: string;
  specialty: string;
  location: string;
  verified: boolean;
  rating: number;
  consultCount: number;
  casePostCount: number;
  reviewCount: number;
  bio: string;
  experience: number;
  profileImage: string;
  coverImage?: string;
  connections: number;
}

export interface Post {
  id: string;
  lawyerId: string;
  lawyerName: string;
  lawyerRole: string;
  lawyerImage: string;
  verified: boolean;
  title: string;
  content: string;
  timestamp: string;
  reactions: {
    likes: number;
    comments: number;
    shares: number;
  };
  tags?: string[];
}

export interface Consult {
  id: string;
  lawyerId: string;
  lawyerName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  type: string;
}

export interface Notification {
  id: string;
  type: 'consult' | 'post' | 'connection' | 'message';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link?: string;
}

export const mockLawyers: Lawyer[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    role: 'Senior Partner',
    specialty: 'Corporate Law',
    location: 'New York, NY',
    verified: true,
    rating: 4.9,
    consultCount: 245,
    casePostCount: 87,
    reviewCount: 156,
    bio: 'Experienced corporate lawyer with over 15 years in M&A and corporate governance. Helped numerous startups navigate complex legal landscapes.',
    experience: 15,
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    connections: 342,
  },
  {
    id: '2',
    name: 'James Robertson',
    role: 'Criminal Defense Attorney',
    specialty: 'Criminal Law',
    location: 'Los Angeles, CA',
    verified: true,
    rating: 4.8,
    consultCount: 312,
    casePostCount: 124,
    reviewCount: 203,
    bio: 'Passionate about defending civil rights and ensuring fair trials. Former prosecutor with deep understanding of both sides.',
    experience: 12,
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    connections: 287,
  },
  {
    id: '3',
    name: 'Emily Chen',
    role: 'Intellectual Property Specialist',
    specialty: 'IP & Patent Law',
    location: 'San Francisco, CA',
    verified: true,
    rating: 4.9,
    consultCount: 189,
    casePostCount: 95,
    reviewCount: 142,
    bio: 'Tech-savvy IP lawyer specializing in software patents and trademark protection for tech companies.',
    experience: 10,
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    connections: 198,
  },
  {
    id: '4',
    name: 'Michael Torres',
    role: 'Family Law Attorney',
    specialty: 'Family Law',
    location: 'Chicago, IL',
    verified: false,
    rating: 4.7,
    consultCount: 278,
    casePostCount: 67,
    reviewCount: 198,
    bio: 'Compassionate family law attorney helping families navigate divorce, custody, and adoption with care.',
    experience: 8,
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    connections: 154,
  },
];

export const CURRENT_LAWYER_ID = '1';

export const mockPosts: Post[] = [
  {
    id: '1',
    lawyerId: '1',
    lawyerName: 'Sarah Mitchell',
    lawyerRole: 'Senior Partner at Mitchell & Associates',
    lawyerImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    verified: true,
    title: 'Key Changes in Corporate Governance Regulations 2024',
    content: 'As we enter Q2 2024, several significant changes to corporate governance regulations have been implemented. Companies need to be aware of enhanced transparency requirements and new reporting standards. I\'ve compiled a comprehensive guide for my clients...',
    timestamp: '2 hours ago',
    reactions: {
      likes: 142,
      comments: 28,
      shares: 15,
    },
    tags: ['Corporate Law', 'Compliance', 'Governance'],
  },
  {
    id: '2',
    lawyerId: '2',
    lawyerName: 'James Robertson',
    lawyerRole: 'Criminal Defense Attorney',
    lawyerImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    verified: true,
    title: 'Understanding Your Rights During Police Questioning',
    content: 'Many people don\'t fully understand their constitutional rights when being questioned by law enforcement. Here are the key points everyone should know about Miranda rights and when they apply...',
    timestamp: '5 hours ago',
    reactions: {
      likes: 89,
      comments: 34,
      shares: 22,
    },
    tags: ['Criminal Law', 'Rights', 'Legal Education'],
  },
  {
    id: '3',
    lawyerId: '3',
    lawyerName: 'Emily Chen',
    lawyerRole: 'IP Specialist at Tech Legal Group',
    lawyerImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    verified: true,
    title: 'AI and Patent Law: Navigating Uncharted Territory',
    content: 'The intersection of AI and patent law presents fascinating challenges. Recent case law suggests courts are still grappling with AI-generated inventions. Here\'s what tech companies need to know...',
    timestamp: '1 day ago',
    reactions: {
      likes: 256,
      comments: 67,
      shares: 43,
    },
    tags: ['IP Law', 'AI', 'Technology'],
  },
];

export const mockConsults: Consult[] = [
  {
    id: '1',
    lawyerId: '1',
    lawyerName: 'Sarah Mitchell',
    date: '2024-10-20',
    time: '10:00 AM',
    status: 'confirmed',
    type: 'Corporate Consultation',
  },
  {
    id: '2',
    lawyerId: '3',
    lawyerName: 'Emily Chen',
    date: '2024-10-22',
    time: '2:30 PM',
    status: 'pending',
    type: 'IP Strategy Session',
  },
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'consult',
    title: 'Consultation Confirmed',
    message: 'Your consultation with Sarah Mitchell has been confirmed for Oct 20',
    timestamp: '1 hour ago',
    read: false,
  },
  {
    id: '2',
    type: 'post',
    title: 'New Post from Emily Chen',
    message: 'Emily Chen posted about AI and Patent Law',
    timestamp: '1 day ago',
    read: true,
  },
  {
    id: '3',
    type: 'connection',
    title: 'Connection Request',
    message: 'James Robertson wants to connect with you',
    timestamp: '2 days ago',
    read: false,
  },
];

export const mockNews = [
  {
    id: '1',
    title: 'Supreme Court Rules on Major Privacy Case',
    source: 'Legal Times',
    timestamp: '3 hours ago',
  },
  {
    id: '2',
    title: 'New Bar Exam Changes Announced',
    source: 'ABA Journal',
    timestamp: '1 day ago',
  },
  {
    id: '3',
    title: 'Tech Companies Face New Regulatory Scrutiny',
    source: 'Law360',
    timestamp: '2 days ago',
  },
];
