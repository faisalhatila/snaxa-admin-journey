import { createContext } from "react";

export const SocketContext = createContext({
	list: [],
	setList: () => {},
	handleSocket: () => {},
	socket: "",
});
