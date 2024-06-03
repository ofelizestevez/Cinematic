const CloudLightingIcon = ({ height = 24, width = 24, color = "#000000"}) => (
    <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={width}
    height={height}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    stroke-width="2" 
    stroke-linecap="round" 
    stroke-linejoin="round" >
        <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"></path>
        <polyline points="13 11 9 17 15 17 11 23"></polyline>
    </svg>
  );
  
export default CloudLightingIcon;