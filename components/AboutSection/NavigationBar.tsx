"use client";

import Link from "next/link";
import { useClock } from "@/context/ClockContext";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function NavigationBar() {
  const { timeOfDay } = useClock();
  const [isMobile, setIsMobile] = useState(false);
  const [isHeroInView, setIsHeroInView] = useState(true);
  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.5,
    initialInView: true
  });

  useEffect(() => {
    setIsHeroInView(heroInView);
  }, [heroInView]);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's md breakpoint
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const textColor = timeOfDay === "night" || timeOfDay === "evening" 
    ? "text-white" 
    : "text-black";

  return (
    <>
      {/* This invisible div helps detect when we're in hero section */}
      <div ref={heroRef} className="absolute top-0 h-1 w-full" />
      
      <nav className={`
        z-50 
        ${isMobile 
          ? "fixed bottom-0 left-0 right-0 py-4 px-6 bg-white/90 backdrop-blur-sm border-t border-gray-200" 
          : `absolute top-6 right-6 transition-opacity duration-300 ${
              isHeroInView ? "opacity-100" : "opacity-0 pointer-events-none"
            }`
        }
      `}>
        <ul className={`flex ${isMobile ? "justify-around" : "gap-6"}`}>
          <li>
            <Link 
              href="#home" 
              className={`${textColor} font-medium hover:underline`}
              scroll={false}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              href="#about" 
              className={`${textColor} font-medium hover:underline`}
              scroll={false}
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              href="#projects" 
              className={`${textColor} font-medium hover:underline`}
              scroll={false}
            >
              Projects
            </Link>
          </li>
          <li>
            <Link 
              href="#contact" 
              className={`${textColor} font-medium hover:underline`}
              scroll={false}
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}