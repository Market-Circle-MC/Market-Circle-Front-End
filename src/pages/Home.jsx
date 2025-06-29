import { useEffect, useState, useContext } from "react";
import HeroBanner from "../components/Layouts/HeroBanner";
import ProductCard from "../components/ProductCard";
import { ArrowRight2 } from "iconsax-react";
import Categories from "../components/Categories";
import { CartContext } from "../context/cartContext";
import { Link } from "react-router-dom";

export default function Home() {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  // const [cart, setCart] = useState([]);

  // const addToCart = (product) => {
  //   // setIsAdding(true);
  //   setCart((prev) => [...prev, product]);
  // };
  console.log(import.meta.env.VITE_BASE_UR);
  // const method = "GET";
  const baseUrl = "https://fair-bat-perfectly.ngrok-free.app/";
  const endpoint = "api/categories";

  const apiHeaders = {
    Accept: "application/json",
    "ngrok-skip-browser-warning": "23456",
  };

  const url = baseUrl + endpoint;

  async function fetchAllProduct() {
    const response = await fetch(url, {
      headers: {
        ...apiHeaders,
      },
    });
    if (response.status === 200) {
      const responseData = await response.json();
      setProducts(responseData.data);
    }
  }
  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div className="pt-28">
      <Categories />
      <HeroBanner />
      <section className="px-24">
        <div className=" mt-10 p-0">
          <h1 className="text-4xl font-semibold">Products</h1>
        </div>{" "}
        <section className="flex flex-col gap-14 mb-24">
          {products.length > 0 ? (
            products.map((productCategory, key) => (
              <div key={key}>
                <div className="mt-4 border-b  py-0 border-b-gray-300 flex item-center justify-between">
                  <h2 className="text-3xl font-extralight border-b-3 border-b-[#53b32d] inline py-3 m-0">
                    Shop From{" "}
                    <span className="text-[#53b32d]">
                      {productCategory.name}
                    </span>
                  </h2>
                  <Link
                    to="/product-list/bath-and-body"
                    className="flex justify-center items-center gap-1 cursor-pointer"
                  >
                    View All
                    <ArrowRight2 size="20" color="#53b32d" />
                  </Link>
                </div>
                <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 justify-center pt-5 gap-5">
                  {productCategory.children.length > 0 ? (
                    productCategory.children.map((product, index) => (
                      <ProductCard
                        id={product.id}
                        image={product.image_url}
                        key={index}
                        title={product.name}
                        price={product.price}
                        oldPrice={product.oldPrice || 200}
                        discount={product.discount || 30}
                        isAdding={isAdding}
                        addToCart={() => addToCart(product)}
                      />
                    ))
                  ) : (
                    <span>Product under this category coming soon</span>
                  )}
                </section>
              </div>
            ))
          ) : (
            <span>No products found</span>
          )}
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
