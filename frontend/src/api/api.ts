import axios from "axios";
import {
  type PaginatedProductsResponse,
  type ProductListExceptCategory,
  type CategoryList,
  type ProductDetail,
  type RegisterUser,
  type LoginUser,
  type AuthTokenResponse,
  type OmitUserInCart,
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
  logoutUser: () => {
    localStorage.removeItem("auth_token");
    window.location.href = "/";
  },
  getCartList: async (): Promise<OmitUserInCart[]> => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.get<OmitUserInCart[]>(`${BASE_URL}carts/`, {
      headers: { Authorization: `Token ${token}` },
    });
    return response.data;
  },
  updateCartItemQuantity: async (detailId: number, quantity: number) => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.patch(
      `${BASE_URL}carts/`,
      { detailId: detailId, quantity },
      { headers: { Authorization: `Token ${token}` } },
    );
    return response;
  },
  removeCartItem: async (detail_id: number) => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.delete(`${BASE_URL}carts/remove-item/`, {
      headers: { Authorization: `Token ${token}` },
      data: { detail_id: detail_id },
    });
    return response.data;
  },
};
