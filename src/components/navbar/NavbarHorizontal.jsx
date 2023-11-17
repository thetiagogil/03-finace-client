import "./Navbar.css";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const NavbarHorizontal = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate(`/login`);
    window.location.reload(false);
  };

  return (
    <div>
      {!isAuthenticated && (
        <div className="hNavbar">
          <div>
            <Link to={"/login"}>
              <button className="hNavbar-login">Log In</button>
            </Link>
          </div>

          <div>
            <Link to={"/signup"}>
              <button className="hNavbar-signup">Sign Up</button>
            </Link>
          </div>
        </div>
      )}

      {isAuthenticated && (
        <div className="hNavbar">
          <Link onClick={() => handleLogout()}>
            <button className="hNavbar-signup">logout</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavbarHorizontal;
