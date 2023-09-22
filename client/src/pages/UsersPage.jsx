import { useUser } from "../context/UsersContext.jsx";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import UserCard from "../components/UserCard.jsx";

function UsersPage() {
  const { getUsers, users, createUser } = useUser();
  const [showCreateUserAlert, setShowCreateUserAlert] = useState(false); // Estado para controlar la alerta

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const onSubmit = handleSubmit(async (values) => {
    try {
      await createUser(values);
      await getUsers();
      reset();
      setShowCreateUserAlert(false);
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    getUsers();
  }, []);

  if (users.length === 0) {
    return <h1>No hay usuarios</h1>;
  }

  const openCreateUserAlert = () => {
    setShowCreateUserAlert(true);
  };

  const closeCreateUserAlert = () => {
    setShowCreateUserAlert(false);
  };

  return (
    <div>
      <button
        onClick={openCreateUserAlert}
        className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Crear Usuario
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map((user) => (
          <div key={user.cliente_id}>
            <UserCard user={user} />
          </div>
        ))}
      </div>

      {showCreateUserAlert && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white w-96 p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Crear Nuevo Usuario</h2>
            <form onSubmit={onSubmit}>
              <div className="grid  gap-10">
                <div className="grid  gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      {...register("identificacion", {
                        required: "La identificacion es obligatoria",
                        pattern: {
                          value: /^\d{5,11}$/,
                          message:
                            "La identificación debe tener 5 y 11 números",
                        },
                      })}
                      className={`block px-2.5 pb-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 ${
                        errors.identificacion ? "border-red-500" : ""
                      }`}
                    />
                    <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                      identificacion
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      {...register("nombres", {
                        required: "El nombre es obligatorio",
                      })}
                      className={`block px-2.5 pb-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 ${
                        errors.nombres ? "border-red-500" : ""
                      }`}
                    />
                    <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                      Nombre
                    </label>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 16"
                      >
                        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      {...register("correo", {
                        required: "El correo es obligatorio",
                      })}
                      className={` border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                        errors.correo ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      {...register("clave", {
                        required: "La contraseña es requerida",
                        pattern: {
                          value: /^(?=.*[A-Z])(?=.*[a-zA-Z0-9]).{8,}$/,
                          message:
                            "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número",
                        },
                      })}
                      className={`block px-2.5 pb-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 ${
                        errors.clave ? "border-red-500" : ""
                      }`}
                      placeholder="*********"
                    />
                    <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                      Contraseña
                    </label>
                  </div>
                  <div className="relative">
                    <div className="relative">
                      <input
                        type="password"
                        {...register("confirmPassword", {
                          required: "Debe confirmar la contraseña",
                          validate: {
                            matchesPassword: (value) =>
                              value === getValues("clave") ||
                              "Las contraseñas no coinciden",
                          },
                        })}
                        className={`block px-2.5 pb-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 ${
                          errors.confirmPassword ? "border-red-500" : ""
                        }`}
                        placeholder="*********"
                      />
                      <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                        Confirmar Contraseña
                      </label>
                    </div>
                  </div>
                  {Object.keys(errors).length > 0 && (
                    <div
                      className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      <svg
                        className="flex-shrink-0 inline w-4 h-4 mr-3 mt-[2px]"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                      </svg>
                      <span className="sr-only">Danger</span>
                      <div>
                        <span className="font-medium">
                          Por favor, corrige los siguientes errores:
                        </span>
                        <ul className="mt-1.5 ml-4 list-disc list-inside">
                          {Object.keys(errors).map((errorKey) => (
                            <li key={errorKey}>{errors[errorKey].message}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center justify-between py-6">
                    <button
                      type="submit"
                      className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      Registrar
                    </button>
                    <button
                      onClick={closeCreateUserAlert}
                      className="bg-red-500 text-white rounded hover:bg-red-600 px-4 py-2"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersPage;
