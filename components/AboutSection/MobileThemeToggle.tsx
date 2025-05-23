"use client";
import { useClock } from "@/context/ClockContext";
import { useEffect, useState } from "react";

export default function MobileThemeToggle() {
  const { timeOfDay, toggleManualOverride } = useClock();
  const [isMobile, setIsMobile] = useState(false);
  const isNightMode = timeOfDay === 'night';

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== 'undefined') {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 768); // Using Tailwind's md breakpoint
      };
      
      // Initial check
      checkIfMobile();
      
      // Add event listener for resizes
      window.addEventListener('resize', checkIfMobile);
      
      // Cleanup
      return () => window.removeEventListener('resize', checkIfMobile);
    }
  }, []);

  const handleToggle = () => {
    toggleManualOverride(isNightMode ? 'morning' : 'night');
  };

  if (!isMobile) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
      <button
        onClick={handleToggle}
        className={`
          relative w-14 h-7 mr-[5vw] rounded-full flex items-center
          transition-colors duration-300
          ${isNightMode ? 'bg-gray-700' : 'bg-gray-300'}
          ${isNightMode ? 'border-2 border-white' : 'border-2 border-black'}
        `}
        aria-label={`Switch to ${isNightMode ? 'day' : 'night'} mode`}
      >
        <span className={`
          absolute w-6 h-6 rounded-full transform transition-transform duration-300
          ${isNightMode ? 'translate-x-7 bg-yellow-100 border-2 border-black' : 'translate-x-1 bg-yellow-300 border-2 border-white'}
          flex items-center justify-center text-sm
        `}>
          {isNightMode ? '🌙' : '☀️'}
        </span>
      </button>
    </div>
  );
}