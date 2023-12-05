import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../layout/Theory Pages/CreateTextBook.css";
import { ToastContainer, toast } from "react-toastify";

const { base64Converter } = require("../../util/Base64Converter");

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
    thumbnail: "",
    tableOfContents: 0,
    numberOfCover: 0,
  });

  let submit = () => {
    let checkErr = false;

    data.pageNumber.map((number, index) => {
      number = Number(number);
      if (isNaN(number) || number < 0) {
        checkErr = true;
      }
    });

    if (checkErr) {
      toast.warn("Số trang không hợp lệ.");
    } else {
      axios({
        method: "POST",
        withCredentials: true,
        data: {
          name: data.name,
          lessons: data.lessons,
          pageNumber: data.pageNumber,
          thumbnail: data.thumbnail,
          tableOfContents: data.tableOfContents,
          numberOfCover: data.numberOfCover,
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
    }
  };
  return (
    <div className="createTextBookContainer">
      <ToastContainer
        autoClose={2000}
        limit={2}
        style={{ marginTop: "30px" }}
      />
      <h1>Tạo thông tin sách giáo khoa</h1>
      <div className="smallInputFieldContainer">
        <label className="bigInputLabel" htmlFor="bookname">
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

        <label className="smallInputLabel" htmlFor="numberOfCover">
          Nhập số trang bìa{" "}
          <input
            className="smallInputField"
            onChange={(e) =>
              setData((data) => ({
                ...data,
                numberOfCover: e.target.value,
              }))
            }
            id="numberOfCover"
          />
        </label>

        <label className="smallInputLabel" htmlFor="tableOfContents">
          Nhập vị trí của trang mục lục{" "}
          <input
            className="smallInputField"
            onChange={(e) =>
              setData((data) => ({
                ...data,
                tableOfContents: e.target.value,
              }))
            }
            id="tableOfContents"
          />
        </label>

        <label
          className=" btn btn-secondary smallInputLabel"
          htmlFor="thumbnail"
        >
          Chọn ảnh bìa{" "}
          <input
            type="file"
            className="smallInputField"
            onChange={async (e) => {
              if (e.target.files[0]) {
                let image = await base64Converter(e.target.files[0]);
                console.log(e.target.files[0].name);
                setData((data) => ({
                  ...data,
                  thumbnail: image,
                }));
                console.log(data);
              }
            }}
            id="thumbnail"
          />
        </label>
        <a target="_blank" href={data.thumbnail}>
          <img src={data.thumbnail} />
        </a>
      </div>

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
        <p>Có tổng số {data.lessons.length} bài học</p>
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
        {data.pageNumber.length > 0 && (
          <p>Có tổng số {data.pageNumber.length} trang đánh số</p>
        )}
      </label>

      <button onClick={() => submit()} className="btn btn-primary">
        Lưu thông tin
      </button>
    </div>
  );
}

export default CreateTextBookData;
