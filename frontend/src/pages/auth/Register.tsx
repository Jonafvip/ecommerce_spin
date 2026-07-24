import { type RegisterUser } from "@/types/types";
import { api } from "@/api/api";
import React, { useState } from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/ui/button";
import axios from "axios";
const initialValues: RegisterUser = {
  username: "",
  first_name: "",
  last_name: "",
  email: "",
  password: "",
};

export const Register = () => {
  const [userData, setUserData] = useState<RegisterUser>(initialValues);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.postRegister(userData);
      setUserData(response);
      setUserData(initialValues);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error.response?.data;
        console.log(serverError);
      }
    }
  };
  return (
    <div className="h-[500px] flex items-center justify-center my-30">
      <form
        className="w-84  md:w-1/2 lg:w-1/3 flex flex-col items-center justify-center gap-8 border rounded-2xl p-8 shadow-2xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl tracking-wider">Registrate</h2>
        <Input
          label="Username"
          name="username"
          placeholder="Ingrese un Nombre de usuario"
          value={userData.username}
          onChange={handleChange}
          required={true}
        />
        <Input
          label="FirstName"
          name="first_name"
          placeholder="Ingrese su nombre"
          value={userData.first_name}
          onChange={handleChange}
        />
        <Input
          label="LastName"
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
        <Button type="submit" className="p-6">
          Registrase
        </Button>
      </form>
    </div>
  );
};
