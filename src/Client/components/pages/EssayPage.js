import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const testList = [
  "Nội dung câu hỏi 1",
  "Nội dung câu hỏi 2",
  "Nội dung câu hỏi 3",
];

function EssayPage() {
  const answerList = [];
  let questionList = testList;
  const [email, setEmail] = useState(null);
  const [accountName, setAccountName] = useState(null);
  const [disable, setDisable] = useState(false);
  console.log(questionList);
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

  let getAnswerData = (e) => {
    answerList[e.target.name] = e.target.value;
    console.log(answerList);
  };

  let submit = () => {
    setDisable(true);
    axios({
      method: "post",
      url: `http://localhost:4000/essay-test/${email}/store-finished-essay`,
      withCredentials: true,
      data: {
        author: "user02@test",
        student_name: accountName,
        student_email: email,
        questionArray: questionList,
        answersArray: answerList,
      },
    })
      .then((response) => {
        console.log(response);
        if (response.data == "Done") {
          toast.success("Nộp bài thành công");
        } else {
          toast.error("Bạn đã làm bài thi từ trước rồi!");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <ToastContainer style={{ marginTop: "40px" }} />
      {testList.map((test, index) => {
        return (
          <div>
            <h2>Câu hỏi {index + 1}</h2>
            <span />
            <p>{test}</p>
            <textarea
              name={`${index}`}
              placeholder="Trả lời câu hỏi tại đây"
              onChange={(e) => getAnswerData(e)}
            ></textarea>
          </div>
        );
      })}
      {testList.length > 0 ? (
        <button disabled={disable} onClick={submit}>
          Submit
        </button>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}

export default EssayPage;
