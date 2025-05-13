"use client";
import { useEffect, useRef, useState } from "react";

type DraggingHandType = null | 'hour' | 'minute';
type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

export default function Clock() {
  const [hourAngle, setHourAngle] = useState(0);
  const [minuteAngle, setMinuteAngle] = useState(0);
  const [displayTime, setDisplayTime] = useState("");
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('morning');
  const [isPM, setIsPM] = useState(new Date().getHours() >= 12);
  const draggingHand = useRef<DraggingHandType>(null);
  const clockRef = useRef<HTMLDivElement>(null);
  const startAngle = useRef(0);
  const previousHour12 = useRef(0);

  // Initialize clock with current time
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      
      setIsPM(hours >= 12);
      
      const displayHours = hours % 12 || 12;
      setDisplayTime(`${displayHours}:${minutes.toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`);
      
      const newHourAngle = (hours % 12 + minutes / 60) * 30;
      const newMinuteAngle = minutes * 6;
      
      setHourAngle(newHourAngle);
      setMinuteAngle(newMinuteAngle);
      previousHour12.current = Math.floor(newHourAngle / 30) % 12 || 12;
      
      updateTimeOfDay(hours);
    };

    updateClock();
    const interval = setInterval(updateClock, 60000);
    return () => clearInterval(interval);
  }, []);

  const updateTimeOfDay = (hours24: number) => {
    let newTimeOfDay: TimeOfDay;
    
    if (hours24 >= 5 && hours24 < 12) {
      newTimeOfDay = 'morning';
    } else if (hours24 >= 12 && hours24 < 17) {
      newTimeOfDay = 'afternoon';
    } else if (hours24 >= 17 && hours24 < 21) {
      newTimeOfDay = 'evening';
    } else {
      newTimeOfDay = 'night';
    }
    
    if (newTimeOfDay !== timeOfDay) {
      setTimeOfDay(newTimeOfDay);
      applyTheme(newTimeOfDay);
    }
  };

  const applyTheme = (time: TimeOfDay) => {
    console.log(`Theme changed to ${time}`);
    document.body.className = time;
  };

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

    if (draggingHand.current === 'hour') {
      // Hour hand dragging logic
      const currentHour12 = Math.floor(angle / 30) % 12 || 12;
      if ((previousHour12.current === 12 && currentHour12 === 11) || 
          (previousHour12.current === 11 && currentHour12 === 12)) {
        setIsPM(!isPM);
      }
      previousHour12.current = currentHour12;

      setHourAngle(angle);
      const minuteAngle = (angle / 30) * 60 * 6;
      setMinuteAngle(minuteAngle % 360);
      
      const displayHours = currentHour12;
      const minutes = Math.floor((minuteAngle % 360) / 6);
      setDisplayTime(`${displayHours}:${minutes.toString().padStart(2, '0')} ${isPM ? 'PM' : 'AM'}`);
      
      const hours24 = currentHour12 % 12 + (isPM ? 12 : 0);
      updateTimeOfDay(hours24);
    } 
    // else if (draggingHand.current === 'minute') {
    //   // Minute hand dragging logic - THIS IS THE FIXED PART
    //   setMinuteAngle(angle);
      
    //   // Calculate hour movement (60 minutes = 30 degrees for hour hand)
    //   const hourMovement = (angle - startAngle.current) / 12;
    //   const newHourAngle = (hourAngle + hourMovement) % 360;
    //   setHourAngle(newHourAngle < 0 ? newHourAngle + 360 : newHourAngle);
      
    //   // Update display
    //   const hours12 = Math.floor(newHourAngle / 30) % 12 || 12;
    //   const minutes = Math.floor(angle / 6);
    //   setDisplayTime(`${hours12}:${minutes.toString().padStart(2, '0')} ${isPM ? 'PM' : 'AM'}`);
      
    //   // Update time of day if needed
    //   const hours24 = hours12 % 12 + (isPM ? 12 : 0);
    //   updateTimeOfDay(hours24);
      
    //   startAngle.current = angle;
    // }
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
      className={`fixed top-[5vh] left-[5vw] z-50 w-[20vw] max-w-[150px] aspect-square rounded-full border-[6px] shadow-md flex items-center justify-center
      ${timeOfDay === 'night' || timeOfDay === 'evening' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-400'}`}
    >
      {/* Center dot */}
      <div className="absolute w-[6px] h-[6px] bg-black rounded-full z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />

      {/* Time display */}
      <div 
        className={`absolute text-center w-full top-[55%] left-0 text-sm font-medium
        ${timeOfDay === 'night' || timeOfDay === 'evening' ? 'text-white' : 'text-gray-700'}`}
      >
        {displayTime}
      </div>

      {/* Hour hand */}
      <div
        className="absolute w-[3px] h-[30%] bg-gray-800 origin-bottom rounded-sm z-30 top-1/2 left-1/2 cursor-pointer"
        style={{
          transform: `translate(-50%, -100%) rotate(${hourAngle}deg)`
        }}
        onMouseDown={() => handleMouseDown('hour', hourAngle)}
      />

      {/* Minute hand */}
      <div
        className="absolute w-[2px] h-[42%] bg-blue-500 origin-bottom rounded-sm z-20 top-1/2 left-1/2 "
        style={{ 
          transform: `translate(-50%, -100%) rotate(${minuteAngle}deg)`
        }}
        //onMouseDown={() => handleMouseDown('minute', minuteAngle)}
      />
    </div>
  );
}