/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

const ProductCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(items);
  }, []);

  const handleImageClick = () => setShowModal(true);

  const addToCart = () => {
    const itemIndex = cartItems.findIndex((item) => item.id === product.id);
    if (itemIndex !== -1) {
      cartItems[itemIndex].quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }
    setCartItems([...cartItems]);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="w-[85%] flex flex-col justify-between sm:w-72 m-5 p-2 border border-gray-300 rounded-lg shadow-lg">
      <img
        src={product.Image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-t-lg cursor-pointer"
        onClick={handleImageClick}
      />
      <div className="p-4">
        <h2 className="font-bold text-xl mb-2">{product.name}</h2>
        <p className="text-gray-600">Price: UGX {product.price}</p>
        <p className="text-gray-600">Category: {product.category}</p>
      </div>
      <button
        className="bg-green-500 rounded-lg py-1 px-5 text-sm font-semibold text-white transition-all duration-75 hover:bg-green-600"
        onClick={addToCart}
      >
        Add to Cart
      </button>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 sm:mt-9 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-xl w-11/12 max-w-2xl">
            <img src={product.Image} alt={product.name} className="w-full h-64 object-cover rounded-t-lg" />
            <div className="p-4">
              <h2 className="font-bold text-xl mb-2">{product.name}</h2>
              <p className="text-gray-600">Price: UGX {product.price}</p>
              <p className="text-gray-600">Category: {product.category}</p>
              <p className="text-gray-600">Description: {product.description}</p>
            </div>
            <button
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
