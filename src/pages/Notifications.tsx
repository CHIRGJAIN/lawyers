import Navbar from '@/components/Navbar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Briefcase, FileText, Users, MessageCircle, Check } from 'lucide-react';
import { mockNotifications } from '@/lib/mockData';
import { useState } from 'react';

const Notifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);

  const getIcon = (type: string) => {
    const icons = {
      consult: Briefcase,
      post: FileText,
      connection: Users,
      message: MessageCircle,
    };
    const Icon = icons[type as keyof typeof icons] || FileText;
    return <Icon className="w-5 h-5" />;
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Notifications</h1>
            {unreadCount > 0 && (
              <p className="text-muted-foreground">
                You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <Check className="w-4 h-4 mr-2" />
              Mark all as read
            </Button>
          )}
        </div>

        <div className="space-y-2">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`p-4 shadow-sm hover:shadow-md transition-all cursor-pointer ${
                !notification.read ? 'bg-accent border-l-4 border-l-primary' : ''
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    !notification.read
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold text-sm">{notification.title}</h3>
                    {!notification.read && (
                      <Badge variant="default" className="ml-2">
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {notification.timestamp}
                  </p>
                </div>
              </div>
            </Card>
          ))}

          {notifications.length === 0 && (
            <Card className="p-12 text-center">
              <MessageCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No notifications</h3>
              <p className="text-muted-foreground">
                You're all caught up! Check back later for updates.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
