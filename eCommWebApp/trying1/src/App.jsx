import { AuthProvider } from './context/AuthContext.jsx';
import AppRoutes from './AppRoutes.jsx'; 
import { ThemeProvider } from './context/ThemeContext.jsx';


function App() {
  return (
    <AuthProvider>
      <ThemeProvider>

        <main className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
            <AppRoutes /> 
        </main>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;