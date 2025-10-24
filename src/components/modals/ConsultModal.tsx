import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar, Clock, DollarSign } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Lawyer } from '@/lib/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ConsultModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lawyer: Lawyer;
}

const ConsultModal = ({ open, onOpenChange, lawyer }: ConsultModalProps) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [consultType, setConsultType] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Guidance request sent! You will be notified when they respond.');
    onOpenChange(false);
    // Reset form
    setDate('');
    setTime('');
    setConsultType('');
    setNotes('');
  };

  const consultTypes = [
    { value: 'case-review', label: 'Case Review & Feedback', price: 0 },
    { value: 'strategy', label: 'Strategy Discussion', price: 0 },
    { value: 'collaboration', label: 'Collaboration Opportunity', price: 0 },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Request Peer Guidance</DialogTitle>
          <DialogDescription>
            Connect with {lawyer.name} for professional collaboration
          </DialogDescription>
        </DialogHeader>

        {/* Lawyer Info */}
        <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
          <Avatar className="w-12 h-12">
            <AvatarImage src={lawyer.profileImage} />
            <AvatarFallback>{lawyer.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold text-sm">{lawyer.name}</h4>
            <p className="text-xs text-muted-foreground">{lawyer.specialty}</p>
            <p className="text-xs text-muted-foreground">{lawyer.location}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">
                <Calendar className="w-4 h-4 inline mr-1" />
                Preferred Date
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div>
              <Label htmlFor="time">
                <Clock className="w-4 h-4 inline mr-1" />
                Preferred Time
              </Label>
              <Select value={time} onValueChange={setTime} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="09:00">9:00 AM</SelectItem>
                  <SelectItem value="10:00">10:00 AM</SelectItem>
                  <SelectItem value="11:00">11:00 AM</SelectItem>
                  <SelectItem value="14:00">2:00 PM</SelectItem>
                  <SelectItem value="15:00">3:00 PM</SelectItem>
                  <SelectItem value="16:00">4:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="consultType">Session Type</Label>
            <Select value={consultType} onValueChange={setConsultType} required>
              <SelectTrigger>
                <SelectValue placeholder="Select session type" />
              </SelectTrigger>
              <SelectContent>
                {consultTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes">Case Details (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Share relevant case details or questions you'd like to discuss..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-24"
            />
          </div>

          <div className="bg-accent p-3 rounded-lg">
            <p className="text-xs text-muted-foreground mb-2">Professional Collaboration</p>
            <p className="text-sm">
              Connect with fellow attorneys for peer-to-peer knowledge sharing and professional development
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Send Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultModal;
