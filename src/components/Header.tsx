import {
	MouseEventHandler,
	ReactNode,
	useEffect,
	useRef,
	useState,
} from "react";
import { css } from "@emotion/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { FastAverageColor } from "fast-average-color";
import { Colord } from "colord";
import { fetchUnsplash } from "../utilities/Helpers";
import { Theme, themeSizes } from "../utilities/Theme";

interface props {
	children?: ReactNode;
	setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

// Image CSS Styles
const image = css`
position: absolute;
width: 100%;
top: 0;
`;

function Header({ children, setTheme  }: props) {
	// Refenrences for Header, Image Children, and GSAP Timeline
	const ref = useRef<HTMLElement>(null);
	const imageRef = useRef<HTMLImageElement>(null);
	const backupImageRef = useRef<HTMLImageElement>(null);
	const timeline = useRef(gsap.timeline({ repeat: 1 }));

	// States for Image Sources + Scrollable
	const [backgroundImage, setBackgroundImage] = useState(
		localStorage.getItem("backgroundImage")
	);
	const [backupImage, setBackupImage] = useState("");
	const [isScrollable, setScrollable] = useState(false);

	// Variables for themes

	const SCROLL_HEIGHT_ITEM = "scrollHeight";

	// Header CSS Styles
	const styles = css`
		position: relative;
		overflow: ${isScrollable ? "scroll" : "hidden"};
		opacity: ${backgroundImage ? "100%" : "0%"};
		height: ${themeSizes.headerHeight};

		-ms-overflow-style: none;
		scrollbar-width: none;
		&::-webkit-scrollbar {
			display: none;
		}
	`;

	// Registering scroll plugin
	useGSAP(() => {
		gsap.registerPlugin(ScrollToPlugin);
	});

	// Change Image if there is no background image
	useEffect(() => {
		if (!backgroundImage) {
			changeImage();
		}
	}, []);

	const changeImage = () => {
		// Clears All timeline information, then starts "beating" loop
		if (backgroundImage) {
			timeline.current
				.clear()
				.repeat(1)
				.fromTo(ref.current, { opacity: 1 }, { opacity: 0.5, duration: 1 })
				.to(ref.current, { opacity: 1, duration: 1 });
		}

		// fetch image from unsplash then set the url to background image + localstorage
		fetchUnsplash().then((url) => {
			setBackgroundImage(url);
			localStorage.setItem("backgroundImage", url);
		});
	};

	// Gets the fast color average of the backgroundImage, then determines light/dark
	const headerSetTheme = () => {
		const fac = new FastAverageColor();

		fac.getColorAsync(imageRef.current, {}).then((color) => {
			// Takes the color, turns it into a Colord to use .isDark()
			const colord = new Colord(color.hex);
			console.log(colord.isDark())
			setTheme(colord.isDark() ? Theme.DARK : Theme.LIGHT);
		});
	};

	const setInitialScrollPosition = () => {
		// Sets scroll height to localstorage or defaults to halways point
		let scrollHeight = localStorage.getItem(SCROLL_HEIGHT_ITEM);
		if (!scrollHeight) {
			const headerHalfScrollPoint =
				(ref.current!.scrollHeight - ref.current!.clientHeight) / 2;

			scrollHeight = JSON.stringify(headerHalfScrollPoint);
		}

		ref.current!.scrollTop = parseFloat(scrollHeight);
	};

	// Resets ScrollTop to halfway point
	const resetScrollPosition = () => {
		// Gets halfway point by getting half of the scroll height minus client height
		const headerHalfScrollPoint =
			(ref.current!.scrollHeight - ref.current!.clientHeight) / 2;

		// Animates new scroll position then saves it.
		gsap.to(ref.current, { scrollTo: headerHalfScrollPoint });
		localStorage.setItem(
			SCROLL_HEIGHT_ITEM,
			JSON.stringify(headerHalfScrollPoint)
		);
	};

	// Sets the fading image on top of the real image, and changes image behind it
	const onImageClick = () => {
		gsap.to(backupImageRef.current, { zIndex: 1 });
		setBackupImage(backgroundImage ?? "");

		changeImage();
	};

	// On image load:
	// Sets initial scroll position
	// Sets the theme (incase its not already set)
	// TODO: setTheme smarter
	// In case of "beating" animation, resets the timeline, resets header, then resets backup image
	const onImageLoad = () => {
		// Things to always do on image load
		setInitialScrollPosition();
		headerSetTheme();

		// Prevents from running at initial load
		// Only continue if in "beating animation"
		// We only use backup image during the "beating" animation
		if (backupImage == "") {
			gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1 });
			return;
		}

		// Resets component opacity and fades out backup image
		timeline.current
			.clear()
			.repeat(0)
			.to(ref.current, { opacity: 1 })
			.fromTo(backupImageRef.current, { opacity: 1 }, { opacity: 0 }, "<")
			.to(backupImageRef.current, { zIndex: -1 });
	};

	const onContextMenu: MouseEventHandler<HTMLElement> = (e) => {
		// If using any modifier (except shift), return (so you can right click)
		if (e.altKey || e.ctrlKey || e.metaKey) {
			return;
		}

		e.preventDefault();

		// shift key triggers reset scroll position
		if (e.shiftKey) {
			resetScrollPosition();
			return;
		}

		// If scrollable, disable scroll appearance
		// Also save scroll position to localstorage
		if (isScrollable) {
			gsap.to(ref.current, { opacity: 1 });
			localStorage.setItem(
				SCROLL_HEIGHT_ITEM,
				JSON.stringify(ref.current?.scrollTop)
			);
		}
		// If not scrollable, enable scroll appearance
		else {
			gsap.fromTo(ref.current, { opacity: 1 }, { opacity: 0.5 });
		}

		setScrollable(!isScrollable);
	};

	return (
		<header css={styles} onContextMenu={onContextMenu} ref={ref}>
			<img
				css={image}
				src={backgroundImage ?? ""}
				alt=""
				onClick={onImageClick}
				onLoad={onImageLoad}
				crossOrigin="anonymous"
				ref={imageRef}
			/>
			<img css={image} src={backupImage ?? ""} alt="" ref={backupImageRef} />
			<div>{children}</div>
		</header>
	);
}

export default Header;
