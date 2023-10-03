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
    <div className="multiquestionCard" key={"creationfield" + index}>
      <div className="answerInputField">
        <input
          onChange={handleInput}
          className={index}
          placeholder="Nội dung câu hỏi"
          name="question"
          key={index + "questionCreate"}
        />

        <input
          className={index}
          onChange={handleInput}
          type="file"
          name="questionImage"
          id={`questionImage${index}`}
          key={index + "questionImageCreate"}
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
          key={index + "answerACreate"}
        />

        <input
          className={index}
          onChange={handleInput}
          type="file"
          name="answerAImage"
          id={`answerAImage${index}`}
          key={index + "answerAImageCreate"}
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
          key={index + "answerBCreate"}
        />
        <input
          className={index}
          onChange={handleInput}
          type="file"
          name="answerBImage"
          id={`answerBImage${index}`}
          key={index + "answerBImageCreate"}
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
          key={index + "answerCCreate"}
        />
        <input
          className={index}
          onChange={handleInput}
          type="file"
          name="answerCImage"
          id={`answerCImage${index}`}
          key={index + "answerCImageCreate"}
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
          key={index + "answerDCreate"}
        />

        <input
          className={index}
          onChange={handleInput}
          type="file"
          name="answerDImage"
          id={`answerDImage${index}`}
          key={index + "answerDImageCreate"}
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
