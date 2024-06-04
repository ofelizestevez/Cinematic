export enum Providers {
	NONE = "Name",
	LOCALSTORAGE = "LocalStorage",
	WEBDAV = "WebDav"
}

export abstract class Provider {
	saveEnabled = false;
	
	constructor(){}
	
	abstract load(): Promise<string>;
	abstract save({}): void;
  }