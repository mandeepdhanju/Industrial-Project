import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import OrganizationCreateForm from "./OrganizationCreateForm";
import OrganizationUpdateForm from "./OrganizationUpdateForm";
const axios = require("axios");
const path = "https://localhost:5001/api/";

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
      },
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Sub Category",
        accessor: "subCategory",
      },
      {
        Header: "Branch Info",
        columns: [
          {
            Header: "# Active Branches",
            accessor: "activeBranches",
          },
          {
            Header: "# Inactive Branches",
            accessor: "inactiveBranches",
          },
          {
            Header: "# Total Branches",
            accessor: "totalBranches",
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
              <button onClick={() => console.log(row.row.cells[0].value)}>
                Get thing
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  const table = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    table;
  return (
    <div className="organization">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
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
    </div>
  );
}

export default Organization;
