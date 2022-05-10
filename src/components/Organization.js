import { useEffect, useMemo, useState } from "react";
import { useTable, usePagination, useFilters } from "react-table";
import OrganizationEdit from "./OrganizationEdit";
import OrganizationDelete from "./OrganizationDelete";
import OrganizationCreate from "./OrganizationCreate";
import GoToPage from "./GoToPage";
import { useNavigate } from "react-router-dom";
const axios = require("axios");
const path = process.env.REACT_APP_API_URL;

function ColumnFilter({ column }) {
  const { filterValue, setFilter, preFilteredRows } = column;
  const count = preFilteredRows.length;

  return (
    <span>
      Search:{" "}
      <input
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value || undefined)}
        placeholder={`${count} records`}
      ></input>
    </span>
  );
}

function Organization() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  async function getData() {
    const response = await axios.get(path + "organization");
    setData(response.data);
  }
  useEffect(() => {
    getData();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "organizationID",
        disableFilters: true,
        disableSortBy: true,
      },
      {
        Header: "Organization Name",
        accessor: "organizationName",
        Filter: ColumnFilter,
      },
      {
        Header: "Employee Count",
        accessor: "numberOfEmployees",
        disableFilters: true,
        disableSortBy: true,
      },
      {
        Header: "Website",
        accessor: "website",
        disableFilters: true,
        disableSortBy: true,
        Cell: (row) => {
          let websiteUrl = row.row.original.website;
          let websiteDisplay;
          if (
            websiteUrl !== "" &&
            websiteUrl !== null &&
            !websiteUrl.startsWith("http")
          ) {
            websiteUrl = "https://" + websiteUrl;
            websiteDisplay = new URL(websiteUrl).hostname;
          }
          if (row.row.original.website !== "") {
            return (
              <a href={websiteUrl} target="_blank" rel="noreferrer">
                {websiteDisplay}
              </a>
            );
          }
        },
      },
      {
        Header: "Category",
        accessor: "category",
        disableFilters: true,
      },
      {
        Header: "Sub Category",
        accessor: "subCategory",
        disableFilters: true,
      },
      {
        Header: "Branch Info",
        columns: [
          {
            Header: "# Active Branches",
            accessor: "activeBranches",
            disableFilters: true,
          },
          {
            Header: "# Inactive Branches",
            accessor: "inactiveBranches",
            disableFilters: true,
          },
          {
            Header: "# Total Branches",
            accessor: "totalBranches",
            disableFilters: true,
          },
        ],
      },
      {
        Header: "Actions",
        accessor: "",
        disableSortBy: true,
        disableFilters: true,
        Cell: (row) => {
          return (
            <div>
              <OrganizationEdit row={row} getData={getData} />
              <OrganizationDelete row={row} getData={getData} />
            </div>
          );
        },
      },
    ],
    []
  );

  const table = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 30 },
      autoResetPage: false,
    },
    useFilters,
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    prepareRow,
    gotoPage,
    state,
    // pagination
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    pageOptions,
  } = table;

  return (
    <main>
      <div className="sidebar">
        <OrganizationCreate getData={getData} />
        <div className="pagination">
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            &#10094;
          </button>
          <span>
            Page {state.pageIndex + 1} of {pageOptions.length}
          </span>

          <button onClick={() => nextPage()} disabled={!canNextPage}>
            &#10095;
          </button>

          <GoToPage gotoPage={gotoPage} pageLength={pageOptions.length} />
        </div>
      </div>

      <div className="organization">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  onClick={() =>
                    navigate("/organization/" + row.values.organizationID, {
                      state: row.values,
                    })
                  }
                >
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
      </div>
    </main>
  );
}

export default Organization;
