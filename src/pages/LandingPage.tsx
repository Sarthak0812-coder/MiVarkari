import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-pandharpur (1).jpg";
import { useScrollReveal } from "../hooks/use-scroll-reveal";
import {
  CalendarDays,
  QrCode,
  Users,
  Wallet,
  UtensilsCrossed,
  MapPin,
  Heart,
  MessageCircle,
} from "lucide-react";

const features = [
  { icon: CalendarDays, title: "Slot Booking", desc: "Reserve your darshan time slot in advance", to: "/booking" },
  { icon: QrCode, title: "QR Ticket", desc: "Digital QR-based entry pass for quick verification", to: "/dashboard" },
  { icon: Users, title: "Family Booking", desc: "Book for your entire family in one go", to: "/register" },
  { icon: Wallet, title: "Digital Wallet", desc: "Cashless payments and donation management", to: "/wallet" },
  { icon: UtensilsCrossed, title: "Prasadalay", desc: "Book free meals to reduce food wastage", to: "/prasadalay" },
  { icon: MapPin, title: "Nearby Services", desc: "Find hotels, lodges, and dharamshalas", to: "/nearby" },
  { icon: Heart, title: "Donations", desc: "Contribute to the Pandharpur Temple Trust", to: "/donate" },
  { icon: MessageCircle, title: "AI Assistant", desc: "Get help with registration and navigation", to: "/dashboard" },
];

export default function LandingPage() {
  const heroReveal = useScrollReveal();
  const featuresReveal = useScrollReveal();
  const ctaReveal = useScrollReveal();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[600px] flex items-end">
        <img
          src={heroImg}
          alt="Pandharpur temple along the Chandrabhaga river at sunrise"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div
          ref={heroReveal.ref}
          className={`relative container-app pb-16 sm:pb-24 ${heroReveal.isVisible ? "animate-reveal-up" : "opacity-0"}`}
        >
          <p className="text-saffron-light font-medium text-sm tracking-wide uppercase mb-3">
            Pandharpur Pilgrimage Management
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-[1.1] max-w-2xl mb-4">
            Your Sacred Journey, Simplified
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-xl mb-8 leading-relaxed">
            Book darshan slots, manage your family, access digital tickets, and explore
            Pandharpur — all from one place.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/register" className="btn-saffron text-base">
              Register Now
            </Link>
            <Link
              to="/booking"
              className="px-6 py-3 rounded-lg font-medium text-primary-foreground border border-primary-foreground/30 hover:bg-primary-foreground/10 transition-colors"
            >
              Book a Slot
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-spiritual">
        <div
          ref={featuresReveal.ref}
          className={`container-app ${featuresReveal.isVisible ? "" : "opacity-0"}`}
        >
          <div className={`text-center mb-12 ${featuresReveal.isVisible ? "animate-reveal-up" : ""}`}>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Everything You Need
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              A complete digital companion for your Pandharpur yatra experience.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <Link
                key={f.title}
                to={f.to}
                className={`card-spiritual p-6 group cursor-pointer ${
                  featuresReveal.isVisible ? `animate-reveal-up delay-${(i % 4 + 1) * 100}` : ""
                }`}
              >
                <div className="w-11 h-11 rounded-lg bg-saffron-light flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <f.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-1">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div
          ref={ctaReveal.ref}
          className={`container-app text-center ${ctaReveal.isVisible ? "animate-reveal-scale" : "opacity-0"}`}
        >
          <div className="card-spiritual p-10 sm:p-16 bg-saffron-light/50">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Begin Your Pilgrimage Journey
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Register today to access slot booking, digital tickets, and all pilgrimage services.
            </p>
            <Link to="/register" className="btn-saffron text-base inline-block">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container-app text-center text-sm text-muted-foreground">
          <p>© 2026 Pandharpur Pilgrimage Management System. Made with devotion.</p>
        </div>
      </footer>
    </div>
  );
}
