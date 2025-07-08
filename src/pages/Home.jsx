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
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [cart, setCart] = useState([]);

  // const addToCart = (product) => {
  //   // setIsAdding(true);
  //   setCart((prev) => [...prev, product]);
  // };
  console.log(import.meta.env.VITE_BASE_UR);
  // const method = "GET";
  const baseUrl = "https://fair-bat-perfectly.ngrok-free.app/";
  const endpoint = "api/categories";

  const productendpoint = "api/products";

  const apiHeaders = {
    Accept: "application/json",
    "ngrok-skip-browser-warning": "23456",
  };

  async function fetchAllProduct(slug) {
    const productUrl = baseUrl + productendpoint;
    const url = `${productUrl}?category=${slug}`;
    const response = await fetch(url, {
      headers: {
        ...apiHeaders,
      },
    });

    if (response.status === 200) {
      const responseData = await response.json();
      console.log(responseData.data.data);
      return await responseData.data.data;
    }
    return [];
  }

  const url = baseUrl + endpoint;

  // const fetchAllCategories = async () => {
  //   const response = await fetch(url, {
  //     headers: {
  //       ...apiHeaders,
  //     },
  //   });
  //   if (response.status === 200) {
  //     const responseData = await response.json();
  //     const productMap = {};
  //     console.log(responseData.data);
  //     responseData.data?.forEach(async (product) => {
  //       console.log(product);
  //       if (!productMap[product.name]) {
  //         productMap[product.name] = [];
  //       }
  //       const singleProduct = await fetchAllProduct(product.slug);

  //       console.log(singleProduct);
  //       if (singleProduct.length > 0) {
  //         productMap[product.name].push(products);
  //         setProducts(productMap);
  //       }
  //     });
  //     setCategories(responseData.data);
  //   }
  // };

  const fetchAllCategories = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(url, {
        headers: {
          ...apiHeaders,
        },
      });

      if (!response.ok) {
        setIsLoading(false);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      const categoriesData = responseData.data || [];
      setCategories(categoriesData);

      const productsMap = {};
      const productFetchPromises = categoriesData.map(async (category) => {
        if (!category.name || !category.slug) return;

        if (!productsMap[category.name]) {
          productsMap[category.name] = [];
        }

        try {
          const products = await fetchAllProduct(category.slug);
          if (products?.length > 0) {
            productsMap[category.name].push(...products); // Spread to avoid nested arrays
          }
        } catch (error) {
          console.error(
            `Failed to fetch products for category ${category.name}:`,
            error
          );
        }
      });

      await Promise.all(productFetchPromises);
      setProducts(productsMap);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to fetch categories:", error);
      // Optionally set error state here if you have error handling in your component
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="flex flex-row p-4 text-4xl font-extrabold">
          <span className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 absolute -top-1 right-14 stroke-yellow-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>

            <h1 className="text-[#53b32d] ">Market</h1>
          </span>
          <h1 className="text-yellow-400">Circle</h1>
        </div>
        <span className="text-2xl font-extralight mt-4">
          Fetching products...
        </span>
      </div>
    );
  }

  return (
    <div className="pt-28">
      <section className="">
        <Categories />
      </section>
      <HeroBanner />
      <section className="px-24">
        <div className=" mt-10 p-0">
          <h1 className="text-4xl font-semibold">Products</h1>
        </div>{" "}
        <section className="flex flex-col gap-14 mb-24">
          {products ? (
            Object.entries(products).map(
              ([productCategory, categoryProducts], key) => (
                <div key={key}>
                  <div className="mt-4 border-b  py-0 border-b-gray-300 flex item-center justify-between">
                    <h2 className="text-3xl font-extralight border-b-3 border-b-[#53b32d] inline py-3 m-0">
                      Shop From{" "}
                      <span className="text-[#53b32d]">
                        {productCategory}--
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
                    {categoryProducts.length > 0 ? (
                      categoryProducts
                        .flat()
                        .map((product, index) => (
                          <ProductCard
                            id={product.id}
                            image={product.main_image_url}
                            key={index}
                            title={product.name}
                            price={product.current_price}
                            oldPrice={product.price_per_unit}
                            discount={product.discount || 30}
                            addToCart={() => addToCart(product)}
                          />
                        ))
                    ) : (
                      <span>Product under this category coming soon</span>
                    )}
                  </section>
                </div>
              )
            )
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
