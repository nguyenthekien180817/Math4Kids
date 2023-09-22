import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../layout/Account Pages and Pop-up/accountPage.css";
import axios from "axios";

function SubmittedTestPage() {
  let params = useParams();
  const [backend, setBackend] = useState([]);
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/account/get-user",
    })
      .then((response) => {
        setUser(response.data.email);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:4000/multi-test/${user}/store-finished-multi/${params.id}/detail`,
    })
      .then((response) => {
        setBackend(response.data.tests);
        // console.log(response.data);
      })
      .catch((err) => {});
  }, [user]);
  console.log(backend);

  return (
    <div className="infoBox">
      <div className="boxHeader">
        <h2>
          Các thi của bài thi: <span />
          <strong className="stroke">{backend[0].test_name}</strong>
        </h2>
      </div>
      <div className="boxBody">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tên học sinh</th>
              <th scope="col">Email</th>
              <th scope="col">Ngày Nộp</th>
              <th scope="col">Số điểm</th>
            </tr>
          </thead>
          <tbody>
            {backend.map((test, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{test.student_name}</td>
                <td>{test.student_email}</td>
                <td>{test.createdAt}</td>
                <td>{test.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SubmittedTestPage;
