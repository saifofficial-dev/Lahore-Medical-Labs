import { useState, useMemo, FormEvent } from "react";
import { CheckCircle, Calendar, MapPin, User, Phone, Trash, ShoppingBag, Plus, CreditCard, Clock, Truck, ShieldCheck, HeartPulse } from "lucide-react";
import { LAB_TESTS, HEALTH_PACKAGES } from "../data";

interface HomeSamplingProps {
  cartedTests: string[];
  cartedPackages: string[];
  onRemoveTest: (testId: string) => void;
  onRemovePackage: (pkgId: string) => void;
  onBookingSuccess: (bookingData: any) => void;
  setTab: (tab: string) => void;
}

export function HomeSampling({
  cartedTests,
  cartedPackages,
  onRemoveTest,
  onRemovePackage,
  onBookingSuccess,
  setTab,
}: HomeSamplingProps) {
  // Booking Form fields
  const [patientName, setPatientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("06:00 AM - 08:00 AM (Ideal for Fasting)");
  const [paymentMethod, setPaymentMethod] = useState<"Cash on Collection" | "Online Card / EasyPaisa">("Cash on Collection");
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [successBooking, setSuccessBooking] = useState<any | null>(null);

  // Selected tests details
  const testsList = useMemo(() => {
    return cartedTests.map((id) => LAB_TESTS.find((t) => t.id === id)).filter(Boolean);
  }, [cartedTests]);

  const pkgsList = useMemo(() => {
    return cartedPackages.map((id) => HEALTH_PACKAGES.find((p) => p.id === id)).filter(Boolean);
  }, [cartedPackages]);

  const totalAmount = useMemo(() => {
    const tSum = testsList.reduce((sum, item) => sum + (item ? item.price : 0), 0);
    const pSum = pkgsList.reduce((sum, item) => sum + (item ? item.price : 0), 0);
    return tSum + pSum;
  }, [testsList, pkgsList]);

  // Dynamically constructed WhatsApp URL for quick home collect booking support
  const whatsappUrl = useMemo(() => {
    const listNames = [
      ...testsList.map((t) => t?.name),
      ...pkgsList.map((p) => p?.name),
    ];
    const itemsText = listNames.length > 0
      ? `\n\n*Selected Diagnostics:* \n- ${listNames.join("\n- ")}`
      : "";
    const totalText = totalAmount > 0 ? `\n*Estimated Total:* PKR ${totalAmount}` : "";
    const message = `Hello Lahore Medical Lab, I'd like to book a Home Sample Collection.${itemsText}${totalText}\n\nPlease help me schedule my phlebotomist dispatcher appointment!`;
    return `https://wa.me/923036088497?text=${encodeURIComponent(message)}`;
  }, [testsList, pkgsList, totalAmount]);

  // Handle Booking Submit
  const handleBookingFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorText("");

    if (!patientName.trim()) {
      setErrorText("Patient name is required.");
      return;
    }
    if (!phone.trim()) {
      setErrorText("Contact phone number is required.");
      return;
    }
    if (!address.trim()) {
      setErrorText("Home sample collection address is required.");
      return;
    }
    if (!preferredDate) {
      setErrorText("Please pick a preferred sampling date.");
      return;
    }
    if (testsList.length === 0 && pkgsList.length === 0) {
      setErrorText("Your cart is empty. Please select tests or packages prior to scheduling.");
      return;
    }

    setIsLoading(true);

    try {
      const selectedNames = [
        ...testsList.map((t) => t!.name),
        ...pkgsList.map((p) => p!.name),
      ];

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName,
          phone,
          email,
          address,
          preferredDate,
          preferredTime,
          tests: selectedNames,
          packages: [],
          totalAmount,
          paymentMethod,
        }),
      });

      const body = await response.json();
      if (body.success) {
        setSuccessBooking(body.booking);
        onBookingSuccess(body.booking);
      } else {
        setErrorText(body.message || "Failed to catalog your booking request.");
      }
    } catch {
      setErrorText("Unable to communicate with the scheduling gateway. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Render Confirmation success state
  if (successBooking) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 text-center font-sans space-y-6" id="booking-success-box">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce shadow">
          <CheckCircle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-mono font-bold uppercase">
            Order Confirmed successfully
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 mt-2">
            Home Phlebotomist Successfully Dispatched!
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
            Your sample collection request is registered under Reference ID: <strong className="font-mono text-emerald-600 font-bold uppercase">{successBooking.id}</strong>. A clinical phlebotomist is scheduled to assist at your address.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm text-left max-w-xl mx-auto divide-y divide-slate-100">
          <div className="pb-3.5 text-xs grid grid-cols-2 gap-3 font-sans">
            <div>
              <p className="text-slate-400 font-mono text-[9px] uppercase">Registered Patient Name</p>
              <p className="font-bold text-slate-800 mt-0.5">{successBooking.patientName}</p>
            </div>
            <div>
              <p className="text-slate-400 font-mono text-[9px] uppercase">Sampling Appointment Date/Slot</p>
              <p className="font-bold text-slate-800 mt-0.5 font-mono">{successBooking.preferredDate} &bull; {successBooking.preferredTime.split(" (")[0]}</p>
            </div>
            <div className="col-span-2">
              <p className="text-slate-400 font-mono text-[9px] uppercase">Collection Address</p>
              <p className="font-bold text-slate-800 mt-0.5">{successBooking.address}</p>
            </div>
          </div>

          <div className="py-3.5 text-xs space-y-2.5">
            <h4 className="font-bold text-slate-800 font-mono uppercase text-[10px]">Carted Diagnostics</h4>
            <div className="flex flex-wrap gap-1.5">
              {successBooking.tests.map((tName: string, id: number) => (
                <span key={id} className="bg-slate-100 text-slate-700 border border-slate-200/80 px-2 py-0.5 rounded font-mono text-[10px]">
                  {tName}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-3.5 flex justify-between items-center text-xs">
            <div>
              <p className="text-[9.5px] text-slate-400 font-mono uppercase">Settled Valuation</p>
              <p className="text-md font-bold text-slate-900 font-mono">PKR {successBooking.totalAmount}</p>
            </div>
            <span className="font-mono text-[10px] bg-slate-100 px-2 py-1.5 rounded-lg text-slate-600 font-bold border border-slate-200">
              {successBooking.paymentMethod}
            </span>
          </div>
        </div>

        <div className="bg-amber-50/45 border border-amber-500/10 p-4 rounded-2xl max-w-xl mx-auto text-left flex gap-3.5 items-start">
          <Clock className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed text-slate-650 font-normal">
            <h4 className="font-extrabold text-amber-700 uppercase font-mono text-[10px] leading-none">Important Sampling Preparation Reminder</h4>
            <p className="mt-1 lowercase normal-case text-slate-600">
              Please guarantee standard overnight <strong>fasting of 10-12 hours</strong> if your selected tests include Lipid Profiles or Fasting sugar. Normal plain pure water is permitted, but tea (Chai), juice, or food must not be consumed prior to blood extraction.
            </p>
          </div>
        </div>

        <div className="pt-4 flex gap-3 justify-center">
          <button
            onClick={() => setTab("portal")}
            className="bg-slate-900 text-white hover:bg-slate-800 font-bold px-6 py-3 rounded-xl text-xs transition cursor-pointer shadow-sm flex items-center gap-1.5"
          >
            Go to Patient Portal Dashboard
          </button>
          <button
            onClick={() => setTab("tests")}
            className="border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold px-5 py-3 rounded-xl text-xs transition cursor-pointer"
          >
            Explore More Tests
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans" id="home-collection-panel">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-mono font-bold tracking-wide uppercase">
          Free At-Home Collections
        </span>
        <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight leading-none mt-3">
          Schedule Phlebotomist Sampling
        </h2>
        <p className="text-slate-500 text-sm mt-3.5 leading-relaxed">
          Book state-of-the-art diagnostic home collection services throughout Lahore and Gujrat regions. Provide your preferred dates and home collection coordinate parameters below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Area: Multi step Form */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          
          <form onSubmit={handleBookingFormSubmit} className="space-y-6 text-left">
            
            {/* Step Header Title */}
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-emerald-600 mb-6 flex items-center gap-1.5 border-b border-slate-100 pb-3">
              <User className="w-5 h-5 text-emerald-500" />
              <span>Step 1: Patient Coordinates</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Full Name */}
              <div>
                <label className="text-[10px] font-mono uppercase text-slate-400 tracking-widest block mb-1">
                  Full Patient Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g., Muhammad Ali Raza"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="bg-slate-50 border border-slate-300 rounded-xl pl-11 pr-4 py-3 text-slate-800 text-sm w-full focus:ring-2 focus:ring-emerald-500/15 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Patient Phone Line */}
              <div>
                <label className="text-[10px] font-mono uppercase text-slate-400 tracking-widest block mb-1">
                  Pakistan Mobileno / Phone *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-400" />
                  <input
                    type="tel"
                    required
                    placeholder="e.g., 0300-1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-slate-50 border border-slate-300 rounded-xl pl-11 pr-4 py-3 text-slate-800 text-sm w-full focus:ring-2 focus:ring-emerald-500/15 focus:border-emerald-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Email ID */}
              <div>
                <label className="text-[10px] font-mono uppercase text-slate-400 tracking-widest block mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-400" />
                  <input
                    type="email"
                    placeholder="e.g., name@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-slate-50 border border-slate-300 rounded-xl pl-11 pr-4 py-3 text-slate-800 text-sm w-full focus:ring-2 focus:ring-emerald-500/15 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Geographic collection slot details */}
              <div>
                <label className="text-[10px] font-mono uppercase text-slate-400 tracking-widest block mb-1">
                  Appointment Dispatch Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-400" />
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="bg-slate-50 border border-slate-300 rounded-xl pl-11 pr-4 py-3 text-slate-800 text-sm w-full focus:ring-2 focus:ring-emerald-500/15 focus:border-emerald-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

            </div>

            {/* Home Address and Hours slots select */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4">
              
              {/* Full physical address details */}
              <div className="sm:col-span-2">
                <label className="text-[10px] font-mono uppercase text-slate-400 tracking-widest block mb-1">
                  Lahore / Gujrat Location Coordinates Address *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-400" />
                  <textarea
                    required
                    placeholder="Provide full House No, Street name, Sector/Phase, Area (e.g. Block H-3, Johar Town, Lahore)"
                    rows={2.5}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="bg-slate-50 border border-slate-300 rounded-xl pl-11 pr-4 py-3 text-slate-800 text-sm w-full focus:ring-2 focus:ring-emerald-500/15 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Pref hour slot selection dropdown */}
              <div>
                <label className="text-[10px] font-mono uppercase text-slate-400 tracking-widest block mb-1">
                  Dispatch Hours Time slot *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-400" />
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="bg-slate-50 border border-slate-300 rounded-xl pl-11 pr-4 py-3 text-slate-800 text-sm w-full focus:ring-2 focus:ring-emerald-500/15 focus:border-emerald-500 focus:outline-none appearance-none cursor-pointer"
                  >
                    <option>06:00 AM - 08:00 AM (Ideal for Fasting)</option>
                    <option>08:00 AM - 10:00 AM</option>
                    <option>10:00 AM - 12:00 PM</option>
                    <option>12:00 PM - 03:00 PM</option>
                    <option>05:00 PM - 08:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Settled payment select */}
              <div>
                <label className="text-[10px] font-mono uppercase text-slate-400 tracking-widest block mb-1">
                  Payment Preference *
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-400" />
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="bg-slate-50 border border-slate-300 rounded-xl pl-11 pr-4 py-3 text-slate-800 text-sm w-full focus:ring-2 focus:ring-emerald-500/15 focus:border-emerald-500 focus:outline-none appearance-none cursor-pointer"
                  >
                    <option>Cash on Collection</option>
                    <option>Online Card / EasyPaisa</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Error alerts block */}
            {errorText && (
              <div className="bg-rose-50 border border-rose-200 text-rose-600 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-rose-500 flex-shrink-0" />
                <span>{errorText}</span>
              </div>
            )}

            {/* Form actions triggers submit */}
            <div className="border-t border-slate-100 pt-6 flex justify-between items-center gap-4">
              <button
                type="button"
                onClick={() => setTab("tests")}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 transition py-3 rounded-lg"
              >
                &larr; Modify Carted Items
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-3.5 rounded-xl text-xs transition shadow-md shadow-emerald-500/10 cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Processing Appointment...</span>
                ) : (
                  <>
                    <Truck className="w-4.5 h-4.5" />
                    <span>Confirm Dispatch Booking</span>
                  </>
                )}
              </button>
            </div>

          </form>

          {/* WhatsApp Alternative Quick Booking Banner */}
          <div className="mt-8 p-5 bg-emerald-500/5 hover:bg-emerald-500/10 border border-[#25D366]/20 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center flex-shrink-0 border border-[#25D366]/20">
                <svg className="w-6.5 h-6.5 fill-[#25D366]" viewBox="0 0 24 24">
                  <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.908.533 3.692 1.457 5.22L2 22l4.912-1.396A9.954 9.954 0 0012.004 22c5.52 0 10-4.48 10-10C22.004 6.48 17.524 2 12.004 2zm5.796 14.128c-.24.672-1.212 1.236-1.74 1.308-.48.06-1.08.084-2.88-.66-2.316-.948-3.792-3.288-3.912-3.444-.108-.156-.912-1.212-.912-2.316 0-1.104.576-1.644.78-1.86.204-.216.444-.264.588-.264h.42c.132 0 .312-.048.48.36.18.432.612 1.488.66 1.596.048.108.084.228 0 .42-.084.18-.18.288-.312.444-.132.156-.276.324-.396.444-.132.132-.276.276-.12.54.156.264.696 1.14 1.488 1.848.792.708 1.464.924 1.74 1.056.276.132.432.108.588-.072.156-.18.672-.78.852-1.044.18-.264.36-.216.612-.12.252.096 1.584.744 1.86.876.276.132.456.204.516.312.06.108.06.624-.18 1.296z" />
                </svg>
              </div>
              <div className="space-y-1 text-left">
                <h4 className="font-bold text-slate-850 text-sm">Or Book Instantly via WhatsApp!</h4>
                <p className="text-xs text-slate-500 leading-normal">
                  Filling forms can be slow on mobile. Tap to instantly message your clinical cart items or a photo of your doctor's prescription directly to our Phlebotomy Coordinator (+92 303 6088497).
                </p>
              </div>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              referrerPolicy="no-referrer"
              className="bg-[#25D366] hover:bg-[#128C7E] text-white font-black px-5 py-3 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/10 cursor-pointer flex-shrink-0"
            >
              <span>Fast-Book via WhatsApp</span>
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.908.533 3.692 1.457 5.22L2 22l4.912-1.396A9.954 9.954 0 0012.004 22c5.52 0 10-4.48 10-10C22.004 6.48 17.524 2 12.004 2zm5.796 14.128c-.24.672-1.212 1.236-1.74 1.308-.48.06-1.08.084-2.88-.66-2.316-.948-3.792-3.288-3.912-3.444-.108-.156-.912-1.212-.912-2.316 0-1.104.576-1.644.78-1.86.204-.216.444-.264.588-.264h.42c.132 0 .312-.048.48.36.18.432.612 1.488.66 1.596.048.108.084.228 0 .42-.084.18-.18.288-.312.444-.132.156-.276.324-.396.444-.132.132-.276.276-.12.54.156.264.696 1.14 1.488 1.848.792.708 1.464.924 1.74 1.056.276.132.432.108.588-.072.156-.18.672-.78.852-1.044.18-.264.36-.216.612-.12.252.096 1.584.744 1.86.876.276.132.456.204.516.312.06.108.06.624-.18 1.296z" />
              </svg>
            </a>
          </div>

        </div>

        {/* Right Area: Booking Summary info panel layout */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 shadow-xl sticky top-28 space-y-6">
          <div className="flex items-center gap-2 text-emerald-400 border-b border-slate-800 pb-4">
            <ShoppingBag className="w-5 h-5" />
            <h3 className="text-xs font-extrabold tracking-widest uppercase font-mono text-slate-200">Sampling Appointment Summary</h3>
          </div>

          {testsList.length === 0 && pkgsList.length === 0 ? (
            <div className="text-center py-10 space-y-2.5">
              <ShoppingBag className="w-8 h-8 text-slate-700 mx-auto" />
              <p className="text-xs text-slate-500 italic lowercase normal-case">
                Cart is currently empty. Visit the clinical catalog list to add diagnostic parameters!
              </p>
            </div>
          ) : (
            <div className="space-y-5 text-left">
              
              {/* Selected List scroll panel */}
              <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                {pkgsList.map((pkg) => (
                  <div key={pkg?.id} className="bg-slate-950/60 p-3 rounded-xl border border-slate-850 flex justify-between items-center gap-1.5 text-xs">
                    <div>
                      <p className="text-[8px] bg-emerald-500 text-slate-950 font-mono font-bold px-1 rounded uppercase w-fit">Package</p>
                      <h4 className="font-semibold text-slate-200 mt-1 truncate max-w-[170px] uppercase">{pkg?.name}</h4>
                      <p className="font-mono text-[10px] text-emerald-400 font-bold">PKR {pkg?.price}</p>
                    </div>
                  </div>
                ))}

                {testsList.map((test) => (
                  <div key={test?.id} className="bg-slate-950/60 p-3 rounded-xl border border-slate-850 flex justify-between items-center gap-1.5 text-xs">
                    <div>
                      <p className="text-[8px] bg-slate-800 text-slate-400 font-mono font-bold px-1 rounded uppercase w-fit">Single Test</p>
                      <h4 className="font-semibold text-slate-200 mt-1 truncate max-w-[170px] uppercase">{test?.name}</h4>
                      <p className="font-mono text-[10px] text-emerald-400 font-bold">PKR {test?.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Subtotals summaries columns */}
              <div className="border-t border-slate-850 pt-4 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Gross Diagnostic Fees</span>
                  <span className="font-mono text-slate-200 font-bold font-medium">PKR {totalAmount}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Home Dispatch Transport</span>
                  <span className="text-emerald-400 font-mono font-black uppercase">FREE Collections</span>
                </div>
                <div className="flex justify-between items-end border-t border-slate-850 pt-3 mt-1.5">
                  <span className="text-xs text-slate-300">Total Appointment Valuation</span>
                  <span className="text-lg font-black font-mono text-slate-100">PKR {totalAmount}</span>
                </div>
              </div>

              <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-850 space-y-2">
                <div className="flex items-center gap-1.5">
                  <HeartPulse className="w-4.5 h-4.5 text-emerald-400 flex-shrink-0 animate-pulse" />
                  <span className="text-[10px] uppercase tracking-wider font-mono font-extrabold text-emerald-300">ISO Central Pathology Controls</span>
                </div>
                <p className="text-[9px] text-slate-500 leading-normal lowercase normal-case">
                  *All diagnostic samples extracted inside coolers are verified against molecular standards. Cold-chains are monitored constantly by computerized chips to prevent enzymatic decay.*
                </p>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
