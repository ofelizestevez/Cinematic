import React, {
	MouseEventHandler,
	ReactNode,
	useEffect,
	useRef,
	useState,
} from "react";
import {gsap} from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import { css } from "@emotion/react";
import { Colord } from "colord";
import { FastAverageColor } from "fast-average-color";

import { Theme, themeSizes } from "../utilities/Theme";
import { useBackgroundImage } from "../hooks/useBackgroundImage";
import { LocalStorageKeys } from "../utilities/LocalStorage";
import { beatingAnimation, crossFade, fadeIn, scrollableAnimation } from "../utilities/HeaderAnimations";

gsap.registerPlugin(ScrollToPlugin);

interface props {
	children?: ReactNode;
	setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

// * Constant CSS
const image = css`
	position: absolute;
	width: 100%;
	top: 0%;
`;

function Header({ children, setTheme }: props) {
	// * States
	const { backgroundImage, changeImage } = useBackgroundImage();
	const [backupImage, setBackupImage] = useState<string | null>("");
	const [scrollable, setScrollable] = useState(false);
	const [imageLoaded, setImageLoaded] = useState(false);
	const [crossfadeTrigger, setCrossfadeTrigger] = useState({});

	// * Refs
	const ref = useRef<HTMLElement>(null);
	const imageRef = useRef<HTMLImageElement>(null);
	const backupImageRef = useRef<HTMLImageElement>(null);
	const timeline = useRef(gsap.timeline());
	
    // * Dynamic CSS
	const styles = css`
		position: relative;
		overflow: ${scrollable ? "scroll" : "hidden"};
		opacity: ${backgroundImage ? "100%" : "0%"};
		height: ${themeSizes.headerHeight};

		-ms-overflow-style: none;
		scrollbar-width: none;
		&::-webkit-scrollbar {
			display: none;
		}
	`;

	// * Change Image if there is no background image
	useEffect(() => {
		if (!backgroundImage) {
			changeImage();
		}
	}, [backgroundImage]);

	// * Animations based of backgroundImage and backupImage
	useGSAP(() => {
		if (!imageLoaded) {
			if (backgroundImage && !backupImage) {
				fadeIn(ref.current)
			}
		} else {
			if (backupImage) {
				beatingAnimation(timeline.current, ref.current, backgroundImage, backupImage)
			}
		}
	}, [backgroundImage, backupImage]);

	// * Animations made off crossfade Trigger
	useGSAP(() => {
        if (imageLoaded) {
			crossFade(backupImageRef.current)
				.then(() => {
					setBackupImage(null)
				});
		}
	}, [crossfadeTrigger]);

	// * Animations based off Scrollable
	useGSAP(() => {
		if (imageLoaded) {
			scrollableAnimation(ref.current, scrollable)
		}
	}, [scrollable]);

	// * Event Handlers
	const onImageClick = () => {
		setBackupImage(backgroundImage ?? "");
		changeImage();
	};

	const onImageLoad = () => {
		if (!imageLoaded) {
            setInitialScrollPosition();
			setImageLoaded(true);
		} else {
			setCrossfadeTrigger({});
		}
        headerSetTheme();
	};

	const onContextMenu: MouseEventHandler<HTMLElement> = (e) => {
		// If using any modifier (except shift), return (so you can right click)
		if (e.altKey || e.ctrlKey || e.metaKey) {
			return;
		}

		e.preventDefault();

        if (scrollable){
            localStorage.setItem(
				LocalStorageKeys.scrollHeight,
				JSON.stringify(ref.current?.scrollTop)
			);
        }
		setScrollable(!scrollable);
	};

	// * Helpers
    const setInitialScrollPosition = () => {
		// Sets scroll height to localstorage or defaults to halways point
		let scrollHeight = localStorage.getItem(LocalStorageKeys.scrollHeight);
		if (!scrollHeight) {
			const headerHalfScrollPoint =
				(ref.current!.scrollHeight - ref.current!.clientHeight) / 2;

			scrollHeight = JSON.stringify(headerHalfScrollPoint);
		}

		ref.current!.scrollTop = parseFloat(scrollHeight);
	};

    // Gets the fast color average of the backgroundImage, then determines light/dark
    const headerSetTheme = () => {
        const fac = new FastAverageColor();

        fac.getColorAsync(imageRef.current, {}).then((color) => {
            // Takes the color, turns it into a Colord to use .isDark()
            const colord = new Colord(color.hex);
            setTheme(colord.isDark() ? Theme.DARK : Theme.LIGHT);
        });
    };

	return (
		<header ref={ref} css={styles} onContextMenu={onContextMenu}>
			{children}
			<img
				ref={imageRef}
				css={image}
				crossOrigin="anonymous"
				src={backgroundImage ?? ""}
				onClick={onImageClick}
				onLoad={onImageLoad}
			/>
			<img ref={backupImageRef} css={image} src={backupImage ?? ""} />
		</header>
	);
}

export default Header;
