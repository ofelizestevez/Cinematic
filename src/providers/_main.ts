export enum Providers {
	NONE = "None",
	LOCALSTORAGE = "LocalStorage",
	WEBDAV = "WebDav"
}

export abstract class Provider {
	saveEnabled = false;
	
	constructor(){}
	
	abstract load(): Promise<string>;
	abstract save({}): void;
  }