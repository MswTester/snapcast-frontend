import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { lightTheme } from './themes';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}