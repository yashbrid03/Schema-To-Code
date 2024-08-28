import React from "react";
import Board from "./page/Board";
import { Home } from "./page/Home";
import { ReactFlowProvider } from "@xyflow/react";
import { Routes, Route, Router } from "react-router-dom";
import { FloatingNav } from "./component/floating-navbar";
import { IconHome, IconCopy, IconTable, IconCode } from "@tabler/icons-react";
import { Query } from "./page/Query";
import { Dashboard } from "./page/Dashboard";

function App() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Board",
      link: "/boards",
      icon: <IconTable className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    // {
    //   name:"Query",
    //   link: "/query",
    //   icon: <IconCode className="h-4 w-4 text-neutral-500 dark:text-white" />,
    // },
  ];

  return (
    <div className="dark bg-zinc-900">
      <div className="">
        <FloatingNav navItems={navItems} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/designer" element={<ReactFlowProvider><Board /></ReactFlowProvider>}></Route>
          <Route path="/query" element={<Query/>}/>
          <Route path="/boards" element={<Dashboard/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
