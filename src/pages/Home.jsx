import { useEffect, useState } from "react";
import HeroBanner from "../components/Layouts/HeroBanner";
import ProductCard from "../components/ProductCard";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import Categories from "../components/Categories";
export default function Home() {
  const [products, setProdsucts] = useState([]);
  // const method = "GET";
  const baseUrl = "https://fakestoreapi.com/";
  const endpoint = "/products";

  const url = baseUrl + endpoint;

  async function fetchAllProduct() {
    const response = await fetch(url);
    if (response.status === 200) {
      const responseData = await response.json();
      setProdsucts(responseData.slice(0, 5));
    }
  }
  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div>
      <Categories />
      <HeroBanner />
      <section className="px-24">
        <div className=" mt-10 p-0">
          <h1 className="text-4xl font-semibold">Products</h1>
        </div>{" "}
        <section className="flex flex-col gap-14 mb-24">
          <div>
            <div className="mt-4 border-b  py-0 border-b-gray-300 flex item-center justify-between">
              <h2 className="text-3xl font-extralight border-b-3 border-b-[#53b32d] inline py-3 m-0">
                Shop From <span className="text-[#53b32d]">Bath & Body</span>
              </h2>
              <a
                href="/Market-Circle/product-list/bath-and-body"
                className="flex justify-center items-center gap-1 cursor-pointer"
              >
                View All
                <ArrowRight2 size="20" color="#53b32d" />
              </a>
            </div>
            <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 justify-center pt-5 gap-5">
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
          </div>
          <div>
            <div className="mt-4 border-b  py-0 border-b-gray-300 flex item-center justify-between">
              <h2 className="text-3xl font-extralight border-b-3 border-b-[#53b32d] inline py-3 m-0">
                Shop From{" "}
                <span className="text-[#53b32d]">Friuts & Vegetables</span>
              </h2>
              <a
                href="/Market-Circle/product-list/friuts-and-vegetables"
                className="flex justify-center items-center gap-1 cursor-pointer"
              >
                View All
                <ArrowRight2 size="20" color="#53b32d" />
              </a>
            </div>
            <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 justify-center pt-5 gap-5">
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
          </div>
          <div>
            <div className="mt-4 border-b  py-0 border-b-gray-300 flex item-center justify-between">
              <h2 className="text-3xl font-extralight border-b-3 border-b-[#53b32d] inline py-3 m-0">
                Shop From{" "}
                <span className="text-[#53b32d]">Dairy & Breakfast</span>
              </h2>
              <a
                href="/Market-Circle/product-list/dairy-and-breakfast"
                className="flex justify-center items-center gap-1 cursor-pointer"
              >
                View All
                <ArrowRight2 size="20" color="#53b32d" />
              </a>
            </div>
            <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 justify-center pt-5 gap-5">
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
          </div>
        </section>
        {/* <div className="flex justify-center gap-10 py-10">
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
        </div> */}
      </section>
    </div>
  );
}
