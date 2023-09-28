import React from "react";
import { useState, createContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MultiCreationCard from "../layout/Multi and Essay Creation card/MultiCreationCard";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../layout/Multi and Essay Creation card/MultiStyle.css";
const { base64Converter } = require("../../util/Base64Converter");
function CreateMultiTestPage() {
  const [email, setEmail] = useState(null);
  const [accountName, setAccountName] = useState(null);
  const [testName, setTestName] = useState(null);
  const [testDescription, setTestDescription] = useState(null);
  const [inputList, setInputList] = useState([]);
  const [testImage, setTestImage] = useState("");
  const [src, setSrc] = useState({
    questionImage: [],
    answerA: [],
    answerB: [],
    answerC: [],
    answerD: [],
  });
  let questionArray = [],
    answerAArray = [],
    answerBArray = [],
    answerCArray = [],
    answerDArray = [],
    correctAnswerArray = [],
    answerAImages = [],
    answerBImages = [],
    answerCImages = [],
    answerDImages = [],
    questionImages = [];
  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/account/get-user",
    })
      .then((response) => {
        console.log(response.data);
        setEmail(response.data.email);
        setAccountName(response.data.accountName);
      })
      .catch((err) => {});
  }, []);

  let handleAdd = () => {
    setInputList(
      inputList.concat(<MultiCreationCard key={inputList.length} />)
    );
  };

  let handleDelete = (e) => {
    let newInputList2 = [];
    let newInputList = inputList;
    setInputList(
      newInputList2.concat(
        inputList.slice(0, Number(e.currentTarget.id)),
        inputList.slice(Number(e.currentTarget.id) + 1, inputList.length)
      )
    );
  };

  //Push data into its array
  let handleInput = async (e) => {
    let index = e.currentTarget.className;
    console.log(index);
    //Convert IMG to Base64 String

    switch (e.currentTarget.name) {
      case "question":
        questionArray[index] = e.currentTarget.value;
        console.log(questionArray);
        break;
      case "answerA":
        answerAArray[index] = e.currentTarget.value;
        console.log(answerAArray);
        break;
      case "answerB":
        answerBArray[index] = e.currentTarget.value;
        console.log(answerBArray);
        break;
      case "answerC":
        answerCArray[index] = e.currentTarget.value;
        console.log(answerCArray);
        break;
      case "answerD":
        answerDArray[index] = e.currentTarget.value;
        console.log(answerDArray);
        break;
      case "correctAnswer":
        correctAnswerArray[index] = e.currentTarget.value;
        console.log(correctAnswerArray);
        break;
      case "questionImage":
        questionImages[index] = await base64Converter(e.target.files[0]);
        console.log(questionImages);
        break;
      case "answerAImage":
        answerAImages[index] = await base64Converter(e.target.files[0]);
        console.log(answerAImages);
        break;
      case "answerBImage":
        answerBImages[index] = await base64Converter(e.target.files[0]);
        console.log(answerAImages);
        break;

      case "answerCImage":
        answerCImages[index] = await base64Converter(e.target.files[0]);
        console.log(answerCImages);
        break;
      case "answerDImage":
        answerDImages[index] = await base64Converter(e.target.files[0]);
        console.log(answerDImages);
        break;
    }
  };

  let submit = () => {
    axios({
      method: "POST",
      data: {
        author: email,
        name: testName,
        description: testDescription,
        question: questionArray,
        answerAArray: answerAArray,
        answerBArray: answerBArray,
        answerCArray: answerCArray,
        answerDArray: answerDArray,
        correctAnswerArray: correctAnswerArray,
        imageArray: {
          question: questionImages,
          answerA: answerAImages,
          answerB: answerBImages,
          answerC: answerCImages,
          answerD: answerDImages,
        },
      },
      withCredentials: true,
      url: `http://localhost:4000/multi-test/${email}/store`,
    })
      .then((response) => {
        console.log(response.data);
        if (response.data == "Done") {
          toast.success("Tải bài thi thành công");
        } else {
          toast.alert("Bạn đã tạo bài thi với tên này từ trước rồi!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ paddingLeft: "10px" }}>
      <ToastContainer style={{ marginTop: "40px" }} />
      <h1>Tạo bài kiểm tra trắc nghiệm</h1>
      <input
        onChange={(e) => setTestName(e.target.value)}
        placeholder="Nhập tên bài kiểm tra"
        name="name"
      />
      <textarea
        onChange={(e) => setTestDescription(e.target.value)}
        name="description"
        placeholder="Nhập mô tả bài kiểm tra"
      ></textarea>

      <label className="btn" htmlFor="testImage">
        File Đính Kèm
      </label>

      <input
        type="file"
        id="testImage"
        onChange={async (e) => {
          let converted = await base64Converter(e.target.files[0]);
          setTestImage(converted);
        }}
      />
      <img src={testImage} />
      <button style={{ marginBottom: "10px" }} onClick={handleAdd}>
        Thêm Câu hỏi
      </button>

      <button
        style={{ marginLeft: "10px", marginBottom: "10px" }}
        onClick={handleDelete}
      >
        Xóa Câu Hỏi
      </button>

      {inputList.length > 0 ? (
        <div>
          {inputList.map((component, index) => {
            return (
              <handleInputContext.Provider value={handleInput}>
                <IndexContext.Provider value={index}>
                  <imageSrcContext.Provider value={src}>
                    <div>
                      <p style={{ marginBottom: "5px" }}>
                        Câu hỏi số {index + 1}
                      </p>
                      {component}
                    </div>
                  </imageSrcContext.Provider>
                </IndexContext.Provider>
              </handleInputContext.Provider>
            );
          })}
          <button onClick={submit}>submit</button>
        </div>
      ) : (
        <p>
          Nhấn nút "Thêm Câu hỏi" để thêm câu hỏi và nút "Xóa Câu Hỏi" để xóa
          bớt câu hỏi{" "}
        </p>
      )}
    </div>
  );
}
export const IndexContext = createContext();
export const handleInputContext = createContext();
export const imageSrcContext = createContext();
export default CreateMultiTestPage;
