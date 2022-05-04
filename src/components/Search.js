import { useState, useEffect, useMemo, useCallback } from "react";
import {
  useTable,
  useGlobalFilter,
  usePagination,
  useFilters,
} from "react-table";
import { Link } from "react-router-dom";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "https://localhost:5001/api/";

function GlobalFilter({ filter, setFilter, preGlobalFilteredRows }) {
  const count = preGlobalFilteredRows.length;
  return (
    <span>
      Global Search{" "}
      <input value={filter ? filter.value : ""}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
        placeholder={`${count} records`}
      />
    </span>
  );
}

function ColumnFilter({ column }) {
  const { filterValue, setFilter, preFilteredRows } = column;
  const count = preFilteredRows.length;

  return (
    <span>
      {" "}
      <input
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value || undefined)}
        placeholder={`${count} records`}
      ></input>
    </span>
  );
}

function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      // remove the empty string or null values
      const value = row.values[id];
      if (value !== undefined && value !== null && value !== "") {
        options.add(value);
      }
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function Search() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  async function getData() {
    const result = await axios(API_URL + "search/all");
    setData(result.data);
  }

  const test = useCallback(() => getData(), []);
  useEffect(() => {
    test();
  }, [test]);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "",
        Cell: (row) => {
          return <div>{row.row.cells[1].row.original.organizationID}</div>;
        },
        disableFilters: true,
        disableSortBy: true,
      },
      {
        Header: "Organization",
        accessor: "organizationName",
        Filter: ColumnFilter,
      },
      {
        Header: "Employee Count",
        accessor: "employeeCount",
        Filter: SelectColumnFilter,
      },

      {
        Header: "Business Details",
        columns: [
          {
            Header: "Business Address1",
            accessor: "businessAddress1",
            disableFilters: true,
          },
          {
            Header: "Business Address2",
            accessor: "businessAddress2",
            disableFilters: true,
          },
          {
            Header: "Business Street",
            accessor: "businessStreetName",
            disableFilters: true,
          },
          {
            Header: "Business City",
            accessor: "businessCity",
            disableFilters: true,
          },
          {
            Header: "Business Postal Code",
            accessor: "businessPostalCode",
            disableFilters: true,
          },
        ],
      },

      {
        Header: "Mailing Details",
        columns: [
          {
            Header: "Mailing Address1",
            accessor: "mailingAddress1",
            disableFilters: true,
          },
          {
            Header: "Mailing Address2",
            accessor: "mailingAddress2",
            disableFilters: true,
          },
          {
            Header: "Mailing Street",
            accessor: "mailingStreetName",
            disableFilters: true,
          },
          {
            Header: "Mailing City",
            accessor: "mailingCity",
            disableFilters: true,
          },
          {
            Header: "Mailing Postal Code",
            accessor: "mailingPostalCode",
            disableFilters: true,
          },
        ],
      },

      {
        Header: "Category",
        columns: [
          {
            Header: "Category",
            accessor: "categoryName",
            Filter: ColumnFilter,
          },
          {
            Header: "Sub Category",
            accessor: "subcategoryName",
            Filter: ColumnFilter,
          },
        ],
      },

      { Header: "Community", accessor: "community", Filter: ColumnFilter },

      {
        Header: "Contact Details",
        columns: [
          {
            Header: "Contact Email",
            accessor: "contactEmail",
            disableFilters: true,
          },
          {
            Header: "Contact Phone Number",
            accessor: "contactPhoneNumber",
            disableFilters: true,
          },
          {
            Header: "Contact Fax",
            accessor: "contactFax",
            disableFilters: true,
          },
          {
            Header: "Contact Name",
            accessor: "contactName",
            disableFilters: true,
          },
          {
            Header: "Contact Job Title",
            accessor: "contactJobTitle",
            disableFilters: true,
          },
        ],
      },

      {
        Header: "Contact Location",
        columns: [
          {
            Header: "Contact Address1",
            accessor: "contactAddress1",
            disableFilters: true,
          },
          {
            Header: "Contact Address2",
            accessor: "contactAddress2",
            disableFilters: true,
          },
          {
            Header: "Contact Street",
            accessor: "contactStreetName",
            disableFilters: true,
          },
          {
            Header: "Contact City",
            accessor: "contactCity",
            disableFilters: true,
          },
          {
            Header: "Contact Postal Code",
            accessor: "contactPostalCode",
            disableFilters: true,
          },
          {
            Header: "Contact Province",
            accessor: "contactProvince",
            disableFilters: true,
          },
        ],
      },
    ],
    []
  );

  const table = useTable(
    { columns, data, initialState: { pageSize: 15 } },
    useGlobalFilter,
    useFilters,
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    preGlobalFilteredRows,
    rows,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,

    // for clearing column filters
    setAllFilters,
    // for setting the global filter and clearing it
    setGlobalFilter,
  } = table;

  const { globalFilter, pageIndex } = state;
  const toReports = [];
  rows.forEach((item, index) => {
    toReports.push(item.original);
  });

  return (
    <main>
      <div className="sidebar">
        <div className="filters">
        <GlobalFilter
          filter={globalFilter}
          setFilter={setGlobalFilter}
          preGlobalFilteredRows={preGlobalFilteredRows}
        />

        {headerGroups.map((headerGroup) =>
          headerGroup.headers.map(
            (column) =>
              column.canFilter && (
                <div>
                  <p>{column.render("Header")}</p>
                  {column.render("Filter")}
                </div>
              )
          )
        )}
        
        <div className="buttons">
        <button className="clear"
          onClick={() => {
            setGlobalFilter("");
            setAllFilters([]);
          }}
        >
          Clear Filters
        </button>
        <button className="download" onClick={() => navigate("/Report", { state: toReports })}>Download</button>
      </div>
      </div>
      </div>
      <div className="search">
        <table
          {...getTableProps}
          style={{  overflowX: "scroll" }}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                    {/* <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div> */}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pagination">
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>&#10094;
          </button>
          <span>
            Page {pageIndex + 1} of {pageOptions.length}
          </span>
          
          <button onClick={() => nextPage()} disabled={!canNextPage}>
             	&#10095;
          </button>
        </div>
      </div>

    

      
    </main>

  );
}

export default Search;
