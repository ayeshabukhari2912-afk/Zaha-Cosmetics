import { Product, Category } from '../types';

export const INITIAL_HERO_IMAGE = "/src/assets/images/hero_zaha_cosmetics_1786429138928.jpg";
export const INITIAL_PROMO_IMAGE = "/src/assets/images/promo_zaha_banner_1786429153824.jpg";

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Makeup',
    slug: 'makeup',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    description: 'High-pigment, long-wearing cosmetics designed for effortless radiance.'
  },
  {
    id: 'cat-2',
    name: 'Skincare',
    slug: 'skincare',
    image: 'https://images.unsplash.com/photo-1608248597263-00079e96e70b?auto=format&fit=crop&w=800&q=80',
    description: 'Botanical, nutrient-dense formulations for a luminous complexion.'
  },
  {
    id: 'cat-3',
    name: 'Lip Care',
    slug: 'lip-care',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
    description: 'Nourishing lip glosses, hydrating balms, and velvet lip colors.'
  },
  {
    id: 'cat-4',
    name: 'Face Care',
    slug: 'face-care',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
    description: 'Illuminating primers, revitalizing toners, and restorative masks.'
  },
  {
    id: 'cat-5',
    name: 'Hair Care',
    slug: 'hair-care',
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80',
    description: 'Silky hair oils, nourishing masks, and shine-enhancing elixirs.'
  },
  {
    id: 'cat-6',
    name: 'Fragrances',
    slug: 'fragrances',
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80',
    description: 'Opulent scents blending precious botanicals and warm amber notes.'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'zaha-101',
    name: 'Zaha Velvet Matte Lip Elixir',
    category: 'Lip Care',
    price: 34,
    discountPrice: 28,
    shortDescription: 'Silky smooth velvet liquid lip color with 12-hour hydration.',
    fullDescription: 'Experience weightless, high-impact color with Zaha Velvet Matte Lip Elixir. Infused with organic botanical oils and pure pearl pigments, this luxurious formula glides on effortlessly, leaving lips feeling soft, plump, and gracefully satiny.',
    ingredients: 'Pure Jojoba Oil, Organic Rosehip Oil, Hyaluronic Spheres, Vitamin E, Botanical Pigments, Shea Butter.',
    benefits: '• Non-drying 12h comfortable wear\n• Rich velvety pigment payoff\n• Hydrates and plumps fine lines',
    howToUse: 'Glide applicator gently from center of lips outward. Reapply for bolder color intensity.',
    stock: 45,
    rating: 4.9,
    isBestSeller: true,
    isNewArrival: true,
    createdAt: '2026-08-01',
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80'
    ],
    reviews: [
      {
        id: 'rev-1',
        customerName: 'Amina Al-Mansoor',
        rating: 5,
        comment: 'The texture is insanely soft! Doesn\'t dry my lips at all and the shade is absolute perfection.',
        date: '2026-08-05'
      },
      {
        id: 'rev-2',
        customerName: 'Sophia Chen',
        rating: 5,
        comment: 'Smells heavenly and lasts through my entire work day. Worth every penny!',
        date: '2026-08-07'
      }
    ]
  },
  {
    id: 'zaha-102',
    name: 'Emerald Botanical Radiance Serum',
    category: 'Skincare',
    price: 68,
    discountPrice: 58,
    shortDescription: 'Potent antioxidant serum with matcha green tea and Niacinamide.',
    fullDescription: 'A restorative botanical nectar powered by organic parrot-green tea leaves, squalane, and gold-infused Niacinamide. Designed to brighten dull skin, soothe redness, and restore youthfulness.',
    ingredients: 'Matcha Tea Extract, Organic Squalane, 5% Niacinamide, Gold Leaf Flakes, Centella Asiatica, Hyaluronic Acid.',
    benefits: '• Soothes inflammation & redness\n• Boosts natural skin luminosity\n• Protects against environmental stressors',
    howToUse: 'Warm 3-4 drops in palms and gently press onto cleansed face and neck morning and night.',
    stock: 28,
    rating: 5.0,
    isBestSeller: true,
    createdAt: '2026-07-28',
    images: [
      'https://images.unsplash.com/photo-1608248597263-00079e96e70b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80'
    ],
    reviews: [
      {
        id: 'rev-3',
        customerName: 'Elena Rostova',
        rating: 5,
        comment: 'My skin woke up literally glowing on day two. The green tea scent is so relaxing!',
        date: '2026-08-02'
      }
    ]
  },
  {
    id: 'zaha-103',
    name: 'Luminous Silk Cushion Foundation',
    category: 'Makeup',
    price: 52,
    shortDescription: 'Buildable medium-to-full coverage cushion foundation with a dewy glow.',
    fullDescription: 'Achieve airbrushed perfection with Zaha Luminous Silk Cushion Foundation. Formulated with light-reflecting micro-pearls and skin-loving serum ingredients to blur pores and even out tone effortlessly.',
    ingredients: 'Filtered Water, Titanium Dioxide, Squalane, Rose Hydrosol, Niacinamide, Pearl Powder, Vitamin C.',
    benefits: '• Weightless serum-like feel\n• SPF 30 natural mineral protection\n• All-day glow without excess oil',
    howToUse: 'Press puff lightly into cushion compact and tap gently onto face starting from the center outward.',
    stock: 32,
    rating: 4.8,
    isBestSeller: true,
    createdAt: '2026-07-20',
    images: [
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=80'
    ],
    reviews: [
      {
        id: 'rev-4',
        customerName: 'Fatima Z.',
        rating: 5,
        comment: 'Blends seamlessly like a second skin. Elegant packaging as well.',
        date: '2026-08-01'
      }
    ]
  },
  {
    id: 'zaha-104',
    name: 'Rose & Jade Facial Sculpting Roller',
    category: 'Face Care',
    price: 38,
    discountPrice: 30,
    shortDescription: 'Handcrafted natural jade stone roller for lymphatic drainage.',
    fullDescription: 'Carved from premium natural parrot-green jade, this cooling facial roller improves microcirculation, reduces puffiness, and aids skin absorption of serums and night oils.',
    ingredients: '100% Authentic Grade-A Natural Green Jade Gemstone, Gold Electroplated Alloy Hardware.',
    benefits: '• Promotes facial lymphatic drainage\n• Cools and calms sensitive skin\n• Relieves facial muscle tension',
    howToUse: 'Roll gently in upward and outward strokes along jawline, cheekbones, and forehead after serum application.',
    stock: 18,
    rating: 4.7,
    createdAt: '2026-07-15',
    images: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1000&q=80'
    ],
    reviews: []
  },
  {
    id: 'zaha-105',
    name: 'Jasmine & Amber Gold Eau De Parfum',
    category: 'Fragrances',
    price: 95,
    discountPrice: 85,
    shortDescription: 'Intoxicating bouquet of white jasmine, warm amber, and green citrus.',
    fullDescription: 'An evocative luxury perfume that opens with fresh green bergamot, leading into a sensual heart of night-blooming jasmine and finishing with warm cashmeran amber and soft vanilla resin.',
    ingredients: 'Organic Denatured Alcohol, Natural Essential Oil Concentrates (Jasmine, Amber, Bergamot, Patchouli, Vanilla).',
    benefits: '• Long-lasting 16-hour EDP concentration\n• Hand-blended artisanal notes\n• Hypoallergenic botanical base',
    howToUse: 'Spritz onto pulse points at wrists, collarbones, and behind knees. Do not rub wrists together.',
    stock: 20,
    rating: 4.9,
    isBestSeller: true,
    createdAt: '2026-08-03',
    images: [
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80'
    ],
    reviews: [
      {
        id: 'rev-5',
        customerName: 'Zainab B.',
        rating: 5,
        comment: 'I get compliments everywhere I go! Uniquely sophisticated fragrance.',
        date: '2026-08-08'
      }
    ]
  },
  {
    id: 'zaha-106',
    name: 'Parrot Silk Botanical Hair Elixir',
    category: 'Hair Care',
    price: 42,
    shortDescription: 'Weightless argan & marula hair oil for brilliant shine and heat protection.',
    fullDescription: 'Transform dry, stressed tresses into silky velvet strands. Zaha Hair Elixir seals split ends, protects against humidity, and imparts an irresistible healthy shine without weighing hair down.',
    ingredients: 'Cold-Pressed Argan Oil, Marula Oil, Camellia Seed Oil, Silk Protein, Sweet Almond Oil, Natural Fragrance.',
    benefits: '• Protects against heat up to 450°F\n• Tames flyaways & frizz instantly\n• Non-greasy lightweight absorption',
    howToUse: 'Dispense 1-2 pumps into palm, rub hands together, and distribute evenly through damp or dry hair lengths.',
    stock: 35,
    rating: 4.8,
    createdAt: '2026-07-30',
    images: [
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=1000&q=80'
    ],
    reviews: []
  },
  {
    id: 'zaha-107',
    name: 'Gold Infused Hydra-Gel Eye Patches',
    category: 'Face Care',
    price: 36,
    discountPrice: 29,
    shortDescription: 'Cooling hydrogel eye masks with 24k colloidal gold and peptides.',
    fullDescription: 'Revitalize tired eyes in 15 minutes. Infused with pure gold nanoparticles and marine collagen, these hydrogel patches instantly diminish dark circles and de-puff under-eye bags.',
    ingredients: '24K Colloidal Gold, Hydrolyzed Marine Collagen, Caffeine, Hyaluronic Acid, Aloe Vera Extract, Allantoin.',
    benefits: '• Reduces dark circles & puffiness\n• Deeply hydrates delicate under-eye area\n• Soothing cooling sensation',
    howToUse: 'Apply patches under clean eyes using included spatula. Leave for 15-20 minutes, then pat remaining serum gently.',
    stock: 50,
    rating: 4.9,
    createdAt: '2026-08-04',
    images: [
      'https://images.unsplash.com/photo-1567928269937-ae146e45b428?auto=format&fit=crop&w=1000&q=80'
    ],
    reviews: []
  },
  {
    id: 'zaha-108',
    name: 'Nourishing Satin Lip Butter',
    category: 'Lip Care',
    price: 24,
    shortDescription: 'Overnight conditioning lip mask with shea butter & strawberry extract.',
    fullDescription: 'Treat dry lips to ultimate hydration. Rich in organic shea butter, avocado oil, and natural fruit antioxidants, this satin lip butter melts upon application for pillowy softness.',
    ingredients: 'Organic Shea Butter, Avocado Oil, Beeswax, Strawberry Seed Extract, Vitamin E, Squalane.',
    benefits: '• Locks in 24-hour hydration\n• Gently exfoliates dead skin overnight\n• Natural pink sheer gloss finish',
    howToUse: 'Apply liberally to lips before bed or throughout the day whenever lips need instant comfort.',
    stock: 60,
    rating: 5.0,
    createdAt: '2026-08-06',
    images: [
      'https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&w=1000&q=80'
    ],
    reviews: []
  }
];
