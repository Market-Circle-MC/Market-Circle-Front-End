import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { CARTTS } from "../constants";
import Register from "@/components/Register";
import UserLogin from "@/components/Login";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();




  return (
    <div className="flex items-center pt-28 z-10 justify-center gap-16 min-h-screen bg-gray-100">
      <div className="w-[600px] relative z-0">
        <div className="w-[450px] absolute bottom-0 z-0 right-24 h-80 rounded-full bg-amber-200/15"></div>
        <img src={CARTTS} alt="" className="z-50 shadow-amber-600 relative" />
      </div>
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {isLogin ? "Login to Your Account" : "Create New Account"}
        </h2>

        {isLogin ? <UserLogin /> : <Register />}

        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-gray-500">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:underline focus:outline-none cursor-pointer"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
