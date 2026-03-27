import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('nexusbank-user');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Validate that parsed data has required fields
        if (parsed && parsed.email && parsed.name) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error parsing stored user:', e);
      localStorage.removeItem('nexusbank-user');
    }
    return null;
  });

  // Sync state with localStorage on changes
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'nexusbank-user') {
        try {
          const newUser = e.newValue ? JSON.parse(e.newValue) : null;
          setUser(newUser);
        } catch (err) {
          setUser(null);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = (email, password) => {
    // Simulated login - accept any credentials
    const userData = {
      id: '1',
      email,
      name: email.split('@')[0].replace(/\./g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      role: 'Executive',
      avatar: 'https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NDh8MHwxfHNlYXJjaHw0fHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0JTIwaGVhZHNob3R8ZW58MHx8fHwxNzc0NTc0OTMwfDA&ixlib=rb-4.1.0&q=85&w=100'
    };
    setUser(userData);
    localStorage.setItem('nexusbank-user', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nexusbank-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
