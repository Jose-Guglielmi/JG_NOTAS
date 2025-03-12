import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Selector = ({ options, onSelect, selectedCategory }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (category) => {
    onSelect(category);
    setIsOpen(false);
  };

  return (
    <>
      <div
        className="p-6 bg-gray-900 rounded-lg shadow-md flex justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Título del selector */}
        <h2 className="text-lg font-bold text-center text-white">
          {selectedCategory}
        </h2>
        {isOpen ? (
          <ChevronUp color="#fff" size={30} />
        ) : (
          <ChevronDown color="#fff" size={30} />
        )}
      </div>

      {/* Animación al abrir/cerrar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="p-1 rounded-lg shadow-md mt-2 overflow-hidden"
          >
            <div className="space-y-3 flex flex-col">
              {options.map((category) => (
                <button
                  key={category}
                  onClick={() => handleSelect(category)}
                  className={`p-3 rounded-lg text-lg text-white transition-all duration-300 ${
                    category === selectedCategory
                      ? "bg-gray-800"
                      : "bg-gray-900 hover:bg-gray-800"
                  }`}
                  aria-label={`Seleccionar categoría ${category}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
