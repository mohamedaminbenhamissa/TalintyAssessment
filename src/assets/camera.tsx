function RecordCamera({
  width = 18,
  height = 18,
}: {
  width?: number;
  height?: number;
  fill?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M9.3975 15.3151H4.6575C2.2875 15.3151 1.5 13.7401 1.5 12.1576V5.84256C1.5 3.47256 2.2875 2.68506 4.6575 2.68506H9.3975C11.7675 2.68506 12.555 3.47256 12.555 5.84256V12.1576C12.555 14.5276 11.76 15.3151 9.3975 15.3151Z"
        stroke="#C1976B"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14.6399 12.825L12.5549 11.3625V6.62998L14.6399 5.16748C15.6599 4.45498 16.4999 4.88998 16.4999 6.14248V11.8575C16.4999 13.11 15.6599 13.545 14.6399 12.825Z"
        stroke="#C1976B"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.625 8.25C9.24632 8.25 9.75 7.74632 9.75 7.125C9.75 6.50368 9.24632 6 8.625 6C8.00368 6 7.5 6.50368 7.5 7.125C7.5 7.74632 8.00368 8.25 8.625 8.25Z"
        stroke="#C1976B"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default RecordCamera;
