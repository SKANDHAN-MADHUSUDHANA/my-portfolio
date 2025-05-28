import Image from "next/image";
import Clock from "@/components/AboutSection/Clock";
import TimeScene from "@/components/AboutSection/TimeScene";
import BackgroundSplit from "@/components/AboutSection/BackgroundSplit";
import IntroText from "@/components/AboutSection/IntroText";
import ProjectsSection from "@/components/ProjectsSection/ProjectsSection";
import MobileThemeToggle from "@/components/AboutSection/MobileThemeToggle";
import ContactSection from "@/components/ContactSection/ContactSection";
import TerminalSection from "@/components/AboutMeSection/TerminalSection";
import NavigationBar from "@/components/AboutSection/NavigationBar";

export default function Home() {
   return (
    <main className="relative">
      <MobileThemeToggle />
      <NavigationBar />
      
      {/* Hero Section (First Section) */}
      <section id="home" className="h-screen relative overflow-hidden">
        <BackgroundSplit />
        <div className="relative z-10 h-full w-full">
          <div className="hidden md:block">
            <Clock />
            <TimeScene />
          </div>
          <IntroText />
        </div>
      </section>

      {/* About Me (Terminal) Section */}
      <section id="about">
        <TerminalSection />
      </section>

      {/* Projects Section */}
      <section id="projects">
        <ProjectsSection />
      </section>

      {/* Contact Section */}
      <section id="contact">
        <ContactSection />
      </section>
    </main>
  );
}