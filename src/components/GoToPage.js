import React, { useState } from "react";

function GoToPage({ gotoPage, pageLength }) {
  const [page, setPage] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const sanitize = function (e) {
    const pageParsed = parseInt(e.target.value);
    if (isNaN(pageParsed)) {
      setDisabled(true);
      setPage("");
      return;
    }
    if (pageParsed < pageLength + 1) {
      if (pageParsed === 0) {
        setDisabled(true);
        setPage("");
      } else {
        setDisabled(false);
        setPage(pageParsed);
        setErrorMessage("");
      }
    } else {
      setErrorMessage("Page number must be less than " + pageLength);
      setDisabled(true);
      setPage(pageParsed);
    }
  };
  return (
    <div>
      <label>Goto Page</label>
      <input
        type="text"
        value={page}
        max={pageLength}
        onChange={sanitize}
        placeholder={`Max ${pageLength}`}
      />
      {errorMessage && <p>{errorMessage}</p>}
      <button
        onClick={() => {
          gotoPage(page - 1);
          setPage("");
        }}
        disabled={disabled}
      >
        Go
      </button>
    </div>
  );
}

export default GoToPage;
