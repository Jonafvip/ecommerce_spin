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
import { apiClient, TOKEN_AUTH } from "./client";

export const api = {
  getProducts: async (): Promise<{ results: ProductListExceptCategory[] }> => {
    const response = await apiClient.get<{
      results: ProductListExceptCategory[];
    }>("products/");
    return response.data;
  },
  getProductDetail: async (
    productId?: string | number,
  ): Promise<ProductDetail> => {
    const response = await apiClient.get<ProductDetail>(
      `products/${productId}/`,
    );
    return response.data;
  },
  postProductCreate: async (
    productData: FormData,
  ): Promise<ProductListWatchAdmin> => {
    const response = await apiClient.post<ProductListWatchAdmin>(
      "products/",
      productData,
    );
    return response.data;
  },
  deleteProduct: async (id: string | number): Promise<void> => {
    const response = await apiClient.delete(`products/${id}/`);
    return response.data;
  },
  getProductsNavigation: async (
    url?: string,
  ): Promise<PaginatedProductsResponse> => {
    const endpoint = url || "products/";
    const response = await apiClient.get<PaginatedProductsResponse>(endpoint);
    return response.data;
  },
  getProductsAdmin: async (): Promise<ProductListWatchAdmin[]> => {
    const response = await apiClient.get<ProductListWatchAdmin[]>(
      "products/list-products-admin/",
    );
    return response.data;
  },
  updateProducts: async (
    id: number | string,
    data: FormData,
  ): Promise<ProductListWatchAdmin> => {
    const response = await apiClient.patch<ProductListWatchAdmin>(
      `products/${id}/`,
      data,
    );
    return response.data;
  },
  getCategories: async (): Promise<CategoryList[]> => {
    const response = await apiClient.get<CategoryList[]>(
      "categories/all-categories/",
    );
    return response.data;
  },
  postCategory: async (data: CategoryCreate): Promise<CategoryList> => {
    const response = await apiClient.post<CategoryList>("categories/", data);
    return response.data;
  },
  deleteCategory: async (id: number | string): Promise<void> => {
    const response = await apiClient.delete(`categories/${id}/`);
    return response.data;
  },
  getCategoriesNavigation: async (
    url?: string,
  ): Promise<PaginationCategory> => {
    const endpoint = url || "categories/";
    const response = await apiClient.get<PaginationCategory>(endpoint);
    return response.data;
  },
  postRegister: async (userData: RegisterUser): Promise<RegisterUser> => {
    const response = await apiClient.post<RegisterUser>(
      "user/register/",
      userData,
    );
    return response.data;
  },
  postLogin: async (userdata: LoginUser): Promise<AuthTokenResponse> => {
    const response = await apiClient.post<AuthTokenResponse>(
      TOKEN_AUTH,
      userdata,
    );
    return response.data;
  },
  logoutUser: () => {
    localStorage.removeItem("auth_token");
    window.location.href = "/";
  },
  getCartList: async (): Promise<OmitUserInCart[]> => {
    const response = await apiClient.get<OmitUserInCart[]>("carts/");
    return response.data;
  },
  addProductToCart: async (productId: number, quantity: number = 1) => {
    const response = await apiClient.post("carts/add-item/", {
      product_id: productId,
      quantity,
    });
    return response.data;
  },
  updateCartItemQuantity: async (detailId: number, quantity: number) => {
    const response = await apiClient.patch("carts/update-quantity/", {
      detail_id: Number(detailId),
      quantity: Number(quantity),
    });
    return response.data;
  },
  removeCartItem: async (detail_id: number) => {
    const response = await apiClient.delete("carts/remove-item/", {
      data: { detail_id: detail_id },
    });
    return response.data;
  },
  getUserDetail: async (): Promise<UserDetailt> => {
    const response = await apiClient.get<UserDetailt>("user/me/");
    return response.data;
  },
  updateUserDetail: async (data: {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
  }): Promise<UserDetailt> => {
    const response = await apiClient.patch<UserDetailt>("user/me/", data);
    return response.data;
  },
  getUsersListByAdmin: async (
    url?: string,
  ): Promise<PaginatedCustomerResponse> => {
    const endpoint = url || "users/admin/";
    const response = await apiClient.get<PaginatedCustomerResponse>(endpoint);
    return response.data;
  },
  postOrder: async (
    details: { product: number | string; quantity: number }[],
  ): Promise<OmitUserInCart> => {
    const response = await apiClient.post<OmitUserInCart>("orders/", {
      details,
    });
    return response.data;
  },
  getOrders: async (): Promise<OrderList[]> => {
    const response = await apiClient.get<OrderList[]>("orders/");
    return response.data;
  },
  getMyOrders: async (): Promise<OrderList[]> => {
    const response = await apiClient.get<OrderList[]>("orders/mine/");
    return response.data;
  },
};
