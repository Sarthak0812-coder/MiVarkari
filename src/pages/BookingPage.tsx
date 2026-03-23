import { useState } from "react";
import { useScrollReveal } from "../hooks/use-scroll-reveal";
import { CalendarDays, Clock, Users, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SLOTS = [
  { id: "1", time: "05:00 – 07:00 AM", capacity: 500, booked: 312 },
  { id: "2", time: "07:00 – 09:00 AM", capacity: 500, booked: 478 },
  { id: "3", time: "09:00 – 11:00 AM", capacity: 500, booked: 245 },
  { id: "4", time: "11:00 – 01:00 PM", capacity: 500, booked: 189 },
  { id: "5", time: "01:00 – 03:00 PM", capacity: 500, booked: 97 },
  { id: "6", time: "03:00 – 05:00 PM", capacity: 500, booked: 356 },
  { id: "7", time: "05:00 – 07:00 PM", capacity: 500, booked: 421 },
  { id: "8", time: "07:00 – 09:00 PM", capacity: 500, booked: 134 },
];

export default function BookingPage() {
  const reveal = useScrollReveal();
  const navigate = useNavigate();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [groupSize, setGroupSize] = useState(1);
  const [booked, setBooked] = useState(false);

  const handleBook = () => {
    if (!selectedSlot) return;
    setBooked(true);
  };

  const selectedSlotData = SLOTS.find((s) => s.id === selectedSlot);

  return (
    <div className="min-h-screen pt-20 pb-16 bg-spiritual">
      <div
        ref={reveal.ref}
        className={`container-app max-w-3xl ${reveal.isVisible ? "animate-reveal-up" : "opacity-0"}`}
      >
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
          Book Darshan Slot
        </h1>
        <p className="text-muted-foreground mb-8">
          Select a convenient time slot for your darshan at Vitthal-Rukmini Temple.
        </p>

        {!booked ? (
          <>
            {/* Date picker (simplified) */}
            <div className="card-spiritual p-5 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <CalendarDays className="w-5 h-5 text-primary" />
                <h2 className="font-heading font-semibold">Select Date</h2>
              </div>
              <input
                type="date"
                defaultValue="2026-03-25"
                className="px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
              />
            </div>

            {/* Slots grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {SLOTS.map((slot) => {
                const remaining = slot.capacity - slot.booked;
                const full = remaining <= 0;
                const pct = (slot.booked / slot.capacity) * 100;
                return (
                  <button
                    key={slot.id}
                    disabled={full}
                    onClick={() => setSelectedSlot(slot.id)}
                    className={`card-spiritual p-5 text-left transition-all ${
                      selectedSlot === slot.id
                        ? "ring-2 ring-primary border-primary"
                        : ""
                    } ${full ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="font-medium text-foreground">{slot.time}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" /> {remaining} remaining
                      </span>
                      <span>{slot.capacity} total</span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${pct}%`,
                          backgroundColor:
                            pct > 90 ? "hsl(var(--destructive))" : pct > 70 ? "hsl(var(--temple-gold))" : "hsl(var(--primary))",
                        }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Group size */}
            <div className="card-spiritual p-5 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-5 h-5 text-primary" />
                <h2 className="font-heading font-semibold">Group Size</h2>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setGroupSize(Math.max(1, groupSize - 1))}
                  className="w-10 h-10 rounded-lg border border-input flex items-center justify-center font-bold text-lg hover:bg-secondary active:scale-95 transition-transform"
                >
                  −
                </button>
                <span className="text-xl font-semibold w-8 text-center">{groupSize}</span>
                <button
                  onClick={() => setGroupSize(Math.min(10, groupSize + 1))}
                  className="w-10 h-10 rounded-lg border border-input flex items-center justify-center font-bold text-lg hover:bg-secondary active:scale-95 transition-transform"
                >
                  +
                </button>
                <span className="text-sm text-muted-foreground">persons (max 10)</span>
              </div>
            </div>

            <button
              onClick={handleBook}
              disabled={!selectedSlot}
              className={`btn-saffron w-full text-base ${!selectedSlot ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Confirm Booking
            </button>
          </>
        ) : (
          <div className="card-spiritual p-10 text-center animate-reveal-scale">
            <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="font-heading text-2xl font-bold mb-2">Booking Confirmed!</h2>
            <p className="text-muted-foreground mb-1">
              Slot: {selectedSlotData?.time}
            </p>
            <p className="text-muted-foreground mb-6">
              {groupSize} person{groupSize > 1 ? "s" : ""} • March 25, 2026
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              className="btn-saffron inline-block"
            >
              View Dashboard & QR Ticket
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
