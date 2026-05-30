import { Activity, Phone, ShoppingCart, User, Cpu, ShieldCheck, MapPin } from "lucide-react";
import { motion } from "motion/react";

interface HeaderProps {
  currentTab: string;
  setTab: (tab: string) => void;
  cartCount: number;
  openCart: () => void;
  loggedInPatient: any;
  onLogout: () => void;
  onLoginClick: () => void;
}

export function Header({
  currentTab,
  setTab,
  cartCount,
  openCart,
  loggedInPatient,
  onLogout,
  onLoginClick,
}: HeaderProps) {
  const tabs = [
    { id: "home", label: "Home" },
    { id: "tests", label: "Tests & Pricing" },
    { id: "advisor", label: "AI Diagnostic Advisor" },
    { id: "booking", label: "Home Sampling" },
    { id: "portal", label: "Patient Portal & Reports" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white text-slate-900 border-b border-slate-200 shadow-sm font-sans">
      {/* Top Banner Alert (Operating details) */}
      <div className="bg-[#cf2027] text-white text-[11px] sm:text-[13px] py-2 px-4 font-mono font-bold flex justify-between items-center tracking-tight border-b border-red-700">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
          <span>Lahore Lab Care Open 24/7 &bull; Quality Is Our Priority</span>
        </div>
        <div className="flex items-center gap-4 divide-x divide-white/20">
          <div className="flex items-center gap-1.5 pl-2">
            <ShieldCheck className="w-3.5 h-3.5 text-white" />
            <span className="hidden sm:inline">ISO 9001 & Joint Commission Accredited</span>
            <span className="sm:hidden">Accredited</span>
          </div>
          <div className="flex items-center gap-1 pl-2">
            <MapPin className="w-3.5 h-3.5 text-white" />
            <span>Lahore & Gujrat</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo Brand Representation of Lahore Lab */}
          <div
            onClick={() => setTab("home")}
            className="flex items-center gap-2.5 cursor-pointer select-none"
            id="brand-logo"
          >
            <div className="w-10 h-10 rounded-xl bg-[#cf2027] flex items-center justify-center shadow-md shadow-red-500/20 antialiased">
              <Activity className="w-5.5 h-5.5 text-white font-bold" />
            </div>
            <div>
              <h1 className="font-display font-black text-lg sm:text-xl tracking-tight leading-none text-slate-950 uppercase">
                LAHORE MEDICAL LAB
              </h1>
              <p className="text-[10px] text-[#cf2027] font-mono tracking-widest uppercase font-extrabold mt-0.5">
                &amp; Diagnostic Centre
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => setTab(tab.id)}
                className={`relative px-4 py-2.5 rounded-lg text-[14px] font-bold transition-all duration-300 ${
                  currentTab === tab.id
                    ? "text-[#cf2027] bg-red-50"
                    : "text-slate-800 hover:text-black hover:bg-slate-100"
                }`}
              >
                {tab.label}
                {tab.id === "advisor" && (
                  <span className="absolute -top-1.5 -right-1 bg-red-600 text-white text-[8px] font-mono font-extrabold uppercase px-1 rounded-sm flex items-center gap-0.5 shadow-sm">
                    <Cpu className="w-2 h-2" /> AI
                  </span>
                )}
                {currentTab === tab.id && (
                  <motion.div
                    layoutId="active-nav-indicator"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#cf2027]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2.5">
            {/* WhatsApp Support Button */}
            <a
              href="https://wa.me/923036088497?text=Hello%20Lahore%2520Medical%2520Lab.%20I%20want%2520to%20inquire%20about%2520diagnostic%2520tests."
              target="_blank"
              referrerPolicy="no-referrer"
              className="hidden sm:flex items-center gap-2 hover:bg-slate-100 p-2 rounded-lg text-slate-800 transition"
              title="Chat on WhatsApp"
              id="header-whatsapp-btn"
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#25D366]/10 border border-[#25D366]/25 shadow-xs">
                <svg className="w-4.5 h-4.5 text-[#25D366] fill-[#25D366]" viewBox="0 0 24 24">
                  <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.908.533 3.692 1.457 5.22L2 22l4.912-1.396A9.954 9.954 0 0012.004 22c5.52 0 10-4.48 10-10C22.004 6.48 17.524 2 12.004 2zm5.796 14.128c-.24.672-1.212 1.236-1.74 1.308-.48.06-1.08.084-2.88-.66-2.316-.948-3.792-3.288-3.912-3.444-.108-.156-.912-1.212-.912-2.316 0-1.104.576-1.644.78-1.86.204-.216.444-.264.588-.264h.42c.132 0 .312-.048.48.36.18.432.612 1.488.66 1.596.048.108.084.228 0 .42-.084.18-.18.288-.312.444-.132.156-.276.324-.396.444-.132.132-.276.276-.12.54.156.264.696 1.14 1.488 1.848.792.708 1.464.924 1.74 1.056.276.132.432.108.588-.072.156-.18.672-.78.852-1.044.18-.264.36-.216.612-.12.252.096 1.584.744 1.86.876.276.132.456.204.516.312.06.108.06.624-.18 1.296z" />
                </svg>
              </div>
              <div className="text-left font-mono">
                <p className="text-[9px] text-[#25D366] font-extrabold leading-none uppercase">WhatsApp Live</p>
                <p className="text-xs font-black leading-tight text-slate-900">+92 303 6088497</p>
              </div>
            </a>

            {/* Quick Consultation Emergency Line */}
            <a
              href="tel:+9242111522522"
              className="hidden md:flex items-center gap-2 hover:bg-slate-100 p-2 rounded-lg text-slate-800 transition"
              title="Call Helpline"
              id="header-uhelpline"
            >
              <div className="w-8 h-8 rounded-full bg-red-100 text-[#cf2027] flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <div className="text-left font-mono">
                <p className="text-[10px] text-slate-500 leading-none font-bold">HELPLINE</p>
                <p className="text-xs font-black leading-tight text-slate-950">042-111-522-522</p>
              </div>
            </a>

            {/* Cart Trigger */}
            <button
              id="header-cart-btn"
              onClick={openCart}
              className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 hover:text-black transition flex items-center justify-center cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-[#cf2027] text-white text-[10px] font-bold font-mono w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow">
                  {cartCount}
                </div>
              )}
            </button>

            {/* Patient Auth status */}
            {loggedInPatient ? (
              <div className="flex items-center gap-2" id="header-patient-info">
                <div className="hidden sm:block text-right">
                  <p className="text-xs font-medium text-slate-500">Logged In</p>
                  <p className="text-xs font-black text-[#cf2027] truncate max-w-[120px]">{loggedInPatient.name}</p>
                </div>
                <button
                  id="header-account-btn"
                  onClick={() => setTab("portal")}
                  className="w-10 h-10 rounded-xl bg-red-100 hover:bg-red-200/50 border border-red-500/30 text-red-600 flex items-center justify-center cursor-pointer font-bold relative"
                  title="Go to Patient Portal"
                >
                  <User className="w-5 h-5" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#cf2027] rounded-full border border-white"></span>
                </button>
              </div>
            ) : (
              <button
                id="header-login-btn"
                 onClick={onLoginClick}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#cf2027] hover:bg-red-600 text-white text-sm font-bold transition shadow-md shadow-red-500/10 cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Reports Portal</span>
                <span className="sm:hidden">Portal</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile quick-bar navigation under header */}
        <div className="lg:hidden flex items-center justify-between mt-3 px-1 border-t border-slate-100 pt-3">
          <div className="flex gap-1 overflow-x-auto no-scrollbar py-0.5 w-full">
            {tabs.map((tab) => (
              <button
                id={`tab-mobile-${tab.id}`}
                key={tab.id}
                onClick={() => setTab(tab.id)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
                  currentTab === tab.id
                    ? "bg-[#cf2027] text-white font-extrabold shadow-md"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
