import React from "react";
import { useState, createContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MultiCreationCard from "../layout/Multi and Essay Creation card/MultiCreationCard";
import axios from "axios";
function CreateMultiTestPage() {
  const [account, setAccount] = useState(null);
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

  let handleDelete = () => {
    console.log(inputList.length);
    setInputList(inputList.slice(0, inputList.length - 1));
  };

  let submit = () => {
    axios({
      method: "POST",
      data: {
        author: account,
      },
      withCredentials: true,
      url: `http://localhost:4000/account/${account}/multi-test`,
    }).then((response) => {
      console.log(response.data);
    });
  };
  return (
    <div style={{ paddingLeft: "10px" }}>
      <h1>Tạo bài kiểm tra trắc nghiệm</h1>
      <button style={{ marginBottom: "10px" }} onClick={handleAdd}>
        Thêm Câu hỏi
      </button>
      <button style={{ marginBottom: "10px" }} onClick={handleDelete}>
        Xóa Câu Hỏi
      </button>

      {inputList.length > 0 ? (
        <div>
          {inputList.map((component, index) => {
            return (
              <div>
                <p style={{ marginBottom: "5px" }}>Câu hỏi số {index + 1}</p>
                {component}
              </div>
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

export default CreateMultiTestPage;
