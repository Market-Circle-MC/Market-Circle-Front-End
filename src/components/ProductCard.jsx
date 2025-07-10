import React, { useState, useContext } from "react";
import Button from "./Button";
import { CartContext } from "../context/cartContext";

const ProductCard = ({
  id,
  image,
  title,
  price,
  oldPrice,
  discount,
  addToCart,
}) => {
  // const [isAdding, setIsAdding] = useState(false);
  const { cart } = useContext(CartContext);
  // const addToCart = async () => {
  //   setIsAdding(true);
  // const isProductInCart = cart.some((value) => value.id === id);
  // try {
  //   const cartData = {
  //     id: 1,
  //     userId: 1,
  //     products: [
  //       {
  //         id,
  //         title,
  //         price,
  //         description: "",
  //         category: "",
  //         image,
  //         oldPrice,
  //         discount,
  //       },
  //     ],
  //   };

  //   const response = await fetch("https://fakestoreapi.com/carts", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(cartData),
  //   });

  //   const result = await response.json();
  //   console.log("Product added to cart:", result);
  //   alert("Product added to cart successfully!");
  // } catch (error) {
  //   console.error("Error adding to cart:", error);
  //   alert("Failed to add product to cart");
  // } finally {
  //   setIsAdding(false);
  // }

  // };

  return (
    <div className="max-w-sm border h-82 py-4 border-gray-200 shadow-sm w-66x rounded-2xl gap-5 bg-white flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
      <div className="max-h-60  flex justify-centers relative">
        {discount ? (
          <div className="absolute top-3 bg-red-100 text-red-600 left-3 text-xs font-bold px-2 py-1 rounded">
            {discount}% OFF
          </div>
        ) : (
          ""
        )}

        <a href={`/product-details/${id}`}>
          <img
            src={image}
            alt="Product"
            className="w-full object-cover h-52 rounded-tl-xl rounded-tr-xl"
          />
        </a>
      </div>
      <div className="flex flex-col gap-1 px-4 py-1">
        <p className="text-sm w-56 truncate font-semibold text-gray-800 p-0">
          {title}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-centers gap-1">
            <span className="text-lg font-semibold text-green-600">
              GHS {price ? price : oldPrice}
            </span>
            {price ? (
              <span className="text-sm font-semibold line-through text-gray-400">
                GHS {oldPrice}
              </span>
            ) : (
              ""
            )}
          </div>
          <Button
            className={`max-w-full w-16 h-8 
              bg-[#f3f9fb] hover:bg-[#53b32d]
           hover:text-white cursor-pointer text-[#53b32d] border border-[#afb0b1] font-medium rounded-sm transition duration-200`}
            label={"ADD"}
            onClick={addToCart}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
