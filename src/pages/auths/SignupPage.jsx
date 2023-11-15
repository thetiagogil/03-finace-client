import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { firstname, lastname, username, email, password };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.status === 201) {
        await response.json();
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <div className="container">
        <h1>Signup</h1>

        <form onSubmit={handleSubmit}>
          <label>
            <input
              value={firstname}
              onChange={(event) => setFirstname(event.target.value)}
              required
              placeholder="first name"
            />
          </label>

          <label>
            <input
              value={lastname}
              onChange={(event) => setLastname(event.target.value)}
              required
              placeholder="last name"
            />
          </label>

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
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder="email"
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

          <button className="loginBtn" type="submit">
            Register
          </button>
        </form>
      </div>
  );
};

export default SignupPage;
