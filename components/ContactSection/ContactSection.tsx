'use client';

import Image from 'next/image';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useClock } from '@/context/ClockContext';

export default function ContactSection() {
    const {timeOfDay} = useClock();

  return (
    <section className= {` ${(timeOfDay === "morning" || timeOfDay === "afternoon" ? "bg-teal-300" : "bg-[#774069]")} py-20 px-6 flex justify-center items-center min-h-screen relative overflow-hidden`} >
      {/* "Hey there!" Label */}
<h1
  className= {`absolute text-[clamp(2rem,6vw,5rem)] font-extrabold  z-30 left-[35vw] md:left-[35vw] ${timeOfDay === "morning" || timeOfDay === "afternoon" ? "text-black" : "text-white"}`}
  style={{
    top: '15.5vh',
    transform: 'translate(-50%, -50%)'
  }}
>
  Hey there!
</h1>

      <div className=   {`${(timeOfDay === "morning" || timeOfDay === "afternoon" ? "bg-white , text-gray-800" : "bg-black , text-white")} w-[75vw] h-[70vh] rounded-xl shadow-md flex flex-col md:flex-row items-center p-8 relative z-10`}  >
        
        {/* Left side: Text */}
        <div className="flex-1 text-center z-10">
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold  mb-4">
            I’m always up for a chat.
          </h2>
          <p className="mb-2 text-[clamp(1rem,2vw,1.25rem)] "> send me an email at {' '}
            <span className={`${timeOfDay === "morning" || timeOfDay === "afternoon" ? "decoration-teal-400" : "decoration-[#DD00A5]"} font-semibold underline underline-offset-2 `}>
              <a href="mailto:madhusudhana.s@northeastern.edu" className="">
               madhusudhana.s@northeastern.edu
            </a>
            </span>
          </p>
          <p className="text-[clamp(1rem,2vw,1.25rem)]  mb-4">
            or give me a shout on social media.
          </p>
          <div className="flex justify-center gap-4 text-[clamp(1.5rem,2.5vw,2rem)] ">
            <a href="https://github.com/SKANDHAN-MADHUSUDHANA" target='_blank'><FaGithub /></a>
            <a href="https://www.linkedin.com/in/skandhan-madhusudhana-75a82b193/" target='_blank'><FaLinkedin /></a>
          </div>
        </div>

        {/* Right side: Avatar tearing through */}
        <div className="flex-1 flex justify-center mt-2 md:mt-0 relative z-20">
          <div className="relative w-[60vw] h-[30vh] sm:w-[40vw] sm:h-[30vh] md:w-[30vw] md:h-[40vh]">
            <Image
              src={`${timeOfDay === "morning" || timeOfDay === "afternoon" ? "/morningTear.svg" : "/nightTear.svg"}`}
              alt="Avatar"
              fill
              className="object-contain drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
