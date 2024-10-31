import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import sanityClient from '../sanity/sanityClient'

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');

  const navigate = useNavigate();
  const Back = () => {
    navigate(-1);
  };

  useEffect(() => {
    // Fetch cart items from Sanity
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
      } catch (error) {
        console.error("Error fetching cart items: ", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemove = async (id) => {
    try {
      await sanityClient.delete(id);
      setCartItems(cartItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error removing item: ", error);
    }
  };

  const handleQuantityChange = async (id, quantity) => {
    try {
      // Validate and convert the quantity to a number
      const updatedQuantity = parseInt(quantity);
      if (isNaN(updatedQuantity) || updatedQuantity <= 0) return;

      // Update the cart item in Sanity
      await sanityClient.patch(id).set({ quantity: updatedQuantity }).commit();

      // Update the local state
      const updatedItems = cartItems.map((item) =>
        item._id === id ? { ...item, quantity: updatedQuantity } : item
      );
      setCartItems(updatedItems);
    } catch (error) {
      console.error("Error updating quantity: ", error);
    }
  };


  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleCheckout = async () => {
    if (!customerName || !contact || !address) {
      alert("Please fill in all customer details.");
      return;
    }

    const orderDetails = {
      customerName,
      contact,
      address,
      total,
      items: cartItems.map(item => ({
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        size: item.product.size,
        color: item.product.color,
        image: item.product.imageUrl
      })),
    };

    try {
      // Sending order details to Sanity
      await sanityClient.create({
        _type: "order",
        customerName: orderDetails.customerName,
        contact: orderDetails.contact,
        address: orderDetails.address,
        total: orderDetails.total,
        items: orderDetails.items
      });
      alert("Checkout successful! Your order has been placed.");
      // Clear cart after successful checkout
      // saveToStorage([]);
    } catch (error) {
      console.error("Failed to send order:", error);
      alert("Something went wrong! Please try again.");
    }
  };

  return (
    <main className="p-5 md:mt-[79px] md:h-[90%] overflow-hidden scroll-m-6">
      <button onClick={Back} className="py-1 hidden md:block px-2 bg-red-400 rounded-md text-white outline-none hover:bg-red-500 mt-5">Back</button>
      <h1 className="text-2xl text-center font-bold mb-5">Shopping Cart</h1>
      <div className="max-w-[85%] mx-auto flex flex-col md:flex-row justify-between gap-10">
        <section className="w-full md:w-1/2 shadow-md p-5">
          <h2>Items in Your Cart</h2>
          {cartItems.map((item) => (
            <div key={item._id} className="flex flex-col gap-5 sm:flex-row items-center justify-between border-b py-4">
              <img src={item.product.imageUrl} alt={item.product.name} className="w-20 h-20 object-cover rounded" />
              <div className="flex flex-col ml-4 flex-grow">
                <h2 className="text-lg font-semibold">{item.product.name}</h2>
                <p className="text-gray-600">Price: UGX {item.product.price}</p>
                <div className="flex items-center">
                  <label htmlFor={`quantity-${item._id}`} className="mr-2 text-sm">Qty:</label>
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
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </section>

        <section className="w-full md:w-1/2 mt-5 shadow-md p-5">
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
            <li className="flex justify-between">
              <span>Subtotal:</span> <span>UGX {subtotal.toFixed(2)}</span>
            </li>
            <li className="flex justify-between">
              <span>Tax (8%):</span> <span>UGX {tax.toFixed(2)}</span>
            </li>
            <li className="flex justify-between font-bold">
              <span>Total:</span> <span>UGX {total.toFixed(2)}</span>
            </li>
          </ul>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </section>
      </div>
    </main>
  );
};

export default CartPage;
