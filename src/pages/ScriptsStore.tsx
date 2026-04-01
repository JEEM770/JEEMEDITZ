import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Download, X, Phone, Check, Loader2, Package, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { GlowButton } from '@/components/ui/glow-button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { z } from 'zod';

const orderSchema = z.object({
  buyer_name: z.string().trim().min(1, 'নাম দিন').max(100),
  buyer_email: z.string().trim().email('সঠিক ইমেইল দিন').max(255),
  buyer_phone: z.string().trim().min(11, 'সঠিক ফোন নম্বর দিন').max(15).optional().or(z.literal('')),
  bkash_transaction_id: z.string().trim().min(5, 'সঠিক Transaction ID দিন').max(50),
});

interface Script {
  id: string;
  title: string;
  description: string | null;
  price: number;
  preview_image: string | null;
  preview_video: string | null;
  category: string | null;
}

const BKASH_NUMBER = '01XXXXXXXXX'; // Replace with real bKash number

const ScriptsStore = () => {
  const [selectedScript, setSelectedScript] = useState<Script | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [formData, setFormData] = useState({
    buyer_name: '',
    buyer_email: '',
    buyer_phone: '',
    bkash_transaction_id: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { data: scripts, isLoading } = useQuery({
    queryKey: ['scripts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('scripts')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Script[];
    },
  });

  const handleBuy = (script: Script) => {
    setSelectedScript(script);
    setShowPaymentModal(true);
    setOrderSuccess(false);
    setFormData({ buyer_name: '', buyer_email: '', buyer_phone: '', bkash_transaction_id: '' });
    setErrors({});
  };

  const handleSubmitOrder = async () => {
    if (!selectedScript) return;

    const result = orderSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((e) => {
        if (e.path[0]) fieldErrors[e.path[0] as string] = e.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    const { error } = await supabase.from('script_orders').insert({
      script_id: selectedScript.id,
      buyer_name: result.data.buyer_name,
      buyer_email: result.data.buyer_email,
      buyer_phone: result.data.buyer_phone || null,
      bkash_transaction_id: result.data.bkash_transaction_id,
      amount: selectedScript.price,
    });

    setIsSubmitting(false);

    if (error) {
      toast.error('Order submit করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
      return;
    }

    setOrderSuccess(true);
    toast.success('Order সফলভাবে জমা হয়েছে! Verify হলে download link পাবেন।');
  };

  const closeModal = () => {
    setShowPaymentModal(false);
    setSelectedScript(null);
    setOrderSuccess(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 px-4 py-1.5 text-sm border-primary/30">
            <Package className="w-4 h-4 mr-2" />
            AE Scripts Store
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            After Effects <span className="text-gradient">Scripts & Tools</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            আমার তৈরি After Effects Scripts কিনুন। bKash দিয়ে পেমেন্ট করুন, সাথে সাথে ডাউনলোড করুন।
          </p>
        </motion.div>

        {/* Scripts Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : !scripts?.length ? (
          <div className="text-center py-20 text-muted-foreground">
            <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">কোনো script পাওয়া যায়নি। শীঘ্রই আসছে!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {scripts.map((script, i) => (
              <motion.div
                key={script.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="group overflow-hidden border-border/50 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 bg-card/50 backdrop-blur-sm">
                  {/* Preview Image */}
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    {script.preview_image ? (
                      <img
                        src={script.preview_image}
                        alt={script.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-12 h-12 text-muted-foreground/30" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-primary/90 text-primary-foreground font-bold text-base px-3 py-1">
                        ৳{script.price}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-5 space-y-3">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {script.title}
                    </h3>
                    {script.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {script.description}
                      </p>
                    )}
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <GlowButton
                      onClick={() => handleBuy(script)}
                      className="w-full mt-2"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      কিনুন — ৳{script.price}
                    </GlowButton>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-bold mb-8">কিভাবে কিনবেন?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { step: '১', title: 'bKash Send Money', desc: `${BKASH_NUMBER} নম্বরে টাকা পাঠান` },
              { step: '২', title: 'Transaction ID দিন', desc: 'ফর্মে আপনার তথ্য ও Transaction ID দিন' },
              { step: '৩', title: 'ডাউনলোড করুন', desc: 'Verify হলে ইমেইলে ডাউনলোড লিংক পাবেন' },
            ].map((item) => (
              <div key={item.step} className="p-6 rounded-2xl bg-card/50 border border-border/50 text-center">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary font-bold text-lg flex items-center justify-center mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && selectedScript && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={closeModal} />
            <motion.div
              className="relative w-full max-w-md rounded-2xl border border-border/50 bg-card p-6 shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <button onClick={closeModal} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>

              {orderSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Order জমা হয়েছে! ✅</h3>
                  <p className="text-muted-foreground text-sm">
                    আপনার Transaction verify হলে <strong>{formData.buyer_email}</strong> এ ডাউনলোড লিংক পাঠানো হবে।
                  </p>
                  <GlowButton onClick={closeModal} className="mt-6">
                    ঠিক আছে
                  </GlowButton>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold mb-1">{selectedScript.title}</h3>
                  <p className="text-primary font-bold text-lg mb-4">৳{selectedScript.price}</p>

                  {/* bKash Info */}
                  <div className="rounded-xl bg-pink-500/10 border border-pink-500/20 p-4 mb-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="w-4 h-4 text-pink-400" />
                      <span className="font-semibold text-pink-300">bKash Send Money</span>
                    </div>
                    <p className="text-2xl font-mono font-bold text-pink-400 tracking-wider">{BKASH_NUMBER}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      এই নম্বরে ৳{selectedScript.price} পাঠান, তারপর নিচে Transaction ID দিন
                    </p>
                  </div>

                  {/* Form */}
                  <div className="space-y-3">
                    <div>
                      <input
                        type="text"
                        placeholder="আপনার নাম *"
                        value={formData.buyer_name}
                        onChange={(e) => setFormData({ ...formData, buyer_name: e.target.value })}
                        className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                        maxLength={100}
                      />
                      {errors.buyer_name && <p className="text-xs text-destructive mt-1">{errors.buyer_name}</p>}
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="ইমেইল *"
                        value={formData.buyer_email}
                        onChange={(e) => setFormData({ ...formData, buyer_email: e.target.value })}
                        className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                        maxLength={255}
                      />
                      {errors.buyer_email && <p className="text-xs text-destructive mt-1">{errors.buyer_email}</p>}
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="ফোন নম্বর (ঐচ্ছিক)"
                        value={formData.buyer_phone}
                        onChange={(e) => setFormData({ ...formData, buyer_phone: e.target.value })}
                        className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                        maxLength={15}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="bKash Transaction ID *"
                        value={formData.bkash_transaction_id}
                        onChange={(e) => setFormData({ ...formData, bkash_transaction_id: e.target.value })}
                        className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                        maxLength={50}
                      />
                      {errors.bkash_transaction_id && <p className="text-xs text-destructive mt-1">{errors.bkash_transaction_id}</p>}
                    </div>
                  </div>

                  <GlowButton
                    onClick={handleSubmitOrder}
                    disabled={isSubmitting}
                    className="w-full mt-5"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> জমা হচ্ছে...</>
                    ) : (
                      <><Download className="w-4 h-4 mr-2" /> Order জমা দিন</>
                    )}
                  </GlowButton>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScriptsStore;
