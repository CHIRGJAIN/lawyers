import { useParams, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, CheckCircle2, Star, Briefcase, Award, MessageCircle, Edit2, Save, X } from 'lucide-react';
import { mockLawyers, mockPosts } from '@/lib/mockData';
import PostCard from '@/components/PostCard';
import { useEffect, useMemo, useState } from 'react';
import ConsultModal from '@/components/modals/ConsultModal';
import { useMessaging } from '@/contexts/MessagingContext';
import { toast } from 'sonner';
import { useConnections } from '@/contexts/ConnectionsContext';

const LawyerProfile = () => {
  const { id } = useParams();
  const location = useLocation();
  const { openConversation } = useMessaging();
  const {
    lawyers: networkLawyers,
    sendConnectionRequest,
  } = useConnections();
  const isOwnProfile = location.pathname === '/profile';
  
  const contextLawyer = useMemo(() => {
    if (isOwnProfile) {
      return networkLawyers.find((entry) => entry.isCurrentUser);
    }
    return networkLawyers.find((entry) => entry.id === id);
  }, [isOwnProfile, networkLawyers, id]);

  // If there's no context data yet, fall back to mock data for initial render
  const lawyer = contextLawyer ?? (isOwnProfile ? mockLawyers[0] : mockLawyers.find((l) => l.id === id));
  const connectionStatus = contextLawyer?.connectionStatus ?? (isOwnProfile ? 'self' : 'available');
  const [showConsultModal, setShowConsultModal] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bio, setBio] = useState(lawyer?.bio || '');

  useEffect(() => {
    if (lawyer?.bio) {
      setBio(lawyer.bio);
    }
  }, [lawyer?.bio]);

  if (!lawyer) {
    return <div>Lawyer not found</div>;
  }

  const lawyerPosts = mockPosts.filter((post) => post.lawyerId === lawyer.id);

  const handleSaveBio = () => {
    // Here you would typically make an API call to save the bio
    console.log('Saving bio:', bio);
    // For now, just update the UI
    setIsEditingBio(false);
    // In a real app, you'd update the lawyer object in your state management
  };

  const handleCancelEdit = () => {
    setBio(lawyer.bio);
    setIsEditingBio(false);
  };

  const handleBookConsultation = () => {
    setShowConsultModal(true);
  };

  const handleSendMessage = () => {
    if (!lawyer) {
      toast.error('Unable to load lawyer profile.');
      return;
    }

    const opened = openConversation(lawyer);
    if (!opened) {
      toast.error('Messaging is available only between registered lawyers.');
      return;
    }

    toast.success(`Opening conversation with ${lawyer.name}`);
  };

  const handleConnect = async () => {
    if (!lawyer || connectionStatus !== 'available') {
      return;
    }
    await sendConnectionRequest(lawyer.id);
  };

  const connectDisabled = ['connected', 'pending', 'incoming', 'self'].includes(connectionStatus);
  const connectLabelMap: Record<string, string> = {
    connected: 'Connected',
    pending: 'Request Sent',
    incoming: 'Respond Pending',
    self: 'You',
    available: 'Connect',
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Profile Header */}
        <Card className="overflow-hidden shadow-lg mb-6">
          <div className="h-32 bg-gradient-to-r from-primary to-accent" />
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row gap-6 -mt-16 mb-6">
              <Avatar className="w-32 h-32 border-4 border-card shadow-lg">
                <AvatarImage src={lawyer.profileImage} />
                <AvatarFallback>{lawyer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 mt-16 sm:mt-0">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-2xl font-bold">{lawyer.name}</h1>
                  {lawyer.verified && (
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  )}
                </div>
                <p className="text-lg text-muted-foreground mb-1">{lawyer.role}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    {lawyer.specialty}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {lawyer.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    {lawyer.rating} ({lawyer.reviewCount} reviews)
                  </span>
                </div>
                {!isOwnProfile && (
                  <div className="flex flex-wrap gap-3">
                    <Button onClick={handleBookConsultation}>
                      <Briefcase className="w-4 h-4 mr-2" />
                      Book Consultation
                    </Button>
                    <Button variant="outline" onClick={handleSendMessage}>
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleConnect}
                      disabled={connectDisabled}
                    >
                      {connectLabelMap[connectionStatus]}
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-secondary rounded-lg">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{lawyer.consultCount}</p>
                <p className="text-sm text-muted-foreground">Consultations</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{lawyer.casePostCount}</p>
                <p className="text-sm text-muted-foreground">Case Posts</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{lawyer.experience}</p>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{lawyer.connections}</p>
                <p className="text-sm text-muted-foreground">Connections</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="about" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">About</h2>
                {isOwnProfile && !isEditingBio && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setIsEditingBio(true)}
                    className="flex items-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </Button>
                )}
                {isOwnProfile && isEditingBio && (
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleCancelEdit}
                      className="flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={handleSaveBio}
                      className="flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </Button>
                  </div>
                )}
              </div>
              {isEditingBio ? (
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell colleagues about your background, experience, and specializations..."
                  className="min-h-[120px] resize-none"
                />
              ) : (
                <p className="text-foreground leading-relaxed">{bio}</p>
              )}
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Expertise
              </h2>
              <div className="flex flex-wrap gap-2">
                <Badge className="text-sm">{lawyer.specialty}</Badge>
                <Badge variant="secondary" className="text-sm">Contract Law</Badge>
                <Badge variant="secondary" className="text-sm">Litigation</Badge>
                <Badge variant="secondary" className="text-sm">Legal Consulting</Badge>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="posts" className="space-y-4">
            {lawyerPosts.length > 0 ? (
              lawyerPosts.map((post) => <PostCard key={post.id} post={post} />)
            ) : (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No posts yet</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">{lawyer.rating}</div>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(lawyer.rating)
                            ? 'fill-primary text-primary'
                            : 'text-muted'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {lawyer.reviewCount} reviews
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border-t pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>U{i}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm">Client {i}</p>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} className="w-3 h-3 fill-primary text-primary" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm">
                      Excellent service and professional guidance throughout the process.
                      Highly recommend!
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <ConsultModal
        open={showConsultModal}
        onOpenChange={setShowConsultModal}
        lawyer={lawyer}
      />
    </div>
  );
};

export default LawyerProfile;
