import { useState } from 'react'
import './App.css'
import DraggableTable from './component/DraggableTable'


function App() {
  const [components, setComponents] = useState([])

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addComponent = (tableName) => {
    setComponents([...components, { id: components.length, tableName }]);
  };

  return (
    <>
      <div>
      <button onClick={openModal}>Add Table</button>
      <TableAddModal isOpen={isModalOpen} onClose={closeModal} onSubmit={addComponent} />
      {components.map((component) => (
        <DraggableTable key={component.id} tableName={component.tableName} />
      ))}
    </div>
    </>
  )
}
import TableAddModal from './component/TableAddModal'

export default App
