import React from "react";
import { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Card.css";
import { IndexContext } from "../../pages/CreateMultiTestPage";

function MultiCreationCard() {
  let index = useContext(IndexContext);
  return (
    <div className="multiquestionCard">
      <input placeholder="Nội dung câu hỏi" name="question" />
      <input placeholder="Đáp án A" name="answersA" />
      <input placeholder="Đáp án B" name="answersB" />
      <input placeholder="Đáp án C" name="answersC" />
      <input placeholder="Đáp án D" name="answersD" />
      <input placeholder="Đáp án đúng" name="correctAnswer" />
    </div>
  );
}

export default MultiCreationCard;
