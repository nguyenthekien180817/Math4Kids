import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function UpdatePage() {
  return (
    <div class="mt-4" style={{ marginTop: "100px", marginLeft: "50px" }}>
      <h3>Đăng khóa học</h3>
      <form method="post" action="http://localhost:4000/ly-thuyet/store">
        <div class="form-group">
          <label for="name">Tên</label>
          <input
            type="text"
            class="form-control"
            id="name"
            name="name"
            placeholder="Enter email"
          />
        </div>

        <div class="form-group">
          <label for="description">Mô tả</label>
          <input
            type="text"
            class="form-control"
            id="description"
            name="description"
            placeholder="Enter email"
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Thêm khóa học
        </button>
      </form>
    </div>
  );
}

export default UpdatePage;
