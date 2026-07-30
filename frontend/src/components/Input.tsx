import { Input as InputGlobal } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";

interface InputMyProp {
  placeholder?: string;
  label?: string;
  value?: string | undefined |number;
  name?: string;
  required?: boolean;
  type?: string;
  accept?:string
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
  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      <InputGlobal
        type={type}
        placeholder={placeholder}
        value={value ?? ""}
        name={name}
        onChange={onChange}
        required={required}
        className="p-5"
        accept={accept}
      />
    </Field>
  );
};
