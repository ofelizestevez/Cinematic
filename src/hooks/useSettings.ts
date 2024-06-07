import { useState, useRef, useEffect } from "react";
import {gsap} from "gsap";

export function useSettings() {
	const [showSettings, setShowSettings] = useState(false);
	const settingsRef = useRef(null);

	const openSettings = () => setShowSettings(true);

	const closeSettings = () => {
		gsap.to(settingsRef.current, { display: "none", opacity: 0 }).then(() => {
			setShowSettings(false);
		});
	};

	useEffect(() => {
		if (showSettings) {
			gsap.to(settingsRef.current, { display: "block", opacity: 1 });
		}
	}, [showSettings]);

	return { showSettings, openSettings, closeSettings, settingsRef };
}