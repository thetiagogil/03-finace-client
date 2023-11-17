import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import finaceLogo from "../../assets/logo-finace.png";
import dashboardIcon from "../../assets/icon-dashboard.png";
import overviewIcon from "../../assets/icon-overview.png";
import transactionsIcon from "../../assets/icon-transactions.png";
import "./Navbar.css";

const NavbarVertical = () => {
  const [activeLink, setActiveLink] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    const storedActiveLink = localStorage.getItem("activeLink");
    if (storedActiveLink) {
      setActiveLink(storedActiveLink);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("activeLink", activeLink);
  }, [activeLink]);

  return (
    <div>
      {isAuthenticated && (
        <div
          className={`vNav ${
            isHovered ? "vNav-hovered-style" : "vNav-default-style"
          }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="vNav-sec-logo">
            <Link to="/">
              <img src={finaceLogo} alt="Finance Logo" />
              {isHovered && <h3>IN/ACE</h3>}
            </Link>
          </div>

          <div className="vNav-sec-bar" />

          <div
            className={`vNav-sec-icons ${
              activeLink === "dashboard" ? "vNav-sec-icons-active" : ""
            }`}
          >
            <Link to="/dashboard" onClick={() => setActiveLink("dashboard")}>
              <img src={dashboardIcon} alt="Dashboard Logo" />
              {isHovered && <span>DASHBOARD</span>}
            </Link>
          </div>

          <div
            className={`vNav-sec-icons ${
              activeLink === "overview" ? "vNav-sec-icons-active" : ""
            }`}
          >
            <Link to="/overview" onClick={() => setActiveLink("overview")}>
              <img src={overviewIcon} alt="Overview Logo" />
              {isHovered && <span>OVERVIEW</span>}
            </Link>
          </div>

          <div
            className={`vNav-sec-icons ${
              activeLink === "transactions" ? "vNav-sec-icons-active" : ""
            }`}
          >
            <Link
              to="/transactions"
              onClick={() => setActiveLink("transactions")}
            >
              <img src={transactionsIcon} alt="Transactions Logo" />
              {isHovered && <span>TRANSACTIONS</span>}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarVertical;
