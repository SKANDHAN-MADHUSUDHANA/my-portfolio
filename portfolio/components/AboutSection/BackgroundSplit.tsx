"use client";
import { useClock } from "@/context/ClockContext";

export default function BackgroundSplit() {
  const { timeOfDay, initialized } = useClock();

  if (!initialized) return null;

  // LEFT SECTION (35vw on desktop, 0 on mobile)
  const leftBg = {
    morning: "bg-white",
    afternoon: "bg-white",
    evening: "bg-[#dadada]",
    night: "bg-black",
  }[timeOfDay];

  // RIGHT SECTION (65vw on desktop, 100vw on mobile)
  const rightBg = {
    morning: "bg-[#c2b97f]",
    afternoon: "bg-[#c2b97f]",
    evening: "bg-[#6c577e]",
    night: "bg-[#774069]",
  }[timeOfDay];

  return (
    <div className="absolute inset-0 z-0 flex transition-colors duration-500 pointer-events-none h-screen w-full">
      {/* Left Side - hidden on mobile */}
      <div className={`md:w-[35vw] w-0 h-full ${leftBg} transition-colors duration-500`} />
      
      {/* Right Side - full width on mobile */}
      <div className={`md:w-[65vw] w-full h-full ${rightBg} transition-colors duration-500`} />
    </div>
  );
}