import Categories from "../components/Categories";
import { ArrowRight2, Category, ArrowLeft2 } from "iconsax-react";
import { useEffect, useState, useContext } from "react";
import { apiUrl } from "../constants";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/cartContext";
import Loader from "../components/Loarder";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const endpoint = "api/products";

  const [isLoading, setIsLoading] = useState(false);

  const filtersByCategory = "api/categories";

  const { addToCart } = useContext(CartContext);

  let url = apiUrl + endpoint;
  const categoryUrl = apiUrl + filtersByCategory;

  const apiHeaders = {
    Accept: "application/json",
    "ngrok-skip-browser-warning": "23456",
  };

  async function fetchAllProduct() {
    setIsLoading(true);
    if (selectedCategory) {
      url = `${url}?category=${selectedCategory}`;
    }
    const response = await fetch(url, {
      headers: {
        ...apiHeaders,
      },
    });
    if (response.status === 200) {
      setIsLoading(false);
      const responseData = await response.json();
      setProducts(responseData.data.data);
    }
  }

  async function fetchAllCategoryList() {
    const response = await fetch(categoryUrl, {
      headers: {
        ...apiHeaders,
      },
    });
    console.log(response);
    if (response.status === 200) {
      const responseData = await response.json();
      console.log(responseData.data);
      const categories = responseData.data;

      if (categories.length > 0) {
        const childrenList = categories
          .map((category) => category.children)
          .flat();
        console.log(childrenList);
        setSubCategories(childrenList);
        // setProducts(responseData.data.data);
      }
    }
  }

  useEffect(() => {
    fetchAllCategoryList();
  }, []);

  useEffect(() => {
    fetchAllProduct();
  }, [selectedCategory]);

  return (
    <section className="px-28 mb-10 pt-28">
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
                {subcategories.map((category, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <label className="flex gap-2 items-center">
                      <input
                        className="w-4 h-4"
                        type="radio"
                        name="checkbox"
                        id={category.slug}
                        value={category.slug}
                        onChange={(event) =>
                          setSelectedCategory(event.target.value)
                        }
                      />
                      <h4>{category.name} </h4>
                    </label>
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
          {isLoading && (
            <div>
              <Loader />
            </div>
          )}
          <section className="grid relative grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-center items-center pt-5 gap-3">
            {products.length > 0 ? (
              products.map((product, index) => (
                <ProductCard
                  id={product.id}
                  image={product.main_image_url}
                  key={index}
                  title={product.name}
                  price={product.discount_price}
                  oldPrice={product.current_price}
                  discount={product.discount_percentage}
                  addToCart={() => addToCart(product)}
                />
              ))
            ) : (
              <div className=" absolute w-full h-96 grid left-[500px] top-48 -translate-y-1/2 -translate-x-1/2 items-center justify-center">
                <span className="text-2xl text-gray-400">
                  No product available
                </span>
              </div>
            )}
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
