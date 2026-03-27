import { createContext, useContext, useState, useEffect } from 'react';

const LogoContext = createContext();

export function LogoProvider({ children }) {
  const [customLogo, setCustomLogo] = useState(() => {
    const saved = localStorage.getItem('channelbi-logo');
    return saved || null;
  });

  useEffect(() => {
    if (customLogo) {
      localStorage.setItem('channelbi-logo', customLogo);
    } else {
      localStorage.removeItem('channelbi-logo');
    }
  }, [customLogo]);

  const uploadLogo = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject('No file provided');
        return;
      }

      if (!file.type.startsWith('image/')) {
        reject('Please upload an image file');
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        reject('Image size should be less than 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setCustomLogo(e.target.result);
        resolve(e.target.result);
      };
      reader.onerror = () => reject('Failed to read file');
      reader.readAsDataURL(file);
    });
  };

  const removeLogo = () => {
    setCustomLogo(null);
  };

  return (
    <LogoContext.Provider value={{ customLogo, uploadLogo, removeLogo }}>
      {children}
    </LogoContext.Provider>
  );
}

export const useLogo = () => {
  const context = useContext(LogoContext);
  if (!context) {
    throw new Error('useLogo must be used within a LogoProvider');
  }
  return context;
};
