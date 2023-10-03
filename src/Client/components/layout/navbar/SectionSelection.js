import React from "react";
import "./assets/styles/sectionSelection.css";
import { useRef, useState, useEffect, useCallback } from "react";
import pdfjs from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import { Link } from "react-router-dom";
import axios from "axios";

const { base64Converter } = require("../../../util/Base64Converter");

function SectionSelection() {
  const [backend, setBackend] = useState(null);
  const [removeData, setRemoveData] = useState("");
  const [src, setSrc] = useState("");
  useEffect(() => {
    fetch("http://localhost:4000/ly-thuyet")
      .then((response) => response.json())
      .then((data) => {
        setBackend(data.lessons);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (backend == null) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [backend]);

  let submit = () => {
    axios({
      method: "POST",
      url: "http://localhost:4000/ly-thuyet/store",
      data: src,
    });
  };

  return (
    <div className="section">
      <h1>Toán kết nối chi thức:</h1>
      <div className="section">
        <a data-toggle="collapse" href="#ketnoi1">
          SÁCH GIÁO KHOA TOÁN 4 TẬP 1 KẾT NỐI TRI THỨC
        </a>
        <div class="collapse" id="ketnoi1">
          <div>Hello</div>
        </div>

        <a data-toggle="collapse" href="#ketnoi2">
          SÁCH GIÁO KHOA TOÁN 4 TẬP 2 KẾT NỐI TRI THỨC
        </a>
        <div class="collapse" id="ketnoi2">
          <div>Hello</div>
        </div>
      </div>
    </div>
  );
}

export default SectionSelection;
