import { ReactFlow,  Controls, ControlButton, Background, applyNodeChanges, applyEdgeChanges } from '@xyflow/react'
import '@xyflow/react/dist/style.css';
import TableModal from './component/TableModal'
import { useState, useCallback, useEffect, useRef } from 'react';
import { CustomNode } from './component/CustomNode';

const custom = {customNode:CustomNode}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);


  const [nodes,setNodes] = useState([])
  const [edges, setEdges] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  }
  const closeModal = () => setIsModalOpen(false);
  
  useEffect(()=>{
    console.log(edges)
  },[edges])


  const yPos = useRef(0);
  const addNode = useCallback((tableName) => {
    yPos.current += 80;
    setNodes((nodes) => {
      return [
        ...nodes,
        {
          id: tableName,
          type:'customNode',
          position: { x: 100, y: yPos.current },
          data: { label: tableName }
        }
      ];
    });
  }, []);

  const addEdge = useCallback(({ source, target }) => {
    setEdges((edges) => [
      ...edges,
      {
        id: Math.random().toString(),
        
        source,
        target,
        label: "relationship",
      },
    ]);
  }, []);


  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  const onConnect = useCallback(
    (params) => addEdge(params),
    [addEdge]
  );


  return (
    <>
    <div style={{ height: '100vh' }}>
      
    <ReactFlow 
    nodes={nodes}
    onNodesChange={onNodesChange}
    edges={edges}
    onEdgesChange={onEdgesChange}
    onConnect={onConnect}
    nodeTypes={custom}>
      <Background />
      <TableModal isOpen={isModalOpen} onClose={closeModal} onSubmit={addNode} />
      <Controls/>
      <div class="group z-10   fixed  right-10 bottom-10 ">
      <button data-tooltip-target="tooltip" data-tooltip-style="light" onClick={() => openModal()} className=' bg-blue-500 font-bold px-3 py-3 rounded-full text-white z-20'> Add</button>
      <span className="z-20 absolute bottom-14 w-20 text-center right-0 scale-0 rounded bg-gray-200 p-2 text-xs text-black group-hover:scale-100">Add Table</span>
      </div>
      
      
    </ReactFlow>
    </div>
    </>
  )
}

export default App
