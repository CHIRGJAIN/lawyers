import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Sparkles } from 'lucide-react';
import { useState } from 'react';
import CasePostModal from './modals/CasePostModal';
import AIAssistantModal from './modals/AIAssistantModal';

const CreatePostCard = () => {
  const [showPostModal, setShowPostModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);

  return (
    <>
      <Card className="p-4">
        <div className="flex gap-3 mb-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" />
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
          <button
            onClick={() => setShowPostModal(true)}
            className="flex-1 text-left px-4 py-3 rounded-full border bg-secondary hover:bg-accent transition-colors text-sm text-muted-foreground"
          >
            Share your legal insights...
          </button>
        </div>
        <div className="flex items-center justify-center gap-4 pt-3 border-t">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-primary flex-1"
            onClick={() => setShowPostModal(true)}
          >
            <FileText className="w-4 h-4 mr-2" />
            Create Post
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-accent-foreground flex-1"
            onClick={() => setShowAIModal(true)}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            AI Assistant
          </Button>
        </div>
      </Card>

      <CasePostModal open={showPostModal} onOpenChange={setShowPostModal} />
      <AIAssistantModal open={showAIModal} onOpenChange={setShowAIModal} />
    </>
  );
};

export default CreatePostCard;
