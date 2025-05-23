"use client";
import { useClock } from "@/context/ClockContext";
import { useEffect, useState } from "react";

export default function IntroText() {
  const { timeOfDay } = useClock();
  const [isMobile, setIsMobile] = useState(false);
  const strokeClass = timeOfDay === "night" ? "stroke-dark" : "stroke-light";

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's md breakpoint
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <div className={`absolute ${isMobile ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-[90vw]' : 'top-[15vh] left-[50vw] w-[40vw]'} h-[50vh] z-20 flex flex-col justify-center`}>
      <h3 className={`cedarville-cursive-regular ${timeOfDay === "night" ? "text-white" : "text-black"}`}
         style={{ 
           fontSize: isMobile 
             ? "clamp(1.5rem, 6vw, 2rem)"  // Larger on mobile
             : "clamp(1rem, 1.5vw, 1.7rem)" // Original on desktop
         }}
      >
        👋 Hi, I'm Skandhan
      </h3>

      <h1 className={`flex-1 font-extrabold leading-tight space-y-1 ${timeOfDay === "night" ? "text-white" : "text-black"} ${isMobile ? 'text-center' : ''}`}
        style={{ 
          fontSize: isMobile 
            ? "clamp(2rem, 7vw, 4rem)"    // Larger on mobile
            : "clamp(1.5rem, 4vw, 3.7rem)" // Original on desktop
        }}
      >
        <span>I like making </span>
        <span className={strokeClass}>creative</span>
        <span>, </span>
        <span className="font-extrabold">interactive</span>
        <span> things with code.</span><br />
        <span>I also like to </span>
        <span className={strokeClass}>talk</span>
        <span> and </span>
        <span className={strokeClass}>learn</span>
        <span> about those things.</span>
      </h1>
    </div>
  );
}