import React from "react";
import { useState, useRef, createContext, useEffect } from "react";
import EssayCreationCard from "../../layout/Multi and Essay Creation card/EssayCreationCard";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { base64Converter } = require("../../../util/Base64Converter");
function CreateEssayTest() {
  const [inputList, setInputList] = useState([]);
  const [user, setUser] = useState({
    accountName: null,
    email: null,
  });
  let [examData, setExamData] = useState({
    name: useRef(""),
    description: useRef(""),
    timeLimit: useRef(0),
    questionArray: useRef([]),
    imageArray: useRef([]),
  });

  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/account/get-user",
    })
      .then((response) => {
        setUser({
          accountName: response.data.accountName,
          email: response.data.email,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [examData.imageArray.current]);

  let handleAdd = () => {
    setInputList(
      inputList.concat(<EssayCreationCard key={inputList.length} />)
    );
    console.log(examData);
  };

  let handleDelete = () => {
    let copiedObject = examData;
    copiedObject.imageArray.current = copiedObject.imageArray.current.slice(
      0,
      inputList.length - 1
    );

    copiedObject.questionArray.current =
      copiedObject.questionArray.current.slice(0, inputList.length - 1);
    setExamData((data) => ({
      ...data,
      imageArray: copiedObject.imageArray,
      questionArray: copiedObject.questionArray,
    }));
    setInputList(inputList.slice(0, inputList.length - 1));
  };

  let handleInput = async (e) => {
    let index = e.currentTarget.className;
    let copiedObject = examData;
    switch (e.currentTarget.name) {
      case "question":
        copiedObject.questionArray.current[index] = e.currentTarget.value;
        setExamData(copiedObject);
        console.log(examData);
        break;

      case "questionImage":
        let copiedImageArray = examData.imageArray;
        copiedImageArray.current[index] = await base64Converter(
          e.currentTarget.files[0]
        );

        setExamData((data) => ({
          ...data,
          imageArray: copiedImageArray,
        }));
        console.log(examData.imageArray.current);
        break;

      case "EssayName":
        copiedObject.name.current = e.currentTarget.value;
        setExamData(copiedObject);
        console.log(examData);
        break;

      case "EssayDes":
        copiedObject.description.current = e.currentTarget.value;
        setExamData(copiedObject);
        console.log(examData);
        break;

      case "timeLimit":
        copiedObject.timeLimit.current = e.currentTarget.value;
        setExamData(copiedObject);
        console.log(examData);
        break;
    }
  };

  let submit = () => {
    axios({
      method: "POST",
      withCredentials: true,
      data: {
        author: user.email,
        name: examData.name.current,
        time: examData.timeLimit.current,
        description: examData.description.current,
        questionArray: examData.questionArray.current,
        imageArray: examData.imageArray.current,
      },
      url: `http://localhost:4000/essay-test/${user.email}/store`,
    })
      .then((response) => {
        console.log(response.data);
        if (response.data == "Done") {
          toast.success("Tải bài thi thành công");
        } else {
          toast.warn("Bạn đã tạo bài thi với tên này từ trước rồi!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <ToastContainer style={{ marginTop: "40px" }} />
      <h1>Tạo bài kiểm tra tự luận</h1>
      <textarea
        name="EssayName"
        placeholder="Nhập tên bài kiểm tra ở đây"
        onChange={handleInput}
      />
      <textarea
        name="EssayDes"
        placeholder="Nhập nội dung bài kiểm tra ở đây"
        onChange={handleInput}
      />
      <input
        name="timeLimit"
        placeholder="Nhập số phút của bài thi"
        onChange={handleInput}
      />
      <br></br>
      <button onClick={handleAdd} style={{ marginBottom: "10px" }}>
        Thêm Câu hỏi
      </button>

      <button
        onClick={handleDelete}
        style={{ marginLeft: "10px", marginBottom: "10px" }}
      >
        Xóa Câu Hỏi Cuối
      </button>

      {inputList.length > 0 ? (
        <div>
          {inputList.map((component, index) => (
            <IndexContext.Provider value={index}>
              <handleInputContext.Provider value={handleInput}>
                <imageSrcContext.Provider value={examData}>
                  <p>Câu hỏi số {index + 1}</p>
                  {component}
                </imageSrcContext.Provider>
              </handleInputContext.Provider>
            </IndexContext.Provider>
          ))}
          <button onClick={submit}>Lưu bài</button>
        </div>
      ) : (
        <p>
          <p>
            Nhấn nút "Thêm Câu hỏi" để thêm câu hỏi và nút "Xóa Câu Hỏi" để xóa
            bớt câu hỏi{" "}
          </p>
        </p>
      )}
    </div>
  );
}

export const IndexContext = createContext();
export const handleInputContext = createContext();
export const imageSrcContext = createContext();
export default CreateEssayTest;
