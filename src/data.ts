import { LabTest, HealthPackage, PatientProfile } from "./types";

export const LAB_TESTS: LabTest[] = [
  {
    id: "cbc",
    name: "Complete Blood Count (CBC)",
    category: "Hematology",
    price: 1100,
    specimen: "EDTA Whole Blood (Vene puncture)",
    prep: "No specific fasting required. Avoid heavy direct physical exercises right before testing.",
    tat: "6 Hours",
    description: "Evaluates key cellular blood components including red blood cells, white blood cells, hemoglobin, haematocrit, and platelets. Vital for detecting anemia, leukemia, or acute and chronic infections."
  },
  {
    id: "hba1c",
    name: "HbA1c (Glycated Hemoglobin)",
    category: "Biochemistry",
    price: 1500,
    specimen: "EDTA Whole Blood",
    prep: "No fasting necessary. Can be conducted at any clinic hour.",
    tat: "8 Hours",
    description: "Assesses average blood sugar concentrations over the preceding 2 to 3 months. Essential for screening, diagnostic tracking, and therapy supervision of Diabetes Mellitus."
  },
  {
    id: "fbs",
    name: "Fasting Blood Sugar (FBS)",
    category: "Biochemistry",
    price: 350,
    specimen: "Sodium Fluoride Plasma",
    prep: "Rigid 8 to 12 hours of overnight dietary fasting is strictly required. Only plain pure water is allowed.",
    tat: "4 Hours",
    description: "Measures blood glucose concentration after a fasting period. Standard test for predicting insulin resistance and diagnosing diabetes."
  },
  {
    id: "rbs",
    name: "Random Blood Sugar (RBS)",
    category: "Biochemistry",
    price: 350,
    specimen: "Sodium Fluoride Plasma",
    prep: "None. Sample can be collected at any point regardless of meal times.",
    tat: "3 Hours",
    description: "Evaluates blood glucose concentration at a random interval. Highly beneficial for diagnosing emergency hyperglycemia or tracking rapid fluctuations."
  },
  {
    id: "lipid",
    name: "Lipid Profile (Full Panel)",
    category: "Biochemistry",
    price: 2200,
    specimen: "Serum (Plain Tube)",
    prep: "Requires 10 to 12 hours of strict fasting. Plain pure water is permitted, but avoid alcohol or fat-heavy food the night before.",
    tat: "6 Hours",
    description: "Includes Total Cholesterol, HDL (good cholesterol), LDL (bad cholesterol), VLDL, and Triglycerides. Fundamental panel to evaluate cardiovascular risks and arterial plaque safety."
  },
  {
    id: "lft",
    name: "Liver Function Tests (LFTs)",
    category: "Biochemistry",
    price: 1950,
    specimen: "Serum (Plain Tube)",
    prep: "Overnight fasting of 8-10 hours is preferable but not strictly mandatory. Avoid taking paracetamol or liver-effecting drugs on morning of collection.",
    tat: "6 Hours",
    description: "Includes ALT (SGPT), AST (SGOT), Bilirubin (Total, Direct & Indirect), Alkaline Phosphatase (ALP), Total Protein, and Serum Albumin. Screens for hepatic cells irritation, biliary obstruction, or liver disease."
  },
  {
    id: "rft",
    name: "Renal Function Tests (RFTs)",
    category: "Biochemistry",
    price: 1800,
    specimen: "Serum & Plain Tube",
    prep: "Fasting of 8 hours is optimal. Please remain adequately hydrated.",
    tat: "6 Hours",
    description: "Measures Serum Creatinine, Blood Urea, Serum Uric Acid, and key electrolytes (Sodium, Potassium, Chloride). Crucial to evaluate filtration capacity and kidney performance."
  },
  {
    id: "tsh",
    name: "TSH (Thyroid Stimulating Hormone)",
    category: "Immunology",
    price: 1650,
    specimen: "Serum",
    prep: "Morning sample extraction is highly recommended due to diurnal hormone rhythm variations. Fasting is not required.",
    tat: "8 Hours",
    description: "Measures concentrations of the hormone that stimulates the thyroid. The initial screener for diagnosing hypothyroid or hyperthyroid states."
  },
  {
    id: "thyroid_profile",
    name: "Thyroid Profile (TSH, Free T3, Free T4)",
    category: "Immunology",
    price: 3200,
    specimen: "Serum (Plain Tube)",
    prep: "Fasting not strictly required. Best collected in the morning, prior to any thyroid hormone medicine intake.",
    tat: "8 Hours",
    description: "Provides a complete picture of active thyroid hormones (Free T3 and Free T4) alongside regulatory TSH. Screens for Hashimoto's, Grave's, or idiopathic hyper/hypothyroidism."
  },
  {
    id: "vit_d3",
    name: "Vitamin D3 (25-Hydroxy)",
    category: "Immunology",
    price: 3900,
    specimen: "Serum",
    prep: "No fasting is required. Inform phlebotomist if currently consuming high-dose therapeutic Vitamin D capsules.",
    tat: "12 Hours",
    description: "Quantifies the circulating levels of Vitamin D to measure storage status. Critical for bone health, calcium metabolic pathways, immunity levels, and psychological wellness."
  },
  {
    id: "vit_b12",
    name: "Vitamin B12",
    category: "Immunology",
    price: 3100,
    specimen: "Serum",
    prep: "Fasting is not required but recommended. Avoid biotin supplements 24 hours prior to blood collection.",
    tat: "12 Hours",
    description: "Measures Vitamin B12 levels. Vital for healthy nerve function, neural sheath maintenance, DNA synthesis, and preventing fatigue-inducing macrocytic anemia."
  },
  {
    id: "urine_re",
    name: "Urine Routine Examination (Urine R/E)",
    category: "Microbiology",
    price: 450,
    specimen: "First Morning Void Urine (sterile container)",
    prep: "Clean the genital area. Collect 'mid-stream' urine directly into the provided sterile container to avoid bacterial contamination.",
    tat: "3 Hours",
    description: "Comprehensive physical, chemical, and microscopic examination of urine. Highly critical to detect urinary tract infections (UTIs), kidney damage (proteinuria), or glycosuria."
  },
  {
    id: "dengue_ns1",
    name: "Dengue NS1 Antigen (Rapid / ELISA)",
    category: "PCR / Molecular",
    price: 1900,
    specimen: "Serum",
    prep: "None. Can be sampled at any hour since fever onset.",
    tat: "4 Hours",
    description: "Identifies the Dengue virus non-structural protein 1 during early acute infection stages. Essential during seasonal monsoon outbreaks in Lahore."
  },
  {
    id: "typhidot",
    name: "Typhidot (IgM & IgG Antibodies)",
    category: "Immunology",
    price: 1300,
    specimen: "Serum",
    prep: "None. Can be tested during active typhoid symptoms.",
    tat: "4 Hours",
    description: "Detects IgM and IgG antibodies formed against Salmonella typhi. Useful for rapid identification of typhoid/enteric fever."
  },
  {
    id: "dengue_pcr",
    name: "Dengue PCR (Qualitative RNA)",
    category: "PCR / Molecular",
    price: 5500,
    specimen: "EDTA / Serum",
    prep: "None. Best done within first 5 days of high-grade fever.",
    tat: "24 Hours",
    description: "Molecular PCR amplification to pinpoint exact Dengue viral RNA presence. Highly sensitive and precise diagnostic method."
  },
  {
    id: "ultrasound_ab",
    name: "Ultrasound Abdomen & Pelvis",
    category: "Radiology",
    price: 2500,
    specimen: "On-site imaging (No blood required)",
    prep: "Requires 6-8 hours of fasting to control gallbladder expansion and intestinal gas. Drink 4-6 glasses of water 1 hour before and do not urinate to keep bladder full.",
    tat: "1 Hour",
    description: "Ultrasonic imaging of intra-abdominal organs (Liver, Gallbladder, Spleen, Kidneys, Pancreas, Urinary Bladder, and Pelvic structures). Screens for stones, fatty liver, or inflammatory anomalies."
  },
  {
    id: "xray_chest",
    name: "X-Ray Chest (PA View)",
    category: "Radiology",
    price: 1200,
    specimen: "On-site radiological capture",
    prep: "Remove metal objects, jewelry, and wear a clinic-provided cotton gown.",
    tat: "1 Hour",
    description: "Radiological capture of lungs, cardiothoracic boundaries, rib cage structure, and diaphragm curves. Screens for pneumonia, bronchitis, cardiomegaly, or respiratory scarring."
  }
];

export const HEALTH_PACKAGES: HealthPackage[] = [
  {
    id: "pkg_basic",
    name: "Basic Health Screening Profile",
    tests: ["Complete Blood Count (CBC)", "Fasting Blood Sugar (FBS)", "Serum Creatinine", "Serum ALT (SGPT)", "Urine Routine Examination (Urine R/E)"],
    price: 2950,
    saving: 25,
    description: "Designed for general health assessment. Covers anemia check, organ screening, metabolic level, and standard urine checks.",
    target: "Ideal for routine annual checkups for any individual above 18 years.",
    features: [
      "CBC (detects anemia, systemic infections)",
      "FBS (checks basic diabetes levels)",
      "Serum Creatinine (basic filtration level)",
      "Serum ALT (basic liver toxicity)",
      "Urine R/E (spot silent UTIs, protein loss)"
    ]
  },
  {
    id: "pkg_executive",
    name: "Executive Overall Wellbeing Panel",
    tests: ["Complete Blood Count (CBC)", "HbA1c (Glycated Hb)", "Lipid Profile (Full)", "Liver Function Tests (LFTs)", "Renal Function Tests (RFTs)", "TSH (Thyroid)", "Vitamin D3 (25-Hydroxy)"],
    price: 9900,
    saving: 35,
    description: "Our gold standard wellness profile. Screens all core systems: complete metabolic rate, thyroid health, vitamin ratios, and cellular patterns.",
    target: "Highly recommended for busy professionals above 30 years with chronic stress or family health history.",
    features: [
      "Cardiovascular arterial panel (Full Lipids)",
      "3-Month Blood Sugar tracking (HbA1c)",
      "Complete metabolic organ clearance (LFTs & RFTs)",
      "Thyroid safety (TSH levels)",
      "Bone and immunological performance (Vitamin D3)"
    ]
  },
  {
    id: "pkg_diabetes",
    name: "Active Diabetes & Metabolic Panel",
    tests: ["Fasting Blood Sugar (FBS)", "HbA1c (Glycated Hb)", "Renal Function Tests (RFTs)", "Lipid Profile (Full)", "Urine Routine Examination (Urine R/E)"],
    price: 4950,
    saving: 30,
    description: "Targeted screen for individuals managing diabetes or diagnostic prediabetes tracking. Focuses on safe glycemic management and kidney filtration checks.",
    target: "Diabetic individuals or those experiencing symptoms like frequent hunger, thirst, or direct genetic diabetes histories.",
    features: [
      "Dynamic HbA1c average measurement",
      "Kidney safety under glucose pressure",
      "Lipids profile checking arterial health",
      "Urine protein loss surveillance"
    ]
  },
  {
    id: "pkg_senior",
    name: "Senior Citizens Golden Profile",
    tests: ["Complete Blood Count (CBC)", "Fasting Blood Sugar (FBS)", "Lipid Profile (Full)", "Liver Function Tests (LFTs)", "Renal Function Tests (RFTs)", "Thyroid Profile (TFT)", "Vitamin D3", "Uric Acid", "Urine Routine Examination (Urine R/E)"],
    price: 11950,
    saving: 40,
    description: "A comprehensive geriatric healthcare review tracking nutritional absorption, metabolism, kidney filtration, thyroid balance, and joint-soreness risk factor triggers.",
    target: "Elderly patients (Male & Female aged 55+).",
    features: [
      "Comprehensive joint check (Serum Uric Acid)",
      "Metabolic, endocrine, and lipid clearance parameters",
      "Active bone and skeletal tracking",
      "Urinary system monitoring"
    ]
  }
];

export const DEMO_PATIENTS: PatientProfile[] = [
  {
    patientId: "LA-88392",
    name: "Muhammad Ali",
    age: 42,
    gender: "Male",
    email: "m.ali@gmail.com",
    phone: "0300-1234567",
    city: "Lahore",
    reports: [
      { invoiceNo: "LL-2026-9876", reportingDate: "2026-05-28", testName: "Executive Overall Wellbeing Panel", status: "Released" }
    ],
    vitalMetrics: {
      dates: ["Jan 2026", "Mar 2026", "May 2026"],
      bloodSugarFasting: [112, 108, 104],
      cholesterolTotal: [260, 252, 245],
      systolicBP: [142, 138, 135],
      diastolicBP: [92, 88, 86]
    }
  },
  {
    patientId: "LA-45321",
    name: "Ayesha Khan",
    age: 38,
    gender: "Female",
    email: "ayesha@yahoo.com",
    phone: "0321-4567890",
    city: "Lahore",
    reports: [
      { invoiceNo: "LL-2026-1212", reportingDate: "2026-05-29", testName: "Active Diabetes & Metabolic Panel", status: "Released" }
    ],
    vitalMetrics: {
      dates: ["Dec 2025", "Feb 2026", "Apr 2026", "May 2026"],
      bloodSugarFasting: [126, 115, 98, 92],
      cholesterolTotal: [185, 190, 180, 182],
      systolicBP: [120, 118, 115, 116],
      diastolicBP: [80, 78, 77, 78]
    }
  },
  {
    patientId: "LA-12102",
    name: "Zainab Bilal",
    age: 29,
    gender: "Female",
    email: "zainab_bilal@live.com",
    phone: "0333-9992224",
    city: "Gujrat",
    reports: [
      { invoiceNo: "LL-2026-3434", reportingDate: "2026-05-29", testName: "Thyroid & Vitamin Screen Score", status: "Released" }
    ],
    vitalMetrics: {
      dates: ["Mar 2026", "May 2026"],
      bloodSugarFasting: [95, 94],
      cholesterolTotal: [198, 195],
      systolicBP: [110, 112],
      diastolicBP: [72, 74]
    }
  }
];

export const LAHORE_BRANCHES = [
  {
    name: "Lahore Lab (Thokar Niaz Baig Branch)",
    address: "Near Thokar Niaz Baig Station, Multan Road, Lahore",
    phone: "+92 303 6088497 (WhatsApp Only)",
    hours: "Open 24/7",
    services: ["Diagnostics Lab", "Home Collection Hub", "X-Ray / Chest Imaging", "Ultrasound Pelvis & Abdomen", "CT Scan (Associated)", "Pediatric Sampling Room"],
    mapQuery: "31.4697,74.2386",
    lat: 31.4697,
    lng: 74.2386,
    googleMapUrl: "https://www.google.com/maps/search/?api=1&query=Lahore+Lab+Near+Thokar+Niaz+Baig+Station+Multan+Road+Lahore"
  },
  {
    name: "DHA Collection Centre & Radiology",
    address: "Sector CCA, Phase 5, Near Jalal Sons, DHA, Lahore",
    phone: "042-35698412, 0321-8884441",
    hours: "07:00 AM - 11:59 PM (Sunday Closed)",
    services: ["Clinical Diagnostics", "Urgent Dengue NS1 / PCR Room", "Home Phlebotomy dispatch", "ECG Panel"],
    mapQuery: "Lahore Medical Lab DHA Lahore",
    lat: 31.470556,
    lng: 74.409167,
    googleMapUrl: "https://www.google.com/maps/search/?api=1&query=Sector+CCA,+Phase+5,+Near+Jalal+Sons,+DHA,+Lahore"
  },
  {
    name: "Johar Town Branch Centre",
    address: "Block G-3, Near Doctor's Hospital, Johar Town, Lahore",
    phone: "042-35182963",
    hours: "08:00 AM - 10:00 PM (Weekly open)",
    services: ["Clinical Chemistry", "Microbiology Sampling", "Free Sample Collection drop-off point"],
    mapQuery: "31.4750214,74.2413483",
    lat: 31.4750214,
    lng: 74.2413483,
    googleMapUrl: "https://www.google.com/maps/place/31%C2%B028'30.1%22N+74%C2%B014'28.9%22E/@31.4750214,74.2387734,609m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d31.4750214!4d74.2413483?hl=en&entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D"
  },
  {
    name: "Iqbal Town Collection Booth",
    address: "Moon Market, Main Boulevard, Allama Iqbal Town, Lahore",
    phone: "042-37841525",
    hours: "08:00 AM - 10:00 PM",
    services: ["Diagnostics Blood Extraction", "Urine Container collection", "Report printing kiosk"],
    mapQuery: "Lahore Medical Lab Iqbal Town Lahore",
    lat: 31.524722,
    lng: 74.288333,
    googleMapUrl: "https://www.google.com/maps/search/?api=1&query=Moon+Market,+Main+Boulevard,+Allama+Iqbal+Town,+Lahore"
  },
  {
    name: "Lahore Medical Lab (Gujrat Branch)",
    address: "Bhimber Road, Opposite District Headquarters Hospital (DHQ), Gujrat",
    phone: "053-3725412, 0301-8884442",
    hours: "08:00 AM - 10:00 PM (Weekly open)",
    services: ["Main Lab System in Gujrat Division", "Home Sampling Desk", "X-Ray Clinic"],
    mapQuery: "Lahore Medical Lab Gujrat",
    lat: 32.585556,
    lng: 74.078611,
    googleMapUrl: "https://www.google.com/maps/search/?api=1&query=Bhimber+Road,+Opposite+District+Headquarters+Hospital,+Gujrat"
  }
];
