export const notesService = {
  // Obtener todas las notas
  getNotes() {
    const notes = localStorage.getItem("notas");
    return notes ? JSON.parse(notes) : [];
  },

  // Guardar una nueva nota
  saveNote(title, category, subNotes = []) {
    const notes = this.getNotes();

    const newNote = {
      title,
      category,
      subNotes,
    };

    notes.push(newNote);
    localStorage.setItem("notas", JSON.stringify(notes));

    return newNote;
  },

  // Añadir una sub-nota a una nota existente
  addSubNote(noteTitle, subNote) {
    const notes = this.getNotes();
    const noteIndex = notes.findIndex((note) => note.title === noteTitle);

    if (noteIndex !== -1) {
      notes[noteIndex].subNotes.push(subNote);
      localStorage.setItem("notas", JSON.stringify(notes));
      return true;
    }

    return false;
  },
};
