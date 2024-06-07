import { useEffect } from "react";
import { usePageSources } from "./ContentPageContext";
import { pageToProvider } from "../utilities/Provider";
import { Providers } from "../utilities/providers/_main";
import { usePageData } from "./ContentPageDataContext";
import { PageData } from "../utilities/interfaces";

const useFetchPageData = () => {
    const { pageSources } = usePageSources();
    const { pageData, setPageData, currentPageData, setCurrentPageData } = usePageData();

    useEffect(() => {
        const fetchData = async () => {
            for (const page of pageSources) {
                // Check if the page already exists in the state
                if (!pageData.find(item => page.id === item.id)) {
                    const content = await (async () => {
                        const provider = pageToProvider(page.content);
                        let providerData = "";

                        if (provider && provider.constructor.name === Providers.WEBDAV) {
                            const data = await provider.load();
                            providerData = data;
                        }

                        return providerData;
                    })();

                    const newPage: PageData = {
                        id: page.id,
                        title: page.title,
                        style: "",
                        content: content
                    };

                    // Update the state in a functional way
                    setPageData(prevPageData => {
                        // Check again to ensure the page is not already added
                        if (!prevPageData.find(item => page.id === item.id)) {
                            return [...prevPageData, newPage];
                        }
                        return prevPageData;
                    });
                }
            }

            // Set currentPageData if it's null and pageData has been fetched
            if (!currentPageData && pageData.length > 0) {
                setCurrentPageData(pageData[0]);
            }
        };

        fetchData();
    }, [pageSources, pageData, setPageData, currentPageData, setCurrentPageData]);
};

export default useFetchPageData;