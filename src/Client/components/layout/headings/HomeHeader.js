import React from "react";
import "./homeHeader.css";
import Carousel from "../carousel/Carousel.js";
import { useState } from "react";

function HomeHeader() {
  return (
    <div className="homeContainer">
      <Carousel />
    </div>
  );
}

export default HomeHeader;
