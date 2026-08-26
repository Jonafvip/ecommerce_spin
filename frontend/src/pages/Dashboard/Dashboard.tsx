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
import { Step4, type ChartPoint } from "@/components/grafics/Diagrams";

export const Dashboard = () => {
  const [userDataDetail, setUserDataDetail] = useState<UserDetailt>();
  const [topProducts, setTopProducts] = useState<ReportDetailItem[]>([]);

  const [stats, setStats] = useState({
    income: 0,
    orders: 0,
    customers: 0,
    average: 0,
  });
  const [salesData, setSalesData] = useState<ChartPoint[]>([]);

  const metricCards = [
    {
      id: "ingresos",
      label: "Ingresos Totales",
      icon: <FaMoneyBill1Wave size="20" />,
      result: `$${stats.income}`,
      hint: "Ingresos acumulados",
      iconClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      bar: "from-emerald-400 to-emerald-600",
      glow: "bg-emerald-400/20",
    },
    {
      id: "pedidos",
      label: "Total de Pedidos",
      icon: <IoBagOutline size="20" />,
      result: stats.orders,
      hint: "Órdenes registradas",
      iconClass: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
      bar: "from-sky-400 to-sky-600",
      glow: "bg-sky-400/20",
    },
    {
      id: "clientes",
      label: "Clientes Activos",
      icon: <MdOutlinePeopleAlt size="20" />,
      result: stats.customers,
      hint: "Usuarios activos",
      iconClass: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
      bar: "from-violet-400 to-violet-600",
      glow: "bg-violet-400/20",
    },
    {
      id: "promedio",
      label: "Promedio de Pedidos",
      icon: <ScrollText size="20" />,
      result: stats.average.toFixed(2),
      hint: "Por cliente",
      iconClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
      bar: "from-amber-400 to-amber-600",
      glow: "bg-amber-400/20",
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

        const byMonth = orders.reduce<Record<string, number>>((acc, o) => {
          const d = new Date(o.created_at);
          const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
          acc[key] = (acc[key] ?? 0) + Number(o.total);
          return acc;
        }, {});
        setSalesData(
          Object.entries(byMonth).map(([name, ventas]) => ({ name, ventas })),
        );
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
                className="group relative flex min-h-[140px] flex-col justify-between gap-5 overflow-hidden rounded-2xl border border-border bg-card p-5 font-light tracking-wider transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5"
              >
                <div
                  className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br ${card.glow} to-transparent opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100`}
                />
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${card.bar}`}
                />
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-medium text-foreground">
                    {card.label}
                  </h5>
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${card.iconClass}`}
                  >
                    {card.icon}
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-semibold text-foreground sm:text-4xl">
                    {card.result}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {card.hint}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="overflow-x-auto rounded-2xl border-2 border-border p-4 xl:col-span-2">
              <h2 className="px-1 pb-1 text-xl tracking-wide text-foreground">
                Ventas Mensuales
              </h2>
              <p className="px-1 pb-4 text-sm text-muted-foreground tracking-wider">
                Suma de los ingresos generados por los pedidos en cada mes.
              </p>
              <Step4 data={salesData} />
            </div>
            <div className="rounded-2xl border-2 border-border p-4">
              <h2 className="px-4 pb-2 pt-4 text-xl tracking-wide text-foreground">
                Top Productos
              </h2>
              <div className="flex flex-col gap-1 p-4">
                {topProducts.map((pro) => (
                  <div
                    key={pro.id}
                    className="flex items-center justify-between gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-muted/60"
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
