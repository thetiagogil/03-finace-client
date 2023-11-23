import "./Navbar.css";
import dropdownIcon from "../../assets/icon-dropdown.png";
import finaceLogo from "../../assets/logo-finace.png";
import dashboardIcon from "../../assets/icon-dashboard.png";
import overviewIcon from "../../assets/icon-overview.png";
import transactionsIcon from "../../assets/icon-transactions.png";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const NavbarVertical = () => {
  const [activeLink, setActiveLink] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  // DROPDOWN LISTS
  const [overviewDropdown, setOverviewDropdown] = useState(false);
  const [transactionsDropdown, setTransactionsDropdown] = useState(false);
  const [selectedOverview, setSelectedOverview] = useState("tracked");
  const [selectedTransactions, setSelectedTransactions] = useState("tracked");
  const [overviewDropdownRotation, setOverviewDropdownRotation] =
    useState(false);
  const [transactionsDropdownRotation, setTransactionsDropdownRotation] =
    useState(false);

  // HANDLE DROPDOWN TOGGLE
  const handleOverviewDropdownToggle = () => {
    setOverviewDropdown(!overviewDropdown);
    setOverviewDropdownRotation(!overviewDropdownRotation);
  };

  const handleTransactionsDropdownToggle = () => {
    setTransactionsDropdown(!transactionsDropdown);
    setTransactionsDropdownRotation(!transactionsDropdownRotation);
  };

  // HANDLE ACTIVE PAGES
  const handleOverviewSelection = (option) => {
    setSelectedOverview(option);
    setOverviewDropdown(false);
    setOverviewDropdownRotation(false);
    setTransactionsDropdownRotation(false);
  };

  const handleTransactionsSelection = (option) => {
    setSelectedTransactions(option);
    setTransactionsDropdown(false);
    setOverviewDropdownRotation(false);
    setTransactionsDropdownRotation(false);
  };

  const handleHomeClick = () => {
    setActiveLink("");
  };

  // HANDLE NAVBAR OPEN/CLOSE
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setOverviewDropdown(false);
    setTransactionsDropdown(false);
    setOverviewDropdownRotation(false);
    setTransactionsDropdownRotation(false);
  };

  // USE EFFECTS
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
          {/* FINACE LOGO */}
          <section className="vNav-sec-logo">
            <Link to="/" onClick={() => handleHomeClick()}>
              <img src={finaceLogo} alt="Finance Logo" />
              {isHovered && <h3>IN/ACE</h3>}
            </Link>
          </section>

          <div className="vNav-sec-bar" />

          {/* DASHBOARD ICON */}
          <section
            className={`vNav-sec-icons ${
              activeLink === "dashboard" ? "vNav-sec-icons-active" : ""
            }`}
          >
            <Link to="/dashboard" onClick={() => setActiveLink("dashboard")}>
              <img src={dashboardIcon} alt="Dashboard Logo" />
              {isHovered && (
                <span className="vNav-sec-icons-hidden-span-main">
                  DASHBOARD
                </span>
              )}
            </Link>
          </section>

          {/* OVERVIEW ICON */}
          <section>
            <div
              className={`vNav-sec-icons ${
                activeLink === "overview" ? "vNav-sec-icons-active" : ""
              }`}
            >
              <Link>
                <img src={overviewIcon} alt="Overview Logo" />
                {isHovered && (
                  <div className="vNav-sec-icons-hidden">
                    <span className="vNav-sec-icons-hidden-span-main">
                      OVERVIEW
                    </span>
                    <button
                      onClick={handleOverviewDropdownToggle}
                      className="vNav-sec-icons-hidden-button"
                    >
                      <img
                        src={dropdownIcon}
                        className={
                          overviewDropdownRotation
                            ? "vNav-sec-icons-hidden-button-rotate"
                            : ""
                        }
                        alt="Dropdown Arrow"
                      />
                    </button>
                  </div>
                )}
              </Link>
            </div>

            {overviewDropdown && (
              <section>
                <div className="vNav-sec-icons">
                  <Link
                    to={"/overview/tracked"}
                    onClick={() => {
                      handleOverviewSelection("tracked");
                      setActiveLink("overview");
                    }}
                  >
                    <span className="vNav-sec-icons-hidden-span-secondary">
                      Tracked Overview
                    </span>
                  </Link>
                </div>

                <div className="vNav-sec-icons">
                  <Link
                    to={"/overview/planned"}
                    onClick={() => {
                      handleOverviewSelection("planned");
                      setActiveLink("overview");
                    }}
                  >
                    <span className="vNav-sec-icons-hidden-span-secondary">
                      Planned Overview
                    </span>
                  </Link>
                </div>
              </section>
            )}
          </section>

          {/* TRANSACTIONS ICON */}
          <section>
            <div
              className={`vNav-sec-icons ${
                activeLink === "transactions" ? "vNav-sec-icons-active" : ""
              }`}
            >
              <Link>
                <img src={transactionsIcon} alt="Transactions Logo" />
                {isHovered && (
                  <div className="vNav-sec-icons-hidden">
                    <span className="vNav-sec-icons-hidden-span-main">
                      TRANSACTIONS
                    </span>{" "}
                    <button
                      onClick={handleTransactionsDropdownToggle}
                      className="vNav-sec-icons-hidden-button"
                    >
                      <img
                        src={dropdownIcon}
                        className={
                          transactionsDropdownRotation
                            ? "vNav-sec-icons-hidden-button-rotate"
                            : ""
                        }
                        alt="Dropdown Arrow"
                      />
                    </button>
                  </div>
                )}
              </Link>
            </div>

            {transactionsDropdown && (
              <div>
                <div className="vNav-sec-icons">
                  <Link
                    to={"/transactions/tracked"}
                    onClick={() => {
                      handleTransactionsSelection("tracked");
                      setActiveLink("transactions");
                    }}
                  >
                    <span className="vNav-sec-icons-hidden-span-secondary">
                      Tracked Transactions
                    </span>
                  </Link>
                </div>

                <div className="vNav-sec-icons">
                  <Link
                    to={"/transactions/planned"}
                    onClick={() => {
                      handleTransactionsSelection("planned");
                      setActiveLink("transactions");
                    }}
                  >
                    <span className="vNav-sec-icons-hidden-span-secondary">
                      Planned Transactions
                    </span>
                  </Link>
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default NavbarVertical;
