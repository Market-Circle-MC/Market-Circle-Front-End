import { createContext, useState, useEffect } from "react";

const CartContext = createContext({});

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [isLoading, setIsLoading] = useState(false);

  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  // ADDED: Clear cart function
  const clearCart = () => {
    setCart([]);
  };

  const addToCart = (product) => {
    setIsLoading(true);

    // ADDED: Check if product already exists in cart
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      // If exists, increment quantity
      setCart((prevItems) =>
        prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // If new, add with quantity = 1
      setCart((prevItems) => [...prevItems, { ...product, quantity: 1 }]);
    }

    setIsLoading(false);
  };

  const handleRemove = (id) => {
    const filteredItems = cart.filter((item) => item.id !== id);
    setCart(filteredItems);
  };

  const handleIncrement = (id) => {
    setCart((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    setCart((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const deliveryFee = 20;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    console.table("Cart:", cart);
    const sbt = cart.reduce(
      (acc, item) => acc + item.current_price * item.quantity,
      0
    );
    const tot = sbt + deliveryFee; // CHANGED: Use sbt instead of subtotal to avoid dependency issues
    setTotal(tot);
    setSubtotal(sbt);
    setIsLoading(false);
  }, [cart]);

  // ADDED: Calculate cart count
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        handleRemove,
        handleIncrement,
        handleDecrement,
        subtotal,
        deliveryFee,
        total,
        isLoading,
        clearCart, // ADDED
        cartCount, // ADDED
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
