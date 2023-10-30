import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
/*--------------------------- Uneeded Scrap  -----------------------------*/
function MultiChoicePage() {
  const [id, setId] = useState("");

  return (
    <div className="essayIdInputField">
      <h1 style={{ fontWeight: "bold" }}>KIỂM TRA TRẮC NGHIỆM</h1>

      <input
        placeholder="Nhập mã bài thi của bạn"
        onChange={(e) => setId(e.target.value)}
        id="id"
      />

      <Link className="btn btn-primary" to={id}>
        Làm bài thi
      </Link>
    </div>
  );
}

export default MultiChoicePage;
