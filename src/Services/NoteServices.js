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
};
