import React from "react";
import { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Card.css";

import {
  IndexContext,
  handleInputContext,
} from "../../pages/CreateMultiTestPage";

function MultiCreationCard() {
  let index = useContext(IndexContext);
  let handleInput = useContext(handleInputContext);
  console.log(index);
  return (
    <div className="multiquestionCard">
      <input
        onChange={handleInput}
        className={index}
        placeholder="Nội dung câu hỏi"
        name="question"
      />
      <input
        onChange={handleInput}
        required
        className={index}
        placeholder="Đáp án A"
        name="answerA"
      />
      <input
        onChange={handleInput}
        required
        className={index}
        placeholder="Đáp án B"
        name="answerB"
      />
      <input
        onChange={handleInput}
        required
        className={index}
        placeholder="Đáp án C"
        name="answerC"
      />
      <input
        onChange={handleInput}
        required
        className={index}
        placeholder="Đáp án D"
        name="answerD"
      />
      <input
        onChange={handleInput}
        required
        className={index}
        placeholder="Đáp án đúng"
        name="correctAnswer"
      />
    </div>
  );
}

export default MultiCreationCard;
