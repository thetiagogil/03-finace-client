import "./Auths.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

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
      } else {
        setError("Sign Up failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container">
      <div className="auths-box">
        <Link to="/" className="auths-home-button">{"<"} back to home page</Link>

        <form onSubmit={handleSubmit} className="auths-form">
          <h2>Create an account</h2>

          <div className="auths-form-names">
            <label>
              <input
                value={firstname}
                onChange={(event) => setFirstname(event.target.value)}
                required
                placeholder="First name"
                className="auths-form-names-first"
              />
            </label>

            <label>
              <input
                value={lastname}
                onChange={(event) => setLastname(event.target.value)}
                required
                placeholder="Last name"
              />
            </label>
          </div>

          <div className="auths-form-inputs">
            <label>
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
                placeholder="Username"
              />
            </label>

            <label
              className={
                error && error.includes("email") ? "auths-form-error" : ""
              }
            >
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                placeholder="Email"
              />
            </label>

            <label
              className={
                error && error.includes("Password") ? "auths-form-error" : ""
              }
            >
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                type="password"
                placeholder="Password"
              />
            </label>

            <label
              className={
                error && error.includes("Password") ? "auths-form-error" : ""
              }
            >
              <input
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
                type="password"
                placeholder="Confirm Password"
              />
            </label>
          </div>

          {error && <p className="auths-form-error-p">{error}</p>}

          <button className="auths-button" type="submit">
            Sign Up
          </button>

          <div className="auths-true">
            <p>Already have an account?</p>
            <Link to="/login">
              <p>Log in</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
