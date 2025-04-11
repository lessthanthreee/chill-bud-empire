
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { Toaster } from "@/components/ui/toaster"

import Index from './pages/Index';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Reviews from './pages/Reviews';
import AgeVerification from './components/AgeVerification';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AgeVerification />
        <Navbar />
        <CartSidebar />
        <main>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/reviews" element={<Reviews />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </ThemeProvider>
    </div>
  );
}

export default App;
