import openSocket from "socket.io-client";
import { useState, useCallback } from "react";

export const useSocket = () => {
  const [socketData, setSocketData] = useState([]);

  const socket = openSocket(`${process.env.REACT_APP_BACKEND_BASE_URL}`);

  const handleSocket = useCallback((broadcast) => {
    socket.on(broadcast, (data) => {
      setSocketData(data);
    });
  }, []);

  return {
    socketData,
    setSocketData,
    handleSocket,
    socket,
  };
};
