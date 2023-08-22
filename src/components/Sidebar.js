import React from "react";
import { useHistory, useLocation } from "react-router-dom";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Nav,
} from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  console.log("path", location.pathname);

  return (
    <>
      {location.pathname === "/embeddedApp" ? (
        <></>
      ) : (
        <>
          <nav id="nav" role="navigation">
            <div className="side-bar">
              <div className="slide-img">
                <svg
                  width="26"
                  height="27"
                  viewBox="0 0 26 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.25642 12.5642C6.7439 11.8455 4.91294 12.4844 4.19649 13.9218L0.295763 22.0675C-0.420696 23.5848 0.216156 25.4216 1.64907 26.1403C2.12671 26.3 2.52475 26.3799 3.00239 26.3799C4.11688 26.3799 5.15176 25.741 5.70901 24.7029L9.60973 16.637C10.3262 15.1197 9.68934 13.283 8.25642 12.5642Z"
                    fill="white"
                  />
                  <path
                    d="M25.6902 22.0676L15.7394 1.70343C15.023 0.186101 13.192 -0.452774 11.6795 0.34582C10.167 1.06456 9.5301 2.90132 10.3262 4.41865L20.277 24.703C20.8342 25.7411 21.8691 26.38 22.9836 26.38C23.4613 26.38 23.8593 26.3001 24.3369 26.0606C25.8495 25.3418 26.4067 23.5051 25.6902 22.0676Z"
                    fill="white"
                  />
                </svg>
              </div>

              <NavLink
                exact
                to="/home"
                activeClassName="active"
                className="slide-img home"
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26.8707 12.3894L16.8622 3.54997C15.7977 2.61249 14.2023 2.61249 13.1378 3.54997L3.12928 12.3894C2.44315 13.2557 3.42306 14.4226 4.37072 13.7948L14.3793 4.95529C14.7342 4.6431 15.2658 4.6431 15.6207 4.95529L23.4375 11.8594V24.342C23.4375 24.8598 23.0178 25.2795 22.5 25.2795H19.6875V14.967C19.6875 14.4493 19.2678 14.0295 18.75 14.0295H11.25C10.7322 14.0295 10.3125 14.4493 10.3125 14.967V22.467C10.3125 23.717 12.1875 23.717 12.1875 22.467V15.9045H17.8125V25.2795H7.5C6.98223 25.2795 6.5625 24.8598 6.5625 24.342V16.2808C6.5625 15.0309 4.6875 15.0309 4.6875 16.2808V24.342C4.68539 25.0884 4.98211 25.8045 5.51147 26.3306C6.03999 26.8563 6.75453 27.1524 7.5 27.1545H22.5C24.0531 27.1541 25.3121 25.8952 25.3125 24.342V13.515L25.6293 13.7948C26.5662 14.6224 27.8077 13.217 26.8707 12.3894Z"
                    fill="white"
                  />
                </svg>
              </NavLink>
              <NavLink
                exact
                to="/allcontacts"
                activeClassName="active"
                className="slide-img users"
              >
                <i className="fas fa-user-friends fa-2x"></i>
              </NavLink>
              <NavLink
                exact
                to="/settings"
                activeClassName="active"
                className="slide-img settings"
              >
                <i className="fas fa-cog fa-2x"></i>
              </NavLink>
            </div>
          </nav>
        </>
      )}
    </>
  );
};
export default Sidebar;
