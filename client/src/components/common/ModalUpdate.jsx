const ModalUpdate = ({ title, user, onUpdate, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-black">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-bold">{title}</h4>
          <button
            className="text-white bg-transparent hover:bg-gray-200 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={onClose}
          >
            X
          </button>
        </div>
        <div className="mt-4">
          {user && (
            <div>
              <label htmlFor="newName">Nuevo Nombre:</label>
              <input type="text" id="newName" defaultValue={user.nombre} />

              <button
                className="bg-blue-500 text-white px-4 py-2 mt-4"
                onClick={() => onUpdate(user.ID)}
              >
                Actualizar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalUpdate;
