import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { authentication, db } from "../firebase/config";
import BoardModal from "../component/BoardModal";
import { clearStore } from "../store/tablesSlice";
import { clearStoreNode } from "../store/nodeSlice";
import { useDispatch } from "react-redux";
import { IconPlus } from "@tabler/icons-react";


export const Dashboard = () => {
  // auth
  const dispatch = useDispatch();
  const [userget, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boardList, setBoardList] = useState([]);

  //table

  // table end

  useEffect(() => {
    dispatch(clearStore({}))
    dispatch(clearStoreNode({}))
    const unsubscribe = authentication.onAuthStateChanged(
      async (currentUser) => {
        if (currentUser) {
          await getBoards(currentUser.uid)
          setUser(currentUser);
          setLoading(false);
          
        } else {
          setUser(null);
          setLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && userget === null) {
      alert("you must me logged in");
      navigate("/");
    }
    if (!loading && userget) {
      console.log(userget.uid);
      
    }
  }, [userget, loading, navigate]);

  // auth end

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const checkCondition = async (newBoardName) => {
    const userRef = doc(db, "users", userget.uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const userType = userData.type;
      const boards = userData.boards || [];

      // Check if a board with the same name already exists
      const boardExists = boards.some((board) => board.name === newBoardName);

      if (boardExists) {
        alert("A board with this name already exists.");
        return;
      }

      if (userType === "free" && boards.length > 0) {
        alert("You can't create more boards in the free plan.");
      } else {
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;
        await updateDoc(userRef, {
          boards: arrayUnion({
            name: newBoardName,
            createdAt:formattedDate,
            updatedAt:formattedDate,
            nodes: [],
            edges: [],
          }),
        });
        navigate("/designer", {
          state: { fromSourcePage: true, name: newBoardName, nodes:[],edges:[] },
        });
      }
    } else {
      alert("User not found.");
    }
  };


  const getBoards = async (uid) => {
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const boards = userData.boards || [];
      setBoardList(boards);
    } else {
      console.error("User not found.");
      setBoardList([]); // Clear the board list if no user found
    }
  };

  const openDesigner = (board)=>{
    navigate("/designer", {
      state: { fromSourcePage: true, name: board.name, nodes:board.nodes,edges:board.edges },
    });
  }

  const deleteBoard = async(boardName)=>{
    // console.log(name)
    const userRef = doc(db, "users", userget.uid);
    const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    const userData = userDoc.data();
    const boards = userData.boards || [];

    // Filter out the board with the given name
    const updatedBoards = boards.filter((board) => board.name !== boardName);
    setBoardList(updatedBoards)
    if (updatedBoards.length === boards.length) {
      console.log("Board not found.");
      return;
    }

    // Update the user's document with the new boards array
    await updateDoc(userRef, {
      boards: updatedBoards,
    });

    console.log("Board deleted successfully.");
  } else {
    console.log("User not found.");
  }
  }


  return (
    <>
    <div className="text-white px-24 pt-20">
      <h1 className="text-6xl font-bold">Your Schemas</h1>
      <div class="flex flex-row-reverse ">
      <button className="bg-black text-white p-2 rounded-xl" onClick={() => openModal()}>
        <IconPlus></IconPlus>
      </button>
</div>
<div className="hello">
      {loading ? (
          <p>Loading...</p>
        ) : boardList.length > 0 ? (
          <div class="flex flex-col">
  <div class="-m-1.5 overflow-x-auto">
    <div class="p-1.5 min-w-full inline-block align-middle">
      <div class="overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
          <thead>
            <tr>
              <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Board Name</th>
              <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Created At</th>
              <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Updated At</th>
              <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">

          {boardList.map((board, index) => (
            <>
<tr key={index}>
<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{board.name}</td>
<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{board.createdAt}</td>
<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{board.updatedAt}</td>
<td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
<button type="button" onClick={()=>openDesigner(board)} class="inline-flex px-3 items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400">Open</button>
  <button type="button" onClick={()=>deleteBoard(board.name)} class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-800 focus:outline-none focus:text-red-800 disabled:opacity-50 disabled:pointer-events-none dark:text-red-500 dark:hover:text-red-400 dark:focus:text-red-400">Delete</button>
</td>
</tr>
</>
          ))}
            

          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
        ) : (
          <p>No boards Created.</p>
        )}
      </div>
      
      <BoardModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={checkCondition}
      />
      </div>
    </>
  );
};
