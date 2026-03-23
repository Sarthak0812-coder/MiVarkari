import { useState } from "react";
import { useScrollReveal } from "../hooks/use-scroll-reveal";
import { MapPin, Star, Phone, Filter } from "lucide-react";

const places = [
  { id: 1, name: "Hotel Vitthal Residency", type: "Hotel", price: 1200, distance: "0.5 km", rating: 4.3, available: true, phone: "+91 98765 12345" },
  { id: 2, name: "Chandrabhaga Dharamshala", type: "Dharamshala", price: 200, distance: "0.8 km", rating: 4.0, available: true, phone: "+91 98765 23456" },
  { id: 3, name: "Rukmini Lodge", type: "Lodge", price: 600, distance: "1.2 km", rating: 3.8, available: true, phone: "+91 98765 34567" },
  { id: 4, name: "Pandurang Guest House", type: "Hotel", price: 900, distance: "0.3 km", rating: 4.5, available: false, phone: "+91 98765 45678" },
  { id: 5, name: "Warkari Niwas", type: "Dharamshala", price: 0, distance: "1.5 km", rating: 4.1, available: true, phone: "+91 98765 56789" },
  { id: 6, name: "Vithoba Comfort Inn", type: "Hotel", price: 1800, distance: "0.7 km", rating: 4.6, available: true, phone: "+91 98765 67890" },
];

type FilterType = "All" | "Hotel" | "Lodge" | "Dharamshala";

export default function NearbyPage() {
  const reveal = useScrollReveal();
  const [filter, setFilter] = useState<FilterType>("All");
  const [sortBy, setSortBy] = useState<"distance" | "price">("distance");

  const filtered = places
    .filter((p) => filter === "All" || p.type === filter)
    .sort((a, b) => (sortBy === "price" ? a.price - b.price : parseFloat(a.distance) - parseFloat(b.distance)));

  return (
    <div className="min-h-screen pt-20 pb-16 bg-spiritual">
      <div
        ref={reveal.ref}
        className={`container-app max-w-3xl ${reveal.isVisible ? "animate-reveal-up" : "opacity-0"}`}
      >
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
          Nearby Services
        </h1>
        <p className="text-muted-foreground mb-6">
          Find accommodation and services near the Vitthal-Rukmini Temple.
        </p>

        {/* Map placeholder */}
        <div className="card-spiritual overflow-hidden mb-6">
          <div className="h-48 bg-secondary flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MapPin className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm">Interactive Map View</p>
              <p className="text-xs">Pandharpur, Maharashtra</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Filter className="w-4 h-4 text-muted-foreground" />
          {(["All", "Hotel", "Lodge", "Dharamshala"] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {f}
            </button>
          ))}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "distance" | "price")}
            className="ml-auto px-3 py-1.5 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-ring focus:outline-none"
          >
            <option value="distance">Sort: Distance</option>
            <option value="price">Sort: Price</option>
          </select>
        </div>

        <div className="space-y-4">
          {filtered.map((place) => (
            <div key={place.id} className={`card-spiritual p-5 ${!place.available ? "opacity-60" : ""}`}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-heading font-semibold text-foreground">{place.name}</h3>
                  <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <span className="px-2 py-0.5 rounded bg-secondary text-xs font-medium">{place.type}</span>
                    <span className="flex items-center gap-0.5"><Star className="w-3.5 h-3.5 text-temple-gold fill-temple-gold" />{place.rating}</span>
                    <span>{place.distance}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <Phone className="w-3.5 h-3.5" />
                    {place.phone}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-foreground tabular-nums">
                    {place.price === 0 ? "Free" : `₹${place.price}`}
                  </p>
                  <p className="text-xs text-muted-foreground">/night</p>
                  {place.available ? (
                    <span className="text-xs font-medium text-primary">Available</span>
                  ) : (
                    <span className="text-xs font-medium text-destructive">Full</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
