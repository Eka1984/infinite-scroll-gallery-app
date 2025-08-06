import { useState, useEffect } from "react";
import type { Photo } from "../types/photo";
import { fetchPhotos } from "../utils/pexelsApi";

export function useInfinitePhotos() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function loadNextPage() {
    if (loading) return;

    setLoading(true);
    try {
      const newPhotos: Photo[] = await fetchPhotos(page);
      setPhotos((prevPhotos) => {
        const existingIds = new Set(prevPhotos.map((p) => p.id));
        const uniqueNewPhotos = newPhotos.filter(
          (p: Photo) => !existingIds.has(p.id)
        );
        return [...prevPhotos, ...uniqueNewPhotos];
      });
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Failed to load photos:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNextPage();
  }, []);

  return { photos, loading, loadNextPage };
}
