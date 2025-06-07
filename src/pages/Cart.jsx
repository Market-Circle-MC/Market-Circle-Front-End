import { Trash } from "iconsax-react";
import { GROCERY } from "../constants";
const Cart = () => {
  const cartItems = [
    {
      id: 1,
      name: "Unisex T-Shirt",
      price: 80,
      quantity: 2,
      image: GROCERY,
    },
    {
      id: 2,
      name: "Ladies Corset Dress",
      price: 120,
      quantity: 1,
      image: "https://via.placeholder.com/80",
    },
  ];

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryFee = 20;
  const total = subtotal + deliveryFee;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-white rounded-xl p-4 shadow"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-500">
                  ₵{item.price} x {item.quantity}
                </p>
              </div>
              <p className="font-bold text-lg">₵{item.price * item.quantity}</p>
              <button className="text-red-500 hover:text-red-700">
                <Trash />
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl p-6 shadow space-y-4">
          <h2 className="text-xl font-bold">Summary</h2>
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>₵{subtotal}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Delivery Fee</span>
            <span>₵{deliveryFee}</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-semibold">
            <span>Total</span>
            <span>₵{total}</span>
          </div>
          <button className="w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
