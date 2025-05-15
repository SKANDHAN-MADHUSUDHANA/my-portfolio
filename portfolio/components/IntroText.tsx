"use client";
import { useClock } from "@/context/ClockContext";

export default function IntroText() {
  const { timeOfDay } = useClock();

  const strokeClass =
    timeOfDay === "night" ? "stroke-dark" : "stroke-light";

  return (
    <div className="absolute top-[20vh] left-[50vw] w-[40vw] z-20">
      <p className={`text-lg cedarville-cursive-regular mb-4 ${timeOfDay === "night" ? "text-white" : "text-black"}`}>
        👋 Hi, I'm Skandhan
      </p>

      <h1 className={`text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight space-y-1 ${timeOfDay === "night" ? "text-white" : "text-black"}`}>
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
