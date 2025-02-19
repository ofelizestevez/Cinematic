// subredditSource.ts
import { SubredditSource } from "../Model/WallpaperSource";

let cachedToken: string | null = null;
let tokenExpiryTime: number | null = null;

const getRedditToken = async (clientId : string, clientSecret : string): Promise<string> => {
	// If the token is still valid, return the cached token
	if (cachedToken && tokenExpiryTime && tokenExpiryTime > Date.now()) {
		return cachedToken;
	}


	// Fetch a new token from Reddit
	const response = await fetch(
		"https://www.reddit.com/api/v1/access_token?grant_type=client_credentials",
		{
			method: "POST",
			headers: {
				Authorization: "Basic " + btoa(`${clientId}:${clientSecret}`),
				"Content-Type": "application/x-www-form-urlencoded",
			},
		}
	);

	if (!response.ok) {
		throw new Error("Failed to get Reddit access token");
	}

	const data = await response.json();
	cachedToken = data.access_token;
	tokenExpiryTime = Date.now() + data.expires_in * 1000; // Token expiration time in milliseconds

	return cachedToken!;
};

/**
 * Fetches a random image URL from a random subreddit in the provided list.
 */
export const getSubredditWallpaper = async (
	source: SubredditSource
): Promise<string> => {
	const token = await getRedditToken(source.clientId, source.clientSecret); // This fetches the cached token or a new one if expired
	const randomSubreddit = source.subreddits;
    console.log(token)
	const response = await fetch(
		`https://oauth.reddit.com/r/${randomSubreddit}/hot`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

	if (!response.ok) throw new Error("Failed to fetch subreddit data");

	const data = await response.json();
	const posts = data.data.children;

	// Filter posts with image links
	const imagePosts = posts.filter((post: any) =>
		post.data.url.match(/\.(jpeg|jpg|png|gif)$/i)
	);
	if (imagePosts.length === 0) throw new Error("No images found");

	return imagePosts[Math.floor(Math.random() * imagePosts.length)].data.url;
};
