import { Provider } from "./_main";

interface Load {
	key: string;
	saveEnabled: boolean;
}

interface Save {
	key: string;
	data: string;
}

export class LocalStorageProvider extends Provider {
	key: string;

	constructor({ key, saveEnabled }: Load) {
		super();
        
		this.key = key;
		this.saveEnabled = saveEnabled;
	}

	load(): Promise<string> {
		const data = localStorage.getItem(this.key);
		return Promise.resolve(data || "");
	}

	save({ data }: Save): void {
		localStorage.setItem(this.key, data);
	}
}
