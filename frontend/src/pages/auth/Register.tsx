import { type RegisterUser, type Role } from "@/types/types";
import { api } from "@/api/api";
import React, { useState } from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "@/components/ui/toast";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import { NavLink, useNavigate } from "react-router-dom";
import { Select, type SelectionOption } from "@/components/Select";
const initialValues: RegisterUser = {
  username: "",
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  role: "CUSTOMER",
};

const roleOptions: SelectionOption[] = [
  { label: "Cliente", value: "CUSTOMER" },
  { label: "Administrador", value: "ADMIN" },
];

export const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<RegisterUser>(initialValues);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors(null);
    try {
      await api.postRegister(userData);
      toast.add({
        type: "success",
        title: "Usuario Creado con exito",
      });
      setUserData(initialValues);
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const data = error.response.data as Record<string, string[]>;
          const message =
            Object.values(data).flat().join(" - ") || "Error desconocido";
          setErrors(message);
          toast.add({
            type: "error",
            title: "Error al Registrarse",
            description: message,
          });
        } else {
          setErrors("Error de conexion con el servidor");
          toast.add({
            type: "error",
            title: "Error de red",
            description: "No se pudo conectar al servidor",
          });
        }
      } else {
        setErrors("Ocurrio un error inesperado");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-135 flex items-center justify-center my-30">
      <form
        className="w-84  md:w-1/2 lg:w-1/3 flex flex-col items-center justify-center gap-8 border rounded-2xl p-8 shadow-2xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl tracking-wider">Registrate</h2>
        {errors ? (
          <>
            <Badge variant="ghost">
              <p className="text-red-500">{errors}</p>
            </Badge>
          </>
        ) : (
          ""
        )}
        <Input
          label="Nombre de Usuario"
          name="username"
          placeholder="Ingrese un Nombre de usuario"
          value={userData.username}
          onChange={handleChange}
          required={true}
        />
        <Input
          label="Primer Nombre"
          name="first_name"
          placeholder="Ingrese su nombre"
          value={userData.first_name}
          onChange={handleChange}
        />
        <Input
          label="Primer Apellido"
          name="last_name"
          placeholder="Ingresu su apellido"
          value={userData.last_name}
          onChange={handleChange}
        />
        <Input
          label="Email"
          name="email"
          placeholder="ejm: JohnDoe@gmail.com"
          value={userData.email}
          onChange={handleChange}
          required={true}
        />
        <Input
          label="Password"
          name="password"
          placeholder="Ingrese su contraseña"
          value={userData.password}
          onChange={handleChange}
          required={true}
          type="password"
        />
        <div className="flex flex-col justify-center items-center md:flex-row  gap-5">
          <Select
            value={userData.role}
            options={roleOptions}
            placeholder="Selecciona un rol"
            onChange={(value) =>
              setUserData({ ...userData, role: value as Role })
            }
          />
          <Button type="submit" className="p-6">
            {loading ? <Spinner /> : "Registrarse"}
          </Button>
        </div>
        <p>
          Ya tienes una cuenta?{" "}
          <NavLink to="/login" className="underline">
            {" "}
            Inicia Sesion
          </NavLink>
        </p>
      </form>
    </div>
  );
};
