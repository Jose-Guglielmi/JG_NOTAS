import { NotebookPen, Trash, Pencil } from "lucide-react";
import { Modal } from "./Modal";
import { useNotes } from "./../Context/NotesContext";
import { useState } from "react";

export const ViewNotes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isText, setIsText] = useState("");
  const [note, setNote] = useState({});
  const { addNote, selectedCategory, getFilteredNotes, editNote } = useNotes();

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
            <Trash className="mr-2" color="#ffff" />
          </div>
        </div>
      ))}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={"Nueva nota"}
        aceptar={() => {
          addNote(isText, selectedCategory);
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
    </div>
  );
};
