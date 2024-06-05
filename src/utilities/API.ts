import axios from "axios";


export const fetchUnsplash = () => {
    const width = screen.width;
    const height = Math.round((screen.height * 9) / 21);

    return axios
        .get(`https://source.unsplash.com/random/${width}x${height}`)
        .then((data) => data.request)
        .then((request) => `${request.responseURL}`);
};
