import Image from "next/image";
import Clock from "@/components/AboutSection/Clock";
import TimeScene from "@/components/AboutSection/TimeScene";
import BackgroundSplit from "@/components/AboutSection/BackgroundSplit";
import IntroText from "@/components/AboutSection/IntroText";
import ProjectsSection from "@/components/ProjectsSection/ProjectsSection";
import MobileThemeToggle from "@/components/AboutSection/MobileThemeToggle";
import ContactSection from "@/components/ContactSection/ContactSection";
import TerminalSection from "@/components/AboutMeSection/TerminalSection";

export default function Home() {
  return (
    <main className="relative">
      <MobileThemeToggle />
      {/* First Section with BackgroundSplit */}
      <section className="h-screen relative overflow-hidden">
        <BackgroundSplit />
        <div className="relative z-10 h-full w-full">
          {/* Hide clock and time scene on mobile */}
          <div className="hidden md:block">
            <Clock />
            <TimeScene />
          </div>
          {/* Always show intro text */}
          <IntroText />
        </div>
      </section>

      {/* Projects Section */}
      <TerminalSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}