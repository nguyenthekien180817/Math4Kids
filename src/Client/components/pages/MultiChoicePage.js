import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
/*--------------------------- Uneeded Scrap  -----------------------------*/
function MultiChoicePage() {
  const [id, setId] = useState("");

  return (
    <div style={{ marginTop: "100px" }}>
      <input
        placeholder="Nhập mã bài thi của bạn"
        onChange={(e) => setId(e.target.value)}
      />
      <button>
        <Link to={id}>Làm bài thi</Link>
      </button>
    </div>
  );
}

export default MultiChoicePage;
