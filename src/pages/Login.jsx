import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { CARTTS } from "../constants";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [authMethod, setAuthMethod] = useState("email"); // 'email' or 'phone'
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e.preventDefault();

    if (!isLogin) {
      // Signup validation
      if (password !== confirmPassword) {
        alert("Passwords don't match!");
        return;
      }
      if (!email || !phone) {
        alert("Both email and phone are required for signup!");
        return;
      }
      console.log("Signup with:", { name, email, phone, password });
      navigate("/userdashboard");
    } else {
      // Login validation - either email or phone
      if (!email && !phone) {
        alert("Please enter either email or phone number!");
        return;
      }
      console.log("Login with:", { email, phone, password });
      navigate("/userdashboard");
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("Google login success:", decoded);
    navigate("/userdashboard");
  };

  const handleGoogleError = () => {
    console.log("Google login failed");
  };

  return (
    <div className="flex items-center justify-center gap-16 min-h-screen bg-gray-100">
      <div className="w-[600px] relative z-50">
        <div className="w-[450px] absolute bottom-0 z-0 right-24 h-80 rounded-full bg-amber-200/15"></div>
        <img src={CARTTS} alt="" className="z-50 shadow-amber-600 relative" />
      </div>
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {isLogin ? "Login to Your Account" : "Create New Account"}
        </h2>

        {!isLogin && (
          <div className="mb-4">
            <label className="block mb-1 text-sm text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        )}

        {isLogin ? (
          <div className="flex mb-4">
            <button
              onClick={() => setAuthMethod("email")}
              className={`flex-1 py-2 ${
                authMethod === "email"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              } rounded-l-lg`}
            >
              Email
            </button>
            <button
              onClick={() => setAuthMethod("phone")}
              className={`flex-1 py-2 ${
                authMethod === "phone"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              } rounded-r-lg`}
            >
              Phone
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm text-gray-600">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-600">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>
        )}

        {isLogin && (
          <div className="mb-4">
            {authMethod === "email" ? (
              <div>
                <label className="block mb-1 text-sm text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            ) : (
              <div>
                <label className="block mb-1 text-sm text-gray-600">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block mb-1 text-sm text-gray-600">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition duration-300"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-gray-500">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
          />
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:underline focus:outline-none"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
