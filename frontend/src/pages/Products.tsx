import { api } from "@/api/api";
import { Card } from "@/components/Card";
import { Checkbox } from "@/components/Checkbox";
import { PaginationProducts } from "@/components/PaginationProducts";
import { Select, type SelectionOption } from "@/components/Select";
import {
  type CategoryList,
  type ProductListExceptCategory,
} from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";

const CustomerSortOptions: SelectionOption[] = [
  { value: "name", label: "Nombre (A-Z)" },
  { value: "-name", label: "Nombre (Z-A)" },
  { value: "unit_price", label: "Precio: Menor a Mayor" },
  { value: "-unit_price", label: "Precio: Mayor a Menor" },
];

export const Products = () => {
  const [productsData, setProductsData] = useState<ProductListExceptCategory[]>(
    [],
  );
  const [categoriesData, setCategoriesData] = useState<CategoryList[]>([]);
  const [priceRange, setPriceRange] = useState<string>("all");
  const [ordering, setOrdering] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProductsData(undefined, 1);
  }, []);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const response = await api.getCategories();
        setCategoriesData(response);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const serverError = error.response?.data;
          console.log(serverError);
        }
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

        if (ordering) {
          params.append("ordering", ordering);
        }

        if (selectedCategory !== null) {
          params.append("category", selectedCategory.toString());
        }

        const queryString = params.toString();
        const url = queryString
          ? `${import.meta.env.VITE_BASE_URL}products/?${queryString}`
          : undefined;

        await fetchProductsData(url, 1);
      } catch (e) {
        console.log(e);
      }
    };
    fetchDataProductQueryParams();
    window.scroll(0, 0);
  }, [priceRange, ordering, selectedCategory]);

  return (
    <div className="flex">
      {/* Filtros */}
      <aside className="shrink-0 pl-8 hidden md:block">
        <div className="flex flex-col justify-center border-b-2 border-border p-8 pt-12">
          <h4 className="mb-3 text-xl text-foreground">Categoria</h4>
          <button
            onClick={() => setSelectedCategory(null)}
            className={`text-left py-1 text-sm tracking-wider ${selectedCategory === null ? "font-bold text-foreground" : "font-light text-muted-foreground hover:text-foreground"}`}
          >
            Todas las categorías
          </button>
          {categoriesData?.slice(0, 10).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-left py-1 tracking-wider transition-colors ${
                selectedCategory === cat.id
                  ? "font-bold text-foreground"
                  : "font-light text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
        <div className="p-8">
          <h4 className="text-xl">Precio</h4>
          <ul className="flex flex-col gap-2 py-4">
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
        <div className="flex flex-col items-center md:flex-row justify-between gap-5 px-8 md:px-14">
          <h2 className="pb-2 text-3xl font-light tracking-wider">
            Products <span className="text-xl">({count})</span>
          </h2>
          <div className="shrink-0">
            <Select
              value={ordering}
              onChange={setOrdering}
              placeholder="Ordenar Por: "
              options={CustomerSortOptions}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 px-8 md:px-15 md:mx-auto mt-8">
          {productsData?.map((pro) => (
            <Card
              id={pro.id}
              key={pro.id}
              title={pro.name}
              badge={pro.unit_price}
              titleButton="Ver Producto"
            />
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
