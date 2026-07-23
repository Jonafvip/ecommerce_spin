import axios from "axios";
import { type ProductsList } from "@/types/types";

const BASE_URL = "http://127.0.0.1:8000/api/products/";
type ProductListExceptCategory = Omit<ProductsList, "category">;

export const api = {
  getProducts: async (): Promise<{ results: ProductListExceptCategory[] }> => {
    const response = await axios.get<{ results: ProductListExceptCategory[] }>(BASE_URL);
    return response.data;
  },
};
