export type MenuItemSize = {
  id: string;
  label: string;
  priceModifier: number;
};

export type MenuItemExtra = {
  id: string;
  label: string;
  price: number;
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  calories?: number;
  isPopular?: boolean;
  badges?: string[];
  sizes?: MenuItemSize[];
  extras?: MenuItemExtra[];
};

export type MenuSection = {
  id: string;
  title: string;
  description?: string;
  items: MenuItem[];
};

export type Restaurant = {
  name: string;
  tagline: string;
  rating: number;
  reviewCount: number;
  priceLevel: string;
  cuisine: string[];
  etaRange: string;
  heroImage: string;
  hours: {
    openHour: number;
    closeHour: number;
    label: string;
  };
  menuSections: MenuSection[];
};
