/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Profile,
  Bag,
  Heart,
  Location,
  Setting,
  Logout,
  Message,
  Edit,
  User,
  Sms,
  Call,
  Lock,
} from "iconsax-react";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editMode, setEditMode] = useState(false);
  const [editProfileMode, setEditProfileMode] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  // User data with editable fields
  const [userData, setUserData] = useState({
    name: "Kwame Asante",
    email: "kwame@example.com",
    phone: "+233 123 456 789",
    joinedDate: "2023-01-15",
  });

  const [tempUserData, setTempUserData] = useState({ ...userData });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Addresses data
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Home",
      address: "123 Main St, Accra, Ghana",
      isDefault: true,
      phone: "+233 123 456 789",
    },
    {
      id: 2,
      name: "Work",
      address: "456 Business Ave, Accra, Ghana",
      isDefault: false,
      phone: "+233 987 654 321",
    },
  ]);

  const [newAddress, setNewAddress] = useState({
    name: "",
    address: "",
    phone: "",
    isDefault: false,
  });

  // Orders data
  const orders = [
    // ... (keep your existing orders data)
  ];

  // ... (keep all your existing filter and handler functions)

  // Profile editing functions
  const handleEditProfile = () => {
    setTempUserData({ ...userData });
    setEditProfileMode(true);
  };

  const handleCancelEdit = () => {
    setEditProfileMode(false);
    setShowPasswordFields(false);
  };

  const handleSaveProfile = () => {
    // Validate password fields if shown
    if (showPasswordFields) {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        alert("New passwords don't match!");
        return;
      }
      if (passwordData.newPassword.length < 8) {
        alert("Password must be at least 8 characters");
        return;
      }
      // Here you would typically verify current password with your backend
    }

    // Update user data
    setUserData({ ...tempUserData });
    setEditProfileMode(false);
    setShowPasswordFields(false);
    alert("Profile updated successfully!");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ... (keep your DeliveryStatus component and other existing code)

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-green-600">My Account</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-green-600">
              <Message size="20" />
            </button>
            <button className="p-2 text-gray-600 hover:text-green-600">
              <Setting size="20" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow-sm p-4 h-fit">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-green-100 p-2 rounded-full">
                <Profile size="24" color="#53b32d" variant="Bulk" />
              </div>
              <div>
                <h2 className="font-medium">{userData.name}</h2>
                <p className="text-xs text-gray-500">{userData.email}</p>
              </div>
            </div>

            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`flex items-center w-full px-3 py-2 text-sm rounded-md ${
                  activeTab === "dashboard"
                    ? "bg-green-50 text-green-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Profile size="18" className="mr-3" />
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex items-center w-full px-3 py-2 text-sm rounded-md ${
                  activeTab === "profile"
                    ? "bg-green-50 text-green-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <User size="18" className="mr-3" />
                My Profile
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`flex items-center w-full px-3 py-2 text-sm rounded-md ${
                  activeTab === "orders"
                    ? "bg-green-50 text-green-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Bag size="18" className="mr-3" />
                My Orders
              </button>
              <button
                onClick={() => setActiveTab("wishlist")}
                className={`flex items-center w-full px-3 py-2 text-sm rounded-md ${
                  activeTab === "wishlist"
                    ? "bg-green-50 text-green-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Heart size="18" className="mr-3" />
                Wishlist
              </button>
              <button
                onClick={() => setActiveTab("addresses")}
                className={`flex items-center w-full px-3 py-2 text-sm rounded-md ${
                  activeTab === "addresses"
                    ? "bg-green-50 text-green-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Location size="18" className="mr-3" />
                My Addresses
              </button>
              <button className="flex items-center w-full px-3 py-2 text-sm rounded-md text-gray-600 hover:bg-gray-50">
                <Logout size="18" className="mr-3" />
                Logout
              </button>
            </nav>
          </div>

          {/* Main Panel */}
          <div className="flex-1">
            {/* Dashboard Tab */}
            {activeTab === "dashboard" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                {/* ... (keep your existing dashboard content) ... */}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold mb-6">
                  {editProfileMode ? "Edit Profile" : "My Profile"}
                </h2>

                {editProfileMode ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User size="18" className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={tempUserData.name}
                          onChange={handleInputChange}
                          className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Sms size="18" className="text-gray-400" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={tempUserData.email}
                          onChange={handleInputChange}
                          className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Call size="18" className="text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={tempUserData.phone}
                          onChange={handleInputChange}
                          className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                    </div>

                    {showPasswordFields && (
                      <div className="space-y-4 pt-4 border-t border-gray-200">
                        <h4 className="font-medium text-gray-700">
                          Change Password
                        </h4>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Current Password
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Lock size="18" className="text-gray-400" />
                            </div>
                            <input
                              type="password"
                              name="currentPassword"
                              value={passwordData.currentPassword}
                              onChange={handlePasswordChange}
                              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                              placeholder="Enter current password"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Lock size="18" className="text-gray-400" />
                            </div>
                            <input
                              type="password"
                              name="newPassword"
                              value={passwordData.newPassword}
                              onChange={handlePasswordChange}
                              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                              placeholder="At least 8 characters"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm New Password
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Lock size="18" className="text-gray-400" />
                            </div>
                            <input
                              type="password"
                              name="confirmPassword"
                              value={passwordData.confirmPassword}
                              onChange={handlePasswordChange}
                              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                              placeholder="Confirm new password"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="pt-4 flex justify-between">
                      <button
                        onClick={() =>
                          setShowPasswordFields(!showPasswordFields)
                        }
                        className="text-sm text-green-600 hover:text-green-800 font-medium"
                      >
                        {showPasswordFields
                          ? "Cancel Password Change"
                          : "Change Password"}
                      </button>

                      <div className="flex space-x-3">
                        <button
                          onClick={handleCancelEdit}
                          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveProfile}
                          className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="font-medium">{userData.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email Address</p>
                        <p className="font-medium">{userData.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone Number</p>
                        <p className="font-medium">{userData.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Member Since</p>
                        <p className="font-medium">
                          {new Date(userData.joinedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <button
                        onClick={handleEditProfile}
                        className="flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                      >
                        <Edit size="16" className="mr-2" />
                        Edit Profile
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* ... (keep your existing orders content) ... */}
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === "wishlist" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                {/* ... (keep your existing wishlist content) ... */}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                {/* ... (keep your existing addresses content) ... */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
