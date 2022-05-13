import React, { useEffect, useState } from "react";
import axios from "axios";
import template from "../template/UploadTemplate.xlsx";
import { Link } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL + "websocket/upload";

const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET);

ws.addEventListener("open", () => {
  console.log("connected to websocket");
});
function Uploadws() {
  const [message, setMessage] = useState();
  const [errorList, setErrorList] = useState([]);
  const [websocketIsOpen, setWebsocketIsOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  if (!websocketIsOpen) {
    ws.addEventListener("message", (event) => {
      console.log(event.data);
      const messageParse = JSON.parse(event.data);
      if (Object.keys(messageParse).includes("error")) {
        setErrorList((errors) => [...errors, messageParse]);
      }
      if (messageParse?.message === "Done") {
        setUploading(false);
      }
      setMessage(messageParse);
    });
    setWebsocketIsOpen(true);
  }

  const submit = async function (e) {
    e.preventDefault();
    setUploading(true);
    setMessage({ message: "uploading..." });
    const file = e.target[0].files[0];
    // axios send the file to the endpoint
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(API_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    // the file path is returned and we tell the websocket where the file is to then start parsing
    ws.send(response.data.filePath);
  };
  return (
    <main>
      <div style={{ position: "relative" }}>
        <div>
          <h1>Upload</h1>
          <Link type="button" to={template} target="_blank" download>
            Download Template
          </Link>
          {message && (
            <p>{message.message ? message.message : message.error}</p>
          )}
          {errorList && (
            <ul className="errors">
              {errorList.map((error, index) => (
                <li key={index}>
                  {" "}
                  Line {error.line} : {error.error}
                </li>
              ))}
            </ul>
          )}
          <form onSubmit={submit}>
            <input type="file" accept=".xlsx"></input>
            <button type="submit" disabled={uploading}>
              Upload
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Uploadws;
