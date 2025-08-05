const API_URL = "https://api.pexels.com/v1/curated";
const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

export async function fetchPhotos(page: number = 1, perPage: number = 15) {
  const response = await fetch(
    `${API_URL}?page=${page}&orientation=landscape&per_page=${perPage}`,
    {
      headers: {
        Authorization: API_KEY,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch photos: ${response.status}`);
  }

  const data = await response.json();
  return data.photos;
}
