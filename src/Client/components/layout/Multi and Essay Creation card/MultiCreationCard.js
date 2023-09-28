import React, { useEffect } from "react";
import { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MultiStyle.css";
import {
  IndexContext,
  handleInputContext,
  imageSrcContext,
} from "../../pages/CreateMultiTestPage";

const { base64Converter } = require("../../../util/Base64Converter");

function MultiCreationCard() {
  let index = useContext(IndexContext);
  let handleInput = useContext(handleInputContext);
  let imageSrc = useContext(imageSrcContext);
  console.log(imageSrc);
  return (
    <div className="multiquestionCard">
      <div className="answerInputField">
        <input
          onChange={handleInput}
          className={index}
          placeholder="Nội dung câu hỏi"
          name="question"
        />

        <input
          className={index}
          onChange={handleInput}
          type="file"
          name="questionImage"
          id="questionImage"
        />
        <label className="btn" htmlFor="questionImage">
          File Đính Kèm
        </label>
        <img src="" />
      </div>

      <div className="answerInputField">
        <input
          onChange={handleInput}
          required
          className={index}
          placeholder="Đáp án A"
          name="answerA"
        />

        <input
          className={index}
          onChange={handleInput}
          type="file"
          name="answerAImage"
          id="answerAImage"
        />
        <label className="btn" htmlFor="answerAImage">
          File Đính Kèm
        </label>
        {/* <img src={imageSrc.question[index]} /> */}
      </div>

      <div className="answerInputField">
        <input
          onChange={handleInput}
          required
          className={index}
          placeholder="Đáp án B"
          name="answerB"
        />
        <input
          className={index}
          onChange={handleInput}
          type="file"
          name="answerBImage"
          id="answerBImage"
        />
        <label className="btn" htmlFor="answerBImage">
          File Đính Kèm
        </label>
      </div>

      <div className="answerInputField">
        <input
          onChange={handleInput}
          required
          className={index}
          placeholder="Đáp án C"
          name="answerC"
        />
        <input
          className={index}
          onChange={handleInput}
          type="file"
          name="answerCImage"
          id="answerCImage"
        />
        <label className="btn" htmlFor="answerCImage">
          File Đính Kèm
        </label>
      </div>

      <div className="answerInputField">
        <input
          onChange={handleInput}
          required
          className={index}
          placeholder="Đáp án D"
          name="answerD"
        />

        <input
          className={index}
          onChange={handleInput}
          type="file"
          name="answerDImage"
          id="answerDImage"
        />
        <label className="btn" htmlFor="answerDImage">
          File Đính Kèm
        </label>
      </div>

      <div className="answerInputField">
        <input
          onChange={handleInput}
          required
          className={index}
          placeholder="Đáp án đúng"
          name="correctAnswer"
        />
      </div>
    </div>
  );
}

export default MultiCreationCard;
