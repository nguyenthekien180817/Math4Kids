import React from "react";
import "./assets/styles/sectionSelection.css";
import { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const { base64Converter } = require("../../../util/Base64Converter");

function SectionSelection() {
  const [backend, setBackend] = useState([]);
  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:4000/textbook",
    }).then((response) => {
      setBackend(response.data);
      console.log(backend);
    });
  }, []);

  return (
    <div className="section">
      {backend.map((data, index) => (
        <>
          <div className="section">
            <h3 data-toggle="collapse" href={`#${data.slug}`}>
              {data.name}
            </h3>
            <div className="collapse" id={`${data.slug}`}>
              {data.lessons.map((lesson, i) => (
                <Link
                  to={`/ly-thuyet/ToanKetNoi1/${backend[index].pageNumber[i]}`}
                >
                  Bài {i + 1}: {lesson}
                </Link>
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
}

export default SectionSelection;
