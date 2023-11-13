import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../layout/Multi and Essay Creation card/EssayStyle.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { base64Converter } from "../../../util/Base64Converter";

function DetailedEssayPage() {
  const [submitData, setSubmitData] = useState({
    answersArray: [],
    answerImages: [],
  });
  const [src, setSrc] = useState([]);
  const [test, setTest] = useState(null);
  const [user, setUser] = useState({
    student_name: "",
    student_email: "",
  });
  const params = useParams();
  // [GET] test details ------------------------------------------------
  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:4000/essay-test/show-detail/${params.slug}`,
    })
      .then((response) => {
        setTest(response.data.result);
        console.log(test);
      })
      .catch((err) => {});
  }, [test != null]);

  //[GET] user
  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/account/get-user",
    })
      .then((response) => {
        setUser({
          student_email: response.data.email,
          student_name: response.data.accountName,
        });
      })
      .catch((err) => {});
  }, []);

  let handleInput = async (e) => {
    let type = e.currentTarget.name;
    let index = e.currentTarget.className;

    switch (type) {
      case "answerText":
        submitData.answersArray[index] = e.currentTarget.value;
        console.log(submitData);
        break;

      case "answerImages":
        let copiedArray = submitData.answerImages;
        copiedArray[index] = await base64Converter(e.currentTarget.files[0]);
        setSubmitData((data) => ({
          ...data,
          answerImages: copiedArray,
        }));
        break;
    }
  };

  let submit = () => {
    axios({
      method: "POST",
      withCredentials: true,
      url: `http://localhost:4000/essay-test/${user.student_email}/store-finished-essay`,
      data: {
        student_email: user.student_email,
        student_name: user.student_name,
        answersArray: submitData.answersArray,
        answerImages: submitData.answerImages,
        author: test.author,
        test_name: test.name,
        questionArray: test.questionArray,
        questionImages: test.imageArray,
        test_id: test._id,
      },
    }).then((response) => {
      if (response.data == "Done") {
        toast.success("Nộp bài thành công");
        setTimeout(() => {
          window.location.replace(
            // "https://nguyenthekien180817.github.io/Math4Kids/"
            "http://localhost:3000/"
          );
        }, 2000);
      } else {
        toast.warn("Bạn đã nộp bài thi này từ trước rồi!");
      }
    });
  };

  return (
    <div>
      <ToastContainer style={{ marginTop: "40px" }} />
      {test != null ? (
        <div style={{ marginTop: "40px" }}>
          <div className="testHeader">
            <p>
              Xin chào <b>{user.student_name}</b>{" "}
            </p>
            <h1>{test.name}</h1>
            <p>{test.description}</p>
          </div>
          <div className="testBody">
            {test.questionArray.map((execise, index) => (
              <div className="essayQuestionContainer">
                <div className="header">
                  <h4>
                    <b style={{ color: "green" }}>Câu {index + 1}:</b>{" "}
                    <h5>{execise}</h5>
                  </h4>
                </div>
                <img
                  className={
                    test.imageArray[index] == undefined
                      ? "hidden"
                      : "essayTestImage"
                  }
                  src={test.imageArray[index]}
                />
                <textarea
                  className={index}
                  onChange={handleInput}
                  name="answerText"
                  placeholder="Nhập câu trả lời ở đây"
                />
                <input
                  className={index}
                  onChange={handleInput}
                  name="answerImages"
                  type="file"
                  id={`image${index}`}
                />
                <label htmlFor={`image${index}`}>Chọn ảnh đính kèm</label>
                <img
                  className={
                    submitData.answerImages[index] == null
                      ? "hidden"
                      : "answerImage"
                  }
                  src={submitData.answerImages[index]}
                />
              </div>
            ))}
            <button onClick={submit} className="btn btn-primary">
              Nộp bài
            </button>
          </div>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default DetailedEssayPage;
