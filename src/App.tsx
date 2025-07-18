import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { lightTheme } from './ui/themes';
import Home from './ui/pages/Home';
import Login from './ui/pages/Login';
import Register from './ui/pages/Register';
import Search from './ui/pages/Search';
import Channel from './ui/pages/Channel';
import CreateChannel from './ui/pages/CreateChannel';
import CreateSnap from './ui/pages/CreateSnap';
import NotFound from './ui/pages/NotFound';
import { AuthProvider } from './contexts/authContext';
import { AudioProvider } from './contexts/audioContext';
import { useEffect, useState } from 'react';

export default function App() {
  const [once, setOnce] = useState(false);
  useEffect(() => {
    setOnce(true);
  }, []);
  
  return (once &&
    <ThemeProvider theme={lightTheme}>
      <AudioProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<Search />} />
            <Route path="/channel" element={<Channel />} />
            <Route path="/create-channel" element={<CreateChannel />} />
            <Route path="/create-snap" element={<CreateSnap />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </AudioProvider>
    </ThemeProvider>
  );
}