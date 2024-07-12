import React, { useEffect, useRef } from "react";
import Webcam from "react-webcam";

interface WebcamCaptureProps {
  startTime: Date;
  expireTime: Date;
  saveScreenshot: (formData: FormData) => Promise<void>;
}

const WebcamCapture: React.FC<WebcamCaptureProps> = ({
  startTime,
  expireTime,
  saveScreenshot,
}) => {
  const webcamRef = useRef<Webcam>(null);
  const numberOfScreenshots = 3;
  const intervalMinutes = 10;

  // Function to calculate the times for the screenshots
  const calculateScreenshotTimes = () => {
    const times: Date[] = [];
    const startTimestamp = startTime.getTime();
    for (let i = 0; i < numberOfScreenshots; i++) {
      times.push(new Date(startTimestamp + i * intervalMinutes * 60000));
    }
    return times;
  };

  // Function to take a screenshot from the webcam at specified intervals
  const takeScreenshots = async (times: Date[]) => {
    for (let i = 0; i < times.length; i++) {
      const screenshotTime = times[i];
      const timeDifference = screenshotTime.getTime() - new Date().getTime();

      if (timeDifference > 0) {
        await new Promise((resolve) => setTimeout(resolve, timeDifference));
      }

      const imageSrc = webcamRef.current?.getScreenshot();

      if (imageSrc) {
        // Type guard to ensure imageSrc is not undefined
        const formData = new FormData();
        const blob = await fetch(imageSrc).then((res) => res.blob());
        formData.append("screenshot", blob, `screenshot-${i + 1}.png`);

        try {
          await saveScreenshot(formData);
        } catch (err) {
          console.error("Something went wrong!", err);
        }
      }
    }
  };

  useEffect(() => {
    if (webcamRef.current && startTime && expireTime) {
      const times = calculateScreenshotTimes();
      takeScreenshots(times);
    }
  }, [webcamRef, startTime, expireTime]);

  return (
    <div>
      <Webcam
        audio={false}
        height={1000}
        width={1000}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
    </div>
  );
};

export default WebcamCapture;
