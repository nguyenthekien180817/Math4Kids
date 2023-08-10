import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRef } from "react";

function EditLessonPage() {
  const ref = useRef(null);
  const params = useParams();
  const [backend, setBackend] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:4000/ly-thuyet/${params.slug}`)
      .then((response) => response.json())
      .then((data) => {
        setBackend(data.course);
        console.log(data.course);
      });
  }, []);

  return (
    <div>
      {backend != null ? (
        <div class="mt-4" style={{ marginTop: "100px", marginLeft: "50px" }}>
          <h3>Sửa bài giảng</h3>
          <form
            method="post"
            action={`http://localhost:4000/ly-thuyet/${backend.slug}?_method=PUT`}
          >
            <div class="form-group">
              <label for="name">Tên</label>
              <input
                defaultValue={backend.name}
                type="text"
                class="form-control"
                id="name"
                name="name"
              />
            </div>

            <div class="form-group">
              <label for="description">Mô tả</label>
              <input
                defaultValue={backend.description}
                type="text"
                class="form-control"
                id="description"
                name="description"
              />
            </div>

            <button type="submit" class="btn btn-primary">
              Thêm khóa học
            </button>
          </form>
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
}

export default EditLessonPage;
