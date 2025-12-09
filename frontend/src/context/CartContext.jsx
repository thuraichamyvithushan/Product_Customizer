import { createContext, useContext, useMemo, useState, useEffect } from "react";

const CartContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clear: () => {},
  total: 0
});

export const CartProvider = ({ children }) => {

  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);

  const addItem = (payload) => {
    setItems((prev) => [...prev, payload]);
  };

  const removeItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const clear = () => {
    setItems([]);
    localStorage.removeItem("cartItems");
  };

  const total = items.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      clear,
      total
    }),
    [items, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
