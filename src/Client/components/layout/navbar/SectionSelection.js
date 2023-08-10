import React from "react";
import "./assets/styles/sectionSelection.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

let chapters = [
  "Ôn tập các số đến 100 000",
  "Biểu thức có chứa một chữ",
  "Chương 3",
  "Chương 4",
  "Chương 5",
];

function SectionSelection() {
  const [backend, setBackend] = useState(null);
  const [removeData, setRemoveData] = useState("");
  useEffect(() => {
    fetch("http://localhost:4000/ly-thuyet")
      .then((response) => response.json())
      .then((data) => {
        setBackend(data.lessons);
      });
  }, []);
  console.log(removeData);
  return (
    <div className="sectionSelector">
      <h1>Toán Số</h1>
      <div className="section">
        {backend != null ? (
          backend.map((chapter, i) => {
            return (
              <div className="sectionCard">
                <Link to={`/ly-thuyet/${chapter.slug}`}>
                  <img src={chapter.thumbnail} />
                  <h1>{chapter.name}</h1>
                  <p>{chapter.description}</p>
                </Link>

                <form
                  method="post"
                  action={`http://localhost:4000/ly-thuyet/${removeData}?_method=DELETE`}
                >
                  <button
                    class="btn btn-primary"
                    type="submit"
                    onClick={(e) => {
                      e.stopPropagation();
                      setRemoveData(chapter.slug);
                    }}
                  >
                    Delete
                  </button>
                </form>
                <Link to={`/ly-thuyet/${chapter.slug}/edit`}>
                  <button class="btn btn-primary" type="submit">
                    Edit
                  </button>
                </Link>
              </div>
            );
          })
        ) : (
          <img src="https://howto.nsupport.asia/wp-content/uploads/2021/03/70515910726734841.jpg" />
        )}
      </div>
    </div>
  );
}

export default SectionSelection;
