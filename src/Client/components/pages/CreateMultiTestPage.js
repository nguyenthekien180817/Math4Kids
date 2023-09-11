import React from "react";
import { useState, createContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MultiCreationCard from "../layout/Multi and Essay Creation card/MultiCreationCard";
import axios from "axios";
function CreateMultiTestPage() {
  const [account, setAccount] = useState(null);
  const [testName, setTestName] = useState(null);
  const [testDescription, setTestDescription] = useState(null);
  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/account/get-user",
    })
      .then((response) => {
        console.log("Current Account: " + response.data);
        setAccount(response.data);
      })
      .catch((err) => {});
  }, []);

  const [inputList, setInputList] = useState([]);

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

  let submit = () => {
    axios({
      method: "POST",
      data: {
        author: account,
        name: testName,
        description: testDescription,
      },
      withCredentials: true,
      url: `http://localhost:4000/multi-test/${account}/store`,
    }).then((response) => {
      console.log(response.data);
    });
  };
  return (
    <div style={{ paddingLeft: "10px" }}>
      <h1>Tạo bài kiểm tra trắc nghiệm</h1>
      {/* <button style={{ marginBottom: "10px" }} onClick={handleAdd}>
        Thêm Câu hỏi
      </button>

      <button
        style={{ marginLeft: "10px", marginBottom: "10px" }}
        onClick={handleDelete}
      >
        Xóa Câu Hỏi
      </button> */}

      <input
        onChange={(e) => setTestName(e.target.value)}
        placeholder="Nhập tên bài kiểm tra"
        name="name"
      />
      <textarea
        onChange={(e) => setTestDescription(e.target.value)}
        name="description"
      >
        Nhập mô tả bài kiểm tra
      </textarea>

      {/* {inputList.length > 0 ? (
        <div>
          {inputList.map((component, index) => {
            return (
              <div className={index}>
                <p style={{ marginBottom: "5px" }}>Câu hỏi số {index + 1}</p>

                {component}
              </div>
            );
          })}

          <button onClick={submit}>Đăng bài kiểm tra</button>
        </div>
      ) : (
        <p>
          Nhấn nút "Thêm Câu hỏi" để thêm câu hỏi và nút "Xóa Câu Hỏi" để xóa
          bớt câu hỏi{" "}
        </p>
      )} */}
      <button onClick={submit}>Đăng bài kiểm tra</button>
    </div>
  );
}

export default CreateMultiTestPage;
