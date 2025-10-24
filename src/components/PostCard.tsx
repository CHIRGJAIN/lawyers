import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ThumbsUp, MessageCircle, Share2, CheckCircle2, Send } from 'lucide-react';
import { Post } from '@/lib/mockData';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';
import { useMessaging } from '@/contexts/MessagingContext';
import { mockLawyers } from '@/lib/mockData';

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const { openConversation } = useMessaging();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.reactions.likes);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Adv. Sarah Johnson',
      text: 'Great insight! This is very helpful for our practice.',
      timestamp: '2h ago'
    }
  ]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    toast.success(isLiked ? 'Like removed' : 'Post liked!');
  };

  const handleComment = () => {
    setShowComments(!showComments);
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment = {
        id: comments.length + 1,
        author: 'Current User',
        text: commentText,
        timestamp: 'Just now'
      };
      setComments([...comments, newComment]);
      setCommentText('');
      toast.success('Comment added!');
    }
  };

  const handleShare = () => {
    // Copy link to clipboard or open share modal
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const handleMessage = () => {
    const lawyer = mockLawyers.find((l) => l.id === post.lawyerId);
    if (!lawyer) {
      toast.error('Unable to identify this lawyer profile.');
      return;
    }

    const opened = openConversation(lawyer);
    if (!opened) {
      toast.error('Messaging is available only between registered lawyers.');
      return;
    }

    toast.success(`Opening conversation with ${lawyer.name}`);
  };
  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      {/* Post Header */}
      <div className="flex items-start gap-3 mb-4">
        <Link to={`/lawyer/${post.lawyerId}`}>
          <Avatar className="w-12 h-12 cursor-pointer hover:ring-2 hover:ring-primary transition-all">
            <AvatarImage src={post.lawyerImage} />
            <AvatarFallback>{post.lawyerName.charAt(0)}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-1 mb-1">
            <Link to={`/lawyer/${post.lawyerId}`} className="hover:text-primary transition-colors">
              <h4 className="font-semibold text-sm">{post.lawyerName}</h4>
            </Link>
            {post.verified && (
              <CheckCircle2 className="w-4 h-4 text-primary" />
            )}
          </div>
          <p className="text-xs text-muted-foreground mb-1">{post.lawyerRole}</p>
          <p className="text-xs text-muted-foreground">{post.timestamp}</p>
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2 text-lg">{post.title}</h3>
        <p className="text-sm text-foreground leading-relaxed">{post.content}</p>
      </div>

      {/* Tags */}
      {post.tags && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Post Actions */}
      <div className="flex items-center gap-1 pt-3 border-t">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleLike}
          className={`text-muted-foreground hover:text-primary ${isLiked ? 'text-primary' : ''}`}
        >
          <ThumbsUp className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
          <span className="text-sm">{likeCount}</span>
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleComment}
          className="text-muted-foreground hover:text-primary"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          <span className="text-sm">{post.reactions.comments + comments.length}</span>
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleShare}
          className="text-muted-foreground hover:text-primary"
        >
          <Share2 className="w-4 h-4 mr-2" />
          <span className="text-sm">{post.reactions.shares}</span>
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleMessage}
          className="text-muted-foreground hover:text-primary ml-auto"
        >
          Message {post.lawyerName.split(' ')[1]}
        </Button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t space-y-4">
          {/* Existing Comments */}
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="bg-secondary p-3 rounded-lg">
                  <h5 className="font-medium text-sm">{comment.author}</h5>
                  <p className="text-sm text-foreground">{comment.text}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{comment.timestamp}</p>
              </div>
            </div>
          ))}

          {/* Add Comment */}
          <div className="flex gap-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback>CU</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex gap-2">
              <Textarea
                placeholder="Write a professional comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1 min-h-[80px] resize-none"
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleAddComment())}
              />
              <Button 
                size="sm" 
                onClick={handleAddComment}
                disabled={!commentText.trim()}
                className="self-end"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default PostCard;
