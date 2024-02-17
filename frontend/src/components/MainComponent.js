import { useNavigate } from "react-router-dom";

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
    </main>
  );
};
export default Main;
