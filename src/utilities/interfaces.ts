export interface Page {
    id: number,
    title: string,
    sourceType: "" | "localstorage" | "webdav"
    source?: any
}