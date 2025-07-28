import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const lightTheme = {
  colors: {
    primary: '#27a5b5',
    secondary: '#a18dd0',
    accent: '#5bf1e5',
    background: '#f8f9fa',
    surface: '#ffffff',
    text: '#2c3e50',
    textSecondary: '#6c757d',
    success: '#28a745',
    warning: '#ffc107',
    error: '#dc3545',
    info: '#17a2b8'
  },
  gradients: {
    primary: 'linear-gradient(135deg, #a18dd0, #27a5b5)',
    secondary: 'linear-gradient(135deg, #8167bc, #5bf1e5)',
    surface: 'linear-gradient(135deg, #ffffff, #f8f9fa)'
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 12px rgba(0, 0, 0, 0.15)',
    large: '0 8px 32px rgba(0, 0, 0, 0.2)'
  },
  borderRadius: {
    small: '8px',
    medium: '12px',
    large: '20px',
    round: '50%'
  }
};

const darkTheme = {
  colors: {
    primary: '#27a5b5',
    secondary: '#a18dd0',
    accent: '#5bf1e5',
    background: '#1a1a1a',
    surface: '#2d2d2d',
    text: '#ffffff',
    textSecondary: '#b0b0b0',
    success: '#28a745',
    warning: '#ffc107',
    error: '#dc3545',
    info: '#17a2b8'
  },
  gradients: {
    primary: 'linear-gradient(135deg, #3D0F5D, #100b55)',
    secondary: 'linear-gradient(135deg, #3D0F5D, #2519d0)',
    surface: 'linear-gradient(135deg, #2d2d2d, #1a1a1a)'
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.3)',
    medium: '0 4px 12px rgba(0, 0, 0, 0.4)',
    large: '0 8px 32px rgba(0, 0, 0, 0.5)'
  },
  borderRadius: {
    small: '8px',
    medium: '12px',
    large: '20px',
    round: '50%'
  }
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  const contextValue = {
    isDarkMode,
    toggleTheme,
    theme
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};