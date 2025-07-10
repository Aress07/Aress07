import {Link} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

function Navbar() {

    const {user, logout} = useAuth();
    return (
        <nav style={{padding: '1rem', background: '#eee'}}>
            {user ? (
                <>
                    <Link to="/" style={{marginRight: '1rem'}}>Home</Link>
                    <Link to="/about" style={{marginRight: '1rem'}}>About</Link>
                    <Link to="/categories" style={{marginRight: '1rem'}}>Categories</Link>
                    <Link to="/products" style={{marginRight: '1rem'}}>Products</Link>   
                    <button onClick={logout} style={{ marginLeft: '1rem'}}>Logout</button>              
                </>
            ) : (
                <>
                    <Link to="/login" style={{ marginRight: '1rem'}}>Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}                               
        </nav>
    );
}

export default Navbar;