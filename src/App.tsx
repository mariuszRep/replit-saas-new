import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import LoadingScreen from './components/LoadingScreen';

function AppContent() {
  const { user, loading } = useAuth();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  let content;
  if (!user && currentPath !== '/login') {
    window.history.pushState(null, '', '/login');
    content = <Login />;
  } else if (currentPath === '/dashboard') {
    content = <Dashboard />;
  } else if (currentPath === '/profile') {
    content = <Profile />;
  } else if (currentPath === '/login' && !user) {
    content = <Login />;
  } else {
    content = <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        {user && <Sidebar isOpen={sidebarOpen} />}
        <main className={`flex-1 transition-all duration-300 ${user ? (sidebarOpen ? 'ml-64' : 'ml-20') : ''}`}>
          {content}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
