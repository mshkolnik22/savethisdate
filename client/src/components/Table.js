import React from "react"

const Table = (props) => {
  const dataList = props.data;
  const columns = props.columns;

  return (
    <>
      <h2>View {props.title} </h2>
      <table>
        {dataList && dataList.length ? (
          <>
            <thead>
              <tr>
                {columns.map((col, index) => (
                  <th key={index}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataList.map((data) => (
                <tr key={data[props.primaryKey]}>
                  {props.rowsKeys.map((key, index) => (
                    <td key={index}>{data[key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </>
        ) : (
          <tbody>
            <tr>
              <td colSpan={3}> No Data in {props.title}</td>
            </tr>
          </tbody>
        )}
      </table>
    </>
  )
}

export default Table;
