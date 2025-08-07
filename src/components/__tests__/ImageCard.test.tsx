import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ImageCard from "../ImageCard";
import type { Photo } from "../../types/photo";
import styles from "../ImageCard.module.css";

const mockPhoto: Photo = {
  id: 123,
  src: {
    small: "small.jpg",
    medium: "medium.jpg",
    large2x: "large.jpg",
  },
  alt: "A test photo",
  photographer: "Katya",
};

describe("ImageCard", () => {
  const mockToggle = vi.fn();

  it("renders image with correct alt text", () => {
    render(
      <ImageCard
        photo={mockPhoto}
        isFavourited={false}
        onToggleFavourite={mockToggle}
      />
    );

    const img = screen.getByAltText("A test photo");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "medium.jpg");
  });

  it("calls onToggleFavourite when button is clicked", () => {
    render(
      <ImageCard
        photo={mockPhoto}
        isFavourited={false}
        onToggleFavourite={mockToggle}
      />
    );

    const button = screen.getByRole("button", { name: /favourite/i });
    fireEvent.click(button);

    expect(mockToggle).toHaveBeenCalledTimes(1);
    expect(mockToggle).toHaveBeenCalledWith(mockPhoto.id);
  });

  it("applies the 'favourited' class when isFavourited is true", () => {
    const { container } = render(
      <ImageCard
        photo={mockPhoto}
        isFavourited={true}
        onToggleFavourite={mockToggle}
      />
    );

    expect(container.firstChild).toHaveClass(styles.favourited);
  });

  it("displays photographer name", () => {
    render(
      <ImageCard
        photo={mockPhoto}
        isFavourited={false}
        onToggleFavourite={mockToggle}
      />
    );

    expect(screen.getByText("Katya")).toBeInTheDocument();
  });

  it("displays 'Unknown Author' when photographer is not provided", () => {
    const photoWithoutPhotographer: Photo = {
      ...mockPhoto,
      photographer: undefined,
    };

    render(
      <ImageCard
        photo={photoWithoutPhotographer}
        isFavourited={false}
        onToggleFavourite={mockToggle}
      />
    );

    expect(screen.getByText("Unknown Author")).toBeInTheDocument();
  });

  it("renders srcSet with correct image sizes", () => {
    render(
      <ImageCard
        photo={mockPhoto}
        isFavourited={false}
        onToggleFavourite={mockToggle}
      />
    );

    const img = screen.getByAltText("A test photo");
    expect(img).toHaveAttribute(
      "srcset",
      expect.stringContaining("small.jpg 500w")
    );
    expect(img).toHaveAttribute(
      "srcset",
      expect.stringContaining("medium.jpg 800w")
    );
    expect(img).toHaveAttribute(
      "srcset",
      expect.stringContaining("large.jpg 1200w")
    );
  });
});
