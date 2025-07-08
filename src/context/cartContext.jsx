import { createContext, useState, useEffect } from "react";

const CartContext = createContext({});

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  const addToCart = (product) => {
    // setIsAdding(true);
    product.quantity = 1;
    setCart((prev) => [...prev, product]);
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

  // const subtotalM = () => {
  //   const sbt = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  //   setSubtotal(sbt);
  // };

  const deliveryFee = 20;
  // const totalM = () => {
  //   const tot = subtotal + deliveryFee;
  //   setTotal(tot);
  // };

  useEffect(() => {
    console.table(cart);
    const sbt = cart.reduce(
      (acc, item) => acc + item.current_price * item.quantity,
      0
    );
    const tot = subtotal + deliveryFee;
    setTotal(tot);
    setSubtotal(sbt);
  }, [cart]);

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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
