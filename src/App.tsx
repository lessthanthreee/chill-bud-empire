import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "next-themes";
import AgeVerification from "@/components/AgeVerification";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import LabResults from "./pages/LabResults";
import FAQ from "./pages/FAQ";
import Reviews from "./pages/Reviews";
import GiftCards from "./pages/GiftCards";
import Wholesale from "./pages/Wholesale";
import Subscriptions from "./pages/Subscriptions";
import TrackOrder from "./pages/TrackOrder";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AgeVerification />
            <Navbar />
            <CartSidebar />
            <main className="min-h-screen pt-16">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/lab-results" element={<LabResults />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/gift-cards" element={<GiftCards />} />
                <Route path="/wholesale" element={<Wholesale />} />
                <Route path="/subscriptions" element={<Subscriptions />} />
                <Route path="/track-order" element={<TrackOrder />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
