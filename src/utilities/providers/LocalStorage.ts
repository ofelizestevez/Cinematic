import { Provider } from "./_main";

interface Load {
	prefix: string;
	key: string;
	saveEnabled: boolean;
}

interface Save {
	key: string;
	data: string;
}

export class LocalStorageProvider extends Provider {
	prefix: string;
	key: string;

	constructor({ prefix, key, saveEnabled }: Load) {
		super();
		this.prefix = prefix
		this.key = key;
		this.saveEnabled = saveEnabled;
	}

	load(): Promise<string> {
		const data = localStorage.getItem(`${this.prefix}-${this.key}`);
		return Promise.resolve(data || "");
	}

	save({ data }: Save): void {
		localStorage.setItem(`${this.prefix}-${this.key}`, data);
	}
}
