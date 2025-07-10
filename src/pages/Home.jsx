import { useEffect, useState, useContext } from "react";
import HeroBanner from "../components/Layouts/HeroBanner";
import ProductCard from "../components/ProductCard";
import { ArrowRight2 } from "iconsax-react";
import Categories from "../components/Categories";
import { CartContext } from "../context/cartContext";
import { Link } from "react-router-dom";
import { apiUrl } from "@/constants";
import Loader from "@/components/Loarder";

export default function Home() {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const endpoint = "api/categories";

  const productendpoint = "api/products";

  const apiHeaders = {
    Accept: "application/json",
    "ngrok-skip-browser-warning": "23456",
  };

  async function fetchAllProduct(slug) {
    const productUrl = apiUrl + productendpoint;
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

  const url = apiUrl + endpoint;

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
    return <Loader title="Fetching products ..." />;
  }

  return (
    <div className="pt-28">
      <section className="px-28  w-full overflow-auto ">
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
                      <span className="text-[#53b32d]">{productCategory}</span>
                    </h2>
                    <Link
                      to="/product-list"
                      className="flex justify-center items-center gap-1 cursor-pointer"
                    >
                      View All
                      <ArrowRight2 size="20" color="#53b32d" />
                    </Link>
                  </div>
                  <section className="pt-5">
                    <div className="flex gap-5 overflow-x-auto pb-4">
                      {categoryProducts.length > 0 ? (
                        categoryProducts.flat().map((product, index) => (
                          <div key={index} className="min-w-[220px]">
                            <ProductCard
                              id={product.id}
                              image={product.main_image_url}
                              title={product.name}
                              price={product.current_price}
                              oldPrice={product.price_per_unit}
                              discount={product.discount || 30}
                              addToCart={() => addToCart(product)}
                            />
                          </div>
                        ))
                      ) : (
                        <span>Product under this category coming soon</span>
                      )}
                    </div>
                  </section>
                </div>
              )
            )
          ) : (
            <span>No products found</span>
          )}
        </section>
      </section>
    </div>
  );
}
