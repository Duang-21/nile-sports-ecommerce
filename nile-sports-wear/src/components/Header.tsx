import { ShoppingBag, Search, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export default function Header({ cartCount, onCartClick, onNavigateToSection }: HeaderProps) {
  return (
    <motion.header 
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-900 px-4 md:px-8 py-4 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <button 
          onClick={() => onNavigateToSection('hero')} 
          className="flex items-center gap-2 group cursor-pointer text-left"
          id="nav-logo-btn"
        >
          <span className="font-sans text-2xl font-black tracking-tighter text-zinc-100 group-hover:text-blue-600 transition-colors uppercase">
            NILE.
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-10">
          <button 
            onClick={() => onNavigateToSection('categories')} 
            className="text-white/60 hover:text-white font-sans text-xs uppercase tracking-[0.2em] font-bold transition-colors cursor-pointer"
            id="nav-cat-btn"
          >
            Categories
          </button>
          <button 
            onClick={() => onNavigateToSection('store')} 
            className="text-white/60 hover:text-white font-sans text-xs uppercase tracking-[0.2em] font-bold transition-colors cursor-pointer"
            id="nav-store-btn"
          >
            Store
          </button>
          <button 
            onClick={() => onNavigateToSection('our-story')} 
            className="text-white/60 hover:text-white font-sans text-xs uppercase tracking-[0.2em] font-bold transition-colors cursor-pointer"
            id="nav-story-btn"
          >
            Our Ethos
          </button>
          <button 
            onClick={() => onNavigateToSection('reviews')} 
            className="text-white/60 hover:text-white font-sans text-xs uppercase tracking-[0.2em] font-bold transition-colors cursor-pointer"
            id="nav-reviews-btn"
          >
            Reviews
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          <div className="relative group hidden sm:block">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-hover:text-zinc-400 transition-colors">
              <Search className="w-3.5 h-3.5" />
            </span>
            <input 
              type="text" 
              placeholder="Search aesthetics..." 
              className="bg-[#0A0A0A] border border-white/10 rounded-none py-1.5 pl-9 pr-4 text-xs font-sans text-zinc-350 placeholder-zinc-650 focus:outline-none focus:border-white/30 focus:ring-0 w-48 transition-all duration-300"
              readOnly 
              onClick={() => onNavigateToSection('store')}
            />
          </div>

          <button 
            onClick={onCartClick} 
            className="relative font-sans text-xs font-bold uppercase tracking-widest border border-white/20 hover:border-white hover:bg-white hover:text-zinc-950 px-4 py-2 transition-all cursor-pointer flex items-center justify-center gap-2 text-zinc-100"
            id="btn-header-cart"
            aria-label="View shopping bag"
          >
            <span>Cart</span>
            <span className="font-mono text-xs font-bold">({cartCount})</span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
