import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AddReelForm from '@/components/admin/AddReelForm';
import ReelsList from '@/components/admin/ReelsList';
import AdminManagement from '@/components/admin/AdminManagement';
import { GlowButton } from '@/components/ui/glow-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Film, Users, Loader2 } from 'lucide-react';

const AdminDashboard = () => {
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/admin/login');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-24">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">
            You don't have admin privileges. Please contact an existing admin to get access.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Logged in as: {user.email}
          </p>
          <GlowButton onClick={signOut} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </GlowButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              <span className="text-foreground">Admin</span>{' '}
              <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="text-muted-foreground mt-1">
              Logged in as {user.email}
            </p>
          </div>
          <GlowButton onClick={signOut} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </GlowButton>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="reels" className="space-y-6">
          <TabsList className="bg-card/50 border border-border">
            <TabsTrigger value="reels" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Film className="w-4 h-4 mr-2" />
              Reels
            </TabsTrigger>
            <TabsTrigger value="admins" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Users className="w-4 h-4 mr-2" />
              Admins
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reels" className="space-y-6">
            <AddReelForm />
            <ReelsList />
          </TabsContent>

          <TabsContent value="admins">
            <AdminManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
