import { apiUrl } from "@/constants";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import useSWRMutation from "swr/mutation";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  useEffect(() => {
    // Check for existing session on app load
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signUserIn = async (url, args) => {
    const { email, password } = args.arg;
    return fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
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
    `${apiUrl}api/login`,
    signUserIn,
    {
      onSuccess: (data) => {
        if (data?.status === "success") {
          console.log(data);
          localStorage.setItem("user", JSON.stringify(data));
          setUser(data);
          window.location.href = "/product-list";
          window.location.reload();
        } else if (data?.status === "error") {
          toast.error(data?.message, {
            theme: "colored",
          });
        }
      },
      onError: (err) => {
        console.error(err);
        alert("Invalid login credentials");
        toast.error("");
      },
    }
  );

  const {
    data: logoutData,
    isMutating: logoutMutating,
    error: logoutError,
    trigger: logoutTrigger,
  } = useSWRMutation(`${apiUrl}api/logout`);

  const login = async (data) => {
    await trigger(data);
  };

  const logout = async () => {
    console.log("logout clicked");
    setUser(null);
    localStorage.removeItem("user");
    logoutTrigger();
    window.location.href = "/";
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isMutating, error }}>
      {children}
    </AuthContext.Provider>
  );
};
