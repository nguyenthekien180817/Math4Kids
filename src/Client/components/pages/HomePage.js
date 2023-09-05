import React from "react";
import HomeHeader from "../layout/headings/HomeHeader";
import Navbar from "../layout/navbar/Navbar";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
function HomePage() {
  let getUser = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/account/get-user",
    })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <HomeHeader />
    </div>
  );
}

export default HomePage;
