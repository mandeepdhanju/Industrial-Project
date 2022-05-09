import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import template from "../template/UploadTemplate.xlsx";
const axios = require("axios");
const previewPath = "https://localhost:5001/api/Upload";
const uploadPath = "https://localhost:5001/api/Upload/todb2";
function Upload() {
  const [data, setData] = useState();
  const [message, setMessage] = useState();
  const [errorDetail, setErrorDetail] = useState();
  const [display, setDisplay] = useState("none");
  const [pageData, setPageData] = useState();
  const [pageNum, setPageNum] = useState(1);
  const [pn, setPn] = useState(1);

  const fileSelected = async (event) => {
    const file1 = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file1);
    try {
      const response = await axios({
        method: "post",
        url: previewPath,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.includes("Error")) {
        const errorMessageArray = response.data.split("@");
        console.log(errorMessageArray);
        setMessage("Error! Please check line " + errorMessageArray[1] + ".");
        setErrorDetail(errorMessageArray[2]);
      } else {
        const jsonData = response.data;
        setData(jsonData);
        let allArray = [];
        let pArray = [];
        let count = 0;
        jsonData.forEach((item, index) => {
          pArray.push(item);
          count++;
          if (count == 10) {
            allArray.push(pArray);
            pArray = [];
            count = 0;
          }
          if (index == jsonData.length - 1) {
            allArray.push(pArray);
          }
        });
        setPageData(allArray);
        console.log(pageData);
      }
    } catch (error) {
      setMessage(error);
      console.log(error);
    }
  };

  const upload = async (event) => {
    event.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: uploadPath,
        data: data,
        headers: { "content-type": "application/json" },
      });
      setMessage(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
      setMessage(err.message);
    }
  };

  function goToPage(e) {
    const pageInput = e.target.value;
    if (pageInput != null) {
      setPn(pageInput);
    }
  }

  return (
    <div className="upload">
      {console.log(pageData)}
      <div className="downloadTemplate">
        <Link type="button" to={template} target="_blank" download>
          Download Template
        </Link>
      </div>
      {message && (
        <div className="message">
          <p>{message}</p>
          {errorDetail && (
            <button
              onClick={() => {
                setDisplay("block");
              }}
            >
              Detail
            </button>
          )}
          <p style={{ display: display }}>{errorDetail}</p>
        </div>
      )}
      <div className="uploadFileDiv">
        <input onChange={fileSelected} type="file" accept=".xlsx"></input>
        <button type="button" onClick={upload}>
          Upload
        </button>
      </div>
      <div className="uploadPreview">
        <table>
          <tbody>
            <tr>
              {data &&
                Object.keys(data[0]).map((column, i) => (
                  <th key={i}>{column}</th>
                ))}
            </tr>
            {pageData &&
              pageData[pageNum - 1].map((row, i) => (
                <tr key={i}>
                  {Object.keys(pageData[pageNum - 1][0]).map((item, i) => (
                    <td key={i}>{row[item].toString()}</td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
        {pageData && (
          <>
            <label>
              Page: {pageNum} of {pageData.length}
            </label>

            <button
              onClick={() => {
                if (pageNum > 1) {
                  setPageNum(pageNum - 1);
                }
              }}
            >
              Previous
            </button>
            <button
              onClick={() => {
                if (pageNum < pageData.length) {
                  console.log(pageData.length);
                  setPageNum(pageNum + 1);
                }
              }}
            >
              Next
            </button>
            <p>Goto Page </p>
            <input
              type="text"
              placeholder={`Max Page: ${pageData.length}`}
              onChange={goToPage}
            />
            <button
              onClick={() => {
                if (pn > 0 && pn < pageData.length + 1) {
                  setMessage("");
                  setPageNum(pn);
                } else {
                  setMessage(
                    "Please put number between 1 to " + pageData.length
                  );
                }
              }}
            >
              Go
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Upload;
