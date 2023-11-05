import React, { useState, useEffect } from "react";
import "../layout/Theory Pages/TheoryPage.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function TheoryPage() {
  const [account, setAccount] = useState({
    name: "",
    level: "",
  });
  const [backend, setBackend] = useState([]);
  const [deleteData, setDeleteData] = useState({
    name: "",
    slug: "",
  });
  const [show, setShow] = useState(false);

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

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:4000/textbook",
    }).then((response) => {
      setBackend(response.data);
      console.log(backend);
    });
  }, []);

  let deleteBook = () => {
    setShow(false);
    axios({
      method: "DELETE",
      withCredentials: true,
      url: `http://localhost:4000/textbook/${account.level}/${deleteData.slug}/delete`,
    }).then((response) => {
      if (response.data == "Done") {
        toast.success("Xoá bài thi thành công");
        setTimeout(() => {
          window.location.reload();
        }, 1);
      } else {
        toast.warn("Bạn không có quyền xoá bài thi");
      }
    });
  };

  return (
    <div className="theoryPagContainer">
      <ToastContainer
        autoClose={2000}
        limit={2}
        style={{ marginTop: "30px" }}
      />
      <h1>Các bộ sách toán hiện nay:</h1>

      <div className="theoryContainer">
        {/* {<SectionSelection />} */}

        {backend.map((data) => (
          <div className="textbookContainer">
            <div className="textbookCard">
              <Link
                style={{ textDecoration: "none" }}
                to={`textbook/${data.slug}`}
              >
                <img src={data.thumbnail} />
              </Link>
              <Link
                style={{ textDecoration: "none" }}
                to={`textbook/${data.slug}`}
                className="bookname"
              >
                <p>{data.name}</p>
              </Link>
              {account.level == "admin" && (
                <button
                  onClick={() => {
                    setDeleteData({
                      name: data.name,
                      slug: data.slug,
                    });
                    setShow(true);
                  }}
                  class="btn btn-danger"
                >
                  Xoá
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className={show == true ? "warningPopup show" : "warningPopup"}>
        <div className="confirmBox">
          <h3>
            Bạn có chắc chắn muốn xoá sách giáo khoa: <b>{deleteData.name}</b>?
          </h3>
          <p>Nhấn có để xác nhận xoá, nhấn không để huỷ</p>
          <div className="buttonField">
            <button
              onClick={() => {
                setShow(false);
                setDeleteData({
                  name: "",
                  slug: "",
                });
              }}
              className="btn btn-secondary"
            >
              Không
            </button>
            <button onClick={() => deleteBook()} className="btn btn-danger">
              Có
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TheoryPage;
