// urlSource.ts
import { UrlSource } from "../Model/WallpaperSource";

/**
 * Simply returns the URL from the UrlSource.
 */
export const getUrlWallpaper = async (source: UrlSource): Promise<string> => {
  // For a direct URL source, we already have the image URL.
  return source.url;
};
