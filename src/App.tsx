import { useState, useMemo, useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { PatientPortal } from "./components/PatientPortal";
import { TestFinder } from "./components/TestFinder";
import { HomeSampling } from "./components/HomeSampling";
import { ReportViewer } from "./components/ReportViewer";
import { LAB_TESTS, HEALTH_PACKAGES, LAHORE_BRANCHES } from "./data";
import { PatientProfile, ClinicalReport } from "./types";
import { 
  Building, 
  MapPin, 
  Phone, 
  Clock, 
  Activity, 
  Search, 
  Cpu, 
  Truck, 
  ShieldCheck, 
  Award, 
  ExternalLink, 
  Heart,
  Calendar,
  Layers,
  ArrowRight,
  ShoppingCart,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1579154223746-805c31766a3e?auto=format&fit=crop&w=1200&q=80",
    badge: "Main Pathology Lab",
    title: "Central Molecular Diagnostics Suite",
    description: "Equipped with advanced multi-tier automated clinical analyzers and liquid assays running 24/7.",
  },
  {
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
    badge: "Clinical Chemistry",
    title: "Automated Immunoassay Systems",
    description: "Providing automated analysis for specialized thyroid modules, hormonal panels, and clinical chemistry.",
  },
  {
    image: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&w=1200&q=80",
    badge: "Doorstep Sampling",
    title: "Sterile Home Specimen Extraction",
    description: "Clinical phlebotomists dispatched on-demand with active temperature-controlled cold-chain guards.",
  },
  {
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    badge: "Accredited Outcomes",
    title: "ISO 9001:2015 Verified Labs",
    description: "Every diagnostic parameter is verified and cross-checked against rigid laboratory controls.",
  }
];

export default function App() {
  // Navigation & States
  const [tab, setTab] = useState<string>("home");
  const [cartedTests, setCartedTests] = useState<string[]>([]);
  const [cartedPackages, setCartedPackages] = useState<string[]>([]);
  const [loggedInPatient, setLoggedInPatient] = useState<PatientProfile | null>(null);
  
  // Hero Carousel Slides State
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);

  // Auto-play Carousel slides
  useEffect(() => {
    if (isCarouselHovered) return;
    const interval = setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isCarouselHovered]);

  // Inspecting Report reference (If not null, show full printable Report Viewer)
  const [activeInspectedReport, setActiveInspectedReport] = useState<ClinicalReport | null>(null);

  // Active bookings session memory
  const [bookings, setBookings] = useState<any[]>([
    {
      id: "BK-1002",
      patientName: "Muhammad Ali",
      phone: "0300-1234567",
      email: "m.ali@gmail.com",
      address: "Block H-3, Johar Town, Lahore",
      preferredDate: "2026-06-01",
      preferredTime: "08:00 AM - 10:00 AM",
      tests: ["Lipid Profile (Full Panel)", "Complete Blood Count (CBC)"],
      totalAmount: 3300,
      paymentMethod: "Cash on Collection",
      status: "Phlebotomist Assigned",
      phlebotomist: {
        name: "Sajid Mahmood",
        phone: "0321-7654321",
      }
    }
  ]);

  // Shopping cart popup modal state
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Active branch map index selection (defaults to 0 for Main Head Office / Johar Town HQ)
  const [activeBranchIndex, setActiveBranchIndex] = useState(0);

  // Hero Quick-search state
  const [heroSearchInvoice, setHeroSearchInvoice] = useState("");
  const [heroSearchError, setHeroSearchError] = useState("");

  // Subtotals computation
  const cartTotals = useMemo(() => {
    const testsSum = cartedTests.reduce((sum, id) => {
      const t = LAB_TESTS.find((test) => test.id === id);
      return sum + (t ? t.price : 0);
    }, 0);

    const pkgsSum = cartedPackages.reduce((sum, id) => {
      const p = HEALTH_PACKAGES.find((pkg) => pkg.id === id);
      return sum + (p ? p.price : 0);
    }, 0);

    return testsSum + pkgsSum;
  }, [cartedTests, cartedPackages]);

  // Cart operations helpers
  const handleAddTest = (id: string) => {
    if (!cartedTests.includes(id)) {
      setCartedTests((prev) => [...prev, id]);
    }
  };

  const handleRemoveTest = (id: string) => {
    setCartedTests((prev) => prev.filter((item) => item !== id));
  };

  const handleAddPackage = (id: string) => {
    if (!cartedPackages.includes(id)) {
      setCartedPackages((prev) => [...prev, id]);
    }
  };

  const handleRemovePackage = (id: string) => {
    setCartedPackages((prev) => prev.filter((item) => item !== id));
  };

  const handleProceedToWhatsAppBooking = () => {
    const selectedTests = cartedTests.map((id) => LAB_TESTS.find((t) => t.id === id)).filter(Boolean);
    const selectedPkgs = cartedPackages.map((id) => HEALTH_PACKAGES.find((p) => p.id === id)).filter(Boolean);
    
    const listNames = [
      ...selectedTests.map((t) => t?.name),
      ...selectedPkgs.map((p) => p?.name),
    ];
    
    const itemsText = listNames.length > 0
      ? `\n\n*Selected Diagnostics:* \n- ${listNames.join("\n- ")}`
      : "";
      
    const totalText = cartTotals > 0 ? `\n*Estimated Total:* PKR ${cartTotals}` : "";
    const message = `Hello Lahore Medical Lab, I'd like to book a Home Sample Collection.${itemsText}${totalText}\n\nPlease help me schedule my phlebotomist dispatcher appointment!`;
    
    const url = `https://wa.me/923036088497?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Triggers when a custom booking completes successfully
  const handleBookingSuccess = (newBooking: any) => {
    setBookings((prev) => [newBooking, ...prev]);
    // Empty the shopping cart
    setCartedTests([]);
    setCartedPackages([]);
  };

  // Inspect Reports callback fetching from Express backend
  const handleInspectReportByInvoice = async (invoiceRef: string) => {
    try {
      const cleanRef = invoiceRef.toUpperCase().trim();
      const res = await fetch(`/api/reports/${cleanRef}`);
      const body = await res.json();
      
      if (body.success) {
        setHeroSearchError("");
        setActiveInspectedReport(body.data);
      } else {
        setHeroSearchError(body.message || "Diagnostic report reference not found. Please try again.");
      }
    } catch {
      setHeroSearchError("Unable to retrieve report from pathology server. Check alignment.");
    }
  };

  const handleQuickDemoSetup = (patient: PatientProfile) => {
    setLoggedInPatient(patient);
    setTab("portal");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white relative selection:bg-rose-500/20 selection:text-slate-900 font-sans print:bg-white print:text-black">
      
      {/* 1. Omnipresent Navbar Header */}
      <Header
        currentTab={tab}
        setTab={(newTab) => {
          setTab(newTab);
          // If viewing other tabs, clear report inspector overlays
          setActiveInspectedReport(null);
        }}
        cartCount={cartedTests.length + cartedPackages.length}
        openCart={() => setIsCartOpen(true)}
        loggedInPatient={loggedInPatient}
        onLoginClick={() => {
          setTab("portal");
          setActiveInspectedReport(null);
        }}
        onLogout={() => {
          setLoggedInPatient(null);
          setTab("portal");
          setActiveInspectedReport(null);
        }}
      />

      {/* 2. Main content view transitions layout */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          
          {/* Report Viewer Overlay Sheet (Stretches full-view if inspected) */}
          {activeInspectedReport ? (
            <motion.div
              key="active-report-overlay"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <ReportViewer
                report={activeInspectedReport}
                onBack={() => {
                  // Back goes to Portal or Home depending on context
                  setActiveInspectedReport(null);
                  setTab("portal");
                }}
              />
            </motion.div>
          ) : (
            
            // Otherwise, render standard navigation tabs
            <div className="w-full">
              
              {/* TAB: Home Landing page */}
              {tab === "home" && (
                <motion.div
                  key="home-tab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-16 pb-16"
                >
                  {/* A. Hero banner Section */}
                  <div className="bg-white text-slate-950 relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden border-b border-slate-200">
                    {/* Visual pattern rings backgrounds */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
                    <div className="absolute -bottom-10 left-0 w-[300px] h-[300px] bg-red-500/[0.02] rounded-full blur-2xl"></div>

                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative text-left">
                      
                      {/* Left Header Description */}
                      <div className="lg:col-span-7 space-y-6">
                        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-full w-fit">
                          <ShieldCheck className="w-4 h-4 text-[#cf2027]" />
                          <span className="text-[11px] sm:text-xs font-mono font-extrabold uppercase text-[#cf2027] tracking-wider">
                            Punjab Healthcare Commission ISO Centralized Laboratory
                          </span>
                        </div>

                        <h1 className="font-display font-black text-3.5xl sm:text-5.5xl tracking-tight leading-none text-slate-950 uppercase">
                          Precision Diagnostics, <br />
                          <span className="text-[#cf2027]">Trustworthy Healthcare</span>
                        </h1>

                        <p className="text-slate-700 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
                          Lahore Chemical &amp; Clinical Laboratory delivers clinical chemistry, specialized hormonal assays, and advanced abdominal radiological investigations under over 4 decades of physician trust. 
                        </p>

                        {/* Interactive Hero Quick-Search Box (Report downloader) */}
                        <div className="bg-slate-50 border border-slate-200 p-5 rounded-2.5xl max-w-lg mt-8 shadow-sm">
                          <h3 className="text-xs font-mono font-black uppercase text-[#cf2027] tracking-widest flex items-center gap-1.5 mb-2 leading-none">
                            <Activity className="w-3.5 h-3.5 text-[#cf2027]" />
                            <span>Retrieve Lab Reports Instantly Online</span>
                          </h3>
                          <p className="text-[11px] text-slate-600 mb-4 font-normal">
                            Retrieve current lab reports by entering your invoice receipt code instantly below.
                          </p>

                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              if (heroSearchInvoice.trim()) {
                                handleInspectReportByInvoice(heroSearchInvoice);
                              }
                            }}
                            className="flex flex-col sm:flex-row gap-2"
                          >
                            <input
                              type="text"
                              placeholder="Enter Invoice No (e.g. LL-2026-9876)"
                              value={heroSearchInvoice}
                              onChange={(e) => setHeroSearchInvoice(e.target.value)}
                              className="bg-white border border-slate-300 rounded-xl px-4 py-3 placeholder-slate-400 text-sm focus:ring-2 focus:ring-red-500/25 focus:border-[#cf2027] focus:outline-none flex-grow font-mono uppercase tracking-wider text-slate-900"
                            />
                            <button
                              type="submit"
                              className="bg-[#cf2027] hover:bg-red-600 text-white font-bold px-6 py-3 rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1.5 flex-shrink-0 shadow-lg shadow-red-500/15"
                            >
                              <Search className="w-4.5 h-4.5" />
                              <span>Inspect Report</span>
                            </button>
                          </form>

                          {heroSearchError && (
                            <p className="text-xs text-rose-600 font-semibold mt-2.5 flex items-center gap-1">
                              <span>⚠</span>
                              <span className="lowercase normal-case">{heroSearchError}</span>
                            </p>
                          )}

                          <div className="text-[10px] text-slate-600 mt-3 font-mono flex flex-wrap gap-2.5">
                            <span>Suggestions:</span>
                            <button 
                              onClick={() => {
                                setHeroSearchInvoice("LL-2026-9876");
                                handleInspectReportByInvoice("LL-2026-9876");
                              }}
                              className="text-[#cf2027] hover:underline cursor-pointer font-black"
                            >
                              "LL-2026-9876" (Ali)
                            </button>
                            <span>|</span>
                            <button 
                              onClick={() => {
                                setHeroSearchInvoice("LL-2026-1212");
                                handleInspectReportByInvoice("LL-2026-1212");
                              }}
                              className="text-[#cf2027] hover:underline cursor-pointer font-black"
                            >
                              "LL-2026-1212" (Ayesha)
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Right Medical Labs Slide Carousel */}
                      <div className="lg:col-span-5 flex flex-col justify-between space-y-4" id="lab-image-carousel-container">
                        <div 
                          className="relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border border-slate-700/50 group bg-slate-950"
                          onMouseEnter={() => setIsCarouselHovered(true)}
                          onMouseLeave={() => setIsCarouselHovered(false)}
                          id="hero-carousel"
                        >
                          {/* Carousel Slides with motion fade transitions */}
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={activeHeroSlide}
                              initial={{ opacity: 0, scale: 1.01 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.99 }}
                              transition={{ duration: 0.35 }}
                              className="absolute inset-0 w-full h-full"
                            >
                              {/* Dark gradient vignette layer */}
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10"></div>
                              
                              <img
                                src={HERO_SLIDES[activeHeroSlide].image}
                                alt={HERO_SLIDES[activeHeroSlide].title}
                                className="w-full h-full object-cover object-center transform group-hover:scale-103 transition-transform duration-1000"
                                referrerPolicy="no-referrer"
                              />

                              {/* Text content card aligned bottom and left */}
                              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-left space-y-2">
                                <span className="inline-block px-2.5 py-1 text-[9px] font-mono font-extrabold uppercase bg-[#cf2027] text-white rounded-md tracking-wider">
                                  {HERO_SLIDES[activeHeroSlide].badge}
                                </span>
                                <h3 className="font-display font-black text-lg sm:text-xl text-slate-100 uppercase tracking-tight">
                                  {HERO_SLIDES[activeHeroSlide].title}
                                </h3>
                                <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed font-normal">
                                  {HERO_SLIDES[activeHeroSlide].description}
                                </p>
                              </div>
                            </motion.div>
                          </AnimatePresence>

                          {/* Navigation Buttons */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveHeroSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
                            }}
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-950/50 hover:bg-[#cf2027] border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 cursor-pointer"
                            title="Previous Slide"
                            id="hero-carousel-prev"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
                            }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-950/50 hover:bg-[#cf2027] border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 cursor-pointer"
                            title="Next Slide"
                            id="hero-carousel-next"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>

                          {/* Slide Bullet Indicators */}
                          <div className="absolute right-6 top-6 z-30 flex gap-1.5 bg-slate-950/45 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10">
                            {HERO_SLIDES.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveHeroSlide(idx);
                                }}
                                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                                  idx === activeHeroSlide ? "w-4 bg-[#cf2027]" : "w-1.5 bg-white/40 hover:bg-white"
                                }`}
                                title={`Slide ${idx + 1}`}
                              ></button>
                            ))}
                          </div>
                        </div>

                        {/* Interactive bento shortcuts to core clinical services */}
                        <div className="grid grid-cols-2 gap-4">
                          <div
                            onClick={() => setTab("booking")}
                            className="bg-slate-50 hover:bg-slate-100 hover:border-[#cf2027]/35 border border-slate-200 p-4.5 rounded-2xl text-left cursor-pointer transition-all flex items-center gap-3 group"
                          >
                            <div className="w-9 h-9 rounded-xl bg-[#cf2027]/10 border border-[#cf2027]/20 text-[#cf2027] flex items-center justify-center flex-shrink-0">
                              <Truck className="w-4.5 h-4.5 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                            <div>
                              <h4 className="text-[11px] font-mono font-black uppercase text-[#cf2027]">Sampling Dispatch</h4>
                              <p className="text-[12px] font-black text-slate-900 group-hover:text-[#cf2027] transition-colors">Book Free Sampling</p>
                            </div>
                          </div>

                           <a
                            href="https://wa.me/923036088497?text=Hello%20Lahore%20Medical%20Lab.%20I%20want%20to%20inquire%20about%20diagnostic%20tests%20and%20home%20sample%20collection."
                            target="_blank"
                            referrerPolicy="no-referrer"
                            className="bg-slate-50 hover:bg-slate-100 hover:border-emerald-500/35 border border-slate-200 p-4.5 rounded-2xl text-left cursor-pointer transition-all flex items-center gap-3 group"
                          >
                            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[#25D366] flex items-center justify-center flex-shrink-0">
                              <svg className="w-4.5 h-4.5 group-hover:scale-110 transition-transform text-[#25D366] fill-[#25D366]" viewBox="0 0 24 24">
                                <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.908.533 3.692 1.457 5.22L2 22l4.912-1.396A9.954 9.954 0 0012.004 22c5.52 0 10-4.48 10-10C22.004 6.48 17.524 2 12.004 2zm5.796 14.128c-.24.672-1.212 1.236-1.74 1.308-.48.06-1.08.084-2.88-.66-2.316-.948-3.792-3.288-3.912-3.444-.108-.156-.912-1.212-.912-2.316 0-1.104.576-1.644.78-1.86.204-.216.444-.264.588-.264h.42c.132 0 .312-.048.48.36.18.432.612 1.488.66 1.596.048.108.084.228 0 .42-.084.18-.18.288-.312.444-.132.156-.276.324-.396.444-.132.132-.276.276-.12.54.156.264.696 1.14 1.488 1.848.792.708 1.464.924 1.74 1.056.276.132.432.108.588-.072.156-.18.672-.78.852-1.044.18-.264.36-.216.612-.12.252.096 1.584.744 1.86.876.276.132.456.204.516.312.06.108.06.624-.18 1.296z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="text-[11px] font-mono font-black uppercase text-emerald-600">WhatsApp Live</h4>
                              <p className="text-[12px] font-black text-slate-900 group-hover:text-emerald-600 transition-colors">Instant Support Chat</p>
                            </div>
                          </a>
                        </div>

                      </div>

                    </div>
                  </div>

                  {/* B. Essential Features Highlights Bar Grid */}
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      
                      <div className="bg-white border border-slate-200/80 p-6 rounded-2.5xl space-y-3 shadow-inner text-left">
                        <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-650 text-[#cf2027] flex items-center justify-center">
                          <Clock className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-slate-900 uppercase text-xs tracking-wider font-mono">6 Hours Diagnostic Turnaround</h3>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Routine panels (CBC, HbA1c, ALT, Liver/Kidney profiles, blood chemistries) are verified and released within 6-8 hours.
                        </p>
                      </div>

                      <div className="bg-white border border-slate-200/80 p-6 rounded-2.5xl space-y-3 shadow-inner text-left">
                        <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-650 text-[#cf2027] flex items-center justify-center">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-slate-900 uppercase text-xs tracking-wider font-mono">Vast Punjab Collection Network</h3>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Accessible blood draw booths stationed across Lahore (Gulberg, DHA, Johar Town, Iqbal Town) and Gujrat divisional offices.
                        </p>
                      </div>

                      <div className="bg-white border border-slate-200/80 p-6 rounded-2.5xl space-y-3 shadow-inner text-left">
                        <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-650 text-[#cf2027] flex items-center justify-center">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-slate-900 uppercase text-xs tracking-wider font-mono">Cold-Chain Sample Security</h3>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Phlebotomists transport drawn vacutainers inside computerized cooling briefcases, preserving enzyme structure integrity.
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* C. Wellness healthcare packages carousel wrapper */}
                  <div className="bg-slate-100 py-16 border-y border-slate-200/60 text-left">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
                        <div>
                          <span className="text-[10px] font-mono uppercase text-sky-655 text-sky-500 font-extrabold tracking-widest block font-bold">Preventative Screening</span>
                          <h3 className="font-display font-black text-2.5xl text-slate-900 leading-tight">Featured Executive Health Packages</h3>
                        </div>
                        <button
                          onClick={() => setTab("tests")}
                          className="flex items-center gap-1 text-xs font-bold text-red-655 text-[#cf2027] hover:text-slate-900 transition font-mono border-b border-rose-500/40 pb-0.5 cursor-pointer"
                        >
                          <span>Explore All Diagnostic Panels &rarr;</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {HEALTH_PACKAGES.slice(0, 4).map((p) => {
                          const isAdded = cartedPackages.includes(p.id);
                          return (
                            <div key={p.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                              <div>
                                <h4 className="text-xs font-mono font-extrabold uppercase text-slate-400 tracking-wider">Screening Package</h4>
                                <h3 className="text-sm font-bold text-slate-900 uppercase mt-1 leading-snug line-clamp-1">{p.name}</h3>
                                <p className="text-[11px] text-slate-500 leading-normal lowercase normal-case h-14 mt-2 line-clamp-3">
                                  {p.description}
                                </p>
                                
                                <div className="mt-4 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block font-extrabold">Covers Parameters:</span>
                                  <p className="text-[10px] text-slate-700 italic truncate max-w-[200px] mt-0.5 font-sans lowercase normal-case">{p.tests.join(", ")}</p>
                                </div>
                              </div>

                              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                                <span className="text-sm font-bold text-slate-900 font-mono">PKR {p.price}</span>
                                {isAdded ? (
                                  <button
                                    onClick={() => handleRemovePackage(p.id)}
                                    className="bg-rose-50 text-rose-600 hover:bg-rose-100 text-[11px] font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                                  >
                                    Added
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handleAddPackage(p.id)}
                                    className="bg-[#cf2027] hover:bg-red-650 hover:bg-red-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer shadow-xs shadow-red-500/10 animate-fade-in"
                                  >
                                    Add Package
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>                  {/* D. Lahore & Gujrat Branch finder map list directory */}
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left" id="branches-list">
                    <div className="max-w-3xl mb-8 space-y-2">
                      <span className="text-[10px] font-mono uppercase text-red-500 font-extrabold tracking-widest block font-bold">Geographic Network</span>
                      <h3 className="font-display font-black text-2.5xl text-slate-900 uppercase leading-none">Our Diagnostic Branches &amp; Collection Hubs</h3>
                      <p className="text-slate-500 text-xs sm:text-sm">
                        Prefer on-site extraction or chest radiological imaging? Select any branch from our verified medical collection outlets below to pin its exact coordinate mapping on the adjacent live Google Map.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      {/* Left: List of Branches with click handler to set active branch map view */}
                      <div className="lg:col-span-5 space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                        {LAHORE_BRANCHES.map((branch, idx) => {
                          const isActive = idx === activeBranchIndex;
                          return (
                            <div
                              key={idx}
                              onClick={() => setActiveBranchIndex(idx)}
                              className={`cursor-pointer transition-all border rounded-2.5xl p-5 text-left flex flex-col justify-between ${
                                isActive
                                  ? "border-[#cf2027] bg-[#cf2027]/[0.02] shadow-sm ring-2 ring-red-500/5"
                                  : "bg-white border-slate-200 hover:border-slate-350 hover:shadow-xs"
                              }`}
                            >
                              <div className="space-y-3.5">
                                <div className="flex justify-between items-start gap-2">
                                  <div className="flex items-start gap-2 text-slate-800">
                                    <Building className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isActive ? "text-[#cf2027]" : "text-slate-400"}`} />
                                    <div>
                                      <h4 className="font-black text-xs sm:text-sm uppercase tracking-tight text-slate-900">{branch.name}</h4>
                                      {idx === 0 && (
                                        <span className="inline-block text-[8px] bg-red-100 text-[#cf2027] border border-red-200 px-1.5 py-0.5 rounded font-mono font-black mt-1 uppercase">
                                          ★ User Coordinate Verified Lab
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  {isActive && (
                                    <span className="text-[9px] font-mono text-[#cf2027] uppercase font-black bg-red-50 px-2 py-0.5 rounded border border-red-100 flex items-center gap-1">
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#cf2027] animate-ping"></span>
                                      Live View
                                    </span>
                                  )}
                                </div>
                                
                                <p className="text-xs text-slate-550 leading-normal font-sans font-medium">
                                  {branch.address}
                                </p>

                                <div className="space-y-1.5 text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-100">
                                  <p className="flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                                    <span>{branch.hours}</span>
                                  </p>
                                  <p className="flex items-center gap-1.5">
                                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                                    <span>{branch.phone}</span>
                                  </p>
                                </div>

                                <div className="flex flex-wrap gap-1 pt-1">
                                  {branch.services.map((serv, sIdx) => (
                                    <span key={sIdx} className="text-[8px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono uppercase font-bold">
                                      {serv}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Right: Embedded Interactive Live Google Map frame centered exactly at lat/lng coordinates */}
                      <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-4 shadow-xs md:sticky md:top-28 space-y-4">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-3">
                          <div>
                            <h4 className="text-xs font-black uppercase text-slate-900 tracking-tight flex items-center gap-1.5">
                              <MapPin className="w-4 h-4 text-[#cf2027] animate-bounce" />
                              <span>Live Target Plot</span>
                            </h4>
                            <p className="text-[10.5px] text-slate-500 font-sans tracking-tight leading-none mt-1">
                              {LAHORE_BRANCHES[activeBranchIndex].name}
                            </p>
                          </div>
                          
                          <a
                            href={LAHORE_BRANCHES[activeBranchIndex].googleMapUrl}
                            target="_blank"
                            referrerPolicy="no-referrer"
                            className="text-[10px] text-white font-black bg-[#cf2027] hover:bg-red-650 hover:bg-red-600 transition-all font-mono px-3 py-2 rounded-xl flex items-center gap-1 shadow-sm leading-none"
                          >
                            <span>Open In Google Maps</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>

                        {/* Interactive Embed iframe container */}
                        <div className="relative w-full h-[320px] sm:h-[390px] rounded-2.5xl overflow-hidden bg-slate-50 border border-slate-100">
                          <iframe
                            title="Interactive Location Map"
                            src={`https://maps.google.com/maps?q=${LAHORE_BRANCHES[activeBranchIndex].lat},${LAHORE_BRANCHES[activeBranchIndex].lng}&z=16&output=embed`}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0 w-full h-full"
                          ></iframe>
                        </div>

                        {/* Informative coordinates footer label */}
                        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 flex items-start gap-2.5">
                          <span className="text-[9.5px] bg-[#cf2027]/10 text-[#cf2027] font-mono font-black px-1.5 py-0.5 rounded uppercase flex-shrink-0">
                            GPS Coordinates
                          </span>
                          <div className="text-[10px] text-slate-500 leading-normal font-mono text-left">
                            <span className="font-bold text-slate-700 block">Latitude: {LAHORE_BRANCHES[activeBranchIndex].lat} • Longitude: {LAHORE_BRANCHES[activeBranchIndex].lng}</span>
                            <p className="mt-0.5 text-[9px] text-slate-400">Centered on safe clinical diagnostic lab guidelines in Lahore, PK.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </motion.div>
              )}

              {/* TAB: Patient Portal & Reports */}
              {tab === "portal" && (
                <PatientPortal
                  loggedInPatient={loggedInPatient}
                  onLogin={(patient) => setLoggedInPatient(patient)}
                  onLogout={() => {
                    setLoggedInPatient(null);
                    setActiveInspectedReport(null);
                  }}
                  onInspectReportInvoice={handleInspectReportByInvoice}
                  bookings={bookings}
                />
              )}

              {/* TAB: General Tests Directory */}
              {tab === "tests" && (
                <TestFinder
                  cartedTests={cartedTests}
                  cartedPackages={cartedPackages}
                  onAddTest={handleAddTest}
                  onRemoveTest={handleRemoveTest}
                  onAddPackage={handleAddPackage}
                  onRemovePackage={handleRemovePackage}
                  onProceedToBooking={handleProceedToWhatsAppBooking}
                />
              )}

              {/* TAB: Home Sampling bookings scheduler */}
              {tab === "booking" && (
                <HomeSampling
                  cartedTests={cartedTests}
                  cartedPackages={cartedPackages}
                  onRemoveTest={handleRemoveTest}
                  onRemovePackage={handleRemovePackage}
                  onBookingSuccess={handleBookingSuccess}
                  setTab={setTab}
                />
              )}

            </div>
          )}

        </AnimatePresence>
      </main>

      {/* 3. Omnipresent Interactive Quality Footer */}
      <Footer setTab={setTab} />

      {/* 4. Sliding Checkout Cart Drawer Dialog */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden font-sans text-slate-800" id="cart-drawer-modal">
            {/* Backdrop slide click trigger */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black"
            />

            <div className="absolute inset-y-0 right-0 max-w-full flex">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between"
              >
                {/* Header title */}
                <div className="bg-[#0c2340] text-white px-6 py-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-sky-400" />
                    <h3 className="font-display font-black text-sm tracking-widest uppercase">Collection Cart</h3>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Scrolled list elements */}
                <div className="flex-grow p-6 overflow-y-auto space-y-4">
                  {cartedTests.length === 0 && cartedPackages.length === 0 ? (
                    <div className="text-center py-20 space-y-4">
                      <ShoppingCart className="w-12 h-12 text-slate-300 mx-auto" />
                      <p className="text-xs text-slate-455 italic font-medium leading-relaxed max-w-[200px] mx-auto lowercase normal-case">
                        No Diagnostic parameters have been carted. Explore tests inside our medical list catalog.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3.5 text-left">
                      
                      {/* Health Package Lines */}
                      {cartedPackages.map((id) => {
                        const pkg = HEALTH_PACKAGES.find((p) => p.id === id);
                        if (!pkg) return null;
                        return (
                          <div key={id} className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex justify-between items-start gap-4">
                            <div>
                              <span className="text-[8px] bg-red-100 text-[#cf2027] font-extrabold px-1.5 rounded-md font-mono uppercase">Package offer</span>
                              <h4 className="text-xs font-bold text-slate-800 uppercase mt-1 leading-snug">{pkg.name}</h4>
                              <p className="text-xs font-mono font-bold text-slate-900 mt-1">PKR {pkg.price}</p>
                            </div>
                            <button
                              onClick={() => handleRemovePackage(id)}
                              className="text-slate-400 hover:text-rose-500 transition cursor-pointer p-1"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })}

                      {/* Diagnostic Tests Lines */}
                      {cartedTests.map((id) => {
                        const test = LAB_TESTS.find((t) => t.id === id);
                        if (!test) return null;
                        return (
                          <div key={id} className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex justify-between items-start gap-4">
                            <div>
                              <span className="text-[8px] bg-slate-200 text-slate-600 font-extrabold px-1.5 rounded-md font-mono uppercase">Clinical Lab</span>
                              <h4 className="text-xs font-bold text-slate-800 uppercase mt-1 leading-snug">{test.name}</h4>
                              <p className="text-xs font-mono font-bold text-slate-900 mt-1">PKR {test.price}</p>
                            </div>
                            <button
                              onClick={() => handleRemoveTest(id)}
                              className="text-slate-400 hover:text-rose-500 transition cursor-pointer p-1"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })}

                      {/* Totals summation indicator bottom */}
                      <div className="border-t border-slate-100 pt-5 space-y-2.5 font-sans">
                        <div className="flex justify-between text-xs text-slate-500">
                          <span>Home extraction fee</span>
                          <span className="text-[#cf2027] font-extrabold uppercase font-mono tracking-wide text-[10px]">Free sampling dispatch</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-slate-100 pb-3">
                          <span className="text-xs text-slate-600">Total Accumulation</span>
                          <span className="text-md font-black font-mono text-slate-900">PKR {cartTotals}</span>
                        </div>
                      </div>

                    </div>
                  )}
                </div>

                {/* Bottom Checkout trigger */}
                <div className="bg-slate-50 border-t border-slate-100 p-6 space-y-3">
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      handleProceedToWhatsAppBooking();
                    }}
                    disabled={cartedTests.length === 0 && cartedPackages.length === 0}
                    className="bg-[#cf2027] hover:bg-red-650 hover:bg-red-600 disabled:opacity-50 text-white font-bold px-4 py-4 rounded-xl text-xs w-full transition shadow-md shadow-red-500/10 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Proceed To scheduling</span>
                    <ArrowRight className="w-4 h-4 animate-pulse" />
                  </button>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-center font-bold text-xs text-slate-500 hover:text-slate-800 py-1 cursor-pointer block mx-auto transition"
                  >
                    Keep Browsing Tests Catalog
                  </button>
                </div>

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Action Button with dynamic tooltip */}
      <div className="fixed bottom-6 right-6 z-40 group flex flex-col items-end gap-2" id="floating-whatsapp-widget">
        {/* Hover/Intro Speech bubble */}
        <div className="bg-slate-900 border border-slate-800 text-white px-4 py-2 rounded-2xl shadow-xl text-[11px] font-medium leading-normal max-w-xs transition-all duration-300 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 pointer-events-none select-none flex items-center gap-1.5 font-sans">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
          <span>WhatsApp Representative Live (+92 303 6088497)</span>
        </div>

        {/* Action Button Bubble */}
        <a
          href="https://wa.me/923036088497?text=Hello%20Lahore%20Medical%20Lab.%20I%20want%20to%20inquire%20about%20diagnostic%20tests%20and%20home%20sample%20collection."
          target="_blank"
          referrerPolicy="no-referrer"
          className="relative w-14 h-14 rounded-full bg-[#25D366] text-white hover:bg-[#128C7E] flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer"
          title="Direct WhatsApp Support"
        >
          {/* Animated pulse halo effect */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping -z-10 group-hover:block"></span>
          
          <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
            <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.908.533 3.692 1.457 5.22L2 22l4.912-1.396A9.954 9.954 0 0012.004 22c5.52 0 10-4.48 10-10C22.004 6.48 17.524 2 12.004 2zm5.796 14.128c-.24.672-1.212 1.236-1.74 1.308-.48.06-1.08.084-2.88-.66-2.316-.948-3.792-3.288-3.912-3.444-.108-.156-.912-1.212-.912-2.316 0-1.104.576-1.644.78-1.86.204-.216.444-.264.588-.264h.42c.132 0 .312-.048.48.36.18.432.612 1.488.66 1.596.048.108.084.228 0 .42-.084.18-.18.288-.312.444-.132.156-.276.324-.396.444-.132.132-.276.276-.12.54.156.264.696 1.14 1.488 1.848.792.708 1.464.924 1.74 1.056.276.132.432.108.588-.072.156-.18.672-.78.852-1.044.18-.264.36-.216.612-.12.252.096 1.584.744 1.86.876.276.132.456.204.516.312.06.108.06.624-.18 1.296z" />
          </svg>
        </a>
      </div>

    </div>
  );
}
