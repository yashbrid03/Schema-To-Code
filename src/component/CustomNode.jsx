import React from 'react'
import { useState } from 'react';

export const CustomNode = ({data}) => {

  const [fields, setFields] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addFields = (field) => {
    setFields(prevData => ({ ...prevData, ...field }));
  };

  return (<>
    <h1>{data.label}</h1>
    {/* Table logic here */}
    <button>Add field</button>
    </>
  )
}
