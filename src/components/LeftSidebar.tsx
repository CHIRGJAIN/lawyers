import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Bookmark, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useConnections } from '@/contexts/ConnectionsContext';

const LeftSidebar = () => {
  const { lawyers } = useConnections();
  const currentUser = lawyers.find((lawyer) => lawyer.isCurrentUser);

  const quickLinks = [
    { icon: Users, label: 'My Network', count: currentUser?.connections ?? 0, path: '/search' },
    { icon: Bookmark, label: 'Saved Posts', count: 45, path: '/saved' },
    { icon: Calendar, label: 'Consultations', count: currentUser?.consultCount ?? 0, path: '/consults' },
  ];

  return (
    <aside className="w-64 space-y-4 p-4">
      {/* Profile Card */}
      <Card className="overflow-hidden">
        <div className="h-12 bg-gradient-to-r from-primary to-accent" />
        <div className="px-4 pb-4 -mt-6">
          <Avatar className="w-12 h-12 border-4 border-card mb-3">
            <AvatarImage src={currentUser?.profileImage} />
            <AvatarFallback>{currentUser?.name?.charAt(0) ?? 'U'}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-sm">{currentUser?.name ?? 'You'}</h3>
            <p className="text-xs text-muted-foreground">{currentUser?.role ?? 'Legal Professional'}</p>
            <p className="text-xs text-muted-foreground">{currentUser?.location ?? '—'}</p>
          </div>
        </div>
        <div className="border-t px-4 py-3">
          <div className="grid grid-cols-2 gap-2 text-center">
            <div>
              <p className="text-xs text-muted-foreground">Network</p>
              <p className="font-semibold text-sm">{currentUser?.connections ?? 0}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Posts</p>
              <p className="font-semibold text-sm">{currentUser?.casePostCount ?? 0}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Links */}
      <Card className="p-3">
        <div className="space-y-1">
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-secondary transition-colors"
            >
              <div className="flex items-center gap-3">
                <link.icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{link.label}</span>
              </div>
              <Badge variant="secondary" className="h-5 px-2 text-xs">
                {link.count}
              </Badge>
            </Link>
          ))}
        </div>
      </Card>
    </aside>
  );
};

export default LeftSidebar;
