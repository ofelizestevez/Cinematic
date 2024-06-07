export const fetchUnsplash = () => {
    const width = screen.width;
    const height = Math.round((screen.height * 9) / 21);

    return fetch(`https://source.unsplash.com/random/${width}x${height}`)
        .then((response) => response.url);
};