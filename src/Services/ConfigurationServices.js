export const configService = {
  // Obtener la configuración actual
  getConfig() {
    const config = localStorage.getItem("config");

    if (!config) {
      const defaultConfig = {
        categories: ["Todas las notas"],
        FontSize: 25,
        DefaultCategory: "Todas las notas",
      };

      localStorage.setItem("config", JSON.stringify(defaultConfig));
      return defaultConfig;
    }

    return JSON.parse(config);
  },

  // Guardar la configuración
  saveConfig(config) {
    localStorage.setItem("config", JSON.stringify(config));
    return config;
  },

  // Añadir una nueva categoría
  addCategory(newCategory) {
    const config = this.getConfig();

    if (!config.categories.includes(newCategory)) {
      config.categories.push(newCategory);
      this.saveConfig(config);
      return true;
    }

    return false;
  },

  // Modificar el tamaño de fuente
  setFontSize(size) {
    const config = this.getConfig();
    const fontSize = parseInt(size);

    if (!isNaN(fontSize) && fontSize > 0) {
      config.FontSize = fontSize;
      this.saveConfig(config);
      return true;
    }

    return false;
  },

  // Cambiar la categoría por defecto
  setDefaultCategory(category) {
    const config = this.getConfig();

    if (config.categories.includes(category)) {
      config.DefaultCategory = category;
      this.saveConfig(config);
      return true;
    }

    return false;
  },
  // Borrar una categoría y mover sus notas a "Todas las notas"
  deleteCategory(categoryToDelete) {
    const config = this.getConfig();

    // No permitir borrar la categoría "Todas las notas"
    if (categoryToDelete === "Todas las notas") {
      return {
        success: false,
        message: "No se puede eliminar la categoría por defecto del sistema",
      };
    }

    // Verificar si la categoría existe
    if (!config.categories.includes(categoryToDelete)) {
      return { success: false, message: "La categoría no existe" };
    }

    // Si la categoría a eliminar es la categoría por defecto, cambiar a "Todas las notas"
    if (config.DefaultCategory === categoryToDelete) {
      config.DefaultCategory = "Todas las notas";
    }

    // Mover las notas de la categoría a eliminar a "Todas las notas"
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");

    notes.forEach((note) => {
      if (note.category === categoryToDelete) {
        note.category = "Todas las notas";
      }
    });

    // Guardar las notas actualizadas
    localStorage.setItem("notes", JSON.stringify(notes));

    // Filtrar la categoría a eliminar
    config.categories = config.categories.filter(
      (category) => category !== categoryToDelete
    );

    // Guardar la nueva configuración
    this.saveConfig(config);

    return {
      success: true,
      message:
        "Categoría eliminada correctamente. Las notas han sido movidas a 'Todas las notas'",
    };
  },
};
