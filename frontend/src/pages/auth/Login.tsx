import { type LoginUser } from "@/types/types";
import { api } from "@/api/api";
import React, { useState } from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "@/components/ui/toast";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";

const initialValues: LoginUser = {
  username: "",
  password: "",
};

export const Login = () => {
  const [userData, setUserData] = useState<LoginUser>(initialValues);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors(null);
    try {
      const response = await api.postLogin(userData);
      login(response.token);
      setUserData(initialValues);
      toast.add({
        type: "success",
        title: "Bienvenido!",
        description: "Sesión Iniciada Correctamente",
      });
      setTimeout(() => {
        navigate("/");
      }, 200);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const data = error.response.data as { non_field_errors?: string[] };
          const message =
            data?.non_field_errors?.[0] ?? "Credencias incorrectas";
          setErrors(message);
          toast.add({
            type: "error",
            title: "Error al iniciar sesión",
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
    <div className="h-100 flex items-center justify-center my-30">
      <form
        className="w-84  md:w-1/2 lg:w-1/3 flex flex-col items-center justify-center gap-8 border rounded-2xl p-8 shadow-2xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl tracking-wider">Inicia Sesion</h2>
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
          label="Username"
          name="username"
          placeholder="Ingrese un Nombre de usuario"
          value={userData.username}
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
        <Button type="submit" className="p-6">
          {loading ? <Spinner /> : "Inicar Sesion"}
        </Button>
      </form>
    </div>
  );
};
