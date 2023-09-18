import { useForm } from 'react-hook-form'
import {resgiterRequest} from "../api/auth";

function RegisterPage() {
    const {register,handleSubmit} = useForm();
    const onSubmit=handleSubmit(async(values)=>{
      const res = await resgiterRequest(values)
      console.log(res);
    })
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <img
        src="https://www.xtrafondos.com/wallpapers/paisaje-digital-en-atardecer-5846.jpg"
        alt=""
        className="absolute top-0 left-0 w-full h-full object-cover blur-sm bg-fixed"
      />
      <div className="container mx-auto h-[75%] p-10 text-neutral-800 dark:text-neutral-200 relative z-20 flex items-center justify-center">
        <div className="w-[80%]">
          <div className="block rounded-lg bg-white shadow-lg dark:bg-[#1b1722]">
            <div className="g-0 lg:flex lg:flex-wrap">
              <div className="px-4 md:px-0 lg:w-6/12">
                <div className="md:mx-6 md:p-12">
                  <div className="text-center">
                    <img
                      className="mx-auto w-48"
                      src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                      alt="logo"
                    />
                    <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                      SCALIBOUR
                    </h4>
                  </div>

                  <form onSubmit={onSubmit}>
                    <div className="grid  gap-10">
                      <div className="grid  gap-4">
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
                            {...register("email",{required:true})}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="ejemplo@ejemplo.com"
                          />
                        </div>
                        <div className="relative">
                          <input
                            type="text"
                            {...register("password",{required:true})}
                            className="block px-2.5 pb-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="*********"
                          />
                          <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                            Contraseña
                          </label>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pb-6">
                        <a
                          href="#"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          ¿Olvido su contraseña?
                        </a>
                        <button
                          type="submit"
                          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        >
                          Ingresar
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div
                className="flex items-center justify-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none bg-indigo-500 opacity-1"
                style={{
                  backgroundImage:
                    "url('https://cdn.pixabay.com/photo/2016/02/13/12/26/aurora-1197753_1280.jpg')",
                }}
              >
                <div className="flex flex-col items-center justify-center">
                  <h6 className="text-white text-center">¿No tiene usuario?</h6>
                  <button
                    type="button"
                    className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2"
                  >
                    Registra
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage