import React from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";

import { useAuth } from "./UserContext";

const Navbar: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const { user, basketId, logout } = useAuth();
  console.log("Basket ID:", basketId);

  const toHome = () => {
    history.push("/home");
  };

  return (
    <nav className="navbar navbar-expand-sm" style={{ padding: "10px 10px" }}>
      <NavLink to="/home" className="navbar-brand">
        MuseMove
      </NavLink>
      <div className="navbar-collapse justify-content-end">
        <ul className="navbar-nav ml-auto">
          <div id="userDropdown" className="nav-item dropdown active">
            <a
              className="nav-link dropdown-toggle"
              id="userDropdownToggle"
              role="button"
            >
              {user ? (
                user.firstName
              ) : (
                <i className="fa fa-user" style={{ fontSize: "24px" }}></i>
              )}
            </a>
            <div className="dropdown-menu">
              {user ? (
                <a
                  className="dropdown-item"
                  onClick={() => {
                    logout();
                    toHome();
                  }}
                >
                  Log out
                </a>
              ) : (
                <NavLink
                  className="dropdown-item"
                  to={{
                    pathname: "/login",
                    state: { from: location.pathname }, // Pass the current pathname dynamically
                  }}
                >
                  Log in
                </NavLink>
              )}
            </div>
          </div>
          <div className="nav-item active">
            <NavLink className="nav-link" to={`/basket/${basketId}`}>
              <i
                className="fa fa-shopping-cart"
                style={{ fontSize: "24px" }}
              ></i>
            </NavLink>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
