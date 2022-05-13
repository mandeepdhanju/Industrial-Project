import CsvDownload from "react-json-to-csv";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
let xlsx = require("json-as-xlsx");

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

  let bULPrepArray = [
    "organizationName",
    "organizationWebsite",
    "organizationActive",
    "comment",
    "employeeCount",
    "categoryName",
    "subcategoryName",
    "branchName",
    "branchActive",
    "community",
    "businessAddress1",
    "businessAddress2",
    "businessStreetName",
    "businessCity",
    "businessProvince",
    "businessPostalCode",
    "mailingAddress1",
    "mailingAddress2",
    "mailingStreetName",
    "mailingCity",
    "mailingProvince",
    "mailingPostalCode",
    "contactName",
    "contactEmail",
    "contactPhoneNumber",
    "contactFax",
    "contactJobTitle",
    "primaryContact",
    "contactActive",
    "contactAddress1",
    "contactAddress2",
    "contactStreetName",
    "contactCity",
    "contactProvince",
    "contactPostalCode",
  ];
  useEffect(() => {
    function reOrganize() {
      if (tempArray) {
        setCheckedArray("");
        bULPrepArray.forEach((item) => {
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

  function downloadXlsx() {
    if (checkedArray != "") {
      let exportData = [{ sheet: "exported data", columns: [], content: [] }];
      let newColumnArray = [];
      let newContentArray = [];
      checkedArray.forEach((i) => {
        newColumnArray.push({ label: i, value: i });
      });
      exportArray.forEach((all) => {
        let obj = {};
        checkedArray.forEach((col) => {
          let newObj = {};
          let item = all[col];
          newObj[col] = item;
          Object.assign(obj, newObj);
        });
        newContentArray.push(obj);
      });
      exportData[0].columns = newColumnArray;
      exportData[0].content = newContentArray;

      let settings = {
        fileName: "MySpreadsheet", // Name of the resulting spreadsheet
        extraLength: 2, // A bigger number means that columns will be wider
      };
      xlsx(exportData, settings);
    } else {
      alert("Please select column(s) for xlsx download");
    }
  }

  return (
    <div className="report">
      <div className="sidebar">
      <div className="columnSelection">
        <button id="allSB" onClick={selectAllFunc}>
          Select All
        </button>
        <button id="allDSB" onClick={deselect}>
          Deselect All
        </button>
        {columnName &&
          columnName.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                checkedColumn(item);
              }}
            >
              <input
                readOnly
                checked={checkedArray.includes(item) ? true : false}
                type="checkbox"
              />
              <label htmlFor="columnName">{item}</label>
            </div>
          ))}
      </div>
      <div className="buttons">
      <CsvDownload data={exportArray} className="download">
          CSV Download
        </CsvDownload>
        <button onClick={downloadXlsx}>xlsx Download</button>
      </div>
      </div>
      <div className="reportPreview">
        
        <h1>PREVIEW</h1>
        <table>
          <tbody>
            <tr>
              {pageArray
                ? Object.keys(pageArray[0]).map((item, index) => (
                    <th key={index}>{item}</th>
                  ))
                : null}
            </tr>
            {pageArray
              ? pageArray.map((row, index) => (
                  <tr key={index}>
                    {Object.keys(pageArray[0]).map((item, index) => (
                      <td key={index}>{row[item]}</td>
                    ))}
                  </tr>
                ))
              : null}
          </tbody>
        </table>
        {pageArray && (
          <>
            <button
              onClick={() => {
                if (exportArray.length > page) setPage(page + 10);
              }}
            >
              Load More...
            </button>
            <button
              onClick={() => {
                if (page > 10) {
                  setPage(page - 10);
                }
              }}
            >
              Load Less...
            </button>
            {page && (
              <p>
                {pageArray.length} of {all.length}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Report;
