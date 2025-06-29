import {
  Trash,
  Minus,
  Add,
  InfoCircle,
  ShoppingCart,
  ArrowUp,
  ArrowDown,
} from "iconsax-react";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/cartContext";

const Cart = () => {
  const {
    cart,
    handleRemove,
    handleIncrement,
    handleDecrement,
    subtotal,
    total,
    deliveryFee,
  } = useContext(CartContext);
  // const [cartItems, setCartItems] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const baseUrl = "https://fakestoreapi.com";

  // useEffect(() => {
  //   // const fetchCartData = async () => {
  //   //   try {
  //   //     // Fetch cart data
  //   //     const cartsResponse = await fetch(`${baseUrl}/carts`);
  //   //     const cartsData = await cartsResponse.json();

  //   //     // Get all product IDs from all carts
  //   //     const productIds = cartsData.flatMap((cart) =>
  //   //       cart.products.map((product) => product.productId)
  //   //     );

  //   //     // Fetch details for all unique products
  //   //     const productsResponse = await Promise.all(
  //   //       [...new Set(productIds)].map((id) =>
  //   //         fetch(`${baseUrl}/products/${id}`).then((res) => res.json())
  //   //       )
  //   //     );

  //   //     // Combine cart items with product details
  //   //     const combinedItems = cartsData.flatMap((cart) =>
  //   //       cart.products.map((item) => {
  //   //         const product = productsResponse.find(
  //   //           (p) => p.id === item.productId
  //   //         );
  //   //         return {
  //   //           ...item,
  //   //           ...product,
  //   //           quantity: item.quantity || 1,
  //   //         };
  //   //       })
  //   //     );

  //   //     setCartItems(combinedItems);
  //   //   } catch (error) {
  //   //     console.error("Error fetching data:", error);
  //   //   } finally {
  //   //     setLoading(false);
  //   //   }
  //   // };

  //   fetchCartData();
  // }, []);

  // const handleDecrement = (id) => {
  //   setCartItems((prevItems) =>
  //     prevItems.map((item) =>
  //       item.productId === id
  //         ? { ...item, quantity: Math.max(1, item.quantity - 1) }
  //         : item
  //     )
  //   );
  // };

  // const handleIncrement = (id) => {
  //   setCartItems((prevItems) =>
  //     prevItems.map((item) =>
  //       item.productId === id ? { ...item, quantity: item.quantity + 1 } : item
  //     )
  //   );
  // };

  // const handleRemove = (id) => {
  //   setCartItems((prevItems) =>
  //     prevItems.filter((item) => item.productId !== id)
  //   );
  // };

  // const subtotal = cartItems.reduce(
  //   (acc, item) => acc + item.price * item.quantity,
  //   0
  // );
  // const deliveryFee = 20;
  // const total = subtotal + deliveryFee;

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="max-w-5xls w-full px-36 flex pt-28 flex-col justify-between p-4">
      <h1 className="text-3xl font-bold mb-6">
        Your Cart ({cart.length}) items
      </h1>

      {cart.length ? (
        <div className="space-y-4">
          <div className="flex gap-3 max-w-full">
            {/* Cart Items */}
            <div className="flex-1 space-y-1 max-h-2/4 h-[700px] relative overflow-y-scroll">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${Math.random()}`}
                  className="flex bg-white p-2 flex-col border-t border-gray-300"
                >
                  <div className="flex item-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1 flex flex-col gap-2 max-w-lg w-full">
                        <h2 className="text-base font-semibold">
                          {item.title}
                        </h2>
                        <span className="flex items-center gap-2">
                          <InfoCircle
                            variant="Outline"
                            size="16"
                            color="#FF8A65"
                          />
                          <h3 className="text-red-400">6 left</h3>
                        </span>
                      </div>
                    </div>
                    <div className="font-bold text-lg">
                      <div className="flex flex-col gap-1">
                        <span>
                          {" "}
                          GH₵ {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-red-400 w-44 hover:text-red-700 p-4 flex cursor-pointer items-center"
                    >
                      <Trash className="fill-red-400 w-6 h-6" />
                      Remove
                    </button>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleDecrement(item.id)}
                        className="w-10 h-10 cursor-pointer bg-gray-100 hover:bg-gray-200 flex items-center justify-center p-2 rounded-lg"
                      >
                        <Minus size="18" className="stroke-black" />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleIncrement(item.id)}
                        className="w-10 h-10 cursor-pointer marketGreen hover:bg-gray-200 flex items-center justify-center p-2 rounded-lg"
                      >
                        <Add size="18" className="stroke-white" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {cart.length >= 5 ? (
                <ArrowDown
                  className="absolute bottom-0 right-0 animate-bounce bg-amber-800 rounded-full p-2 shadow-md"
                  size="32"
                  color="#FF8A65"
                />
              ) : (
                ""
              )}
            </div>
            <div className=" w-96 flex justify-center items-start">
              {/* Summary */}
              <div className="bg-white rounded-xl p-4 shadow space-y-4 w-full h-auto">
                <h2 className="text-xl font-bold"> Cart Summary</h2>
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span className="text-lg">GH₵ {subtotal.toFixed(2)}</span>
                  {/* <span className="text-lg">GH₵ </span> */}
                </div>
                <div className="flex justify-between text-sm">
                  <span>Delivery Fee</span>
                  <span>₵{deliveryFee.toFixed(2)}</span>
                  <span>₵</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>GH₵ {total.toFixed(2)}</span>
                  {/* <span>GH₵ </span> */}
                </div>
                <Link to={"/checkout"}>
                  <button className="w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800 cursor-pointer">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
          {cart.length >= 5 ? (
            <span className="mt-1 text-gray-500">
              Scroll down to see more items
            </span>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="w-full h-screen flex items-center justify-center gap-4 flex-col">
          <ShoppingCart className="w-36 stroke-[#53b32d] stroke-1" />
          <span className="text-3xl font-medium text-[#c4c4c4]">
            Empty Cart
          </span>
        </div>
      )}
    </div>
  );
};

export default Cart;
