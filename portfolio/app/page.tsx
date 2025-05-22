import Image from "next/image";
import Clock from "@/components/AboutSection/Clock";
import TimeScene from "@/components/AboutSection/TimeScene";
import BackgroundSplit from "@/components/AboutSection/BackgroundSplit";
import IntroText from "@/components/AboutSection/IntroText";
import ProjectsSection from "@/components/Projects/ProjectsSection";

export default function Home(){
  return(
  <main className="relative">
      {/* First Section with BackgroundSplit */}
      <section className="h-screen relative overflow-hidden">
        <BackgroundSplit />
        <div className="relative z-10 h-full w-full">
          <Clock />
          <TimeScene />
          <IntroText />
        </div>
      </section>

      {/* Projects Section */}
      <ProjectsSection />
    </main>
  )
}