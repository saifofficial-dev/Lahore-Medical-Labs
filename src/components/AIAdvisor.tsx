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
      .replace(/### (.*?)\n/g, '<h4 class="text-xs font-black text-[#cf2027] font-mono tracking-wider space-y-1 block mt-3 uppercase">$1</h4>') // sub headers
      .replace(/-\s(.*?)\n/g, '<li class="list-disc list-inside text-slate-800 ml-2 mt-1 font-medium">$1</li>') // list
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
              <span className="px-3.5 py-1.5 rounded-full bg-red-100 text-[#cf2027] text-xs font-mono font-black tracking-wide uppercase flex items-center gap-1.5 w-fit">
                <Cpu className="w-3.5 h-3.5 animate-spin" />
                <span>Gemini Health Diagnostics Integration</span>
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 tracking-tight leading-tight mt-3">
                Smart Symptom-to-Test Guidance
              </h2>
              <p className="text-slate-650 text-slate-600 text-xs sm:text-sm leading-relaxed mt-4 font-semibold">
                Describe your daily physiological symptoms or query testing guidelines. Our AI engine mapping, structured in accordance with clinical pathology rules of Lahore Medical Lab &amp; Diagnostic Centre, clarifies your needs.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3.5">
              <h3 className="text-xs font-black uppercase text-slate-900 tracking-wide flex items-center gap-1.5">
                <Stethoscope className="w-4 h-4 text-[#cf2027]" />
                <span>Common Diagnostics Guidelines</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-1.5 leading-relaxed font-semibold">
                  <span className="text-[#cf2027] font-bold mt-0.5">&bull;</span>
                  <span><strong>Fasting Panels</strong>: Lipid and Fasting Glucose require strict 10-12 hours fasting. Heavy dinner fat triggers hyperlipidemia results.</span>
                </li>
                <li className="flex items-start gap-1.5 leading-relaxed font-semibold">
                  <span className="text-[#cf2027] font-bold mt-0.5">&bull;</span>
                  <span><strong>Hormones Rhythms</strong>: Cortisol, TSH, and Testosterone fluctuate. Sunrise sampling yields baseline records.</span>
                </li>
                <li className="flex items-start gap-1.5 leading-relaxed font-semibold">
                  <span className="text-[#cf2027] font-bold mt-0.5">&bull;</span>
                  <span><strong>Hydration Importance</strong>: Drink lots of plain water prior to drawing, helping phlebotomists map veins smoothly.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 text-slate-900 p-4.5 rounded-2xl mt-6 lg:mt-0">
            <h4 className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider font-extrabold text-[#cf2027] uppercase">
              <ShieldAlert className="w-4 h-4 text-[#cf2027]" />
              <span>Diagnostic Disclaimer</span>
            </h4>
            <p className="text-[10px] leading-relaxed font-bold mt-2 text-slate-700 normal-case">
              *The recommendations computed by the Advisor are mapped exclusively as informative health vectors. Final physiological validation, test interpretation, and prescriptions must be evaluated by a certified physician (MBBS / FCPS Pathology Specality).*
            </p>
          </div>
        </div>

        {/* Right Side: Smart Interactive Chatbox */}
        <div className="lg:col-span-8 flex flex-col h-[520px] bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden relative">
          
          {/* Box Header */}
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center font-bold text-[#cf2027] border border-red-200">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-mono text-[#cf2027] font-black block uppercase leading-none">Lahore Lab AI Advisor</h4>
                <span className="text-[11px] text-slate-500 mt-1 block font-medium">Powered by Gemini AI Engine</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1 bg-red-50 px-2.5 py-1 rounded border border-red-500/20">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
              <span className="text-[9px] text-[#cf2027] font-mono font-black tracking-widest uppercase">System Online</span>
            </div>
          </div>

          {/* Quick recommendations triggers */}
          <div className="bg-slate-50/70 px-6 py-3 border-b border-slate-200 overflow-x-auto flex gap-2 no-scrollbar print:hidden flex-shrink-0">
            <span className="text-[10px] text-slate-600 font-mono font-extrabold uppercase mt-1 flex-shrink-0">Triggers:</span>
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p.text)}
                id={`ai-trigger-${idx}`}
                className="flex-shrink-0 bg-white text-slate-700 hover:text-[#cf2027] hover:bg-red-50/50 font-mono px-3 py-1 rounded-full text-[10px] tracking-wide transition border border-slate-250 border-slate-200 cursor-pointer font-bold"
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
                        ? "bg-slate-100 text-[#cf2027] border border-slate-200"
                        : "bg-[#cf2027] text-white"
                    }`}
                  >
                    {isModel ? "AI" : "Me"}
                  </div>
                  
                  <div
                    className={`p-4 rounded-2xl leading-relaxed text-sm ${
                      isModel
                        ? "bg-slate-50 border border-slate-200 text-slate-900"
                        : "bg-[#cf2027] text-white font-heavy font-black"
                    }`}
                  >
                    {isModel ? formatMarkdownText(m.text) : <p className="text-xs sm:text-[13px] font-bold">{m.text}</p>}
                  </div>
                </div>
              );
            })}

            {/* Waiting loader bubble */}
            {isLoading && (
              <div className="flex items-start gap-2.5 max-w-[85%] mr-auto" id="advisor-chat-loading">
                <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 text-[#cf2027] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-1 animate-spin">
                  <LoaderPinwheel className="w-4 h-4 animate-spin" />
                </div>
                <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-650 bg-red-600 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-red-650 bg-red-600 animate-bounce delay-100"></span>
                  <span className="w-2 h-2 rounded-full bg-red-650 bg-red-600 animate-bounce delay-200"></span>
                  <p className="text-[10px] font-mono text-slate-500 ml-1 block font-bold">Consolidating healthcare mapping pathways...</p>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          {/* Form input controls */}
          <form
            onSubmit={handleFormSubmit}
            className="bg-slate-50 border-t border-slate-200 p-4.5 flex gap-2"
          >
            <input
              type="text"
              placeholder="Describe symptoms, query fasting preps, or ask about specific medical tests..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="bg-white border border-slate-300 text-slate-900 rounded-2xl px-4 py-3 text-xs sm:text-sm focus:ring-2 focus:ring-[#cf2027]/10 focus:border-[#cf2027] focus:outline-none flex-grow placeholder-slate-450 placeholder-slate-400 font-medium"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-[#cf2027] hover:bg-red-600 text-white font-bold p-3.5 rounded-2xl transition shadow-md shadow-red-500/10 cursor-pointer flex-shrink-0 disabled:opacity-50"
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
