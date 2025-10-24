import { Card } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { mockNews } from '@/lib/mockData';

const RightSidebar = () => {
  return (
    <aside className="w-72 space-y-4 p-4">
      {/* News Widget */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Legal News
          </h3>
        </div>
        <div className="space-y-3">
          {mockNews.slice(0, 3).map((news) => (
            <div key={news.id} className="group cursor-pointer">
              <h4 className="text-sm font-medium group-hover:text-primary transition-colors leading-tight mb-1">
                {news.title}
              </h4>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{news.source}</p>
                <p className="text-xs text-muted-foreground">{news.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Footer Links */}
      <div className="px-2">
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <a href="#" className="hover:text-primary">About</a>
          <span>·</span>
          <a href="#" className="hover:text-primary">Privacy</a>
          <span>·</span>
          <a href="#" className="hover:text-primary">Terms</a>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          LawyerLink © 2024
        </p>
      </div>
    </aside>
  );
};

export default RightSidebar;
