import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Chart,
  Box,
  Add,
  Edit,
  Trash,
  TickCircle,
  Clock,
  Setting,
  Logout,
  Receipt,
  Truck,
  Shop,
  Money,
  User,
} from "iconsax-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [products, setProducts] = useState([
    {
      id: "prod-001",
      name: "Organic Bananas",
      category: "Fruits",
      price: 5.99,
      stock: 120,
      image: "https://via.placeholder.com/80",
      status: "active",
    },
    {
      id: "prod-002",
      name: "Whole Wheat Bread",
      category: "Bakery",
      price: 3.5,
      stock: 85,
      image: "https://via.placeholder.com/80",
      status: "active",
    },
    {
      id: "prod-003",
      name: "Free Range Eggs",
      category: "Dairy",
      price: 8.99,
      stock: 0,
      image: "https://via.placeholder.com/80",
      status: "out_of_stock",
    },
  ]);

  const [orders, setOrders] = useState([
    {
      id: "ORD-12345",
      date: "2023-05-15",
      status: "delivered",
      customer: "Kwame Asante",
      items: 3,
      total: 15.48,
      payment: "Paid",
    },
    {
      id: "ORD-12346",
      date: "2023-06-02",
      status: "processing",
      customer: "Ama Mensah",
      items: 5,
      total: 42.75,
      payment: "Pending",
    },
  ]);

  const [showProductForm, setShowProductForm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: "",
    status: "active",
  });

  // Sales analytics data
  const salesData = {
    totalRevenue: 12543.28,
    totalOrders: 342,
    avgOrderValue: 36.67,
    topProducts: [
      { name: "Organic Bananas", sales: 215 },
      { name: "Free Range Eggs", sales: 187 },
      { name: "Whole Wheat Bread", sales: 156 },
    ],
  };

  // Handle product form input changes
  const handleProductInputChange = (e) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit product form
  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (currentProduct) {
      // Update existing product
      setProducts(
        products.map((p) =>
          p.id === currentProduct.id
            ? { ...productForm, id: currentProduct.id }
            : p
        )
      );
    } else {
      // Add new product
      const newProduct = {
        ...productForm,
        id: `prod-${Math.floor(1000 + Math.random() * 9000)}`,
        stock: parseInt(productForm.stock),
        price: parseFloat(productForm.price),
      };
      setProducts([...products, newProduct]);
    }
    setShowProductForm(false);
    setCurrentProduct(null);
    setProductForm({
      name: "",
      category: "",
      price: "",
      stock: "",
      image: "",
      status: "active",
    });
  };

  // Edit product
  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setProductForm({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      image: product.image,
      status: product.status,
    });
    setShowProductForm(true);
  };

  // Delete product
  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== productId));
    }
  };

  // Update order status
  const updateOrderStatus = (orderId, status) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-green-600">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-green-600">
              <Setting size="20" />
            </button>
            <button className="p-2 text-gray-600 hover:text-green-600">
              <Logout size="20" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow-sm p-4 h-fit">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`flex items-center w-full px-3 py-2 text-sm rounded-md ${
                  activeTab === "dashboard"
                    ? "bg-green-50 text-green-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Chart size="18" className="mr-3" />
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab("products")}
                className={`flex items-center w-full px-3 py-2 text-sm rounded-md ${
                  activeTab === "products"
                    ? "bg-green-50 text-green-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Box size="18" className="mr-3" />
                Products
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`flex items-center w-full px-3 py-2 text-sm rounded-md ${
                  activeTab === "orders"
                    ? "bg-green-50 text-green-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Receipt size="18" className="mr-3" />
                Orders
              </button>
              <button
                onClick={() => setActiveTab("customers")}
                className={`flex items-center w-full px-3 py-2 text-sm rounded-md ${
                  activeTab === "customers"
                    ? "bg-green-50 text-green-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <User size="18" className="mr-3" />
                Customers
              </button>
              <button
                onClick={() => setActiveTab("deliveries")}
                className={`flex items-center w-full px-3 py-2 text-sm rounded-md ${
                  activeTab === "deliveries"
                    ? "bg-green-50 text-green-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Truck size="18" className="mr-3" />
                Deliveries
              </button>
            </nav>
          </div>

          {/* Main Panel */}
          <div className="flex-1">
            {/* Dashboard Tab */}
            {activeTab === "dashboard" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold mb-6">Overview</h2>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <Money size="20" color="#53b32d" variant="Bulk" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Revenue</p>
                        <p className="font-bold">
                          GHS {salesData.totalRevenue.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <Receipt size="20" color="#53b32d" variant="Bulk" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Orders</p>
                        <p className="font-bold">{salesData.totalOrders}</p>
                      </div>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <Shop size="20" color="#53b32d" variant="Bulk" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          Avg. Order Value
                        </p>
                        <p className="font-bold">
                          GHS {salesData.avgOrderValue.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Recent Orders</h3>
                    <button
                      className="text-green-600 hover:text-green-800 text-sm"
                      onClick={() => setActiveTab("orders")}
                    >
                      View All
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Order ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Customer
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {orders.slice(0, 5).map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {order.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {order.customer}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(order.date).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              GHS {order.total.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {order.status === "delivered" && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  <TickCircle size="12" className="mr-1" />
                                  Delivered
                                </span>
                              )}
                              {order.status === "processing" && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                  <Clock size="12" className="mr-1" />
                                  Processing
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Top Products */}
                <div>
                  <h3 className="font-medium mb-4">Top Selling Products</h3>
                  <div className="space-y-3">
                    {salesData.topProducts.map((product, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-xs font-medium text-green-800">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{product.name}</p>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-green-600 h-1.5 rounded-full"
                              style={{
                                width: `${
                                  (product.sales /
                                    salesData.topProducts[0].sales) *
                                  100
                                }%`,
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="ml-4 text-sm text-gray-500">
                          {product.sales} sold
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Products Tab */}
            {activeTab === "products" && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-bold">Product Management</h2>
                  <button
                    onClick={() => {
                      setCurrentProduct(null);
                      setShowProductForm(true);
                    }}
                    className="flex items-center px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                  >
                    <Add size="16" className="mr-1.5" />
                    Add Product
                  </button>
                </div>

                {showProductForm && (
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="font-medium mb-4">
                      {currentProduct ? "Edit Product" : "Add New Product"}
                    </h3>
                    <form onSubmit={handleProductSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Product Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={productForm.name}
                            onChange={handleProductInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category
                          </label>
                          <input
                            type="text"
                            name="category"
                            value={productForm.category}
                            onChange={handleProductInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Price (GHS)
                          </label>
                          <input
                            type="number"
                            name="price"
                            value={productForm.price}
                            onChange={handleProductInputChange}
                            min="0"
                            step="0.01"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Stock Quantity
                          </label>
                          <input
                            type="number"
                            name="stock"
                            value={productForm.stock}
                            onChange={handleProductInputChange}
                            min="0"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Image URL
                          </label>
                          <input
                            type="url"
                            name="image"
                            value={productForm.image}
                            onChange={handleProductInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                          </label>
                          <select
                            name="status"
                            value={productForm.status}
                            onChange={handleProductInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="out_of_stock">Out of Stock</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => setShowProductForm(false)}
                          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                        >
                          {currentProduct ? "Update Product" : "Add Product"}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Products List */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Stock
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-md"
                                  src={product.image}
                                  alt={product.name}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {product.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            GHS {product.price.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.stock}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {product.status === "active" && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Active
                              </span>
                            )}
                            {product.status === "inactive" && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                Inactive
                              </span>
                            )}
                            {product.status === "out_of_stock" && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                Out of Stock
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="text-green-600 hover:text-green-900 mr-3"
                            >
                              <Edit size="16" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash size="16" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-bold">Order Management</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Items
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Payment
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {order.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(order.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.customer}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.items}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            GHS {order.total.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {order.payment === "Paid" ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Paid
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Pending
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {order.status === "delivered" && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Delivered
                              </span>
                            )}
                            {order.status === "processing" && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Processing
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() =>
                                navigate(`/admin/orders/${order.id}`)
                              }
                              className="text-green-600 hover:text-green-900 mr-2"
                            >
                              View
                            </button>
                            {order.status === "processing" && (
                              <button
                                onClick={() =>
                                  updateOrderStatus(order.id, "delivered")
                                }
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Mark as Delivered
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Customers Tab */}
            {activeTab === "customers" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold mb-6">Customer Management</h2>
                <div className="text-center py-12">
                  <User size="48" className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Customer Management
                  </h3>
                  <p className="text-gray-500">
                    View and manage all customer accounts
                  </p>
                </div>
              </div>
            )}

            {/* Deliveries Tab */}
            {activeTab === "deliveries" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold mb-6">Delivery Management</h2>
                <div className="text-center py-12">
                  <Truck size="48" className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Delivery Tracking
                  </h3>
                  <p className="text-gray-500">
                    Monitor and manage all deliveries
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
