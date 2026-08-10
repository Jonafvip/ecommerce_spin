import { useEffect, useState } from "react";
import { api } from "@/api/api";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import type { UserDetailt } from "@/types/types";

export const Profile = () => {
  const [customerDetail, setCustomerDetail] = useState<UserDetailt>({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    role: "",
  });

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await api.getUserDetail();
        setCustomerDetail(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCustomer();
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold">Mi Cuenta</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Controla tu información personal.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-sm">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-foreground">
            Información Personal
          </h3>
        </div>
        <Separator />

        <div className="space-y-4 p-6">
          <div>
            <Label className="text-muted-foreground">Nombre de usuario</Label>

            <p className="mt-2 mb-2 text-base font-medium">
              {customerDetail.username}
            </p>
            <Separator />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4">
            <div>
              <Label className="text-muted-foreground mt-2">Nombre</Label>
              <p className="mt-2 font-medium">{customerDetail.first_name}</p>
            </div>
            <div>
              <Label className="text-muted-foreground mt-2">Apellido</Label>
              <p className="mt-2 font-medium">{customerDetail.last_name}</p>
            </div>
          </div>
          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-muted-foreground">
                Correo electrónico
              </Label>
              <p className="mt-2 break-all font-medium">
                {customerDetail.email}
              </p>
            </div>

            <div>
              <Label className="text-muted-foreground">Rol</Label>
              <p className="mt-2 font-medium">{customerDetail.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
