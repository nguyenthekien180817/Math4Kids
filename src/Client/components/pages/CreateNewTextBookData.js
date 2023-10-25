import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../layout/Theory Pages/CreateTextBook.css";
import { ToastContainer, toast } from "react-toastify";
function CreateTextBookData() {
  const [account, setAccount] = useState({
    name: "",
    level: "",
  });
  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/account/get-user",
    })
      .then((response) => {
        // console.log(response.data);
        setAccount({
          name: response.data.email,
          level: response.data.level,
        });
      })
      .catch((err) => {});
  }, []);

  const [data, setData] = useState({
    name: "",
    lessons: [],
    pageNumber: [],
  });

  let submit = () => {
    axios({
      method: "POST",
      withCredentials: true,
      data: {
        name: data.name,
        lessons: data.lessons,
        pageNumber: data.pageNumber,
      },
      url: `http://localhost:4000/textbook/${account.level}/store`,
    })
      .then((response) => {
        console.log(response);
        if (response.data == "Done") {
          toast.success("Lưu thành công");
        }
        if (response.data == "Not An Admin") {
          toast.warning("Bạn không có quyền thêm sách giáo khoa ");
        }

        if (response.data == "Already Have") {
          toast.warning("Đã có sách giáo khoa với tên này rồi");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="createTextBookContainer">
      <ToastContainer
        autoClose={2000}
        limit={2}
        style={{ marginTop: "30px" }}
      />
      <h1>Tạo thông tin sách giáo khoa</h1>
      <label htmlFor="bookname">
        Nhập Tên sách{" "}
        <input
          onChange={(e) =>
            setData((data) => ({
              ...data,
              name: e.target.value,
            }))
          }
          id="bookname"
        />
      </label>

      <label htmlFor="lessons">
        {" "}
        Nhập Tên Các Bài Học
        <textarea
          onChange={(e) =>
            setData((data) => ({
              ...data,
              lessons: e.target.value.split("; "),
            }))
          }
          id="lessons"
        />
      </label>

      <label htmlFor="pageNumber">
        {" "}
        Nhập các trang của các bài học dựa theo mục lục
        <textarea
          className="smallerTextArea"
          onChange={(e) =>
            setData((data) => ({
              ...data,
              pageNumber: e.target.value.split("; "),
            }))
          }
          id="pageNumber"
        />
      </label>

      <button onClick={() => submit()} className="btn btn-primary">
        Lưu thông tin
      </button>
    </div>
  );
}

export default CreateTextBookData;
