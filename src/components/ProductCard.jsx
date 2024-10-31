/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import sanityClient from "../sanity/sanityClient";

const ProductCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false); // State for success message
  const { _id, imageUrl, name, price, category, description } = product; // Destructure product data

  // Load cart items from local storage
  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  // Sync local storage with cart items
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleImageClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const addToCart = async () => {
    // Check if the product is already in the cart
    const existingItem = cartItems.find((item) => item.productId === _id);

    try {
      if (existingItem) {
        // Update the quantity in the cart
        const updatedCart = cartItems.map((item) =>
          item.productId === _id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        setCartItems(updatedCart);

        // Update quantity in Sanity
        await sanityClient
          .patch(existingItem._id)
          .set({ quantity: existingItem.quantity + 1 })
          .commit();
      } else {
        // Add a new item to the cart in Sanity
        const newCartItem = {
          _type: "cart",
          product: {
            _type: "reference",
            _ref: _id,
          },
          quantity: 1,
          selectedSize: "medium", // For demonstration purposes
        };

        const createdCartItem = await sanityClient.create(newCartItem);
        setCartItems((prevItems) => [
          ...prevItems,
          { ...createdCartItem, productId: _id, quantity: 1 },
        ]);
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
        src={imageUrl}
        alt={name}
        className="w-full h-48 object-cover rounded-t-lg cursor-pointer"
        onClick={handleImageClick}
      />
      <div className="p-4">
        <h2 className="font-bold text-xl mb-2">{name}</h2>
        <p className="text-gray-600">Price: UGX {price}</p>
        <p className="text-gray-600">Category: {category}</p>
      </div>

      <button
        className={`py-1 px-5 text-sm font-semibold text-white transition-all duration-75 rounded-lg ${
          addedToCart ? "bg-blue-500" : "bg-green-500 hover:bg-green-600"
        }`}
        onClick={addToCart}
        disabled={addedToCart} // Disable button if item is added
      >
        {addedToCart ? "Added to Cart" : "Add to Cart"}
      </button>

      {/* Success message */}
      {addedToCart && (
        <p className="text-sm text-green-600 mt-2 text-center font-medium">
          Item added to cart successfully!
        </p>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 sm:mt-9 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-xl w-11/12 max-w-2xl">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="font-bold text-xl mb-2">{name}</h2>
              <p className="text-gray-600">Price: UGX {price}</p>
              <p className="text-gray-600">Category: {category}</p>
              <p className="text-gray-600">Description: {description}</p>
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
