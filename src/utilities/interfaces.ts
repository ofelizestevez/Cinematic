export interface Page {
    id: number,
    title: string,
    style: Source,
    content: Source
}

export interface Source {
    type: "none" | "localstorage" | "webdav"
    source?: any
}