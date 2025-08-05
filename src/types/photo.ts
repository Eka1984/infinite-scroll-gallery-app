export type Photo = {
  id: number;
  src: {
    small: string;
    medium: string;
    large2x: string;
  };
  alt: string;
  photographer?: string;
};
