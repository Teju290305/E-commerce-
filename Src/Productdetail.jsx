import { useParams, Link } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const product = products.find((p) => p.id == id);

  if (!product) return <div>Product not found</div>;

  function addToCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p>Price: ₹{product.price}</p>
      <button onClick={addToCart} className="bg-green-500 text-white px-4 py-2 rounded m-2">Add to Cart</button>
      <Link to="/home" className="underline">Back to Home</Link>
    </div>
  );
}

export default ProductDetail;
