import React from "react";
import Lambaithi from "../layout/carousel/Carousel IMG/LamBaiThi.jpg";
import HuongDan from "../layout/carousel/Carousel IMG/HuongDan.jpg";
import TracNghiem from "../layout/carousel/Carousel IMG/TracNghiem.jpg";
import SachGiaoKhoa from "../layout/carousel/Carousel IMG/SGK.jpg";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "../layout/carousel/carousel.css";
import { Link } from "react-router-dom";
import axios from "axios";

const carouselData = [
  {
    index: 0,
    header: "Hướng dẫn sử dụng",
    imageSrc: HuongDan,
    link: "huong-dan",
    class: "floatLeft",
    button: "Đến trang hướng dẫn",
    text: "Hướng dẫn chi tiết ",
  },
  {
    index: 0,
    header: "Lý Thuyết",
    imageSrc: SachGiaoKhoa,
    link: "/ly-thuyet",
    class: "floatLeft",
    button: "Đến trang lý thuyết",
    text: "Lý thuyết đầy đủ từ 3 bộ sách giáo khoa đang được sử dụng hiện nay",
  },
  {
    index: 2,
    header: "Kiểm Tra Tự Luận",
    imageSrc: Lambaithi,
    link: "/tu-luan",
    class: "floatRight",
    button: "Làm bài kiểm tra",
    text: "Làm bài kiểm tra mọi lúc, mọi nơi",
  },
  {
    index: 3,
    header: "Kiểm Tra Trắc Nghiệm",
    imageSrc: TracNghiem,
    link: "/trac-nghiem",
    class: "floatRight",
    button: "Làm bài kiểm tra",
    text: "Làm bài kiểm tra mọi lúc, mọi nơi",
  },
];

function HomePage() {
  const timeoutRef = useRef();
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/account/get-user",
    })
      .then((response) => {
        console.log(response.data);
        setLogin(true);
      })
      .catch((err) => {});
  }, []);

  const [slide, setSlide] = useState(1);
  let handleLeftClick = () => {
    if (slide != 1) {
      setSlide(slide - 1);
    } else {
      setSlide(carouselData.length);
    }
  };

  let handleRightClick = () => {
    if (slide != carouselData.length) {
      setSlide(slide + 1);
    } else {
      setSlide(1);
    }
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(
      () => setSlide((index) => (index == carouselData.length ? 1 : index + 1)),
      3000
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

      {carouselData.map((data, i) => (
        <>
          <div
            className={
              i + 1 == slide
                ? `carouselItem ${data.class}`
                : "carouselItem hidden"
            }
          >
            <img src={data.imageSrc} />
            <h1 className="carouselHeader">{data.header}</h1>
            <p>{data.text}</p>
          </div>
          <Link
            className={
              i + 1 == slide ? `btn btn-primary` : "carouselItem hidden"
            }
            to={data.link}
            onClick={() => {
              if (data.button == "Làm bài kiểm tra" && isLogin == false) {
                alert("Bạn cần đăng nhập trước khi làm bài kiểm tra");
              }
            }}
          >
            {data.button}
          </Link>
        </>
      ))}
    </div>
  );
}

export default HomePage;
