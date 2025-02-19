export type ContentSource = LocalStorageSource | WebDavSource;

export interface LocalStorageSource {
    type: "localstorage";
    dynamic: true; // Always dynamic
    key: string;
}

export interface WebDavSource {
    type: "webdav";
    dynamic: boolean; // Can be either static or dynamic
    url: string; // WebDAV server URL
    username?: string; // Optional username for authentication
    password?: string; // Optional password for authentication
    token?: string; // Optional token-based authentication
}
