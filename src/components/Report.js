import CsvDownload from "react-json-to-csv";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Report() {
  const location = useLocation();
  const [all, setAll] = useState();
  const [columnName, setColumnName] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [exportArray, setExportArray] = useState([]);
  const [pageArray, setPageArray] = useState();
  const [page, setPage] = useState(10);
  const [tempArray, setTempArray] = useState([]);
  useEffect(() => {
    function getAll() {
      let passedData = location.state;
      passedData.forEach((item) => {
        let columns = Object.keys(item);
        columns.forEach((column) => {
          if (column.includes("ID")) {
            delete item[column];
          }
        });
      });
      setColumnName(Object.keys(passedData[0]));
      setAll(passedData);
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
      } else {
        setExportArray(exportData);
      }
    }

    download();
  }, [checkedArray]);

  useEffect(() => {
    function pageInsert() {
      let pageData = [];
      if (exportArray.length !== 0) {
        for (let i = 0; i < page; i++) {
          if (exportArray[i]) {
            pageData.push(exportArray[i]);
          }
        }
        setPageArray(pageData);
      } else {
        setPageArray("");
      }
    }
    pageInsert();
  }, [exportArray, page]);

  useEffect(() => {
    function reOrganize() {
      if (tempArray) {
        setCheckedArray("");
        columnName.forEach((item) => {
          tempArray.forEach((item2) => {
            if (item === item2) {
              setCheckedArray((checked) => [...checked, item2]);
            }
          });
        });
      }
    }

    reOrganize();
  }, [tempArray]);

  function checkedColumn(checkedColumn) {
    if (tempArray.includes(checkedColumn)) {
      const index = tempArray.indexOf(checkedColumn);

      setTempArray([
        ...tempArray.slice(0, index),
        ...tempArray.slice(index + 1),
      ]);
    } else {
      setTempArray((checked) => [...checked, checkedColumn]);
    }
  }

  function selectAllFunc() {
    let allArray = [];
    columnName.forEach((column) => {
      allArray.push(column);
    });
    setTempArray(allArray);
  }
  function deselect() {
    setTempArray([]);
  }

  return (
    <div className="report">
      <div className="columnSelection">
        <button onClick={selectAllFunc}>Select All</button>
        <button onClick={deselect}>Deselect All</button>
        {columnName &&
          columnName.map((item) => (
            <div>
              <input
                checked={checkedArray.includes(item) ? true : false}

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
        {pageArray && (
          <button
            onClick={() => {
              setPage(page + 10);
            }}
          >
            Load More...
          </button>
        )}
      </div>
    </div>
  );
}

export default Report;
