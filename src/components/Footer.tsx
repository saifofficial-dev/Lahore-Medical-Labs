import { Award, Mail, PhoneCall, Heart, Clock, CheckCircle } from "lucide-react";

interface FooterProps {
  setTab: (tab: string) => void;
}

export function Footer({ setTab }: FooterProps) {
  return (
    <footer className="bg-[#0a182d] border-t border-slate-800 text-slate-300 font-sans font-normal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & Slogan Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-lg bg-[#cf2027] flex items-center justify-center font-bold text-white">LL</span>
              <div>
                <span className="font-display font-bold text-slate-100 tracking-tight leading-none block">LAHORE MEDICAL LAB</span>
                <span className="text-[9px] text-sky-450 text-sky-400 font-mono tracking-wider font-semibold uppercase">Quality Is Our Priority</span>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Lahore Chemical &amp; Clinical Laboratory (Lahore Medical Lab) stands representing over four decades of unmatched diagnostic excellence in clinical and radiology procedures. 
            </p>
            
            <div className="flex items-center gap-2 border border-slate-800 p-3 rounded-xl bg-slate-950/40">
              <Award className="w-8 h-8 text-[#cf2027] flex-shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-200">Accredited Laboratory</h4>
                <p className="text-[10px] text-slate-500">ISO 9001:2015 &amp; EQAS Registered</p>
              </div>
            </div>
          </div>
          
          {/* Main Services Tab list Column */}
          <div>
            <h3 className="text-sm font-semibold text-slate-100 tracking-wide uppercase mb-4">Diagnostic Services</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setTab("tests")} className="text-slate-400 hover:text-red-500 transition text-left cursor-pointer">
                  Hematology &amp; Blood Screens
                </button>
              </li>
              <li>
                <button onClick={() => setTab("tests")} className="text-slate-400 hover:text-red-500 transition text-left cursor-pointer">
                  Hormones &amp; Immunology Panels
                </button>
              </li>
              <li>
                <button onClick={() => setTab("tests")} className="text-slate-400 hover:text-red-500 transition text-left cursor-pointer">
                  Molecular Biology PCR tests
                </button>
              </li>
              <li>
                <button onClick={() => setTab("tests")} className="text-slate-400 hover:text-red-500 transition text-left cursor-pointer">
                  Biochemistry &amp; Organ Functional Screens
                </button>
              </li>
              <li>
                <button onClick={() => setTab("tests")} className="text-slate-400 hover:text-red-500 transition text-left cursor-pointer">
                  Dengue &amp; Monsoon Fever Specials
                </button>
              </li>
              <li>
                <button onClick={() => setTab("tests")} className="text-slate-400 hover:text-red-500 transition text-left cursor-pointer">
                  Abdominal &amp; Pelvic Radiography
                </button>
              </li>
            </ul>
          </div>
          
          {/* Quick links & Patients Support Column */}
          <div>
            <h3 className="text-sm font-semibold text-slate-100 tracking-wide uppercase mb-4">Patient Care Links</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setTab("portal")} className="text-slate-400 hover:text-red-500 transition text-left cursor-pointer">
                  Online Report Retrieval
                </button>
              </li>
              <li>
                <button onClick={() => setTab("portal")} className="text-slate-400 hover:text-red-500 transition text-left cursor-pointer">
                  Clinical History &amp; Vitals Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setTab("booking")} className="text-slate-400 hover:text-red-500 transition text-left cursor-pointer">
                  Book Free Home Blood Collection
                </button>
              </li>
              <li>
                <button onClick={() => setTab("advisor")} className="text-slate-400 hover:text-red-550 hover:text-red-500 transition text-left cursor-pointer">
                  Gemini-Powered Test Advisor
                </button>
              </li>
              <li>
                <a href="#branches-list" className="text-slate-400 hover:text-red-500 transition">
                  Contact Branches Map
                </a>
              </li>
            </ul>
          </div>
          
          {/* Emergency support / Phone lines Column */}
          <div>
            <h3 className="text-sm font-semibold text-slate-100 tracking-wide uppercase mb-4">Corporate Office</h3>
            <ul className="space-y-3.5 text-xs">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-slate-300">Shadman-Gulberg HQ</p>
                  <p className="text-[11px] text-slate-500">12-C, Shadman 2, Opposite PIC, Lahore</p>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <a href="tel:+9242111522522" className="hover:text-sky-400 text-slate-300 font-mono transition">
                  042-111-522-522
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#cf2027] flex-shrink-0" />
                <a href="mailto:support@lahorelab.com.pk" className="hover:text-red-500 transition text-slate-300 font-mono">
                  support@lahorelab.com.pk
                </a>
              </li>
            </ul>
          </div>
          
        </div>

        {/* Cold-chain disclaimer */}
        <div className="mt-8 pt-8 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-sky-400 flex-shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-200">Phlebotomy Sample Cold-Chain Quality Protection</p>
              <p className="text-[11px] text-slate-500">All samples fetched inside home-based sampling drawers are secured in state-of-the-art diagnostic cool containers.</p>
            </div>
          </div>
          <div className="text-xs text-slate-500 md:text-right">
            Medical Content verified by <strong>Prof. Dr. Munir Ahmad (Consultant Pathologist)</strong>.
          </div>
        </div>

        {/* Legal credentials */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-slate-500 tracking-tight text-center sm:text-left">
            &copy; {new Date().getFullYear()} Lahore Medical Lab &amp; Diagnostic Centre. All rights reserved. Registered under Punjab Healthcare Commission (PHC).
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
            <span>Made with Care for Lahore Diagnostics</span>
            <Heart className="w-3 h-3 text-red-500 animate-pulse fill-red-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
