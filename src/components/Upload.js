import { useState } from "react";
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
    if (event.target.files[0] != null) {
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
          setMessage("Error!");
          let errArray = [];
          for (let i = 2; errorMessageArray.length > i; i++) {
            errArray.push(errorMessageArray[i]);
          }
          setErrorDetail(errArray);
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
        }
      } catch (error) {
        setMessage(error);
      }
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
    } catch (err) {
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
      <div className="downloadTemplate">
        <Link type="button" to={template} target="_blank" download>
          Download Template
        </Link>
      </div>
      {message && (
        <div className="message">
          <p>{message}</p>
          {errorDetail && (
            <>
              <button
                onClick={() => {
                  if (display == "none") {
                    setDisplay("block");
                  } else {
                    setDisplay("none");
                  }
                }}
              >
                Detail
              </button>

              <div style={{ display: display }}>
                {errorDetail.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
            </>
          )}
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
                Object.keys(pageData[0][0]).map((column, i) => (
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
                  setPageNum(parseInt(pn));
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
      {console.log(pageNum)}
    </div>
  );
}

export default Upload;
