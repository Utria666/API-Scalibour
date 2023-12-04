import { useForm, Controller } from "react-hook-form";
import InputField from "./InputField";
import Button from "./Button";

const CreateForm = ({
  onClose,
  onSubmit,
  formClass,
  buttonClass,
  cancelButtonClass,
  fields = [],
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();



  const handleFormSubmit = async (formData) => {

    const isSuccessful = await onSubmit(formData);
    // if (isSuccessful) {
    //   reset();
    //   onClose();
    // }
  };

  return (
    <form
      className={`bg-black p-4 rounded-lg ${formClass}`}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      {Object.keys(errors).length > 0 && (
        <div
          className="flex p-4 mb-4 text-sm rounded-lg bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-300"
          role="alert"
        >
          <span className="material-icons-outlined mr-3">error_outline</span>
          <div>
            <span className="font-medium">
              Por favor, corrige los siguientes errores:
            </span>
            <ul className="mt-1.5 ml-4 list-disc list-inside text-red-600">
              {Object.keys(errors).map((errorKey) => (
                <li key={errorKey}>{errors[errorKey].message}</li>
              ))}
            </ul>
          </div>
        </div>
      )}


      {fields.map((field) => (
        <Controller
          key={field.id}
          name={field.id}
          control={control}
          defaultValue={field.defaultValue || ""}
          rules={field.validation}
          render={({
            field: { onChange, onBlur, value, ref, name },
            fieldState: { error },
          }) => (
            <InputField
              label={field.label}
              type={field.type}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={field.placeholder}
              id={field.id}
              name={name}
              ref={ref}
              autoComplete={field.autoComplete}
              error={error}
              additionalProps={field.additionalProps}
            />
          )}
        />
      ))}
      <div className="flex items-center justify-between">
        <Button
          texto="Enviar"
          type="submit"
          className={`bg-white hover:bg-zinc-300 text-violet-700 ${buttonClass}`}
        />
        <Button
          texto="Cancelar"
          className={`bg-violet-800 hover:bg-violet-700 text-white ${cancelButtonClass}`}
          onClick={onClose}
        />
      </div>
    </form>
  );
};

export default CreateForm;
