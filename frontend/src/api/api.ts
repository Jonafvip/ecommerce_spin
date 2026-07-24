import axios from "axios";
import {
  type PaginatedProductsResponse,
  type ProductListExceptCategory,
  type CategoryList,
} from "@/types/types";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const api = {
  getProducts: async (): Promise<{ results: ProductListExceptCategory[] }> => {
    const response = await axios.get<{ results: ProductListExceptCategory[] }>(
      `${BASE_URL}products/`,
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
};
