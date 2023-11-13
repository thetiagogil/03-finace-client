import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Navbar = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showCheckbox, setshowCheckbox] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate(`/login`);
    window.location.reload(false);
  };

  return (
    <>
      <div className="Navbar">
        <NavbarExpand
          handleLogout={handleLogout}
          showCheckbox={showCheckbox}
          setshowCheckbox={setshowCheckbox}
          isAuthenticated={isAuthenticated}
        />
      </div>
    </>
  );
};

export default Navbar;
