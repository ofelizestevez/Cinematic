import { LocalStorageProvider } from "./providers/LocalStorage"
import { WebDavProvider } from "./providers/WebDav"
import { Provider, Providers } from "./providers/_main"

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
    content: string
}

export const PageSourceToContent = async (source: Source, type: string) => {
	let sourceObject: Provider | null = null;
	if (source.type == Providers.LOCALSTORAGE) {
		sourceObject = new LocalStorageProvider({
			prefix: type,
			key: source.source,
			saveEnabled: source.saveEnabled,
		});
	} else if (source.type == Providers.WEBDAV) {
		sourceObject = new WebDavProvider({
			url: source.source,
			saveEnabled: source.saveEnabled,
		});
	}

	if (sourceObject) {
		return sourceObject.load();
	}
};