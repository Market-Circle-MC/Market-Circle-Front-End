import Categories from "../components/Categories";
import { ArrowRight2, Category, ArrowLeft2 } from "iconsax-react";
import { useEffect, useState } from "react";
import { CATEGORIES } from "../constants";
import ProductCard from "../components/ProductCard";
export default function ProductList() {
  const [products, setProducts] = useState([]);
  const baseUrl = "https://fakestoreapi.com/";
  const endpoint = "/products";

  const url = baseUrl + endpoint;

  async function fetchAllProduct() {
    const response = await fetch(url);
    if (response.status === 200) {
      const responseData = await response.json();
      setProducts(responseData.slice(0, 10));
    }
  }
  useEffect(() => {
    fetchAllProduct();
  }, []);
  return (
    <section className="px-28 mb-10">
      <Categories />
      <div className="flex gap-1 items-center">
        <h3 className="text-gray-400">Home</h3>
        <ArrowRight2 size="16" className="stroke-gray-300" />
        <h3>Shop</h3>
      </div>
      <section className="flex ">
        <div className=" max-w-full w-[400px]  ">
          <div className="border-b border-b-gray-400 py-5 ">
            <div className="p-2 flex flex-col gap-3 ">
              <h4 className="text-lg font-semibold">Price Filter</h4>
              <div className="flex gap-3 items-center justify-center  relative ">
                <div className="w-1/2 gap-2 ">
                  <p className="text-md font-extralight">Min Price</p>
                  <input
                    type="text"
                    className=" w-full pl-2 border border-gray-300  h-10 rounded-md"
                  />
                </div>
                <div className="flex items-center justify-center   absolute bottom-2 text-gray-400">
                  -
                </div>
                <div className="w-1/2 gap-2">
                  <p className="text-md font-extralight">Max Price</p>
                  <input
                    type="text"
                    className="border pl-2 w-full border-gray-300 h-10 rounded-md "
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-2">
              <div className="flex gap-2">
                <h4>Price:</h4>
                <span className="flex gap-3">
                  <p>GHS 0</p>
                  <p>-</p>
                  <p>GHS 30</p>
                </span>
              </div>
              <button className="bg-gray-300 text-gray-700 h-11 font-semibold rounded-md px-6">
                Filter
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-3 px-2 py-5">
            <h4 className="text-lg font-semibold">Product Status</h4>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-center ">
                <input className="w-4 h-4" type="checkbox" />
                <label htmlFor="In Stock">In Stock</label>
              </div>
              <div className="flex gap-2 items-center">
                <input className="w-4 h-4 " type="checkbox" />
                <label htmlFor="On Sale">On Sale</label>
              </div>
            </div>
            <section className="flex flex-col gap-4 font-sans">
              <h3 className="font-semibold text-lg">Proudct Categories</h3>
              <div className="space-y-3 font-medium  text-sm">
                {CATEGORIES.map((category, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <input className="w-4 h-4" type="checkbox" />
                    <h4>{category.title} </h4>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
        <div className="px-8 pt-6 flex-1 flex flex-col gap-5">
          <div className="bg-gray-200 rounded-md h-11 flex items-center justify-between px-3">
            <div className="flex items-center justify-between  flex-1 ">
              <p>Showing all 16 results</p>
              <div className="px-12">
                <lable>Sort by:</lable>
                <select className="outline-none" name="" id="">
                  <option value="">Lastest</option>
                  <option value="">Oldest</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 items-center w-38 justify-between">
              <div className="flex items-center gap-4">
                <label htmlFor="">Show:</label>
                <select className="outline-none" name="" id="">
                  <option value="">10</option>
                  <option value="">20</option>
                  <option value="">50</option>
                  <option value="">100</option>
                </select>
              </div>
              <div className="w-8 py-1 place-items-center rounded-md bg-gray-400">
                <Category size="16" className="stroke-gray-700" />
              </div>
            </div>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-center pt-5 gap-3">
            {products.map((product, index) => (
              <ProductCard
                id={product.id}
                image={product.image}
                key={index}
                title={product.title}
                price={product.price}
                oldPrice={product.oldPrice || 200}
                discount={product.discount || 30}
              />
            ))}
          </section>
          <div className="flex justify-between gap-10 py-10">
            <span className="w-12 h-12 rounded-full cursor-pointer border border-gray-200 hover:bg-[#53b32d] hover:border-[#53b32d] flex items-center justify-center">
              <ArrowLeft2
                size="32"
                className="hover:stroke-white  stroke-gray-400"
              />
            </span>
            <span className="w-12 h-12 rounded-full cursor-pointer border border-gray-200 hover:bg-[#53b32d] hover:border-[#53b32d] flex items-center justify-center">
              <ArrowRight2
                size="32"
                className="hover:stroke-white  stroke-gray-400"
              />
            </span>
          </div>
        </div>
      </section>
    </section>
  );
}
