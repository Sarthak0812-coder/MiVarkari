import { useState } from "react";
import { useScrollReveal } from "../hooks/use-scroll-reveal";
import { Wallet, Plus, ArrowUpRight, ArrowDownLeft } from "lucide-react";

const transactions = [
  { id: 1, type: "credit", label: "Added money", amount: 2000, date: "Mar 20, 2026" },
  { id: 2, type: "debit", label: "Donation to Temple Trust", amount: 501, date: "Mar 19, 2026" },
  { id: 3, type: "credit", label: "Added money", amount: 1000, date: "Mar 18, 2026" },
  { id: 4, type: "debit", label: "Prasadalay booking", amount: 0, date: "Mar 18, 2026" },
  { id: 5, type: "debit", label: "Hotel advance payment", amount: 500, date: "Mar 17, 2026" },
];

const quickAmounts = [500, 1000, 2000, 5000];

export default function WalletPage() {
  const reveal = useScrollReveal();
  const [showAdd, setShowAdd] = useState(false);
  const [addAmount, setAddAmount] = useState<number | "">("");

  return (
    <div className="min-h-screen pt-20 pb-16 bg-spiritual">
      <div
        ref={reveal.ref}
        className={`container-app max-w-2xl ${reveal.isVisible ? "animate-reveal-up" : "opacity-0"}`}
      >
        <h1 className="font-heading text-3xl font-bold text-foreground mb-8">
          Digital Wallet
        </h1>

        {/* Balance card */}
        <div className="card-spiritual p-8 mb-6 bg-saffron-light/40">
          <div className="flex items-center gap-3 mb-2">
            <Wallet className="w-6 h-6 text-primary" />
            <span className="text-muted-foreground font-medium">Available Balance</span>
          </div>
          <p className="text-4xl font-bold text-foreground tabular-nums mb-4">₹2,450</p>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="btn-saffron text-sm py-2.5 inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add Money
          </button>
        </div>

        {/* Add money */}
        {showAdd && (
          <div className="card-spiritual p-6 mb-6 animate-reveal-up">
            <h2 className="font-heading font-semibold mb-3">Add Money</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {quickAmounts.map((a) => (
                <button
                  key={a}
                  onClick={() => setAddAmount(a)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    addAmount === a ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  ₹{a.toLocaleString("en-IN")}
                </button>
              ))}
            </div>
            <input
              type="number"
              placeholder="Or enter amount"
              value={addAmount}
              onChange={(e) => setAddAmount(e.target.value ? Number(e.target.value) : "")}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background mb-3 focus:ring-2 focus:ring-ring focus:outline-none"
            />
            <button className="btn-saffron w-full text-sm">Proceed to Add</button>
          </div>
        )}

        {/* Transactions */}
        <div className="card-spiritual p-6">
          <h2 className="font-heading font-semibold text-lg mb-4">Transaction History</h2>
          <div className="space-y-3">
            {transactions.map((t) => (
              <div key={t.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${t.type === "credit" ? "bg-saffron-light" : "bg-secondary"}`}>
                    {t.type === "credit" ? (
                      <ArrowDownLeft className="w-4 h-4 text-primary" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.label}</p>
                    <p className="text-xs text-muted-foreground">{t.date}</p>
                  </div>
                </div>
                <span className={`font-semibold text-sm tabular-nums ${t.type === "credit" ? "text-primary" : "text-foreground"}`}>
                  {t.type === "credit" ? "+" : "−"}₹{t.amount.toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
