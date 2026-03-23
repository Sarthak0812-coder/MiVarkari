import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, ChevronRight } from "lucide-react";

interface Message {
  role: "user" | "bot";
  text: string;
}

const quickReplies = [
  "How to register?",
  "Book a darshan slot",
  "Find nearby hotels",
  "Prasadalay timings",
];

const botResponses: Record<string, string> = {
  "how to register?": "To register, go to the **Register** page. You can upload your Aadhaar card for automatic data extraction, or fill in details manually. You can also add family members during registration!",
  "book a darshan slot": "Visit the **Book Slot** page to select a date and time slot. You can book for up to 10 people at once. Slots fill up quickly during peak hours, so book early!",
  "find nearby hotels": "Check the **Nearby** page for hotels, lodges, and dharamshalas near the temple. You can filter by type and sort by price or distance.",
  "prasadalay timings": "The **Prasadalay** offers free meals:\n- Breakfast: 7–9 AM\n- Lunch: 11:30 AM–1:30 PM\n- Snacks: 4–5:30 PM\n- Dinner: 7:30–9:30 PM\n\nBook in advance to help reduce food wastage!",
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "🙏 Namaste! I'm your Pandharpur Yatra assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    setInput("");

    setTimeout(() => {
      const key = msg.toLowerCase().replace(/[?!.,]/g, "").trim();
      const matchedKey = Object.keys(botResponses).find((k) => key.includes(k.replace("?", "")));
      const response = matchedKey
        ? botResponses[matchedKey]
        : "I can help you with registration, slot booking, nearby services, and prasadalay. Try asking about any of these topics!";
      setMessages((prev) => [...prev, { role: "bot", text: response }]);
    }, 800);
  };

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:shadow-xl active:scale-95 transition-all"
        aria-label="Open chat assistant"
      >
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[340px] sm:w-[380px] h-[480px] rounded-2xl bg-card shadow-2xl border border-border flex flex-col overflow-hidden animate-reveal-up">
          {/* Header */}
          <div className="px-5 py-4 bg-primary text-primary-foreground">
            <h3 className="font-heading font-semibold">Yatra Assistant</h3>
            <p className="text-xs opacity-80">Ask me about your pilgrimage</p>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-secondary text-secondary-foreground rounded-bl-md"
                  }`}
                >
                  {m.text.split("\n").map((line, j) => (
                    <p key={j} className={j > 0 ? "mt-1" : ""}>
                      {line.split("**").map((seg, k) =>
                        k % 2 === 1 ? <strong key={k}>{seg}</strong> : seg
                      )}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Quick replies */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {quickReplies.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-saffron-light text-primary text-xs font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {q} <ChevronRight className="w-3 h-3" />
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-4 py-3 border-t border-border flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-ring focus:outline-none"
            />
            <button
              onClick={() => handleSend()}
              className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center active:scale-95 transition-transform"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
