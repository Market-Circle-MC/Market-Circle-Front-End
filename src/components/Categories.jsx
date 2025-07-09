import { useState, useEffect } from "react";
import { apiUrl } from "../constants";
export default function Categories() {
  const [categories, setCategories] = useState([]);

  // const apiHeaders = {
  //   Accept: "application/json",
  //   "ngrok-skip-browser-warning": "23456",
  // };

  const endpoint = "api/categories";
  const url = apiUrl + endpoint;

  async function fetchAllCartegories() {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      const responseData = await response.json();
      setCategories(responseData.data);
    }
  }

  useEffect(() => {
    fetchAllCartegories();
  }, []);

  return (
    <main className="">
      <div className="py-4 flex gap-4 justify-center">
        {categories.map((category, index) => (
          <button
            key={index}
            className="h-8 bg-[#f3f9fb]  cursor-pointer text-xs p-4 rounded-xl flex items-center justify-center"
          >
            {category.name}
          </button>
        ))}
      </div>
    </main>
  );
}
