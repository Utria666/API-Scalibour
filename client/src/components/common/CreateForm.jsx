import { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";

const CreateForm = ({
  onClose,
  onSubmit,
  formClass = "",
  buttonClass = "",
  cancelButtonClass = "",
  fields = [],
  children,
}) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.id]: "" }), {})
  );

  const handleChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.log("Form Data:", formData);
    }
    onClose();
  };

  return (
    <form
      className={`bg-black p-4 rounded-lg ${formClass}`}
      onSubmit={handleSubmit}
    >
      {fields.map((field) => (
        <InputField
          key={field.id}
          label={field.label}
          type={field.type}
          value={formData[field.id]}
          onChange={(e) => handleChange(field.id, e.target.value)}
          placeholder={field.placeholder}
          id={field.id}
          autoComplete={field.autoComplete}
          {...field.additionalProps}
        />
      ))}

      {children}

      <div className="flex items-center justify-between">
        <Button
          texto="Enviar"
          className={`bg-white hover:bg-zinc-300 text-violet-700 ${buttonClass}`}
          onClick={() => {}}
        />
        <Button
          texto="Cancelar"
          className={`bg-violet-800 hover:bg-violet-700 text-white ${cancelButtonClass}`}
          onClick={() => {
            onClose;
          }}
        />
      </div>
    </form>
  );
};

export default CreateForm;
