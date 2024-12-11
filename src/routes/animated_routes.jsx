import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import "../styles/globals.css";
import "../styles/style.css";
import "../styles/slideshow.css";
import Landing from "../page/landing";
import useUserHook from "../hooks/UserHook";
import React, { Suspense, useEffect, useState } from "react";
import LoadingScreen from "../page/loading_screen";

const StartPage = React.lazy(() => import("../StartPage.jsx"));

/**
 * Protected Routes
 *
 * @param {children} component
 * @returns {component}
 */
const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { reauthenticate } = useUserHook();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthentication = async () => {
    reauthenticate((status, message) => {
      setLoading(false);
      if (status === 200) {
        setIsAuthenticated(true);
        if (location.state) {
          return navigate(
            location.pathname.includes("login") ? redirect : location.pathname,
            { state: location.state }
          );
        }

        return setTimeout(() => {
          navigate(
            location.pathname.includes("login") ? redirect : location.pathname
          );
        }, 500);
      }

      setIsAuthenticated(false);
      navigate("/login");
    });
  };

  useEffect(() => {
    if (loading) {
      checkAuthentication();
    }
  }, [loading]);

  if (loading) {
    return <LoadingScreen />;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AnimatedRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingScreen />}>
        <div className="landing-page-desktop">
          <Routes>
            <Route path="/" element={<Landing />} />

            <Route
              path="/StartPage"
              element={
                <ProtectedRoutes>
                  <StartPage />
                </ProtectedRoutes>
              }
            />
            {/* <Route
              path="/"
              element={
                <ProtectedRoutes>
                  <Dashboard />
                </ProtectedRoutes>
              }
            /> */}
          </Routes>
        </div>
      </Suspense>
    </Router>
  );
};

export default AnimatedRoutes;
