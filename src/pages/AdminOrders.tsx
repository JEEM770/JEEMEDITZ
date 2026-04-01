import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Loader2, Shield, Mail, Phone, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GlowButton } from '@/components/ui/glow-button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface Order {
  id: string;
  buyer_name: string;
  buyer_email: string;
  buyer_phone: string | null;
  bkash_transaction_id: string;
  amount: number;
  status: string;
  download_token: string;
  downloaded: boolean;
  created_at: string;
  script_id: string;
  scripts?: { title: string } | null;
}

const AdminOrders = () => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const queryClient = useQueryClient();

  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession();
      return data.session;
    },
  });

  const { data: isAdmin } = useQuery({
    queryKey: ['isAdmin', session?.user?.id],
    enabled: !!session?.user?.id,
    queryFn: async () => {
      const { data } = await supabase.rpc('has_role', {
        _user_id: session!.user.id,
        _role: 'admin',
      });
      return data;
    },
  });

  const { data: orders, isLoading } = useQuery({
    queryKey: ['admin-orders', filter],
    enabled: !!isAdmin,
    queryFn: async () => {
      let query = supabase
        .from('script_orders')
        .select('*, scripts(title)')
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as unknown as Order[];
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('script_orders')
        .update({ status })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: (_, { status }) => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
      toast.success(status === 'approved' ? 'Order approved! ✅' : 'Order rejected.');
    },
    onError: () => {
      toast.error('Status update করতে সমস্যা হয়েছে');
    },
  });

  if (!session) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <Shield className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-bold mb-2">Admin Login Required</h2>
            <p className="text-muted-foreground mb-4">Please sign in as admin to manage orders.</p>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p className="text-muted-foreground">Access denied. Admin only.</p>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    approved: 'bg-green-500/20 text-green-400 border-green-500/30',
    rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold mb-6">
            <Shield className="w-7 h-7 inline mr-2 text-primary" />
            Order Management
          </h1>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {(['all', 'pending', 'approved', 'rejected'] as const).map((f) => (
              <GlowButton
                key={f}
                variant={filter === f ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(f)}
              >
                {f === 'all' ? 'সব' : f === 'pending' ? 'Pending' : f === 'approved' ? 'Approved' : 'Rejected'}
              </GlowButton>
            ))}
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : !orders?.length ? (
            <p className="text-muted-foreground text-center py-12">কোনো order নেই।</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="border-border/50 bg-card/50">
                  <CardContent className="p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold">{order.scripts?.title || 'Unknown Script'}</h3>
                          <Badge className={`text-xs ${statusColors[order.status] || ''}`}>
                            {order.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>👤 {order.buyer_name}</p>
                          <p className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {order.buyer_email}</p>
                          {order.buyer_phone && <p className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {order.buyer_phone}</p>}
                          <p className="font-mono text-primary">bKash TxID: {order.bkash_transaction_id}</p>
                          <p className="font-bold text-foreground">৳{order.amount}</p>
                          <p className="flex items-center gap-1 text-xs"><Clock className="w-3 h-3" /> {new Date(order.created_at).toLocaleString('bn-BD')}</p>
                        </div>
                      </div>

                      {order.status === 'pending' && (
                        <div className="flex gap-2 sm:flex-col">
                          <GlowButton
                            size="sm"
                            onClick={() => updateStatus.mutate({ id: order.id, status: 'approved' })}
                            disabled={updateStatus.isPending}
                          >
                            <Check className="w-4 h-4 mr-1" /> Approve
                          </GlowButton>
                          <GlowButton
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus.mutate({ id: order.id, status: 'rejected' })}
                            disabled={updateStatus.isPending}
                          >
                            <X className="w-4 h-4 mr-1" /> Reject
                          </GlowButton>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

// Simple login form for admin
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      window.location.reload();
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-3 mt-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
        required
      />
      <GlowButton type="submit" disabled={loading} className="w-full">
        {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
        Sign In
      </GlowButton>
    </form>
  );
};

export default AdminOrders;
