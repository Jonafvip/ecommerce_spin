import { api } from "@/api/api";
import { Card } from "@/components/Card";
import { PaginationProducts } from "@/components/PaginationProducts";
import { type ProductsList } from "@/types/types";
import { useEffect, useState } from "react";

type ProductListExceptCategory = Omit<ProductsList, "category">;
export const Products = () => {
  const [productsData, setProductsData] = useState<ProductListExceptCategory[]>(
    [],
  );
  const [nextUrl, setnextUrl] = useState<string | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const PAGE_SIZE = 9;

  const fetchData = async (ulr?: string, pageNumber: number = 1) => {
    try {
      const response = await api.getProductsNavigation(ulr);
      setProductsData(response.results);
      setnextUrl(response.next);
      setPrevUrl(response.previous);
      setTotalPages(Math.ceil(response.count / PAGE_SIZE));
      setCurrentPage(pageNumber);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(undefined, 1);
  }, []);

  return (
    <div>
      {/* Mostrar Productos */}
      <section className="w-full p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 px-8 md:px-20 mt-8">
          {productsData.map((pro) => (
            <Card key={pro.id} title={pro.name} badge={pro.unit_price} />
          ))}
        </div>
        <PaginationProducts
          next={nextUrl}
          prev={prevUrl}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={fetchData}
        />
      </section>
    </div>
  );
};
