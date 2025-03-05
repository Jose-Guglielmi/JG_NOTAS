import { NotebookPen, Trash, Pencil } from "lucide-react";
import { Modal } from "./Modal";
import { useNotes } from "./../Context/NotesContext";
import { Selector } from "./Selector";
import { useState, useEffect } from "react";

export const ViewNotes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isText, setIsText] = useState("");
  const [note, setNote] = useState({});
  const {
    config,
    addNote,
    selectedCategory,
    getFilteredNotes,
    editNote,
    deleteNote,
  } = useNotes();
  const [isSelectedCategory, setIsSelectedCategory] = useState("");

  useEffect(() => {
    return () => {
      setIsSelectedCategory(selectedCategory);
    };
  }, [selectedCategory]);

  const notes = getFilteredNotes();

  return (
    <div className=" w-full h-full overflow-auto">
      <button
        className="fixed right-4 bottom-4 bg-violet-700 rounded-lg p-5 flex items-center text-base h-15 text-white"
        onClick={() => setIsOpen(true)}
      >
        <NotebookPen className="mr-2" />
        Nueva nota
      </button>
      {notes.map((note) => (
        <div
          key={note.id}
          className="bg-gray-800 h-15 rounded-lg flex justify-between items-center m-2 "
        >
          <h2 className="text-white ml-2">{note.title}</h2>
          <div className="flex flex-row">
            <Pencil
              className="mr-3"
              color="#ffff"
              onClick={() => {
                setNote(note);
                setIsText(note.title);
                setIsOpen2(true);
              }}
            />
            <Trash
              className="mr-2"
              color="#ffff"
              onClick={() => {
                setIsOpen3(true);
                setNote(note);
              }}
            />
          </div>
        </div>
      ))}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={"Nueva nota"}
        aceptar={() => {
          addNote(isText, isSelectedCategory);
          setIsOpen(false);
        }}
      >
        <div className="w-full border-b-2 border-gray-300 py-2 mb-10 mt-10">
          <input
            type="text"
            placeholder={"Nombre de la Nota"}
            onChange={(e) => setIsText(e.target.value)}
            className="w-full outline-none bg-transparent text-white text-lg"
          />
        </div>
        <div className="mb-5 bg-gray-700 rounded-lg p-1">
          <Selector
            options={config.categories}
            onSelect={setIsSelectedCategory}
            selectedCategory={isSelectedCategory}
          />
        </div>
      </Modal>
      <Modal
        isOpen={isOpen2}
        onClose={() => setIsOpen2(false)}
        title={"Editar nota"}
        aceptar={() => {
          editNote(note, isText);
          setIsOpen2(false);
        }}
      >
        <div className="w-full border-b-2 border-gray-300 py-2 mb-10 mt-10">
          <input
            type="text"
            value={isText}
            onChange={(e) => setIsText(e.target.value)}
            className="w-full outline-none bg-transparent text-white text-lg"
          />
        </div>
      </Modal>
      <Modal
        isOpen={isOpen3}
        title={"¿Desea eliminar la nota?"}
        aceptar={() => {
          deleteNote(note.id);
          setIsOpen3(false);
        }}
        onClose={() => {
          setIsOpen3(false);
        }}
      ></Modal>
    </div>
  );
};
