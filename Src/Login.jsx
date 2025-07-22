import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  function handleLogin() {
    if (user === "admin" && pass === "admin") {
      navigate("/admin");
    } else if (user === "user" && pass === "user") {
      navigate("/home");
    } else {
      alert("Invalid Credentials");
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Login</h2>
      <input value={user} onChange={(e) => setUser(e.target.value)} placeholder="Username" className="border p-2 m-2" />
      <input value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Password" type="password" className="border p-2 m-2" />
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
    </div>
  );
}

export default Login;
