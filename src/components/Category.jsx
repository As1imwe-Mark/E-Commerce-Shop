import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import sanityClient from "../sanity/sanityClient";
import ProductCard from "./ProductCard";
import Layout from "./Layout";

const CategoryPage = () => {
  const { category } = useParams(); // Get the selected category from the URL
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    color: "",
    size: "",
    minPrice: 0,
    maxPrice: 500000,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = () => {
      const storedProducts = localStorage.getItem("products");

      if (storedProducts) {
        // Parse and use products from local storage
        const parsedProducts = JSON.parse(storedProducts);
        setProducts(parsedProducts);
        setLoading(false); // Stop loading if products are loaded from local storage
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
          size,
          color,
          "category": category->title,
          description,
          "imageUrl": image.asset->url,
          status
        }`);
        console.log("Fetched products:", data); // Log fetched products
        setProducts(data);
        localStorage.setItem("products", JSON.stringify(data)); // Store fetched products in local storage
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    const categoryProducts = products.filter(
      (product) => product.category === category
    );
    setFilteredProducts(categoryProducts);
  }, [category, products]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const filtered = products.filter(
      (product) =>
        product.category === category &&
        (filters.color === "" || product.color === filters.color) &&
        (filters.size === "" || product.size === filters.size) &&
        product.price >= filters.minPrice &&
        product.price <= filters.maxPrice
    );
    setFilteredProducts(filtered);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row scroll-m-20 md:mt-[89px]">
        {/* Sidebar Filter */}
        <div className="w-full md:h-screen lg:w-1/4 p-5 bg-gray-100 md:top-[89px] md:fixed">
          <h2 className="text-2xl font-bold mb-5">Filters</h2>
          <div className="mb-5">
            <label className="block mb-2">Color:</label>
            <select
              name="color"
              value={filters.color}
              onChange={handleFilterChange}
              className="w-full p-2 rounded"
            >
              <option value="">All</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="black">Black</option>
              <option value="brown">Brown</option>
              <option value="white">White</option>
              <option value="green">Green</option>
            </select>
          </div>
          <div className="mb-5">
            <label className="block mb-2">Size:</label>
            <select
              name="size"
              value={filters.size}
              onChange={handleFilterChange}
              className="w-full p-2 rounded"
            >
              <option value="">All</option>
              <option value="small">S</option>
              <option value="medium">M</option>
              <option value="large">L</option>
              <option value="extra-large">XL</option>
            </select>
          </div>
          <div className="mb-5">
            <label className="block mb-2">Price Range:</label>
            <input
              type="number"
              name="minPrice"
              placeholder="Min"
              value={filters.minPrice}
              onChange={handleFilterChange}
              className="w-full p-2 rounded mb-2"
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              className="w-full p-2 rounded"
            />
          </div>
          <button
            onClick={applyFilters}
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            Apply Filters
          </button>
        </div>

        {/* Main Product Section */}
        <div className="md:ml-[25%] w-full lg:w-3/4 p-5">
          <button
            onClick={handleBack}
            className="py-1 hidden md:block px-2 bg-red-400 rounded-md text-white outline-none hover:bg-red-500"
          >
            Back
          </button>
          <h2 className="text-2xl text-center sm:text-3xl md:text-4xl font-bold mb-5 capitalize">
            {category} Style
          </h2>

          {loading ? (
            <p className="text-center text-lg">Loading products...</p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-center text-lg text-gray-500">
              No products available for this category.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
