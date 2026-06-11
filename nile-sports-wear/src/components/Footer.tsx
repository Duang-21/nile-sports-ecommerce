import { Compass, ShieldCheck, Mail, MapPin, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigateToSection: (sectionId: string) => void;
  onSelectCategory: (cat: 'all' | 'performance' | 'athleisure' | 'essentials') => void;
}

export default function Footer({ onNavigateToSection, onSelectCategory }: FooterProps) {
  
  const handleCategoryNav = (cat: 'performance' | 'athleisure' | 'essentials') => {
    onSelectCategory(cat);
    onNavigateToSection('store');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/10 pt-20 pb-8 px-6 md:px-12 text-left text-zinc-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
        
        {/* Column 1: Brand details */}
        <div className="lg:col-span-4 space-y-6">
          <button 
            onClick={scrollToTop} 
            className="flex items-center gap-2 text-left cursor-pointer group"
          >
            <span className="font-mono tracking-widest text-lg font-extrabold text-zinc-200 group-hover:text-blue-500 transition-colors uppercase">
              NILE
            </span>
            <span className="h-4 w-[1px] bg-zinc-800"></span>
            <span className="font-sans text-xs tracking-[0.3em] font-black text-zinc-400 group-hover:text-zinc-200 transition-colors uppercase">
              SPORTS WEAR
            </span>
          </button>
          
          <p className="font-sans text-xs text-zinc-400 leading-relaxed max-w-sm font-light">
            A premium activewear brand dedicated to architectural athletic silhouettes, low-carbon circular yarns, and high-performance garments inspired by the Nile.
          </p>

          <div className="space-y-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
            <p className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-blue-500" /> Luxor Rd, Sector 4, Nile Valley, EG
            </p>
            <p className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-blue-500" /> atelier@nilesportswear.com
            </p>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="lg:col-span-2.5 space-y-4">
          <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-300 font-black">
            Cathedrals
          </h4>
          <ul className="space-y-2.5 font-sans text-xs">
            <li>
              <button 
                onClick={() => onNavigateToSection('hero')} 
                className="hover:text-blue-500 transition-colors cursor-pointer font-bold uppercase tracking-wider text-[11px]"
              >
                Top / Intros
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigateToSection('categories')} 
                className="hover:text-blue-500 transition-colors cursor-pointer font-bold uppercase tracking-wider text-[11px]"
              >
                Taxonomies
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigateToSection('store')} 
                className="hover:text-blue-500 transition-colors cursor-pointer font-bold uppercase tracking-wider text-[11px]"
              >
                Active Catalog
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigateToSection('our-story')} 
                className="hover:text-blue-500 transition-colors cursor-pointer font-bold uppercase tracking-wider text-[11px]"
              >
                Brand Story
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigateToSection('reviews')} 
                className="hover:text-blue-500 transition-colors cursor-pointer font-bold uppercase tracking-wider text-[11px]"
              >
                Verified Testimonials
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Collections */}
        <div className="lg:col-span-2.5 space-y-4">
          <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-300 font-black">
            Taxonomy Catalog
          </h4>
          <ul className="space-y-2.5 font-sans text-xs">
            <li>
              <button 
                onClick={() => handleCategoryNav('performance')} 
                className="hover:text-blue-500 transition-colors cursor-pointer font-bold uppercase tracking-wider text-[11px]"
              >
                High Performance [01]
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleCategoryNav('athleisure')} 
                className="hover:text-blue-500 transition-colors cursor-pointer font-bold uppercase tracking-wider text-[11px]"
              >
                Athleisure Joggers [02]
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleCategoryNav('essentials')} 
                className="hover:text-blue-500 transition-colors cursor-pointer font-bold uppercase tracking-wider text-[11px]"
              >
                Premium Essentials [03]
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Trust Certificates */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-300 font-black">
            Authorized Environment
          </h4>
          <div className="p-5 bg-zinc-950 border border-white/10 rounded-none space-y-3">
            <span className="font-mono text-[9px] uppercase tracking-widest text-blue-500 font-black flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-500" /> SECURE SECTOR
            </span>
            <p className="font-sans text-[11px] text-zinc-400 leading-relaxed font-light">
              Payments are routed via tokenized merchant environments. Features certified PCI-DSS Standard Compliance certificates.
            </p>
          </div>
        </div>

      </div>

      {/* Under footer lines */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-widest font-bold">
        <p>&copy; 2026 NILE SPORTS WEAR. ALL MERCHANTS AUTHORIZED. COFFEE TEMPLATE INSPIRED CODES.</p>
        
        <button 
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 text-zinc-450 hover:text-white transition-colors cursor-pointer"
          id="btn-scroll-to-top"
          aria-label="Scroll to top of the screen"
        >
          <span>Scroll up</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>

    </footer>
  );
}
