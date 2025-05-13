import Image from "next/image";
import Clock from "@/components/Clock";

export default function Home(){
  return(
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-white dark:bg-black">
      <Clock />
    </main>

  )
}