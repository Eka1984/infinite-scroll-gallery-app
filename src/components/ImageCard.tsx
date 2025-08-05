import type { Photo } from "../types/photo";
import styles from "./ImageCard.module.css";

export interface ImageCardProps {
  photo: Photo;
  isFavourited: boolean;
  onToggleFavourite: (id: number) => void;
}

function ImageCard({ photo, isFavourited, onToggleFavourite }: ImageCardProps) {
  return (
    <div
      className={`${styles.photoCard} ${isFavourited ? styles.favourited : ""}`}
    >
      <img
        src={photo.src.medium}
        srcSet={`
          ${photo.src.small} 500w,
          ${photo.src.medium} 800w,
          ${photo.src.large2x} 1200w
        `}
        sizes="(max-width: 600px) 500px, 
               (max-width: 900px) 800px, 
               1200px"
        alt={photo.alt || "Pexels photo"}
        loading="lazy"
      />
      <div className={styles.overlay}>
        <div className={styles.placeholder}></div>

        <div className={styles.photoInfo}>
          <p className={styles.title} title={photo.alt || "Untitled"}>
            {photo.alt || "Untitled"}
          </p>
          <div className={styles.divider} />
          <p className={styles.author}>
            {photo.photographer || "Unknown Author"}
          </p>
        </div>
      </div>
      <button
        className={`${styles.favouriteButton} ${
          isFavourited ? styles.visible : ""
        }`}
        onClick={() => onToggleFavourite(photo.id)}
      >
        Favourite
      </button>
    </div>
  );
}

export default ImageCard;
