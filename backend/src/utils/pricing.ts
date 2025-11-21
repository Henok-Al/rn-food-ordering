export type PricingBreakdown = { subtotal: number; tax: number; total: number };

export const computeFees = (lineItems: Array<{ price: number; quantity: number }>): PricingBreakdown => {
  const subtotal = lineItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Number((subtotal * 0.0875).toFixed(2));
  const total = Number((subtotal + tax).toFixed(2));
  return { subtotal, tax, total };
};
