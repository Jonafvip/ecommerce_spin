import { api } from "@/api/api";
import { Card } from "@/components/Card";
import { Checkbox } from "@/components/Checkbox";
import { PaginationProducts } from "@/components/PaginationProducts";
import { type ProductsList, type CategoryList } from "@/types/types";
import { useEffect, useState } from "react";

type ProductListExceptCategory = Omit<ProductsList, "category">;
export const Products = () => {
  const [productsData, setProductsData] = useState<ProductListExceptCategory[]>(
    [],
  );
  const [categoriesData, setCategoriesData] = useState<CategoryList[]>([]);
  const [priceRange, setPriceRange] = useState<string>("all");
  const [nextUrl, setnextUrl] = useState<string | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [count, setCount] = useState(0);
  const PAGE_SIZE = 9;

  const fetchProductsData = async (ulr?: string, pageNumber: number = 1) => {
    try {
      const response = await api.getProductsNavigation(ulr);
      setProductsData(response.results);
      setnextUrl(response.next);
      setPrevUrl(response.previous);
      setTotalPages(Math.ceil(response.count / PAGE_SIZE));
      setCount(response.count);
      setCurrentPage(pageNumber);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductsData(undefined, 1);
  }, []);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const response = await api.getCategories();
        setCategoriesData(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategoriesData();
  }, []);

  useEffect(() => {
    const fetchDataProductQueryParams = async () => {
      try {
        const params = new URLSearchParams();
        if (priceRange === "0-100") {
          params.append("price_min", "0.00");
          params.append("price_max", "100.00");
        } else if (priceRange === "100-500") {
          params.append("price_min", "100.00");
          params.append("price_max", "500.00");
        } else if (priceRange === "500+") {
          params.append("price_min", "500.00");
        }
        const url = `${import.meta.env.VITE_BASE_URL}products/?${params.toString()}`;
        await fetchProductsData(url, 1);
      } catch (e) {
        console.log(e);
      }
    };
    if (priceRange !== "all") {
      fetchDataProductQueryParams();
    } else {
      fetchProductsData(undefined, 1);
    }
  }, [priceRange]);

  return (
    <div className="flex">
      {/* Filtros */}
      <aside className="shrink-0 pl-8">
        <div className="flex flex-col justify-center p-8 pt-15 border-b-2">
          <h4 className="text-xl">Categoria</h4>
          {categoriesData?.slice(0, 10).map((cat) => (
            <p key={cat.id} className="font-light tracking-wide py-2">
              {cat.name}
            </p>
          ))}
        </div>
        <div className="p-8">
          <h4 className="text-xl">Precio</h4>
          <ul className="flex flex-col gap-4 py-4">
            <li>
              <Checkbox
                label="$0 - $100"
                checked={priceRange === "0-100"}
                onCheckedChange={(checked) =>
                  setPriceRange(checked ? "0-100" : "all")
                }
              />
            </li>
            <li>
              <Checkbox
                label="$100 - $500"
                checked={priceRange === "100-500"}
                onCheckedChange={(checked) =>
                  setPriceRange(checked ? "100-500" : "all")
                }
              />
            </li>
            <li>
              <Checkbox
                label="$500+"
                checked={priceRange === "500+"}
                onCheckedChange={(checked) =>
                  setPriceRange(checked ? "500+" : "all")
                }
              />
            </li>
          </ul>
        </div>
      </aside>
      {/* Mostrar Productos */}
      <section className="w-full p-10">
        <h2 className="w-238 ml-20 pb-6 pt-4 text-3xl font-light tracking-wider border-b-2">
          Products <span className="text-xl">({count})</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 px-8 md:px-20 mt-8">
          {productsData?.map((pro) => (
            <Card key={pro.id} title={pro.name} badge={pro.unit_price} />
          ))}
        </div>
        <PaginationProducts
          next={nextUrl}
          prev={prevUrl}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={fetchProductsData}
        />
      </section>
    </div>
  );
};
