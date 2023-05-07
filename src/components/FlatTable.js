
import { useTable } from "react-table";
import React, { useMemo} from "react";

export default function FlatTable({flatinfo, id}) {
    // Table component logic and UI come here
    console.log(flatinfo)
    console.log(id)
    const columns = useMemo(
        () => [
          {
            // first group - TV Show
            Header: "דירות",
            // First group columns
            columns: [
              {
                Header: "משפחה",
                accessor: row => row.familyName || "No Family Name",
              },
              {
                Header: "דירה",
                accessor: row => row.flatid,
              }
            ]
           }
        ],
    []
    );

    const {
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow // Prepare the row (this function needs to be called for each row before getting the row props)
    } = useTable({
    columns,
    data: flatinfo
    });
    
    
  
    return (
        <table {...getTableBodyProps()} style={{ margin: "0 auto", border: "1px solid black" }}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
 }