import { Product, Review } from './types';

// Let's use our generated images and curated high-end sportswear assets
export const products: Product[] = [
  {
    id: 'cairo-windbreaker',
    name: 'Cairo Studio Windbreaker',
    description: 'Ultra-lightweight packing shield designed for early morning desert runs. Windproof, water-resistant, and styled in a premium sand-cream colorway.',
    price: 145,
    category: 'performance',
    image: '/src/assets/images/cairo_windbreaker_1781161346628.png',
    rating: 4.9,
    details: 'The Cairo Windbreaker is engineered for shifting temperatures. Merging high-fashion architectural tailoring with high-performance ventilation, it features custom laser-entrained back cooling vents, an adjustable hood with hidden metallic hardware, and a moisture-repellent finish.',
    isNew: true,
    isPopular: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    specs: [
      'Fabric: 100% Recycled Ripstop Nylon',
      'Weight: 140g (Size M)',
      'Finishing: Durable Water Repellent (DWR) coating',
      'Care: Machine wash cold, hang dry'
    ]
  },
  {
    id: 'nubian-shorts',
    name: 'Nubian Aero Shorts',
    description: 'Double-layered technical run shorts featuring a integrated compression liner, custom key-pocketing, and deep matte-olive palette.',
    price: 68,
    category: 'performance',
    image: '/src/assets/images/nubian_shorts_1781161363631.png',
    rating: 4.8,
    details: 'Form meets elite performance. Formulated with a four-way hyperstretch woven outer shell and an ultra-soft breathable compression lining. Zero outer branding for an elegant, distraction-free aesthetic.',
    isPopular: true,
    sizes: ['S', 'M', 'L', 'XL'],
    specs: [
      'Inner lining: 82% Nylon, 18% Elastane',
      'Outer shell: 88% Polyester, 12% Spandex',
      'Inseam: 5 inches',
      'Storage: Hidden side phone pocket on compression liner'
    ]
  },
  {
    id: 'luxor-cap',
    name: 'Luxor Performance Cap',
    description: 'Waterproof, breathable trail cap with a structured curved brim and custom architectural aluminum closure.',
    price: 38,
    category: 'essentials',
    image: '/src/assets/images/luxor_cap_1781161379562.png',
    rating: 4.7,
    details: 'Constructed from lightweight, thermal-efficient waterproof fabrics. The Luxor Cap features laser-cut side aeration patterns, an inner moisture-absorbing sweatband, and a flexible structure that collapses effortlessly into a pocket or pack.',
    isNew: true,
    sizes: ['One Size'],
    specs: [
      'Material: 100% Quick-dry Polyester mesh',
      'Adjuster: Premium structural tension strap with metal buckle',
      'UV Protection: UPF 50+',
      'Weight: 52g'
    ]
  },
  {
    id: 'aswan-crop',
    name: 'Aswan Seamless Crop',
    description: 'High-compression, seamless knit sports bra tailored in slate gray with premium ribbed under-bust protection.',
    price: 52,
    category: 'athleisure',
    image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    details: 'Tailored using high-density double-knit circular machinery, this crop-bra ensures absolute, gravity-defying comfort and high support. Ribbed textured trim delivers structural support without wires or heavy hardware.',
    sizes: ['XS', 'S', 'M', 'L'],
    specs: [
      'Fabric: 78% Recycled Polyamide, 22% Lycra',
      'Support level: Medium to High support',
      'Cup structure: Removable memory-foam pads',
      'Anti-odor: Natural silver ion weave'
    ]
  },
  {
    id: 'sahara-joggers',
    name: 'Sahara Fleece Track Pants',
    description: 'Minimalist high-waisted joggers with comfortable tapered lines, crafted in ultra-comfy desert sand fleece.',
    price: 95,
    category: 'athleisure',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop',
    rating: 4.8,
    details: 'Combining heavy-knit structure with a luxurious, brushed internal softness. Sahara track joggers are designed for travel days, warmup routines, or stylish off-duty comfort. Features elegant zipped side-pockets.',
    isNew: true,
    sizes: ['S', 'M', 'L', 'XL'],
    specs: [
      'Fabric: 85% Organic Cotton, 15% Recycled Polyester',
      'Pockets: Secure hidden pocket for cards',
      'Waistband: Internal flat-braid drawcord',
      'Taper: Ankle ribbed cuffs'
    ]
  },
  {
    id: 'giza-tee',
    name: 'Giza Breathable Tee',
    description: 'Premium lightweight performance shirt engineered from ultra-fine eco-weave cotton fibers for dynamic ventilation.',
    price: 45,
    category: 'athleisure',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop',
    rating: 4.6,
    details: 'An ultra-light, feather-weight tee. Designed with a modern, relaxed fit that drapes perfectly. Enhanced sweat-channeling capillary lines move moisture outward instantly to keep you cool.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    specs: [
      'Fabric: 60% Pima Cotton, 40% Eucalyptus Lyocell',
      'Hem: Curved athletic dropped tail',
      'Protection: Anti-microbial, odor-repelling fabric layer'
    ]
  },
  {
    id: 'sinai-runners',
    name: 'Sinai Trail Elevators',
    description: 'High-traction outdoor runners featuring a heavy-traction geometric rubber outsole and secure speed-lace system.',
    price: 165,
    category: 'performance',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop',
    rating: 5.0,
    details: 'Built to ascend. Engineered with high-density foam cushioning responsive to rugged terrain, protective wrap-around mudguards, and specialized rubber outsole designed for maximum sand and gravel traction.',
    isPopular: true,
    sizes: ['8', '9', '10', '11', '12'],
    specs: [
      'Outsole: Vibram MegaGrip responsive rubber',
      'Drop: 6mm heel-to-toe',
      'Lacing: Speed-draw lock laces',
      'Arch: Dynamic mid-foot shank'
    ]
  },
  {
    id: 'siwa-utility',
    name: 'Siwa Air Sling & Bottle',
    description: 'Sleek, waterproof modular shoulder sling containing an insulated 1L matte-finish hydration flask.',
    price: 55,
    category: 'essentials',
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=600&auto=format&fit=crop',
    rating: 4.5,
    details: 'Keep hydrated without carrying bulk. The water-repelled technical nylon container wraps closely around a premium double-vacuum insulated flask that preserves icy status for 24 hours. Includes dynamic zip compartment for keys and credit cards.',
    sizes: ['One Size'],
    specs: [
      'Flask capacity: 32oz / 1000ml',
      'Sling fabric: 420D Ballistic Cordura nylon',
      'Sling adjustments: Quick-release buckle',
      'Flask detail: Premium powder-coated matte 18/8 edible stainless steel'
    ]
  }
];

export const initialReviews: Review[] = [
  {
    id: 'rev-1',
    author: 'Amara Vance',
    rating: 5,
    text: 'Nile Sports Wear is literally elite. The Cairo Windbreaker matches the exact quiet-luxury aesthetic I was looking for. No neon logos, just high-quality tailoring. The wind block is superb.',
    date: 'June 03, 2026',
    verified: true,
    avatar: 'AV',
    location: 'London, UK'
  },
  {
    id: 'rev-2',
    author: 'Youssef Mansour',
    rating: 5,
    text: 'Aero shorts are incredibly light and comfy. I wore them during my 15k sand-dune run and had absolutely zero chafing. Integrated compression sleeve holds my iPhone 15 pro max perfectly.',
    date: 'May 28, 2026',
    verified: true,
    avatar: 'YM',
    location: 'Cairo, Egypt'
  },
  {
    id: 'rev-3',
    author: 'Kaelen Miller',
    rating: 4,
    text: 'Excellent customer service. The Sinai Trail shoe runs slightly narrow, but I returned for a size up and the process took seconds. Fast shipping and premium packaging.',
    date: 'May 15, 2026',
    verified: true,
    avatar: 'KM',
    location: 'Berlin, DE'
  },
  {
    id: 'rev-4',
    author: 'Hana Al-Asiri',
    rating: 5,
    text: 'Hands down the best activewear fabrics on the market. The seamless fabric feels like second skin but holds everything together tightly. Already ordered in sand beige and matte black!',
    date: 'April 30, 2026',
    verified: true,
    avatar: 'HA',
    location: 'Riyadh, KSA'
  }
];
