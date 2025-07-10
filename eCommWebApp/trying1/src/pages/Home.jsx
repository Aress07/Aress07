import {useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Home() {
    const { user, isAuthenticated} = useAuth();

    return (
        <div style={{padding: '2rem', textAlign: 'center'}}>
            <h1>Welcome to E-shop</h1>
            {isAuthenticated ? (
                <p>Hi <strong>{user.name}</strong>! Explore our latest products and deals below.</p>
            ) : (
                <p>
                    Please <Link to="/login">Login</Link> or <Link to="/register">Register</Link> to start shopping.
                </p>
            )}

            <div style={{marginTop: '2rem'}} >
                <Link to="/products">
                    <button style= {{
                        padding: '10px 20px',
                        fontSize: '1.2rem',
                        borderRadius: '8px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer'                        
                    }}>
                        View Products
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Home;