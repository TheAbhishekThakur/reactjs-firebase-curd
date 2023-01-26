import React from "react";
import "./Layout.css";
import Header from "./Header";
import SideMenu from "./SideMenu";

function Layout({ children }) {
  const [toggle, setToggle] = React.useState(false);
  return (
    <>
      <Header setToggle={setToggle} />
      <SideMenu toggle={toggle} setToggle={setToggle} />
      {children}
    </>
  );
}

export default Layout;
