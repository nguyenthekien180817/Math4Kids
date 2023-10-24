import React from "react";
import "./assets/styles/sectionSelection.css";
import { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const { base64Converter } = require("../../../util/Base64Converter");

function SectionSelection() {
  // const [backend, setBackend] = useState(null);
  // const [src, setSrc] = useState("");
  // useEffect(() => {
  //   fetch("http://localhost:4000/ly-thuyet")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setBackend(data.lessons);
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

  // useEffect(() => {
  //   if (backend == null) {
  //     const timer = setTimeout(() => {
  //       window.location.reload();
  //     }, 1000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [backend]);

  // let submit = () => {
  //   axios({
  //     method: "POST",
  //     url: "http://localhost:4000/ly-thuyet/store",
  //     data: src,
  //   });
  // };

  return (
    <div className="section">
      <h1>Toán kết nối chi thức:</h1>
      <div className="section">
        <a data-toggle="collapse" href="#ketnoi1">
          SÁCH GIÁO KHOA TOÁN 4 TẬP 1 KẾT NỐI TRI THỨC
        </a>
        <div className="collapse" id="ketnoi1">
          <Link to={"/ly-thuyet/ToanKetNoi1/5"}>
            Toan Ket Noi Tap 1 Trang 5
          </Link>
        </div>

        <a data-toggle="collapse" href="#ketnoi2">
          SÁCH GIÁO KHOA TOÁN 4 TẬP 2 KẾT NỐI TRI THỨC
        </a>
        <div className="collapse" id="ketnoi2">
          <Link to={"/ly-thuyet/ToanKetNoi2/6"}>
            Toan Ket Noi Tap 2 Trang 6
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SectionSelection;
