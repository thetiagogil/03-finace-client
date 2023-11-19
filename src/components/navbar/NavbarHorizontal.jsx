import "./Navbar.css";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const NavbarHorizontal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useContext(AuthContext);
  const [activeLink, setActiveLink] = useState("");

  // HANDLE LOG OUT
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate(`/login`);
    window.location.reload(false);
  };

  // HANDLE LOG OUT
  const handlePageHeader = () => {
    const activeLink = localStorage.getItem("activeLink");

    switch (activeLink) {
      case "dashboard":
        return <h2>DASHBOARD</h2>;
      case "overview":
        return <h2>OVERVIEW</h2>;
      case "transactions":
        return <h2>TRANSACTIONS</h2>;
      default:
        return <h2>FIN/ACE</h2>;
    }
  };

  // USE EFFECT SO THAT THE HEADER CHANGES WITH LOCATION
  useEffect(() => {
    const pathname = location.pathname;
    setActiveLink(pathname);
  }, [location]);

  return (
    <div>
      {!isAuthenticated && (
        <div className="hNavbar hNavbar-notAuth">
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
        <div className="hNavbar hNavbar-isAuth">
          {handlePageHeader()}

          <Link onClick={() => handleLogout()}>
            <button className="hNavbar-signup">logout</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavbarHorizontal;
