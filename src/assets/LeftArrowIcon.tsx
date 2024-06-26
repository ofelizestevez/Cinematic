const LeftArrowIcon = ({ height = 24, width = 24, color = "#000000" }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={width}
		height={height}
		viewBox={`0 0 24 24`}
		fill="none"
		stroke={color}
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<line x1="19" y1="12" x2="5" y2="12"></line>
		<polyline points="12 19 5 12 12 5"></polyline>
	</svg>
);

export default LeftArrowIcon;
