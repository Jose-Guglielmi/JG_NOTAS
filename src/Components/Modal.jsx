export const Modal = ({ isOpen, onClose, children, title, aceptar }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4 text-white">{title}</h2>
        <div>{children}</div>
        <div className="flex justify-end">
          <button
            className="text-red-400 pr-5 text-xl"
            onClick={() => onClose(false)}
          >
            Cancelar
          </button>
          <button
            className="text-blue-500 text-xl"
            onClick={() => {
              aceptar();
            }}
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};
