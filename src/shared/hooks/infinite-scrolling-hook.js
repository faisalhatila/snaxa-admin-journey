import { useState, useEffect } from "react";

export const useInfiniteScrolling = () => {
  const [list, setList] = useState([]);
  const [skip, setSkip] = useState(0);

  const handleScroll = (e) => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;

    if (offsetHeight + scrollTop > scrollHeight - 500) {
      setSkip(list.length);
    }
  };

  useEffect(() => {}, []);

  return {
    list,
    setList,
    skip,
    setSkip,
    handleScroll,
  };
};
