import { Description, Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}
export const StyledInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const inputId =
      id || props.name || `input-${Math.random().toString(36).substring(2, 9)}`;

    return (
      <div className="w-full max-w-md px-4">
        <Field>
          <Label htmlFor={inputId} className="text-sm/6 font-medium text-white">{label}</Label>
          <Description className="text-sm/6 text-white/50">
            Use your real name so people will recognize you.
          </Description>
          <Input
            id={inputId}
            ref={ref}
            className={clsx(
              "mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white",
              "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25",
              className
            )}
          />
        </Field>
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

StyledInput.displayName = "StyledInput";

export default Input;
