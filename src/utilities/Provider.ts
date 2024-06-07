import { Source } from "./interfaces";
import { Providers } from "./providers/_main";
import { WebDav } from "./providers/WebDav";


export const pageToProvider = (source: Source) => {
    if (source.type == Providers.WEBDAV) {
        return new WebDav({
            url: source.source,
            saveEnabled: source.saveEnabled
        });
    }
};
