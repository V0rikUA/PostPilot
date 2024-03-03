import { Navigate } from "react-router-dom";
import LoadingComponent from "./LoadingComponent";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <LoadingComponent />;
};

export default ProtectedRoute;
