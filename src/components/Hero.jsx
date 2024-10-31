import { Link } from "react-router-dom";
import { calvin, gucci, hero, herostar, prada, versace, zara } from "../assets/images";

const Hero = () => {
  return (
    <main className="bg-gray-100 md:mt-[79px]">
      <div className="max-w-[90%] md:max-w-[85%] mx-auto flex flex-col-reverse md:flex-row pt-6 gap-8 items-center bg-gray-100">
        {/* Left Section */}
        <section className="w-full md:w-1/2 mt-4">
          <div className="flex flex-col gap-5">
            <h1 className="font-extrabold text-3xl sm:text-5xl lg:text-7xl">
              FIND CLOTHES
              <br /> THAT MATCH
              <br /> YOUR STYLE
            </h1>
            <span className="text-gray-500 text-sm md:text-base lg:text-lg">
              Browse through our wide range of meticulously crafted garments, designed
              <br className="hidden md:block" /> to bring out your individuality and cater to your sense of style
            </span>
            <Link to="/shop" className="bg-black px-6 sm:px-10 lg:px-14 py-2 sm:py-3 text-center block self-start text-white rounded-3xl">
              Shop Now
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4 py-8">
            <div className="text-center md:text-left">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-semibold">200+</span>
              <br />
              <span className="text-gray-500 font-medium text-sm sm:text-base">International Brands</span>
            </div>
            <div className="text-center md:text-left">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-semibold">2000+</span>
              <br />
              <span className="text-gray-500 font-medium text-sm sm:text-base">High-Quality Products</span>
            </div>
            <div className="text-center md:text-left">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-semibold">30,000+</span>
              <br />
              <span className="text-gray-500 font-medium text-sm sm:text-base">Happy Customers</span>
            </div>
          </div>
        </section>

        {/* Right Section */}
        <section className="w-full md:w-1/2 relative">
          <div className="w-full">
            {/* Use loading="lazy" for lazy loading and a low-quality placeholder */}
            <img src={hero} className="object-cover w-full h-full" alt="Hero Banner" loading="lazy" />
          </div>
          <span className="absolute right-2 top-4 hidden sm:block">
            <img className="object-cover w-8 sm:w-12 lg:w-16" src={herostar} alt="Star" />
          </span>
          <span className="absolute w-8 sm:w-12 lg:w-16 left-3 top-[50%] transform -translate-y-1/2 hidden sm:block">
            <img src={herostar} alt="Star" />
          </span>
        </section>
      </div>

      {/* Brands Section */}
      <section className="bg-black py-8 sm:py-10">
        <div className="max-w-[90%] md:max-w-[85%] mx-auto flex justify-between items-center md:flex-wrap gap-5">
          <span className="flex justify-center w-1/3 md:w-auto">
            <img src={versace} alt="Versace" className="w-20 sm:w-24 lg:w-32" />
          </span>
          <span className="flex justify-center w-1/3 md:w-auto">
            <img src={zara} alt="Zara" className="w-20 sm:w-24 lg:w-32" />
          </span>
          <span className="flex justify-center w-1/3 md:w-auto">
            <img src={gucci} alt="Gucci" className="w-20 sm:w-24 lg:w-32" />
          </span>
          <span className="flex justify-center w-1/3 md:w-auto">
            <img src={prada} alt="Prada" className="w-20 sm:w-24 lg:w-32" />
          </span>
          <span className="flex justify-center w-1/3 md:w-auto">
            <img src={calvin} alt="Calvin Klein" className="w-20 sm:w-24 lg:w-32" />
          </span>
        </div>
      </section>
    </main>
  );
};

export default Hero;
