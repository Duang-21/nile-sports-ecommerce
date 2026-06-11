import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingBag, Star, Layers } from 'lucide-react';
import { Product, CartItem } from '../types';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

export default function ProductDetailsModal({ product, onClose, onAddToCart }: ProductDetailsModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);

  if (!product) return null;

  // Set default size if size options exist and no size is pre-selected
  const sizeList = product.sizes;
  const isOneSize = sizeList.length === 1 && sizeList[0] === 'One Size';

  const decreaseQty = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const increaseQty = () => {
    setQuantity(prev => prev + 1);
  };

  const handleAdd = () => {
    const sizeToUse = isOneSize ? 'One Size' : selectedSize;
    if (!sizeToUse) {
      alert('Please select a size to continue.');
      return;
    }

    onAddToCart({
      product,
      quantity,
      selectedSize: sizeToUse
    });

    setSuccessMessage(true);
    setTimeout(() => {
      setSuccessMessage(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
        
        {/* Dark Glass Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md cursor-zoom-out"
        />

        {/* Modal Sheet Container */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative bg-zinc-900 border border-white/10 rounded-none w-full max-w-4xl max-h-[90vh] md:max-h-[85vh] overflow-y-auto shadow-2xl z-10 flex flex-col md:flex-row"
          id="product-detail-modal-sheet"
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-20 p-2 rounded-none bg-zinc-950 hover:bg-zinc-900 border border-white/10 text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer"
            id="detail-modal-close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Left Column: Image with Visual Tags */}
          <div className="w-full md:w-1/2 aspect-[4/3] md:aspect-auto md:min-h-[500px] bg-zinc-950 relative overflow-hidden shrink-0">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/45 via-transparent to-transparent pointer-events-none"></div>
            
            {/* Soft decorative categories corner */}
            <div className="absolute bottom-6 left-6 bg-zinc-950 border border-white/10 px-3.5 py-2 rounded-none flex items-center gap-2">
              <span className="font-mono text-[9px] uppercase tracking-widest text-blue-500 font-black">
                // {product.category}
              </span>
            </div>
          </div>

          {/* Right Column: Deep Attributes & Configure Forms */}
          <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between overflow-y-auto bg-[#0A0A0A]">
            
            {/* Basic Info */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1 bg-blue-500/10 text-blue-500 text-xs px-2.5 py-0.5 rounded-none border border-blue-500/20">
                  <Star className="w-3.5 h-3.5 fill-blue-500 text-blue-500" />
                  <span className="font-mono text-[11px] font-black">{product.rating}</span>
                </div>
                <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest font-bold">// VERIFIED SILHOUETTE</span>
              </div>

              <h2 className="font-sans text-3xl text-zinc-100 tracking-tighter font-black uppercase mb-3">
                {product.name}
              </h2>
              
              <div className="font-mono text-lg font-black text-white mb-6">
                ${product.price}
              </div>

              <p className="font-sans text-xs md:text-sm text-zinc-300 leading-relaxed mb-6 font-light">
                {product.details}
              </p>

              {/* Technical Specifications */}
              <div className="bg-zinc-950 border border-white/10 p-5 rounded-none mb-8">
                <h4 className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 mb-3 flex items-center gap-2 font-black">
                  <Layers className="w-3.5 h-3.5 text-blue-550" /> Technical Specifications
                </h4>
                <ul className="space-y-1.5">
                  {product.specs.map((spec, i) => (
                    <li key={i} className="font-sans text-xs text-zinc-300 flex items-start gap-2 font-light">
                      <span className="h-1.5 w-1.5 rounded-none bg-blue-500 mt-1.5 shrink-0"></span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Size Chooser Selection */}
              {!isOneSize && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 font-extrabold">
                      SELECT SIZE
                    </span>
                    <span className="text-zinc-500 italic text-[11px]">True to athletic fit</span>
                  </div>
                  
                  <div className="grid grid-cols-5 gap-2">
                    {sizeList.map((size) => {
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`py-3 font-mono text-xs font-black rounded-none border transition-all cursor-pointer ${
                            isSelected 
                              ? 'bg-white text-zinc-950 border-white' 
                              : 'bg-zinc-950 text-zinc-400 border-white/10 hover:border-white/50 hover:text-white'
                          }`}
                          id={`size-btn-${size}`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantities Counter */}
              <div className="mb-8">
                <span className="block font-mono text-[10px] uppercase tracking-widest text-zinc-400 font-extrabold mb-3">
                  QUANTITY
                </span>
                <div className="inline-flex items-center bg-zinc-950 border border-white/10 rounded-none py-1 px-1">
                  <button 
                    onClick={decreaseQty}
                    className="p-3 text-zinc-400 hover:text-zinc-100 transition-colors disabled:opacity-30 cursor-pointer"
                    disabled={quantity <= 1}
                    id="btn-qty-dec"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-12 text-center font-mono text-sm font-bold text-zinc-200">
                    {quantity}
                  </span>
                  <button 
                    onClick={increaseQty}
                    className="p-3 text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer"
                    id="btn-qty-inc"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* Bottom Actions Frame */}
            <div>
              <button
                onClick={handleAdd}
                disabled={successMessage || (!isOneSize && !selectedSize)}
                className={`w-full py-4.5 rounded-none font-sans font-black text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-3 transition-all cursor-pointer ${
                  successMessage 
                    ? 'bg-blue-650 text-white border border-blue-650' 
                    : (!isOneSize && !selectedSize)
                      ? 'bg-zinc-900 text-zinc-650 border border-white/5 cursor-not-allowed'
                      : 'bg-white text-zinc-950 border border-white hover:bg-[#0A0A0A] hover:text-white hover:border-white'
                }`}
                id="btn-add-to-bag"
              >
                {successMessage ? (
                  <>
                    <span>Added to bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>
              
              {!successMessage && !isOneSize && !selectedSize && (
                <p className="text-center font-mono text-[9px] text-blue-500/80 uppercase tracking-widest mt-2 font-bold">
                  * Select a size to configure bag additions
                </p>
              )}
            </div>

          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
}
