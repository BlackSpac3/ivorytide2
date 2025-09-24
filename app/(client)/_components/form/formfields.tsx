import { cn } from "@/lib/utils";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";

type InputFormFieldProps<T extends FieldValues> = {
  type: "input";
  control: Control<T>;
  fieldName: Path<T>;
  label: string;
  placeholder: string;
  errors: FieldErrors<T>;
  inputType?: string;
  options?: never;
  className?: string;
  icon?: React.ReactNode;
  min?: number;
  max?: number;
  step?: number;
};

type SelectFormFieldProps<T extends FieldValues> = {
  type: "select";
  control: Control<T>;
  fieldName: Path<T>;
  label: string;
  placeholder: string;
  errors: FieldErrors<T>;
  inputType?: never;
  options: string[];
  className?: string;
  icon?: React.ReactNode;
  min?: number;
  max?: number;
  step?: number;
};

type TextAreaFormFieldProps<T extends FieldValues> = {
  type: "textarea";
  control: Control<T>;
  fieldName: Path<T>;
  label: string;
  placeholder: string;
  errors: FieldErrors<T>;
  inputType?: never;
  options?: never;
  className?: string;
  icon?: React.ReactNode;
  min?: number;
  max?: number;
  step?: number;
};

const FormField = <T extends FieldValues>({
  type,
  control,
  fieldName,
  className,
  label,
  options,
  icon,
  placeholder,
  inputType,
  errors,
  min,
  max,
  step,
}:
  | InputFormFieldProps<T>
  | SelectFormFieldProps<T>
  | TextAreaFormFieldProps<T>) => {
  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field }) => (
        <div className="space-y-2">
          <label
            className="block  font-medium text-foreground"
            htmlFor={fieldName}>
            {label}
          </label>
          <div>
            {type === "input" &&
              (inputType === "number" ? (
                <div className="relative">
                  {icon}
                  <input
                    {...field}
                    id={fieldName}
                    name={fieldName}
                    type={inputType}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    placeholder={placeholder}
                    min={min ?? 0}
                    max={max ?? 100}
                    step={step ?? 1}
                    className={cn(
                      "w-full px-4 py-3 border-2 border-primary/20 rounded-lg focus:border-primary focus:outline-none font-body bg-background text-foreground",
                      className
                    )}
                  />
                </div>
              ) : (
                <div className="relative">
                  {icon}
                  <input
                    {...field}
                    id={fieldName}
                    name={fieldName}
                    type={inputType ?? "text"}
                    placeholder={placeholder}
                    className={cn(
                      "w-full px-4 py-3 border-2 border-primary/20 rounded-lg focus:border-primary focus:outline-none font-body bg-background text-foreground",
                      className
                    )}
                  />
                </div>
              ))}
            {type === "textarea" && (
              <textarea
                {...field}
                id={fieldName}
                name={fieldName}
                placeholder={placeholder}
                className={cn(
                  "w-full resize-none h-24 px-4 py-3 border-2 border-primary/20 rounded-lg focus:border-primary focus:outline-none font-body bg-background text-foreground",
                  className
                )}
              />
            )}
            {type === "select" && (
              <select
                id={fieldName}
                name={fieldName}
                value={field.value}
                onChange={field.onChange}
                className={cn(
                  "w-full px-4 py-3 border-2 border-primary/20 rounded-lg focus:border-primary focus:outline-none font-body bg-background text-foreground",
                  className
                )}>
                <option value="">{placeholder}</option>
                {options.map((option) => (
                  <option key={option} value={option} className="capitalize">
                    {option}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div>
            {errors[fieldName] && (
              <p className="text-sm text-red-500">
                {errors[fieldName]?.message as string}
              </p>
            )}
          </div>
        </div>
      )}
    />
  );
};

export default FormField;
