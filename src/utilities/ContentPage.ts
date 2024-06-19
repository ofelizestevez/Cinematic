import { Providers } from "./providers/_main"

export interface ContentPage {
    id: number,
    title: string,
    style: Source,
    content: Source
}

export interface Source {
    type: Providers
    source?: any
    saveEnabled: boolean
}

export interface ContentPageData {
    id: number,
    title: string,
    style: string,
    content: string,
    timestamp: Date
}