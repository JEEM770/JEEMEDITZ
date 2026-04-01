
-- Scripts table for products
CREATE TABLE public.scripts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  price decimal(10,2) NOT NULL DEFAULT 0,
  preview_image text,
  preview_video text,
  download_url text,
  category text DEFAULT 'after-effects',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Orders table for tracking purchases
CREATE TABLE public.script_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  script_id uuid REFERENCES public.scripts(id) ON DELETE CASCADE NOT NULL,
  buyer_name text NOT NULL,
  buyer_email text NOT NULL,
  buyer_phone text,
  bkash_transaction_id text NOT NULL,
  amount decimal(10,2) NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  download_token text DEFAULT gen_random_uuid()::text,
  downloaded boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.scripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.script_orders ENABLE ROW LEVEL SECURITY;

-- Scripts: everyone can view active scripts
CREATE POLICY "Public can view active scripts" ON public.scripts
  FOR SELECT TO public USING (is_active = true);

-- Scripts: admins can manage
CREATE POLICY "Admins can manage scripts" ON public.scripts
  FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'));

-- Orders: anyone can insert (submit order)
CREATE POLICY "Anyone can submit orders" ON public.script_orders
  FOR INSERT TO public WITH CHECK (true);

-- Orders: admins can view and manage all orders
CREATE POLICY "Admins can manage orders" ON public.script_orders
  FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'));

-- Orders: buyers can view their own orders by email (via RPC later)

-- Update trigger for scripts
CREATE TRIGGER update_scripts_updated_at
  BEFORE UPDATE ON public.scripts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Update trigger for orders
CREATE TRIGGER update_script_orders_updated_at
  BEFORE UPDATE ON public.script_orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
