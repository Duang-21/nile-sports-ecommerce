import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, SlidersHorizontal, Grid3X3, RefreshCw } from 'lucide-react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onOpenDetails: (product: Product) => void;
  selectedCategory: 'all' | 'performance' | 'athleisure' | 'essentials';
  onSelectCategory: (cat: 'all' | 'performance' | 'athleisure' | 'essentials') => void;
}

export default function ProductGrid({ 
  products, 
  onOpenDetails, 
  selectedCategory, 
  onSelectCategory 
}: ProductGridProps) {
  
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <section 
      id="store" 
      className="bg-[#0A0A0A] py-24 px-6 md:px-12 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-blue-500 font-bold block mb-3">
              03 // ATTAINABLE OBJECTS
            </span>
            <h2 className="font-sans text-4xl sm:text-5xl text-zinc-100 font-black uppercase tracking-tighter">
              Active Catalog
            </h2>
          </div>
          <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs font-bold uppercase tracking-widest">
            <Grid3X3 className="w-4 h-4 text-blue-600" />
            <span>SHOWING {filteredProducts.length} OF {products.length} OBJECTS</span>
          </div>
        </div>

        {/* Filters and Search Bar Container */}
        <div className="bg-[#0A0A0A] border border-white/10 p-5 rounded-none flex flex-col lg:flex-row items-center justify-between gap-6 mb-12">
          
          {/* Categories Horizontal Selector */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {(['all', 'performance', 'athleisure', 'essentials'] as const).map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-6 py-3.5 rounded-none font-mono text-[10px] uppercase tracking-[0.2em] font-black transition-all cursor-pointer border ${
                    active 
                      ? 'bg-white text-zinc-950 border-white' 
                      : 'bg-[#0A0A0A] text-white/60 border-white/10 hover:text-white hover:border-white/40'
                  }`}
                  id={`filter-btn-${cat}`}
                >
                  {cat === 'all' ? 'All Pieces' : cat}
                </button>
              );
            })}
          </div>

          {/* Dynamic Search */}
          <div className="relative w-full lg:w-80 shrink-0">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500">
              <SlidersHorizontal className="w-4 h-4 cursor-pointer text-blue-500" />
            </span>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search garments..." 
              className="bg-[#0A0A0A] border border-white/10 rounded-none py-3.5 pl-11 pr-8 text-xs font-sans text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 focus:ring-0 w-full transition-all tracking-wider font-medium"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white font-mono text-[9px] uppercase tracking-widest cursor-pointer font-black"
              >
                Clear
              </button>
            )}
          </div>

        </div>

        {/* Grid List Products Container */}
        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              id="products-catalog-grid"
            >
              {filteredProducts.map((p) => (
                <ProductCard 
                  key={p.id} 
                  product={p} 
                  onOpenDetails={onOpenDetails} 
                />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border border-white/10 rounded-none p-16 text-center max-w-lg mx-auto flex flex-col items-center gap-4 bg-[#0A0A0A]"
              id="empty-grid-placeholder"
            >
              <div className="p-4 bg-zinc-950 rounded-none border border-white/10 text-zinc-500">
                <RefreshCw className="w-6 h-6 animate-spin-slow text-blue-600" />
              </div>
              <h3 className="font-sans text-xl text-zinc-200 font-black uppercase tracking-tight">No apparel aligns</h3>
              <p className="font-sans text-xs text-zinc-400 font-light">
                There are currently no items under "{selectedCategory}" matching your search keywords. Try clearing the filter options.
              </p>
              <button 
                onClick={() => { onSelectCategory('all'); setSearchQuery(''); }}
                className="font-mono text-[10px] text-blue-500 hover:text-white uppercase tracking-widest font-black cursor-pointer border border-white/10 px-6 py-3 mt-2 hover:bg-blue-600 hover:border-blue-600 transition-colors"
              >
                Reset Store State
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
