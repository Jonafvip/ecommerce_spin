export interface ProductsList {
  id: number;
  name: string;
  unit_price: string;
  category_id: number;
}

export interface ProductDetail {
  id: number | string;
  name: string;
  description: string;
  unit_price: string;
  product_code: string;
  image: string;
  category: {
    id: string | number;
    name: string;
  };
}

export type ProductListExceptCategory = Omit<ProductsList, "category">;

export interface PaginatedProductsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProductListExceptCategory[];
}

export interface CategoryList {
  id: number;
  name: string;
}

export interface RegisterUser {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface LoginUser {
  username: string;
  password: string;
}

export interface AuthTokenResponse {
  token: string;
}
