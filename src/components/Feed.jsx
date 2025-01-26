"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MessageSidebar from "./MessageSideBar";
import { HomeIcon, MessageCircle, Search, Users } from "lucide-react";
import ConnectionRequestsPage from "./ConnectionRequestsPage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FEED_URL,
  GET_CONNECTIONS_URL,
  RECEIVED_CONNECTION_REQUEST_URL,
  SEND_CONNECTION_URL,
} from "@/constants/routes";
import { addFeed, updateFeed } from "@/utils/feedSlice";
import { Badge } from "./ui/badge";
import { addConnectionRequest } from "@/utils/connectionRequestSlice";
import { addConnections } from "@/utils/connectionSlice";
import { toast } from "sonner";
import DevloperCard from "./DevloperCard";

export default function FeedPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMessageSidebarOpen, setIsMessageSidebarOpen] = useState(false);
  const [isConnectionRequestsOpen, setIsConnectionRequestsOpen] =
    useState(false);
  const [direction, setDirection] = useState(null);
  const user = useSelector((store) => store?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [connectionRequests, setConnectionRequest] = useState([]);
  const userFeed = useSelector((store) => store?.feed) || [];

  const currentDeveloper = userFeed[currentIndex];

  const handleSwipe = (swipeDirection) => {
    setDirection(swipeDirection);
    if (currentIndex < userFeed.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const getConnectionRequest = async () => {
    try {
      const res = await axios.get(RECEIVED_CONNECTION_REQUEST_URL, {
        withCredentials: true,
      });
      if (res.data.success) {
        const filterFromUserId = res.data?.connectionRequestReceived?.map(
          (req) => req?.fromUserId
        );
        dispatch(addConnectionRequest(filterFromUserId));
        setConnectionRequest(res.data?.connectionRequestReceived);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const getConnections = async () => {
    try {
      const res = await axios.get(GET_CONNECTIONS_URL, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(addConnections(res.data?.connectionList));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getFeed = async () => {
    try {
      const res = await axios.get(FEED_URL, { withCredentials: true });
      if (res.data.success) {
        if (res.data?.feedUsers?.length < 1) {
          return "Looks like you've seen all the available profiles. Check back later for updates!";
        }
        await dispatch(addFeed(res.data?.feedUsers));
        // setUserFeed(res.data?.feedUsers);
      }
    } catch (error) {
      console.log(error.response.message);
    }
  };

  const handleUserDecision = async (decision, userId) => {
    try {
      const res = await axios.post(
        SEND_CONNECTION_URL + `/${decision}/${userId}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data?.message);
        dispatch(updateFeed(userId));

        if (userFeed.length === 1) {
          getFeed();
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    getFeed();
    getConnectionRequest();
    getConnections();
  }, []);

  return (
    <div
      className="h-[calc(100vh-64px)]
    flex flex-col  items-center justify-center p-4 overflow-y-hidden"
      style={{
        background: "linear-gradient(to right, #514A9D, #24C6DC)",
      }}
    >
      {userFeed.length > 0 ? (
        <DevloperCard
          direction={direction}
          currentDeveloper={currentDeveloper}
        />
      ) : (
        <div className="text-center flex-grow">
          <p className="mt-80">
            Looks like you&apos;ve seen all the available profiles. <br /> Check
            back later for updates!
          </p>
        </div>
      )}

      {userFeed?.length > 0 && (
        <div className="w-full max-w-md mt-6 flex justify-center space-x-4">
          <button
            onClick={() => {
              handleSwipe("left");
              handleUserDecision("pass", currentDeveloper._id);
            }}
            className="px-6 py-3 bg-red-500 text-white rounded-full font-semibold transition-all duration-300 ease-in-out hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Skip
          </button>
          <button
            onClick={() => {
              handleSwipe("right");
              handleUserDecision("like", currentDeveloper._id);
            }}
            className="px-6 py-3 bg-green-500 text-white rounded-full font-semibold transition-all duration-300 ease-in-out hover:bg-green-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 hover-glow"
          >
            Connect
          </button>
        </div>
      )}
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
          <div className="tooltip relative " data-tip="Requests">
            <Users className="h-6 w-6" />
            {connectionRequests?.length > 0 && (
              <Badge className=" absolute -top-3 hover:bg-red-400 text-white bg-red-500">
                {connectionRequests?.length}
              </Badge>
            )}
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
        updateConnections={getConnectionRequest}
        isOpen={isConnectionRequestsOpen}
        onClose={() => setIsConnectionRequestsOpen(false)}
      />
    </div>
  );
}
