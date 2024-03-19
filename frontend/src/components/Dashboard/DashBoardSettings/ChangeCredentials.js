import { useState } from "react";
import { updatePassword } from "../../../utils/auth";

const ChangeCredentials = () => {
  const [password, setPassword] = useState({ password: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("jwt");

    updatePassword(token, password).catch((error) => console.error(error));
  }
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form className="auth__form" onSubmit={(e) => handleSubmit(e)}>
          <input
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
            minLength={8}
            maxLength={16}
            required
            placeholder="password"
            className="form__password-input input"
          />

          <button className="" name="sign_in">
            change password
          </button>

          {}
        </form>
      </div>
    </>
  );
};

export default ChangeCredentials;
