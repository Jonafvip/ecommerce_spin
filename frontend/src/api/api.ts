import axios from "axios";
import {
  type PaginatedProductsResponse,
  type ProductListExceptCategory,
} from "@/types/types";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const api = {
  getProducts: async (): Promise<{ results: ProductListExceptCategory[] }> => {
    const response = await axios.get<{ results: ProductListExceptCategory[] }>(
      BASE_URL!,
    );
    return response.data;
  },
  getProductsNavigation: async (
    url?: string,
  ): Promise<PaginatedProductsResponse> => {
    const endpoint = url || BASE_URL!;
    const response = await axios.get<PaginatedProductsResponse>(endpoint);
    return response.data;
  },
};
