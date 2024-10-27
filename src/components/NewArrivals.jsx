import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Products } from "../constants/products";
import ProductCard from "./ProductCard";

const NewArrivals = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const filtered = Products.filter((product) => product.status === 'newArrivals');
    setFilteredProducts(filtered);
  }, []);

  const Back =()=>{
    navigate(-1)
  }

  return (
    <div className="max-w-[90%] md:max-w-[85%] mx-auto md:mt-[79px] bg-white">
    <button onClick={Back} className="py-1 px-2 bg-red-400 rounded-md text-white outline-none hover:bg-red-500 mt-5">Back</button>
      <h2 className="text-2xl sm:text-3xl md:text-4xl sm:font-extrabold text-center py-6 sm:py-8 md:py-10 capitalize">
        Brand New Clothes On The Market, Make a Choice!
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;
