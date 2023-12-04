import React from 'react';

const InputField = React.forwardRef(({
  label,
  type,
  value,
  onChange,
  onBlur,
  placeholder,
  id,
  name,
  autoComplete,
  additionalProps,
  className,
  error
}, ref) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>{label}</label>}
      <input
        className="w-full p-2 text-sm text-white border rounded-md bg-black border-violet-700"
        ref={ref}
        type={type}
        value={value || ''}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        id={id}
        name={name}
        autoComplete={autoComplete}
        {...additionalProps}
      />
      {error && <span className="text-red-500 text-xs">{error.message}</span>}
    </div>
  );
});


export default InputField;
