import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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

export const Dashboard = () => {
  // auth
  const dispatch = useDispatch();
  const [userget, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boardList, setBoardList] = useState([]);
  useEffect(() => {
    dispatch(clearStore({}))
    dispatch(clearStoreNode({}))
    const unsubscribe = authentication.onAuthStateChanged(
      async (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
          setLoading(false);
          await getBoards(currentUser.uid)
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
        await updateDoc(userRef, {
          boards: arrayUnion({
            name: newBoardName,
            nodes: [],
            edges: [],
          }),
        });
        alert("Board created successfully.");
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

  return (
    <>
      <h1>Your Schemas</h1>
      <button className="bg-black text-white" onClick={() => openModal()}>
        Add Board Button
      </button>
      <div className="hello">
      {loading ? (
          <p>Loading...</p>
        ) : boardList.length > 0 ? (
          boardList.map((board, index) => (
            <div key={index} className="board" onClick={()=>openDesigner(board)}>
              <h3>{board.name}</h3>
            </div>
          ))
        ) : (
          <p>No boards available.</p>
        )}
      </div>
      <BoardModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={checkCondition}
      />
    </>
  );
};
