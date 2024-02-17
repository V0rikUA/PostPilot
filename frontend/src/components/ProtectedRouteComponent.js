import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, redirectPath, children, ...props }) => {
  console.log(isLoggedIn);
  return isLoggedIn ? children : <Navigate {...props} to={redirectPath} />;
};

export default ProtectedRoute;
