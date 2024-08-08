import {
  ReactFlow,
  Controls,
  ControlButton,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import TableModal from "./component/TableModal";
import { useState, useCallback, useEffect, useRef } from "react";
import { CustomNode } from "./component/CustomNode";
import { useDispatch, useSelector } from "react-redux";
import {
  addTable,
  removeTable,
  addRelation,
  removeRelation,
} from "./store/tablesSlice";

const custom = { customNode: CustomNode };

function App() {
  const dispatch = useDispatch();
  const nodesState = useSelector((state) => state.data["data"]);
  const edgesState = useSelector((state) => state.data["relation"]);
  const data = useSelector((state) => state.data);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    console.log("edges : ");
    console.log(edgesState);
    console.log("nodes : ");
    console.log(nodesState);
  }, [edgesState, nodesState]);

  const callAi = async () => {
    const url =
      "https://api.edenai.run/v2/workflow/49a72acd-97d8-4d79-8e17-b90534775b4f/execution/";
    console.log("hello : " + JSON.stringify(data));
    const payload = { Json: JSON.stringify(data) };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ${process.env.REACT_APP_API_TOKEN}",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console("Network response was not ok");
      }

      const result = await response.json();
      const execution_id = result.id;
      console.log(result);

      await new Promise((resolve) => setTimeout(resolve, 10000));

      const url2 = `https://api.edenai.run/v2/workflow/49a72acd-97d8-4d79-8e17-b90534775b4f/execution/${execution_id}/`;
      const response2 = await fetch(url2, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ${process.env.REACT_APP_API_TOKEN}",
        },
      });

      const finalresult = await response2.json();
      if (!response2.ok) {
        console("Network response2 was not ok");
      }
      console.log(finalresult.content.results.output.results[0].generated_text);
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

  useEffect(() => {
    console.log("hello");
    console.log(JSON.stringify(data));
  }, [data]);

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
          nodeTypes={custom}
        >
          <Background />
          <TableModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onSubmit={addNode}
          />
          <Controls />
          <div className="group z-10   fixed  right-10 bottom-10 ">
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
          </div>
        </ReactFlow>
      </div>
    </>
  );
}

export default App;
