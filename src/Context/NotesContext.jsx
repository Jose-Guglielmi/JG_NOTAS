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
    DefaultCategory: "",
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

  // Métodos para manipular notas
  const addNote = (title, category, subNotes = []) => {
    notesService.saveNote(title, category, subNotes);
    setNotes(notesService.getNotes());
  };

  const addSubNote = (noteTitle, subNote) => {
    if (notesService.addSubNote(noteTitle, subNote)) {
      setNotes(notesService.getNotes());
      return true;
    }
    return false;
  };

  // Métodos para agregar configuracion
  const addCategory = (newCategory) => {
    // Validar que newCategory no sea un objeto vacío
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
      // Actualizar la lista de notas después de mover las notas a "Todas las notas"
      setNotes(notesService.getNotes());
      // Actualizar la configuración
      setConfig(configService.getConfig());
      // Si la categoría eliminada era la seleccionada, cambiar a "Todas las notas"
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
    addSubNote,
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
