import React, { useState } from "react";
import { IconCopy } from "@tabler/icons-react";
import { useEffect } from "react";
export const Query = () => {
  const [schema, setSchema] = useState("");
  const [query, setQuery] = useState("");
  const [code, setCode] = useState("");

  const handleCopy = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        alert("Text copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const scrollToCode = () => {
    window.scrollTo({ top: 1000, behavior: "smooth" });
  };

  const callAi = async () => {
    scrollToCode();
    setCode("Your Code is being generated ✨");
    const url =
      "https://api.edenai.run/v2/workflow/227f356e-cf92-4047-8d80-015183a86750/execution/";
    // console.log("hello : " + JSON.stringify(data));

    const payload = {
      schema: JSON.stringify(schema),
      uQuery: JSON.stringify(query),
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKENTWO}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console("Network response was not ok");
      }

      const result = await response.json();
      const execution_id = result.id;
      console.log(result);

      await new Promise((resolve) => setTimeout(resolve, 5000));
      setCode("Hold on for a second! ✨");
      await new Promise((resolve) => setTimeout(resolve, 5000));

      const url2 = `https://api.edenai.run/v2/workflow/227f356e-cf92-4047-8d80-015183a86750/execution/${execution_id}/`;
      const response2 = await fetch(url2, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKENTWO}`,
        },
      });

      const finalresult = await response2.json();
      if (!response2.ok) {
        console.log("Network response2 was not ok");
      }

      const cleanedSql =
        finalresult.content.results.output.results[0].generated_text;
      // console.log(finalresult.content.results.output.results[0].generated_text);
      setCode(cleanedSql.replace(/^```|```$/g, ""));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="text-white px-24 py-20">
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
                required
                id="about"
                name="about"
                rows={3}
                value={schema}
                onChange={(e) => setSchema(e.target.value)}
                className="block w-full rounded-md border-0   bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none block w-full p-2.5 dark:text-gray-900 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 sm:text-sm sm:leading-6"
              />
            </div>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Describe your schema. For best result you can paste your schema definition.
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
                required
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
            onClick={()=> callAi()}
            className=" dark:bg-cyan-700 px-5 py-2 mt-3 rounded-full dark:text-white text-sm z-20"
          >
            Get SQL Query
          </button>
          <div className="text-xl md:text-4xl font-bold dark:text-white text-center  ">
          Your MySQL Query :
        </div>
        <div className="dark:bg-stone-950 rounded-lg mt-5 pt-14 md:p-10 p-5 relative">
          <div className="flex mb-4">
            <div className="w-3.5 h-3.5 rounded-full  bg-red-600"></div>
            <div className="w-3.5 h-3.5 ml-2 rounded-full  bg-yellow-600"></div>
            <div className="w-3.5 h-3.5 ml-2 rounded-full  bg-green-600"></div>
          </div>
          {code ? (
            <pre>
              <code>{code}</code>
            </pre>
          ) : (
            <p>Click on `Get SQL Query`` button to generate SQL code.</p>
          )}
          <div
            onClick={handleCopy}
            className="absolute top-4 right-5 bg-stone-800 rounded-md p-2 cursor-pointer"
          >
            <IconCopy></IconCopy>
          </div>
        </div>
      </div>
    </>
  );
};
