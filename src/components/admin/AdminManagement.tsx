import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GlowButton } from '@/components/ui/glow-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, Loader2, Users, Trash2, Shield } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface AdminUser {
  id: string;
  user_id: string;
  role: string;
  created_at: string;
  email?: string;
}

const AdminManagement = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch admin users
  const { data: admins, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data: roles, error } = await supabase
        .from('user_roles')
        .select('*')
        .eq('role', 'admin');
      
      if (error) throw error;

      // Fetch profiles for each admin to get emails
      const adminsWithEmails = await Promise.all(
        (roles || []).map(async (role) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('email')
            .eq('user_id', role.user_id)
            .maybeSingle();
          
          return {
            ...role,
            email: profile?.email || 'Unknown',
          };
        })
      );

      return adminsWithEmails as AdminUser[];
    },
  });

  // Add admin mutation
  const addAdmin = useMutation({
    mutationFn: async (userEmail: string) => {
      // First, find the user by email in profiles
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('user_id')
        .eq('email', userEmail)
        .maybeSingle();

      if (profileError) throw profileError;
      if (!profile) throw new Error('User not found. Make sure they have signed up first.');

      // Check if already admin
      const { data: existingRole } = await supabase
        .from('user_roles')
        .select('id')
        .eq('user_id', profile.user_id)
        .eq('role', 'admin')
        .maybeSingle();

      if (existingRole) throw new Error('User is already an admin.');

      // Add admin role
      const { error } = await supabase
        .from('user_roles')
        .insert({
          user_id: profile.user_id,
          role: 'admin',
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      setEmail('');
      toast({
        title: 'Admin Added',
        description: 'The user has been granted admin privileges.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to add admin',
        variant: 'destructive',
      });
    },
  });

  // Remove admin mutation
  const removeAdmin = useMutation({
    mutationFn: async (roleId: string) => {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('id', roleId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast({
        title: 'Admin Removed',
        description: 'Admin privileges have been revoked.',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to remove admin',
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      addAdmin.mutate(email.trim());
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Admin Form */}
      <Card className="card-glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-primary" />
            Add New Admin
          </CardTitle>
          <CardDescription>
            Enter the email of a user who has already signed up to grant them admin access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex gap-3">
            <div className="flex-1">
              <Label htmlFor="admin-email" className="sr-only">Email</Label>
              <Input
                id="admin-email"
                type="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background/50"
              />
            </div>
            <GlowButton type="submit" disabled={addAdmin.isPending}>
              {addAdmin.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Admin
                </>
              )}
            </GlowButton>
          </form>
        </CardContent>
      </Card>

      {/* Admins List */}
      <Card className="card-glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Current Admins ({admins?.length || 0})
          </CardTitle>
          <CardDescription>
            Manage users with admin privileges
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-8 flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : !admins || admins.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No admins configured yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {admins.map((admin) => (
                <div
                  key={admin.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border bg-card/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{admin.email}</p>
                      <p className="text-xs text-muted-foreground">
                        Admin since {new Date(admin.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <GlowButton 
                        size="icon" 
                        variant="ghost" 
                        className="text-destructive hover:bg-destructive/10"
                        disabled={admins.length === 1}
                        title={admins.length === 1 ? "Cannot remove the last admin" : "Remove admin"}
                      >
                        <Trash2 className="w-4 h-4" />
                      </GlowButton>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Remove Admin?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will revoke admin privileges from {admin.email}. They will no longer be able to manage reels or other admins.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => removeAdmin.mutate(admin.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Remove
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminManagement;
