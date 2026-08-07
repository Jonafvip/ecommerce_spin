export interface ProductsList {
  id: number;
  name: string;
  unit_price: string;
  category_id: number;
}

export interface ProductDetail {
  id: number;
  name: string;
  description: string;
  unit_price: string;
  product_code: string;
  image: string;
  category: {
    id: number;
    name: string;
  };
}

export interface ProductCreate {
  name: string;
  description: string;
  stock: number;
  unit_price: string | number;
  product_code: string;
  image: File | null;
  is_active: boolean;
  category: number;
}

export interface ProductListWatchAdmin {
  id: string;
  name: string;
  unit_price: string;
  product_code: string;
  stock: number;
  category: {
    name: string;
  };
  image?: string;
  is_active: boolean;
}

export type ProductListExceptCategory = Omit<ProductsList, "category">;

export interface PaginatedProductsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProductListExceptCategory[];
}

export interface PaginatedCustomerResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: UserListByAdmin[];
}

export interface CategoryList {
  id: number;
  name: string;
  description: string;
  is_active?: boolean;
}

export interface PaginationCategory {
  count: number;
  next: string | null;
  previous: string | null;
  results: CategoryList[];
}

export interface CategoryCreate {
  name: string;
  description: string;
  is_active: boolean;
}
export type Role = "ADMIN" | "CUSTOMER";

export interface RegisterUser {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: Role;
}

export interface LoginUser {
  username: string;
  password: string;
}

export interface AuthTokenResponse {
  token: string;
}

export interface CartDetailItem {
  id: number;
  product: number | string;
  product_name: string;
  product_description: string;
  product_image: string;
  product_price: string;
  quantity: number;
  total: number;
}

export interface CartList {
  id: number;
  status: string;
  user: {
    id: string | number;
    full_name: string;
  } | null;
  details: CartDetailItem[];
}

export type OmitUserInCart = Omit<CartList, "user">;

export interface UserDetailt {
  id?: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

export interface UserListByAdmin {
  id: number;
  username?: string;
  full_name: string;
  email: string;
  orders_count?: string;
  date_joined?: string;
  role: string;
}

export interface OrderList {
  id: number;
  status: string;
  created_at: Date;
  user: {
    id: string;
    full_name: string;
    username: string;
  };
  total: number;
}
