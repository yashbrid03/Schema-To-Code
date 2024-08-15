import {
  ReactFlow,
  Controls,
  ControlButton,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import TableModal from "../component/TableModal";
import { useState, useCallback, useEffect, useRef } from "react";
import { CustomNode } from "../component/CustomNode";
import { useDispatch, useSelector } from "react-redux";
import {
  addTable,
  removeTable,
  addRelation,
  removeRelation,
} from "../store/tablesSlice";
import { IconCopy, IconDownload } from "@tabler/icons-react";
import { DownloadChart } from "../component/DownloadChart";

const custom = { customNode: CustomNode };

const formatSql = (sql) => {
  // console.log(typeof sql)
  const cleanedSql = sql.replace(/^```|```$/g, "");
};

const Board = () => {
  const dispatch = useDispatch();
  const nodesState = useSelector((state) => state.data["data"]);
  const edgesState = useSelector((state) => state.data["relation"]);
  const data = useSelector((state) => state.data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState();

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToCode = () => {
    window.scrollTo({ top: 1000, behavior: "smooth" });
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([code], { type: "text/sql" });
    element.href = URL.createObjectURL(file);
    element.download = "schema.sql";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

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

  const callAi = async () => {
    scrollToCode();
    setCode("Your Code is being generated ✨");
    const url =
      "https://api.edenai.run/v2/workflow/49a72acd-97d8-4d79-8e17-b90534775b4f/execution/";
    console.log("hello : " + JSON.stringify(data));
    console.log(import.meta.env.VITE_API_TOKEN);
    const payload = { Json: JSON.stringify(data) };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
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

      const url2 = `https://api.edenai.run/v2/workflow/49a72acd-97d8-4d79-8e17-b90534775b4f/execution/${execution_id}/`;
      const response2 = await fetch(url2, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
      });

      const finalresult = await response2.json();
      if (!response2.ok) {
        console("Network response2 was not ok");
      }

      const cleanedSql =
        finalresult.content.results.output.results[0].generated_text;
      // console.log(finalresult.content.results.output.results[0].generated_text);
      setCode(cleanedSql.replace(/^```|```$/g, ""));
    } catch (err) {
      console.log(err.message);
    }
  };

  const yPos = useRef(0);
  const addNode = useCallback(
    (tableName) => {
      yPos.current += 80;
      setNodes((nodes) => {
        dispatch(addTable({ tableName }));
        return [
          ...nodes,
          {
            id: tableName,
            type: "customNode",
            position: { x: 100, y: yPos.current },
            data: { label: tableName },
          },
        ];
      });
    },
    [dispatch]
  );

  const onNodesDelete = useCallback(
    (currnode) => {
      console.log("node id in delete");
      console.log(currnode[0].id);
      setNodes((nodes) => nodes.filter((node) => node.id !== currnode[0].id));
      dispatch(removeTable(currnode[0].id));
    },
    [dispatch]
  );

  const onEdgesDelete = useCallback(
    (curredge) => {
      console.log(curredge);
      setEdges((edges) => edges.filter((edge) => edge.id !== curredge[0].id));
      dispatch(
        removeRelation({
          source: curredge[0].source,
          target: curredge[0].target,
        })
      );
    },
    [dispatch]
  );

  const addEdge = useCallback(
    ({ source, target }) => {
      setEdges((edges) => {
        dispatch(addRelation({ source, target }));
        return [
          ...edges,
          {
            id: Math.random().toString(),
            source,
            target,
            label: "relationship",
          },
        ];
      });
    },
    [dispatch]
  );

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback((params) => addEdge(params), [addEdge]);

  // useEffect(() => {
  //   console.log("hello");
  //   console.log(JSON.stringify(data));
  // }, [data]);

  return (
    <>
      <div style={{ height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodesDelete={onNodesDelete}
          onEdgesDelete={onEdgesDelete}
          colorMode={"dark"}
          nodeTypes={custom}
        >
          <Background />
          <TableModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onSubmit={addNode}
          />
          <Controls />
          <Panel position="bottom-right">
            <button
              data-tooltip-target="tooltip"
              data-tooltip-style="light"
              onClick={() => openModal()}
              className=" dark:bg-slate-700  px-5 py-2 mr-3 rounded-full dark:text-white text-sm z-20"
            >
              Add Table
            </button>
            <button
              onClick={() => callAi()}
              className=" dark:bg-cyan-700 px-5 py-2 rounded-full dark:text-white text-sm z-20"
            >
              Code
            </button>
          </Panel>
          <DownloadChart />
          {/* <div className="group z-10   fixed  right-10 bottom-10 ">
              <button
                data-tooltip-target="tooltip"
                data-tooltip-style="light"
                onClick={() => openModal()}
                className=" bg-blue-500 font-bold px-3 py-3 rounded-full text-white z-20"
              >
                {" "}
                Add
              </button>
              <span className="z-20 absolute bottom-14 w-20 text-center right-0 scale-0 rounded bg-gray-200 p-2 text-xs text-black group-hover:scale-100">
                Add Table
              </span>
            </div>
            <div className="group z-10   fixed  right-10 bottom-24 ">
              <button
                onClick={() => callAi()}
                className=" bg-blue-500 font-bold px-3 py-3 rounded-full text-white z-20"
              >
                Code
              </button>
            </div> */}
        </ReactFlow>
      </div>
      <div
        style={{ minHeight: "100vh" }}
        className="dark:bg-stone-900 bg-white py-10 dark:text-slate-200 md:px-20 px-8"
      >
        <div className="text-xl md:text-4xl font-bold dark:text-white text-center  ">
          Your MySQL code :
        </div>
        <div className="dark:bg-stone-950 rounded-lg mt-5 pt-14 md:p-10 p-5 relative">
          {code ? <pre>
            <code>{code}</code>
          </pre> : <p>Click on code button to generate SQL code for your diagram</p>}
          {/* <p>Click on code button to generate SQL code for your diagram</p>
          <pre>
            <code>{code}</code>
          </pre> */}
          <div
            onClick={handleCopy}
            className="absolute top-4 right-5 bg-stone-800 rounded-md p-2 cursor-pointer"
          >
            <IconCopy></IconCopy>
          </div>
          <div
            onClick={handleDownload}
            className="absolute top-4 right-20 bg-stone-800 rounded-md p-2 cursor-pointer"
          >
            <IconDownload />
          </div>
        </div>
        {/* {
            code ? <div>{code}</div>:<div>no code generated</div>
          } */}
      </div>
    </>
  );
};

export default Board;
