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
        <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400 ">
          <tr>
            <th scope="col" class="px-3 py-3">
              Column
            </th>
            <th scope="col" class="px-3 py-3">
              DataType
            </th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([key, value]) => (
            <tr
              key={key}
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td
                scope="row"
                class="px-3 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {truncateString(key, 10)}
              </td>
              <td class="px-3 py-3">{value}</td>
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
