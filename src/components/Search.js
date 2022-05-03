import { useState, useEffect, useMemo, useCallback } from "react";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import axios from "axios";

const API_URL = "https://localhost:5001/api/";

function GlobalFilter({ filter, setFilter }) {
  return (
    <span>
      Search:{" "}
      <input
        value={filter ? filter.value : ""}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      />
    </span>
  );
}

function Search() {
  const [data, setData] = useState([]);
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
        Header: "#",
        accessor: "",
        Cell: (row) => {
          return <div>{row.row.id}</div>;
        },
        disableFilters: true,
        disableSortBy: true,
      },
      { Header: "Organization", accessor: "organizationName" },

      {
        Header: "Business Details",
        columns: [
          { Header: "Business Address1", accessor: "businessAddress1" },
          { Header: "Business Address2", accessor: "businessAddress2" },
          { Header: "Business Street", accessor: "businessStreetName" },
          { Header: "Business City", accessor: "businessCity" },
          { Header: "Business Postal Code", accessor: "businessPostalCode" },
        ],
      },

      {
        Header: "Mailing Details",
        columns: [
          { Header: "Mailing Address1", accessor: "mailingAddress1" },
          { Header: "Mailing Address2", accessor: "mailingAddress2" },
          { Header: "Mailing Street", accessor: "mailingStreetName" },
          { Header: "Mailing City", accessor: "mailingCity" },
          { Header: "Mailing Postal Code", accessor: "mailingPostalCode" },
        ],
      },

      {
        Header: "Category",
        columns: [
          { Header: "Category", accessor: "categoryName" },
          { Header: "Sub Category", accessor: "subcategoryName" },
        ],
      },

      { Header: "Community", accessor: "community" },

      {
        Header: "Contact Details",
        columns: [
          { Header: "Contact Email", accessor: "contactEmail" },
          { Header: "Contact Phone Number", accessor: "contactPhoneNumber" },
          { Header: "Contact Fax", accessor: "contactFax" },
          { Header: "Contact Name", accessor: "contactName" },
          { Header: "Contact Job Title", accessor: "contactJobTitle" },
        ],
      },

      {
        Header: "Contact Location",
        columns: [
          { Header: "Contact Address1", accessor: "contactAddress1" },
          { Header: "Contact Address2", accessor: "contactAddress2" },
          { Header: "Contact Street", accessor: "contactStreetName" },
          { Header: "Contact City", accessor: "contactCity" },
          { Header: "Contact Postal Code", accessor: "contactPostalCode" },
          { Header: "Contact Province", accessor: "contactProvince" },
        ],
      },
    ],
    []
  );

  const table = useTable(
    { columns, data, initialState: { pageSize: 15 } },
    useGlobalFilter,
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,

    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
  } = table;

  const { globalFilter, pageIndex } = state;
  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <div className="search">
        <table
          {...getTableProps}
          style={{ height: "90vh", overflowX: "scroll" }}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
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
            Page {pageIndex + 1} of {pageOptions.length}
          </span>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </button>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Search;
