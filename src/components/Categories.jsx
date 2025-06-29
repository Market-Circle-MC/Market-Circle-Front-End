import { useState, useEffect } from "react";
import { CATEGORIES } from "../constants";
export default function Categories() {
  const [cartegories, setCartegories] = useState([]);
  const baseUrl = "https://fair-bat-perfectly.ngrok-free.app/";
  const endpoint = "api/categories";

  const apiHeaders = {
    Accept: "application/json",
    "ngrok-skip-browser-warning": "23456",
  };

  const url = baseUrl + endpoint;

  async function fetchAllCartegories() {
    const response = await fetch(url, {
      headers: {
        ...apiHeaders,
      },
    });
    if (response.status === 200) {
      const responseData = await response.json();
      setCartegories(responseData.data);
    }
  }

  useEffect(() => {
    fetchAllCartegories();
  }, []);

  return (
    <main>
      <div className="py-4 flex gap-4 justify-center">
        {cartegories.map((category, index) => (
          <button
            key={index}
            className="h-8 bg-[#f3f9fb] w-44  cursor-pointer text-xs p-4 rounded-xl flex items-center justify-center"
          >
            {category.name}
          </button>
        ))}
      </div>
    </main>
  );
}
