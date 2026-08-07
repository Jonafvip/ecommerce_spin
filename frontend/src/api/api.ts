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
  type UserDetailt,
  type PaginatedCustomerResponse,
  type CategoryCreate,
  type PaginationCategory,
  type OrderList,
} from "@/types/types";
import { type ProductListWatchAdmin } from "@/types/types";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const TOKEN_AUTH = import.meta.env.VITE_TOKEN_AUTH;

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
  postProductCreate: async (
    productData: FormData,
  ): Promise<ProductListWatchAdmin> => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.post<ProductListWatchAdmin>(
      `${BASE_URL}products/`,
      productData,
      {
        headers: { Authorization: `Token ${token}` },
      },
    );
    return response.data;
  },
  deleteProduct: async (id: string | number): Promise<void> => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.delete(`${BASE_URL}products/${id}/`, {
      headers: { Authorization: `Token ${token}` },
    });
    return response.data;
  },
  getProductsNavigation: async (
    url?: string,
  ): Promise<PaginatedProductsResponse> => {
    const endpoint = url || `${BASE_URL}products/`!;
    const response = await axios.get<PaginatedProductsResponse>(endpoint);
    return response.data;
  },
  getProductsAdmin: async (): Promise<ProductListWatchAdmin[]> => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.get<ProductListWatchAdmin[]>(
      `${BASE_URL}products/list-products-admin/`,
      {
        headers: { Authorization: `Token ${token}` },
      },
    );
    return response.data;
  },
  getCategories: async (): Promise<CategoryList[]> => {
    const response = await axios.get<CategoryList[]>(
      `${BASE_URL}categories/all-categories/`,
    );
    return response.data;
  },
  postCategory: async (data: CategoryCreate): Promise<CategoryList> => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.post<CategoryList>(
      `${BASE_URL}categories/`,
      data,
      {
        headers: { Authorization: `Token ${token}` },
      },
    );
    return response.data;
  },
  deleteCategory: async (id: number | string): Promise<void> => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.delete(`${BASE_URL}categories/${id}/`, {
      headers: { Authorization: `Token ${token}` },
    });
    return response.data;
  },
  getCategoriesNavigation: async (
    url?: string,
  ): Promise<PaginationCategory> => {
    const token = localStorage.getItem("auth_token");
    const endpoint = url || `${BASE_URL}categories/`;
    const response = await axios.get<PaginationCategory>(endpoint, {
      headers: { Authorization: `Token ${token}` },
    });
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
    const response = await axios.post<AuthTokenResponse>(TOKEN_AUTH, userdata);
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
  addProductToCart: async (productId: number, quantity: number = 1) => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.post(
      `${BASE_URL}carts/add-item/`,
      { product_id: productId, quantity },
      { headers: { Authorization: `Token ${token}` } },
    );
    return response.data;
  },
  updateCartItemQuantity: async (detailId: number, quantity: number) => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.patch(
      `${BASE_URL}carts/update-quantity/`,
      { detail_id: Number(detailId), quantity: Number(quantity) },
      { headers: { Authorization: `Token ${token}` } },
    );
    return response.data;
  },
  removeCartItem: async (detail_id: number) => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.delete(`${BASE_URL}carts/remove-item/`, {
      headers: { Authorization: `Token ${token}` },
      data: { detail_id: detail_id },
    });
    return response.data;
  },
  getUserDetail: async (): Promise<UserDetailt> => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.get<UserDetailt>(`${BASE_URL}user/me/`, {
      headers: { Authorization: `Token ${token}` },
    });
    return response.data;
  },
  getUsersListByAdmin: async (
    url?: string,
  ): Promise<PaginatedCustomerResponse> => {
    const token = localStorage.getItem("auth_token");
    const endpoint = url || `${BASE_URL}users/admin/`;
    const response = await axios.get<PaginatedCustomerResponse>(endpoint, {
      headers: { Authorization: `Token ${token}` },
    });
    return response.data;
  },
  postOrder: async (
    details: { product: number | string; quantity: number }[],
  ): Promise<OmitUserInCart> => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.post<OmitUserInCart>(
      `${BASE_URL}orders/`,
      { details },
      {
        headers: { Authorization: `Token ${token}` },
      },
    );
    return response.data;
  },
  getOrders: async (): Promise<OrderList[]> => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.get<OrderList[]>(`${BASE_URL}orders/`, {
      headers: { Authorization: `Token  ${token}` },
    });
    return response.data;
  },
  getMyOrders: async (): Promise<OrderList[]> => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.get<OrderList[]>(`${BASE_URL}orders/mine/`, {
      headers: { Authorization: `Token  ${token}` },
    });
    return response.data;
  },
};
