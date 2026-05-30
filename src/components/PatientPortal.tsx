import { useState, FormEvent } from "react";
import { User, Key, Search, FileText, Activity, AlertCircle, TrendingUp, Sparkles, LogOut, CheckCircle, Clock } from "lucide-react";
import { PatientProfile, ClinicalReport } from "../types";
import { DEMO_PATIENTS } from "../data";

interface PatientPortalProps {
  loggedInPatient: PatientProfile | null;
  onLogin: (patient: PatientProfile) => void;
  onLogout: () => void;
  onInspectReportInvoice: (invoiceNo: string) => void;
  bookings: any[];
}

export function PatientPortal({
  loggedInPatient,
  onLogin,
  onLogout,
  onInspectReportInvoice,
  bookings,
}: PatientPortalProps) {
  // Login credentials states
  const [patientId, setPatientId] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [loginError, setLoginError] = useState("");
  const [searchInvoiceDirect, setSearchInvoiceDirect] = useState("");
  const [searchError, setSearchError] = useState("");

  // Stats chart state: toggle between Fasting Blood Sugar or Cholesterol
  const [activeChartMetric, setActiveChartMetric] = useState<"glucose" | "cholesterol">("glucose");

  // Handle Login Click
  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoginError("");

    const normId = patientId.trim().toUpperCase();
    const normInvoice = invoiceNo.trim().toUpperCase();

    if (!normId || !normInvoice) {
      setLoginError("Please enter both Patient ID & Invoice / Password");
      return;
    }

    // Try finding matching demo patient
    const foundPatient = DEMO_PATIENTS.find(
      (p) =>
        p.patientId.toUpperCase() === normId &&
        p.reports.some((r) => r.invoiceNo.toUpperCase() === normInvoice)
    );

    if (foundPatient) {
      onLogin(foundPatient);
    } else {
      setLoginError(
        "Credentials mismatch. Please click on one of the Quick Demo Portals below."
      );
    }
  };

  // Direct Invoice report search (Quick download)
  const handleDirectSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearchError("");

    const normInv = searchInvoiceDirect.trim().toUpperCase();
    if (!normInv) {
      setSearchError("Please enter a valid report Invoice No.");
      return;
    }

    // Muhammad Ali: LL-2026-9876
    // Ayesha Khan: LL-2026-1212
    // Zainab Bilal: LL-2026-3434
    if (normInv.length < 4) {
      setSearchError("Invalid invoice format. Try 'LL-2026-9876'");
      return;
    }

    onInspectReportInvoice(normInv);
  };

  // Quick setup demo credentials helper
  const handleDemoLoginClick = (patient: PatientProfile, invoice: string) => {
    setPatientId(patient.patientId);
    setInvoiceNo(invoice);
    onLogin(patient);
  };

  // Custom SVG Line Chart plotting: Multi-point responsive line graph!
  const renderSVGChart = (patient: PatientProfile) => {
    const dates = patient.vitalMetrics.dates;
    const values =
      activeChartMetric === "glucose"
        ? patient.vitalMetrics.bloodSugarFasting
        : patient.vitalMetrics.cholesterolTotal;

    const labelUpper = activeChartMetric === "glucose" ? "Fasting Blood Sugar" : "Total Cholesterol";
    const unitText = "mg/dL";

    // Chart bounds
    const width = 500;
    const height = 180;
    const paddingLeft = 40;
    const paddingRight = 20;
    const paddingTop = 20;
    const paddingBottom = 30;

    const minVal = activeChartMetric === "glucose" ? 70 : 150;
    const maxVal = activeChartMetric === "glucose" ? 140 : 280;

    const pointsCount = dates.length;

    // Calculate actual points (x, y) dynamically
    const xStep = (width - paddingLeft - paddingRight) / Math.max(1, pointsCount - 1);
    const chartPoints = values.map((val, idx) => {
      const x = paddingLeft + idx * xStep;
      // Map val between minVal and maxVal representing 0 to (height - top - bottom)
      const ratio = (val - minVal) / (maxVal - minVal);
      const y = height - paddingBottom - ratio * (height - paddingTop - paddingBottom);
      return { x, y, value: val, label: dates[idx] };
    });

    const linePath = chartPoints.reduce((acc, pt, idx) => {
      return acc + (idx === 0 ? `M ${pt.x} ${pt.y}` : ` L ${pt.x} ${pt.y}`);
    }, "");

    const areaPath =
      chartPoints.length > 0
        ? `${linePath} L ${chartPoints[chartPoints.length - 1].x} ${height - paddingBottom} L ${chartPoints[0].x} ${height - paddingBottom} Z`
        : "";

    // Threshold lines
    const normalThreshold = activeChartMetric === "glucose" ? 100 : 200;
    const thresholdY = (() => {
      const ratio = (normalThreshold - minVal) / (maxVal - minVal);
      return height - paddingBottom - ratio * (height - paddingTop - paddingBottom);
    })();

    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white shadow-lg overflow-hidden relative">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h4 className="text-xs font-mono uppercase text-emerald-400 tracking-wider">Metrics Tracking Over Time</h4>
            <span className="text-sm font-bold block">{labelUpper} ({unitText})</span>
          </div>
          <div className="flex divide-x divide-slate-800 border border-slate-800 rounded-lg overflow-hidden text-xs text-slate-400">
            <button
              onClick={() => setActiveChartMetric("glucose")}
              className={`px-3 py-1.5 transition cursor-pointer ${
                activeChartMetric === "glucose" ? "bg-slate-800 text-emerald-400 font-bold" : "hover:text-slate-200"
              }`}
            >
              Glucose
            </button>
            <button
              onClick={() => setActiveChartMetric("cholesterol")}
              className={`px-3 py-1.5 transition cursor-pointer ${
                activeChartMetric === "cholesterol" ? "bg-slate-800 text-emerald-400 font-bold" : "hover:text-slate-200"
              }`}
            >
              Cholesterol
            </button>
          </div>
        </div>

        {/* SVG Drawing area */}
        <div className="w-full h-44">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full text-slate-500 overflow-visible">
            {/* Horizontal Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((r, idx) => {
              const y = paddingTop + r * (height - paddingTop - paddingBottom);
              const gridLabel = Math.round(maxVal - r * (maxVal - minVal));
              return (
                <g key={idx} className="opacity-35">
                  <line x1={paddingLeft} y1={y} x2={width - paddingRight} y2={y} stroke="#1e293b" strokeWidth="1" strokeDasharray="3,3" />
                  <text x={paddingLeft - 10} y={y + 4} fill="#64748b" fontSize="9" textAnchor="end" fontFamily="monospace">
                    {gridLabel}
                  </text>
                </g>
              );
            })}

            {/* Threshold safety boundary line (Red/Dashed) */}
            <g className="opacity-70">
              <line x1={paddingLeft} y1={thresholdY} x2={width - paddingRight} y2={thresholdY} stroke="#f43f5e" strokeWidth="1.2" strokeDasharray="5,4" />
              <text x={width - paddingRight - 5} y={thresholdY - 5} fill="#f43f5e" fontSize="8" fontFamily="monospace" textAnchor="end">
                Border: {normalThreshold} {unitText}
              </text>
            </g>

            {/* Semi-transparent line area fill */}
            <path d={areaPath} fill="url(#gradient-emerald)" opacity="0.15" />

            {/* Active Connecting Trend line */}
            <path d={linePath} fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* Scatter points on values */}
            {chartPoints.map((pt, idx) => (
              <g key={idx}>
                {/* Pointer Dot */}
                <circle cx={pt.x} cy={pt.y} r="4" fill="#0f172a" stroke="#10b981" strokeWidth="2.5" className="cursor-pointer" />
                {/* Tooltip value */}
                <text x={pt.x} y={pt.y - 10} fill="#f8fafc" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  {pt.value}
                </text>
                {/* Dated Label axis */}
                <text x={pt.x} y={height - 10} fill="#64748b" fontSize="9" textAnchor="middle">
                  {pt.label}
                </text>
              </g>
            ))}
          </svg>

          {/* Define gradient parameters */}
          <svg className="h-0 w-0 absolute">
            <defs>
              <linearGradient id="gradient-emerald" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1.5 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/80">
          <Activity className="w-4.5 h-4.5 text-emerald-500 animate-pulse flex-shrink-0" />
          <span>
            {activeChartMetric === "glucose"
              ? "Your glucose levels show positive recovery. High fasting levels indicate impairment but remain below diabetes line."
              : "Total cholesterol is border-line elevated. Focus on increasing HDL levels by regular cardiac exercise and walnut inclusion."}
          </span>
        </div>
      </div>
    );
  };

  // Render client health analysis summary based on patient profile
  const getSimulatedWellnessAdvice = (patient: PatientProfile) => {
    if (patient.patientId === "LA-88392") {
      return {
        overall: "Moderate Lipid Elevation & Borderline Fasting Sugar",
        diet: [
          "Limit saturated trans-fats like Ghee, butter, fried foods, and rich curries commonly served in Lahore.",
          "Incorporate high-fiber pulses, raw salads, and multi-grain roti.",
          "Introduce 1 tablespoon of olive oil or handful of unsalted almonds diariamente.",
        ],
        alerts: "Your Fasting Blood Sugar of 104 mg/dL places you within the 'Prediabetes' zone. Highly advised to monitor insulin resistance.",
        followups: ["HbA1c Glycated Blood sugar tracker (recommended next 30 days)", "Re-evaluate Lipid clearance panel in September 2026."],
      };
    } else if (patient.patientId === "LA-45321") {
      return {
        overall: "Mild Iron Deficiency Anemia & Stable Margins",
        diet: [
          "Include organic iron-packed items: Spinach (Palak), lentils, red meat in moderation, and fresh pomegranates.",
          "Combine iron foods with Vitamin C (e.g. squeeze fresh lemon over foods) to drastically boost absorption.",
          "Avoid drinking loose black tea (Chai) or coffee immediately before or after meals as tannins inhibit iron.",
        ],
        alerts: "Hemoglobin level of 11.2 g/dL indicates mild microcytic anemia.",
        followups: ["Serum Ferritin & Iron Studies Panel", "CBC Review in 6 weeks."],
      };
    } else {
      return {
        overall: "Endocrine Euthyroid Status & Isolated Vitamin D Deficiency",
        diet: [
          "Consume eggs, cod liver capsules, and fortified nutritional yogurts.",
          "Expose skin to direct sunlight (arms and feet) for 15-20 minutes in early morning (07:00 AM - 09:00 AM) prior to high uv radiation hours.",
          "Consider daily standard therapeutic Vitamin D3 capsules based on primary specialist's dosing advice.",
        ],
        alerts: "Vitamin D3 density of 18.5 ng/mL suggests moderate clinically low density.",
        followups: ["Vitamin D3 (25-Hydroxy) re-check in 3 months."],
      };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans" id="patient-portal-base">
      
      {/* 1. Portal Logged Out Layout */}
      {!loggedInPatient ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-stretch">
          
          {/* Diagnostic report search & Info column */}
          <div className="md:col-span-7 flex flex-col justify-center space-y-6">
            <div>
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-mono font-bold tracking-wide uppercase">
                Patient Empowerment Portal
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight mt-3">
                Secure &amp; Instant Diagnostic Reports Online
              </h2>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed mt-4">
                Access your laboratory and radiological outcomes instantly. View dynamic blood trend charts, track organ functional metrics, and consult our smart virtual AI advisor to map subsequent screening choices.
              </p>
            </div>

            {/* Direct Invoice Quick search box */}
            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-md w-full">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5 uppercase mb-2">
                <Search className="w-4 h-4 text-emerald-500" />
                <span>Quick Report Retrieval (Instant Download)</span>
              </h3>
              <p className="text-xs text-slate-400 mb-4 normal-case">
                No passwords required. Just enter your unique invoice reference to pull and view.
              </p>

              <form onSubmit={handleDirectSearchSubmit} className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="text"
                  placeholder="Enter Invoice No (e.g., LL-2026-9876)"
                  value={searchInvoiceDirect}
                  onChange={(e) => setSearchInvoiceDirect(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-800 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none flex-grow font-mono uppercase tracking-wider"
                />
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-6 py-3 rounded-xl font-bold text-sm transition shadow-md shadow-emerald-500/10 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Search className="w-4 h-4" />
                  <span>Fetch Report</span>
                </button>
              </form>
              {searchError && (
                <p className="text-xs text-rose-500 font-semibold mt-2.5 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  <span>{searchError}</span>
                </p>
              )}
            </div>

            {/* Quick Demo Credentials Guide */}
            <div className="bg-slate-100 border border-slate-200/60 p-5 rounded-2xl">
              <h3 className="text-xs font-mono font-extrabold uppercase text-slate-500 tracking-wider mb-3">
                Quick Demo Accounts (Explore Portal Immediately)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {DEMO_PATIENTS.map((demo) => {
                  const invoice = demo.reports[0].invoiceNo;
                  return (
                    <div
                      key={demo.patientId}
                      onClick={() => handleDemoLoginClick(demo, invoice)}
                      className="bg-white border border-slate-200/70 p-3.5 rounded-xl cursor-pointer hover:border-emerald-400 hover:shadow-md transition text-left"
                    >
                      <h4 className="text-xs font-bold text-slate-800">{demo.name}</h4>
                      <p className="text-[10px] font-mono text-slate-500 mt-1">Patient ID: {demo.patientId}</p>
                      <p className="text-[10px] font-mono text-emerald-600 font-bold mt-0.5">Inv: {invoice}</p>
                      <span className="inline-block text-[8px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md mt-2 font-mono font-bold uppercase">
                        {demo.patientId === "LA-88392" ? "Cholesterol" : (demo.patientId === "LA-45321" ? "Diabetes" : "Thyroid")}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Secure Login Form column */}
          <div className="md:col-span-5 flex items-center">
            <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-8 shadow-2xl w-full">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <User className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl text-slate-100">Patient Credentials Access</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Authenticate using the receipts issued by clinical registrars.
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="text-[11px] font-mono uppercase text-slate-400 tracking-wider block mb-1">
                    Patient ID Account Number
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                    <input
                      type="text"
                      placeholder="e.g., LA-88392"
                      value={patientId}
                      onChange={(e) => setPatientId(e.target.value)}
                      className="bg-slate-950/60 border border-slate-700/80 rounded-xl px-10 py-3 text-slate-200 text-sm w-full focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-500 focus:outline-none font-mono uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-slate-400 tracking-wider block mb-1">
                    Invoice No / Patient Passcode
                  </label>
                  <div className="relative">
                    <Key className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                    <input
                      type="password"
                      placeholder="e.g., LL-2026-9876"
                      value={invoiceNo}
                      onChange={(e) => setInvoiceNo(e.target.value)}
                      className="bg-slate-950/60 border border-slate-700/80 rounded-xl px-10 py-3 text-slate-200 text-sm w-full focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-500 focus:outline-none font-mono uppercase"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl text-sm w-full transition shadow-md shadow-emerald-500/10 cursor-pointer text-center flex items-center justify-center gap-1.5 mt-8"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Authenticate Dashboard</span>
                </button>
              </form>

              {loginError && (
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3.5 rounded-xl text-xs flex gap-2.5 items-start mt-4 lowercase normal-case">
                  <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                  <span>{loginError}</span>
                </div>
              )}
            </div>
          </div>

        </div>
      ) : (
        
        // 2. Active Patient Portal Dashboard Layout
        <div className="space-y-8">
          
          {/* Header Dashboard Banner */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-slate-900 border-4 border-slate-800 text-emerald-400 text-lg font-black rounded-2xl flex items-center justify-center">
                {loggedInPatient.name[0]}
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">Patient Portal Account</span>
                <h2 className="font-display font-extrabold text-2xl text-slate-900 leading-none mt-1">
                  Assalamualaikum, {loggedInPatient.name}
                </h2>
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-500 mt-2 font-mono">
                  <span>ID: <strong className="text-slate-800 font-bold font-medium">{loggedInPatient.patientId}</strong></span>
                  <span>&bull;</span>
                  <span>Gender: <strong className="text-slate-800 font-bold font-medium">{loggedInPatient.gender}</strong></span>
                  <span>&bull;</span>
                  <span>Age: <strong className="text-slate-800 font-bold font-medium">{loggedInPatient.age} Yrs</strong></span>
                  <span>&bull;</span>
                  <span>City: <strong className="text-slate-800 font-bold font-medium">{loggedInPatient.city}</strong></span>
                </div>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 transition px-4 py-2.5 rounded-xl cursor-pointer ml-auto md:ml-0"
              id="btn-patient-logout"
            >
              <LogOut className="w-4 h-4" />
              <span>Log out Sess</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left section: Histology Trends & Diagnostics list */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Dynamic SVG Vitals Line Chart */}
              {renderSVGChart(loggedInPatient)}

              {/* Patient Active Reports & Blood Panels list */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  <span>Approved Laboratory Diagnoses Reports</span>
                </h3>

                <div className="space-y-3.5">
                  {loggedInPatient.reports.map((rep) => (
                    <div
                      key={rep.invoiceNo}
                      className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-emerald-200 hover:bg-emerald-500/[0.01] transition-all"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-slate-500">Released: {rep.reportingDate}</span>
                        <h4 className="text-sm font-bold text-slate-900 uppercase">
                          {rep.testName}
                        </h4>
                        <p className="text-xs font-mono text-emerald-600 font-medium lowercase normal-case">
                          Invoice Reference: {rep.invoiceNo}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-medium">
                          Approved Verification
                        </span>
                        <button
                          onClick={() => onInspectReportInvoice(rep.invoiceNo)}
                          className="bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                        >
                          <Search className="w-3.5 h-3.5" />
                          <span>View Panel</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Patient Booked/Pending Phlebotomoy Sampling Orders */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-emerald-600" />
                  <span>Your Home Sampling Booking Orders</span>
                </h3>

                {bookings.length === 0 ? (
                  <p className="text-xs text-slate-400 py-4 italic">No active sampling bookings found for this session.</p>
                ) : (
                  <div className="space-y-3">
                    {bookings.map((bk) => (
                      <div key={bk.id} className="border border-slate-200/80 rounded-xl p-4 bg-slate-50/60 font-sans text-xs">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 bg-slate-200 text-slate-700 rounded font-bold">{bk.id}</span>
                            <h4 className="font-bold text-slate-900 mt-2 truncate max-w-[200px]">For: {bk.patientName}</h4>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-mono text-[9px] font-bold">
                            {bk.status}
                          </span>
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-slate-500 font-mono">
                          <p>Date: <strong className="text-slate-700">{bk.preferredDate}</strong></p>
                          <p>Slot: <strong className="text-slate-700">{bk.preferredTime}</strong></p>
                          <p className="col-span-2">Amt: <strong className="text-slate-700 font-medium">PKR {bk.totalAmount}</strong> ({bk.paymentMethod})</p>
                        </div>
                        {bk.phlebotomist && (
                          <div className="mt-3.5 border-t border-slate-200/60 pt-3 flex items-center gap-2.5">
                            <div className="w-7.5 h-7.5 rounded-lg bg-emerald-500/15 text-emerald-600 flex items-center justify-center font-bold">P</div>
                            <div>
                              <p className="text-[10px] text-slate-400 font-mono">Assigned Phlebotomist</p>
                              <p className="font-bold text-slate-800">{bk.phlebotomist.name} &bull; <span className="font-mono text-[10px]">{bk.phlebotomist.phone}</span></p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Right section: Clinical Smart AI wellness advice card */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* AI smart wellness overview */}
              <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/5 rounded-full blur-2xl transform translate-x-12 -translate-y-12"></div>
                
                <div className="flex items-center gap-2 text-emerald-400 mb-4">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-widest font-extrabold flex items-center gap-1.5 text-emerald-300">
                    Smart AI Clinical Analysis
                  </span>
                </div>

                {(() => {
                  const advice = getSimulatedWellnessAdvice(loggedInPatient);
                  return (
                    <div className="space-y-5">
                      <div>
                        <h4 className="text-slate-400 text-xs">Vitals Diagnostic Mapping</h4>
                        <p className="text-sm font-black text-slate-100 font-display tracking-tight leading-snug mt-1 uppercase">
                          {advice.overall}
                        </p>
                      </div>

                      {/* Warnings alert */}
                      <div className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-xl flex items-start gap-2.5">
                        <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div className="text-xs leading-relaxed text-slate-300">
                          <p className="font-semibold text-amber-500 font-mono text-[10px] uppercase">Pathology Caution</p>
                          <p className="mt-1 lowercase normal-case">{advice.alerts}</p>
                        </div>
                      </div>

                      {/* Custom Diet lists */}
                      <div className="space-y-1.5">
                        <h5 className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">Suggested Pakistani Diet Intake</h5>
                        <ul className="space-y-2 text-xs text-slate-300">
                          {advice.diet.map((it, idx) => (
                            <li key={idx} className="flex items-start gap-1.5 text-[11px] leading-relaxed lowercase normal-case">
                              <span className="text-emerald-500 font-bold flex-shrink-0 mt-0.5">&bull;</span>
                              <span>{it}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Recommended screening followup */}
                      <div className="space-y-1.5">
                        <h5 className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">Suggested Diagnostics Follow-up</h5>
                        <ul className="space-y-1 text-xs text-emerald-400 font-mono">
                          {advice.followups.map((f, fIdx) => (
                            <li key={fIdx} className="flex items-center gap-2">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                              <span className="text-[11px] text-slate-300">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>
                  );
                })()}

                {/* Professional clinical disclaimer */}
                <p className="text-[9px] text-slate-500 leading-normal border-t border-slate-800 pt-4 mt-6 lowercase normal-case">
                  *Disclaimer: AI Clinical recommendations are computed based on clinical ranges. Final evaluation and therapeutic prescriptions must be authorised by your FCPS/MBBS consultant doctor.*
                </p>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
