import React from "react";

const InputField = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  id,
  autoComplete,
}) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className="w-full p-2 text-sm text-white border rounded-md bg-black border-violet-700"
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
      />
    </div>
  );
};

export default InputField;
