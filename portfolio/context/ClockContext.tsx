"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

interface ClockContextType {
  hourAngle: number;
  minuteAngle: number;
  isPM: boolean;
  timeOfDay: TimeOfDay;
  displayTime: string;
  initialized: boolean;
  manualOverride: boolean;
  setClockState: (data: Partial<Omit<ClockContextType, 'initialized' | 'setClockState' | 'manualOverride'>>) => void;
  toggleManualOverride: (timeOfDay?: TimeOfDay) => void;
}

const ClockContext = createContext<ClockContextType | undefined>(undefined);

export function ClockProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Omit<ClockContextType, 'initialized' | 'setClockState' | 'manualOverride' | 'toggleManualOverride'>>({
    hourAngle: 0,
    minuteAngle: 0,
    isPM: false,
    timeOfDay: 'morning',
    displayTime: '',
  });

  const [initialized, setInitialized] = useState(false);
  const [manualOverride, setManualOverride] = useState(false);

  useEffect(() => {
    if (manualOverride) return; // Don't update time if manual override is active

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

    setState(prev => ({
      ...prev,
      hourAngle,
      minuteAngle,
      isPM: hours >= 12,
      displayTime,
      timeOfDay,
    }));
    setInitialized(true);
  }, [manualOverride]);

  const setClockState = (data: Partial<Omit<ClockContextType, 'initialized' | 'setClockState' | 'manualOverride' | 'toggleManualOverride'>>) => {
    setState(prev => ({ ...prev, ...data }));
  };

  const toggleManualOverride = (timeOfDay?: TimeOfDay) => {
    if (timeOfDay) {
      // Set specific time of day
      setState(prev => ({
        ...prev,
        timeOfDay,
        isPM: timeOfDay === 'afternoon' || timeOfDay === 'evening' || timeOfDay === 'night'
      }));
      setManualOverride(true);
    } else {
      // Toggle between morning and night
      const newTimeOfDay = state.timeOfDay === 'night' ? 'morning' : 'night';
      setState(prev => ({
        ...prev,
        timeOfDay: newTimeOfDay,
        isPM:  newTimeOfDay === 'night'
      }));
      setManualOverride(!manualOverride);
    }
  };

  return (
    <ClockContext.Provider value={{ 
      ...state, 
      initialized, 
      manualOverride,
      setClockState, 
      toggleManualOverride 
    }}>
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