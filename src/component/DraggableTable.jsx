import React, { useState } from 'react'
import {useXarrow} from 'react-xarrows'
import Draggable from 'react-draggable'
import { FieldAddmodal } from './FieldAddmodal';
import TableData from './TableData'

export default function DraggableTable({tableName}) {
  const [fields,setfields] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
    const updateXarrow = useXarrow();

    const addFields = (field) => {
      setfields(prevData => ({...prevData,...field}));
    };
  return (
    <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
      <div className='w-60 h-full border-2 rounded-md border-indigo-500/100'>
      <h3>Table: {tableName}</h3>
      <TableData data={fields} />
      <FieldAddmodal isOpen={isModalOpen} onClose={closeModal} onSubmit={addFields} />
      <button onClick={openModal}>Add Field</button>
      </div> 
    </Draggable>
  )
}
