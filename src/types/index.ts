import { DefaultValues, FieldValues } from "react-hook-form";

export interface IProduct {
  _id?: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  category: string;
  image: string;
  quantity?: number;
}

export interface ICustomText {
  title: string;
  isLink?: boolean;
  href?: string;
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

export interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "password" | "file";
  placeholder?: string;
  step?: string;
  resize?: "none" | "vertical" | "horizontal" | "both";
}

export interface ProductFormProps<T extends FieldValues> {
  initialValues?: DefaultValues<T>;
  onSubmit: (data: T) => Promise<void>;
  loading: boolean;
  error?: string;
  buttonText: string;
  formFields: FieldConfig[];
  schema?: any;
}

export interface IUser {
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface IUserStore {
  user: IUser | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: any;
  setUser: (user: any) => void;
  createUser: (data: any) => Promise<{ success: boolean; message: string }>;
  loginUser: (data: any) => Promise<{ success: boolean; message: string }>;
  logoutUser: () => Promise<{ success: boolean; message: string }>;
  getUser: () => void;
}

export interface IRegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ICartStore {
  cart: IProduct[];
  loading: boolean;
  error: string | null;
  setCart: (cart: IProduct[]) => void;
  addToCart: (product: IProduct) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
}
