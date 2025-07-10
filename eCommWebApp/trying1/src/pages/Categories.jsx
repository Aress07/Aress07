import {useEffect, useState} from 'react';
import {useAuth} from '../context/AuthContext';
import {Link} from 'react-router-dom';

function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const {token} = useAuth();

    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await fetch('http://localhost:8080/api/categories' , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                const json = await res.json();
                console.log(json);

                setCategories(Array.isArray(json?.data) ? json.data : []);
            } catch (error) {
                console.log("Failed to fetch categories: ", error);
                setCategories([]);
            } finally {
                setLoading(false);
            }
        }
        fetchCategories();
    }, [token]);

    if (loading) return <div>Loading categories...</div>

    if (!categories || categories.length === 0) {
        return <p>No category found.</p>
    }

    return (
        <div>
            <h2>Categories List</h2>
            <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                {categories.map((category) => (
                    <div key={category.id} style={{border: '1px solid #ccc', borderRadius: '10px', padding: '15px'}}>
                        <Link to={`/categories/${category.id}`} style={{color: '#2b7', textDecoration: 'none'}}>
                            <h3>{category.name}</h3>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Categories;