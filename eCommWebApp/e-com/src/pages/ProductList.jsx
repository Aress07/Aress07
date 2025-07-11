import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function ProductList() {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/products", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setProducts(data.data || []));
  }, [token]);

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map(p => (
          <li key={p.id}>{p.name} - {p.price} MAD</li>
        ))}
      </ul>
    </div>
  );
}