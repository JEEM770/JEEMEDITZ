
DROP POLICY "Anyone can submit orders" ON public.script_orders;
CREATE POLICY "Anyone can submit orders" ON public.script_orders
  FOR INSERT TO public WITH CHECK (
    buyer_name IS NOT NULL AND length(trim(buyer_name)) > 0
    AND buyer_email IS NOT NULL AND length(trim(buyer_email)) > 0
    AND bkash_transaction_id IS NOT NULL AND length(trim(bkash_transaction_id)) > 0
    AND amount > 0
  );
