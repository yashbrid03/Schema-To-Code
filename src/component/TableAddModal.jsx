// ModalComponent.jsx
import React, { useState } from 'react';

const TableAddModal = ({ isOpen, onClose, onSubmit }) => {
  const [tableName, setTableName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(tableName);
    onClose();
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '4px' }}>
        <h2>Enter Table Name</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TableAddModal;
