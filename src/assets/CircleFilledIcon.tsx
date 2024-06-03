const CircleFilledIcon = ({ height = 24, width = 24, color = "#000000"}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill={color}
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx={width / 2} cy={height / 2} r={Math.min(width, height) / 2 - 1} />
  </svg>
);

export default CircleFilledIcon;
