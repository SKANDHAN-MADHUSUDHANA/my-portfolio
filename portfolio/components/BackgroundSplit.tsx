"use client";
import { useClock } from "@/context/ClockContext";

export default function BackgroundSplit({ children }: { children: React.ReactNode }) {
  const { timeOfDay, initialized } = useClock();

  if (!initialized) return null;

  // LEFT SECTION (35vw)
  const leftBg = {
    morning: "bg-white",
    afternoon: "bg-white",
    evening: "bg-[#f4edea]", // light tint
    night: "bg-black",
  }[timeOfDay];

  // RIGHT SECTION (65vw)
  const rightBg = {
    morning: "bg-[#c2b97f]",   // soft green
    afternoon: "bg-[#c2b97f]",
    evening: "bg-[#c2b97f]",
    night: "bg-[#6c577e]",      // purple shade
  }[timeOfDay];

  return (
    <div className="fixed inset-0 z-0 flex transition-colors duration-500">
      {/* Left Side */}
      <div className={`w-[35vw] h-full ${leftBg} transition-colors duration-500`} />

      {/* Right Side */}
      <div className={`w-[65vw] h-full ${rightBg} transition-colors duration-500`} />

      {/* Children on top */}
      <div className="absolute inset-0 z-10">{children}</div>
    </div>
  );
}
