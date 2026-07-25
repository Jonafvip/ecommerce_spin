import axios from "axios";
import {
  type PaginatedProductsResponse,
  type ProductListExceptCategory,
  type CategoryList,
  type ProductDetail,
  type RegisterUser,
  type LoginUser,
  type AuthTokenResponse,
} from "@/types/types";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const api = {
  getProducts: async (): Promise<{ results: ProductListExceptCategory[] }> => {
    const response = await axios.get<{ results: ProductListExceptCategory[] }>(
      `${BASE_URL}products/`,
    );
    return response.data;
  },
  getProductDetail: async (
    productId?: string | number,
  ): Promise<ProductDetail> => {
    const response = await axios.get<ProductDetail>(
      `${BASE_URL}products/${productId}/`,
    );
    return response.data;
  },
  getProductsNavigation: async (
    url?: string,
  ): Promise<PaginatedProductsResponse> => {
    const endpoint = url || `${BASE_URL}products/`!;
    const response = await axios.get<PaginatedProductsResponse>(endpoint);
    return response.data;
  },
  getCategories: async (): Promise<CategoryList[]> => {
    const response = await axios.get<CategoryList[]>(`${BASE_URL}categories/`);
    return response.data;
  },
  postRegister: async (userData: RegisterUser): Promise<RegisterUser> => {
    const response = await axios.post<RegisterUser>(
      `${BASE_URL}user/register/`,
      userData,
    );
    return response.data;
  },
  postLogin: async (userdata: LoginUser): Promise<AuthTokenResponse> => {
    const response = await axios.post<AuthTokenResponse>(
      `http://127.0.0.1:8000/api-token-auth/`,
      userdata,
    );
    return response.data;
  },
};
