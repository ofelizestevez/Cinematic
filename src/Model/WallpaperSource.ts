export type WallpaperSource = UrlSource | UnsplashSource | SubredditSource;

export interface UrlSource {
	type: "url";
	dynamic: false; // Static source
	url: string;
}

export interface UnsplashSource {
	type: "unsplash";
	dynamic: true; // Dynamic source
	apiKey: string;
	collections: string;
}

export interface SubredditSource {
	type: "subreddit";
	dynamic: true; // Dynamic source
    clientId: string;
    clientSecret: string;
	subreddits: string;
}
