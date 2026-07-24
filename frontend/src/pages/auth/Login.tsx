import { type LoginUser } from "@/types/types";
import { api } from "@/api/api";
import React, { useState } from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/ui/button";
const initialValues: LoginUser = {
  username: "",
  password: "",
};

export const Login = () => {
  const [userData, setUserData] = useState<LoginUser>(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.postLogin(userData);
      localStorage.setItem("auth_token", response.token);
      setUserData(initialValues);
      window.location.href = "/";
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="h-[400px] flex items-center justify-center my-30">
      <form
        className="w-84  md:w-1/2 lg:w-1/3 flex flex-col items-center justify-center gap-8 border rounded-2xl p-8 shadow-2xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl tracking-wider">Inicia Sesion</h2>
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
        />
        <Button type="submit" className="p-6">
          Inicia Sesion
        </Button>
      </form>
    </div>
  );
};
