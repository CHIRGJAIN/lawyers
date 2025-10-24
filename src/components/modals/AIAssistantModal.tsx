import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Sparkles, TrendingUp, Scale, Lightbulb } from 'lucide-react';
import { useState } from 'react';
import { Card } from '@/components/ui/card';

interface AIAssistantModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AIAssistantModal = ({ open, onOpenChange }: AIAssistantModalProps) => {
  const [caseDetails, setCaseDetails] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  const mockResults = {
    summary: 'Based on the case details provided, this appears to be a contract dispute involving breach of terms. The jurisdiction and timeline suggest a moderate complexity case.',
    relatedCases: [
      'Smith v. Johnson (2022) - Similar contract breach',
      'Tech Corp v. Startup Inc. (2023) - Intellectual property dispute',
      'Anderson v. Williams (2021) - Breach of fiduciary duty',
    ],
    predictedOutcome: 'Strong likelihood of favorable settlement (75% confidence) based on precedent and facts presented. Litigation timeline estimated at 8-12 months.',
    recommendations: [
      'Gather all written communications and contracts',
      'Document timeline of events with specific dates',
      'Consider mediation before pursuing litigation',
      'Consult with a contract law specialist',
    ],
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI Case Assistant
          </DialogTitle>
          <DialogDescription>
            Enter your case details below and get AI-powered analysis, predictions, and recommendations
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="caseDetails">Case Details</Label>
            <Textarea
              id="caseDetails"
              placeholder="Describe your case in detail: facts, parties involved, timeline, jurisdiction, legal issues, desired outcome..."
              className="min-h-40"
              value={caseDetails}
              onChange={(e) => setCaseDetails(e.target.value)}
            />
          </div>

          {!showResults ? (
            <Button
              onClick={handleAnalyze}
              disabled={!caseDetails.trim() || isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Analyze Case
                </>
              )}
            </Button>
          ) : (
            <div className="space-y-4">
              {/* Case Summary */}
              <Card className="p-4 bg-secondary">
                <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-primary" />
                  Case Summary
                </h3>
                <p className="text-sm">{mockResults.summary}</p>
              </Card>

              {/* Related Cases */}
              <Card className="p-4">
                <h3 className="font-semibold text-sm mb-3">Related Past Cases</h3>
                <ul className="space-y-2">
                  {mockResults.relatedCases.map((case_, index) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>{case_}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Predicted Outcome */}
              <Card className="p-4 bg-accent">
                <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-accent-foreground" />
                  Predicted Outcome
                </h3>
                <p className="text-sm">{mockResults.predictedOutcome}</p>
              </Card>

              {/* Recommendations */}
              <Card className="p-4">
                <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-primary" />
                  Recommendations
                </h3>
                <ol className="space-y-2">
                  {mockResults.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <span className="font-semibold text-primary">{index + 1}.</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ol>
              </Card>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowResults(false);
                    setCaseDetails('');
                  }}
                >
                  New Analysis
                </Button>
                <Button className="flex-1" onClick={() => onOpenChange(false)}>
                  Done
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIAssistantModal;
