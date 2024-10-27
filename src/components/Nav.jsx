import { useState, useEffect } from 'react';
import { cart, logo} from '../assets/images';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(()=>{
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    setCartQuantity(totalQuantity);
    },100)

    return ()=>clearInterval(intervalId)
  }, []);


  return (
    <header className="bg-black md:fixed top-0 left-0 right-0 z-50">
      <nav className="flex items-center justify-between max-w-[85%] mx-auto py-5">
        <div className='flex items-center gap-2'>
          <Link to="/"><img src={logo} alt="logo" className="w-12" /></Link>
          <span className="w-15 text-gray-400 hidden sm:block font-extrabold text-3xl">TWAU AFRICA LTD</span>
        </div>
        <ul className="items-center gap-5 hidden md:flex font-bold text-gray-500">
          <li className='hover:text-white'><Link to='/shop'>Shop</Link></li>
          <li className='hover:text-white'><Link to="/new-arrivals">New Arrivals</Link></li>
          <li className='hover:text-white'><Link to="/top-seller">Top Sellers</Link></li>
        </ul>
        {/* <div className="flex items-center bg-gray-100 w-full md:w-[40%] rounded-3xl gap-2 p-2">
          <img src={search} alt="search" className="text-gray-300" />
          <input className="w-full bg-transparent outline-none" placeholder="Search for products..." />
        </div> */}
        <div className="relative">
          <div className='bg-white p-2 rounded-md'><Link to='/cart'><img src={cart} alt="cart" className='text-white' /></Link></div>
          <span className="font-bold text-white text-md absolute top-[-16px] right-[-17px] rounded-full w-6 h-6 flex items-center justify-center bg-red-600">{cartQuantity}</span>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
