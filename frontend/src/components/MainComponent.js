import { useNavigate } from "react-router-dom";
import FacebookLoginButton from "./FacebookLoginButton";

const Main = () => {
  const navigate = useNavigate();
  const handleOnClick = (e) => {
    navigate("/login");
  };

  return (
    <main>
      <h1>Main</h1>
      <button
        onClick={(e) => {
          handleOnClick(e);
        }}
      >
        Log In
      </button>
      <h1>Insta login</h1>
      <FacebookLoginButton />
    </main>
  );
};
export default Main;
