import { Link } from "react-router-dom";

const NavbarHorizontal = () => {
  /*   const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate(`/login`);
    window.location.reload(false);
  }; */

  return (
    <div className="hNavbar">
      <div>
        <Link to={"/login"}>
          <button>login</button>
        </Link>
      </div>

      <div>
        <Link to={"/signup"}>
          <button>signup</button>
        </Link>
      </div>
    </div>
  );
};

export default NavbarHorizontal;
