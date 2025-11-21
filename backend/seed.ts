import dotenv from 'dotenv';

import { connectDB } from './src/config/db';
import { MenuItem } from './src/models/MenuItem';

const sampleMenu = [
  {
    name: 'Margherita Pizza',
    description: 'Classic delight with 100% real mozzarella cheese.',
    price: 12.99,
    category: 'Pizza',
  },
  {
    name: 'Pepperoni Pizza',
    description: 'American classic with spicy pepperoni slices.',
    price: 14.99,
    category: 'Pizza',
  },
  {
    name: 'Cheeseburger',
    description: 'Juicy grilled beef patty with cheddar cheese.',
    price: 10.99,
    category: 'Burger',
  },
  {
    name: 'Veggie Burger',
    description: 'Plant-based patty with fresh lettuce and tomato.',
    price: 11.99,
    category: 'Burger',
  },
  {
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce with parmesan and croutons.',
    price: 8.99,
    category: 'Salad',
  },
  {
    name: 'Sushi Platter',
    description: 'Assorted fresh sushi rolls and nigiri.',
    price: 24.99,
    category: 'Sushi',
  },
];

const seedData = async (): Promise<void> => {
  dotenv.config();
  await connectDB();

  await MenuItem.deleteMany();
  await MenuItem.insertMany(sampleMenu);

  process.exit(0);
};

seedData().catch((error) => {
  console.error('Error seeding data:', error);
  process.exit(1);
});
