import { useEffect, useState } from "react";
const axios = require("axios");
const path = "https://localhost:5001/api/Search/all";

function Report() {
  const [all, setAll] = useState();
  const [columnName, setColumnName] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);

  useEffect(() => {
    async function getAll() {
      await axios.get(path).then((response) => {
        setAll(response.data);
        setColumnName(Object.keys(response.data[0]));
      });
    }
    getAll();
  }, []);

  function checkedColumn(checkedColumn) {
    if (checkedArray.includes(checkedColumn)) {
      const index = checkedArray.indexOf(checkedColumn);
      setCheckedArray([
        ...checkedArray.slice(0, index),
        ...checkedArray.slice(index + 1),
      ]);
    } else {
      setCheckedArray((checked) => [...checked, checkedColumn]);
    }
  }
  let downloadArray = [];
  function downloadPressed() {
    for (let i = 0; all.length > i; i++) {
      for (let j = 0; checkedArray.length > j; j++) {
        // downloadArray.push(all[i].checkedArray[j]);
        console.log(all[i][checkedArray[j]]);
      }
    }
    // console.log(downloadArray);
  }

  return (
    <div className="report">
      <div className="columnSelection">
        {columnName &&
          columnName.map((item) => (
            <div>
              <input
                type="checkbox"
                onChange={() => {
                  checkedColumn(item);
                }}
              />
              <label htmlFor="columnName">{item}</label>
            </div>
          ))}
      </div>
      <div className="reportPreview">
        <button className="reportDownloadButton" onClick={downloadPressed}>
          Download
        </button>
        <h1>PREVIEW</h1>
        <table>
          <tr>{checkedArray && checkedArray.map((i) => <th>{i}</th>)}</tr>

          {all &&
            all.map((row) => (
              <tr>
                {checkedArray.map((column) => (
                  <td>{row[column]}</td>
                ))}
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
}

export default Report;
