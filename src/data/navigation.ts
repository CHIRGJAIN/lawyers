export type NavItem = {
  id: string
  label: string
  href: string
  icon: 'home' | 'network' | 'messages' | 'opportunities' | 'alerts' | 'profile'
  badge?: number
}

export const primaryNav: NavItem[] = [
  { id: 'home', label: 'Home', href: '/', icon: 'home' },
  { id: 'network', label: 'Network', href: '/network', icon: 'network' },
  { id: 'messages', label: 'Messages', href: '/messages', icon: 'messages', badge: 2 },
  { id: 'opportunities', label: 'Opportunities', href: '/opportunities', icon: 'opportunities' },
  { id: 'alerts', label: 'Alerts', href: '/alerts', icon: 'alerts', badge: 5 },
]

