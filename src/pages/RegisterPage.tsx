import { useState } from "react";
import { useScrollReveal } from "../hooks/use-scroll-reveal";
import { Upload, UserPlus, Camera, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FamilyMember {
  id: string;
  name: string;
  age: string;
  gender: string;
}

export default function RegisterPage() {
  const reveal = useScrollReveal();
  const navigate = useNavigate();
  const [step, setStep] = useState<"aadhaar" | "form" | "done">("aadhaar");
  const [formData, setFormData] = useState({
    aadhaarNumber: "",
    name: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
  });
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [scanning, setScanning] = useState(false);

  const simulateAadhaarScan = () => {
    setScanning(true);
    setTimeout(() => {
      setFormData({
        aadhaarNumber: "9876 5432 1098",
        name: "Ramesh Deshmukh",
        age: "45",
        gender: "Male",
        phone: "9876543210",
        address: "123, Vithoba Chowk, Pune, Maharashtra",
      });
      setScanning(false);
      setStep("form");
    }, 2000);
  };

  const addFamilyMember = () => {
    setFamilyMembers([
      ...familyMembers,
      { id: crypto.randomUUID(), name: "", age: "", gender: "Male" },
    ]);
  };

  const updateFamilyMember = (id: string, field: string, value: string) => {
    setFamilyMembers(
      familyMembers.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const removeFamilyMember = (id: string) => {
    setFamilyMembers(familyMembers.filter((m) => m.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("done");
  };

  return (
    <div className="min-h-screen pt-20 pb-16 bg-spiritual">
      <div
        ref={reveal.ref}
        className={`container-app max-w-2xl ${reveal.isVisible ? "animate-reveal-up" : "opacity-0"}`}
      >
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
          Pilgrim Registration
        </h1>
        <p className="text-muted-foreground mb-8">
          Register yourself and your family for the Pandharpur yatra.
        </p>

        {/* Steps indicator */}
        <div className="flex items-center gap-2 mb-8">
          {["Aadhaar Scan", "Details", "Complete"].map((label, i) => {
            const stepIndex = i;
            const currentIndex = step === "aadhaar" ? 0 : step === "form" ? 1 : 2;
            return (
              <div key={label} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    stepIndex <= currentIndex
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {stepIndex < currentIndex ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    stepIndex + 1
                  )}
                </div>
                <span className="text-sm text-muted-foreground hidden sm:inline">{label}</span>
                {i < 2 && <div className="w-8 h-px bg-border" />}
              </div>
            );
          })}
        </div>

        {step === "aadhaar" && (
          <div className="card-spiritual p-8 text-center">
            <Camera className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="font-heading text-xl font-semibold mb-2">
              Scan Your Aadhaar Card
            </h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
              Upload an image of your Aadhaar card. Our AI will extract your details automatically.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={simulateAadhaarScan}
                disabled={scanning}
                className="btn-saffron inline-flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                {scanning ? "Scanning..." : "Upload Aadhaar Image"}
              </button>
              <button
                onClick={() => setStep("form")}
                className="px-6 py-3 rounded-lg border border-border font-medium text-muted-foreground hover:bg-secondary transition-colors"
              >
                Enter Manually
              </button>
            </div>
            {scanning && (
              <div className="mt-6 animate-reveal-up">
                <div className="w-48 h-2 bg-secondary rounded-full mx-auto overflow-hidden">
                  <div className="h-full bg-primary rounded-full animate-pulse w-3/4" />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  AI extracting details from Aadhaar...
                </p>
              </div>
            )}
          </div>
        )}

        {step === "form" && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="card-spiritual p-6 space-y-4">
              <h2 className="font-heading text-lg font-semibold">Personal Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Aadhaar Number</label>
                  <input
                    type="text"
                    value={formData.aadhaarNumber}
                    onChange={(e) => setFormData({ ...formData, aadhaarNumber: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                    placeholder="XXXX XXXX XXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                    placeholder="Age"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                    placeholder="98XXXXXXXX"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none resize-none"
                  placeholder="Full address"
                />
              </div>
            </div>

            {/* Family members */}
            <div className="card-spiritual p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-lg font-semibold">Family Members</h2>
                <button
                  type="button"
                  onClick={addFamilyMember}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  <UserPlus className="w-4 h-4" /> Add Member
                </button>
              </div>
              {familyMembers.length === 0 && (
                <p className="text-sm text-muted-foreground">No family members added yet.</p>
              )}
              {familyMembers.map((member, i) => (
                <div key={member.id} className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end p-3 rounded-lg bg-secondary/50">
                  <div>
                    <label className="block text-xs font-medium mb-1">Name</label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => updateFamilyMember(member.id, "name", e.target.value)}
                      className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:ring-2 focus:ring-ring focus:outline-none"
                      placeholder={`Member ${i + 1}`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Age</label>
                    <input
                      type="number"
                      value={member.age}
                      onChange={(e) => updateFamilyMember(member.id, "age", e.target.value)}
                      className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:ring-2 focus:ring-ring focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Gender</label>
                    <select
                      value={member.gender}
                      onChange={(e) => updateFamilyMember(member.id, "gender", e.target.value)}
                      className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:ring-2 focus:ring-ring focus:outline-none"
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFamilyMember(member.id)}
                    className="text-sm text-destructive hover:underline py-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <button type="submit" className="btn-saffron w-full text-base">
              Complete Registration
            </button>
          </form>
        )}

        {step === "done" && (
          <div className="card-spiritual p-10 text-center animate-reveal-scale">
            <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="font-heading text-2xl font-bold mb-2">Registration Complete!</h2>
            <p className="text-muted-foreground mb-6">
              Welcome, {formData.name || "Pilgrim"}! You can now book darshan slots.
            </p>
            <button
              onClick={() => navigate("/booking")}
              className="btn-saffron inline-block"
            >
              Book Your Slot
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
