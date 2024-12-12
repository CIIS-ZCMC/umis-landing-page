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
import Login from "../page/Auth/Login.jsx";
import {
  ACTION_ASSIGN_NEW_PASSWORD,
  ACTION_FORGOT_PASSWORD,
  ACTION_INPUT_OTP,
  ACTION_SIGN_IN,
} from "../utils/config.jsx";
import ForgotPassword from "../page/Auth/ForgotPassword.jsx";
import OTPVerification from "../page/Auth/OTPVerification.jsx";
import NewPassword from "../page/Auth/NewPassword.jsx";

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
            <Route path="/login" element={<Landing />} />
            <Route path={`/${ACTION_SIGN_IN}`} element={<Login />} />
            <Route
              path={`/${ACTION_FORGOT_PASSWORD}`}
              element={<ForgotPassword />}
            />
            <Route
              path={`/${ACTION_INPUT_OTP}`}
              element={<OTPVerification />}
            />
            <Route
              path={`/${ACTION_ASSIGN_NEW_PASSWORD}`}
              element={<NewPassword />}
            />

            <Route
              path="/"
              element={
                <ProtectedRoutes>
                  <StartPage />
                </ProtectedRoutes>
              }
            />
          </Routes>
        </div>
      </Suspense>
    </Router>
  );
};

export default AnimatedRoutes;
