"use client";
import { useState } from "react";
import Link from "next/link";

interface DraggableCardProps {
  title: string;
  description: string;
  source: string;
  link: string;
  x: number;
  y: number;
}

export default function DraggableCard({ 
  title, 
  description, 
  source, 
  link,
  x,
  y 
}: DraggableCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ 
    x , y
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const startX = e.clientX;
    const startY = e.clientY;
    const initialX = position.x;
    const initialY = position.y;

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: initialX + e.clientX - startX,
          y: initialY + e.clientY - startY
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
    }
  };

  return (
    <div
      className="absolute cursor-grab bg-white rounded-xl border-2 border-black shadow-md p-5  
      transition-transform duration-200 hover:-translate-y-1 hover:rotate-1 w-[30vw] group"
      style={{ transform: `translate(${position.x}vw, ${position.y}vh)` }}
      onMouseDown={handleMouseDown}
    >
      <div className="flex space-x-1 mb-3">
        <div className="w-3 h-3 rounded-full bg-red-400"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
        <div className="w-3 h-3 rounded-full bg-green-400"></div>
      </div>

      <div className="border-t-4 border-black">
        <Link href={link} target="_blank" onClick={handleClick} className="block">
          {/* Title with card-hover triggered animation */}
          <h3 className="relative w-full font-bold tracking-tight text-[#404040] my-[1vh]"
              style={{fontSize:"clamp(0.3rem, 2vw, 1.9rem)"}}>
            <span className="relative">
              {title}
              <span className="absolute left-0 bottom-0 h-0.5 bg-pink-400 
                              transform origin-left scale-x-0 
                              transition-transform duration-500 ease-out
                              group-hover:scale-x-100"
                    style={{ width: '100%' }}>
              </span>
            </span>
          </h3>
          
          <p className="text-gray-700 "
              style={{fontSize:"clamp(0.01rem, 2vw, 0.9rem)"}}>
            {description}
          </p>
          
          <div className="flex justify-between items-center mt-4 text-sm text-black font-semibold">
            <span>{source}</span>
            <span className="text-blue-500">Know more →</span>
          </div>
        </Link>
      </div>
    </div>
  );
}