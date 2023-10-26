import React, { useState, useEffect } from "react";
import "../layout/Theory Pages/TheoryPage.css";
import axios from "axios";
import { Link } from "react-router-dom";

function TheoryPage() {
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
    <>
      <h1>Các bộ sách toán hiện nay:</h1>
      <div className="theoryContainer">
        {/* {<SectionSelection />} */}

        {backend.map((data) => (
          <div className="textbookContainer">
            <div className="textbookCard">
              <Link
                style={{ textDecoration: "none" }}
                to={`textbook/${data.slug}`}
              >
                <img src={data.thumbnail} />
              </Link>
              <Link
                style={{ textDecoration: "none" }}
                to={`textbook/${data.slug}`}
                className="bookname"
              >
                <p>{data.name}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default TheoryPage;
