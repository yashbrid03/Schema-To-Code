"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "../lib/utils";
import { Link } from "react-router-dom";
import { Button } from "./moving-border";
import { IconBrandGithub } from "@tabler/icons-react";
import { IconBrandLinkedin } from "@tabler/icons-react";
import { authentication, db } from "../firebase/config";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import {  doc, setDoc, getDoc } from "firebase/firestore";

export const FloatingNav = ({ navItems, className }) => {

  const [userget,setUser] = useState(null)
  const [loading, setLoading] = useState(true);
  const [showLogin,setShowLogin] = useState(false)
  const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = authentication.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
              setUser(currentUser);
              setShowLogin(false)
              console.log(currentUser)
              setLoading(false); 
      
            } else {
              setShowLogin(true)
              setUser(null);
              setLoading(false); 
            }
          });
      
          return () => unsubscribe();
    }, []);

  // auth end
    
    //login logout

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
    
    //login logout end



  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      const previous = scrollYProgress.getPrevious();
      const direction = previous !== undefined ? current - previous : 0;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: 0,
          opacity: visible ? 1 : 0.5,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit  fixed top-7 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-5 pl-2 py-2  items-center justify-center space-x-4",
          className
        )}
      >
        
        {navItems.map((navItem, idx) => (
          <Button
            borderRadius="1.75rem"
            className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full"
          >
            <Link key={`link=${idx}`} to={navItem.link} className={cn("")}>
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="hidden sm:block text-sm">{navItem.name}</span>
            </Link>
          </Button>
        ))}

        {showLogin?<Button onClick={handleGoogleSignIn}>Login</Button> :<Button onClick={handleSignOut}>Logout</Button>}
        <a href="https://github.com/yashbrid03">
        <IconBrandGithub className="text-white  "/>
        </a>
        <a href="https://www.linkedin.com/in/yashbrid03/">
        <IconBrandLinkedin className="text-white " />
        </a>
      </motion.div>
    </AnimatePresence>
  );
};
