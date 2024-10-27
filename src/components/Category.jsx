import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Products } from "../constants/products";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

const CategoryPage = () => {
  const { category } = useParams(); // Get the selected category from the URL
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    color: "",
    size: "",
    minPrice: 0,
    maxPrice: 500000,
  });

  const navigate = useNavigate()
  const Back =()=>{
    navigate(-1)
  }


  useEffect(() => {
    const categoryProducts = Products.filter((product) => product.category === category);
    setFilteredProducts(categoryProducts);
  }, [category]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const filtered = Products.filter(
      (product) =>
        product.category === category &&
        (filters.color === "" || product.color === filters.color) &&
        (filters.size === "" || product.size === filters.size) &&
        product.price >= filters.minPrice &&
        product.price <= filters.maxPrice
    );
    setFilteredProducts(filtered);
  };

  return (
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
          <option value="Red">Red</option>
          <option value="Blue">Blue</option>
          <option value="Green">Green</option>
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
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
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
      <button onClick={applyFilters} className="w-full p-2 bg-blue-500 text-white rounded">
        Apply Filters
      </button>
    </div>

    {/* Main Product Section */}
    <div className="md:ml-[25%] w-full lg:w-3/4 p-5">
    <button onClick={Back} className="py-1 hidden md:block px-2 bg-red-400 rounded-md text-white outline-none hover:bg-red-500">Back</button>
      <h2 className="text-2xl text-center sm:text-3xl md:text-4xl font-bold mb-5 capitalize">
      {category} Style
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
      {filteredProducts.map((product) => {
          if (product.category === category) {
            return <ProductCard key={product.id} product={product} />;
          }
        })}
      </div>
    </div>
  </div>
  );
};

export default CategoryPage;





