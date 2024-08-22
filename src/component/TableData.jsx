import React from "react";

const truncateString = (str, num) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
};

const TableData = ({ data, onDelete, onEdit }) => {
  return (
    <div className=" rounded-md mt-2">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg">
        <thead className="text-xs text-black uppercase  dark:text-black ">
          <tr>
            <th scope="col" className="pr-6 py-3">
              Column
            </th>
            <th scope="col" className="px-3 py-3">
              DataType
            </th>
            <th className="text-center" colSpan={2}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([key, value]) => (
            <tr key={key} className="bg-transparent dark:border-gray-500">
              <td
                scope="row"
                className="px-3 py-3 font-medium text-gray-900 whitespace-nowrap "
              >
                {truncateString(key, 10)}
              </td>
              <td className="px-3 py-3 text-gray-900">{value}</td>
              <td>
                <button
                  onClick={() => onEdit(key, value)}
                  className="text-blue-700 px-3 py-3"
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  onClick={() => onDelete(key)}
                  className="text-red-700 px-3 py-3"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableData;
