import { Routes, Route, Outlet } from "react-router-dom";
import { useUser } from "./context/userContext";
import { BlogProvider } from "./context/blogContext";

import Landing from "./pages/Landing";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";

import Navbar from "./components/Navbar/Navbar";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  const { isAuth, loading } = useUser();

  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoute isAllowed={!isAuth} redirectTo="/home" />}>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<ProtectedRoute isAllowed={isAuth} redirectTo="/login" />}>
          <Route element={<BlogProvider><Outlet /></BlogProvider>}>
            <Route path="/home" element={<Home />} />
            {/* Todas las rutas que necesiten autenticación */}
          </Route>
          <Route path="/profile" element={<h1>Profile</h1>} />
        </Route>
        {/* Not found */}
      </Routes>
    </div>
  );
}

export default App;
