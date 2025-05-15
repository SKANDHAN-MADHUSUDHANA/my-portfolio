"use client";
import Image from "next/image";
import { useClock } from "@/context/ClockContext";

export default function TimeScene() {
  const { timeOfDay, initialized } = useClock();

  if (!initialized) return null;

  const imageSrc = `/images/${timeOfDay}.png`; // example: morning.png

  return (
    <div
      className="fixed left-[7vw] top-[60vh] translate-y-[-50%] w-[55vw] h-[85vh] z-40"
    >
      <div className="w-full h-full relative">
        <Image
          src={imageSrc}
          alt={`${timeOfDay} scene`}
          fill
          className="object-contain  transition-opacity duration-500"
        />
      </div>
    </div>
  );
}
