import { Activity, Phone, ShoppingCart, User, Cpu, ShieldCheck, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { Logo } from "./Logo";

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
    { id: "booking", label: "Home Sampling" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white text-slate-900 border-b border-slate-200 shadow-sm font-sans">
      {/* Top Banner Alert (Operating details) */}
      <div className="bg-[#cf2027] text-white text-[11px] sm:text-[13px] py-1.5 font-mono font-bold tracking-tight border-b border-red-700 overflow-hidden relative select-none flex items-center">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes topTicker {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-33.333%, 0, 0); }
          }
          .custom-top-ticker {
            display: inline-flex;
            white-space: nowrap;
            animation: topTicker 30s linear infinite;
          }
          .custom-top-ticker:hover {
            animation-play-state: paused;
          }
        `}} />
        
        <div className="custom-top-ticker flex items-center gap-12 pr-12">
          {Array(3).fill(null).map((_, groupIdx) => (
            <div key={groupIdx} className="flex items-center gap-12 flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                <span>Lahore Lab Care Open 24/7 &bull; Quality Is Our Priority</span>
              </div>
              <span className="text-white/40">&bull;</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-white flex-shrink-0" />
                <span>ISO 9001 & Joint Commission Accredited</span>
              </div>
              <span className="text-white/40">&bull;</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-white flex-shrink-0" />
                <span>Lahore & Gujrat</span>
              </div>
              <span className="text-white/40">&bull;</span>
            </div>
          ))}
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
            <Logo variant="horizontal" iconSize={44} />
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
              href="https://wa.me/923036088497?text=Hello%20Lahore%20Medical%20Lab.%20I%20want%20to%20inquire%20about%20diagnostic%20tests%20and%20home%20sample%20collection."
              target="_blank"
              referrerPolicy="no-referrer"
              className="flex items-center gap-2 hover:bg-slate-100 p-2 rounded-lg text-slate-800 transition"
              title="Chat on WhatsApp"
              id="header-whatsapp-btn"
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#25D366]/10 border border-[#25D366]/25 shadow-xs">
                <svg className="w-4.5 h-4.5 text-[#25D366] fill-[#25D366]" viewBox="0 0 24 24">
                  <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.908.533 3.692 1.457 5.22L2 22l4.912-1.396A9.954 9.954 0 0012.004 22c5.52 0 10-4.48 10-10C22.004 6.48 17.524 2 12.004 2zm5.796 14.128c-.24.672-1.212 1.236-1.74 1.308-.48.06-1.08.084-2.88-.66-2.316-.948-3.792-3.288-3.912-3.444-.108-.156-.912-1.212-.912-2.316 0-1.104.576-1.644.78-1.86.204-.216.444-.264.588-.264h.42c.132 0 .312-.048.48.36.18.432.612 1.488.66 1.596.048.108.084.228 0 .42-.084.18-.18.288-.312.444-.132.156-.276.324-.396.444-.132.132-.276.276-.12.54.156.264.696 1.14 1.488 1.848.792.708 1.464.924 1.74 1.056.276.132.432.108.588-.072.156-.18.672-.78.852-1.044.18-.264.36-.216.612-.12.252.096 1.584.744 1.86.876.276.132.456.204.516.312.06.108.06.624-.18 1.296z" />
                </svg>
              </div>
              <div className="text-left font-mono sm:block hidden">
                <p className="text-[9px] text-[#25D366] font-extrabold leading-none uppercase">WhatsApp Live</p>
                <p className="text-xs font-black leading-tight text-slate-900">+92 303 6088497</p>
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
