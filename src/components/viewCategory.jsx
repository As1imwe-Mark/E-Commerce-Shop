import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import sanityClient from "../sanity/sanityClient";
import ProductCard from "./ProductCard";

const ViewAllCategoryPage = () => {
  const { status } = useParams(); // Get the status parameter from the URL
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products from Sanity
    sanityClient
      .fetch(`*[_type == "product"]{
        _id,
        name,
        price,
        "category": category->title,
        description,
        "imageUrl": image.asset->url,
        status
      }`)
      .then((data) => {
        setProducts(data);
        setLoading(false); // Stop loading after fetching data
      });
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) => product.status === status);
    setFilteredProducts(filtered);
  }, [products, status]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-full md:max-w-[85%] mx-auto bg-white md:mt-[79px]">
      <button
        onClick={handleBack}
        className="py-1 hidden md:block px-2 bg-red-400 rounded-md text-white outline-none hover:bg-red-500 mt-5"
      >
        Back
      </button>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center py-6 sm:py-8 md:py-10 capitalize">
        {status.replace(/-/g, " ")}
      </h2>

      {loading ? (
        <p className="text-center text-lg">Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-lg text-gray-500">
          No products available under `{status.replace(/-/g, " ")}`` category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewAllCategoryPage;
