import { Provider } from "./_main";

interface load {
	url: string;
	saveEnabled: boolean;
}

interface save {
	data: string;
}

export class WebDavProvider extends Provider {
	url;

	constructor({ url, saveEnabled }: load) {
		super();

		this.url = url;
		this.saveEnabled = saveEnabled;
	}

	load(): Promise<string> {
		return fetch(this.url).then((response) => response.text());
	}

	save({ data }: save): void {
		if (this.saveEnabled) {
			fetch(this.url, {
				method: "PUT",
				headers: {
					"Content-Type": "text/plain", // Adjust content type as needed
				},
				body: data,
			});
		}
	}
}
