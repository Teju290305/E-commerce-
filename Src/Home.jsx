import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(savedProducts);
  }, []);

  function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  }

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Product Store</h2>
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="border p-2 m-2" />
      <Link to="/cart" className="underline">View Cart</Link>
      {filteredProducts.map((p) => (
        <div key={p.id} className="border p-2 m-2">
          <p>{p.name} - ₹{p.price}</p>
          <button onClick={() => addToCart(p)} className="bg-green-500 text-white px-4 py-2 rounded m-2">Add to Cart</button>
          <Link to={`/product/${p.id}`} className="underline">View</Link>
        </div>
      ))}
    </div>
  );
}

export default Home;
