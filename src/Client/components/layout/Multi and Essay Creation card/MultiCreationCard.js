import React from "react";
import { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Card.css";

function MultiCreationCard() {
  // console.log(index);
  const [answerA, setAnswerA] = useState("");
  const [answerB, setAnswerB] = useState("");
  const [answerC, setAnswerC] = useState("");
  const [answerD, setAnswerD] = useState("");
  const [questionAnswer, setQuestionAnswer] = useState("");
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
