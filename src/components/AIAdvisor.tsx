import { useState, useRef, useEffect, FormEvent } from "react";
import { Send, Cpu, Sparkles, Stethoscope, MessageSquareCode, ArrowRight, ShieldAlert, LoaderPinwheel } from "lucide-react";
import { ChatMessage } from "../types";

export function AIAdvisor() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      text: "Assalamualaikum! I am the **AI Diagnostics Planner** representing Lahore Medical Lab.\n\nDescribe any fatigue, physical symptoms, or dietary questions you have. I will analyze them to map which **specific blood tests** or **preventative panels** align with clinical practices. \n\n*Note: Our recommended dispatches include Free Home Phlebotomy Sampling anywhere in Lahore and Gujrat!*",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll chat bubbles to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Handle message send
  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: "user", text: textToSend };
    const updatedMessages = [...messages, userMsg];
    
    setMessages(updatedMessages);
    setUserInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/gemini/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const body = await response.json();
      if (body.success) {
        setMessages((prev) => [...prev, { role: "model", text: body.text }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            text: `Critical: We encountered a processing error: "${body.message}". Please select diagnostic tests directly inside our Pricing Catalog list.`,
          },
        ]);
      }
    } catch (e: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: `Connection Timeout: Unable to contact our diagnostic server pipeline. Please check your network and query again.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSendMessage(userInput);
  };

  const quickPrompts = [
    {
      label: "Thyroid & Fatigue symptoms",
      text: "I feel tired all the time, sensitive to cold, experiencing dry skin, and mild unexplained weight gain. What tests should I request?",
    },
    {
      label: "Frequent Urination & Thirst rules",
      text: "I am having extreme thirst, dry mouth, frequent urination at night, and persistent headaches. Which glucose profiles are best?",
    },
    {
      label: "Lipid Profile Fasting rules",
      text: "Explain the precise fasting rules for a Lipid Cholesterol panel. Can I drink tea or green-tea in the morning of the sample collection?",
    },
    {
      label: "Seasonal Dengue & Fever screens",
      text: "I have high-grade fever with sever headache and joint pain behind my eyes of 3 days. What lab panel screens dengue versus typhoid?",
    }
  ];

  // Markdown rendering simulation inside bubbles (bold lines, bullets render nicely)
  const formatMarkdownText = (raw: string) => {
    // Simple regex replacements for clean readability
    let html = raw
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // italic
      .replace(/### (.*?)\n/g, '<h4 class="text-xs font-bold text-slate-100 font-mono tracking-wider space-y-1 block mt-3 uppercase">$1</h4>') // sub headers
      .replace(/-\s(.*?)\n/g, '<li class="list-disc list-inside text-slate-300 ml-2 mt-1">$1</li>') // list
      .replace(/\n/g, '<br/>'); // break lines
    
    return <div className="space-y-1 text-xs sm:text-[13px] leading-relaxed select-text" dangerouslySetInnerHTML={{ __html: html }} />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans" id="ai-advisor-dashboard">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Medical instructions panel */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <div className="space-y-6 text-left">
            <div>
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-mono font-bold tracking-wide uppercase flex items-center gap-1.5 w-fit">
                <Cpu className="w-3.5 h-3.5 animate-spin" />
                <span>Gemini Health Diagnostics Integration</span>
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 tracking-tight leading-tight mt-3">
                Smart Symptom-to-Test Guidance
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mt-4">
                Describe your daily physiological symptoms or query testing guidelines. Our AI engine mapping, structured in accordance with clinical pathology rules of Lahore Medical Lab &amp; Diagnostic Centre, clarifies your needs.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3.5">
              <h3 className="text-xs font-extrabold uppercase text-slate-800 tracking-wide flex items-center gap-1.5">
                <Stethoscope className="w-4 h-4 text-emerald-500" />
                <span>Common Diagnostics Guidelines</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-1.5 leading-relaxed">
                  <span className="text-emerald-500 font-bold mt-0.5">&bull;</span>
                  <span><strong>Fasting Panels</strong>: Lipid and Fasting Glucose require strict 10-12 hours fasting. Heavy dinner fat triggers hyperlipidemia results.</span>
                </li>
                <li className="flex items-start gap-1.5 leading-relaxed">
                  <span className="text-emerald-500 font-bold mt-0.5">&bull;</span>
                  <span><strong>Hormones Rhythms</strong>: Cortisol, TSH, and Testosterone fluctuate. Sunrise sampling yields baseline records.</span>
                </li>
                <li className="flex items-start gap-1.5 leading-relaxed">
                  <span className="text-emerald-500 font-bold mt-0.5">&bull;</span>
                  <span><strong>Hydration Importance</strong>: Drink lots of plain water prior to drawing, helping phlebotomists map veins smoothly.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 text-slate-350 p-4.5 rounded-2xl mt-6 lg:mt-0">
            <h4 className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider font-extrabold text-emerald-400 uppercase">
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
              <span>Diagnostic Disclaimer</span>
            </h4>
            <p className="text-[10px] leading-relaxed font-normal mt-2 text-slate-400 lowercase normal-case">
              *The recommendations computed by the Advisor are meant and intended exclusively as informative health mappings. Final physiological validation, test interpretation, and prescriptions must be evaluated by a certified physician (MBBS / FCPS Speciality).*
            </p>
          </div>
        </div>

        {/* Right Side: Smart Interactive Chatbox */}
        <div className="lg:col-span-8 flex flex-col h-[520px] bg-slate-950 border border-slate-900 rounded-3xl shadow-2xl overflow-hidden relative">
          
          {/* Box Header */}
          <div className="bg-slate-900 border-b border-slate-850 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center font-bold text-slate-950">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-mono text-emerald-400 font-bold block uppercase leading-none">Lahore Lab Advisor</h4>
                <span className="text-[11px] text-slate-400 mt-1 block">Powered by Gemini AI Engine</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/15">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-[9px] text-emerald-400 font-mono font-bold tracking-widest uppercase">System Online</span>
            </div>
          </div>

          {/* Quick recommendations triggers */}
          <div className="bg-slate-900/60 px-6 py-3 border-b border-slate-850 overflow-x-auto flex gap-2 no-scrollbar print:hidden flex-shrink-0">
            <span className="text-[10px] text-slate-500 font-mono font-bold uppercase mt-1 flex-shrink-0">Triggers:</span>
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p.text)}
                id={`ai-trigger-${idx}`}
                className="flex-shrink-0 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-750 font-mono px-3 py-1 rounded-full text-[10px] tracking-wide transition border border-slate-700/60 cursor-pointer"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Chat bubbles list area */}
          <div className="flex-grow p-6 overflow-y-auto space-y-4 text-left font-sans">
            {messages.map((m, id) => {
              const isModel = m.role === "model";
              return (
                <div
                  key={id}
                  className={`flex items-start gap-2.5 max-w-[85%] ${
                    isModel ? "mr-auto" : "ml-auto flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg text-xs font-extrabold flex items-center justify-center flex-shrink-0 mt-1 uppercase ${
                      isModel
                        ? "bg-slate-800 text-emerald-400 border border-slate-700"
                        : "bg-emerald-500 text-slate-950 font-black"
                    }`}
                  >
                    {isModel ? "AI" : "Me"}
                  </div>
                  
                  <div
                    className={`p-4 rounded-2xl leading-relaxed text-sm ${
                      isModel
                        ? "bg-slate-900 border border-slate-800 text-slate-100"
                        : "bg-emerald-500 text-slate-950 font-medium font-semibold"
                    }`}
                  >
                    {isModel ? formatMarkdownText(m.text) : <p className="text-xs sm:text-[13px]">{m.text}</p>}
                  </div>
                </div>
              );
            })}

            {/* Waiting loader bubble */}
            {isLoading && (
              <div className="flex items-start gap-2.5 max-w-[85%] mr-auto" id="advisor-chat-loading">
                <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 text-emerald-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-1 animate-spin">
                  <LoaderPinwheel className="w-4 h-4 animate-spin" />
                </div>
                <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce delay-100"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce delay-200"></span>
                  <p className="text-[10px] font-mono text-slate-400 ml-1 block">Consolidating healthcare mapping pathways...</p>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          {/* Form input controls */}
          <form
            onSubmit={handleFormSubmit}
            className="bg-slate-900 border-t border-slate-850 p-4.5 flex gap-2"
          >
            <input
              type="text"
              placeholder="Describe symptoms, query fasting preps, or ask about specific medical tests..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="bg-slate-950/60 border border-slate-700 text-white rounded-2xl px-4 py-3 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none flex-grow"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold p-3.5 rounded-2xl transition shadow-md shadow-emerald-500/10 cursor-pointer flex-shrink-0 disabled:opacity-50"
              disabled={isLoading || !userInput.trim()}
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}
