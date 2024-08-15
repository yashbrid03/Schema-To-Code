import React from "react";
import { EvervaultCard, Icon } from "./evervault-card";

export const FeatureSection = () => {
  return (
    <section className="text-gray-600 body-font md:-mt-[35vh] -mt-[55vh] relative z-50  ">
      <div className="text-3xl md:text-5xl font-bold dark:text-white text-center ">
        Our Features.
      </div>
      <div className="container px-2 md:py-20 py-5 mx-auto ">
        <div className="flex flex-wrap -mt-4 items-center justify-center">
          <div className="p-2 lg:w-1/3">
            <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative md:h-[20rem] h-[18rem]">
              <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
              <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
              <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
              <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

              <EvervaultCard text="Drag-and-Drop Interface" />
            </div>
          </div>
          <div className="p-2 lg:w-1/3">
            <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative md:h-[20rem] h-[18rem]">
              <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
              <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
              <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
              <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

              <EvervaultCard text="SQL Script Generation" />
            </div>
          </div>
          <div className="p-2 lg:w-1/3">
            <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative md:h-[20rem] h-[18rem]">
              <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
              <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
              <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
              <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

              <EvervaultCard text="Relationship Mapping" />
            </div>
          </div>
        </div>
      </div>
      <div className="text-xl md:text-2xl font-medium text-white text-center pb-5">
        *More cool Features coming in V2*
      </div>
    </section>
  );
};
