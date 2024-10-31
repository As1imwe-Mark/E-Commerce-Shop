/* eslint-disable react/prop-types */
import { useState } from 'react';
import sanityClient from '../sanity/sanityClient';

const ProductCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false); // New state for success message

  const handleImageClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const addToCart = async () => {
    // Check if the product is already in the cart
    const existingItem = cartItems.find((item) => item.productId === product._id);

    try {
      if (existingItem) {
        // Update the quantity in Sanity (Assuming we have a cart document type)
        const updatedCart = cartItems.map((item) =>
          item.productId === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCartItems(updatedCart);

        // Update quantity in Sanity
        await sanityClient.patch(existingItem._id).set({ quantity: existingItem.quantity + 1 }).commit();
      } else {
        // Add a new item to the cart in Sanity
        const newCartItem = {
          _type: 'cart',
          product: {
            _type: 'reference',
            _ref: product._id,
          },
          quantity: 1,
          selectedSize: 'medium', // For demonstration purposes, you can choose sizes dynamically
        };

        const createdCartItem = await sanityClient.create(newCartItem);
        setCartItems([...cartItems, { ...createdCartItem, productId: product._id }]);
      }

      // Set success state
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 3000); // Remove success message after 3 seconds
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  return (
    <div className="w-[85%] flex flex-col justify-between sm:w-72 m-5 p-2 border border-gray-300 rounded-lg shadow-lg">
      <img
        src={product.imageUrl}
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
        className={`py-1 px-5 text-sm font-semibold text-white transition-all duration-75 rounded-lg ${
          addedToCart ? 'bg-blue-500' : 'bg-green-500 hover:bg-green-600'
        }`}
        onClick={addToCart}
        disabled={addedToCart} // Disable button if item is added
      >
        {addedToCart ? 'Added to Cart' : 'Add to Cart'}
      </button>

      {/* Success message */}
      {addedToCart && (
        <p className="text-sm text-green-600 mt-2 text-center font-medium">Item added to cart successfully!</p>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 sm:mt-9 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-xl w-11/12 max-w-2xl">
            <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover rounded-t-lg" />
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