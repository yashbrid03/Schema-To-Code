import React, { useState } from "react";

export const Query = () => {

  const [schema,setSchema] = useState('')
  const [query,setQuery] = useState('')


  return (
    <>
      <div className="text-white px-24 pt-20">
        <h1 className="text-6xl font-bold">Query your Schema</h1>
        {/* <h1 className="text-2xl font-medium mt-5">Schema Context : </h1> */}
        <div className="col-span-full mt-5">
          <label
            htmlFor="about"
            className="block text-sm md:text-2xl font-medium leading-6 "
          >
            Schema Context :
          </label>
          <div className="mt-2">
            <textarea
              id="about"
              name="about"
              rows={3}
              value={schema}
              onChange={(e) => setSchema(e.target.value)}
              className="block w-full rounded-md border-0   bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none block w-full p-2.5 dark:text-gray-900 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 sm:text-sm sm:leading-6"
              
            />
          </div>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Describe your schema.
          </p>
        </div>
        <div className="col-span-full mt-2">
          <label
            htmlFor="about"
            className="block text-sm md:text-2xl font-medium leading-6 "
          >
            Your Query :
          </label>
          <div className="mt-2">
            <textarea
              id="about"
              name="about"
              rows={2}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="block w-full rounded-md border-0   bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none block w-full p-2.5 dark:text-gray-900 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 sm:text-sm sm:leading-6"
              
            />
          </div>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Describe the result you want from query.
          </p>
        </div>
        <button
              // onClick={() => callAi()}
              className=" dark:bg-cyan-700 px-5 py-2 mt-3 rounded-full dark:text-white text-sm z-20"
            >
              Get SQL Query
            </button>
      </div>
    </>
  );
};
