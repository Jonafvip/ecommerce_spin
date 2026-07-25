import {
  NativeSelect,
} from "@/components/ui/native-select";

interface SelectMyProp {
  value: string;
  onChange: (value: string) => void;
}
export const Select = ({ value, onChange }: SelectMyProp) => {
  return (
    <NativeSelect
      className="w-48"
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    >
      <option value="" disabled>
        Ordenar Por:
      </option>
      <option value="name">Nombre (A-Z)</option>
      <option value="-name">Nombre (Z-A)</option>
      <option value="unit_price">Precio: Menor a Mayor</option>
      <option value="-unit_price">Precio: Mayor a Menor</option>
    </NativeSelect>
  );
};
