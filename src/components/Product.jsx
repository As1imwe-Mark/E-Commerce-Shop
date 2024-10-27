import { useNavigate } from "react-router-dom";
import { Products } from "../constants/products";
import ProductCard from "./ProductCard";
import { image11, image12, image13, image14 } from "../assets/images";
import Hero from "./Hero";

const Product = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  const handleViewAllClick = (status) => {
    navigate(`/view-all/${status}`);
  };

  return (
    <main>
    <Hero />
    <section className="bg-white">
      {/* New Arrivals Section */}
      <section id="new" className="max-w-[85%] mx-auto">
        <h2 className="text-4xl font-bold text-center py-10">NEW ARRIVALS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Products.filter((p) => p.status === "newArrivals").slice(0,4).map((product)=><ProductCard key={product.id} product={product} />) 
              
            }
        </div>
        <div className="flex justify-center font-semibold pt-5 pb-10">
          <button
            onClick={() => handleViewAllClick("newArrivals")}
            className="py-1 px-7 border rounded-xl hover:bg-slate-50"
          >
            View All
          </button>
        </div>
      </section>

      {/* Top Selling Section */}
      <section id="top" className="max-w-[85%] mx-auto border-t-2 border-gray-300 ">
        <h2 className="text-4xl font-bold text-center py-10">TOP SELLING</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Products.filter((p) => p.status === "topSelling").slice(0,4).map((product)=><ProductCard key={product.id} product={product} />) 
              
            }
        </div>
        <div className="flex justify-center font-semibold pt-5">
          <button
            onClick={() => handleViewAllClick("topSelling")}
            className="py-1 px-7 border rounded-xl hover:bg-slate-50"
          >
            View All
          </button>
        </div>
      </section>

      {/* Browse by Dress Style Section */}
      <section className="max-w-[85%] text-gray-500 mx-auto bg-gray-100 p-5 text-center mt-10 rounded-3xl">
        <h2 className="text-4xl font-bold text-center py-10">BROWSE BY DRESS STYLE</h2>
        <div className="flex justify-center items-center md:gap-4 gap-2 pb-3 Md:pb-5">
          <div className="relative" onClick={() => handleCategoryClick("Casual")}>
            <h3 className="absolute top-2 left-4 font-bold text-xl">Casual</h3>
            <img src={image11} className="rounded-xl cursor-pointer" alt="Casual" />
          </div>
          <div className="relative" onClick={() => handleCategoryClick("Formal")}>
            <h3 className="absolute top-2 left-4 font-bold text-xl">Formal</h3>
            <img src={image13} className="rounded-xl cursor-pointer" alt="Formal" />
          </div>
        </div>

        <div className="flex items-center md:gap-4 gap-2">
          <div className="relative col-span-2 w-3/3" onClick={() => handleCategoryClick("Party")}>
            <h3 className="absolute top-2 left-4 font-bold text-xl">Party</h3>
            <img src={image12} className="rounded-xl cursor-pointer md:w-full w-[200px]" alt="Party" />
          </div>
          <div className="relative w-1/3" onClick={() => handleCategoryClick("Gym")}>
            <h3 className="absolute top-2 left-4 font-bold text-xl">Gym</h3>
            <img src={image14} className="rounded-xl w-full cursor-pointer" alt="Gym" />
          </div>
        </div>
      </section>
    </section>
      
    </main>
  );
};

export default Product;
