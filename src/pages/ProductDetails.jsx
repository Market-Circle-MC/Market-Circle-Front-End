import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/Button";
export default function ProductDetails() {
  const path = useLocation();
  const pathlenth = path.pathname.length;

  console.log(pathlenth);
  const product_id = path.pathname.slice(pathlenth - 1);
  console.log(product_id);
  const [product, setProdsuct] = useState([]);
  // const method = "GET";
  const baseUrl = "https://fakestoreapi.com/";
  const endpoint = "/products";

  const url = baseUrl + endpoint;

  async function fetchAllProduct() {
    const response = await fetch(url + "/" + product_id);
    if (response.status === 200) {
      const responseData = await response.json();
      setProdsuct(responseData);
    }
  }
  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <section className=" flex items-center gap-20 relative  p-20 mt-6 min-h-screenm">
      <div className="w-[100px] border rounded-md cursor-pointer border-gray-200 p-3">
        <img src={product.image} alt="" className="object-cover" />
      </div>
      <div className="w-[500px] p-3 object-fill">
        <img src={product.image} alt="" className="object-fill shrink-0" />
      </div>
      {product.discount && (
        <div className="absolute top-5 left-30 bg-[#eb4553] text-white text-xs font-bold px-2 py-1 rounded">
          {}% OFF
        </div>
      )}

      <section>
        <div className="flex flex-col gap-5  w-96">
          <p className="text-2xl font-medium leading-[100%]">{product.title}</p>
          <p>{product.description}</p>
          <p className="text-lg font-bold ">{product.category}</p>
        </div>
        <span className="flex flex-col gap-3">
          <p className="p-3 text-xl font-normal text-[#53b32d] shadow-sm w-24 rounded-md  mt-3">
            ${product.price}
          </p>

          <button className="bg-amber-400 p-3 cursor-pointer text-white text-lg font-normal rounded-sm shadow-sm">
            Add to cart
          </button>
        </span>
      </section>
    </section>
  );
}
