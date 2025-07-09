import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const UserLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    login,
    isMutating,
    user,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.user) {
      navigate("/product-list");
    }
  }, []);


  const loginUserIn = (data) => {
    console.log(data);
    login(data)
  }

  return (
    <div className=" space-y-4">
      <div className="space-y-4"> 
        <label className="block mb-1 text-sm text-gray-600">Email</label>
        <input
          type="email"
           {...register("email", {
            required: "Email is required",
          })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <span className="text-red-500">
          {errors.email && errors.email.message}
        </span>
      </div>
      <div className="space-y-4"> 
        <label className="block mb-1 text-sm text-gray-600">Password</label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
          })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <span className="text-red-500">
          {errors.password && errors.password.message}
        </span>
      </div>
      <button
        type="submit"
        onClick={handleSubmit(loginUserIn)}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition duration-300"
      >
        {isMutating ? "Please wait..." : "Login"}
      </button>
    </div>
  );
};

export default UserLogin;
