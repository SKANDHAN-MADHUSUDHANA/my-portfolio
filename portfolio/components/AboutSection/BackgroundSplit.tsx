"use client";
import { useClock } from "@/context/ClockContext";

export default function BackgroundSplit() {
  const { timeOfDay, initialized } = useClock();

  if (!initialized) return null;

  // LEFT SECTION (35vw)
  const leftBg = {
    morning: "bg-white",
    afternoon: "bg-white",
    evening: "bg-[#dadada]", // light tint
    night: "bg-black",
  }[timeOfDay];

  // RIGHT SECTION (65vw)
  const rightBg = {
    morning: "bg-[#c2b97f]",   // soft green
    afternoon: "bg-[#c2b97f]",
    evening: "bg-[#6c577e]",
    night: "bg-[#774069]",     // purple shade
  }[timeOfDay];

  return (
    <div className="absolute inset-0 z-0 flex transition-colors duration-500 pointer-events-none h-screen w-full">
      {/* Left Side */}
      <div className={`w-[35vw] h-full ${leftBg} transition-colors duration-500`} />

      {/* Right Side */}
      <div className={`w-[65vw] h-full ${rightBg} transition-colors duration-500`} />
    </div>
  );
}