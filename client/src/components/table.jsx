import React from "react";

function DynamicTable({ headers, data }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-white dark:text-gray-400 bg-gray-900 dark:bg-gray-800">
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                scope="col"
                className={`px-6 py-3 ${
                  index % 2 === 0 ? "bg-gray-900 dark:bg-gray-700" : "bg-gray-800 dark:bg-gray-600"
                }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              className={`border-b ${
                rowIndex % 2 === 0 ? "bg-gray-800 dark:bg-gray-700" : "bg-gray-700 dark:bg-gray-600"
              }`}
            >
              {headers.map((header, colIndex) => (
                <td
                  key={colIndex}
                  className={`px-6 py-4 ${
                    colIndex % 2 === 0 ? "bg-gray-800 dark:bg-gray-700" : "bg-gray-700 dark:bg-gray-600"
                  }`}
                >
                  {item[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DynamicTable;
