import type { Photo } from "../types/photo";

export interface ImageCardProps {
  photo: Photo;
  isFavourited: boolean;
  onToggleFavourite: (id: number) => void;
}

function ImageCard({ photo, isFavourited, onToggleFavourite }: ImageCardProps) {
  return (
    <div className={`photo-card ${isFavourited ? "favourited" : ""}`}>
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
      <div className="overlay">
        <div className="placeholder"></div>

        <div className="photo-info">
          <p className="title" title={photo.alt || "Untitled"}>
            {photo.alt || "Untitled"}
          </p>
          <div className="divider" />
          <p className="author">{photo.photographer || "Unknown Author"}</p>
        </div>
      </div>
      <button
        className={`favourite-button ${isFavourited ? "visible" : ""}`}
        onClick={() => onToggleFavourite(photo.id)}
      >
        Favourite
      </button>
    </div>
  );
}

export default ImageCard;
