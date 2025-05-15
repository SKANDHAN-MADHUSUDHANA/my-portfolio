"use client";
import { createContext, useContext, useState, useEffect, ReactNode, use } from "react";

export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

interface ClockContextType {
  hourAngle: number;
  minuteAngle: number;
  isPM: boolean;
  timeOfDay: TimeOfDay;
  displayTime: string;
  initialized: boolean;
  setClockState: (data: Partial<Omit<ClockContextType, 'initialized' | 'setClockState'>>) => void;
}

const ClockContext = createContext<ClockContextType | undefined>(undefined);

export function ClockProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Omit<ClockContextType, 'initialized' | 'setClockState'>>({
    hourAngle: 0,
    minuteAngle: 0,
    isPM: false,
    timeOfDay: 'morning',
    displayTime: '',
  });

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const hourAngle = (hours % 12 + minutes / 60) * 30;
    const minuteAngle = minutes * 6;
    const displayHours = hours % 12 || 12;
    const displayTime = `${displayHours}:${minutes.toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;

    let timeOfDay: TimeOfDay = 'morning';
    if (hours >= 12 && hours < 17) timeOfDay = 'afternoon';
    else if (hours >= 17 && hours < 21) timeOfDay = 'evening';
    else if (hours >= 21 || hours < 5) timeOfDay = 'night';

    setState({
      hourAngle,
      minuteAngle,
      isPM: hours >= 12,
      displayTime,
      timeOfDay,
    });
    setInitialized(true);
  }, []);

  const setClockState = (data: Partial<Omit<ClockContextType, 'initialized' | 'setClockState'>>) => {
    setState(prev => ({ ...prev, ...data }));
  };

  return (
    <ClockContext.Provider value={{ ...state, initialized, setClockState }}>
      {children}
    </ClockContext.Provider>
  );
}

export function useClock() {
  const context = useContext(ClockContext);
  if (!context) {
    throw new Error("useClock must be used within a ClockProvider");
  }
  return context;
}