import React from "react";
import { useEffect, useContext } from "react";
import {
  IndexContext,
  handleInputContext,
  imageSrcContext,
} from "../../pages/EssayTestPages/CreateEssayTestPage";
import "../../layout/Multi and Essay Creation card/EssayStyle.css";

function EssayCreationCard() {
  const index = useContext(IndexContext);
  const handleInput = useContext(handleInputContext);
  const data = useContext(imageSrcContext);
  return (
    <div className="essayCreationContainer">
      <textarea
        className={index}
        placeholder="Nhập Nội Dung Câu Hỏi"
        name={"question"}
        id={`question${index}`}
        onChange={handleInput}
      />
      <input
        className={index}
        name="questionImage"
        type="file"
        id={`questionImage${index}`}
        onChange={handleInput}
      />
      <label htmlFor={`questionImage${index}`}>Ảnh đính kèm</label>
      <img className="essayQImg" src={data.imageArray.current[index]} />
    </div>
  );
}

export default EssayCreationCard;
