import React from "react";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./carousel.css";
import Lambaithi from "./Carousel IMG/LamBaiThi.jpg";
import HuongDan from "./Carousel IMG/HuongDan.jpg";

function Carousel() {
  const timeoutRef = useRef();
  const slides = [1, 2, 3, 4];
  const [slide, setSlide] = useState(1);
  let handleLeftClick = () => {
    if (slide != 1) {
      setSlide(slide - 1);
    } else {
      setSlide(slides.length);
    }
  };

  let handleRightClick = () => {
    if (slide != slides.length) {
      setSlide(slide + 1);
    } else {
      setSlide(1);
    }
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(
      () => setSlide((index) => (index == slides.length ? 1 : index + 1)),
      3000
    );

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [slide]);

  let checkVisible = (e) => {
    console.log(slide);
    return e.currentTarget.id == slide ? "carouselItem" : "carouselItem hidden";
  };

  return (
    <div className="carouselContainer">
      <div className="carouselLeftField" onClick={handleLeftClick}>
        <FontAwesomeIcon className="carouselIcon" icon={faChevronLeft} />
      </div>
      <div className="carouselRightField" onClick={handleRightClick}>
        <FontAwesomeIcon className="carouselIcon" icon={faChevronRight} />
      </div>

      <div id="1" className="carouselItem">
        <img src={Lambaithi} />
        <h1 className="carouselHeader">Slide số {slide}</h1>
      </div>
      {/* 
      <div id="2" className={this.checkVisible(e)}>
        <img src={HuongDan} />
        <h1>Slide số {slide}</h1>
      </div> */}
    </div>
  );
}

export default Carousel;
