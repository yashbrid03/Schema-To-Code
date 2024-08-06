import React, { useState } from 'react';

const TableModal = ({ isOpen, onClose, onSubmit }) => {
  const [tableName, setTableName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    // e.preventDefault();
    onSubmit(tableName);
    onClose();
  };

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white p-4 rounded'>
        <h2>Enter Table Name</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            required
          /><br></br>
          <div className='mt-4'>
          <button type='submit' className='rounded-lg bg-lime-500 px-3 py-1 font-bold'>Submit</button>
          <button onClick={onClose} className='ml-4 rounded-lg bg-red-500 px-3 py-1 font-bold'>Close</button>
          </div>
          
        </form>
        
      </div>
    </div>
  );
};

export default TableModal;
