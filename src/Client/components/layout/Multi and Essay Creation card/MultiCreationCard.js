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
  // console.log(imageSrc);

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
          id={`questionImage${index}`}
          key={index}
        />
        <label className="btn" htmlFor={`questionImage${index}`}>
          File Đính Kèm
        </label>
        <img className="multiQImg" src={imageSrc.questionImage[index]} />
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
          id={`answerAImage${index}`}
        />
        <label className="btn" htmlFor={`answerAImage${index}`}>
          File Đính Kèm
        </label>
        <img className="multiQImg" src={imageSrc.answerA[index]} />
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
          id={`answerBImage${index}`}
        />
        <label className="btn" htmlFor={`answerBImage${index}`}>
          File Đính Kèm
        </label>
        <img className="multiQImg" src={imageSrc.answerB[index]} />
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
          id={`answerCImage${index}`}
        />
        <label className="btn" htmlFor={`answerCImage${index}`}>
          File Đính Kèm
        </label>
        <img className="multiQImg" src={imageSrc.answerC[index]} />
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
          id={`answerDImage${index}`}
        />
        <label className="btn" htmlFor={`answerDImage${index}`}>
          File Đính Kèm
        </label>
        <img className="multiQImg" src={imageSrc.answerD[index]} />
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
