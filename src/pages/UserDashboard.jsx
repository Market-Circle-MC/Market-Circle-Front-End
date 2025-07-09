import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  Profile,
  Bag,
  Heart,
  Location,
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
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [editProfileMode, setEditProfileMode] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize user data from context
  const [userData, setUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone_number || "",
    joinedDate: user?.created_at || new Date().toISOString(),
  });

  const [tempUserData, setTempUserData] = useState({ ...userData });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Addresses data
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    name: "",
    address: "",
    phone: "",
    isDefault: false,
  });

  // Fetch user addresses on component mount
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch(
          "https://marketcircle-backend.onrender.com/api/addresses",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setAddresses(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch addresses:", error);
      }
    };

    if (user) {
      fetchAddresses();
    }
  }, [user]);

  const handleEditProfile = () => {
    setTempUserData({ ...userData });
    setEditProfileMode(true);
  };

  const handleCancelEdit = () => {
    setEditProfileMode(false);
    setShowPasswordFields(false);
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      // Update profile information
      const response = await fetch(
        "https://marketcircle-backend.onrender.com/api/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            name: tempUserData.name,
            email: tempUserData.email,
            phone_number: tempUserData.phone,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      // Update password if fields are shown
      if (showPasswordFields) {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
          throw new Error("New passwords don't match!");
        }
        if (passwordData.newPassword.length < 8) {
          throw new Error("Password must be at least 8 characters");
        }

        const passwordResponse = await fetch(
          "https://marketcircle-backend.onrender.com/api/change-password",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({
              current_password: passwordData.currentPassword,
              new_password: passwordData.newPassword,
              new_password_confirmation: passwordData.confirmPassword,
            }),
          }
        );

        if (!passwordResponse.ok) {
          throw new Error("Failed to change password");
        }
      }

      setUserData({ ...tempUserData });
      setEditProfileMode(false);
      setShowPasswordFields(false);
      alert("Profile updated successfully!");
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen pt-28 bg-gray-100">
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
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-3 py-2 text-sm rounded-md text-gray-600 hover:bg-gray-50"
              >
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
                <h2 className="text-xl font-bold mb-6">Dashboard Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-medium text-green-800">
                      Recent Orders
                    </h3>
                    <p className="text-2xl font-bold mt-2">0</p>
                    <p className="text-sm text-gray-500">No recent orders</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-800">
                      Wishlist Items
                    </h3>
                    <p className="text-2xl font-bold mt-2">0</p>
                    <p className="text-sm text-gray-500">No saved items</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-medium text-purple-800">
                      Account Status
                    </h3>
                    <p className="text-2xl font-bold mt-2">Active</p>
                    <p className="text-sm text-gray-500">
                      Member since{" "}
                      {new Date(userData.joinedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
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
                    {/* Edit Profile Form */}
                    {/* ... (keep your existing edit form) ... */}
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
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold mb-6">My Orders</h2>
                <div className="text-center py-8 text-gray-500">
                  <p>You haven't placed any orders yet</p>
                  <button
                    onClick={() => navigate("/")}
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Start Shopping
                  </button>
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === "wishlist" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold mb-6">My Wishlist</h2>
                <div className="text-center py-8 text-gray-500">
                  <p>Your wishlist is empty</p>
                  <button
                    onClick={() => navigate("/")}
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Browse Products
                  </button>
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold mb-6">My Addresses</h2>
                {addresses.length > 0 ? (
                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <div key={address.id} className="border rounded-lg p-4">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{address.name}</h3>
                          {address.isDefault && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mt-1">{address.address}</p>
                        <p className="text-gray-600">{address.phone}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>You haven't saved any addresses yet</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
