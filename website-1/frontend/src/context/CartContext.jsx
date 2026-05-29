import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  addToCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from "../api/cart";
import { useAuth } from "./AuthContext.jsx";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState({ products: [], totalAmount: 0 });

  const refreshCart = async () => {
    if (!user) {
      setCart({ products: [], totalAmount: 0 });
      return;
    }
    const data = await getCart();
    setCart(data);
  };

  useEffect(() => {
    refreshCart();
  }, [user]);

  const addItem = async (productId, quantity = 1) => {
    if (!user) return;
    const data = await addToCart(productId, quantity);
    setCart(data);
  };

  const updateItem = async (productId, quantity) => {
    const data = await updateCartItem(productId, quantity);
    setCart(data);
  };

  const removeItem = async (productId) => {
    const data = await removeCartItem(productId);
    setCart(data);
  };

  const value = useMemo(
    () => ({ cart, refreshCart, addItem, updateItem, removeItem }),
    [cart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
