import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate()
  const Back =()=>{
    navigate(-1)
  }

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(items);
  }, []);

  const saveToStorage = (items) => {
    setCartItems(items);
    localStorage.setItem('cartItems', JSON.stringify(items));
  };

  const handleRemove = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    saveToStorage(updatedItems);
  };

  const handleQuantityChange = (id, quantity) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: parseInt(quantity) } : item
    );
    saveToStorage(updatedItems);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <main className="p-5 md:mt-[79px] md:h-[90%] overflow-hidden  scroll-m-6">
    <button onClick={Back} className="py-1 px-2 bg-red-400 rounded-md text-white outline-none hover:bg-red-500 mt-5">Back</button>
      <h1 className="text-2xl text-center font-bold mb-5">Shopping Cart</h1>
      <div className='max-w-[85%] mx-auto flex flex-col md:flex-row justify-between gap-10'>

      <section className="w-full md:w-1/2 shadow-md p-5">
      <h2>Items on Your Cart!</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="flex flex-col gap-5 sm:flex-row items-center justify-between border-b py-4">
            <img src={item.Image} alt={item.name} className="w-20 h-20 object-cover rounded" />
            <div className="flex flex-col ml-4 flex-grow">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-600">Price: UGX {item.price}</p>
              <div className="flex items-center">
                <label htmlFor="quantity" className="mr-2 text-sm">Qty:</label>
                <input
                  id="quantity"
                  type="number"
                  value={item.quantity}
                  min="1"
                  className="w-16 p-1 border border-gray-300 rounded"
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={() => handleRemove(item.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </section>

      <section className="w-full md:w-1/2  mt-5 shadow-md p-5">
        <h2 className="text-xl font-semibold mb-3">Order Summary</h2>
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
          onClick={() => alert('Checkout successful!')}
        >
          Checkout
        </button>
      </section>
      </div>
      
      
    </main>
  );
};

export default CartPage;
