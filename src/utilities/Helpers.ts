import axios from "axios";

export const getCookie = (name: string): string | undefined => {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return undefined;
};

export const setCookie = (name: string, value: string, daysToExpire?: number): void => {
    let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    if (daysToExpire) {
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
        cookie += `; expires=${expirationDate.toUTCString()}`;
    }
    document.cookie = cookie;
};

export const fetchUnsplash = () => {
    const width = screen.width
    const height = Math.round((screen.height * 9) / 21);
    
    return axios
        .get(`https://source.unsplash.com/random/${width}x${height}`)
        .then((data) => data.request)
        .then((request) => `${request.responseURL}`)
};