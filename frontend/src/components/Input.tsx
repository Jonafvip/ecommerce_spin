import { Input as InputGlobal } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { useState } from "react";
import { Button } from "./ui/button";
import { Eye, EyeClosed } from "lucide-react";

interface InputMyProp {
  placeholder?: string;
  label?: string;
  value?: string | undefined | number;
  name?: string;
  required?: boolean;
  type?: string;
  accept?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  label,
  placeholder,
  value,
  name,
  required,
  type,
  accept,
  onChange,
}: InputMyProp) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      <div
        className={`${type === "password" ? "flex items-center gap-2" : ""}`}
      >
        <InputGlobal
          type={inputType}
          placeholder={placeholder}
          value={value ?? ""}
          name={name}
          onChange={onChange}
          required={required}
          className="p-5"
          accept={accept}
        />
        {type === "password" ? (
          <Button
            variant="ghost"
            className="py-5"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <Eye /> : <EyeClosed />}
          </Button>
        ) : (
          ""
        )}
      </div>
    </Field>
  );
};
