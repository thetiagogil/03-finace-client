import React, { useState } from "react";
import "./Navbar.css";
import finaceLogo from "../../assets/finace.logo.png";

const VerticalNavbar = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`vNav ${
        isHovered ? "vNav-hovered-style" : "vNav-default-style"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        <img src={finaceLogo} alt="Finance Logo" />
        {isHovered && <span className="vNav-name">Name</span>}
      </div>
    </div>
  );
};

export default VerticalNavbar;
