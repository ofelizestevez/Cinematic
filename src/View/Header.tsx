import styled from "styled-components";
import { motion } from "framer-motion";
import { useState, MouseEvent, useRef, useEffect} from "react";
import { getUnsplashWallpaper } from "../Utilities/unsplashSource"; // Make sure to import the correct function
import { UnsplashSource } from "../Model/WallpaperSource";
import { useTheme } from "../Utilities/ThemeProvider";

enum storageKeys {
    scrollPosition = "scrollPosition"
}

// Styled components
const HeaderElement = styled.header`
	width: 100%;
	height: 40vh;
`;

const ImageElement = styled.img`
    width: 100%;
`;

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
    }, []) // Add empty dependency array to only run once after mount


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
				<ImageElement src={url} alt="Dynamic Wallpaper" />
			</HeaderElement>
		</motion.div>
	);
}

export default Header;
