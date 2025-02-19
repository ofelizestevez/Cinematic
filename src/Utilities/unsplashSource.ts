// unsplashSource.ts
import { UnsplashSource } from "../Model/WallpaperSource";

/**
 * Fetches a random photo URL from Unsplash filtered by the provided collections.
 * It uses the /photos/random endpoint and passes the collections as a comma-separated string.
 */
export const getUnsplashWallpaper = async (source: UnsplashSource): Promise<string> => {
  // Join collection IDs into a comma-separated string.
  const collectionsParam = source.collections;
  
  // Build the endpoint with the necessary query parameters.
  const endpoint = `https://api.unsplash.com/photos/random?client_id=${source.apiKey}&collections=${collectionsParam}`;
  
  const response = await fetch(endpoint);
  
  if (!response.ok) {
    throw new Error("Failed to fetch from Unsplash");
  }
  
  // /photos/random returns a single photo object.
  const photo = await response.json();
  
  if (!photo || !photo.urls) {
    throw new Error("No photo found from Unsplash");
  }
  
  // Return the regular URL if available, otherwise the full URL.
  return photo.urls.regular || photo.urls.full;
};
