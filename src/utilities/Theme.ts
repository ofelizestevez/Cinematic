const Theme = {
	names: {
		headerHeight: "--headerHeight",
		buttonPaddingHeight: "--buttonPaddingHeight",
		buttonPaddingWidth: "--buttonPaddingWidth",
		buttonBottom: "--buttonBottom",
		buttonGap: "--buttonGap",
		contentHeaderPaddingHeight: "--contentHeaderPaddingHeight",
		contentFgColor: "--contentFgColor",
		contentBgColor: "--contentBgColor",
		contentHeaderBgColor: "--contentHeaderBgColor",
		contentHeaderShadow: "--contentHeaderShadow"
	},
	sizes: {
		headerHeight: "40vh",
		buttonPaddingHeight: "1rem",
		buttonPaddingWidth: "2rem",
		buttonBottom: "1rem",
		buttonGap: "rem",
		contentHeaderPaddingHeight: "2rem",
	},
	colors: {
		dark: {
			contentFgColor: "#FFFFFF",
			contentBgColor: "#080808",
			contentHeaderBgColor: "#1A1A1A",
			contentHeaderShadow: "unset",
		},
		light: {
			contentFgColor: "#000000",
			contentBgColor: "#F0F0F0",
			contentHeaderBgColor: "#FFFFFF",
			contentHeaderShadow: `
            0px 11px 25px 0px rgba(0, 0, 0, 0.06), 
            0px 45px 45px 0px rgba(0, 0, 0, 0.05), 
            0px 101px 60px 0px rgba(0, 0, 0, 0.03), 
            0px 179px 72px 0px rgba(0, 0, 0, 0.01), 
            0px 280px 78px 0px rgba(0, 0, 0, 0.00)   
            `,
		},
	},
};

export default Theme