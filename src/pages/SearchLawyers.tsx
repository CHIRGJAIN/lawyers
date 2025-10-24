import { useMemo, useState } from 'react';
import Navbar from '@/components/Navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, MapPin, Star, CheckCircle2, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useConnections } from '@/contexts/ConnectionsContext';
import { useMessaging } from '@/contexts/MessagingContext';
import { toast } from 'sonner';

const SearchLawyers = () => {
  const {
    filteredLawyers,
    specialties,
    specialtyFilter,
    setSpecialtyFilter,
    searchQuery,
    setSearchQuery,
    incomingRequests,
    sendConnectionRequest,
    acceptConnectionRequest,
    declineConnectionRequest,
    isLoading,
  } = useConnections();
  const { openConversation } = useMessaging();

  const [selectedLocation, setSelectedLocation] = useState('all');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const locations = useMemo(() => {
    const unique = new Set<string>(filteredLawyers.map((lawyer) => lawyer.location));
    return ['all', ...Array.from(unique)];
  }, [filteredLawyers]);

  const displayedLawyers = useMemo(() => {
    if (selectedLocation === 'all') {
      return filteredLawyers;
    }
    return filteredLawyers.filter((lawyer) => lawyer.location === selectedLocation);
  }, [filteredLawyers, selectedLocation]);

  const handleConnect = async (lawyerId: string) => {
    await sendConnectionRequest(lawyerId);
  };

  const handleAccept = async (requestId: string) => {
    const target = incomingRequests.find((request) => request.id === requestId);
    await acceptConnectionRequest(requestId);
    if (target) {
      setFeedbackMessage(`You are now connected with ${target.from.name}.`);
    }
  };

  const handleDecline = async (requestId: string) => {
    const target = incomingRequests.find((request) => request.id === requestId);
    await declineConnectionRequest(requestId);
    if (target) {
      setFeedbackMessage(`You declined ${target.from.name}'s connection request.`);
    }
  };

  const handleMessage = (lawyer) => {
    const opened = openConversation(lawyer);
    if (!opened) {
      toast.error('Messaging is available only between registered lawyers.');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Connect with Attorneys</h1>
          <p className="text-muted-foreground">
            Expand your professional network and collaborate with fellow legal professionals
          </p>
        </div>

        {feedbackMessage && (
          <Card className="p-4 mb-4 border border-primary/30 bg-primary/5">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm text-primary">{feedbackMessage}</p>
              <Button variant="ghost" size="sm" onClick={() => setFeedbackMessage(null)}>
                Dismiss
              </Button>
            </div>
          </Card>
        )}

        <Card className="p-4 mb-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Connection Requests</h2>
            <Badge variant="secondary">{incomingRequests.length}</Badge>
          </div>
          {incomingRequests.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No pending invitations. When another lawyer reaches out, you can respond here.
            </p>
          ) : (
            <div className="space-y-3">
              {incomingRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between border rounded-md p-3 bg-background"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={request.from.profileImage} />
                      <AvatarFallback>{request.from.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{request.from.name}</p>
                      <p className="text-xs text-muted-foreground">{request.from.specialty}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleAccept(request.id)}>
                      Accept
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDecline(request.id)}>
                      Decline
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Search and Filters */}
        <Card className="p-4 mb-6 shadow-md">
          <div className="flex flex-col gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name, specialty, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {specialties.map((specialty) => (
                <Button
                  key={specialty}
                  variant={specialtyFilter === specialty ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSpecialtyFilter(specialty)}
                  className="capitalize"
                >
                  {specialty === 'all' ? 'All Specialties' : specialty}
                </Button>
              ))}
            </div>

            <div className="flex gap-3">
              <label className="text-sm font-medium self-center">Location</label>
              <select
                value={selectedLocation}
                onChange={(event) => setSelectedLocation(event.target.value)}
                className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location === 'all' ? 'All Locations' : location}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {displayedLawyers.length} attorney{displayedLawyers.length !== 1 ? 's' : ''} in your network
          </p>
          {isLoading && <span className="text-xs text-muted-foreground">Refreshing...</span>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedLawyers.map((lawyer) => (
            <Card key={lawyer.id} className="p-4 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3 mb-3">
                <Link to={`/lawyer/${lawyer.id}`} className="shrink-0">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={lawyer.profileImage} />
                    <AvatarFallback>{lawyer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Link>
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-1">
                    <Link to={`/lawyer/${lawyer.id}`} className="font-semibold hover:text-primary">
                      {lawyer.name}
                    </Link>
                    {lawyer.verified && <CheckCircle2 className="w-4 h-4 text-primary" />}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{lawyer.role}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="w-3 h-3 fill-primary text-primary" />
                    <span>{lawyer.rating}</span>
                    <span>({lawyer.reviewCount})</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="w-4 h-4 text-muted-foreground" />
                  <span>{lawyer.specialty}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{lawyer.location}</span>
                </div>
              </div>

              <div className="flex gap-2 text-xs text-muted-foreground mb-4">
                <Badge variant="secondary">{lawyer.experience} yrs exp</Badge>
                <Badge variant="secondary">{lawyer.consultCount} consults</Badge>
                <Badge variant="secondary">{lawyer.connections} connections</Badge>
              </div>

              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  size="sm"
                  onClick={() => handleConnect(lawyer.id)}
                  disabled={['connected', 'pending', 'incoming', 'self'].includes(lawyer.connectionStatus)}
                >
                  {lawyer.connectionStatus === 'connected' && 'Connected'}
                  {lawyer.connectionStatus === 'pending' && 'Request Sent'}
                  {lawyer.connectionStatus === 'incoming' && 'Respond Pending'}
                  {lawyer.connectionStatus === 'self' && 'You'}
                  {lawyer.connectionStatus === 'available' && 'Connect'}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  size="sm"
                  onClick={() => handleMessage(lawyer)}
                >
                  Message
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {displayedLawyers.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground mb-2">No attorneys found</p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search criteria
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SearchLawyers;
