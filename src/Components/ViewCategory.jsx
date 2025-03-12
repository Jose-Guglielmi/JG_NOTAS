import { useNotes } from "./../Context/NotesContext";
import { Selector } from "./Selector";

export const ViewCategory = () => {
  const { config, selectedCategory, setSelectedCategory } = useNotes();

  return (
    <div className="mb-5 bg-gray-700 rounded-lg p-1 m-2">
      <Selector
        options={config.categories}
        onSelect={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};
