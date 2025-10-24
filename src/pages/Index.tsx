import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Briefcase, Users, MessageCircle, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-16 pb-24">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center shadow-lg">
              <Briefcase className="w-9 h-9 text-primary-foreground" />
            </div>
            <h1 className="text-5xl font-bold text-foreground">LawyerLink</h1>
          </div>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with fellow attorneys, share insights, collaborate on cases, and grow your legal practice in one professional platform.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/signup')} className="text-lg px-8">
              Get Started <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/login')} className="text-lg px-8">
              Sign In
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-8 text-center hover:shadow-lg transition-shadow">
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-4">Professional Network</h3>
            <p className="text-muted-foreground">
              Connect with attorneys across all practice areas and build meaningful professional relationships.
            </p>
          </Card>
          <Card className="p-8 text-center hover:shadow-lg transition-shadow">
            <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-4">Knowledge Sharing</h3>
            <p className="text-muted-foreground">
              Share insights, ask questions, and learn from the collective expertise of the legal community.
            </p>
          </Card>
          <Card className="p-8 text-center hover:shadow-lg transition-shadow">
            <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-4">Career Growth</h3>
            <p className="text-muted-foreground">
              Enhance your practice through peer collaboration, case consultations, and professional development.
            </p>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto p-8 bg-primary text-primary-foreground">
            <h3 className="text-2xl font-bold mb-4">Ready to Join?</h3>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of legal professionals who are already building their network on LawyerLink.
            </p>
            <Button size="lg" variant="secondary" onClick={() => navigate('/signup')} className="text-lg px-8">
              Create Your Account
            </Button>
          </Card>
        </div>

        {/* Sample Lawyers Section for Testing */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold mb-6">Meet Our Legal Professionals</h3>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/lawyer/1">
              <Button variant="outline" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                View Sarah Mitchell's Profile
              </Button>
            </Link>
            <Link to="/lawyer/2">
              <Button variant="outline" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                View James Robertson's Profile
              </Button>
            </Link>
            <Link to="/search">
              <Button variant="outline" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Browse All Lawyers
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>© 2024 LawyerLink. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
