import logo from "./logo.svg";
import "./App.css";
import FacebookLoginButton from "./components/FacebookLoginButton";

const appID = 923468098972476;
function App() {
  return (
    <div className="App">
      <FacebookLoginButton appId={appID} />
    </div>
  );
}

export default App;
