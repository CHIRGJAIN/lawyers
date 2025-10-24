import Navbar from '@/components/Navbar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, Video, MapPin } from 'lucide-react';
import { mockConsults, mockLawyers } from '@/lib/mockData';
import { Button } from '@/components/ui/button';

const Consults = () => {
  const getStatusBadge = (status: string): "default" | "destructive" | "outline" | "secondary" => {
    const variants: Record<string, "default" | "destructive" | "outline" | "secondary"> = {
      confirmed: 'default',
      pending: 'secondary',
      completed: 'outline',
      cancelled: 'destructive',
    };
    return variants[status] || 'secondary';
  };

  const renderConsultCard = (consult: typeof mockConsults[0]) => {
    const lawyer = mockLawyers.find((l) => l.id === consult.lawyerId);
    if (!lawyer) return null;

    return (
      <Card key={consult.id} className="p-4 shadow-md hover:shadow-lg transition-shadow">
        <div className="flex gap-4">
          <Avatar className="w-14 h-14">
            <AvatarImage src={lawyer.profileImage} />
            <AvatarFallback>{lawyer.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold">{consult.lawyerName}</h3>
                <p className="text-sm text-muted-foreground">{consult.type}</p>
              </div>
              <Badge variant={getStatusBadge(consult.status)}>
                {consult.status.charAt(0).toUpperCase() + consult.status.slice(1)}
              </Badge>
            </div>

            <div className="space-y-1 mb-3">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>
                  {new Date(consult.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>{consult.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Video className="w-4 h-4 text-muted-foreground" />
                <span>Video Call</span>
              </div>
            </div>

            <div className="flex gap-2">
              {consult.status === 'confirmed' && (
                <>
                  <Button size="sm">Join Call</Button>
                  <Button size="sm" variant="outline">
                    Reschedule
                  </Button>
                </>
              )}
              {consult.status === 'pending' && (
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              )}
              {consult.status === 'completed' && (
                <Button size="sm" variant="outline">
                  Leave Review
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    );
  };

  const upcomingConsults = mockConsults.filter(
    (c) => c.status === 'confirmed' || c.status === 'pending'
  );
  const pastConsults = mockConsults.filter((c) => c.status === 'completed');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Peer Guidance Sessions</h1>
          <p className="text-muted-foreground">Collaborate with fellow attorneys and share expertise</p>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingConsults.length})
            </TabsTrigger>
            <TabsTrigger value="past">Past ({pastConsults.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingConsults.length > 0 ? (
              upcomingConsults.map(renderConsultCard)
            ) : (
              <Card className="p-12 text-center">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No upcoming sessions</h3>
                <p className="text-muted-foreground mb-4">
                  Connect with fellow attorneys to seek guidance or share expertise
                </p>
                <Button>Find Attorneys</Button>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastConsults.length > 0 ? (
              pastConsults.map(renderConsultCard)
            ) : (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">No past sessions</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Consults;
