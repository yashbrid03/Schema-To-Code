
import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "../component/aurora-background";
import { ContainerScroll } from "../component/container-scroll-animation";
import image from '../assets/image.png'
import { useEffect } from "react";


export const Home = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, []);
  return (
    <AuroraBackground className="bg-sla0">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        {/* <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
        Build and Visualize Your Database Schema in Minutes.
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
        Design, Manage, and Export with Ease
        </div>
        <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
          Get Started
        </button> */}
        <ContainerScroll
        titleComponent={
          <>
            <div className="text-3xl md:text-7xl font-bold dark:text-white text-center ">
        Build and Visualize Your Database Schema in Minutes.
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4 mb-10">
        Design, Manage, and Export with Ease
        </div>
          </>
        }
      >
        <img src={image} alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"/>
        
      </ContainerScroll>
        
      </motion.div>
    </AuroraBackground>
  )
}
