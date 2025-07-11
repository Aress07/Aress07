import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function CategoryList() {
  const { token } = useAuth();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/categories", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setCategories(data.data || []));
  }, [token]);

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map(c => (
          <li key={c.id}>{c.name}</li>
        ))}
      </ul>
    </div>
  );
}