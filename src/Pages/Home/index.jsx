import React from "react";
import "./home.scss";

import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/Navbar";

function Home() {
  return (
    <div className="home">
      <Sidebar />
      <div className="home-container">
        <Navbar />
        Container
      </div>
    </div>
  );
}

export default Home;
