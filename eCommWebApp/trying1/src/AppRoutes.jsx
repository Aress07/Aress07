import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import Navbar from './components/Navbar.jsx';

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Categories from './pages/Categories.jsx';
import Products from './pages/Products.jsx';
import Admin from './pages/Admin.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import ProductDetails from './components/ProductDetails.jsx';

function AppRoutes() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen text-xl text-gray-700 dark:text-gray-300">
      Loading application...
    </div>
  );

  return (
    <Router>
      <Navbar />
      <div className="min-h-[calc(100vh-64px)]">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />

          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} /> 
          <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
          <Route path="/products/:id" element={<PrivateRoute><ProductDetails /></PrivateRoute>} />
          <Route path="/categories" element={<PrivateRoute><Categories /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />

          <Route
            path="*"
            element={
              <div className="flex flex-col items-center justify-center min-h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
                <h1 className="text-5xl font-extrabold mb-4 text-red-600 dark:text-red-400">404</h1>
                <p className="text-2xl text-gray-700 dark:text-gray-300">Page Not Found</p>
                <p className="text-lg mt-4 text-gray-600 dark:text-gray-400">
                  The page you are looking for does not exist. Go back to <a href="/" className="text-blue-600 hover:underline dark:text-blue-400">Home</a>.
                </p>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRoutes;