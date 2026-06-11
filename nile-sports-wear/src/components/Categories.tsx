import { motion } from 'motion/react';
import { ShieldAlert, Compass, Sparkles, MoveRight } from 'lucide-react';

interface CategoriesProps {
  onSelectCategory: (category: 'performance' | 'athleisure' | 'essentials' | 'all') => void;
  nubianImage: string;
  luxorImage: string;
}

export default function Categories({ onSelectCategory, nubianImage, luxorImage }: CategoriesProps) {
  
  const handleCategoryClick = (cat: 'performance' | 'athleisure' | 'essentials') => {
    onSelectCategory(cat);
    const storeSec = document.getElementById('store');
    if (storeSec) {
      storeSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      id="categories"
      className="bg-[#0A0A0A] py-24 px-6 md:px-12 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-blue-500 font-bold block mb-3">
              02 // STRUCTURAL INDEX
            </span>
            <h2 className="font-sans text-4xl sm:text-5xl text-zinc-100 font-black uppercase tracking-tighter">
              Curated Athletic Taxonomies
            </h2>
          </div>
          <p className="max-w-md text-white/50 font-sans text-xs md:text-sm leading-relaxed font-light">
            Every garment falls into one of three design disciplines under the Nile framework. Select a category to filter the live collection immediately.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-white/10 bg-white/5">
          
          {/* Card 1: Performance */}
          <div 
            onClick={() => handleCategoryClick('performance')}
            className="p-12 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between min-h-[380px] bg-[#0A0A0A] text-white hover:bg-white hover:text-black transition-all duration-300 cursor-pointer group"
          >
            <div className="text-sm font-mono tracking-widest font-black text-blue-600 group-hover:text-black">01</div>
            <div className="mt-20">
              <h2 className="text-4xl font-black uppercase tracking-tighter">Performance</h2>
              <p className="text-xs uppercase mt-2 tracking-widest opacity-60 font-bold">Apex training garments</p>
              <p className="text-xs mt-4 font-light leading-snug group-hover:text-black/80 text-white/60">
                Lightweight protection, extreme ventilation, and tailored compression for high output.
              </p>
            </div>
            <div className="mt-8 text-xs font-bold uppercase tracking-widest text-blue-600 group-hover:text-black">
              EXPLORE CATEGORY →
            </div>
          </div>

          {/* Card 2: Athleisure */}
          <div 
            onClick={() => handleCategoryClick('athleisure')}
            className="p-12 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between min-h-[380px] bg-[#0A0A0A] text-white hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer group"
          >
            <div className="text-sm font-mono tracking-widest font-black text-zinc-500 group-hover:text-white">02</div>
            <div className="mt-20">
              <h2 className="text-4xl font-black uppercase tracking-tighter">Athleisure</h2>
              <p className="text-xs uppercase mt-2 tracking-widest opacity-60 font-bold font-mono">Comfort & Recovery</p>
              <p className="text-xs mt-4 font-light leading-snug text-white/60 group-hover:text-white/90">
                Organic cotton blends, heavy double-fleece models, and soft recovery garments.
              </p>
            </div>
            <div className="mt-8 text-xs font-bold uppercase tracking-widest text-[#FFF] group-hover:text-white">
              EXPLORE CATEGORY →
            </div>
          </div>

          {/* Card 3: Essentials */}
          <div 
            onClick={() => handleCategoryClick('essentials')}
            className="p-12 flex flex-col justify-between min-h-[380px] bg-[#0A0A0A] text-white hover:bg-zinc-850 hover:text-white transition-all duration-300 cursor-pointer group"
          >
            <div className="text-sm font-mono tracking-widest font-black text-zinc-500 group-hover:text-white">03</div>
            <div className="mt-20">
              <h2 className="text-4xl font-black uppercase tracking-tighter">Essentials</h2>
              <p className="text-xs uppercase mt-2 tracking-widest opacity-60 font-bold">Everyday Grind accessories</p>
              <p className="text-xs mt-4 font-light leading-snug text-white/60 group-hover:text-white/90">
                Ergonomic caps, running gear, and quick-stash modular utility overlays.
              </p>
            </div>
            <div className="mt-8 text-xs font-bold uppercase tracking-widest text-[#FFF]">
              EXPLORE CATEGORY →
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
