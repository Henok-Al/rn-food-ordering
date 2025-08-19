import { createContext, useContext, useState, ReactNode } from "react";

interface CartItem {
  item: any;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: any, quantity: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void; // ✅ added
  clearCart: () => void;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: any, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item._id === item._id);
      if (existing) {
        return prev.map((c) =>
          c.item._id === item._id
            ? { ...c, quantity: c.quantity + quantity }
            : c
        );
      }
      return [...prev, { item, quantity }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((c) => c.item._id !== id));
  };

  // ✅ New function to update quantity directly
  const updateQuantity = (id: string, quantity: number) => {
    setCart((prev) =>
      prev.map((c) => (c.item._id === id ? { ...c, quantity } : c))
    );
  };

  const clearCart = () => setCart([]);

  const getTotalItems = () =>
    cart.reduce((sum, c) => sum + c.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getTotalItems }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
