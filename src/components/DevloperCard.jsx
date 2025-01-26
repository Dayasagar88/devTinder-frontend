import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

const DevloperCard = ({currentDeveloper, direction}) => {

  return (
    <div className="w-full max-w-md flex-grow flex items-center justify-center">
      <AnimatePresence>
        <motion.div
          key={currentDeveloper?._id}
          initial={{ x: direction === "right" ? -300 : 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction === "right" ? 300 : -300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-sm"
        >
          <div className="p-6 space-y-4">
            <div className="flex flex-col items-center">
              <img
                src={currentDeveloper?.photoUrl || "/placeholder.svg"}
                alt={currentDeveloper?.firstName}
                className="w-32 h-32 rounded-full border-4 border-blue-500"
              />
              <h2 className="mt-4 text-2xl font-bold text-gray-800">
                {currentDeveloper?.firstName} {currentDeveloper?.lastName}
              </h2>
              <p className="text-gray-600">{currentDeveloper?.profession}</p>
              <p className="text-gray-600">
                {currentDeveloper?.gender} {currentDeveloper?.age}
              </p>
            </div>
            <p className="text-center text-gray-700">
              {currentDeveloper?.about}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {currentDeveloper?.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default DevloperCard;
