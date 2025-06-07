import React from "react";
import Button from "./Button";
const ProductCard = ({ id, image, title, price, oldPrice, discount }) => {
  return (
    <div className="max-w-sm border border-gray-200 shadow-sm w-66x rounded-2xl gap-5 bg-white flex flex-col justify-between  relative group hover:shadow-xl transition-all duration-300">
      <div className=" max-h-60 h-60 flex items-center justify-center ">
        {discount && (
          <div className="absolute top-3 left-3 bg-[#eb4553] text-white text-xs font-bold px-2 py-1 rounded">
            {discount}% OFF
          </div>
        )}

        <a
          href={`/Market-Circle/product-details/${id}`}
          className=" flex items-center justify-center "
        >
          <img src={image} alt="Product" className="w-30 rounded-xl " />
        </a>
      </div>
      <div className="flex flex-col gap-1 px-4 py-1">
        <p className="text-sm w-56 truncate font-semibold text-gray-800 p-0">
          {title}
        </p>
        <div className="flex justify-between items-center">
          {" "}
          <div className="flex flex-col items-centers gap-1">
            <span className="text-lg font-semibold text-green-600">
              GHS {price}
            </span>
            <span className="text-sm font-semibold line-through text-gray-400">
              GHS {oldPrice}
            </span>
          </div>
          <Button
            className="max-w-full w-16 h-8 bg-[#f3f9fb] hover:bg-[#53b32d] hover:text-white cursor-pointer text-[#53b32d]  border border-[#afb0b1] font-medium rounded-sm transition duration-200"
            label={"ADD"}
          />
        </div>{" "}
      </div>
    </div>
  );
};

export default ProductCard;
