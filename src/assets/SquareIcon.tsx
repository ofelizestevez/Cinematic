const SquareIcon = ({ height = 24, width = 24, color = "#000000" }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={width}
		height={height}
		viewBox={`0 0 ${width} ${height}`}
		fill="none"
		stroke={color}
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
	</svg>
);

export default SquareIcon;
