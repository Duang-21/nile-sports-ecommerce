import { motion } from 'motion/react';
import { Star, ArrowUpRight } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
  key?: string | number;
}

export default function ProductCard({ product, onOpenDetails }: ProductCardProps) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="bg-[#0A0A0A] border border-white/10 rounded-none overflow-hidden group hover:border-white transition-all flex flex-col justify-between"
      id={`product-card-${product.id}`}
    >
      <div className="relative aspect-[4/3] bg-[#0A0A0A] overflow-hidden cursor-pointer" onClick={() => onOpenDetails(product)}>
        
        {/* Hover image zoom */}
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 grayscale hover:grayscale-0"
          referrerPolicy="no-referrer"
        />

        {/* Categories tag overlay */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 pointer-events-none">
          {product.isNew && (
            <span className="bg-blue-600 text-white font-mono text-[8.5px] font-black uppercase px-2.5 py-1 rounded-none tracking-widest">
              NEW
            </span>
          )}
          {product.isPopular && (
            <span className="bg-white text-zinc-950 font-mono text-[8.5px] font-black uppercase px-2.5 py-1 rounded-none tracking-widest">
              POPULAR
            </span>
          )}
        </div>

        {/* Stark rating overlay */}
        <div className="absolute bottom-4 right-4 bg-[#0A0A0A]/90 px-3 py-1 rounded-none border border-white/15 flex items-center gap-1">
          <Star className="w-3 h-3 fill-blue-500 text-blue-500" />
          <span className="font-mono text-[10px] text-zinc-200 font-bold">{product.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Information Feed */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-blue-500 font-black">
              // {product.category}
            </span>
            <span className="font-mono text-sm text-white font-bold">${product.price}</span>
          </div>

          <h3 
            onClick={() => onOpenDetails(product)}
            className="font-sans text-lg text-zinc-100 font-black uppercase tracking-tight hover:text-blue-550 transition-colors cursor-pointer"
          >
            {product.name}
          </h3>

          <p className="font-sans text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed font-light">
            {product.description}
          </p>
        </div>

        {/* Action button */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#FFF]/40">
            {product.sizes.length} sizes available
          </span>
          <button 
            onClick={() => onOpenDetails(product)}
            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-zinc-100 font-black group-hover:text-blue-500 cursor-pointer transition-colors"
            id={`btn-view-${product.id}`}
          >
            Configure <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
