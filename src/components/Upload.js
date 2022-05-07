import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import template from "../template/UploadTemplate.xlsx";
const axios = require("axios");
const path = "https://localhost:5001/api/Upload";
const uploadPath = "https://localhost:5001/api/Upload/todb";
const uploadPath2 = "https://localhost:5001/api/Upload/todb2";
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

  const upload2 = async (event) => {
    event.preventDefault();
    console.log(data);
    let jsonData = [
      {
        organizationName: "1",
        organizationWebsite: "2",
        organizationActive: true,
        comment: "4",
        numberOfEmployee: "5",
        category: "6",
        subCategory: "Unit 7",
        branchName: "8",
        branchActive: false,
        community: "0",
        businessAddress1: "11",
        businessAddress2: "12",
        businessStreetName: "13",
        businessCity: "14",
        businessPostalCode: "15",
        mailingAddress1: "16",
        mailingAddress2: "17",
        mailingStreetName: "18",
        mailingCity: "19",
        mailingPostalCode: "20",
        contactName: "21",
        email: "22",
        phoneNumber: "23",
        fax: "24",
        jobTitle: "25",
        primaryContact: true,
        contactActive: true,
        contactAddress1: "28",
        contactAddress2: "",
        contactStreetName: "",
        contactCity: "",
        contactProvince: "",
        contactPostalCode: "",
      },
      {
        organizationName: "abc",
        organizationWebsite: "ddd",
        organizationActive: true,
        comment: "merong",
        numberOfEmployee: "5-10",
        category: "aaa",
        subCategory: "Unit bbb",
        branchName: "ccc",
        branchActive: false,
        community: "ddd",
        businessAddress1: "eee",
        businessAddress2: "www",
        businessStreetName: "qqq",
        businessCity: "aaa",
        businessPostalCode: "ggg",
        mailingAddress1: "bbb",
        mailingAddress2: "eee",
        mailingStreetName: "hhh",
        mailingCity: "ttt",
        mailingPostalCode: "rrr",
        contactName: "yyy",
        email: "yyy",
        phoneNumber: "bbb",
        fax: "vvv",
        jobTitle: "bbb",
        primaryContact: false,
        contactActive: true,
        contactAddress1: "eee",
        contactAddress2: "fff",
        contactStreetName: "aaa",
        contactCity: "bbb",
        contactProvince: "nnn",
        contactPostalCode: "vvv",
      },
    ];

    const response = await axios({
      method: "post",
      url: uploadPath2,
      data: data,
      headers: { "content-type": "application/json" },
    });

    // try {
    //   const response = await axios.post(
    //     uploadPath,
    //     { abc: "hihi" },
    //     {
    //       headers: {
    //         "content-type": "application/json",
    //       },
    //     }
    //   );
    //   console.log(response);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div className="upload">
      <div className="message">
        <button onClick={upload2}>upload two</button>
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
