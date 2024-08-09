import React from 'react'
import Board from './page/Board';
import { Home } from './page/Home';

import { Routes, Route, Router } from "react-router-dom";
import { FloatingNav } from "./component/floating-navbar";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";

function App() {
  
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Board",
      link: "/designer",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ];

  return (
    <div className='dark'>
      <FloatingNav navItems={navItems} />
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/designer' element={<Board/>}></Route>
    </Routes>
    
    </div>
  );
}

export default App;
