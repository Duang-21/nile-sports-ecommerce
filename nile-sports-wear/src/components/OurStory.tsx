import { motion } from 'motion/react';
import { Compass, Leaf, ArrowRight, CornerDownRight } from 'lucide-react';

interface OurStoryProps {
  onLearnMoreClick: () => void;
}

export default function OurStory({ onLearnMoreClick }: OurStoryProps) {
  return (
    <section 
      id="our-story"
      className="bg-[#0A0A0A] py-24 px-6 md:px-12 border-b border-white/10 overflow-hidden text-left"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Brand Heritage Text Content */}
        <div className="lg:col-span-6">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-blue-500 font-bold block mb-3">
            05 // THE SUSTAINABLE ORIGIN
          </span>
          <h2 className="font-sans text-4xl sm:text-5xl text-zinc-100 font-black uppercase tracking-tighter mb-8 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Honoring the River, Engineering the Future
          </h2>

          <div className="space-y-6 text-zinc-300 font-sans text-xs md:text-sm leading-relaxed mb-10 font-light">
            <div className="flex gap-4 items-start">
              <CornerDownRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <p>
                Nile Sports Wear arose from a simple observation: modern athletic clothing is overpopulated with non-recyclable materials. We returned to the origin of advanced weaving—the fertile Nile valley—to combine historical textile wisdom with cutting-edge engineering.
              </p>
            </div>
            
            <p className="pl-9 text-zinc-400 font-light leading-relaxed">
              By working in small pre-order batches, we produce exactly what is demanded, totally avoiding warehouse wastes. The result is lightweight running clothing that shields you from strong winds and intense desert sun, while remaining circular from sketch to finish.
            </p>
          </div>

          {/* Subsections Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pl-9 mb-12">
            <div className="space-y-2">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white font-black flex items-center gap-2">
                <Leaf className="w-4 h-4 text-blue-500" /> Eco-Sourced Woven
              </span>
              <p className="font-sans text-xs text-zinc-400 font-light">
                Pima cotton threads and recycled polyester filaments woven using circular water systems.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white font-black flex items-center gap-2">
                <Compass className="w-4 h-4 text-blue-500" /> Wind & Desert UV Shield
              </span>
              <p className="font-sans text-xs text-zinc-400 font-light">
                Certified UPF 50+ fabrics designed specifically to withstand heat fluctuations.
              </p>
            </div>
          </div>

          <div className="pl-9">
            <button 
              onClick={onLearnMoreClick}
              className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] text-white hover:text-blue-500 font-black transition-all group cursor-pointer"
              id="our-story-action-btn"
            >
              <span>Explore dynamic fibers</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>

        </div>

        {/* Right Side: Editorial Split Image Card */}
        <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
          
          <div className="relative w-full max-w-lg aspect-square sm:aspect-[4/3] lg:aspect-square bg-zinc-900 border border-white/10 rounded-none overflow-hidden group">
            
            {/* Elegant quiet-luxury athletic scenery overlay */}
            <img 
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop" 
              alt="Sustainable sports wear active gear scenery" 
              className="w-full h-full object-cover opacity-45 group-hover:scale-102 transition-transform duration-1000 grayscale hover:grayscale-0"
              referrerPolicy="no-referrer"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>

            {/* Float Badge */}
            <div className="absolute bottom-8 left-8 right-8 bg-[#0A0A0A]/95 p-6 rounded-none border border-white/10 text-left">
              <div className="font-mono text-[10px] text-blue-500 font-black uppercase tracking-widest mb-1">
                MEMBERS CORNER
              </div>
              <h4 className="font-sans text-sm font-bold uppercase text-zinc-100">
                "Textiles are the skin of athletic movement."
              </h4>
              <p className="font-sans text-xs text-zinc-500 mt-2 font-mono">
                — Niles R&D Design Board, 2026
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
