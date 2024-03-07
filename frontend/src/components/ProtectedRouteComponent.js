import LoadingComponent from "./LoadingComponent";

const ProtectedRoute = ({ jwtVerified, children }) => {
  return jwtVerified ? children : <LoadingComponent />;
};

export default ProtectedRoute;
