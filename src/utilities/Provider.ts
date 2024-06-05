import { Page } from "./interfaces";
import { Providers } from "../providers/_main";
import { WebDav } from "../providers/WebDav";


export const pageToProvider = (source: Page) => {
    if (source.content.type == Providers.WEBDAV) {
        return new WebDav({
            url: source.content.source,
            saveEnabled: source.content.saveEnabled
        });
    }
};
