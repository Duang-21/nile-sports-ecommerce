import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Sparkles, CheckCircle2 } from 'lucide-react';
import { Product, CartItem } from './types';
import { products } from './data';
import Header from './components/Header';
import Hero from './components/Hero';
import Categories from './components/Categories';
import ProductGrid from './components/ProductGrid';
import ReviewsSection from './components/ReviewsSection';
import OurStory from './components/OurStory';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ProductDetailsModal from './components/ProductDetailsModal';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'performance' | 'athleisure' | 'essentials'>('all');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [inspectedProduct, setInspectedProduct] = useState<Product | null>(null);
  const [reviewCount, setReviewCount] = useState<number>(4);
  const [bagNotification, setBagNotification] = useState<string | null>(null);

  // Load Cart from localStorage on boot
  useEffect(() => {
    const cached = localStorage.getItem('nsw_shopping_cart');
    if (cached) {
      try {
        setCart(JSON.parse(cached));
      } catch (err) {
        setCart([]);
      }
    }
  }, []);

  // Save Cart state to localStorage on updates
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('nsw_shopping_cart', JSON.stringify(newCart));
  };

  const handleAddToCart = (newItem: CartItem) => {
    const existingIndex = cart.findIndex(
      (item) => item.product.id === newItem.product.id && item.selectedSize === newItem.selectedSize
    );

    let updated: CartItem[];
    if (existingIndex > -1) {
      updated = [...cart];
      updated[existingIndex].quantity += newItem.quantity;
    } else {
      updated = [...cart, newItem];
    }

    saveCart(updated);
    
    // Quick toast notification representation
    setBagNotification(`Added ${newItem.quantity}x ${newItem.product.name} (${newItem.selectedSize}) to bag`);
    setTimeout(() => {
      setBagNotification(null);
    }, 3000);
  };

  const handleUpdateQty = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId, size);
      return;
    }
    const updated = cart.map((item) => {
      if (item.product.id === productId && item.selectedSize === size) {
        return { ...item, quantity };
      }
      return item;
    });
    saveCart(updated);
  };

  const handleRemoveItem = (productId: string, size: string) => {
    const updated = cart.filter(
      (item) => !(item.product.id === productId && item.selectedSize === size)
    );
    saveCart(updated);
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  // Navigations routing helpers to scroll nicely across sections
  const navigateToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollStoreAndSelectCat = (cat: 'all' | 'performance' | 'athleisure' | 'essentials') => {
    setSelectedCategory(cat);
    navigateToSection('store');
  };

  // Cumulative item counts for header bag icon
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Asset generated outputs configured in data.ts
  const heroImage = '/src/assets/images/cairo_windbreaker_1781161346628.png';
  const nubianImage = '/src/assets/images/nubian_shorts_1781161363631.png';
  const luxorImage = '/src/assets/images/luxor_cap_1781161379562.png';

  return (
    <div className="bg-zinc-950 min-h-screen text-zinc-100 font-sans selection:bg-amber-500 selection:text-zinc-950 antialiased overflow-x-hidden">
      
      {/* Header Sticky Bar */}
      <Header 
        cartCount={totalCartCount} 
        onCartClick={() => setIsCartOpen(true)}
        onNavigateToSection={navigateToSection}
      />

      {/* Floating toast notification for added items */}
      <AnimatePresence>
        {bagNotification && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 border border-zinc-800 px-6 py-4 rounded-2xl flex items-center gap-3 shadow-2xl max-w-sm w-fit"
          >
            <div className="p-1 bg-amber-500 text-zinc-950 rounded-full shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="font-sans text-xs text-zinc-200 font-semibold">{bagNotification}</p>
              <button 
                onClick={() => { setIsCartOpen(true); setBagNotification(null); }}
                className="font-mono text-[9px] uppercase tracking-widest text-[#d97706] mt-0.5 hover:underline font-bold"
              >
                Open shopping bag
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <Hero 
        onExploreClick={() => navigateToSection('categories')} 
        featuredProductImage={heroImage}
      />

      {/* Categories Bento Grid Section */}
      <Categories 
        onSelectCategory={(cat) => scrollStoreAndSelectCat(cat)} 
        nubianImage={nubianImage}
        luxorImage={luxorImage}
      />

      {/* Online Store Product Filterable Grid Catalog */}
      <ProductGrid 
        products={products}
        onOpenDetails={(p) => setInspectedProduct(p)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Our Story / Material Integrity Section */}
      <OurStory 
        onLearnMoreClick={() => navigateToSection('store')}
      />

      {/* Verified Reviews Testimonials */}
      <ReviewsSection 
        onRefreshReviewCount={setReviewCount}
      />

      {/* Detailed Product Inspector Modal (Size selector & Specs) */}
      <ProductDetailsModal 
        product={inspectedProduct}
        onClose={() => setInspectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Secure Payment Gateway Checkout Side Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Aesthetic Footer Block */}
      <Footer 
        onNavigateToSection={navigateToSection}
        onSelectCategory={scrollStoreAndSelectCat}
      />

    </div>
  );
}
