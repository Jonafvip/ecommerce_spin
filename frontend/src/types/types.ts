export interface ProductsList {
  id: number;
  name: string;
  unit_price: string;
  category_id: number;
}

export type ProductListExceptCategory = Omit<ProductsList, "category">;

export interface PaginatedProductsResponse {
  count:number
  next: string | null;
  previous: string | null;
  results: ProductListExceptCategory[];
}

export interface CategoryList{
  id:number
  name:string
}