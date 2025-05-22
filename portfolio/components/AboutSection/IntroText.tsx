"use client";
import { useClock } from "@/context/ClockContext";

export default function IntroText() {
  const { timeOfDay } = useClock();

  const strokeClass =
    timeOfDay === "night" ? "stroke-dark" : "stroke-light";

  return (
    <div className="absolute top-[15vh] left-[50vw] w-[40vw] h-[50vh] z-20 flex flex-col justify-center">
      <h3 className={`cedarville-cursive-regular ${timeOfDay === "night" ? "text-white" : "text-black"}`}
         style={{ fontSize: "clamp(1rem, 1.5vw, 1.7rem)" }}
      >
        👋 Hi, I'm Skandhan
      </h3>

      <h1 className={`flex-1  font-extrabold leading-tight space-y-1 ${timeOfDay === "night" ? "text-white" : "text-black"}`}
        style={{ fontSize: "clamp(1.5rem, 4vw, 3.7rem)" }}
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