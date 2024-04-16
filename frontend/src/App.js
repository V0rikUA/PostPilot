import "./blocks/App.css";
import SignUp from "./components/AuthenticationFormComponent";
import ProtectedRoute from "./components/ProtectedRouteComponent";
import Dashboard from "./components/Dashboard/DashboardComponent";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { checkUserToken } from "./utils/auth";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "./feature/UserSlice";
import { setIsLoggedIn } from "./feature/AuthenticationSlice";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      checkUserToken(jwt)
        .then((response) => {
          if (response) logInSequence();
        })
        .catch((error) => {
          console.error(error.message);
          navigate("/login");
        });
    }
  }, []);

  const logInSequence = () => {
    dispatch(setIsLoggedIn(true));
    dispatch(getUserData());
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/");
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn]);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<SignUp />} />
        <Route
          path="/"
          element={
            <ProtectedRoute redirectPath="/login">
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
