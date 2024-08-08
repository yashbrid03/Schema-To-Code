import React from "react";
import { useState, useEffect } from "react";

const FieldModal = ({
  isOpen,
  onClose,
  onSubmit,
  tableName,
  isEdit,
  initialFieldData,
}) => {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  const sqlDataTypes = [
    "INT",
    "VARCHAR",
    "TEXT",
    "DATE",
    "BOOLEAN",
    "FLOAT",
    "DOUBLE",
    "CHAR",
    "BLOB",
    "DECIMAL",
  ];

  useEffect(() => {
    if (isEdit) {
      setKey(initialFieldData.key);
      setValue(initialFieldData.value);
    }
  }, [isEdit, initialFieldData]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ [key]: value });
    setKey("");
    setValue("");
    onClose();
  };
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black  z-50   bg-gray-100 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="bg-white w-full p-4 rounded">
        <h2>
          {isEdit ? "Edit" : "Add"} Field in {tableName}
        </h2>
        <form class="max-w-sm mx-auto" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Column
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="keyInput"
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              required
            />
          </div>
          <div className="mt-3">
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              DataType
            </label>
            <select
              id="valueInput"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              <option value="">Select Data Type</option>
              {sqlDataTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
            <button
              onClick={onClose}
              className="ml-4 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FieldModal;
