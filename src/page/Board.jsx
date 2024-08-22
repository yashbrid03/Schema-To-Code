import {
  ReactFlow,
  Controls,
  ControlButton,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  Panel,
  
} from "@xyflow/react";
import { useReactFlow } from '@xyflow/react';
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
  setFieldState,
} from "../store/tablesSlice";
import {addNodeToStore} from "../store/nodeSlice"
import { IconCopy, IconDownload } from "@tabler/icons-react";
import { DownloadChart } from "../component/DownloadChart";
import { authentication,db } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { useLocation } from 'react-router-dom';
import { removeNodeToStore } from "../store/nodeSlice";

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
  const [boardName,setBoardName] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const location = useLocation();
  const navigate = useNavigate()
  // const navigate = useNavigate();

  const effectRan = useRef(false);
  useEffect(() => {
    if (effectRan.current) return;
    // Check if the user navigated from the source page
    if (!location.state || !location.state.fromSourcePage) {
      // Redirect if they didn't
      navigate('/');
    }else{
      setNodes(location.state.nodes)
      setEdges(location.state.edges)
      location.state.nodes.map((node)=>{
        dispatch(addTable({ tableName:node.id }))
        dispatch(addNodeToStore(node))
      })

      location.state.edges.map((edge)=>{
        dispatch(addRelation({ source:edge.source, target:edge.target }));
      })
      console.log("first")
      setBoardName(location.state.name)
      effectRan.current = true;
    }
  }, );

  // useEffect(()=>{
  //   console.log(data)
  // },[data])

  const reactFlow = useReactFlow();
  


  useEffect(()=>{
    console.log(reactFlow.getNodes())
    console.log(data)
  },[nodes,data])


  // save board
  const nodestodb = useSelector((state)=>state.node.nodes)
  
  useEffect(()=>{
    console.log(nodestodb)
  },[nodestodb])

  useEffect(()=>{
    console.log(nodestodb)
  })
  
  // useEffect(()=>{
  //   console.log(state)
  // },[dispatch,state])

  const SaveBoard = async()=>{
    
    const userRef = doc(db, "users", userget.uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      let boards = userData.boards || [];
  
      // Find the index of the board with the given name
      const boardIndex = boards.findIndex(board => board.name === boardName);
  
      if (boardIndex !== -1) {
        // Update the content of the specific board

        //update position
        const list2 = reactFlow.getNodes();
        const updatednodestodb = nodestodb.map(item1 =>{
          const matchingItem2 = list2.find(item2 => item2.id === item1.id);
          if (matchingItem2) {
            return { ...item1, position: matchingItem2.position };
          }
          return item1;
        })
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;
        console.log(boards[boardIndex].createdAt)
        boards[boardIndex] = {
          name:boardName,
          nodes:updatednodestodb,
          edges : reactFlow.getEdges(),
          createdAt : boards[boardIndex].createdAt,
          updatedAt:formattedDate
           // Spread new content properties to update the board
        };
  
        // Save the updated boards array back to Firestore
        await updateDoc(userRef, { boards });
  
        alert("Board content updated successfully.");
      } else {
        alert("Board not found.");
      }
    } else {
      alert("User not found.");
    }
  }

  // save board end
  

  // auth

  const [userget,setUser] = useState(null)
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = authentication.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
              setUser(currentUser);
              console.log(currentUser)
              setLoading(false); 
      
            } else {
              setUser(null);
              setLoading(false); 
            }
          });
      
          return () => unsubscribe();
    }, []);

    
    useEffect(() => {
        if(!loading && userget === null){
            alert("you must me logged in")
            navigate('/')
        }
        if(!loading && userget){
            console.log(userget.uid);
        }
    },[userget, loading])

  // auth end

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // const scrollToTop = () => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // };

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
        dispatch(addNodeToStore({
          id: tableName,
          type: "customNode",
          position: { x: 100, y: yPos.current },
          data: { label: tableName, fields:{} },
        }));
        return [
          ...nodes,
          {
            id: tableName,
            type: "customNode",
            position: { x: 100, y: yPos.current },
            data: { label: tableName, fields:{} },
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
      dispatch(removeNodeToStore(currnode[0].id))
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
          <Panel position="top-left">
            <button onClick={()=>SaveBoard()}>
              save
            </button>
          </Panel>
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
