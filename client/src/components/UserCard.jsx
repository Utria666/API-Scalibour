function UserCard({ user }) {
  return (
    <div className="max-w-2xl w-96 h-120 bg-gray-800 border border-gray-300 rounded-lg shadow p-4 m-4">
      <div className="flex items-center justify-center">
        <img
          className="w-40 h-40 mb-4 rounded-full object-cover"
          src={'https://media.istockphoto.com/id/1289461335/es/foto/retrato-de-un-hombre-negro-apuesto.jpg?s=2048x2048&w=is&k=20&c=pn9pZP2gr5U5Fm5tu_PNaSfz961DUXNKlvu1sChoyzs='}
          alt={`Foto de perfil de ${user.nombres}`}
        />
      </div>
      <div className="p-5">
        <h5 className="mb-2 text-3xl font-bold text-center text-white">{user.nombres}</h5>
        <p className="mb-2 text-gray-300 dark:text-gray-400"><span className="font-semibold">ID de Cliente:</span> {user.cliente_id}</p>
        <p className="mb-2 text-gray-300 dark:text-gray-400"><span className="font-semibold">Identificación:</span> {user.identificacion}</p>
        <p className="mb-2 text-gray-300 dark:text-gray-400"><span className="font-semibold">Correo Electrónico:</span> {user.correo}</p>
        <p className="mb-2 text-gray-300 dark:text-gray-400"><span className="font-semibold">Rol:</span> {user.nombre_rol}</p>
        <div className="flex justify-end mt-4">
          <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">
            Actualizar
          </button>
          <button className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
