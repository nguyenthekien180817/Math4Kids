import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import "../layout/Theory Pages/DetailPage.css";
import ToanKetNoi1 from "../../../Textbook/ToanKetNoi1.pdf";
import ToanKetNoi2 from "../../../Textbook/ToanKetNoi2.pdf";
import CanhDieu1 from "../../../Textbook/CanhDieu1.pdf";
import CanhDieu2 from "../../../Textbook/CanhDieu2.pdf";
import ChanTroi1 from "../../../Textbook/ChanTroi1.pdf";
import ChanTroi2 from "../../../Textbook/ChanTroi2.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;
function TheoryDetailPage() {
  const params = useParams();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  let offset = {
    ketnoi: 2,
    chantroi: 1,
  };
  console.log(params.pageNumber);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(Number(params.pageNumber) + Number(params.bonus));
  }

  function changePage(offSet) {
    setPageNumber((prevPageNumber) => prevPageNumber + offSet);
  }

  function changePageBack() {
    changePage(-1);
  }

  function changePageNext() {
    changePage(+1);
  }

  let selectTextBook = () => {
    switch (params.name) {
      case "sach-toan-ket-noi-tri-thuc-voi-cuoc-song-tap-1": {
        console.log("ToanKetNoi1");
        return ToanKetNoi1;
      }

      case "sach-toan-ket-noi-tri-thuc-voi-cuoc-song-tap-2": {
        return ToanKetNoi2;
      }

      case "sach-toan-canh-dieu-tap-1": {
        return CanhDieu1;
      }

      case "sach-toan-canh-dieu-tap-2": {
        return CanhDieu2;
      }

      case "sach-toan-chan-troi-sang-tao-tap-1": {
        return ChanTroi1;
      }

      case "sach-toan-chan-troi-sang-tao-tap-2": {
        return ChanTroi2;
      }
    }
  };
  return (
    <div className="textBookContainer">
      <Document
        onLoadError={console.error}
        file={selectTextBook()}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page overflow-y="scroll" height="700" pageNumber={pageNumber}></Page>
      </Document>
      {pageNumber + 1 <= numPages && (
        <Document
          onLoadError={console.error}
          file={selectTextBook()}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page
            overflow-y="scroll"
            height="700"
            pageNumber={pageNumber + 1}
          ></Page>
        </Document>
      )}

      <div className="buttonField">
        <p>
          {" "}
          Trang số {pageNumber - Number(params.bonus)} trên tổng số{" "}
          {numPages - Number(params.bonus)} trang
        </p>
        {pageNumber > 1 && (
          <button className="btn btn-primary" onClick={changePageBack}>
            Previous Page
          </button>
        )}
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setPageNumber(
                Number(e.currentTarget.value) + Number(params.bonus)
              );
            }
          }}
          className="textbookGuide"
        />

        {pageNumber < numPages && (
          <button className="btn btn-secondary" onClick={changePageNext}>
            Next Page
          </button>
        )}
        <button
          className="btn btn-info"
          onClick={() =>
            setPageNumber(Number(params.ToC) + Number(params.bonus))
          }
        >
          Mục lục
        </button>
      </div>
    </div>
  );
}

export default TheoryDetailPage;
