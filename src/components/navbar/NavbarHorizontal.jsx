import { Link, useNavigate } from "react-router-dom";
import LoginPage from "../../pages/auths/LoginPage";

const NavbarHorizontal = () => {
/*   const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate(`/login`);
    window.location.reload(false);
  }; */

  return (
    <div>
      <Link to={"/login"}>login</Link>
    </div>
  );
};

export default NavbarHorizontal;
