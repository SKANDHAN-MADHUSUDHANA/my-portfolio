"use client";

import { useClock } from "@/context/ClockContext";
import DraggableCard from "./DraggableCard";
import Link from "next/link";

const projectData = [
  {
    title: "My Interactive Portfolio",
    description: "A playful and immersive portfolio built with Next.js, and Tailwind CSS.It features a draggable analog clock that reveals different time-based scenes, a terminal-style about section with typed command responses, creative project cards, and a cartoon-enhanced contact area.Fully responsive, delightfully animated, and engineered with clean, maintainable code.",
    source: "GitHub",
    link: "https://github.com/SKANDHAN-MADHUSUDHANA/my-portfolio",
    x: 7,
    y: -5
  },
  {
    title: "Outdoor Trip Planner",
    description: "A collaborative trip planning platform that simplifies organizing outdoor adventures. Built as a full-stack web application with Next.js, TypeScript, Tailwind CSS, and MySQL, it allows users to create trips, invite friends, assign accommodations, transportation, meal plans, and activities.",
    source: "GitHub",
    link: "https://github.com/SKANDHAN-MADHUSUDHANA/trip-planner",
    x:50,
    y:-20
  },
  {
    title: "Perspicacity Ambulance",
    description: "A real-time hospital–ambulance communication platform built with React, JavaScript, Firebase, and Supabase. Ambulance staff can share live patient updates, while hospitals respond based on bed and specialist availability — ensuring faster, smarter emergency routing.",
    source: "GitHub",
    link: "https://github.com/SKANDHAN-MADHUSUDHANA/Perspicacity-Ambulance",
    x: 40,
    y:20
  }
];

export default function ProjectsSection() {
  const { timeOfDay } = useClock();
  const bgColor = timeOfDay === "night" || timeOfDay === "evening"
    ? "bg-[#4c3a69]"
    : "bg-[#ae8fdb]";

  return (
    <section className={`${bgColor} relative w-full min-h-screen py-[10vh] px-[5vw] transition-colors duration-500 relative`}>
      <div className="container mx-auto">
        <h1 className={`drop-shadow-lg tracking-tight leading-loose ${
          timeOfDay === "night" || timeOfDay === "evening" ? "text-white" : "text-[#404040]"
        }`}
          style={{
            fontSize: "clamp(1rem, 5vw, 4rem)",
            fontWeight: 900,
            marginBottom: "5rem",
            marginTop: "10vh",
            marginLeft: "7vw"
          }}
        >
          Projects.
        </h1>

        <div className="relative min-h-[60vh] w-full">
  {projectData.map((project, index) => (
    <div key={index} className="md:absolute static">
      <DraggableCard {...project} />
    </div>
  ))}
</div>

        <Link href="https://github.com/SKANDHAN-MADHUSUDHANA" target="_blank">
          <div className={`drop-shadow-lg tracking-tight leading-loose shadow-[0.5vw_0.5vw_0px_black] hover:shadow-[2px_2px_0px_#444] transition-all duration-200 mt-0 md:mt-[-15vh]`}
            style={{
              fontSize: "clamp(.5rem, 3vw, 1.2rem)",
              fontWeight: 900,
              marginLeft: "7vw",
              background: "white",
              borderWidth: ".5vh",
              borderColor: "black",
              width: "13vw",
              minWidth: "150px",
              height: "7vh",
              color: "black",
              display: "flex",
              flexDirection: 'column',
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            More Projects 
          </div>
        </Link>
      </div>
    </section>
  );
}