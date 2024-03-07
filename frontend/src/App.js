import "./blocks/App.css";
import SignUp from "./components/AuthenticationFormComponent";
import ProtectedRoute from "./components/ProtectedRouteComponent";
import Dashboard from "./components/Dashboard/DashboardComponent";
import { Routes, Route } from "react-router-dom";
import Main from "./components/MainComponent";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { checkUserToken } from "./utils/auth";
import { useDispatch } from "react-redux";
import { getUserData } from "./feature/UserSlice";

const App = () => {
  const jwtVerified = useRef(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      checkUserToken(jwt)
        .then(() => {
          jwtVerified.current = true;
          dispatch(getUserData());
          navigate("/dashboard");
        })
        .catch((error) => {
          console.error(error.message);
          navigate("/login");
        });
    }
  }, [navigate]);

  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<Main />} /> */}
        <Route path="/login" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute jwtVerified>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
