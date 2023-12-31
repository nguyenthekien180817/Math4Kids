import React from "react";
import { useState, createContext, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MultiCreationCard from "../../layout/Multi and Essay Creation card/MultiCreationCard";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../layout/Multi and Essay Creation card/MultiStyle.css";
import { base64Converter } from "../../../util/Base64Converter";
// const { base64Converter } = require();
function CreateMultiTestPage() {
  const [email, setEmail] = useState(null);
  const [accountName, setAccountName] = useState(null);
  const [testName, setTestName] = useState(null);
  const [testDescription, setTestDescription] = useState(null);
  const [inputList, setInputList] = useState([]);
  const [src, setSrc] = useState({
    questionImage: [],
    answerA: [],
    answerB: [],
    answerC: [],
    answerD: [],
  });
  let questionArray = useRef([]),
    answerAArray = useRef([]),
    answerBArray = useRef([]),
    answerCArray = useRef([]),
    answerDArray = useRef([]),
    correctAnswerArray = useRef([]),
    answerAImages = useRef([]),
    answerBImages = useRef([]),
    answerCImages = useRef([]),
    answerDImages = useRef([]),
    questionImages = useRef([]);
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
    setInputList(inputList.slice(0, inputList.length - 1));
    questionArray.current = questionArray.current.slice(
      0,
      inputList.length - 1
    );
    answerAArray.current = answerAArray.current.slice(0, inputList.length - 1);
    answerBArray.current = answerAArray.current.slice(0, inputList.length - 1);
    answerCArray.current = answerAArray.current.slice(0, inputList.length - 1);
    answerDArray.current = answerAArray.current.slice(0, inputList.length - 1);
    correctAnswerArray.current = correctAnswerArray.current.slice(
      0,
      inputList.length - 1
    );
    answerAImages.current = answerAImages.current.slice(
      0,
      inputList.length - 1
    );
    answerBImages.current = answerBImages.current.slice(
      0,
      inputList.length - 1
    );
    answerCImages.current = answerCImages.current.slice(
      0,
      inputList.length - 1
    );
    answerDImages.current = answerDImages.current.slice(
      0,
      inputList.length - 1
    );
    questionImages.current = questionImages.current.slice(
      0,
      inputList.length - 1
    );
    setSrc((data) => ({
      ...data,
      questionImage: questionImages.current,
      answerA: answerAImages.current,
      answerB: answerBImages.current,
      answerC: answerCImages.current,
      answerD: answerDImages.current,
    }));
  };

  //Push data into its array
  let handleInput = async (e) => {
    //if input's className == case => set e.target.value = suitable input array
    let index = e.currentTarget.className;
    console.log(index);
    switch (e.currentTarget.name) {
      case "question":
        questionArray.current[index] = e.currentTarget.value;
        console.log(questionArray.current);
        break;
      case "answerA":
        answerAArray.current[index] = e.currentTarget.value;
        console.log(answerAArray.current);
        break;
      case "answerB":
        answerBArray.current[index] = e.currentTarget.value;
        console.log(answerBArray.current);
        break;
      case "answerC":
        answerCArray.current[index] = e.currentTarget.value;
        console.log(answerCArray.current);
        break;
      case "answerD":
        answerDArray.current[index] = e.currentTarget.value;
        console.log(answerDArray.current);
        break;
      case "correctAnswer":
        correctAnswerArray.current[index] = e.currentTarget.value;
        console.log(correctAnswerArray.current);
        break;
      case "questionImage":
        questionImages.current[index] = await base64Converter(
          e.target.files[0]
        );
        console.log(questionImages.current);
        setSrc((src) => ({
          ...src,
          questionImage: questionImages.current,
        }));
        console.log(questionImages);

        break;
      case "answerAImage":
        answerAImages.current[index] = await base64Converter(e.target.files[0]);
        setSrc((src) => ({
          ...src,
          answerA: answerAImages.current,
        }));
        break;

      case "answerBImage":
        answerBImages.current[index] = await base64Converter(e.target.files[0]);
        setSrc((src) => ({
          ...src,
          answerB: answerBImages.current,
        }));
        break;

      case "answerCImage":
        answerCImages.current[index] = await base64Converter(e.target.files[0]);
        setSrc((src) => ({
          ...src,
          answerC: answerCImages.current,
        }));
        break;

      case "answerDImage":
        answerDImages.current[index] = await base64Converter(e.target.files[0]);
        setSrc((src) => ({
          ...src,
          answerD: answerDImages.current,
        }));
        break;
    }
  };

  let submit = () => {
    if (testName == "" || testName == null) {
      toast.warn("Tên bài thi không được để trống");
    } else {
      axios({
        method: "POST",
        data: {
          author: email,
          name: testName,
          description: testDescription,
          question: questionArray.current,
          answerAArray: answerAArray.current,
          answerBArray: answerBArray.current,
          answerCArray: answerCArray.current,
          answerDArray: answerDArray.current,
          correctAnswerArray: correctAnswerArray.current,
          imageArray: {
            question: questionImages.current,
            answerA: answerAImages.current,
            answerB: answerBImages.current,
            answerC: answerCImages.current,
            answerD: answerDImages.current,
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
            toast.warn("Bạn đã tạo bài thi với tên này từ trước rồi!");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <ToastContainer style={{ marginTop: "40px" }} />
      <div className="createHeader">
        <h1>Tạo bài kiểm tra trắc nghiệm</h1>
        <div className="textAreaInputField">
          <label className="textAreaInputSmall" htmlFor="name">
            Nhập tên bài kiểm tra
            <input
              onChange={(e) => setTestName(e.target.value)}
              id="name"
              name="name"
            />
          </label>

          <label className="textAreaInputSmall" htmlFor="description">
            Nhập mô tả bài kiểm tra
            <textarea
              onChange={(e) => setTestDescription(e.target.value)}
              id="description"
              name="description"
            ></textarea>
          </label>
        </div>

        <div className="buttonField">
          <button
            className="btn btn-primary"
            style={{ marginBottom: "10px" }}
            onClick={handleAdd}
          >
            Thêm Câu hỏi
          </button>

          <button
            className="btn btn-secondary"
            style={{ marginLeft: "10px", marginBottom: "10px" }}
            onClick={handleDelete}
          >
            Xóa Câu Hỏi Cuối
          </button>
        </div>
      </div>

      {inputList.length > 0 ? (
        <div className="createBody">
          {inputList.map((component, index) => {
            return (
              <handleInputContext.Provider value={handleInput}>
                <IndexContext.Provider value={index}>
                  <imageSrcContext.Provider value={src}>
                    <div className="textAreaInputBig">
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
          <button className="btn btn-primary" onClick={submit}>
            Đăng bài thi
          </button>
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
