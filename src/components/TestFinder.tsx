import { useState, useMemo } from "react";
import { Search, Filter, ShoppingCart, Info, CheckCircle, Plus, Trash, ArrowRight, ShieldAlert, BadgeInfo } from "lucide-react";
import { LAB_TESTS, HEALTH_PACKAGES } from "../data";
import { LabTest, HealthPackage } from "../types";

interface TestFinderProps {
  cartedTests: string[]; // List of Test IDs
  cartedPackages: string[]; // List of Package IDs
  onAddTest: (testId: string) => void;
  onRemoveTest: (testId: string) => void;
  onAddPackage: (pkgId: string) => void;
  onRemovePackage: (pkgId: string) => void;
  onProceedToBooking: () => void;
}

export function TestFinder({
  cartedTests,
  cartedPackages,
  onAddTest,
  onRemoveTest,
  onAddPackage,
  onRemovePackage,
  onProceedToBooking,
}: TestFinderProps) {
  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  // Selected test modal details
  const [selectedDetailsTest, setSelectedDetailsTest] = useState<LabTest | null>(null);

  // Filtered lists computation
  const filteredTests = useMemo(() => {
    return LAB_TESTS.filter((test) => {
      const matchesSearch =
        test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "All" || test.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const categories = ["All", "Hematology", "Biochemistry", "Immunology", "PCR / Molecular", "Radiology", "Microbiology"];

  // Helper values
  const totalCartAmount = useMemo(() => {
    const testsSum = cartedTests.reduce((sum, id) => {
      const test = LAB_TESTS.find((t) => t.id === id);
      return sum + (test ? test.price : 0);
    }, 0);

    const pkgsSum = cartedPackages.reduce((sum, id) => {
      const pkg = HEALTH_PACKAGES.find((p) => p.id === id);
      return sum + (pkg ? pkg.price : 0);
    }, 0);

    return testsSum + pkgsSum;
  }, [cartedTests, cartedPackages]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans" id="test-finder-panel">
      
      {/* Intro section */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-mono font-bold tracking-wide uppercase">
          Diagnostic Directory
        </span>
        <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-905 tracking-tight leading-none mt-3">
          Explore Our Tests &amp; Healthcare Packages
        </h2>
        <p className="text-slate-500 text-sm mt-3.5 leading-relaxed">
          Search over 100+ clinical parameters, hormones profiles and radiology procedures. Add items directly to your diagnostic cart of choices to book our ISO certified Phlebotomist dispatch for home sampling collections.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Area: Tests table Finder, package blocks, filters */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* A. Dynamic Health Screening Packages Slider Grid */}
          <div>
            <h3 className="text-base font-extrabold uppercase tracking-wide text-slate-800 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span>Recommended Wellness Screening Packages</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {HEALTH_PACKAGES.map((pkg) => {
                const isSelected = cartedPackages.includes(pkg.id);
                return (
                  <div
                    key={pkg.id}
                    className={`bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between ${
                      isSelected ? "border-emerald-500 ring-2 ring-emerald-500/5 bg-emerald-500/[0.01]" : "border-slate-200"
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-sm font-extrabold text-slate-900 tracking-tight leading-snug uppercase">
                          {pkg.name}
                        </h4>
                        <span className="flex-shrink-0 text-[10px] font-mono bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full">
                          Save {pkg.saving}%
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-2 lowercase normal-case leading-normal">
                        {pkg.description}
                      </p>
                      
                      <div className="mt-4 space-y-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Covers {pkg.tests.length} Paramount Parameters</p>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {pkg.tests.map((t, tid) => (
                            <span key={tid} className="text-[9px] bg-white border border-slate-200/80 text-slate-600 px-1.5 py-0.5 rounded font-mono">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] text-slate-400 block line-through">PKR {Math.round(pkg.price * (1 + pkg.saving / 100))}</span>
                        <span className="text-md font-extrabold text-slate-900 font-mono">PKR {pkg.price}</span>
                      </div>

                      {isSelected ? (
                        <button
                          onClick={() => onRemovePackage(pkg.id)}
                          className="bg-rose-50 text-rose-600 hover:bg-rose-100 px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                        >
                          <Trash className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => onAddPackage(pkg.id)}
                          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-sm shadow-emerald-500/10 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Buy Package</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* B. Lab Test catalog with custom filters */}
          <div className="space-y-4">
            <h3 className="text-base font-extrabold uppercase tracking-wide text-slate-800 flex items-center gap-2">
              <Filter className="w-5 h-5 text-emerald-500" />
              <span>Clinical Test Catalog (100+ Parameter Assays)</span>
            </h3>

            {/* Filter controls row */}
            <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex flex-col md:flex-row gap-3.5 items-stretch md:items-center justify-between">
              
              {/* Search box */}
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-3.5 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search CBC, ALT, Thyroid, Blood Group..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-xl pl-11 pr-4 py-2.5 text-slate-800 text-sm w-full focus:ring-2 focus:ring-emerald-500/15 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              {/* Tag Category scrollbar */}
              <div className="flex gap-1 overflow-x-auto no-scrollbar pb-1 max-w-full">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                      selectedCategory === cat
                        ? "bg-slate-900 text-white font-bold"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

            </div>

            {/* Catalog Grid panel */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="py-3 px-4">Test Description</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4 text-center">Specimen</th>
                      <th className="py-3 px-4 text-center">Reports TAT</th>
                      <th className="py-3 px-4 text-right">Price</th>
                      <th className="py-3 px-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredTests.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-10 text-center text-slate-400 italic">
                          No diagnostic parameters match your keyword filter values. Try searching 'Thyroid' or 'Blood'.
                        </td>
                      </tr>
                    ) : (
                      filteredTests.map((test) => {
                        const isAdded = cartedTests.includes(test.id);
                        return (
                          <tr key={test.id} className="hover:bg-slate-50/60 transition group">
                            
                            {/* Test Name & info hover trigger */}
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2 max-w-xs sm:max-w-md">
                                <div>
                                  <h4 className="font-bold text-slate-900 uppercase flex items-center gap-1.5 group-hover:text-emerald-600 transition">
                                    <span>{test.name}</span>
                                    <button
                                      onClick={() => setSelectedDetailsTest(test)}
                                      className="text-slate-400 hover:text-slate-800 transition cursor-pointer"
                                      title="Read Preparation Instructions"
                                    >
                                      <Info className="w-3.5 h-3.5 inline" />
                                    </button>
                                  </h4>
                                  <p className="text-[11px] text-slate-400 truncate max-w-[240px] mt-0.5">
                                    {test.description}
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* Category Label */}
                            <td className="py-4 px-4 font-semibold text-slate-600">
                              <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] tracking-wide font-mono">
                                {test.category}
                              </span>
                            </td>

                            {/* Specimen */}
                            <td className="py-4 px-4 text-center text-xs text-slate-500 font-mono">
                              {test.specimen.split(" (")[0]}
                            </td>

                            {/* TAT */}
                            <td className="py-4 px-4 text-center text-xs text-slate-500 font-mono">
                              {test.tat}
                            </td>

                            {/* Price */}
                            <td className="py-4 px-4 text-right font-mono font-bold text-slate-900 shrink-0">
                              PKR {test.price}
                            </td>

                            {/* Action Buttons */}
                            <td className="py-4 px-1 text-center">
                              {isAdded ? (
                                <button
                                  onClick={() => onRemoveTest(test.id)}
                                  className="text-[11px] font-bold text-rose-600 hover:text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg transition-all cursor-pointer mx-auto flex items-center justify-center gap-0.5"
                                >
                                  <span>Added</span>
                                </button>
                              ) : (
                                <button
                                  onClick={() => onAddTest(test.id)}
                                  className="text-[11px] font-bold text-emerald-500 bg-emerald-50 hover:bg-emerald-500 hover:text-slate-950 px-3 py-1.5 rounded-lg border border-emerald-500/30 transition-all cursor-pointer mx-auto flex items-center justify-center gap-0.5 hover:shadow-sm"
                                >
                                  <Plus className="w-3 h-3" />
                                  <span>Cart</span>
                                </button>
                              )}
                            </td>

                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>

        {/* Right Area: Dynamic Shopping Cart Drawer Sticky section */}
        <div className="lg:col-span-4 sticky top-28 bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-emerald-400 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 animate-pulse" />
              <span>Phlebotomy Selection Cart</span>
            </h3>
            <span className="font-mono text-xs text-emerald-400 bg-slate-850 px-2 py-0.5 rounded font-bold">
              {cartedTests.length + cartedPackages.length} Selected
            </span>
          </div>

          {cartedTests.length === 0 && cartedPackages.length === 0 ? (
            <div className="text-center py-10 space-y-3.5">
              <ShoppingCart className="w-10 h-10 text-slate-700 mx-auto" />
              <p className="text-xs text-slate-500 italic max-w-xs mx-auto">
                No items are currently in your collection cart. Select tests or health profiles on the left sidebar to schedule home sample drawing!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Selected List scrollbar */}
              <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                
                {/* Health Packages item line */}
                {cartedPackages.map((id) => {
                  const pItem = HEALTH_PACKAGES.find((pkg) => pkg.id === id);
                  if (!pItem) return null;
                  return (
                    <div key={id} className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 flex justify-between items-center gap-2">
                      <div className="truncate text-left">
                        <span className="text-[8px] bg-emerald-500 text-slate-950 font-bold px-1 rounded block w-fit uppercase font-mono">Pkg Offer</span>
                        <h4 className="text-xs font-bold text-slate-200 truncate mt-1 uppercase max-w-[150px]">{pItem.name}</h4>
                        <p className="text-[10px] font-mono text-emerald-400 font-medium leading-none mt-1">PKR {pItem.price}</p>
                      </div>
                      <button
                        onClick={() => onRemovePackage(id)}
                        className="text-slate-500 hover:text-rose-400 p-1.5 transition cursor-pointer"
                        title="Remove Package"
                      >
                        <Trash className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}

                {/* Individual tests item lines */}
                {cartedTests.map((id) => {
                  const tItem = LAB_TESTS.find((test) => test.id === id);
                  if (!tItem) return null;
                  return (
                    <div key={id} className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 flex justify-between items-center gap-2">
                      <div className="truncate text-left">
                        <span className="text-[8px] bg-slate-800 text-slate-400 font-bold px-1 rounded block w-fit uppercase font-mono">Blood Lab</span>
                        <h4 className="text-xs font-bold text-slate-200 truncate mt-1 uppercase max-w-[150px]">{tItem.name}</h4>
                        <p className="text-[10px] font-mono text-emerald-400 font-medium leading-none mt-1">PKR {tItem.price}</p>
                      </div>
                      <button
                        onClick={() => onRemoveTest(id)}
                        className="text-slate-500 hover:text-rose-400 p-1.5 transition cursor-pointer"
                        title="Remove Test"
                      >
                        <Trash className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}

              </div>

              {/* Subtotal summary section */}
              <div className="border-t border-slate-800/80 pt-4 space-y-2.5 font-sans">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Home collection service fee</span>
                  <span className="text-emerald-400 font-bold font-mono">FREE Collection</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-xs text-slate-300">Total Valuation</span>
                  <span className="text-lg font-black font-mono text-slate-100">PKR {totalCartAmount}</span>
                </div>
              </div>

              {/* Action checkout button */}
              <button
                onClick={onProceedToBooking}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-3.5 rounded-xl text-xs w-full transition shadow-md shadow-emerald-500/10 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Proceed To Home Sampling</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-start gap-2 bg-slate-950/40 p-3 rounded-xl border border-slate-800">
                <ShieldAlert className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <p className="text-[9.5px] text-slate-500 leading-normal lowercase normal-case">
                  *All diagnostic samples are processed at our ISO 9001:2015 Accredited central laboratory platform under cold-chain surveillance parameters.*
                </p>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Test details Modal Dialog rendering */}
      {selectedDetailsTest && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative text-left">
            <h4 className="text-xs font-mono uppercase text-emerald-600 font-extrabold tracking-wider">Test Details Parameter</h4>
            <h3 className="font-display font-black text-xl text-slate-900 uppercase mt-1 leading-tight border-b border-slate-100 pb-3">{selectedDetailsTest.name}</h3>

            <div className="space-y-4.5 mt-5">
              
              <div>
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-extrabold">Physiological Outline</p>
                <p className="text-xs leading-relaxed text-slate-600 mt-1">{selectedDetailsTest.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <p className="text-[9px] font-mono text-slate-400 uppercase tracking-wide">Primary Specimen Needed</p>
                  <p className="text-xs font-bold font-semibold text-slate-800 mt-1 capitalize">{selectedDetailsTest.specimen}</p>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <p className="text-[9px] font-mono text-slate-400 uppercase tracking-wide">Reporting Duration (TAT)</p>
                  <p className="text-xs font-bold font-semibold text-slate-800 mt-1 uppercase font-mono">{selectedDetailsTest.tat}</p>
                </div>
              </div>

              <div className="bg-amber-50/45 border border-amber-500/10 p-3 rounded-xl flex gap-2.5 items-start">
                <BadgeInfo className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <p className="text-[10px] font-mono text-amber-600 font-extrabold uppercase leading-none">Crucial Patient Preparation Guideline</p>
                  <p className="text-xs leading-normal text-slate-600 mt-1 leading-relaxed lowercase normal-case">{selectedDetailsTest.prep}</p>
                </div>
              </div>

              <div className="flex gap-4 items-center justify-between border-t border-slate-100 pt-5 mt-6">
                <span className="text-md font-extrabold text-slate-900 font-mono">PKR {selectedDetailsTest.price}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedDetailsTest(null)}
                    className="border border-slate-200 text-slate-700 hover:bg-slate-15 px-4.5 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all"
                  >
                    Close Sheet
                  </button>
                  {cartedTests.includes(selectedDetailsTest.id) ? (
                    <button
                      onClick={() => {
                        onRemoveTest(selectedDetailsTest.id);
                        setSelectedDetailsTest(null);
                      }}
                      className="bg-rose-50 text-rose-600 hover:bg-rose-100 px-4.5 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all"
                    >
                      Delete Cart
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        onAddTest(selectedDetailsTest.id);
                        setSelectedDetailsTest(null);
                      }}
                      className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4.5 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition shadow-md shadow-emerald-500/10"
                    >
                      Add To Cart
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
