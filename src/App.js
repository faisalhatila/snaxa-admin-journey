import React from "react";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import Router from "./routers";
import "./App.scss";
import { AuthContext } from "./shared/context/index";
import { useAuth } from "./shared/hooks/auth-hooks";
import { InfiniteScrollingContext } from "./shared/context/infinite-scrolling-context";
import { SocketContext } from "./shared/context/socket-context";
import { useInfiniteScrolling } from "./shared/hooks/infinite-scrolling-hook";
import { useSocket } from "./shared/hooks/socket-hook";
function App() {
  const { login, logout, userId, token } = useAuth();
  const { socketData, setSocketData, handleSocket, socket } = useSocket();
  const { list, setList, skip, handleScroll } = useInfiniteScrolling();
  return (
    <BrowserRouter>
      <div className="app">
        <AuthContext.Provider
          value={{
            isLoggedIn: !!token,
            token: token,
            userId: userId,
            login,
            logout,
          }}
        >
          <InfiniteScrollingContext.Provider
            value={{ list, setList, skip, handleScroll }}
          >
            <SocketContext.Provider
              value={{ socketData, setSocketData, handleSocket, socket }}
            >
              <Router />
            </SocketContext.Provider>
          </InfiniteScrollingContext.Provider>
        </AuthContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
