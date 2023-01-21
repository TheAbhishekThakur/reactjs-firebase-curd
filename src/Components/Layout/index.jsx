import React from "react";
import "./Layout.css";
import Header from "./Header";
import SideMenu from "./SideMenu";

function Layout({ children }) {
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <Header />
        </div>
      </div>
      <div className="row">
        <div className="col-2" style={{ paddingRight: "0px" }}>
          <SideMenu />
        </div>
        <div className="col-10 layout">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
