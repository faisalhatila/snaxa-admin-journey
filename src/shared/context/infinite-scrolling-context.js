import { createContext } from "react";

export const InfiniteScrollingContext = createContext({
	list: [],
	setList: () => {},
	skip: 0,
	setSkip: () => {},
	handleScroll: () => {},
});
