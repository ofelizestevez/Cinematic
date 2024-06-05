import { Providers } from "../providers/_main"

export interface Page {
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