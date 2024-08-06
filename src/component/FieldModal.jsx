import React from 'react'
import { useState, useEffect } from 'react';

  const FieldModal = ({ isOpen, onClose, onSubmit, tableName, isEdit, initialFieldData }) => {
    const [key, setKey] = useState('');
    const [value, setValue] = useState('');

    const sqlDataTypes = [
      "INT", "VARCHAR", "TEXT", "DATE", "BOOLEAN", "FLOAT", "DOUBLE", "CHAR", "BLOB", "DECIMAL"
    ];

    useEffect(() => {
      if (isEdit) {
        setKey(initialFieldData.key);
        setValue(initialFieldData.value);
      }
    }, [isEdit, initialFieldData]);

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
        <h2>{isEdit ? 'Edit' : 'Add'} Field in {tableName}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Column:
              <input id="keyInput" type="text" value={key} onChange={(e) => setKey(e.target.value)} required />
            </label>
          </div>
          <div>
            <label>
              Data Type:
              <select id="valueInput" value={value} onChange={(e) => setValue(e.target.value)} required>
                <option value="">Select Data Type</option>
                {sqlDataTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

export default FieldModal;