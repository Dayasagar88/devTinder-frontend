"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MessageSidebar from "./MessageSideBar";
import SearchPage from "./ConnectionRequestsPage";
import { HomeIcon, MessageCircle, Search, Users } from "lucide-react";
import ConnectionRequestsPage from "./ConnectionRequestsPage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const developers = [
  {
    id: 1,
    name: "Alice Johnson",
    title: "Frontend Developer",
    bio: "Passionate about creating beautiful and intuitive user interfaces.",
    skills: ["React", "TypeScript", "Tailwind CSS"],
    image: "/placeholder.svg?height=200&width=200&text=AJ",
  },
  {
    id: 2,
    name: "Bob Smith",
    title: "Backend Engineer",
    bio: "Building scalable systems and optimizing database performance.",
    skills: ["Node.js", "Python", "MongoDB"],
    image: "/placeholder.svg?height=200&width=200&text=BS",
  },
  {
    id: 3,
    name: "Carol Williams",
    title: "Full Stack Developer",
    bio: "Bridging the gap between frontend and backend technologies.",
    skills: ["JavaScript", "Ruby on Rails", "AWS"],
    image: "/placeholder.svg?height=200&width=200&text=CW",
  },
];

export default function FeedPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [isMessageSidebarOpen, setIsMessageSidebarOpen] = useState(false);
  const [isConnectionRequestsOpen, setIsConnectionRequestsOpen] =
    useState(false);
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  const currentDeveloper = developers[currentIndex];

  const handleSwipe = (swipeDirection) => {
    setDirection(swipeDirection);
    if (currentIndex < developers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <div
      className="h-[calc(100vh-64px)]
    flex flex-col  items-center justify-center p-4 overflow-y-hidden"
      style={{
        background: "linear-gradient(to right, #514A9D, #24C6DC)",
      }}
    >
      <div className="w-full max-w-md flex-grow flex items-center justify-center">
        <AnimatePresence>
          <motion.div
            key={currentDeveloper.id}
            initial={{ x: direction === "right" ? -300 : 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction === "right" ? 300 : -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-sm"
          >
            <div className="p-6 space-y-4">
              <div className="flex flex-col items-center">
                <img
                  src={currentDeveloper.image || "/placeholder.svg"}
                  alt={currentDeveloper.name}
                  className="w-32 h-32 rounded-full border-4 border-blue-500"
                />
                <h2 className="mt-4 text-2xl font-bold text-gray-800">
                  {currentDeveloper.name}
                </h2>
                <p className="text-gray-600">{currentDeveloper.title}</p>
              </div>
              <p className="text-center text-gray-700">
                {currentDeveloper.bio}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {currentDeveloper.skills.map((skill, index) => (
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

      <div className="w-full max-w-md mt-6 flex justify-center space-x-4">
        <button
          onClick={() => handleSwipe("left")}
          className="px-6 py-3 bg-red-500 text-white rounded-full font-semibold transition-all duration-300 ease-in-out hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Skip
        </button>
        <button
          onClick={() => handleSwipe("right")}
          className="px-6 py-3 bg-green-500 text-white rounded-full font-semibold transition-all duration-300 ease-in-out hover:bg-green-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 hover-glow"
        >
          Connect
        </button>
      </div>

      <nav className="w-full max-w-md mt-12 flex justify-around items-center bg-white bg-opacity-10 backdrop-blur-lg rounded-full p-2">
        <button className="p-2 text-white hover:text-blue-300 transition-colors duration-300">
          <div className="tooltip" data-tip="Home">
            <HomeIcon title="Home" className="h-6 w-6" />
          </div>
        </button>
        <button
          className="p-2 text-white hover:text-blue-300 transition-colors duration-300"
          onClick={() => setIsConnectionRequestsOpen(true)}
        >
          <div className="tooltip" data-tip="Requests">
            <Users className="h-6 w-6" />
          </div>
        </button>
        <button
          className="p-2 text-white hover:text-blue-300 transition-colors duration-300"
          onClick={() => setIsMessageSidebarOpen(!isMessageSidebarOpen)}
        >
          <div className="tooltip" data-tip="Messages">
            <MessageCircle className="h-6 w-6" />
          </div>
        </button>
      </nav>

      <MessageSidebar
        isOpen={isMessageSidebarOpen}
        onClose={() => setIsMessageSidebarOpen(false)}
      />
      <ConnectionRequestsPage
        isOpen={isConnectionRequestsOpen}
        onClose={() => setIsConnectionRequestsOpen(false)}
      />
    </div>
  );
}
