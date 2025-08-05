import { useEffect, useState } from "react";
import { fetchPhotos } from "./utils/pexelsApi";
import ImageCard from "./components/ImageCard";
import styles from "./App.module.css";
import type { Photo } from "./types/photo";

function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [favourites, setFavourites] = useState<number[]>(() => {
    const stored = localStorage.getItem("favourites");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    async function loadPhotos() {
      setLoading(true);
      try {
        const newPhotos = await fetchPhotos(page);
        setPhotos((prevPhotos) => {
          const existingIds = new Set(prevPhotos.map((p) => p.id));
          const uniqueNewPhotos = newPhotos.filter(
            (p: Photo) => !existingIds.has(p.id)
          );
          return [...prevPhotos, ...uniqueNewPhotos];
        });
      } catch (error) {
        console.error("Error loading photos:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPhotos();
  }, [page]);

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      const innerHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      const reachedBottom = scrollY + innerHeight >= scrollHeight - 200;

      if (reachedBottom && !loading) {
        setPage((prev) => prev + 1);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  const toggleFavourite = (id: number) => {
    setFavourites((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((favId) => favId !== id)
        : [...prev, id];

      localStorage.setItem("favourites", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.photoGrid}>
        {photos.map((photo) => (
          <ImageCard
            key={photo.id}
            photo={photo}
            isFavourited={favourites.includes(photo.id)}
            onToggleFavourite={toggleFavourite}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
