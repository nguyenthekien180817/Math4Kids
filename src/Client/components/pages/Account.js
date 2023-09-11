import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../layout/Account Pages and Pop-up/accountPage.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Account() {
  const [email, setEmail] = useState("");
  const [accountName, setAccountName] = useState("");
  const [editName, setEditName] = useState(true);
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

  let update = () => {
    axios({
      method: "PUT",
      url: `http://localhost:4000/account/${email}/update`,
      withCredentials: true,
      data: {
        accountName: accountName,
        email: email,
      },
    }).then((response) => {
      if (response.data == "Done") {
        toast.success("Chỉnh sửa thông tin thành công", {
          pauseOnFocusLoss: false,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    });
  };

  return (
    <div className="infoBox">
      <ToastContainer
        autoClose={2000}
        limit={2}
        style={{ marginTop: "30px" }}
      />
      <div className="boxHeader">
        <h2>Thông tin tài khoản</h2>
      </div>
      <div className="boxBody">
        <label htmlFor="accountName">
          <strong>Họ và Tên: </strong>
        </label>

        <div>
          <input
            name="accountName"
            id="accountName"
            value={accountName}
            disabled={editName}
            onChange={(e) => setAccountName(e.target.value)}
          />

          {editName == true ? (
            <a onClick={() => setEditName(false)}>Edit</a>
          ) : (
            <a onClick={update} type="submit">
              Save
            </a>
          )}
        </div>
        <label htmlFor="email">
          <strong>Email: </strong>
        </label>
        <input disabled name="email" id="email" value={email} />
      </div>
      {/* </form> */}
    </div>
  );
}

export default Account;
