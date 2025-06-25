import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  TickCircle,
  CloseCircle,
  Refresh,
  ShoppingBag,
  ArrowRight,
} from "iconsax-react";

const OrderHistory = () => {
  const navigate = useNavigate();

  // Sample order data
  const [orders, setOrders] = useState([
    {
      id: "ORD-12345",
      date: "2023-05-15",
      status: "completed",
      items: [
        {
          id: 1,
          name: "Organic Bananas",
          price: 5.99,
          quantity: 2,
          image: "/bananas.jpg",
          productId: "prod-001", // Added product ID for linking
        },
        {
          id: 2,
          name: "Whole Wheat Bread",
          price: 3.5,
          quantity: 1,
          image: "/bread.jpg",
          productId: "prod-002",
        },
      ],
      total: 15.48,
      deliveryAddress: "123 Main St, Accra, Ghana",
    },
    {
      id: "ORD-12346",
      date: "2023-06-02",
      status: "canceled",
      items: [
        {
          id: 3,
          name: "Free Range Eggs",
          price: 8.99,
          quantity: 1,
          image: "/eggs.jpg",
          productId: "prod-003",
        },
      ],
      total: 8.99,
      deliveryAddress: "123 Main St, Accra, Ghana",
      cancelReason: "Changed my mind",
    },
    {
      id: "ORD-12347",
      date: "2023-06-10",
      status: "pending",
      items: [
        {
          id: 4,
          name: "Fresh Milk",
          price: 4.25,
          quantity: 3,
          image: "/milk.jpg",
          productId: "prod-004",
        },
        {
          id: 5,
          name: "Butter",
          price: 2.75,
          quantity: 2,
          image: "/butter.jpg",
          productId: "prod-005",
        },
      ],
      total: 19.75,
      deliveryAddress: "123 Main St, Accra, Ghana",
    },
  ]);

  // Filter state
  const [filter, setFilter] = useState("all");

  // Filter orders based on status
  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);

  // Handle reorder single item
  const handleReorderItem = (item) => {
    // In a real app, you would add this item to the cart
    console.log("Reordering item:", item);
    alert(`Added ${item.quantity} ${item.name} to your cart!`);
  };

  // Handle reorder all items in order
  const handleReorderAll = (orderId) => {
    const orderToReorder = orders.find((order) => order.id === orderId);
    console.log("Reordering all items:", orderToReorder.items);
    alert(`Added ${orderToReorder.items.length} items to your cart!`);
  };

  // Navigate to product details
  const goToProductDetails = (productId) => {
    navigate(`/products/${productId}`);
  };

  // Handle order cancellation
  const handleCancel = (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      setOrders(
        orders.map((order) =>
          order.id === orderId
            ? { ...order, status: "canceled", cancelReason: "Canceled by user" }
            : order
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-md ${
                filter === "all"
                  ? "bg-[#53b32d] text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              All Orders
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-4 py-2 rounded-md ${
                filter === "completed"
                  ? "bg-[#53b32d] text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilter("canceled")}
              className={`px-4 py-2 rounded-md ${
                filter === "canceled"
                  ? "bg-[#53b32d] text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              Canceled
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded-md ${
                filter === "pending"
                  ? "bg-[#53b32d] text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              Pending
            </button>
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <ShoppingBag className="mx-auto h-12 w-12 text-gray-400 stroke-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No orders found
            </h3>
            <p className="mt-1 text-gray-500">
              {filter === "all"
                ? "You haven't placed any orders yet."
                : `You don't have any ${filter} orders.`}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white shadow rounded-lg overflow-hidden"
              >
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-medium text-gray-900">
                        Order #{order.id}
                      </h2>
                      <p className="text-sm text-gray-500">
                        Placed on {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center">
                      {order.status === "completed" && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          <TickCircle className="h-4 w-4 mr-1 stroke-green-700" />
                          Completed
                        </span>
                      )}
                      {order.status === "canceled" && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                          <CloseCircle className="h-4 w-4 mr-1 stroke-red-600" />
                          Canceled
                        </span>
                      )}
                      {order.status === "pending" && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                          <Clock className="h-4 w-4 mr-1 stroke-yellow-800" />
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-medium text-gray-900 mb-2">Items</h3>
                  <ul className="divide-y divide-gray-200">
                    {order.items.map((item) => (
                      <li key={item.id} className="py-4 flex items-start">
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <h4
                              className="text-sm font-medium text-gray-900 hover:text-[#53b32d] cursor-pointer"
                              onClick={() => goToProductDetails(item.productId)}
                            >
                              {item.name}
                            </h4>
                            <p className="mt-1 text-sm text-gray-500">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between">
                            <p className="text-sm text-gray-500">
                              GHS {item.price.toFixed(2)}
                            </p>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleReorderItem(item)}
                                className="text-sm text-[#53b32d] hover:text-green-700 font-medium"
                              >
                                Reorder
                              </button>
                              <button
                                onClick={() =>
                                  goToProductDetails(item.productId)
                                }
                                className="flex items-center text-sm text-gray-500 hover:text-gray-700"
                              >
                                View <ArrowRight size="14" className="ml-1" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Total</p>
                      <p>GHS {order.total.toFixed(2)}</p>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      <p>Delivery to: {order.deliveryAddress}</p>
                      {order.cancelReason && (
                        <p className="mt-1">Reason: {order.cancelReason}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-4">
                    {order.status === "completed" && (
                      <button
                        onClick={() => handleReorderAll(order.id)}
                        className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#53b32d] hover:bg-green-700"
                      >
                        <Refresh className="h-4 w-4 mr-2 stroke-white" />
                        Reorder All
                      </button>
                    )}
                    {order.status === "pending" && (
                      <button
                        onClick={() => handleCancel(order.id)}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Cancel Order
                      </button>
                    )}
                    <button
                      onClick={() =>
                        console.log("View order details", order.id)
                      }
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Order Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
