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
    <div className="fixed left-[7vw] top-[60vh] translate-y-[-50%] w-[55vw] h-[75vh] z-40">
      <div className="w-full h-full relative">
        {/* Background Image */}
        <Image
          src={imageSrc}
          alt={`${timeOfDay} scene`}
          fill
          className="object-contain transition-opacity duration-500"
        />

        {/* Overlay Text */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-4 z-50 text-center w-full">
          <h1
            className={`text-3xl md:text-4xl font-extrabold tracking-wider drop-shadow-lg animate-fade-in
            ${timeOfDay === "night" ? "text-white" : "text-black"}`} 
            >     
            {overlayTextMap[timeOfDay]}
          </h1>
        </div>
      </div>
    </div>
  );
}
