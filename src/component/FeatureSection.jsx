import React from "react";
import { EvervaultCard, Icon } from "./evervault-card";

export const FeatureSection = () => {
  return (
    <section className="text-gray-600 body-font">
        <div className="text-2xl md:text-5xl font-bold dark:text-white text-center -mt-2 z-50 ">
        Our Feature.
    </div>
      <div className="container px-5 py-20 mx-auto">
        <div className="flex flex-wrap -m-4">
          
          <div className="p-2 lg:w-1/3">
          
          <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[20rem]">
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />
 
      <EvervaultCard text="Drag-and-Drop Interface" />
      </div>
          </div>
          <div className="p-2 lg:w-1/3">
          
          <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[20rem]">
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />
 
      <EvervaultCard text="SQL Script Generation" />
      </div>
          </div>
          <div className="p-2 lg:w-1/3">
          
          <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[20rem]">
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />
 
      <EvervaultCard text="Relationship Mapping" />
      </div>
          </div>
        </div>
      </div>
    </section>
  );
};
