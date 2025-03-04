import { useNotes } from "./../Context/NotesContext";
import { Selector } from "./Selector";

export const ViewCategory = () => {
  const { config, selectedCategory, setSelectedCategory } = useNotes();

  return (
    <div className="w-full pr-2 pl-2">
      <Selector
        options={config.categories}
        onSelect={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};
