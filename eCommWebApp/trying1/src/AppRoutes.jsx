import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Categories from './pages/Categories';
import Products from './pages/Products';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import ProductDetails from './components/ProductDetails';

function AppRoutes() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return <div>Loading...</div>; 

  return (
    <Router>
    {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/products/:id" element={<PrivateRoute><ProductDetails /></PrivateRoute>} />        
        <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />

        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
        <Route path="/categories" element={<PrivateRoute><Categories /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
