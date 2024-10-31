import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import sanityClient from "../sanity/sanityClient";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

const Shop = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    color: "",
    size: "",
    minPrice: 0,
    maxPrice: 500000,
  });

  useEffect(() => {
    // Check if products are in local storage
    const localProducts = localStorage.getItem("products");
    if (localProducts) {
      setProducts(JSON.parse(localProducts));
    } else {
      // Fetch products from Sanity
      sanityClient
        .fetch(
          `*[_type == "product"]{
        _id,
        name,
        price,
        size,
        color,
        "category": category->title,
        description,
        "imageUrl": image.asset->url,
        status
      }`
        )
        .then((data) => {
          setProducts(data);
          // Store fetched products in local storage
          localStorage.setItem("products", JSON.stringify(data));
        });
    }
  }, []);

  const navigate = useNavigate();
  const Back = () => {
    navigate(-1);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const filtered = products.filter(
      (product) =>
        (filters.color === "" || product.color === filters.color) &&
        (filters.size === "" || product.size === filters.size) &&
        product.price >= filters.minPrice &&
        product.price <= filters.maxPrice
    );
    setFilteredProducts(filtered);
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
            onClick={Back}
            className="py-1 hidden md:block px-2 bg-red-400 rounded-md text-white outline-none hover:bg-red-500"
          >
            Back
          </button>
          <h2 className="text-2xl text-center sm:text-3xl md:text-4xl font-bold mb-5 capitalize">
            Browse through our wide range of meticulously crafted Clothes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
            {filteredProducts.length > 0
              ? filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              : products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
