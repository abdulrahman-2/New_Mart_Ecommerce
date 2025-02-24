export interface IProduct {
  _id?: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  category: string;
  image: string;
}

export interface ICustomText {
  title: string;
  isLink?: boolean;
  baseSize?: string;
  smSize?: string;
}

export interface IProductStore {
  products: IProduct[];
  loading: boolean;
  error: string | null;
  setProducts: (products: IProduct[]) => void;
  createProduct: (
    newProduct: IProduct
  ) => Promise<{ success: boolean; message: string }>;
  fetchProducts: () => Promise<void>;
  deleteProduct: (id: string) => Promise<{ success: boolean; message: string }>;
  editProduct: (
    id: string,
    updatedProduct: IProduct
  ) => Promise<{ success: boolean; message: string }>;
}
