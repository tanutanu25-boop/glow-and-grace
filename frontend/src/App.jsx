
import { useState } from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Footer from "./components/Footer";

function App() {
  const [user, setUser] = useState(() => {
    try {
      if (!localStorage.getItem("glowGraceToken")) {
        return null;
      }

      return (
        JSON.parse(
          localStorage.getItem("glowGraceUser")
        ) || null
      );
    } catch {
      return null;
    }
  });

  function handleLogin(data) {
    localStorage.setItem("glowGraceToken", data.token);

    localStorage.setItem(
      "glowGraceUser",
      JSON.stringify(data.user)
    );

    setUser(data.user);
  }

  function handleLogout() {
    localStorage.removeItem("glowGraceToken");
    localStorage.removeItem("glowGraceUser");

    setUser(null);
  }

  return (
    <Routes>
      {/* Login Page */}
      <Route
        path="/login"
        element={
          user ? (
            <Navigate to="/home" replace />
          ) : (
            <Login onLogin={handleLogin} />
          )
        }
      />

      {/* Signup Page */}
      <Route
        path="/signup"
        element={
          user ? (
            <Navigate to="/home" replace />
          ) : (
            <Signup />
          )
        }
      />

      {/* Home Page with Footer */}
      <Route
        path="/home"
        element={
          user ? (
            <>
              <Home
                user={user}
                onLogout={handleLogout}
              />

              <Footer />
            </>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Redirect Unknown Routes */}
      <Route
        path="*"
        element={
          <Navigate
            to={user ? "/home" : "/login"}
            replace
          />
        }
      />
    </Routes>
  );
}

export default App;
