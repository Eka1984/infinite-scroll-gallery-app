import { it, expect, beforeEach, vi } from "vitest";
import { fetchPhotos } from "../pexelsApi";

const mockPhotos = [
  { id: 1, alt: "Test photo 1", src: { medium: "url1" } },
  { id: 2, alt: "Test photo 2", src: { medium: "url2" } },
];

beforeEach(() => {
  globalThis.fetch = vi.fn();
});

it("fetches photos and returns the data", async () => {
  const mockFetch = fetch as ReturnType<typeof vi.fn>;

  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ photos: mockPhotos }),
  });

  const result = await fetchPhotos(2, 10);

  expect(result).toEqual(mockPhotos);
  expect(mockFetch).toHaveBeenCalledWith(
    "https://api.pexels.com/v1/curated?page=2&orientation=landscape&per_page=10",
    expect.objectContaining({
      headers: expect.objectContaining({
        Authorization: expect.any(String),
      }),
    })
  );
});

it("throws an error when the response is not ok", async () => {
  const mockFetch = fetch as ReturnType<typeof vi.fn>;

  mockFetch.mockResolvedValueOnce({
    ok: false,
    status: 500,
    json: async () => ({}),
  });

  await expect(fetchPhotos()).rejects.toThrow("Failed to fetch photos: 500");

  expect(mockFetch).toHaveBeenCalled();
});
