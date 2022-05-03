import CsvDownload from "react-json-to-csv";
import { useEffect, useState } from "react";
const axios = require("axios");
const path = "https://localhost:5001/api/Search/all";

function Report() {
  const [all, setAll] = useState();
  const [columnName, setColumnName] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [exportArray, setExportArray] = useState([]);

  useEffect(() => {
    async function getAll() {
      await axios.get(path).then((response) => {
        setAll(response.data);
        // setColumnName(Object.keys(response.data[0]));
        let columns = Object.keys(response.data[0]);
        columns.forEach((item, index) => {
          if (item.includes("ID")) {
            columns.splice(index, 1);
          }
        });
        setColumnName(columns);
      });
    }
    getAll();
  }, []);

  useEffect(() => {
    function download() {
      console.log("hello");
      let exportData = [];
      var obj = {};
      if (checkedArray.length !== 0) {
        for (let i = 0; all.length > i; i++) {
          for (let j = 0; checkedArray.length > j; j++) {
            let newObj = {};
            let item = all[i][checkedArray[j]];
            newObj[checkedArray[j]] = item;
            Object.assign(obj, newObj);
          }
          exportData.push(obj);
          console.log(exportData);
        }
        setExportArray(exportData);
      }
    }
    download();
  }, [checkedArray]);

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
        <CsvDownload data={exportArray}>Download</CsvDownload>
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
