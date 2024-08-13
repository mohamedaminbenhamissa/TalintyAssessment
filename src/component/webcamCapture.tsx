import React, { useEffect, useRef } from "react";
import html2canvas from "html2canvas";

interface WebcamComponentProps {
  screenshotInterval: number; 
}

const WebcamComponent: React.FC<WebcamComponentProps> = ({ screenshotInterval }) => {
const webcamRef = useRef<HTMLDivElement>(null);

  const captureScreenshot = () => {
    if (webcamRef.current) {
      html2canvas(webcamRef.current).then((canvas) => {
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = `screenshot_${Date.now()}.png`;
        link.href = image;
        link.click();
      });
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      captureScreenshot();
      console.log("screen captured")
    }, screenshotInterval);

    return () => clearInterval(intervalId);
  }, [screenshotInterval]);

  return <div ref={webcamRef} style={{ width: "100%", height: "100%" }}></div>;
};

export default WebcamComponent;
