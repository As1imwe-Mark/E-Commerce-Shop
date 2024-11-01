import { useEffect, useState } from "react";
import sanityClient from "../sanity/sanityClient";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

const TopSeller = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for error handling
  const navigate = useNavigate();

  useEffect(() => {
    // Function to load products from local storage or fetch from Sanity
    const loadProducts = () => {
      const storedProducts = localStorage.getItem("products");

      if (storedProducts) {
        // Parse and use products from local storage
        const parsedProducts = JSON.parse(storedProducts);
        setProducts(parsedProducts);
        setLoading(false);
      } else {
        // Fetch products from Sanity
        fetchProducts();
      }
    };

    const fetchProducts = async () => {
      try {
        const data = await sanityClient.fetch(`*[_type == "product"]{
          _id,
          name,
          price,
          "category": category->title,
          description,
          "imageUrl": image.asset->url,
          status
        }`);
        setProducts(data);
        localStorage.setItem("products", JSON.stringify(data)); // Store fetched products in local storage
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later."); // Set error message
      } finally {
        setLoading(false); // Stop loading after data is fetched
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(
      (product) => product.status === "top-seller"
    );
    setFilteredProducts(filtered);
  }, [products]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <div className="max-w-full md:max-w-[85%] mx-auto md:mt-[90px] bg-white">
        <button
          onClick={handleBack}
          className="py-1 px-2 hidden md:block bg-red-400 rounded-md text-white outline-none hover:bg-red-500 mt-10"
        >
          Back
        </button>
        <h2 className="text-2xl sm:text-3xl md:text-4xl sm:font-extrabold text-center py-6 sm:py-8 md:py-10 capitalize">
          Top Selling Clothes, Make a Choice!
        </h2>

        {loading ? (
          <p className="text-center text-lg">Loading top-selling products...</p>
        ) : error ? (
          <p className="text-center text-lg text-red-500">{error}</p> // Show error message
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-lg text-gray-500">
            No top-selling products available at the moment.
          </p>
        ) : (
          <div className="flex flex-col items-center">
            {/* Centered product card */}
            {filteredProducts.length > 0 && (
              <div className="mb-4">
                <ProductCard product={filteredProducts[0]} />
              </div>
            )}

            {/* Remaining products in a grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.slice(1).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TopSeller;
