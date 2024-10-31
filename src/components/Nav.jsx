import { useState, useEffect } from "react";
import { cart, logo, menu } from "../assets/images";
import { Link } from "react-router-dom";
import sanityClient from "../sanity/sanityClient";

const Nav = () => {
  const [cartQuantity, setCartQuantity] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const getQuantity = async () => {
    const localItems = localStorage.getItem("cartItems");
    if (localItems) {
      setCartItems(JSON.parse(localItems)); // Parse local storage items correctly
    } else {
      const items = await sanityClient.fetch(`*[_type == "cart"]{_id, quantity}`);
      setCartItems(items);
    }
  };

  useEffect(() => {
    getQuantity(); // Fetch the initial quantity on mount
  }, []);

  useEffect(() => {
    // Calculate the total quantity whenever cartItems changes
    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    setCartQuantity(totalQuantity);
  }, [cartItems]);

  return (
    <header className="bg-black md:fixed top-0 left-0 right-0 z-50">
      <nav className="flex items-center justify-between max-w-[85%] mx-auto py-5">
        <div className="flex items-center gap-2">
          <Link to="/">
            <img src={logo} alt="logo" className="w-12" />
          </Link>
          <span className="w-15 text-gray-400 hidden sm:block font-extrabold text-3xl">
            TWAU AFRICA LTD
          </span>
        </div>
        <ul className="items-center gap-5 hidden md:flex font-bold text-gray-500">
          <li className="hover:text-white">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-white">
            <Link to="/shop">Shop</Link>
          </li>
          <li className="hover:text-white">
            <Link to="/new-arrivals">New Arrivals</Link>
          </li>
          <li className="hover:text-white">
            <Link to="/top-seller">Top Sellers</Link>
          </li>
        </ul>
        {/* Uncomment if you want to add a search bar */}
        {/* <div className="flex items-center bg-gray-100 w-full md:w-[40%] rounded-3xl gap-2 p-2">
          <img src={search} alt="search" className="text-gray-300" />
          <input className="w-full bg-transparent outline-none" placeholder="Search for products..." />
        </div> */}
        <div className="flex justify-evenly items-center gap-10">
          <div className="relative">
            <div className="bg-white self-center p-2 rounded-md">
              <Link to="/cart">
                <img src={cart} alt="cart" className="text-white" />
              </Link>
            </div>
            <span className="font-bold text-white text-md absolute top-[-16px] right-[-17px] rounded-full w-6 h-6 flex items-center justify-center bg-red-600">
              {cartQuantity}
            </span>
          </div>

          <div className="p-1 bg-white md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <img src={menu} alt="menu" />
            </button>
          </div>
        </div>
      </nav>
      <div
        className={`h-screen bg-white fixed top-[85px] left-0 transform transition-transform duration-500 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="flex items-center justify-center pt-12">
          <ul
            onClick={() => setMenuOpen(!menuOpen)}
            className="items-center space-y-8 gap-5 md:hidden flex-col flex font-bold text-gray-500"
          >
            <li className="hover:text-white">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-white">
              <Link to="/shop">Shop</Link>
            </li>
            <li className="hover:text-white">
              <Link to="/new-arrivals">New Arrivals</Link>
            </li>
            <li className="hover:text-white">
              <Link to="/top-seller">Top Sellers</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Nav;
