import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
/*--------------------------- Uneeded Scrap  -----------------------------*/
function EssayPage() {
  const [id, setId] = useState("");
  const [time, setTime] = useState(10);
  let hello = () => {
    alert("Hello! I am an alert box!");
  };

  useEffect(() => {
    setTimeout(() => {
      setTime(time - 1);
    }, 1000);
    if (time == 0) {
      hello();
    }
  });
  return (
    <div style={{ marginTop: "100px" }}>
      <input
        placeholder="Nhập mã bài thi của bạn"
        onChange={(e) => setId(e.target.value)}
      />
      <button>
        <Link to={id}>Làm bài thi</Link>
      </button>

      <button onClick={() => hello()}>Click</button>
      <h1>{time}</h1>
    </div>
  );
}

export default EssayPage;
