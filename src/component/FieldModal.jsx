import React from 'react'
import { useState } from 'react';

export const FieldModal = ({ isOpen, onClose, onSubmit, tableName }) => {
    const [key, setKey] = useState('');
    const [value, setValue] = useState('');
    if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({[key]:value});
    setKey('');
    setValue('');
    onClose();
  };
  return (
    <div className='w-[3/4]' style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '4px' }}>
        <h2>Add Field in {tableName}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Column:
              <input type="text" value={key} onChange={(e) => setKey(e.target.value)} required />
            </label>
          </div>
          <div>
            <label>
              Data Type:
              <input type="text" value={value} onChange={(e) => setValue(e.target.value)} required />
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

