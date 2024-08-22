import React from "react";
import { authentication, db } from "../firebase/config";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { Button } from "../component/moving-border";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const checkAndCreateUID = async (uid, name) => {
    const docRef = doc(db, "users", uid);

    // Check if the document exists
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      // If the document does not exist, create it with the desired field
      await setDoc(docRef, {
        type: "free",
        name: name,
      });
      console.log(`Document with UID ${uid} created.`);
    } else {
      console.log(`Document with UID ${uid} already exists.`);
    }
  };

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authentication, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        checkAndCreateUID(user.uid,user.displayName);
        navigate("/designer");
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
      });
  };

  const handleSignOut = () => {
    signOut(authentication)
      .then(() => {
        //   dispatch(logout());
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Button onClick={handleGoogleSignIn}>Google Signin</Button>
      <Button onClick={handleSignOut}>Signout</Button>
    </>
  );
};
