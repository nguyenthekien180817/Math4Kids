import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function TheoryDetailPage() {
  const params = useParams();
  const [backend, setBackend] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:4000/ly-thuyet/${params.slug}`)
      .then((response) => response.json())
      .then((data) => {
        setBackend(data.course);
        console.log(data);
      });
  }, []);
  return (
    <div>
      {backend != null ? (
        <div style={{ marginTop: "100px" }}>
          <h1>
            Hello: <span /> {backend.name}
          </h1>
          <img src={backend.thumbnail} />
          <p>{backend.description}</p>
        </div>
      ) : (
        <div style={{ marginTop: "100px" }}>
          <h1>Loading</h1>
        </div>
      )}
    </div>
  );
}

export default TheoryDetailPage;
