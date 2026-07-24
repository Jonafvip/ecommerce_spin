import { Checkbox as Check } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

interface MyCheckBoxProp {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  id?: string;
}

export const Checkbox = ({
  label,
  checked,
  onCheckedChange,
  id = "default-checkbox",
}: MyCheckBoxProp) => {

  return (
    <FieldGroup className="mx-auto w-56">
      <Field orientation="horizontal">
        <Check
          checked={checked}
          onCheckedChange={onCheckedChange}
          id={id}
          name={id}
          className="border border-black"
        />
        <FieldLabel htmlFor={id} className="text-lg">
          {label}
        </FieldLabel>
      </Field>
    </FieldGroup>
  );
};
