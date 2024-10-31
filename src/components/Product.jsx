import { useEffect, useState } from 'react';
import sanityClient from '../sanity/sanityClient';
import ProductCard from './ProductCard';
import Hero from './Hero';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout'

const Product = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state
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
      .then((data) => setProducts(data))
      .finally(() => setLoading(false)); // Stop loading after fetching

    // Fetch categories from Sanity
    sanityClient
      .fetch(`*[_type == "category"]{
        _id,
        title,
        "imageUrl": image.asset->url
      }`)
      .then((data) => setCategories(data));
  }, []);

  const handleViewAllClick = (status) => {
    navigate(`/view-all/${status}`);
  };

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <Layout>
      <Hero />

      <section className="bg-white">
        <div className="max-w-[85%] mx-auto">
          {/* New Arrivals Section */}
          <section id="new" className="max-w-full mx-auto">
            <h2 className="text-4xl font-bold text-center py-10">NEW ARRIVALS</h2>

            {loading ? (
              <p className="text-center text-lg">Loading new arrivals...</p>
            ) : products.filter((p) => p.status === 'new-arrival').length === 0 ? (
              <p className="text-center text-lg text-gray-500">No new arrivals at the moment.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products
                  .filter((p) => p.status === 'new-arrival')
                  .slice(0, 4)
                  .map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
              </div>
            )}

            <div className="flex justify-center font-semibold pt-5 pb-10">
              <button
                onClick={() => handleViewAllClick('new-arrival')}
                className="py-1 px-7 border rounded-xl hover:bg-slate-50"
              >
                View All
              </button>
            </div>
          </section>

          {/* Top Selling Section */}
          <section id="top" className="max-w-full mx-auto border-t-2 border-gray-300 ">
            <h2 className="text-4xl font-bold text-center py-10">TOP SELLING</h2>

            {loading ? (
              <p className="text-center text-lg">Loading top sellers...</p>
            ) : products.filter((p) => p.status === 'top-seller').length === 0 ? (
              <p className="text-center text-lg text-gray-500">No top sellers at the moment.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products
                  .filter((p) => p.status === 'top-seller')
                  .slice(0, 4)
                  .map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
              </div>
            )}

            <div className="flex justify-center font-semibold pt-5 pb-10">
              <button
                onClick={() => handleViewAllClick('top-seller')}
                className="py-1 px-7 border rounded-xl hover:bg-slate-50"
              >
                View All
              </button>
            </div>
          </section>
        </div>

        {/* Browse by Dress Style Section */}
        <section className="max-w-[85%] text-gray-500 mx-auto bg-gray-100 p-5 text-center mt-10 rounded-3xl">
          <h2 className="text-4xl font-bold text-center py-10">BROWSE BY DRESS STYLE</h2>

          {loading ? (
            <p className="text-center text-lg">Loading categories...</p>
          ) : categories.length === 0 ? (
            <p className="text-center text-lg text-gray-500">No categories available at the moment.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {categories.map((category) => (
                <div
                  key={category._id}
                  className="relative"
                  onClick={() => handleCategoryClick(category.title)}
                >
                  <h3 className="absolute top-2 left-4 font-bold text-xl text-white bg-black bg-opacity-50 rounded-md px-2 py-1">
                    {category.title}
                  </h3>
                  <img
                    src={category.imageUrl}
                    className="rounded-xl cursor-pointer object-cover w-full h-56"
                    alt={category.title}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </section>
    </Layout>
  );
};

export default Product;
