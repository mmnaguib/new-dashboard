import React, { createContext, useState, useContext, ReactNode } from "react";

type CartContextType = {
  cartCount: number;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
};

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  setCartCount: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartCount, setCartCount] = useState<number>(() => {
    const storedCount = localStorage.getItem("cartCount");
    return storedCount ? parseInt(storedCount, 10) : 0;
  });

  return (
    <CartContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
