import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Minus, Add } from "iconsax-react";

export default function ProductDetails() {
  const path = useLocation();
  const pathLength = path.pathname.length;
  const product_id = path.pathname.slice(pathLength - 1);
  const [product, setProduct] = useState({});
  const [activeTab, setActiveTab] = useState("description");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const baseUrl = "https://fakestoreapi.com/";
  const endpoint = "products";
  const url = baseUrl + endpoint;

  // Generate 3 thumbnails
  const thumbnails = product.image
    ? [product.image, product.image, product.image]
    : [];

  async function fetchProduct() {
    setLoading(true);
    try {
      const response = await fetch(url + "/" + product_id);
      if (response.status === 200) {
        const responseData = await response.json();
        setProduct(responseData);
        setSelectedImage(responseData.image);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleAddToCart = () => {
    console.log("Added to cart:", product, "Quantity:", quantity);
    alert(`${quantity} ${product.title}(s) added to cart!`);
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [product_id]);

  if (loading)
    return <div className="text-center py-8">Loading product...</div>;
  if (!product || !product.id)
    return <div className="text-center py-8">Product not found</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <section className="flex flex-col md:flex-row gap-8">
        <section className="md:w-1/2 flex gap-4">
          <div className="flex flex-col gap-2 w-20">
            {thumbnails.map((thumb, index) => (
              <div
                key={index}
                className={`w-full aspect-square border rounded-md overflow-hidden cursor-pointer hover:border-green-500 ${
                  selectedImage === thumb ? "border-green-500" : ""
                }`}
                onClick={() => setSelectedImage(thumb)}
              >
                <img
                  src={thumb}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/100")
                  }
                />
              </div>
            ))}
          </div>
          <div className="flex-1 rounded-lg overflow-hidden bg-white p-4">
            <img
              src={selectedImage || product.image}
              alt={product.title}
              className="w-full h-auto object-contain max-h-96 mx-auto"
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/400")
              }
            />
          </div>
        </section>

        <section className="md:w-1/2">
          <header className="mb-4">
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <div className="text-sm text-gray-500 capitalize">
              {product.category}
            </div>
          </header>

          <section className="mb-6">
            <p className="text-gray-700">{product.description}</p>
          </section>

          <section className="border-t border-b border-gray-200 py-4 my-4">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-bold text-green-600">
                GH₵ {(product.price * 0.6).toFixed(2)}
              </span>
              <span className="text-lg text-gray-500 line-through">
                GH₵ {product.price}
              </span>
              <span className=" bg-red-100 text-red-600 left-3 text-xs font-bold px-2 py-1 rounded">
                40% OFF
              </span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center border-0 border-gray-300 rounded-md">
                <button
                  onClick={decreaseQuantity}
                  className="px-3 py-3 bg-gray-300 cursor-pointer rounded-md hover:bg-gray-100"
                >
                  <Minus size="18" className="stroke-black" />
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="px-3 py-3 marketGreen cursor-pointer rounded-md hover:bg-green-700"
                >
                  <Add size="18" className="stroke-white" />
                </button>
              </div>
            </div>

            <button className="bg-[#53b32d] cursor-pointer border-[#53b32d] text-white hover:bg-green-700 hover:border-green-700 font-medium py-2 px-6 rounded-md mb-4 w-52 transition-colors">
              Order on WhatsApp
            </button>

            <div className=" p-3 rounded-md">
              <table className="w-full">
                <tbody>
                  <tr className="text-center">
                    <td className="text-left flex gap-10 font-medium">
                      <button
                        onClick={handleAddToCart}
                        className="hover:bg-green-700 w-32 cursor-pointer border border-[#53b32d] bg-[#53b32d] h-10 text-white font-medium rounded"
                      >
                        Add to cart
                      </button>

                      <button
                        className="bg-black hover:bg-gray-800 cursor-pointer text-white font-medium py-1 px-3 rounded h-10 w-32"
                        onClick={handleAddToCart}
                      >
                        Buy Now
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-6">
            <div className="mb-3">
              <span className="font-medium">Payment.</span> Payment upon receipt
              of goods. Payment by card in the department. Google Pay. Online
              card, &lt;5% discount in case of payment.
            </div>
            <div>
              <span className="font-medium">Warranty.</span> The Consumer
              Protection Act does not provide for the return of this product of
              proper quality.
            </div>
          </section>

          <section className="flex gap-4 mb-8">
            <button className="flex items-center gap-1 text-gray-700 hover:text-green-600">
              <span>❤️</span> Add to wishlist
            </button>
            <button className="flex items-center gap-1 text-gray-700 hover:text-green-600">
              <span>↗️</span> Share this Product
            </button>
            <button className="flex items-center gap-1 text-gray-700 hover:text-green-600">
              <span>⇄</span> Compare
            </button>
          </section>
        </section>
      </section>

      <section className="mt-8 border-t border-gray-200 pt-6">
        <div className="flex gap-4 border-b border-gray-200 pb-2">
          <button
            className={`font-medium pb-1 ${
              activeTab === "description"
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-600 hover:text-green-600"
            }`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`font-medium pb-1 ${
              activeTab === "reviews"
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-600 hover:text-green-600"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews (2)
          </button>
        </div>

        <div className="mt-4 text-gray-700">
          {activeTab === "description" ? (
            <>
              <p className="mb-4">{product.description}</p>
              <p>
                Morbi ut sapien vitae odio accumsan gravida. Morbi vitae erat
                auctor, elefend nunc a, lobortis neque. Praesent aliquam
                dignissim viverra. Maeconas lacus odio, feugiat eu nunc sit
                amet, maximus sagittis dolor. Vivamus nisi sapien, elementum sit
                amet eros sit amet, ultricies cursus ipsum.
              </p>
            </>
          ) : (
            <div className="py-4">
              <h3 className="font-medium mb-4">Customer Reviews</h3>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-amber-400">{"★".repeat(5)}</div>
                    <span className="text-sm text-gray-500">
                      John D. - 2 days ago
                    </span>
                  </div>
                  <p>Excellent product, very fresh and delicious!</p>
                </div>
                <div className="border-b pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-amber-400">{"★".repeat(4)}</div>
                    <span className="text-sm text-gray-500">
                      Sarah M. - 1 week ago
                    </span>
                  </div>
                  <p>Good quality bananas, would buy again.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
