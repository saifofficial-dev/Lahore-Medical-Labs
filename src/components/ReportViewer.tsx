import { Printer, Calendar, User, FileText, CheckCircle, AlertTriangle, ArrowLeft } from "lucide-react";
import { ClinicalReport } from "../types";

interface ReportViewerProps {
  report: ClinicalReport;
  onBack: () => void;
}

export function ReportViewer({ report, onBack }: ReportViewerProps) {
  // Format dates elegantly
  const formatFullDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString("en-PK", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return isoString;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-slate-50 p-4 sm:p-8 font-sans" id="report-viewing-container">
      {/* Back to portal button */}
      <div className="max-w-4xl mx-auto mb-6 print:hidden">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition bg-slate-200/60 p-2.5 rounded-xl cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Patient Portal</span>
        </button>
      </div>

      {/* Main Clinical Report Document Container */}
      <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden print:shadow-none print:border-none print:rounded-none">
        
        {/* Document Header representation */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 border-b border-rose-500/15">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-emerald-500 flex items-center justify-center text-slate-950 font-black">LL</div>
                <h1 className="font-display font-black text-lg sm:text-2xl tracking-tight uppercase">
                  LAHORE MEDICAL LAB
                </h1>
              </div>
              <p className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase font-semibold pl-10 mt-1">
                Clinical Pathology &amp; Diagnostic Centre
              </p>
            </div>
            
            <div className="text-left sm:text-right font-mono text-xs text-slate-300">
              <p className="font-bold text-emerald-400 text-sm">INVOICE NO: {report.invoiceNo}</p>
              <p>PATIENT ID: {report.patientId}</p>
              <p className="text-[10px] text-slate-400">STATUS: Released (Online Certified)</p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Registered Patient</span>
              <span className="text-slate-200 font-bold block">{report.patientName}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Age / Gender</span>
              <span className="text-slate-200 font-bold block">{report.age} Years / {report.gender}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Ref. Specialist</span>
              <span className="text-slate-200 font-bold block truncate">{report.referringDoctor}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Reporting Date</span>
              <span className="text-slate-200 font-bold block">{formatFullDate(report.reportingDate).split(" @")[0]}</span>
            </div>
          </div>
        </div>

        {/* Dynamic Patient Alerts Bar */}
        <div className="bg-emerald-500/5 px-6 py-3 border-b border-emerald-500/10 flex flex-col sm:flex-row items-center justify-between gap-2.5 print:hidden">
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-800">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Digital QR Verified - QR Sealed Secure Lab Report</span>
          </div>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition-all px-4 py-1.5 rounded-lg shadow-sm cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>

        {/* Report Results Sections */}
        <div className="p-6 sm:p-8 space-y-8 font-sans">
          {report.panels.map((panel, panelIdx) => (
            <div key={panelIdx} className="space-y-4">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-2 flex items-center justify-between">
                <span>{panel.panelName}</span>
                <span className="text-[10px] font-mono text-slate-400 tracking-normal font-normal">Specimen: {report.sampleType}</span>
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold border-b border-slate-100">
                      <th className="py-2.5 w-1/3">Investigated Parameter</th>
                      <th className="py-2.5 text-center">Measured Level</th>
                      <th className="py-2.5 text-center">Unit</th>
                      <th className="py-2.5 text-center">Normal Reference buffer</th>
                      <th className="py-2.5 text-center w-36">Visual Indicator</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 uppercase">
                    {panel.results.map((res, resIdx) => {
                      const isHigh = res.status === "HIGH" || res.status === "CRITICAL";
                      const isLow = res.status === "LOW";
                      const isNormal = res.status === "NORMAL";

                      return (
                        <tr
                          key={resIdx}
                          className={`hover:bg-slate-50/50 transition ${
                            !isNormal ? "bg-amber-50/20" : ""
                          }`}
                        >
                          {/* Parameter Name */}
                          <td className="py-3.5 font-medium text-slate-800">
                            <div>
                              <p className="font-semibold">{res.parameter}</p>
                              {res.notes && (
                                <p className="text-[10px] text-slate-400 lowercase normal-case tracking-normal">
                                  Note: {res.notes}
                                </p>
                              )}
                            </div>
                          </td>

                          {/* Result Value */}
                          <td className="py-3.5 text-center">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-mono font-bold tracking-tight ${
                                isHigh
                                  ? "bg-rose-50 text-rose-600 border border-rose-200"
                                  : isLow
                                  ? "bg-blue-50 text-blue-600 border border-blue-200"
                                  : "text-slate-800"
                              }`}
                            >
                              {res.value}
                            </span>
                          </td>

                          {/* Unit */}
                          <td className="py-3.5 text-center font-mono text-slate-500 scale-90">
                            {res.unit}
                          </td>

                          {/* Reference Interval */}
                          <td className="py-3.5 text-center font-mono text-xs text-slate-600 lowercase normal-case">
                            {res.referenceRange}
                          </td>

                          {/* Linear bar range visual chart */}
                          <td className="py-3.5 px-2">
                            <div className="flex flex-col items-center">
                              <div className="w-28 bg-slate-100 h-1.5 rounded-full overflow-hidden flex relative">
                                {/* Normal range highlight */}
                                <div className="absolute left-[25%] right-[25%] bg-emerald-100 h-full"></div>
                                
                                {/* Actual Marker */}
                                <div
                                  className={`absolute top-0 w-2.5 h-full rounded-full shadow border border-white ${
                                    isHigh
                                      ? "bg-rose-500 left-[85%]"
                                      : isLow
                                      ? "bg-blue-500 left-[15%]"
                                      : "bg-emerald-500 left-[50%]"
                                  }`}
                                ></div>
                              </div>
                              <span
                                className={`text-[9px] font-mono font-extrabold mt-1 tracking-wider ${
                                  isHigh
                                    ? "text-rose-600"
                                    : isLow
                                    ? "text-blue-600"
                                    : "text-emerald-600"
                                }`}
                              >
                                {res.status}
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          {/* Expert Overall Pathology Assessment */}
          {report.overallAssessment && (
            <div className="bg-slate-900/5 border border-slate-200/80 p-5 rounded-2xl space-y-2 mt-8">
              <h4 className="flex items-center gap-2 text-xs font-bold text-slate-800 tracking-wide uppercase">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Executive Pathologist Overall Clinical Assessment</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic font-sans font-normal lowercase normal-case">
                "{report.overallAssessment}"
              </p>
            </div>
          )}
        </div>

        {/* Verification stamp column */}
        <div className="bg-slate-50 border-t border-slate-100 px-6 sm:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center uppercase text-center sm:text-left">
          
          <div className="space-y-1 font-sans text-xs">
            <h5 className="font-extrabold text-slate-800">Lahore Medical Laboratories Verification</h5>
            <p className="text-[10px] text-slate-500 font-normal">Registered under Punjab Health Commission PHC-3841</p>
            <p className="text-[10px] text-slate-500 font-normal">All systems processed under internationally standardized EQAS controls.</p>
          </div>

          {/* Pathologist Doctor Stamps Representation */}
          <div className="flex flex-col sm:flex-row gap-6 justify-end pt-4 sm:pt-0 font-sans">
            <div className="text-center font-serif text-[10px] lowercase normal-case border border-slate-200 p-2.5 bg-white rounded-lg inline-block shadow-sm">
              <p className="font-bold text-slate-800 uppercase text-[11px]">Prof. Dr. Munir Ahmad</p>
              <p className="text-slate-500 font-mono">MBBS, FCPS (Pathology)</p>
              <p className="text-slate-400 font-mono">Principal Consultant Pathologist</p>
              <div className="h-0.5 bg-emerald-500 w-12 mx-auto my-1.5"></div>
              <p className="text-emerald-600 uppercase font-mono font-bold text-[9px]">Verified Signed</p>
            </div>
            
            <div className="text-center font-serif text-[10px] lowercase normal-case border border-slate-200 p-2.5 bg-white rounded-lg inline-block shadow-sm">
              <p className="font-bold text-slate-800 uppercase text-[11px]">Dr. Tariq Hassan</p>
              <p className="text-slate-500 font-mono">MBBS, PhD (Clinical Chemistry)</p>
              <p className="text-slate-400 font-mono">Chief Clinical Biochemist</p>
              <div className="h-0.5 bg-emerald-500 w-12 mx-auto my-1.5"></div>
              <p className="text-emerald-600 uppercase font-mono font-bold text-[9px]">Verified Signed</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
