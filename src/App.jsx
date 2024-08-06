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
    console.log(nodes)
  },[nodes])


  const yPos = useRef(0);
  const addNode = useCallback((tableName) => {
    yPos.current += 80;
    setNodes((nodes) => {
      return [
        ...nodes,
        {
          id: Math.random().toString(),
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
      <Controls>
        <ControlButton onClick={() => openModal()}>
          <div>Add table</div>
        </ControlButton>
      </Controls>
    </ReactFlow>
    </div>
    </>
  )
}

export default App
