import { Source } from "../ContentPage";
import { LocalStorageProvider } from "./LocalStorage";
import { WebDavProvider } from "./WebDav";

export enum Providers {
	NONE = "None",
	LOCALSTORAGE = "LocalStorage",
	WEBDAV = "WebDav",
}

export abstract class Provider {
	saveEnabled = false;

	constructor() {}

	abstract load(): Promise<string>;
	abstract save({}): void;
}

// const PageSourceToContent = async (source: Source, type: string) => {
// 	const content = "";
// 	let sourceObject: Provider | null = null;

// 	if (source.type == Providers.LOCALSTORAGE) {
// 		sourceObject = new LocalStorageProvider({
// 			prefix: type,
// 			key: source.source,
// 			saveEnabled: source.saveEnabled,
// 		});
// 	} else if (source.type == Providers.WEBDAV) {
// 		sourceObject = new WebDavProvider({
// 			url: source.source,
// 			saveEnabled: source.saveEnabled,
// 		});
// 	}

// 	if (sourceObject) {
// 		return sourceObject.load();
// 	}
// };
