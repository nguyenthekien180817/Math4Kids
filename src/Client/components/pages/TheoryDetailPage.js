import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import "../layout/Theory Pages/DetailPage.css";
import ToanKetNoi1 from "../../../Textbook/ToanKetNoi1.pdf";
import ToanKetNoi2 from "../../../Textbook/ToanKetNoi2.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;
function TheoryDetailPage() {
  const params = useParams();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  console.log(params.name);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(Number(params.slug) + 2);
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
      case "ToanKetNoi1": {
        return ToanKetNoi1;
      }

      case "ToanKetNoi2": {
        return ToanKetNoi2;
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

      <div className="buttonField">
        <p>
          {" "}
          Trang số {pageNumber - 2} trên tổng số {numPages - 2} trang
        </p>
        {pageNumber > 1 && (
          <button className="btn btn-primary" onClick={changePageBack}>
            Previous Page
          </button>
        )}
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setPageNumber(Number(e.currentTarget.value) + 2);
            }
          }}
          className="textbookGuide"
        />
        {pageNumber < numPages && (
          <button className="btn btn-secondary" onClick={changePageNext}>
            Next Page
          </button>
        )}
      </div>
    </div>
  );
}

export default TheoryDetailPage;
