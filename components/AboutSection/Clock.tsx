"use client";
import { useEffect, useRef, useState } from "react";
import { useClock } from "@/context/ClockContext";

type DraggingHandType = null | 'hour';
type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

export default function Clock() {
  const {
    hourAngle,
    minuteAngle,
    isPM,
    displayTime,
    timeOfDay,
    setClockState,
  } = useClock();

  const draggingHand = useRef<DraggingHandType>(null);
  const clockRef = useRef<HTMLDivElement>(null);
  const startAngle = useRef(0);
  const previousHour12 = useRef(0);
  const hasInitialized = useRef(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipBgMap: Record<TimeOfDay, string> = {
  morning: "bg-[#c2b97f]",
  afternoon: "bg-[#c2b97f]",
  evening: "bg-[#774069]",
  night: "bg-[#774069]",
};


  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const newHourAngle = (hours % 12 + minutes / 60) * 30;
    const newMinuteAngle = minutes * 6;

    const displayHours = hours % 12 || 12;
    const newDisplayTime = `${displayHours}:${minutes.toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;

    let newTimeOfDay: TimeOfDay = 'morning';
    if (hours >= 12 && hours < 17) newTimeOfDay = 'afternoon';
    else if (hours >= 17 && hours < 21) newTimeOfDay = 'evening';
    else if (hours >= 21 || hours < 5) newTimeOfDay = 'night';

    setClockState({
      hourAngle: newHourAngle,
      minuteAngle: newMinuteAngle,
      isPM: hours >= 12,
      displayTime: newDisplayTime,
      timeOfDay: newTimeOfDay,
    });

    previousHour12.current = Math.floor(newHourAngle / 30) % 12 || 12;
  }, [setClockState]);

  const handleMouseDown = (hand: DraggingHandType, currentAngle: number) => {
    draggingHand.current = hand;
    startAngle.current = currentAngle;
    previousHour12.current = Math.floor(hourAngle / 30) % 12 || 12;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!draggingHand.current || !clockRef.current) return;

    const rect = clockRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;

    const currentHour12 = Math.floor(angle / 30) % 12 || 12;
    let updatedIsPM = isPM;

    if ((previousHour12.current === 12 && currentHour12 === 11) ||
        (previousHour12.current === 11 && currentHour12 === 12)) {
      updatedIsPM = !isPM;
    }

    previousHour12.current = currentHour12;

    const minuteFromHour = (angle / 30) * 60;
    const newMinuteAngle = (minuteFromHour % 60) * 6;
    const displayHours = currentHour12;
    const minutes = Math.floor((newMinuteAngle % 360) / 6);
    const displayTime = `${displayHours}:${minutes.toString().padStart(2, '0')} ${updatedIsPM ? 'PM' : 'AM'}`;

    const hours24 = currentHour12 % 12 + (updatedIsPM ? 12 : 0);
    let newTimeOfDay: TimeOfDay = 'morning';
    if (hours24 >= 12 && hours24 < 17) newTimeOfDay = 'afternoon';
    else if (hours24 >= 17 && hours24 < 21) newTimeOfDay = 'evening';
    else if (hours24 >= 21 || hours24 < 5) newTimeOfDay = 'night';

    setClockState({
      hourAngle: angle,
      minuteAngle: newMinuteAngle,
      isPM: updatedIsPM,
      displayTime,
      timeOfDay: newTimeOfDay,
    });
  };

  const handleTouchMove = (e: TouchEvent) => {
  if (!draggingHand.current || !clockRef.current) return;

  const touch = e.touches[0];
  const rect = clockRef.current.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const dx = touch.clientX - cx;
  const dy = touch.clientY - cy;
  let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
  if (angle < 0) angle += 360;

  const currentHour12 = Math.floor(angle / 30) % 12 || 12;
  let updatedIsPM = isPM;

  if ((previousHour12.current === 12 && currentHour12 === 11) ||
      (previousHour12.current === 11 && currentHour12 === 12)) {
    updatedIsPM = !isPM;
  }

  previousHour12.current = currentHour12;

  const minuteFromHour = (angle / 30) * 60;
  const newMinuteAngle = (minuteFromHour % 60) * 6;
  const displayHours = currentHour12;
  const minutes = Math.floor((newMinuteAngle % 360) / 6);
  const displayTime = `${displayHours}:${minutes.toString().padStart(2, '0')} ${updatedIsPM ? 'PM' : 'AM'}`;

  const hours24 = currentHour12 % 12 + (updatedIsPM ? 12 : 0);
  let newTimeOfDay: TimeOfDay = 'morning';
  if (hours24 >= 12 && hours24 < 17) newTimeOfDay = 'afternoon';
  else if (hours24 >= 17 && hours24 < 21) newTimeOfDay = 'evening';
  else if (hours24 >= 21 || hours24 < 5) newTimeOfDay = 'night';

  setClockState({
    hourAngle: angle,
    minuteAngle: newMinuteAngle,
    isPM: updatedIsPM,
    displayTime,
    timeOfDay: newTimeOfDay,
  });
};


  const handleMouseUp = () => {
    draggingHand.current = null;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [hourAngle, isPM]);

  return (
    <div 
      className="relative flex flex-col items-center"
      style={{
        width: '20vw',
        height: '30vh',
        marginTop: '7vh',
        marginLeft: '5vw'
      }}
    >
      {/* Tooltip positioned above clock in flex column */}
      {showTooltip && (
        <div className="w-[min(18vw,220px)] mb-4 animate-bounce-fade">
          <div className={`relative ${tooltipBgMap[timeOfDay]} text-black p-3 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] border-2 border-black`}
            style={{
              fontSize: "clamp(0.65rem, 1.1vw, 0.85rem)",
              fontFamily: "Comic Sans MS, cursive",
              transform: "rotate(-2deg)"
            }}
          >
            <span className="absolute -top-3 -left-3 text-2xl">💬</span>
            <p className="pl-4">"Spin the hour hand to see my daily routine!"</p>
            <div className="absolute left-6 -bottom-3 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent"
              style={{ borderTopColor: (timeOfDay === "night" || timeOfDay === "evening") ? "#774069" : "#c2b97f" }}
            ></div>
          </div>
        </div>
      )}

      {/* Clock container */}     
      <div
        ref={clockRef}
        className={`relative z-60 w-full max-w-[15vw] aspect-square rounded-full border-[0.7vw] shadow-md flex items-center justify-center ${
          timeOfDay === 'evening' || timeOfDay === 'night' 
            ? 'bg-gray-700 border-gray-400' 
            : 'bg-stone-200 border-gray-800'
        }`}
      >
        {/* Clock center dot */}
        <div className="absolute w-[1vw] h-[1vw] bg-black rounded-full z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />

        {/* Time display */}
        <div className={`absolute text-center w-full top-[70%] left-0 text-[1.3vw] font-medium  pointer-events-none select-none ${
          timeOfDay === 'evening' || timeOfDay === 'night' 
            ? 'text-white' 
            : 'text-gray-700'
        }`}>
          {displayTime}
        </div>

        {/* Hour hand */}
        <div
          className="absolute w-[.5vw] h-[30%] bg-black origin-bottom rounded-sm z-30 top-1/2 left-1/2 cursor-pointer"
          style={{
            transform: `translate(-50%, -100%) rotate(${hourAngle}deg)`
          }}
          onMouseDown={() => handleMouseDown('hour', hourAngle)}
          onTouchStart={() => handleMouseDown('hour', hourAngle)}
        />

        {/* Minute hand */}
        <div
          className="absolute w-[0.3vw] h-[42%] bg-blue-500 origin-bottom rounded-sm z-20 top-1/2 left-1/2"
          style={{
            transform: `translate(-50%, -100%) rotate(${minuteAngle}deg)`
          }}
        />
      </div>
    </div>
  );
}
