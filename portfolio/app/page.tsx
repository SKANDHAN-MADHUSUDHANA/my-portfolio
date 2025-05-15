import Image from "next/image";
import Clock from "@/components/Clock";
import TimeScene from "@/components/TimeScene";
import BackgroundSplit from "@/components/BackgroundSplit";
import IntroText from "@/components/IntroText";

export default function Home(){
  return(
    <BackgroundSplit>
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <Clock />
      <TimeScene />
      <IntroText />
    </main>
    </BackgroundSplit>
  )
}