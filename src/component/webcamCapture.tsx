import React, { useEffect, useRef } from "react";

interface WebcamComponentProps {
  screenshotInterval: number;
}

const WebcamComponent: React.FC<WebcamComponentProps> = ({ screenshotInterval }) => {
  const webcamRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (webcamRef.current) {
        webcamRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  const captureScreenshot = () => {
    if (webcamRef.current && canvasRef.current) {
      const video = webcamRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        // Draw the current video frame onto the canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const image = canvas.toDataURL("image/png");

        // Trigger the download of the screenshot
        const link = document.createElement("a");
        link.download = `screenshot_${Date.now()}.png`;
        link.href = image;
        link.click();
      }
    }
  };

  useEffect(() => {
    startWebcam();

    const intervalId = setInterval(() => {
      captureScreenshot();
      console.log("Screenshot captured");
    }, screenshotInterval);

    return () => clearInterval(intervalId);
  }, [screenshotInterval]);

  return (
    <>
      <video
        ref={webcamRef}
        style={{ width: "0", height: "0", position: "absolute", opacity: 0 }}   
        muted
        autoPlay
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </>
  );
};

export default WebcamComponent;
