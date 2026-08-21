import { useEffect, useState } from "react";
import { api } from "@/api/api";
import { type ReportDetailItem, type UserDetailt } from "@/types/types";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { IoBagOutline } from "react-icons/io5";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { ScrollText } from "lucide-react";
import { ArrowDownToLine } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/SideBar";
import { Button } from "@/components/ui/button";
import { Step4 } from "@/components/grafics/Diagrams";

export const Dashboard = () => {
  const [userDataDetail, setUserDataDetail] = useState<UserDetailt>();
  const [topProducts, setTopProducts] = useState<ReportDetailItem[]>([]);

  const [stats, setStats] = useState({
    income: 0,
    orders: 0,
    customers: 0,
    average: 0,
  });

  const metricCards = [
    {
      id: "ingresos",
      label: "Ingresos Totales",
      icon: <FaMoneyBill1Wave size="20" />,
      result: `$${stats.income}`,
    },
    {
      id: "pedidos",
      label: "Total de Pedidos",
      icon: <IoBagOutline size="20" />,
      result: stats.orders,
    },
    {
      id: "clientes",
      label: "Clientes Activos",
      icon: <MdOutlinePeopleAlt size="20" />,
      result: stats.customers,
    },
    {
      id: "promedio",
      label: "Promedio de Pedidos",
      icon: <ScrollText size="20" />,
      result: stats.average.toFixed(2),
    },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [orders, customers, userDataDetail, reportTop5Products] =
          await Promise.all([
            api.getOrders(),
            api.getUsersListByAdmin(),
            api.getUserDetail(),
            api.getReportTop5Products(),
          ]);
        setUserDataDetail(userDataDetail);
        setTopProducts(reportTop5Products);
        const totalOrders = orders.length;
        const income = orders.reduce((acc, o) => acc + Number(o.total), 0);
        const totalCustomer = customers.count;

        setStats({
          income,
          orders: totalOrders,
          customers: totalCustomer,
          average: totalCustomer > 0 ? totalOrders / totalCustomer : 0,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchStats();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col w-full min-h-screen">
        <SidebarTrigger className="m-2" />
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl tracking-wider">
                DashBoard Descripcion General
              </h2>
              <h3 className="text-sm sm:text-base text-muted-foreground tracking-wider mt-1">
                Bienvenido de vuelta{" "}
                {userDataDetail?.username
                  ? userDataDetail.username.charAt(0).toUpperCase() +
                    userDataDetail.username.slice(1).toLowerCase()
                  : "Usuario"}
                ... ¡Qué haremos ahora!
              </h3>
            </div>
            <Button className="rounded-xl p-5 tracking-wider w-full sm:w-auto">
              <ArrowDownToLine /> Export Report
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 py-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 md:py-10">
            {metricCards.map((card) => (
              <div
                key={card.id}
                className="flex min-h-35 flex-col justify-between gap-6 rounded-2xl border border-border bg-card p-5 font-light tracking-wider"
              >
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-medium text-foreground">
                    {card.label}
                  </h5>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-background">
                    {card.icon}
                  </div>
                </div>
                <p className="text-4xl font-medium text-foreground">
                  {card.result}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="overflow-x-auto rounded-2xl border-2 border-border p-4 xl:col-span-2">
              <Step4 />
            </div>
            <div className="rounded-2xl border-2 border-border p-4">
              <h2 className="px-4 pb-2 pt-4 text-xl tracking-wide text-foreground">
                Top Productos
              </h2>
              <div className="flex flex-col gap-2 p-4">
                {topProducts.map((pro) => (
                  <div
                    key={pro.id}
                    className="flex items-center justify-between gap-3 py-2"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={pro.image}
                        alt={pro.name}
                        className="w-14 h-14 object-cover rounded-xl shrink-0"
                      />
                      <div className="min-w-0">
                        <h2 className="text-sm font-medium truncate">
                          {pro.name}
                        </h2>
                        <p className="text-xs text-muted-foreground">
                          {pro.unidades_mas_vendidas}{" "}
                          {pro.unidades_mas_vendidas === 1
                            ? "unidad vendida"
                            : "unidades vendidas"}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-medium shrink-0">
                      ${pro.unit_price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};
