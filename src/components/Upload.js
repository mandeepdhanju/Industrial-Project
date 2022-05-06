import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import template from "../template/UploadTemplate.xlsx";
const axios = require("axios");
const path = "https://localhost:5001/api/Upload";
const uploadPath = "https://localhost:5001/api/Upload/todb";
function Upload() {
  const [data, setData] = useState();
  const [file, setFile] = useState();
  const [message, setMessage] = useState();
  const fileSelected = async (event) => {
    const file1 = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file1);
    try {
      const response = await axios({
        method: "post",
        url: path,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data);
      setFile(file1);
      if (response.data.includes("Error")) {
        throw "error";
      } else {
        setData(response.data);
      }
    } catch (error) {
      setMessage(error);
      console.log(error);
    }
  };

  const uploadFile = async (event) => {
    event.preventDefault();
    // console.log(data);
    // try {
    //   const response = await axios.post(uploadPath, { allData: data });
    //   console.log(response.data);
    // } catch (error) {
    //   console.log(error);
    // }
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios({
        method: "post",
        url: uploadPath,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data);
      setMessage(response.data);
    } catch (error) {
      setMessage(error);
      console.log(error);
    }
  };
  return (
    <div className="upload">
      <div className="message">
        {message && (
          <div>
            <p>{message}</p>
          </div>
        )}
      </div>
      <div className="downloadTemplate">
        <Link type="button" to={template} target="_blank" download>
          Download Template
        </Link>
      </div>
      <div className="uploadFileDiv">
        <input onChange={fileSelected} type="file" accept=".xlsx"></input>
        <button type="button" onClick={uploadFile}>
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
            {data &&
              data.map((row, i) => (
                <tr key={i}>
                  {Object.keys(data[0]).map((item, i) => (
                    <td key={i}>{row[item].toString()}</td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Upload;
