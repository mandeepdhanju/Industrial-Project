import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTable, usePagination, useFilters } from "react-table";
import OrganizationCreateForm from "./OrganizationCreateForm";
import OrganizationUpdateForm from "./OrganizationUpdateForm";
import OrganizationEdit from "./OrganizationEdit";
const axios = require("axios");
const path = "https://localhost:5001/api/";

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
          return <OrganizationEdit row={row} />;
        },
      },
    ],
    []
  );

  const table = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 15 },
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

    state,
    // pagination
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    pageOptions,
  } = table;

  return (
    <div className="organization">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
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
      <div>
        <span>
          Page {state.pageIndex + 1} of {pageOptions.length} out of{" "}
          {rows.length} total records
        </span>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous page
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next Page
        </button>
      </div>
    </div>
  );
}

export default Organization;
