import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import lotusIcon from "@/assets/lotus-icon (1).png";
import { Menu, X } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/register", label: "Register" },
  { to: "/booking", label: "Book Slot" },
  { to: "/prasadalay", label: "Prasadalay" },
  { to: "/nearby", label: "Nearby" },
  { to: "/donate", label: "Donate" },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border/50">
      <div className="container-app flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <img src={lotusIcon} alt="Pandharpur Yatra" className="h-8 w-8" />
          <span className="font-heading font-semibold text-lg text-foreground"> MiVarkari</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? "bg-saffron-light text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/wallet" className="btn-saffron ml-2 text-sm py-2 px-4">
            Wallet
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-secondary"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-b border-border px-4 pb-4 animate-reveal-up">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${
                location.pathname === link.to
                  ? "bg-saffron-light text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/wallet"
            onClick={() => setMobileOpen(false)}
            className="block btn-saffron text-sm text-center mt-2"
          >
            Wallet
          </Link>
        </div>
      )}
    </nav>
  );
}
