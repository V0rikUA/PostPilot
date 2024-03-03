import "./blocks/App.css";
import SignUp from "./components/AuthenticationFormComponent";
import ProtectedRoute from "./components/ProtectedRouteComponent";
import Dashboard from "./components/Dashboard/DashboardComponent";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Main from "./components/MainComponent";
import { useEffect } from "react";
import { setIsLoggedIn } from "./feature/AuthenticationSlice";
import { getUserData } from "./feature/UserSlice";
import LoadingComponent from "./components/LoadingComponent";

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("main");

  useEffect(() => {
    const fetchApi = () => {
      try {
        dispatch(setIsLoggedIn({ loggedIn: true }));
        dispatch(getUserData());
      } catch (error) {
        navigate("/");
      }
    };

    fetchApi();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<SignUp />} />
        <Route path="/" element={<Main />} />
        <Route
          path="/dashboard"
          element={
            // !isLoggedIn ? (
            //   <LoadingComponent />
            // ) : (
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Dashboard />
            </ProtectedRoute>
            // )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
