import { Restaurant } from '../types/menu';

export const restaurantSample: Restaurant = {
  name: 'Harvest Kitchen',
  tagline: 'Seasonal bowls, salads, and thoughtfully sourced plates.',
  rating: 4.8,
  reviewCount: 1200,
  priceLevel: '$$ · Farm-to-table',
  cuisine: ['Californian', 'Vegetarian friendly'],
  etaRange: '20-30 min • 2.4 km',
  heroImage:
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80',
  hours: {
    openHour: 10,
    closeHour: 22,
    label: '10:00 AM - 10:00 PM',
  },
  menuSections: [
    {
      id: 'chef-specials',
      title: 'Chef Specials',
      description: 'Limited-run plates featuring peak-season produce.',
      items: [
        {
          id: 'heirloom-bowl',
          name: 'Heirloom Grain Bowl',
          description: 'Farro, roasted squash, charred broccolini, citrus tahini.',
          price: 15,
          calories: 640,
          isPopular: true,
          badges: ['Chef favorite'],
          sizes: [
            { id: 'regular', label: 'Regular', priceModifier: 0 },
            { id: 'large', label: 'Large +$3', priceModifier: 3 },
          ],
          extras: [
            { id: 'avocado', label: 'Add avocado', price: 2.5 },
            { id: 'egg', label: 'Jammy egg', price: 1.5 },
          ],
        },
        {
          id: 'wild-salmon',
          name: 'Miso Glazed Salmon',
          description: 'Forbidden rice, ginger glazed carrots, sesame crunch.',
          price: 21,
          calories: 720,
          badges: ['Gluten free'],
          extras: [{ id: 'sauce', label: 'Extra miso glaze', price: 1 }],
        },
      ],
    },
    {
      id: 'cold-pressed',
      title: 'Cold-Pressed Juices',
      description: 'Organic blends bottled each morning.',
      items: [
        {
          id: 'citrus-glow',
          name: 'Citrus Glow',
          description: 'Grapefruit, orange, turmeric, ginger.',
          price: 9,
          extras: [
            { id: 'ginger-shot', label: 'Add ginger shot', price: 2 },
            { id: 'chia', label: 'Chia boost', price: 1 },
          ],
        },
        {
          id: 'green-shield',
          name: 'Green Shield',
          description: 'Kale, spinach, cucumber, mint, lime.',
          price: 9,
        },
      ],
    },
  ],
};
