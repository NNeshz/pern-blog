import { Link, useLocation } from "react-router-dom";
import { publicLinks } from "./NavLink";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="flex px-10 py-5 justify-between items-center">
      <Link to="/">
        <h3 className="text-xl font-bold">RealBlog</h3>
      </Link>
      <ul className="flex gap-x-3">
        {publicLinks.map(({ path, name }) => (
          <li key={path}>
            <Link
              to={path}
              className={location.pathname === path ? "bg-zinc-900 px-3 py-2 rounded-md" : "px-3 py-2 rounded-md"}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
