import 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Admin from '../pages/Admin';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      {/* Fallback to Home */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
