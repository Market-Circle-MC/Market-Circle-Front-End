import { createContext, useState, useEffect } from "react";
import useSWR from "swr";
import { apiUrl } from "@/constants";
import useSWRMutation from "swr/mutation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CartContext = createContext({});

const CartProvider = ({ children }) => {
  const fetchCart = (url) =>
    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${loggedUser?.token}`,
      },
    }).then((r) => r.json());

  const {
    data: cartData,
    isLoading: cartLoading,
    error: cartError,
  } = useSWR(`${apiUrl}api/cart`, fetchCart);

  const [loggedUser, setLoggedUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );

  const removeFromCart = async (url, args) => {
    const id = args.arg;
    console.log("from ", id);
    return fetch(url + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${loggedUser?.token}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => err);
  };

  const clearFromCart = async (url, args) => {
    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${loggedUser?.token}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => err);
  };

  const {
    data: clearCartData,
    isMutating: clearCartMutating,
    error: clearCartError,
    trigger: clearCartTrigger,
  } = useSWRMutation(`${apiUrl}api/cart/clear`, clearFromCart, {
    onSuccess: (data) => {
      toast.success(data?.message, {
        theme: "colored",
      });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const {
    data: removeData,
    isMutating: removeMutating,
    error: remoteError,
    trigger: removeTrigger,
  } = useSWRMutation(`${apiUrl}api/cart/remove-item/`, removeFromCart, {
    onSuccess: (data) => {
      toast.success(data?.message, {
        theme: "colored",
      });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const addToCard = async (url, args) => {
    const { product_id, quantity } = args.arg;
    return fetch(url, {
      method: "POST",
      body: JSON.stringify({
        product_id,
        quantity,
      }),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${loggedUser?.token}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => err);
  };

  const {
    data,
    isMutating: addToCartMutating,
    error,
    trigger,
  } = useSWRMutation(`${apiUrl}api/cart/add`, addToCard, {
    onSuccess: (data) => {
      toast.success(data?.message, {
        theme: "colored",
      });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const clearCart = async () => {
    await clearCartTrigger();
  };

  const [searchQuery, setSearchQuery] = useState("");

  const addToCart = async (product) => {
    if (!loggedUser?.user) {
      window.location.href = "/login";
      return;
    }

    await trigger({ product_id: product.id, quantity: 1 });
  };

  const handleRemove = async (id) => {
    // console.log(id);
    await removeTrigger(id);
    // const filteredItems = cart.filter((item) => item.id !== id);
    // setCart(filteredItems);
  };

  // const handleIncrement = (id) => {
  //   setCart((prevItems) =>
  //     prevItems.map((item) =>
  //       item.id === id ? { ...item, quantity: item.quantity + 1 } : item
  //     )
  //   );
  // };

  // const handleDecrement = (id) => {
  //   setCart((prevItems) =>
  //     prevItems.map((item) =>
  //       item.id === id
  //         ? { ...item, quantity: Math.max(1, item.quantity - 1) }
  //         : item
  //     )
  //   );
  // };

  const deliveryFee = 20;

  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(cart));
  //   console.table("Cart:", cart);
  //   const sbt = cart.reduce(
  //     (acc, item) => acc + item.current_price * item.quantity,
  //     0
  //   );
  //   const tot = sbt + deliveryFee; // CHANGED: Use sbt instead of subtotal to avoid dependency issues
  //   setTotal(tot);
  //   setSubtotal(sbt);
  //   setIsLoading(false);
  // }, [cart]);

  // ADDED: Calculate cart count
  // const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        deliveryFee,
        setSearchQuery,
        searchQuery,
        addToCart,
        cartData,
        handleRemove,
        clearCart,
        addToCartMutating,
        removeMutating,
        clearCartMutating,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
