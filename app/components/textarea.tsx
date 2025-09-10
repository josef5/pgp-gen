import React from "react";

function Textarea({
  label,
  id,
  placeholder,
  ...props
}: {
  label: string;
  id: string;
  placeholder?: string;
  [key: string]: any;
}) {
  return (
    <>
      <label
        htmlFor={id}
        className="text-brand col-span-3 col-start-1 mb-2 flex justify-start text-right text-xl md:col-span-1 md:ml-8"
      >
        {label}
      </label>
      <textarea
        id={id}
        className="bg-background-secondary focus:bg-background-tertiary col-span-3 col-start-1 box-border h-48 rounded-none border-none px-5 py-2 text-base focus:border-2 focus:outline-none md:col-start-2"
        placeholder={placeholder}
        {...props}
      />
    </>
  );
}

export default Textarea;
