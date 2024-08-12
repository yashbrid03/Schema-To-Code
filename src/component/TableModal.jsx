import React, { useState } from "react";

const TableModal = ({ isOpen, onClose, onSubmit }) => {
  const [tableName, setTableName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    onSubmit(tableName);
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center  bg-opacity-50 z-50">
      <div className="dark:bg-[#bdbebf] p-4 rounded">
        {/* <h2>Enter Table Name</h2> */}
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
          <label className="block mb-2 text-sm font-medium dark:text-gray-900 text-white">
            Table Name
          </label>

          <input
            className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none block w-full p-2.5 dark:text-gray-900 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 "
            type="text"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            required
          />
          <div className="mt-4">
            <button
              type="submit"
              className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
            <button
              onClick={onClose}
              className="ml-4 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TableModal;
