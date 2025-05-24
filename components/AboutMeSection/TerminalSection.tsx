"use client";

import { useState, useEffect, useRef } from "react";
import { useClock } from "@/context/ClockContext";

const commandResponses: Record<string, string> = {
  aboutme: `Hey, I'm Skandhan — a full-stack developer who loves building websites that don't just work, but *feel* right. I'm passionate about writing clean, maintainable code and crafting interfaces that blend design and functionality with intention. Lately, I'm diving into AI and ML to bridge the gap between intelligent systems and intuitive experiences. When I'm not coding, you'll find me exercising, exploring music through new instruments, or sketching out the next side project.

  **Type 'cd skills' to explore my stack.**`,

  education: "B.S. in Computer Science from University XYZ. 2020–2024. Learned lots, broke some things, fixed more.",
  experience: `🛠 Experience:

- Software Engineer @  (Summer 2024)
  Built animated components using React and Tailwind
  Improved page performance by 32% with code splitting and memoization

- Freelance Web Developer (2022–Present)
  Delivered custom portfolio sites and dashboards for 10+ clients
  Designed UI/UX and implemented responsive, accessible layouts

Want the full résumé? Just ask 😉`,
  skills: `💡 Tech Stack:
  Languages: - Java, C, C++, Python, JavaScript, TypeScript, Python.
  Frontend: -HTML, CSS, React, Next.js, Tailwind CSS, GSAP, Figma.
  Backend: - SpringBoot, Node.js, MongoDB, MySQL.
  Tools: - Git, GitHub, JIRA, Docker, Kubernates, Postman, Vercel.
  Bonus: - Quick with Chrome DevTools and bad puns 😄`,

  help: "Available commands: cd aboutme, cd education, cd experience, cd skills, clear",
  welcome: "Welcome to my interactive terminal! Type commands to learn more about me."
};

export default function TerminalSection() {
  const {timeOfDay} = useClock();
  const [history, setHistory] = useState<string[]>([
    `<span class="text-purple-400">skandhan@mac ~ %</span> <span class="text-yellow-300">cd aboutme</span>`,
    commandResponses.aboutme,
    `<span class="text-purple-400">skandhan@mac ~ %</span> <span class="text-yellow-300">cd skills</span>`,
    commandResponses.skills,
    `<span class="text-purple-400">skandhan@mac ~ %</span> <span class="text-yellow-300">cd help</span>`,
    commandResponses.help
  ]);
  const [input, setInput] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cursor blink effect (only when not typing)
  useEffect(() => {
    if (isTyping) {
      setShowCursor(true);
      return;
    }
    
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, [isTyping]);

  // Auto-scroll and focus
  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
    inputRef.current?.focus();
  }, [history]);

  const handleCommand = (command: string) => {
    const clean = command.trim().toLowerCase();
    if (!clean) return;

    if (clean === "clear") {
      setHistory([]);
    } else if (clean.startsWith("cd ")) {
      const path = clean.replace("cd ", "");
      const response = commandResponses[path] || `Command not found: ${path}`;
      setHistory(prev => [
        ...prev,
        `<span class="text-purple-400">skandhan@mac ~ %</span> <span class="text-yellow-300">${command}</span>`,
        response
      ]);
    } else {
      setHistory(prev => [
        ...prev,
        `<span class="text-purple-400">skandhan@mac ~ %</span> <span class="text-yellow-300">${command}</span>`,
        `Type "cd help" for available commands`
      ]);
    }
    
    setInput("");
    setIsTyping(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setIsTyping(true);
    // Reset typing timeout on each keystroke
    clearTimeout((window as any).typingTimeout);
    (window as any).typingTimeout = setTimeout(() => setIsTyping(false), 1000);
  };

  return (
    <section className={`w-full min-h-screen flex flex-col items-center py-12 px-4 ${timeOfDay=== "morning" || timeOfDay === "afternoon" ? "bg-[#FFEE91]"  : "bg-[#b59d00]" }  transition-colors duration-500`}>      
      <h1 className="text-4xl font-bold text-black mb-8 font-mono"
        style={{
          fontSize: "clamp(1rem, 5vw, 4rem)",
          fontWeight: 900,
          marginBottom: "5vh",
        }}
      >
        AboutMe.
      </h1>
      
      <div className="bg-[#1e1e1e] rounded-lg shadow-2xl overflow-hidden font-mono h-[65vh] min-h-[400px] w-[60vw]">
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#2d2d2d] border-b border-gray-700">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>

        {/* Terminal content */}
        <div
          ref={terminalRef}
          className="p-4 md:p-6 text-gray-200 space-y-3 overflow-y-auto h-[calc(100%-3.5rem)] text-base md:text-lg leading-relaxed"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#4a4a4a #2d2d2d',
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              width: 8px;
            }
            div::-webkit-scrollbar-track {
              background: #2d2d2d;
            }
            div::-webkit-scrollbar-thumb {
              background-color: #4a4a4a;
              border-radius: 4px;
              border: 2px solid #2d2d2d;
            }
            div::-webkit-scrollbar-thumb:hover {
              background-color: #5a5a5a;
            }
          `}</style>
          
          {history.map((line, i) => (
            <div
              key={i}
              className="whitespace-pre-wrap font-mono break-words"
              dangerouslySetInnerHTML={{ __html: line }}
            />
          ))}

          <div className="flex items-center">
            <span className="text-purple-400">skandhan@mac ~ %</span>
            <div className="flex items-center ml-2 flex-1">
              {input === "" && (
                <span 
                  className={`h-5 w-2 bg-yellow-300 ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
                />
              )}
              <input
                ref={inputRef}
                className="bg-transparent outline-none w-full text-gray-200 yellow-300"
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={(e) => e.key === "Enter" && handleCommand(input)}
                spellCheck="false"
                autoFocus
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}