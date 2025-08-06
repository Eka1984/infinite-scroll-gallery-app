import { useState } from "react";

export function useLocalFavourites() {
  const [favourites, setFavourites] = useState<number[]>(() => {
    const stored = localStorage.getItem("favourites");
    return stored ? JSON.parse(stored) : [];
  });

  function toggleFavourite(id: number) {
    setFavourites((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((favId) => favId !== id)
        : [...prev, id];

      localStorage.setItem("favourites", JSON.stringify(updated));
      return updated;
    });
  }

  return {
    favourites,
    toggleFavourite,
  };
}
