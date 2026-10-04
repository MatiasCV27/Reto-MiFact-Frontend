export interface Product {
  code: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category?: string;
  createDate?: string;
  enabled?: boolean;
}
