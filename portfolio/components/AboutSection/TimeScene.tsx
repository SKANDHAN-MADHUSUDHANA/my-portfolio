"use client";
import Image from "next/image";
import { useClock } from "@/context/ClockContext";

export default function TimeScene() {
  const { timeOfDay, initialized } = useClock();

  const overlayTextMap: Record<typeof timeOfDay, string> = {
    morning: "RUN",
    afternoon: "CODE",
    evening: "MORE CODE",
    night: "SLEEP, REPEAT",
  };

  if (!initialized) return null;

  const imageSrc = `/images/${timeOfDay}.png`;

  return (
    <div className=" relative ml-[13vw] mt-[-23vh] w-[40vw] h-[75vh] flex flex-col justify-start items-center">
      {/* Overlay Text */}
      <div className="w-full h-[7vh] flex items-center justify-center z-50">
        <h1
          className={`t font-extrabold tracking-wider drop-shadow-lg animate-fade-in
            ${timeOfDay === "night" ? "text-white" : "text-black"}`}
            style={{ fontSize: "clamp(1rem, 2.5vw, 3rem)" }}
        >
          {overlayTextMap[timeOfDay]}
        </h1>
      </div>
      <div className="w-full flex-1 relative z-40">
      {/* Background Image */}
        <Image
          src={imageSrc}
          alt={`${timeOfDay} scene`}
          fill
          className="object-contain transition-opacity duration-500"
        />
      </div>
    </div>
  );
}