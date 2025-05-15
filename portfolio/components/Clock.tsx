"use client";
import { useEffect, useRef } from "react";
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

  const handleMouseUp = () => {
    draggingHand.current = null;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [hourAngle, isPM]);

  return (
    <div
      ref={clockRef}
      className={`fixed top-[15vh] left-[10vw] z-50 w-[150vw] max-w-[15vw] aspect-square rounded-full border-[0.7vw] shadow-md flex items-center justify-center
      ${timeOfDay === 'evening' || timeOfDay === 'night' ? 'bg-gray-700 border-gray-400' : 'bg-stone-200 border-gray-800'}`}
    >
      <div className="absolute w-[1vw] h-[1vw] bg-black rounded-full z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />

      <div
        className={`absolute text-center w-full top-[70%] left-0 text-[1.3vw] font-medium
        ${timeOfDay === 'evening' || timeOfDay === 'night' ? 'text-white' : 'text-gray-700'}`}
      >
        {displayTime}
      </div>

      <div
        className="absolute w-[.5vw] h-[30%] bg-black origin-bottom rounded-sm z-30 top-1/2 left-1/2 cursor-pointer"
        style={{
          transform: `translate(-50%, -100%) rotate(${hourAngle}deg)`
        }}
        onMouseDown={() => handleMouseDown('hour', hourAngle)}
      />

      <div
        className="absolute w-[0.3vw] h-[42%] bg-blue-500 origin-bottom rounded-sm z-20 top-1/2 left-1/2"
        style={{
          transform: `translate(-50%, -100%) rotate(${minuteAngle}deg)`
        }}
      />
    </div>
  );
}
