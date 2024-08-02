import React from 'react';

const TableData = ({ data }) => {
  return (
    <table border="1" className='w-full'>
      <thead>
        <tr>
          <th>Column</th>
          <th>DataType</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(data).map(([key, value]) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableData;
