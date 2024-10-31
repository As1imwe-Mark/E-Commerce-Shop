import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sanityClient from '../sanity/sanityClient'
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

const ViewAllCategoryPage = () => {
  const { status } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from Sanity
    sanityClient.fetch(`*[_type == "product"]{
      _id,
      name,
      price,
      "category": category->title,
      description,
      "imageUrl": image.asset->url,
      status
    }`).then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) => product.status === status);
    setFilteredProducts(filtered);
  }, [products, status]);

  const navigate = useNavigate()
  const Back =()=>{
    navigate(-1)
  }


  return (
    <div className="max-w-full md:max-w-[85%] mx-auto bg-white md:mt-[79px]">
    <button onClick={Back} className="py-1  hidden md:block px-2 bg-red-400 rounded-md text-white outline-none hover:bg-red-500 mt-5">Back</button>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center py-6 sm:py-8 md:py-10 capitalize">
        {status.replace(/([A-Z])/g, " $1")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ViewAllCategoryPage;
