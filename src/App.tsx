import ImageCard from "./components/ImageCard";
import styles from "./App.module.css";
import { useInfinitePhotos } from "./hooks/useInfinitePhotos";
import { useScrollToBottom } from "./hooks/useScrollToBottom";
import { useLocalFavourites } from "./hooks/useLocalFavourites";

function App() {
  const { favourites, toggleFavourite } = useLocalFavourites();

  const { photos, loading, loadNextPage } = useInfinitePhotos();

  useScrollToBottom(() => {
    if (!loading) {
      loadNextPage();
    }
  });

  return (
    <div className={styles.appContainer}>
      <div className={styles.photoGrid}>
        {photos.map((photo) => (
          <ImageCard
            key={photo.id}
            photo={photo}
            isFavourited={favourites.includes(photo.id)}
            onToggleFavourite={() => toggleFavourite(photo.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
