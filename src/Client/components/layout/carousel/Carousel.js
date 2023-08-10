import React from "react";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./carousel.css";

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
      5000
    );

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [slide]);

  return (
    <div className="carouselContainer">
      <div className="carouselLeftField" onClick={handleLeftClick}>
        <FontAwesomeIcon className="carouselIcon" icon={faChevronLeft} />
      </div>
      <div className="carouselRightField" onClick={handleRightClick}>
        <FontAwesomeIcon className="carouselIcon" icon={faChevronRight} />
      </div>
      <div>
        <div>
          <h1>Slide số {slide}</h1>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
