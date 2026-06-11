import { motion } from 'motion/react';
import { ArrowDown, Flame, CornerDownRight, Award, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  featuredProductImage: string;
}

export default function Hero({ onExploreClick, featuredProductImage }: HeroProps) {
  return (
    <section 
      id="hero"
      className="relative min-h-screen bg-[#0A0A0A] pt-32 pb-20 px-6 md:px-12 flex flex-col justify-center overflow-hidden border-b border-white/10"
    >
      {/* Crisp minimal grid background structure instead of soft gradients */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        
        {/* Left Side: Brand Identity & Large Typography */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          
          {/* Tagline Badge */}
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 border border-white/20 px-4 py-1.5 w-fit mb-8"
          >
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-450 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/70 font-black">
              DESIGN SYSTEM SYSTEMATIC ALPHA / DESERT ATHLETES
            </span>
          </motion.div>

          {/* Premium Stark Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[75px] sm:text-[110px] xl:text-[145px] leading-[0.8] font-black italic tracking-tighter uppercase text-white mb-8"
          >
            Nile<br />Sport
          </motion.h1>

          {/* Secondary Subheading */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-md text-white/70 font-sans text-base sm:text-lg leading-snug mb-10"
          >
            <p className="italic font-light">
              Engineered for the high-performance athlete. Minimal aesthetics, maximum output. Perfect fitment for endurance and high output.
            </p>
          </motion.div>

          {/* Action Buttons with Squares */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mb-12"
          >
            <button 
              onClick={onExploreClick}
              className="group relative inline-flex items-center justify-center bg-blue-600 hover:bg-white text-white hover:text-black font-sans font-black text-xs uppercase tracking-[0.25em] px-10 py-5 rounded-none transition-all duration-300 cursor-pointer shadow-2xl"
              id="hero-explore-btn"
            >
              <span>Explore Collection</span>
            </button>

            <button 
              onClick={() => {
                const catalog = document.getElementById('store');
                if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center border border-white/20 hover:border-white text-white font-sans font-black text-xs uppercase tracking-[0.25em] px-10 py-5 rounded-none transition-all duration-300 cursor-pointer"
            >
              Learn more
            </button>
          </motion.div>

          {/* Stark Blue-Accented Featured Review block */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="border-l-4 border-blue-600 pl-6 max-w-lg mt-4"
          >
            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1 font-mono font-bold">Featured Review</p>
            <p className="text-lg italic font-medium leading-tight text-white/90">"The Apex Series is exactly what my marathon prep was missing. Pure focus."</p>
            <p className="mt-1 text-xs font-bold text-white/60">— Marcus Thorne, Ironman Athlete</p>
          </motion.div>

        </div>

        {/* Right Side: Editorial Featured Hero Image with stark square lines */}
        <div className="lg:col-span-5 relative flex justify-center">
          
          <div className="absolute inset-0 m-auto w-72 h-72 sm:w-[450px] sm:h-[450px] rounded-none border border-white/5 animate-spin-slow pointer-events-none"></div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:w-full max-w-[420px] aspect-[3/4] bg-zinc-900 rounded-none overflow-hidden border border-white/10 shadow-2xl group cursor-crosshair"
          >
            {/* Real asset generated earlier */}
            <img 
              src={featuredProductImage} 
              alt="Cairo Studio Windbreaker on athlete" 
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-1000 grayscale hover:grayscale-0"
              referrerPolicy="no-referrer"
            />
            
            {/* Visual stark Tag Card floating on top */}
            <div className="absolute bottom-6 left-6 right-6 bg-[#0A0A0A]/95 border border-white/15 p-5 rounded-none flex items-center justify-between">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-blue-500 font-black mb-1">
                  FEATURED ACTIVE
                </p>
                <h4 className="font-sans text-sm font-black uppercase text-white tracking-tight">
                  Cairo Windbreaker
                </h4>
                <p className="font-sans text-[11px] text-zinc-400 mt-0.5">
                  Pre-shuffled sand colorway jacket
                </p>
              </div>
              <div className="text-right">
                <span className="block font-mono text-xs text-zinc-500 line-through">
                  $185
                </span>
                <span className="block font-mono text-sm font-bold text-blue-500">
                  $145
                </span>
              </div>
            </div>
          </motion.div>

          {/* Absolute floating indicators */}
          <div className="absolute -top-4 -right-2 bg-blue-600 text-white font-mono text-[9px] tracking-[0.2em] font-black uppercase px-4 py-2 rounded-none rotate-3 shadow-md select-none">
            WATERPROOF IN-SITU
          </div>
          <div className="absolute bottom-4 -left-6 bg-zinc-950 text-zinc-400 border border-white/10 font-mono text-[9px] tracking-[0.15em] uppercase px-4 py-2 rounded-none -rotate-3 shadow-md select-none hidden sm:block">
            01 // OUTDOOR COLLECTION
          </div>

        </div>

      </div>
    </section>
  );
}
