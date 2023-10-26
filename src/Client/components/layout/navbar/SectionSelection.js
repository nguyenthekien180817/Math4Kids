import React from "react";
import "./assets/styles/sectionSelection.css";
import { useRef, useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const { base64Converter } = require("../../../util/Base64Converter");

function SectionSelection() {
  let params = useParams();
  const [backend, setBackend] = useState([]);
  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:4000/textbook/${params.bookname}`,
    }).then((response) => {
      setBackend(response.data);
      console.log(backend);
    });
  }, []);

  return (
    <div className="section">
      {console.log(backend)}
      {backend.map((data, index) => (
        <div className="lessonSection">
          <h3 data-toggle="collapse">{data.name}</h3>

          {data.lessons.map((lesson, i) => (
            <div className="collapse show">
              <Link
                to={`/ly-thuyet/textbook/${backend[index].slug}/${backend[index].pageNumber[i]}/${backend[index].tableOfContents}/${backend[index].numberOfCover}`}
              >
                <FontAwesomeIcon style={{ height: "10px" }} icon={faPlay} /> Bài{" "}
                {i + 1}: {lesson}
              </Link>
            </div>
          ))}
        </div>
      ))}
      {backend.length > 0 && <img src={backend[0].thumbnail} />}
    </div>
  );
}

export default SectionSelection;
