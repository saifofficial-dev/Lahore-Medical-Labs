import { Award, Mail, PhoneCall, Heart, Clock, CheckCircle } from "lucide-react";

interface FooterProps {
  setTab: (tab: string) => void;
}

export function Footer({ setTab }: FooterProps) {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-800 font-sans font-normal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & Slogan Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-lg bg-[#cf2027] flex items-center justify-center font-bold text-white">LL</span>
              <div>
                <span className="font-display font-bold text-slate-900 tracking-tight leading-none block">LAHORE MEDICAL LAB</span>
                <span className="text-[9px] text-[#cf2027] font-mono tracking-wider font-semibold uppercase">Quality Is Our Priority</span>
              </div>
            </div>
            
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Lahore Chemical &amp; Clinical Laboratory (Lahore Medical Lab) stands representing over four decades of unmatched diagnostic excellence in clinical and radiology procedures. 
            </p>
            
            <div className="flex items-center gap-2 border border-slate-200 p-3 rounded-xl bg-slate-50">
              <Award className="w-8 h-8 text-[#cf2027] flex-shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Accredited Laboratory</h4>
                <p className="text-[10px] text-slate-500">ISO 9001:2015 &amp; EQAS Registered</p>
              </div>
            </div>
          </div>
          
          {/* Main Services Tab list Column */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-wide uppercase mb-4">Diagnostic Services</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setTab("tests")} className="text-slate-600 hover:text-[#cf2027] transition text-left cursor-pointer">
                  Hematology &amp; Blood Screens
                </button>
              </li>
              <li>
                <button onClick={() => setTab("tests")} className="text-slate-600 hover:text-[#cf2027] transition text-left cursor-pointer">
                  Hormones &amp; Immunology Panels
                </button>
              </li>
              <li>
                <button onClick={() => setTab("tests")} className="text-slate-600 hover:text-[#cf2027] transition text-left cursor-pointer">
                  Molecular Biology PCR tests
                </button>
              </li>
              <li>
                <button onClick={() => setTab("tests")} className="text-slate-600 hover:text-[#cf2027] transition text-left cursor-pointer">
                  Biochemistry &amp; Organ Functional Screens
                </button>
              </li>
              <li>
                <button onClick={() => setTab("tests")} className="text-slate-600 hover:text-[#cf2027] transition text-left cursor-pointer">
                  Dengue &amp; Monsoon Fever Specials
                </button>
              </li>
              <li>
                <button onClick={() => setTab("tests")} className="text-slate-600 hover:text-[#cf2027] transition text-left cursor-pointer">
                  Abdominal &amp; Pelvic Radiography
                </button>
              </li>
            </ul>
          </div>
          
          {/* Quick links & Patients Support Column */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-wide uppercase mb-4">Patient Care Links</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setTab("portal")} className="text-slate-600 hover:text-[#cf2027] transition text-left cursor-pointer">
                  Online Report Retrieval
                </button>
              </li>
              <li>
                <button onClick={() => setTab("portal")} className="text-slate-600 hover:text-[#cf2027] transition text-left cursor-pointer">
                  Clinical History &amp; Vitals Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setTab("booking")} className="text-slate-600 hover:text-[#cf2027] transition text-left cursor-pointer">
                  Book Free Home Blood Collection
                </button>
              </li>
              <li>
                <button onClick={() => setTab("advisor")} className="text-slate-600 hover:text-[#cf2027] transition text-left cursor-pointer">
                  Gemini-Powered Test Advisor
                </button>
              </li>
              <li>
                <a href="#branches-list" className="text-slate-600 hover:text-[#cf2027] transition">
                  Contact Branches Map
                </a>
              </li>
            </ul>
          </div>
          
          {/* Emergency support / Phone lines Column */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-wide uppercase mb-4">Corporate Office</h3>
            <ul className="space-y-3.5 text-xs">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#cf2027] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-slate-900">Shadman-Gulberg HQ</p>
                  <p className="text-[11px] text-slate-500">12-C, Shadman 2, Opposite PIC, Lahore</p>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#cf2027] flex-shrink-0" />
                <a href="tel:+9242111522522" className="hover:text-[#cf2027] text-slate-900 font-mono transition">
                  042-111-522-522
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#25D366] fill-[#25D366] flex-shrink-0" viewBox="0 0 24 24">
                  <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.908.533 3.692 1.457 5.22L2 22l4.912-1.396A9.954 9.954 0 0012.004 22c5.52 0 10-4.48 10-10C22.004 6.48 17.524 2 12.004 2zm5.796 14.128c-.24.672-1.212 1.236-1.74 1.308-.48.06-1.08.084-2.88-.66-2.316-.948-3.792-3.288-3.912-3.444-.108-.156-.912-1.212-.912-2.316 0-1.104.576-1.644.78-1.86.204-.216.444-.264.588-.264h.42c.132 0 .312-.048.48.36.18.432.612 1.488.66 1.596.048.108.084.228 0 .42-.084.18-.18.288-.312.444-.132.156-.276.324-.396.444-.132.132-.276.276-.12.54.156.264.696 1.14 1.488 1.848.792.708 1.464.924 1.74 1.056.276.132.432.108.588-.072.156-.18.672-.78.852-1.044.18-.264.36-.216.612-.12.252.096 1.584.744 1.86.876.276.132.456.204.516.312.06.108.06.624-.18 1.296z" />
                </svg>
                <a href="https://wa.me/923036088497?text=Hello%20Lahore%2520Medical%2520Lab.%20I%20want%2520to%20inquire%20about%2520diagnostic%2520tests." target="_blank" referrerPolicy="no-referrer" className="hover:text-[#25D366] text-slate-800 font-mono transition font-semibold">
                  +92 303 6088497 (WhatsApp)
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#cf2027] flex-shrink-0" />
                <a href="mailto:support@lahorelab.com.pk" className="hover:text-red-500 transition text-slate-800 font-mono">
                  support@lahorelab.com.pk
                </a>
              </li>
            </ul>
          </div>
          
        </div>

        {/* Cold-chain disclaimer */}
        <div className="mt-8 pt-8 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-[#cf2027] flex-shrink-0 border border-slate-200">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900">Phlebotomy Sample Cold-Chain Quality Protection</p>
              <p className="text-[11px] text-slate-500">All samples fetched inside home-based sampling drawers are secured in state-of-the-art diagnostic cool containers.</p>
            </div>
          </div>
          <div className="text-xs text-slate-500 md:text-right">
            Medical Content verified by <strong>Prof. Dr. Munir Ahmad (Consultant Pathologist)</strong>.
          </div>
        </div>

        {/* Legal credentials */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
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
