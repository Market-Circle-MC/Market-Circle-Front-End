import { apiUrl } from "@/constants";
import { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const {
    user: { user },
  } = useContext(AuthContext);

  const registerUser = async (url, args) => {
    const { name, email, phone_number, password, password_confirmation } =
      args.arg;
    return fetch(url, {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        phone_number,
        password,
        password_confirmation,
      }),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((err) => err);
  };

  const { data, isMutating, error, trigger } = useSWRMutation(
    `${apiUrl}api/register`,
    registerUser,
    {
      onSuccess: (data) => {
        console.log(data);
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/product-list");
      },
      onError: (err) => {
        console.error(err);
      },
    }
  );

  const handleRegister = async (data) => {
    await trigger(data);
  };

  useEffect(() => {
    if (user) {
      navigate("/product-list");
    }
  }, []);

  return (
    <div className=" space-y-4">
      <div className="mb-4 space-y-2">
        <label className="block mb-1 text-sm text-gray-600">Full Name</label>
        <input
          type="text"
          {...register("name", {
            required: "Full name is required",
          })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <span className="text-red-500">
          {errors.name && errors.name.message}
        </span>
      </div>
      <div className="space-y-4">
        <div>
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
        <div>
          <label className="block mb-1 text-sm text-gray-600">
            Phone Number
          </label>
          <input
            type="tel"
            {...register("phone_number", {
              required: "Phone number is required",
              min: {
                value: 10,
                message: "Phone number must be 10 character",
              },
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <span className="text-red-500">
            {errors.phone_number && errors.phone_number.message}
          </span>
        </div>
      </div>
      <div>
        <label className="block mb-1 text-sm text-gray-600">Password</label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            min: {
              value: 8,
              message: "Password must be minimum 8 characters",
            },
          })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <span className="text-red-500">
          {errors.password && errors.password.message}
        </span>
      </div>
      <div>
        <label className="block mb-1 text-sm text-gray-600">
          Confirm Password
        </label>
        <input
          type="password"
          {...register("password_confirmation", {
            required: "Please confirm password",
            min: {
              value: 8,
              message: "Password must be minimum 8 characters",
            },
          })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <span className="text-red-500">
          {errors.password_confirmation && errors.password_confirmation.message}
        </span>
      </div>

      <button
        type="submit"
        onClick={handleSubmit(handleRegister)}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition duration-300"
      >
        {isMutating ? "Please wait ... " : "Sign up"}
      </button>
    </div>
  );
};

export default Register;
