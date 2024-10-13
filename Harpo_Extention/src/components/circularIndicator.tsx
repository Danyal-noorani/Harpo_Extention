import React, { useEffect, useRef, useState } from "react";

interface CircularProgressProps {
  percentage: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ percentage }) => {
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const innerCircleRef = useRef<HTMLDivElement | null>(null);

  const bgColor = "Bisque";

  useEffect(() => {
    const speed = 25; // Speed of the animation
    const increment = () => {
      setCurrentPercentage((prev) => {
        if (prev >= percentage) return percentage;
        return prev + 1;
      });
    };

    const interval = setInterval(increment, speed);

    return () => clearInterval(interval);
  }, [percentage]);

  return (
    <div className="flex flex-col justify-center gap-2">
      <h2 className="font-mono font-semibold py-6 text-2xl">Risk Score</h2>

      <div
        className="relative flex items-center justify-center w-40 h-40 rounded-full"
        style={{
          background: `conic-gradient(hsl(calc(${currentPercentage} * 1), 100%, 30%) ${
            currentPercentage * 3.6
          }deg, ${bgColor} 0deg)`,
        }}
      >
        <div
          className="absolute w-[calc(100%_-_12px)] h-[calc(100%_-_12px)] rounded-full"
          style={{
            backgroundColor: `hsl(calc(${currentPercentage} * 1.2), 100%, 50%)`,
          }}
          ref={innerCircleRef}
        ></div>
        <p
          className="relative text-[32px] font-semibold font-mono"
          style={{ color: "Black" }}
        >
          {currentPercentage}%
        </p>
      </div>
    </div>
  );
};

export default CircularProgress;
