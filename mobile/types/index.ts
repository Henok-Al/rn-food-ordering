export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category?: string;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
}

export interface Order {
  id: string;
  items: Array<{
    menuItemId: string;
    quantity: number;
  }>;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered';
  createdAt: string;
}

export interface OrderRequest {
  items: Array<{
    menuItemId: string;
    quantity: number;
  }>;
}
