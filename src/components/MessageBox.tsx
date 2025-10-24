import { useState } from 'react';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';

const MessageBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg z-50 bg-primary hover:bg-primary/90"
          size="icon"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className={`fixed bottom-6 right-6 w-80 shadow-xl z-50 border-0 ${
          isMinimized ? 'h-12' : 'h-96'
        } transition-all duration-200`}>
          {/* Chat Header */}
          <div className="flex items-center justify-between p-3 bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" />
                <AvatarFallback>S</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="text-sm font-semibold">Support</h4>
                <p className="text-xs opacity-90">Online now</p>
              </div>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={minimizeChat}
                className="text-primary-foreground hover:bg-primary-foreground/20 w-6 h-6 p-0"
              >
                <Minimize2 className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground hover:bg-primary-foreground/20 w-6 h-6 p-0"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* Chat Content */}
          {!isMinimized && (
            <>
              {/* Messages Area */}
              <div className="flex-1 p-4 space-y-3 h-64 overflow-y-auto bg-background">
                <div className="flex gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" />
                    <AvatarFallback>S</AvatarFallback>
                  </Avatar>
                  <div className="bg-secondary p-2 rounded-lg rounded-tl-none max-w-xs">
                    <p className="text-sm">Hi! How can I help you today?</p>
                    <p className="text-xs text-muted-foreground mt-1">Just now</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" />
                    <AvatarFallback>S</AvatarFallback>
                  </Avatar>
                  <div className="bg-secondary p-2 rounded-lg rounded-tl-none max-w-xs">
                    <p className="text-sm">I'm here to assist you with any questions about LawyerLink.</p>
                    <p className="text-xs text-muted-foreground mt-1">1m ago</p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-2 mt-4">
                  <p className="text-xs text-muted-foreground">Quick actions:</p>
                  <div className="space-y-1">
                    <Button variant="outline" size="sm" className="w-full text-left justify-start h-8">
                      How to sign up?
                    </Button>
                    <Button variant="outline" size="sm" className="w-full text-left justify-start h-8">
                      Features overview
                    </Button>
                    <Button variant="outline" size="sm" className="w-full text-left justify-start h-8">
                      Contact support
                    </Button>
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div className="p-3 border-t bg-card">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 h-9"
                  />
                  <Button size="sm" onClick={handleSendMessage} className="h-9 w-9 p-0">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card>
      )}
    </>
  );
};

export default MessageBox;