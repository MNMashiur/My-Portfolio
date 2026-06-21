import  { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './context/ThemeContext';
import { PortfolioProvider } from './context/PortfolioContext';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ThemeProvider>
      <PortfolioProvider>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <Loader key="loader" onFinish={() => setIsLoading(false)} />
          ) : (
            <AppRoutes key="app" />
          )}
        </AnimatePresence>
      </PortfolioProvider>
    </ThemeProvider>
  );
}
