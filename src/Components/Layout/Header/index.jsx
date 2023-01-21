import React from "react";
import "./Header.css";
import { GrLanguage } from "react-icons/gr";
import { BsFillMoonFill } from "react-icons/bs";
import { MdNotificationsActive } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  return (
    <header className="header-con">
      <div className="container-fluid">
        <div className="row text-center">
          <div className="col-md-2">
            <div className="logo">AbhishekAdmin</div>
          </div>
          <div className="col-md-3">
            <div className="search">
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
              />
            </div>
          </div>
          <div className="col-md-4"></div>
          <div className="col-md-3">
            <div className="list">
              <div className="list-item">
                <GrLanguage style={{ color: "white" }} />
                English
              </div>
              <div className="list-item">
                <BsFillMoonFill />
              </div>
              <div className="list-item">
                <MdNotificationsActive />
              </div>
              <div className="list-item">
                <CgProfile />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
