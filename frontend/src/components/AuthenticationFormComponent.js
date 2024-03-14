import { useEffect, useState } from "react";
import logo from "../assets/logo.svg";
import logoText from "../assets/logo-text.svg";
import leftTop from "../assets/auth-images/left-top.png";
import leftBottom from "../assets/auth-images/left-botom.png";
import rightTop from "../assets/auth-images/right-top.png";
import rightBotom from "../assets/auth-images/right-bottom.png";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsLoggedIn,
  signIn,
  submitNewUser,
} from "../feature/AuthenticationSlice";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [formButton, setFormButton] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  async function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = input;
    switch (formButton) {
      case "sign_in":
        try {
          dispatch(signIn({ email, password }));
        } catch {
          setLoginError(true);
        }
        break;
      case "sign_up":
        dispatch(
          submitNewUser({
            email,
            password,
          })
        );
        break;
      case "reset":
        break;

      default:
        break;
    }
  }

  return (
    <div className="auth">
      <img
        className="auth__background-images top-left"
        src={leftTop}
        alt='"Animated character joyfully sliding down a giant mobile phone, surrounded with chat bubbles, depicting social communication or mobile entertainment.'
      />
      <img
        className="auth__background-images bottom-left"
        src={leftBottom}
        alt="Illustration of a person with a pencil poised above a target on a large red heart, symbolizing precision or targetting in love or passion."
      />
      <img
        className="auth__background-images top-right"
        src={rightTop}
        alt="Colorful illustration of two characters, one pointing forward, with a large graduation cap and clipboard in the background, symbolizing forward planning and educational achievements."
      />
      <img
        className="auth__background-images bottom-right"
        src={rightBotom}
        alt="Illustration of a man next to a large task checklist with a green checkmark indicating a completed task, representing task completion or project management."
      />

      <div className="auth__logo-container">
        <img
          src={logo}
          alt="logo of the app"
          className="logo-container__logo"
        />
        <img
          src={logoText}
          alt="text in logo that says 'PostPilot'"
          className="logo-container__logo-text"
        />
      </div>
      <form className="auth__form" onSubmit={(e) => handleSubmit(e)}>
        <input
          onChange={(e) => handleInput(e)}
          id="email"
          type="email"
          name="email"
          className="form__email-input input"
          required
          placeholder="Enter your e-mail"
        />

        <input
          onChange={(e) => handleInput(e)}
          name="password"
          type="password"
          minLength={8}
          maxLength={16}
          required
          placeholder="password"
          className="form__password-input input"
        />

        <div className={`auth__form__error ${loginError ? "display" : ""}`}>
          Incorrect password or email
        </div>

        <button
          className="form__button_sign-in"
          name="sign_in"
          onClick={(e) => setFormButton(e.currentTarget.name)}
        >
          SIGN IN
        </button>
        <button
          className="form__button_sign-up form__button_secondary"
          name="sign_up"
          onClick={(e) => setFormButton(e.currentTarget.name)}
        >
          SIGN UP
        </button>
        <button
          className="form__button_pass-reset form__button_secondary"
          name="reset"
          onClick={(e) => setFormButton(e.currentTarget.name)}
          disabled
        >
          Forgot your password?
        </button>
        {}
      </form>
    </div>
  );
};

export default SignUp;
