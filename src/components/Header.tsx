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
    <header className="sticky top-0 z-50 bg-[#0c2340] text-white shadow-md font-sans">
      {/* Top Banner Alert (Operating details) */}
      <div className="bg-[#cf2027] text-slate-100 text-[11px] sm:text-[13px] py-1.5 px-4 font-mono font-medium flex justify-between items-center tracking-tight border-b border-red-700">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-slate-100 animate-pulse"></span>
          <span>Lahore Lab Care Open 24/7 &bull; Quality Is Our Priority</span>
        </div>
        <div className="flex items-center gap-4 divide-x divide-white/20">
          <div className="flex items-center gap-1.5 pl-2">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-100" />
            <span className="hidden sm:inline">ISO 9001 & Joint Commission Accredited</span>
            <span className="sm:hidden">Accredited</span>
          </div>
          <div className="flex items-center gap-1 pl-2">
            <MapPin className="w-3.5 h-3.5 text-slate-100" />
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
              <h1 className="font-display font-bold text-lg sm:text-xl tracking-tight leading-none text-slate-100">
                LAHORE MEDICAL LAB
              </h1>
              <p className="text-[10px] text-sky-400 font-mono tracking-widest uppercase font-semibold">
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
                className={`relative px-4 py-2.5 rounded-lg text-[14px] font-medium transition-all duration-300 ${
                  currentTab === tab.id
                    ? "text-[#cf2027] font-semibold"
                    : "text-slate-300 hover:text-slate-100 hover:bg-slate-800/40"
                }`}
              >
                {tab.label}
                {tab.id === "advisor" && (
                  <span className="absolute -top-1.5 -right-1 bg-sky-500 text-slate-950 text-[8px] font-mono font-extrabold uppercase px-1 rounded-sm flex items-center gap-0.5 shadow-sm">
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
            {/* Quick Consultation Emergency Line */}
            <a
              href="tel:+9242111522522"
              className="hidden md:flex items-center gap-2 hover:bg-slate-800/40 p-2 rounded-lg text-slate-300 transition"
              title="Call Helpline"
              id="header-uhelpline"
            >
              <div className="w-8 h-8 rounded-full bg-slate-850 text-sky-400 flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <div className="text-left font-mono">
                <p className="text-[10px] text-slate-400 leading-none">HELPLINE</p>
                <p className="text-xs font-bold font-medium leading-tight text-sky-450 text-sky-405">042-111-522-522</p>
              </div>
            </a>

            {/* Cart Trigger */}
            <button
              id="header-cart-btn"
              onClick={openCart}
              className="relative p-2.5 rounded-xl bg-slate-805 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition shadow-inner flex items-center justify-center cursor-pointer"
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
                  <p className="text-xs font-medium text-slate-300">Logged In</p>
                  <p className="text-xs font-bold text-sky-450 text-sky-400 truncate max-w-[120px]">{loggedInPatient.name}</p>
                </div>
                <button
                  id="header-account-btn"
                  onClick={() => setTab("portal")}
                  className="w-10 h-10 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-450 text-sky-400 flex items-center justify-center cursor-pointer font-bold relative"
                  title="Go to Patient Portal"
                >
                  <User className="w-5 h-5" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#cf2027] rounded-full border border-slate-900"></span>
                </button>
              </div>
            ) : (
              <button
                id="header-login-btn"
                onClick={onLoginClick}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#cf2027] hover:bg-red-600 text-white text-sm font-semibold transition shadow-md shadow-red-500/10 cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Reports Portal</span>
                <span className="sm:hidden">Portal</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile quick-bar navigation under header */}
        <div className="lg:hidden flex items-center justify-between mt-3 px-1 border-t border-slate-800 pt-3">
          <div className="flex gap-1 overflow-x-auto no-scrollbar py-0.5 w-full">
            {tabs.map((tab) => (
              <button
                id={`tab-mobile-${tab.id}`}
                key={tab.id}
                onClick={() => setTab(tab.id)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition ${
                  currentTab === tab.id
                    ? "bg-[#cf2027] text-white font-bold shadow-md shadow-red-500/10"
                    : "text-slate-400 hover:text-slate-200"
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
