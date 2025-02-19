import styled from "styled-components";
import { motion } from "framer-motion";
import { useState, MouseEvent, useRef, useEffect} from "react";
import { getUrlWallpaper } from "../Utilities/urlSource";
import { SubredditSource, UnsplashSource, UrlSource } from "../Model/WallpaperSource";
import { getSubredditWallpaper } from "../Utilities/RedditSource";
import { getUnsplashWallpaper } from "../Utilities/unsplashSource";

enum storageKeys {
    scrollPosition = "scrollPosition"
}

const HeaderElement = styled.header`
	width: 100%;
	height: 40vh;
`;

const imageElement = styled.img`
    width: 100%;
`

function Header() {
    const ref = useRef<HTMLDivElement>(null);
	const [isScrolling, setIsScrolling] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
    const [url, setUrl] = useState<string | undefined>(undefined)

    const onRightClick = (event: MouseEvent) => {
        event.preventDefault();

        const savedScrollPosition = ref.current?.scrollTop
        setIsScrolling(!isScrolling);
        localStorage.setItem(storageKeys.scrollPosition, String(savedScrollPosition))
    }
    
    const setDefaults = () => {
        const savedScrollPosition = Number(localStorage.getItem(storageKeys.scrollPosition))
        if (ref.current) {
            ref.current.scrollTo(0, savedScrollPosition)
        }
    }

    useEffect(() => {
        setDefaults()
    })

    useEffect(() => {
        if (url === undefined){
            const x : UnsplashSource = {
                type: "unsplash",
                dynamic: true,
                apiKey: "5_eAmFAqHV7LKKrN9tawCxOqn9H-nlJ_DdKmq2lG6_8",
                collections: "485707"
            } 
    
            getUnsplashWallpaper(x).then(url => {
                setUrl(url)
                console.log(url)
            })
            .catch(err => console.error("Error fetching wallpaper:", err));
        }
    }, [url])

	return (
		<motion.div
			animate={{ opacity: isScrolling ? 0.5 : 1 }}
			transition={{ duration: 0.3, ease: "easeInOut" }}
			onContextMenu={(e) => {
				onRightClick(e)
			}}
			style={{ overflow: isScrolling ? "scroll" : "hidden" }}
            ref={ref}
		>
			<HeaderElement>
                <imageElement src="your-image-url.jpg" alt="Description of image" />
				<img src={url} alt="" />
			</HeaderElement>
		</motion.div>
	);
}

export default Header;
