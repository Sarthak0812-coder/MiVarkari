import { useState } from "react";
import { useScrollReveal } from "../hooks/use-scroll-reveal";
import { Heart, CheckCircle } from "lucide-react";

const predefinedAmounts = [101, 251, 501, 1001, 2101, 5001];

export default function DonatePage() {
  const reveal = useScrollReveal();
  const [amount, setAmount] = useState<number | "">("");
  const [donated, setDonated] = useState(false);
  const [name, setName] = useState("Ramesh Deshmukh");

  const handleDonate = () => {
    if (!amount || amount <= 0) return;
    setDonated(true);
  };

  return (
    <div className="min-h-screen pt-20 pb-16 bg-spiritual">
      <div
        ref={reveal.ref}
        className={`container-app max-w-xl ${reveal.isVisible ? "animate-reveal-up" : "opacity-0"}`}
      >
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
          Donate to Temple Trust
        </h1>
        <p className="text-muted-foreground mb-8">
          Your contribution supports the upkeep of the Vitthal-Rukmini Temple and pilgrim services.
        </p>

        {!donated ? (
          <div className="card-spiritual p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">Select Amount</label>
              <div className="grid grid-cols-3 gap-3">
                {predefinedAmounts.map((a) => (
                  <button
                    key={a}
                    onClick={() => setAmount(a)}
                    className={`py-3 rounded-lg font-semibold text-sm transition-all active:scale-95 ${
                      amount === a
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    ₹{a.toLocaleString("en-IN")}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Or enter custom amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : "")}
                  className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                  placeholder="Enter amount"
                  min={1}
                />
              </div>
            </div>

            <button
              onClick={handleDonate}
              disabled={!amount || amount <= 0}
              className={`btn-saffron w-full text-base flex items-center justify-center gap-2 ${
                !amount || amount <= 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Heart className="w-4 h-4" />
              Donate ₹{amount ? Number(amount).toLocaleString("en-IN") : "0"}
            </button>
          </div>
        ) : (
          <div className="card-spiritual p-10 text-center animate-reveal-scale">
            <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="font-heading text-2xl font-bold mb-2">Thank You, {name}!</h2>
            <p className="text-muted-foreground mb-2">
              Your generous donation of <span className="font-semibold text-foreground">₹{Number(amount).toLocaleString("en-IN")}</span> has been received.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Receipt #DON-{Date.now().toString().slice(-8)}
            </p>
            <button
              onClick={() => { setDonated(false); setAmount(""); }}
              className="text-sm text-primary font-medium hover:underline"
            >
              Make Another Donation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
