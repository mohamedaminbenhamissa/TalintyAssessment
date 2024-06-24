function ArabIcon({}: { width?: number; height?: number; fill?: string }) {
  return (
    <svg
      width="32"
      height="18"
      viewBox="0 0 32 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="36" height="24" fill="#228B22" />
      <text
        x="50%"
        y="35%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="Arial"
        fontSize="14"
        fill="#FFFFFF"
      >
        ع
      </text>
    </svg>
  );
}

export default ArabIcon;
