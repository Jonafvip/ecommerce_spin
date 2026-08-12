import { useEffect, useState } from "react";
import { api } from "@/api/api";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, RefreshCcw, UserRound } from "lucide-react";
import type { UserDetailt } from "@/types/types";

const initialDetail: UserDetailt = {
  username: "",
  email: "",
  first_name: "",
  last_name: "",
  role: "",
};

export const Profile = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [customerDetail, setCustomerDetail] = useState<UserDetailt>(initialDetail);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchCustomer = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const response = await api.getUserDetail();
      setCustomerDetail(response);
    } catch (error) {
      setFetchError("No se pudieron cargar tus datos. Verifica tu conexion.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  const getInitials = () => {
    const first = customerDetail.first_name?.trim();
    const last = customerDetail.last_name?.trim();
    if (first && last) return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
    if (first) return first.charAt(0).toUpperCase();
    if (customerDetail.username) return customerDetail.username.charAt(0).toUpperCase();
    return "U";
  };

  const isAdmin = customerDetail.role === "ADMIN";

  const handleLogout = () => {
    logout();
    toast.add({
      type: "success",
      title: "Sesion Cerrada",
    });
    navigate("/");
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold">Mi Cuenta</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Controla tu información personal.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Spinner className="size-8" />
        </div>
      ) : fetchError ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-card py-20 shadow-sm">
          <p className="text-sm text-muted-foreground">{fetchError}</p>
          <Button variant="outline" onClick={fetchCustomer}>
            <RefreshCcw /> Reintentar
          </Button>
        </div>
      ) : (
        <>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
              <Avatar className="size-20">
                <AvatarFallback className="text-xl font-semibold">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col items-center gap-2 sm:items-start">
                <h3 className="text-xl font-semibold text-foreground">
                  {customerDetail.first_name || customerDetail.username}
                </h3>

                <div className="flex items-center gap-2">
                  {isAdmin ? (
                    <Badge variant="destructive">Administrador</Badge>
                  ) : (
                    <Badge variant="secondary">Cliente</Badge>
                  )}
                  <span className="text-sm text-muted-foreground">
                    @{customerDetail.username}
                  </span>
                </div>
              </div>

              <Button
                variant="outline"
                className="mt-2 sm:ml-auto sm:mt-0"
                onClick={handleLogout}
              >
                <LogOut /> Cerrar Sesión
              </Button>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-card shadow-sm">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-foreground">
                Información Personal
              </h3>
            </div>
            <Separator />

            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
              <div className="space-y-1">
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <UserRound className="size-4" /> Nombre de usuario
                </p>
                <p className="text-base font-medium">
                  {customerDetail.username || "—"}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Nombre completo</p>
                <p className="text-base font-medium">
                  {customerDetail.first_name && customerDetail.last_name
                    ? `${customerDetail.first_name} ${customerDetail.last_name}`
                    : "—"}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  Correo electrónico
                </p>
                <a
                  href={`mailto:${customerDetail.email}`}
                  className="break-all text-base font-medium text-primary hover:underline"
                >
                  {customerDetail.email || "—"}
                </a>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Rol</p>
                <p className="text-base font-medium">
                  {isAdmin ? "Administrador" : "Cliente"}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};