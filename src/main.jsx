import { createRoot } from "react-dom/client";
import { Inicio } from "./Screens/Inicio";
import { BrowserRouter } from "react-router-dom";
import { NotesProvider } from "./Context/NotesContext.jsx";
import "./index.css";
import { ViewSubNotes } from "./Components/ViewSubNotes.jsx";
import { Routes, Route } from "react-router-dom";
import { Configuration } from "./Screens/Configuration.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <NotesProvider>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/subnotes" element={<ViewSubNotes />} />
        <Route path="/config" element={<Configuration />} />
      </Routes>
    </NotesProvider>
  </BrowserRouter>
);
