import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Admin() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(savedProducts);
  }, []);

  function addProduct() {
    const newProduct = { id: Date.now(), name, price: parseInt(price) };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setName("");
    setPrice("");
  }

  function deleteProduct(index) {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Admin Dashboard</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name" className="border p-2 m-2" />
      <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="Price" className="border p-2 m-2" />
      <button onClick={addProduct} className="bg-green-500 text-white px-4 py-2 rounded m-2">Add Product</button>

      {products.map((p, index) => (
        <div key={p.id} className="border p-2 m-2">
          <p>{p.name} - ₹{p.price}</p>
          <button onClick={() => deleteProduct(index)} className="bg-red-500 text-white px-4 py-2 rounded m-2">Delete</button>
        </div>
      ))}

      <Link to="/" className="underline">Logout</Link>
    </div>
  );
}

export default Admin;
