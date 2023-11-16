import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart items from local storage if available
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => {
    setIsCartOpen(true);
    document.body.classList.add("no-scroll");
  };
  const closeCart = () => {
    setIsCartOpen(false);
    document.body.classList.remove("no-scroll");
  };

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      // Check if the item is already in the cart considering size
      const itemExists = prevItems.find(
        (i) => i.id === item.id && (!item.size || i.size === item.size)
      );

      if (itemExists) {
        // Increase quantity
        return prevItems.map((i) =>
          i.id === item.id && (!item.size || i.size === item.size)
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      // Add new item
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const increaseQuantity = (item) => {
    setCartItems((prevItems) => {
      return prevItems.map((i) => {
        if (
          i.id === item.id &&
          (!item.size || i.size === item.size) &&
          i.quantity < 9
        ) {
          return { ...i, quantity: i.quantity + 1 };
        }
        return i;
      });
    });
  };

  const decreaseQuantity = (item) => {
    setCartItems((prevItems) => {
      return prevItems.reduce((acc, i) => {
        if (i.id === item.id && (!item.size || i.size === item.size)) {
          const newQuantity = i.quantity - 1;
          if (newQuantity > 0) {
            acc.push({ ...i, quantity: newQuantity });
          }
        } else {
          acc.push(i);
        }
        return acc;
      }, []);
    });
  };

  const removeFromCart = (item) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (i) => i.id !== item.id || (item.size && i.size !== item.size)
      )
    );
  };

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const getCartItemsCount = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    isCartOpen,
    openCart,
    closeCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
    getCartItemsCount,
  };

  useEffect(() => {
    // Save cart items to local storage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
