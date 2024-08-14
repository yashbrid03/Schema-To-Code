import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "../component/aurora-background";
import { ContainerScroll } from "../component/container-scroll-animation";
import image from "../assets/FinalFinalImage.png";
import { useEffect } from "react";
import { FeatureSection } from "../component/FeatureSection";

export const Home = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="bg-zinc-50 dark:bg-zinc-900">
      <AuroraBackground>
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
              <div className="text-xl md:text-3xl font-medium dark:text-white text-center ">
                Welcome to Schema to Code
              </div>
                <div className="text-3xl md:text-7xl font-bold dark:text-white text-center ">
                  Build and Visualize Your Database Schema in Minutes.
                </div>
                <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4 mb-10">
                  Design, Manage, and Export with Ease
                </div>
              </>
            }
          >
            <img
              src={image}
              alt="hero"
              height={768}
              width={1024}
              // object-cover
              className="mx-auto rounded-2xl object-cover h-full object-left-top"
            />
          </ContainerScroll>
        </motion.div>
      </AuroraBackground>

      <FeatureSection />
    </div>
  );
};
