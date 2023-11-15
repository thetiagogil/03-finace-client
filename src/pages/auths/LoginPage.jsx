import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
        throw new Error(parsed.message);
      }
      if (response.status === 200) {
        const parsed = await response.json();
        handleLogin(parsed.token);
        navigate(`/`);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <div className="container">
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <label>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
              placeholder="username"
            />
          </label>

          <label>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              type="password"
              placeholder="password"
            />
          </label>

          <button type="submit">
            Log In
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
