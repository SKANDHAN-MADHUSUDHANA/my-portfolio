"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useClock } from "@/context/ClockContext";

const commandResponses: Record<string, string> = {
  aboutme: `Hey, I'm Skandhan — a full-stack developer who loves building websites that don't just work, but *feel* right. I'm passionate about writing clean, maintainable code and crafting interfaces that blend design and functionality with intention. Lately, I'm diving into AI and ML to bridge the gap between intelligent systems and intuitive experiences. When I'm not coding, you'll find me exercising, exploring music through new instruments, or sketching out the next side project.

  **Type 'cd skills' to explore my stack.**`,

  education: `🎓 Education:

- **Northeastern University**, Boston, MA  
  MS in Computer Science — GPA: 4.0  
  Relevant Coursework: Program Design Paradigm, Database Management

- **Vidyavardhaka College of Engineering**, Mysore, India  
  BE in Computer Science  
  Relevant Coursework: Data Structures and Algorithms, Web Development, OOP, Database Systems`,

  experience: `🧠 Experience:

- **Associate Software Engineer**, LNW India Solutions — Bengaluru, India  
  (Sep 2023 – Dec 2024)  
  • Progressed from backend to full-stack development  
  • Built enterprise apps using Angular, React, Java, Spring Boot  
  • Fixed 200+ SonarQube issues & increased test coverage from 30% to 80%  
  • Collaborated closely with product & QA in 'Three Amigos' agile sessions

- **Java Full Stack Developer Intern**, LNW India Solutions  
  (Feb 2023 – Jul 2023)  
  • Built full-stack web apps with Angular, Java, Spring Boot  
  • Designed scalable architecture and maintained modularity

- **Frontend Intern**, CoachEd  
  (Sep 2022 – Oct 2022)  
  • Created a Restaurant Reservation System using ReactJS, HTML, CSS, JS

 <span class="text-blue-400" )">Want the full résumé? Just type cd resume 😉</span>`,


  skills: `💡 Tech Stack:
  Languages: - Java, C, C++, Python, JavaScript, TypeScript, Python.
  Frontend: -HTML, CSS, React, Next.js, Tailwind CSS, GSAP, Figma.
  Backend: - SpringBoot, Node.js, MongoDB, MySQL.
  Tools: - Git, GitHub, JIRA, Docker, Kubernates, Postman, Vercel.`,

  help: "Available commands: cd aboutme, cd education, cd experience, cd skills, cd resume, help, clear",

};

const availableCommands = ['aboutme', 'education', 'experience', 'skills', 'resume', 'help', 'clear'];

export default function TerminalSection() {
  const { timeOfDay } = useClock();
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
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isTypingResponse, setIsTypingResponse] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [terminalSize, setTerminalSize] = useState({ width: "60vw", height: "65vh" });

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
  }, [history, isTypingResponse]);

  // Command autocomplete
  useEffect(() => {
    if (input.startsWith("cd ")) {
      const partial = input.replace("cd ", "").trim();
      if (partial) {
        const matches = availableCommands.filter(cmd => 
          cmd.startsWith(partial.toLowerCase())
        );
        setSuggestions(matches);
        setShowSuggestions(matches.length > 0);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [input]);

  // Handle typing animation for responses
  const typeResponse = useCallback((text: string) => {
    setIsTypingResponse(true);
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setHistory(prev => {
          const lastItem = prev[prev.length - 1];
          if (typeof lastItem === 'string' && lastItem.startsWith('<')) {
            return [...prev.slice(0, -1), lastItem + text.charAt(i)];
          }
          return [...prev.slice(0, -1), text.substring(0, i + 1)];
        });
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTypingResponse(false);
      }
    }, 5); // Adjust typing speed here

    return () => clearInterval(typingInterval);
  }, []);

  const handleCommand = (command: string) => {
    const clean = command.trim().toLowerCase();
    if (!clean) return;

    // Add to command history if not empty and not duplicate of last command
    setCommandHistory(prev => {
      if (prev.length === 0 || prev[prev.length - 1] !== clean) {
        return [...prev, clean];
      }
      return prev;
    });
    setHistoryIndex(-1);

    if (clean === "clear") {
      setHistory([]);
    } else if (clean === "cd resume") {
  window.open("/Skandhan_Madhusudhana_Resume.pdf", "_blank");
  setHistory(prev => [
    ...prev,
    `<span class="text-purple-400">skandhan@mac ~ %</span> <span class="text-yellow-300">${command}</span>`,
    `📄 Opening résumé...`
  ]);
}   
    else if (clean.startsWith("cd ")) {
      const path = clean.replace("cd ", "");
      const response = commandResponses[path] || `Command not found: ${path}`;
      setHistory(prev => [
        ...prev,
        `<span class="text-purple-400">skandhan@mac ~ %</span> <span class="text-yellow-300">${command}</span>`,
        "" // Start with empty string for typing animation
      ]);
      // Start typing animation
      setTimeout(() => typeResponse(response), 100);
    } else {
      setHistory(prev => [
        ...prev,
        `<span class="text-purple-400">skandhan@mac ~ %</span> <span class="text-yellow-300">${command}</span>`,
        `Type "cd help" for available commands`
      ]);
    }
    
    setInput("");
    setIsTyping(false);
    setShowSuggestions(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setIsTyping(true);
    // Reset typing timeout on each keystroke
    clearTimeout((window as any).typingTimeout);
    (window as any).typingTimeout = setTimeout(() => setIsTyping(false), 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Command history navigation
    if (e.key === "ArrowUp" && commandHistory.length > 0) {
      e.preventDefault();
      const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : commandHistory.length - 1;
      setHistoryIndex(newIndex);
      setInput(`${commandHistory[commandHistory.length - 1 - newIndex]}`);
    } else if (e.key === "ArrowDown" && commandHistory.length > 0) {
      e.preventDefault();
      const newIndex = historyIndex > 0 ? historyIndex - 1 : -1;
      setHistoryIndex(newIndex);
      setInput(newIndex === -1 ? "" : `cd ${commandHistory[commandHistory.length - 1 - newIndex]}`);
    }
    // Tab completion
    else if (e.key === "Tab" && suggestions.length > 0) {
      e.preventDefault();
      setInput(`cd ${suggestions[0]}`);
      setShowSuggestions(false);
    }
    // Enter to submit command
    else if (e.key === "Enter") {
      handleCommand(input);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(`cd ${suggestion}`);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const toggleSize = () => {
    setTerminalSize(prev =>
      prev.width === "60vw" && prev.height === "65vh"
        ? { width: "100vw", height: "100vh" }
        : { width: "60vw", height: "65vh" }
    );
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
      
      <div className="bg-[#1e1e1e] rounded-lg shadow-2xl overflow-hidden font-mono" style={{ width: terminalSize.width, height: terminalSize.height }}>
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#2d2d2d] border-b border-gray-700">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-500" onClick={toggleSize}></div>
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
            <div className="flex items-center ml-2 flex-1 relative">
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
                onKeyDown={handleKeyDown}
                spellCheck="false"
                autoFocus
              />
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute left-0 top-full mt-1 w-full bg-[#2d2d2d] border border-gray-700 rounded-md z-10">
                  {suggestions.map((suggestion, i) => (
                    <div
                      key={i}
                      className="px-3 py-1 hover:bg-[#3d3d3d] cursor-pointer"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      cd {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}