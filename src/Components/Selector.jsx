import { ChevronDown, ChevronUp, Flag } from "lucide-react";
import { useState } from "react";

export const Selector = ({ options, onSelect, selectedCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleSelect = (category) => {
    onSelect(category);
    setIsOpen(false);
  };

  return (
    <>
      <div
        className="p-6 bg-gray-800 rounded-lg shadow-md flex justify-between"
        onClick={() => {
          if (isOpen) {
            setIsOpen(false);
          } else setIsOpen(true);
        }}
      >
        {/* Título del selector */}
        <h2 className="text-lg font-bold text-center text-white ">
          {selectedCategory}
        </h2>
        {isOpen == true ? (
          <ChevronUp color="#ffff" size={30} />
        ) : (
          <ChevronDown color="#ffff" size={30} />
        )}
      </div>
      {isOpen == true ? (
        <div className=" p-1 bg-gray-800 rounded-lg shadow-md mt-2 ">
          {/* Contenedor de botones de idiomas */}
          <div className="space-y-3 flex flex-col">
            {options.map((category) => (
              <button
                key={category}
                onClick={() => handleSelect(category)}
                className={`  p-3 rounded-lg text-lg text-white`}
                aria-label={`Seleccionar idioma ${category}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
