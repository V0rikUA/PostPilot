import "./blocks/App.css";
import FacebookLoginButton from "./components/FacebookLoginButton";
import SignUp from "./components/AuthenticationFormComponent";
import ProtectedRoute from "./components/ProtectedRouteComponent";
import Dashboard from "./components/DashboardComponent";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Main from "./components/MainComponent";
import { useEffect } from "react";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      console.log(isLoggedIn);
      navigate("/dashboard");
    }
  }, [isLoggedIn]);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute redirectPath={"/login"} isLoggedIn={isLoggedIn}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
