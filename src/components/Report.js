import CsvDownload from "react-json-to-csv";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const axios = require("axios");
const path = "https://localhost:5001/api/Search/all";

function Report() {
  const location = useLocation();
  const [all, setAll] = useState();
  const [columnName, setColumnName] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [exportArray, setExportArray] = useState([]);
  const [pageArray, setPageArray] = useState();
  const [page, setPage] = useState(10);
  useEffect(() => {
    function getAll() {
      // await axios.get(path).then((response) => {
      //   setAll(response.data);
      //   // setColumnName(Object.keys(response.data[0]));
      //   let columns = Object.keys(response.data[0]);
      //   columns.forEach((item, index) => {
      //     if (item.includes("ID")) {
      //       columns.splice(index, 1);
      //     }
      //   });
      //   setColumnName(columns);
      // });
      setAll(location.state);
      let columns = Object.keys(location.state[0]);
      columns.forEach((item, index) => {
        if (item.includes("ID")) {
          columns.splice(index, 1);
        }
      });
      setColumnName(columns);
    }
    getAll();
  }, []);

  useEffect(() => {
    function download() {
      let exportData = [];

      if (checkedArray.length !== 0) {
        for (let i = 0; all.length > i; i++) {
          var obj = {};
          for (let j = 0; checkedArray.length > j; j++) {
            let newObj = {};
            let item = all[i][checkedArray[j]];
            newObj[checkedArray[j]] = item;
            Object.assign(obj, newObj);
          }
          exportData.push(obj);
        }
        setExportArray(exportData);
      }
    }

    download();
  }, [checkedArray]);

  useEffect(() => {
    function pageInsert() {
      if (exportArray.length !== 0) {
        let pageData = [];
        for (let i = 0; i < page; i++) {
          if (exportArray[i]) {
            pageData.push(exportArray[i]);
          }
        }
        setPageArray(pageData);
      }
    }
    pageInsert();
  }, [exportArray, page]);

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

  function nextPage() {
    setPage(page + 10);
  }

  return (
    <div className="report">
      {location.row}
      <div className="columnSelection">
        {columnName &&
          columnName.map((item) => (
            <div>
              {/* <input
                type="checkbox"
                onChange={() => {
                  checkedColumn(item);
                }}
              />
              <label htmlFor="columnName">{item}</label> */}
              
              <label><input
                type="checkbox"
                onChange={() => {
                  checkedColumn(item);
                }}
              />{item}</label>
            </div>
          ))}
      </div>

      <div className="reportPreview">
        <CsvDownload data={exportArray} className="download">Download</CsvDownload>
        <h1>PREVIEW</h1>
        <table>
          <tr>
            {pageArray &&
              Object.keys(pageArray[0]).map((item) => <th>{item}</th>)}
          </tr>

          {pageArray &&
            pageArray.map((row) => (
              <tr>
                {Object.keys(pageArray[0]).map((item) => (
                  <td>{row[item]}</td>
                ))}
              </tr>
            ))}
        </table>
        {pageArray && <button onClick={nextPage}>Load More...</button>}
      </div>
    </div>
  );
}

export default Report;
