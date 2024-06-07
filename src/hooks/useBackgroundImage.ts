import { useState } from "react";
import { fetchUnsplash } from "../utilities/API";

export const useBackgroundImage = () => {
    const [backgroundImage, setBackgroundImage] = useState(localStorage.getItem("backgroundImage"));

    const changeImage = async () => {
        const url = await fetchUnsplash();
        setBackgroundImage(url);
        localStorage.setItem("backgroundImage", url);
    };

    return { backgroundImage, changeImage };
};