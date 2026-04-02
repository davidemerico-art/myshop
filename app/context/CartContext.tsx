"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext<any>(null);

export function CartProvider({ children }: any) {
  const [cart, setCart] = useState<any[]>([]);

  // carica da localStorage
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  // salva ogni volta che cambia
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: any, qty: number) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);

      let updated;

      if (existing) {
        updated = prev.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + qty }
            : p
        );
      } else {
        updated = [...prev, { ...product, quantity: qty }];
      }

      return updated;
    });
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}