import { ContentSource, LocalStorageSource, WebDavSource } from "../Model/ContentSource";

export abstract class ContentSourceHandler<T> {
    constructor(protected source: ContentSource) {}

    abstract load(): Promise<T>;
    abstract save(data: T): Promise<void>;
}

// LocalStorageHandler
export class LocalStorageHandler extends ContentSourceHandler<string | null> {
    private key: string;

    constructor(source: LocalStorageSource) {
        super(source);
        this.key = source.key;
    }

    async load(): Promise<string | null> {
        return localStorage.getItem(this.key);
    }

    async save(data: string): Promise<void> {
        localStorage.setItem(this.key, data);
    }
}

// WebDavHandler
export class WebDavHandler extends ContentSourceHandler<string> {
    private url: string;
    private headers: HeadersInit;

    constructor(source: WebDavSource) {
        super(source);
        this.url = source.url;
        this.headers = this.buildHeaders(source);
    }

    private buildHeaders(source: WebDavSource): HeadersInit {
        const headers: HeadersInit = {};
        if (source.token) {
            headers["Authorization"] = `Bearer ${source.token}`;
        } else if (source.username && source.password) {
            headers["Authorization"] = `Basic ${btoa(`${source.username}:${source.password}`)}`;
        }
        return headers;
    }

    async load(): Promise<string> {
        const response = await fetch(this.url, {
            method: "GET",
            headers: this.headers,
        });
        if (!response.ok) {
            throw new Error(`Failed to load data: ${response.statusText}`);
        }
        return await response.text();
    }

    async save(data: string): Promise<void> {
        const response = await fetch(this.url, {
            method: "PUT",
            headers: { ...this.headers, "Content-Type": "text/plain" },
            body: data,
        });
        if (!response.ok) {
            throw new Error(`Failed to save data: ${response.statusText}`);
        }
    }
}