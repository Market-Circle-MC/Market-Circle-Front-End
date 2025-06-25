import { useState } from "react";

const CheckoutPage = () => {
  // Sample form data state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    country: "Ghana", // Default country
    region: "",
    postalCode: "",
    deliveryInstructions: "",
    saveInfo: false,
    paymentMethod: "cash", // Default payment method
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-32">
      <div className="w-full flex gap-10">
        <div className=" flex-2">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            {/* Contact Information */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#53b32d] focus:border-[#53b32d]"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#53b32d] focus:border-[#53b32d]"
                    required
                  />
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#53b32d] focus:border-[#53b32d]"
                  required
                />
              </div>

              <div className="mt-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#53b32d] focus:border-[#53b32d]"
                  required
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Shipping Address
              </h2>

              <div className="mt-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Street Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#53b32d] focus:border-[#53b32d]"
                  required
                />
              </div>

              <div className="mt-4">
                <label
                  htmlFor="apartment"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Apartment, suite, etc. (optional)
                </label>
                <input
                  type="text"
                  id="apartment"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#53b32d] focus:border-[#53b32d]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#53b32d] focus:border-[#53b32d]"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Region
                  </label>
                  <select
                    id="region"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#53b32d] focus:border-[#53b32d]"
                    required
                  >
                    <option value="">Select Region</option>
                    <option value="Greater Accra">Greater Accra</option>
                    <option value="Ashanti">Ashanti</option>
                    <option value="Western">Western</option>
                    <option value="Eastern">Eastern</option>
                    <option value="Central">Central</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="postalCode"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#53b32d] focus:border-[#53b32d]"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#53b32d] focus:border-[#53b32d]"
                  required
                >
                  <option value="Ghana">Ghana</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="deliveryInstructions"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Delivery Instructions (optional)
                </label>
                <textarea
                  id="deliveryInstructions"
                  name="deliveryInstructions"
                  rows={3}
                  value={formData.deliveryInstructions}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#53b32d] focus:border-[#53b32d]"
                  placeholder="e.g. Gate code, building color, etc."
                />
              </div>
            </div>

            {/* Save Info Checkbox */}
            <div className="p-6">
              <div className="flex items-center">
                <input
                  id="saveInfo"
                  name="saveInfo"
                  type="checkbox"
                  checked={formData.saveInfo}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#53b32d] focus:ring-[#53b32d] border-gray-300 rounded"
                />
                <label
                  htmlFor="saveInfo"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Save this information for next time
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary Placeholder - You can add your cart items here */}
        <div className="flex-1 mt-18">
          <div className="mt-8s bg-white shadow rounded-lg rounded-b-none overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Order Summary
              </h2>
              {/* Cart items would be listed here */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>GHS 0.00</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>Delivery Fee</span>
                  <span>GHS 0.00</span>
                </div>
                <div className="flex justify-between font-medium text-gray-900 mt-4 pt-4 border-t border-gray-200">
                  <span>Total</span>
                  <span>GHS 0.00</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-b border-gray-200 bg-white  shadow rounded-lg rounded-t-none">
            <h2 className="text-lg font-medium  text-gray-900 mb-4">
              Payment Method
            </h2>

            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="cash"
                  name="paymentMethod"
                  type="radio"
                  value="cash"
                  checked={formData.paymentMethod === "cash"}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#53b32d] focus:ring-[#53b32d] border-gray-300"
                />
                <label
                  htmlFor="cash"
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  Cash on Delivery
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="mobileMoney"
                  name="paymentMethod"
                  type="radio"
                  value="mobileMoney"
                  checked={formData.paymentMethod === "mobileMoney"}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#53b32d] focus:ring-[#53b32d] border-gray-300"
                />
                <label
                  htmlFor="mobileMoney"
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  Mobile Money
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="card"
                  name="paymentMethod"
                  type="radio"
                  value="card"
                  checked={formData.paymentMethod === "card"}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#53b32d] focus:ring-[#53b32d] border-gray-300"
                />
                <label
                  htmlFor="card"
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  Credit/Debit Card
                </label>
              </div>
            </div>
          </div>
          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="button"
              className="w-full bg-[#53b32d] py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#53b32d]"
            >
              Complete Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
