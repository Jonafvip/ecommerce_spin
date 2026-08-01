import { NativeSelect } from "@/components/ui/native-select";

export interface SelectionOption {
  value: string;
  label: string;
}

interface SelectMyProp {
  value: string;
  options: SelectionOption[];
  onChange: (value: string) => void;
  placeholder?: string;
}

export const Select = ({
  value,
  options,
  placeholder,
  onChange,
}: SelectMyProp) => {
  return (
    <NativeSelect
      className="w-48"
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((op) => (
        <option key={op.value} value={op.value}>
          {op.label}
        </option>
      ))}
    </NativeSelect>
  );
};
