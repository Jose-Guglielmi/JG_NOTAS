export const notesService = {
  // Obtener todas las notas
  getNotes() {
    const notes = localStorage.getItem("notes");
    return notes ? JSON.parse(notes) : [];
  },

  // Guardar una nueva nota
  saveNote(title, category, subNotes = []) {
    if (!title || typeof title !== "string") {
      throw new Error("Title is required and must be a string");
    }

    if (!category || typeof category !== "string") {
      throw new Error("Category is required and must be a string");
    }

    if (!Array.isArray(subNotes)) {
      throw new Error("subNotes must be an array");
    }

    const notes = this.getNotes();

    // Check if a note with the same title already exists
    const existingNote = notes.find((note) => note.title === title);
    if (existingNote) {
      throw new Error(`A note with the title "${title}" already exists`);
    }

    const newNote = {
      id: Date.now().toString(), // Adding unique ID based on timestamp
      title,
      category,
      createdAt: new Date().toISOString(),
      subNotes,
    };

    notes.push(newNote);
    localStorage.setItem("notes", JSON.stringify(notes));
    return newNote;
  },

  // Editar una nota
  editNote(title, updatedFields) {
    if (!updatedFields || typeof updatedFields !== "object") {
      throw new Error("Updated fields must be an object");
    }

    if (!title || typeof title !== "string") {
      throw new Error("title is required and must be a string");
    }

    const notes = this.getNotes();
    const noteIndex = notes.findIndex((note) => note.id === updatedFields.id);

    if (noteIndex === -1) {
      throw new Error(`Note with ID "${updatedFields.id}" not found`);
    } else {
      updatedFields.title = title;
    }

    // Actualizar los campos de la nota
    notes[noteIndex] = {
      ...notes[noteIndex],
      ...updatedFields,
    };

    localStorage.setItem("notes", JSON.stringify(notes));
    return notes[noteIndex];
  },

  // Eliminar una nota por su ID
  deleteNote(noteId) {
    if (!noteId || typeof noteId !== "string") {
      throw new Error("Note ID is required and must be a string");
    }

    const notes = this.getNotes();
    const noteIndex = notes.findIndex((note) => note.id === noteId);

    if (noteIndex === -1) {
      throw new Error(`Note with ID "${noteId}" not found`);
    }

    notes.splice(noteIndex, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    return true;
  },

  // Agregar una sub-nota a una nota específica
  addSubNote(noteId, subNote) {
    if (!noteId || typeof noteId !== "string") {
      throw new Error("Note ID is required and must be a string");
    }

    if (!subNote || typeof subNote !== "object") {
      throw new Error("Sub-note must be a valid object");
    }

    const notes = this.getNotes();
    const noteIndex = notes.findIndex((note) => note.id === noteId);

    if (noteIndex === -1) {
      throw new Error(`Note with ID "${noteId}" not found`);
    }

    // Agregar un ID único a la sub-nota
    subNote.id = Date.now().toString();

    // Agregar la sub-nota al array de sub-notas
    if (!notes[noteIndex].subNotes) {
      notes[noteIndex].subNotes = [];
    }
    notes[noteIndex].subNotes.push(subNote);

    localStorage.setItem("notes", JSON.stringify(notes));
    return subNote;
  },

  // Modificar una sub-nota específica
  editSubNote(noteId, subNoteId, updatedSubNote) {
    if (!noteId || typeof noteId !== "string") {
      throw new Error("Note ID is required and must be a string");
    }

    if (!subNoteId || typeof subNoteId !== "string") {
      throw new Error("Sub-note ID is required and must be a string");
    }

    if (!updatedSubNote || typeof updatedSubNote !== "object") {
      throw new Error("Updated sub-note must be a valid object");
    }

    const notes = this.getNotes();
    const noteIndex = notes.findIndex((note) => note.id === noteId);

    if (noteIndex === -1) {
      throw new Error(`Note with ID "${noteId}" not found`);
    }

    const subNoteIndex = notes[noteIndex].subNotes.findIndex(
      (sub) => sub.id === subNoteId
    );

    if (subNoteIndex === -1) {
      throw new Error(`Sub-note with ID "${subNoteId}" not found`);
    }

    // Modificar la sub-nota
    notes[noteIndex].subNotes[subNoteIndex] = {
      ...notes[noteIndex].subNotes[subNoteIndex],
      ...updatedSubNote,
      id: subNoteId, // Mantener el ID original
    };

    localStorage.setItem("notes", JSON.stringify(notes));
    return notes[noteIndex].subNotes[subNoteIndex];
  },

  // Eliminar una sub-nota específica
  deleteSubNote(noteId, subNoteId) {
    if (!noteId || typeof noteId !== "string") {
      throw new Error("Note ID is required and must be a string");
    }

    if (!subNoteId || typeof subNoteId !== "string") {
      throw new Error("Sub-note ID is required and must be a string");
    }

    const notes = this.getNotes();
    const noteIndex = notes.findIndex((note) => note.id === noteId);

    if (noteIndex === -1) {
      throw new Error(`Note with ID "${noteId}" not found`);
    }

    const subNoteIndex = notes[noteIndex].subNotes.findIndex(
      (sub) => sub.id === subNoteId
    );

    if (subNoteIndex === -1) {
      throw new Error(`Sub-note with ID "${subNoteId}" not found`);
    }

    // Eliminar la sub-nota
    notes[noteIndex].subNotes.splice(subNoteIndex, 1);

    localStorage.setItem("notes", JSON.stringify(notes));
    return true;
  },
};
