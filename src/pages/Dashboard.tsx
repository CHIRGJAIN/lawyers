import Navbar from '@/components/Navbar';
import LeftSidebar from '@/components/LeftSidebar';
import RightSidebar from '@/components/RightSidebar';
import CreatePostCard from '@/components/CreatePostCard';
import PostCard from '@/components/PostCard';
import { mockPosts } from '@/lib/mockData';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        {/* Left Sidebar - Hidden on mobile */}
        <div className="hidden lg:block">
          <LeftSidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 max-w-2xl mx-auto px-4 py-6 space-y-6">
          <CreatePostCard />
          <div className="space-y-4">
            {mockPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </main>

        {/* Right Sidebar - Hidden on mobile and tablet */}
        <div className="hidden xl:block">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;