import { createContext, useContext, useState, useEffect } from "react";
import { configService } from "../Services/ConfigurationServices.js";
import { notesService } from "../Services/NoteServices.js";

//Creo el context
const NotesContext = createContext();

//hook personalizado para usar el context
export const useNotes = () => useContext(NotesContext);

// Proveedor del contexto
export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [config, setConfig] = useState({
    categories: [],
    FontSize: 25,
    DefaultCategory: "Todas las notas",
  });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  // Cargar datos iniciales
  useEffect(() => {
    const appConfig = configService.getConfig();
    setConfig(appConfig);
    setSelectedCategory(appConfig.DefaultCategory);

    const appNotes = notesService.getNotes();
    setNotes(appNotes);
    setLoading(false);
  }, []);
  console.log("Context: " + selectedCategory);

  // Métodos para manipular notas
  const addNote = (title, category, subNotes = []) => {
    notesService.saveNote(title, category, subNotes);
    setNotes(notesService.getNotes());
  };

  // Método para eliminar una nota
  const deleteNote = (noteId) => {
    try {
      notesService.deleteNote(noteId);
      setNotes(notesService.getNotes());
      return true;
    } catch (error) {
      console.error("Error al eliminar la nota:", error.message);
      return false;
    }
  };

  // Método para agregar una sub-nota
  const addSubNote = (noteId, subNote) => {
    try {
      const addedSubNote = notesService.addSubNote(noteId, subNote);
      setNotes(notesService.getNotes());
      return addedSubNote;
    } catch (error) {
      console.error("Error al agregar sub-nota:", error.message);
      return false;
    }
  };

  // Método para editar una sub-nota
  const editSubNote = (noteId, subNoteId, updatedSubNote) => {
    try {
      const editedSubNote = notesService.editSubNote(
        noteId,
        subNoteId,
        updatedSubNote
      );
      setNotes(notesService.getNotes());
      return editedSubNote;
    } catch (error) {
      console.error("Error al editar sub-nota:", error.message);
      return false;
    }
  };

  // Método para eliminar una sub-nota
  const deleteSubNote = (noteId, subNoteId) => {
    try {
      notesService.deleteSubNote(noteId, subNoteId);
      setNotes(notesService.getNotes());
      return true;
    } catch (error) {
      console.error("Error al eliminar sub-nota:", error.message);
      return false;
    }
  };

  // Método para editar una nota
  const editNote = (updatedFields, title) => {
    try {
      const updatedNote = notesService.editNote(title, updatedFields);
      setNotes(notesService.getNotes()); // Actualizar la lista de notas
      return updatedNote;
    } catch (error) {
      console.error("Error al editar la nota:", error.message);
      throw error; // Relanzar el error para manejarlo en el componente
    }
  };

  // Métodos para agregar configuración
  const addCategory = (newCategory) => {
    if (!newCategory || Object.keys(newCategory).length === 0) return false;

    if (configService.addCategory(newCategory)) {
      setConfig(configService.getConfig());
      return true;
    }

    return false;
  };

  // Método para eliminar categoría
  const deleteCategory = (categoryToDelete) => {
    const result = configService.deleteCategory(categoryToDelete);
    if (result.success) {
      setNotes(notesService.getNotes());
      setConfig(configService.getConfig());
      if (selectedCategory === categoryToDelete) {
        setSelectedCategory("Todas las notas");
      }
    }
    return result;
  };

  const setFontSize = (size) => {
    if (configService.setFontSize(size)) {
      setConfig(configService.getConfig());
      return true;
    }
    return false;
  };

  const setDefaultCategory = (category) => {
    if (configService.setDefaultCategory(category)) {
      setConfig(configService.getConfig());
      setSelectedCategory(category);
      return true;
    }
    return false;
  };

  const updateConfig = (newConfig) => {
    configService.saveConfig(newConfig);
    setConfig(newConfig);
    setSelectedCategory(newConfig.DefaultCategory);
  };

  // Filtrar notas según la categoría seleccionada
  const getFilteredNotes = () => {
    return selectedCategory === "Todas las notas"
      ? notes
      : notes.filter((note) => note.category === selectedCategory);
  };

  const value = {
    notes,
    config,
    selectedCategory,
    loading,
    setSelectedCategory,
    addNote,
    deleteNote, // Nueva función para eliminar nota
    addSubNote,
    editSubNote, // Nueva función para editar sub-nota
    deleteSubNote, // Nueva función para eliminar sub-nota
    editNote,
    addCategory,
    deleteCategory,
    setFontSize,
    setDefaultCategory,
    updateConfig,
    getFilteredNotes,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};
