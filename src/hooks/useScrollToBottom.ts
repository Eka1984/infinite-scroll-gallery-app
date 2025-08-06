import { useEffect } from "react";

export function useScrollToBottom(callback: () => void, offset = 200) {
  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      const innerHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      const reachedBottom = scrollY + innerHeight >= scrollHeight - offset;

      if (reachedBottom) {
        callback();
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [callback, offset]);
}
