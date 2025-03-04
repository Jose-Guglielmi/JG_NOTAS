import { Bolt } from "lucide-react";
import { Link } from "react-router-dom";

export const Menu = () => {
  return (
    <nav className="flex justify-between m-4 ">
      <h1 className=" text-xl text-white">JG-Notas</h1>
      <Link to="/config">
        <Bolt color="#ffff" />
      </Link>
    </nav>
  );
};
