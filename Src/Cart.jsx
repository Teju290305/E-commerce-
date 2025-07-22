import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  function checkout() {
    localStorage.removeItem("cart");
    setCart([]);
    alert("Order Confirmed!");
  }

  function removeItem(index) {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Your Cart</h2>
      {cart.map((item, index) => (
        <div key={index} className="border p-2 m-2">
          <p>{item.name} - ₹{item.price}</p>
          <button onClick={() => removeItem(index)} className="bg-red-500 text-white px-4 py-2 rounded m-2">Remove</button>
        </div>
      ))}
      <button onClick={checkout} className="bg-blue-500 text-white px-4 py-2 rounded m-2">Checkout</button>
      <Link to="/home" className="underline">Continue Shopping</Link>
    </div>
  );
}

export default Cart;
