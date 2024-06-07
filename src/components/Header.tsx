import gsap from "gsap";
import React, {
	MouseEventHandler,
	ReactNode,
	useEffect,
	useRef,
	useState,
} from "react";
import { Theme, themeSizes } from "../utilities/Theme";
import { css } from "@emotion/react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useBackgroundImage } from "../hooks/useBackgroundImage";
import { useGSAP } from "@gsap/react";
import { LocalStorageKeys } from "../utilities/LocalStorage";
import { FastAverageColor } from "fast-average-color";
import { Colord } from "colord";
gsap.registerPlugin(ScrollToPlugin);

interface props {
	children?: ReactNode;
	setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

const image = css`
	position: absolute;
	width: 100%;
	top: 0%;
`;

function Header({ children, setTheme }: props) {
	const { backgroundImage, changeImage } = useBackgroundImage();
	const [backupImage, setBackupImage] = useState<string | null>("");
	const [scrollable, setScrollable] = useState(false);
	const [imageLoaded, setImageLoaded] = useState(false);
	const [crossfadeTrigger, setCrossfadeTrigger] = useState({});

	const ref = useRef<HTMLElement>(null);
	const imageRef = useRef<HTMLImageElement>(null);
	const backupImageRef = useRef<HTMLImageElement>(null);
	const timeline = useRef(gsap.timeline());
	
    // Header CSS Styles
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

	// Change Image if there is no background image
	useEffect(() => {
		if (!backgroundImage) {
			changeImage();
		}
	}, [backgroundImage]);

	useGSAP(() => {
		if (!imageLoaded) {
			if (backgroundImage && !backupImage) {
				gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1 });
			}
		} else {
			if (backupImage) {
				if (backgroundImage == backupImage) {
					timeline.current
						.clear()
						.repeat(-1)
						.fromTo(ref.current, { opacity: 1 }, { opacity: 0.5, duration: 1 })
						.to(ref.current, { opacity: 1, duration: 1 });
				} else if (backgroundImage != backupImage) {
					timeline.current.repeat(0).to(ref.current, { opacity: 1 });
				}
			}
		}
	}, [backgroundImage, backupImage]);

	useGSAP(() => {
        if (imageLoaded) {
            console.log("YEO")
			gsap
				.fromTo(backupImageRef.current, { opacity: 1 }, { opacity: 0 })
				.then(() => {
					setBackupImage(null)
				});
		}
	}, [crossfadeTrigger]);

	useGSAP(() => {
		if (imageLoaded) {
			if (scrollable) {
				gsap.to(ref.current, { opacity: 0.5 });
			} else {
				gsap.to(ref.current, { opacity: 1 });
			}
		}
	}, [scrollable]);

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
