import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import sanityClient from "../sanity/sanityClient";
import { airtel, mtn } from "../assets/images";
import Layout from "./Layout";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const Back = () => navigate(-1);

  // Fetch items once on load
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const items = await sanityClient.fetch(`*[_type == "cart"]{
          _id,
          quantity,
          "product": product->{
            _id,
            name,
            size,
            color,
            price,
            "imageUrl": image.asset->url
          }
        }`);
        setCartItems(items);
        localStorage.setItem("cartItems", JSON.stringify(items));
      } catch (error) {
        setErrorMessage("Error fetching cart items. Please try again.");
      }
    };
    fetchCartItems();
  }, []);

  const handleRemove = async (id) => {
    try {
      // Remove item from Sanity
      await sanityClient.delete(id);
  
      // Update cart items in local state
      const updatedCartItems = cartItems.filter((item) => item._id !== id);
      setCartItems(updatedCartItems);
  
      // Update local storage
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  
      setSuccessMessage("Item removed successfully.");
    } catch (error) {
      setErrorMessage("Error removing item. Please try again.");
    }
  };
  
  const handleQuantityChange = async (id, quantity) => {
    const updatedQuantity = parseInt(quantity);
    if (isNaN(updatedQuantity) || updatedQuantity <= 0) return;
  
    try {
      // Update quantity in Sanity
      await sanityClient.patch(id).set({ quantity: updatedQuantity }).commit();
  
      // Update quantity in the local state
      const updatedCartItems = cartItems.map((item) =>
        item._id === id ? { ...item, quantity: updatedQuantity } : item
      );
      setCartItems(updatedCartItems);
  
      // Update local storage
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  
      setSuccessMessage("Quantity updated successfully.");
    } catch (error) {
      setErrorMessage("Error updating quantity. Please try again.");
    }
  };
  

  const total = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!customerName || !contact || !address) {
      setErrorMessage("Please fill in all customer details.");
      return;
    }
    if (cartItems.length === 0) {
      setErrorMessage("Your cart is empty. Please add items before checking out.");
      return;
    }

    const orderDetails = {
      customerName,
      contact,
      address,
      total,
      items: cartItems.map((item) => ({
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        size: item.product.size,
        color: item.product.color,
        image: item.product.imageUrl,
      })),
    };

    try {
      await sanityClient.create({
        _type: "order",
        customerName: orderDetails.customerName,
        contact: orderDetails.contact,
        address: orderDetails.address,
        total: orderDetails.total,
        items: orderDetails.items,
      });
      setSuccessMessage("Checkout successful! Your order has been placed.");
      setCartItems([]);
      setCustomerName("");
      setContact("");
      setAddress("");
      localStorage.removeItem("cartItems"); // Clear local storage
    } catch (error) {
      setErrorMessage("Something went wrong! Please try again.");
    }
  };

  return (
    <Layout>
      <main className="p-5 md:mt-[79px] md:h-[90%] overflow-hidden">
        <button
          onClick={Back}
          className="py-1 hidden md:block px-2 bg-red-400 rounded-md text-white outline-none hover:bg-red-500 mt-5"
        >
          Back
        </button>
        <h1 className="text-2xl text-center font-bold mb-5">Shopping Cart</h1>

        {/* Display success and error messages */}
        {successMessage && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-5 text-center">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-5 text-center">
            {errorMessage}
          </div>
        )}

        <div className="max-w-[85%] mx-auto flex flex-col md:flex-row justify-between gap-10">
          <section className="w-full md:w-1/2 shadow-lg rounded-lg p-5 bg-white">
            <h2 className="text-xl font-semibold mb-3">Items in Your Cart</h2>
            {cartItems.length === 0 ? (
              <div className="text-center text-gray-500 mt-5">
                <p>No items in your cart.</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col gap-5 sm:flex-row items-center justify-between border-b py-4"
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded shadow-md"
                  />
                  <div className="flex flex-col ml-4 flex-grow">
                    <h2 className="text-lg font-semibold">{item.product.name}</h2>
                    <p className="text-gray-600">Price: UGX {item.product.price}</p>
                    <div className="flex items-center mt-2">
                      <label htmlFor={`quantity-${item._id}`} className="mr-2 text-sm">
                        Qty:
                      </label>
                      <input
                        id={`quantity-${item._id}`}
                        type="number"
                        value={item.quantity}
                        min="1"
                        className="w-16 p-1 border border-gray-300 rounded"
                        onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}

            <div className="mt-5">
              <h2 className="font-semibold text-lg">Mobile Money Payment Options</h2>
              <div className="mt-3">
                <h3 className="font-medium text-md">For AirtelMoney Use</h3>
                <div className="flex items-center mt-1">
                  <img
                    src={airtel}
                    alt="Airtel Money payment option"
                    className="w-12 h-12 mr-2"
                    loading="lazy"
                  />
                  <span className="font-semibold">0700504932</span>
                </div>
              </div>

              <div className="mt-3">
                <h3 className="font-medium text-md">For MTN Mobile Money Use</h3>
                <div className="flex items-center mt-1">
                  <img
                    src={mtn}
                    alt="MTN Mobile Money payment option"
                    className="w-12 h-12 mr-2"
                    loading="lazy"
                  />
                  <span className="font-semibold">0773686905</span>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full md:w-1/2 mt-5 shadow-lg rounded-lg p-5 bg-white">
            <h2 className="text-xl font-semibold mb-3">Order Summary</h2>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Customer Name</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full border p-2 rounded"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Contact</label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full border p-2 rounded"
                placeholder="Enter your contact"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border p-2 rounded"
                placeholder="Enter your address"
              />
            </div>
            <ul className="space-y-2 mb-5">
              <li className="flex justify-between font-bold">
                <span>Total:</span> <span>UGX {total.toFixed(2)}</span>
              </li>
            </ul>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </section>
        </div>
      </main>
    </Layout>
  );
};

export default CartPage;
