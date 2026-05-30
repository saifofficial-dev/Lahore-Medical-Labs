export interface LabTest {
  id: string;
  name: string;
  category: "Hematology" | "Biochemistry" | "Immunology" | "PCR / Molecular" | "Radiology" | "Microbiology";
  price: number; // in PKR
  specimen: string;
  prep: string;
  tat: string; // Turnaround Time
  description: string;
}

export interface HealthPackage {
  id: string;
  name: string;
  tests: string[]; // Lists of test names
  price: number; // in PKR
  saving: number; // discount percentage or PKR saved
  description: string;
  target: string;
  features: string[];
}

export interface TestResult {
  parameter: string;
  value: number | string;
  unit: string;
  referenceRange: string;
  status: "NORMAL" | "HIGH" | "LOW" | "CRITICAL";
  notes?: string;
}

export interface ClinicalReport {
  invoiceNo: string;
  patientId: string;
  patientName: string;
  age: number;
  gender: string;
  referringDoctor: string;
  collectionDate: string;
  reportingDate: string;
  sampleType: string;
  panels: {
    panelName: string;
    results: TestResult[];
  }[];
  overallAssessment?: string;
}

export interface PatientProfile {
  patientId: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  email: string;
  phone: string;
  city: string;
  avatar?: string;
  reports: { invoiceNo: string; reportingDate: string; testName: string; status: string }[];
  vitalMetrics: {
    dates: string[];
    bloodSugarFasting: number[];
    cholesterolTotal: number[];
    systolicBP: number[];
    diastolicBP: number[];
  };
}

export interface BookingDetails {
  id: string;
  patientName: string;
  phone: string;
  email: string;
  address: string;
  preferredDate: string;
  preferredTime: string;
  tests: string[]; // Selected test IDs or names
  packages: string[]; // Selected package IDs or names
  totalAmount: number;
  paymentMethod: "Cash on Collection" | "Online Card / EasyPaisa";
  status: "Pending Confirmation" | "Phlebotomist Assigned" | "Samples Collected" | "Processing in Lab" | "Report Released";
  phlebotomist?: {
    name: string;
    phone: string;
    avatar?: string;
  };
}

export interface ChatMessage {
  role: "user" | "model";
  text: string;
}
