import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext({
  item: null,
  setItem: () => {},
  clear: () => {}
});

export const CartProvider = ({ children }) => {
  const [item, setItemState] = useState(null);

  const setItem = (payload) => {
    setItemState(payload);
  };

  const clear = () => setItemState(null);

  const value = useMemo(
    () => ({
      item,
      setItem,
      clear
    }),
    [item]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);


