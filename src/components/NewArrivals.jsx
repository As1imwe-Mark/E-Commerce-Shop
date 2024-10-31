import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import sanityClient from "../sanity/sanityClient";
import ProductCard from "./ProductCard";
import Layout from './Layout';

const NewArrivals = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
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
        console.log("Fetched products:", data); // Log fetched products
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) => product.status === "new-arrival");
    console.log("Filtered new arrivals:", filtered); // Log filtered products
    setFilteredProducts(filtered);
  }, [products]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <div className="max-w-[90%] md:max-w-[85%] mx-auto md:mt-[90px] bg-white">
        <button
          onClick={handleBack}
          className="py-1 hidden md:block px-2 bg-red-400 rounded-md text-white outline-none hover:bg-red-500 mt-5"
        >
          Back
        </button>
        <h2 className="text-2xl sm:text-3xl md:text-4xl sm:font-extrabold text-center py-6 sm:py-8 md:py-10 capitalize">
          Brand New Clothes On The Market, Make a Choice!
        </h2>

        {loading ? (
          <p className="text-center text-lg">Loading new arrivals...</p>
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

export default NewArrivals;
