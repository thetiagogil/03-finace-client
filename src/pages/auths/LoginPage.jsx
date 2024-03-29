import "./Auths.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { username, password };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.status === 400) {
        const parsed = await response.json();

        if (parsed.message === "User not found") {
          setError("User not found. Please check your username.");
        } else if (parsed.message === "Invalid password") {
          setError("Invalid password. Please check your password.");
        } else {
          throw new Error(parsed.message);
        }
      }
      if (response.status === 200) {
        const parsed = await response.json();
        handleLogin(parsed.token);
        navigate(`/dashboard`);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <div className="auths-box">
        <Link to="/" className="auths-home-button">
          {"<"} back to home page
        </Link>

        <form onSubmit={handleSubmit} className="auths-form">
          <h2>Log in to Fin/Ace</h2>

          <div className="auths-form-inputs">
            <label>
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
                placeholder="Username"
              />
            </label>

            <label>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                type="password"
                placeholder="Password"
              />
            </label>
          </div>

          {error && <p className="auths-form-error-p">{error}</p>}

          <button>Log In</button>

          <div className="auths-true">
            <p>Not registered?</p>
            <Link to="/signup">
              <p>Create an account</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
