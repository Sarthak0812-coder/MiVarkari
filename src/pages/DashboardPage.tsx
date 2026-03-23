import { QRCodeSVG } from "qrcode.react";
import { useScrollReveal } from "../hooks/use-scroll-reveal";
import {
  CalendarDays,
  QrCode,
  Wallet,
  Users,
  Bell,
  UtensilsCrossed,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const bookings = [
  { id: "BK-20260325-001", slot: "09:00 – 11:00 AM", date: "March 25, 2026", persons: 3 },
];

const familyMembers = [
  { name: "Ramesh Deshmukh", age: 45, relation: "Self" },
  { name: "Suman Deshmukh", age: 42, relation: "Spouse" },
  { name: "Aarav Deshmukh", age: 18, relation: "Son" },
];

const notifications = [
  { text: "Your darshan slot is in 2 days", time: "1h ago" },
  { text: "Prasadalay booking confirmed for lunch", time: "3h ago" },
  { text: "Welcome to Pandharpur Yatra 2026!", time: "1d ago" },
];

export default function DashboardPage() {
  const reveal = useScrollReveal();

  const qrData = JSON.stringify({
    bookingId: "BK-20260325-001",
    userId: "USR-RD-001",
    slot: "09:00-11:00",
    date: "2026-03-25",
    persons: 3,
    timestamp: Date.now(),
  });

  return (
    <div className="min-h-screen pt-20 pb-16 bg-spiritual">
      <div
        ref={reveal.ref}
        className={`container-app ${reveal.isVisible ? "animate-reveal-up" : "opacity-0"}`}
      >
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground">
            Namaste, Ramesh! 🙏
          </h1>
          <p className="text-muted-foreground">
            Your pilgrimage dashboard — everything in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* QR Ticket */}
            <div className="card-spiritual p-6">
              <div className="flex items-center gap-2 mb-4">
                <QrCode className="w-5 h-5 text-primary" />
                <h2 className="font-heading font-semibold text-lg">Your Darshan Pass</h2>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="bg-primary-foreground p-4 rounded-xl shadow-sm">
                  <QRCodeSVG
                    value={qrData}
                    size={160}
                    bgColor="#ffffff"
                    fgColor="hsl(20, 25%, 15%)"
                    level="M"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <p className="font-mono text-sm text-muted-foreground mb-1">BK-20260325-001</p>
                  <p className="text-foreground font-medium text-lg">March 25, 2026</p>
                  <p className="text-primary font-semibold">09:00 – 11:00 AM</p>
                  <p className="text-sm text-muted-foreground mt-1">3 persons</p>
                  <p className="text-xs text-muted-foreground mt-3 max-w-xs">
                    Show this QR code at the temple entrance for verification.
                  </p>
                </div>
              </div>
            </div>

            {/* Upcoming Bookings */}
            <div className="card-spiritual p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-primary" />
                  <h2 className="font-heading font-semibold text-lg">Upcoming Bookings</h2>
                </div>
                <Link to="/booking" className="text-sm text-primary font-medium hover:underline">
                  Book New
                </Link>
              </div>
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/50"
                >
                  <div>
                    <p className="font-medium text-foreground">{b.slot}</p>
                    <p className="text-sm text-muted-foreground">
                      {b.date} • {b.persons} persons
                    </p>
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-saffron-light text-primary">
                    Confirmed
                  </span>
                </div>
              ))}
            </div>

            {/* Family */}
            <div className="card-spiritual p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <h2 className="font-heading font-semibold text-lg">Family Members</h2>
                </div>
                <Link to="/register" className="text-sm text-primary font-medium hover:underline">
                  Manage
                </Link>
              </div>
              <div className="space-y-3">
                {familyMembers.map((m) => (
                  <div
                    key={m.name}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-saffron-light flex items-center justify-center text-sm font-semibold text-primary">
                        {m.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{m.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Age {m.age} • {m.relation}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Wallet */}
            <div className="card-spiritual p-6">
              <div className="flex items-center gap-2 mb-3">
                <Wallet className="w-5 h-5 text-primary" />
                <h2 className="font-heading font-semibold">Wallet</h2>
              </div>
              <p className="text-3xl font-bold text-foreground mb-1 tabular-nums">₹2,450</p>
              <p className="text-sm text-muted-foreground mb-4">Available balance</p>
              <Link
                to="/wallet"
                className="btn-saffron w-full text-sm text-center block py-2.5"
              >
                Manage Wallet
              </Link>
            </div>

            {/* Quick Actions */}
            <div className="card-spiritual p-6">
              <h2 className="font-heading font-semibold mb-3">Quick Actions</h2>
              <div className="space-y-2">
                {[
                  { icon: UtensilsCrossed, label: "Book Prasad", to: "/prasadalay" },
                  { icon: CalendarDays, label: "New Booking", to: "/booking" },
                ].map((action) => (
                  <Link
                    key={action.label}
                    to={action.to}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <action.icon className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">{action.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="card-spiritual p-6">
              <div className="flex items-center gap-2 mb-3">
                <Bell className="w-5 h-5 text-primary" />
                <h2 className="font-heading font-semibold">Notifications</h2>
              </div>
              <div className="space-y-3">
                {notifications.map((n, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    <div>
                      <p className="text-sm text-foreground">{n.text}</p>
                      <p className="text-xs text-muted-foreground">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
