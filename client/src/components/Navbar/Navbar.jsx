import { Link, useLocation } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./Navigation.js";
import { Container } from "../ui";

import { useUser } from "../../context/userContext.jsx";

function Navbar() {
  const location = useLocation();
  const { isAuth, signout } = useUser();

  return (
    <Container>
      <nav className="flex justify-between pt-10">
        <div>
          <Link to="/" className="text-2xl font-bold">
            RealBlog
          </Link>
        </div>
        <div>
          <ul className="flex items-center gap-x-3">
            {isAuth
              ? <div className="flex items-center gap-x-3">
                {
                  privateRoutes.map(({ path, name }) => (
                    <li
                      key={name}
                      className={`text-white px-3 py-1 rounded-md text-center ${
                        location.pathname === path
                          ? "bg-indigo-800 hover:bg-indigo-700"
                          : "bg-zinc-900"
                      }`}
                    >
                      <Link to={path}>{name}</Link>
                    </li>
                  ))
                }
                <li>
                  <button className="text-white px-3 py-1 rounded-md text-center bg-red-500" onClick={() => signout()}>
                    Logout
                  </button>
                </li>
              </div>
              : publicRoutes.map(({ path, name }) => (
                  <li
                    key={name}
                    className={`text-white px-3 py-1 rounded-md text-center ${
                      location.pathname === path
                        ? "bg-indigo-800 hover:bg-indigo-700"
                        : "bg-zinc-900"
                    }`}
                  >
                    <Link to={path}>{name}</Link>
                  </li>
                ))}
          </ul>
        </div>
      </nav>
    </Container>
  );
}

export default Navbar;

{
  publicRoutes.map(({ name, path }) => (
    <li key={path}>
      <Link to={path} className="text-xl font-semibold">
        {name}
      </Link>
    </li>
  ));
}
