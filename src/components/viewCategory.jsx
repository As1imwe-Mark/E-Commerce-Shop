import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Products } from "../constants/products";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

const ViewAllCategoryPage = () => {
  const { status } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const filtered = Products.filter((product) => product.status === status);
    setFilteredProducts(filtered);
  }, [status]);

  const navigate = useNavigate()
  const Back =()=>{
    navigate(-1)
  }


  return (
    <div className="max-w-[90%] md:max-w-[85%] mx-auto bg-white md:mt-[79px]">
    <button onClick={Back} className="py-1 px-2 bg-red-400 rounded-md text-white outline-none hover:bg-red-500 mt-5">Back</button>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center py-6 sm:py-8 md:py-10 capitalize">
        {status.replace(/([A-Z])/g, " $1")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ViewAllCategoryPage;
