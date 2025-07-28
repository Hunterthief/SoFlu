import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { ThemeProvider } from './contexts/ThemeContext';
import './i18n';
import routeGenerator from './utils/routeGenerator';
import LoadingSpinner from './components/LoadingSpinner';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Comic Neue', cursive;
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    min-height: 100vh;
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.secondary};
  }

  /* Focus styles for accessibility */
  button:focus,
  a:focus,
  input:focus,
  select:focus,
  textarea:focus {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }

  /* Smooth transitions */
  * {
    transition: background-color 0.3s ease, color 0.3s ease;
  }
`;

const AppLoadingScreen = () => (
  <div style={{ 
    height: '100vh', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #a18dd0, #27a5b5)'
  }}>
    <LoadingSpinner message="Loading SoFlu..." size={60} />
  </div>
);

function App() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const generatedRoutes = await routeGenerator.generateRoutes();
        setRoutes(generatedRoutes);
      } catch (error) {
        console.error('Failed to initialize app:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (loading) {
    return <AppLoadingScreen />;
  }

  return (
    <ThemeProvider>
      <GlobalStyle />
      <Router>
        <Suspense fallback={<AppLoadingScreen />}>
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={route.path || index}
                path={route.path}
                element={<route.element />}
              />
            ))}
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;