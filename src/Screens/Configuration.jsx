import { ChevronLeft, Plus, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useNotes } from "./../Context/NotesContext";
import { Modal } from "../Components/Modal";
import { useState } from "react";

export const Configuration = () => {
  const { config, deleteCategory } = useNotes();

  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  return (
    <div className="mt-2">
      <div className="flex items-center">
        <Link to="/">
          <ChevronLeft color="#ffffff" size={40} />
        </Link>
        <h2 className="text-white text-xl">Configuracion</h2>
      </div>
      <div className="mt-5">
        <div className="flex justify-between p-2 items-center">
          <h3 className="text-white text-lg">Categorias</h3>
          <Plus color="#ffffff" size={20} onClick={() => setIsOpen(true)} />
          <Modal
            isOpen={isOpen}
            onClose={setIsOpen}
            title={"Nueva categoria"}
            data={text}
          >
            <div className="w-full border-b-2 border-gray-300 py-2 mb-10 mt-10">
              <input
                type="text"
                placeholder={"Nombre de la Nueva categoria"}
                onChange={(e) => setText(e.target.value)}
                className="w-full outline-none bg-transparent text-white text-lg"
              />
            </div>
          </Modal>
        </div>
        {config.categories.map((category, index) => (
          <div
            key={index}
            className="bg-gray-800 h-15 rounded-lg flex justify-between items-center m-2"
          >
            <h2 key={category} className="pl-3 text-white">
              {category}
            </h2>
            {category != "Todas las notas" ? (
              <Trash
                key={category + index}
                color="#ffffff"
                size={20}
                className="mr-2"
                onClick={() => deleteCategory(category)}
              />
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
