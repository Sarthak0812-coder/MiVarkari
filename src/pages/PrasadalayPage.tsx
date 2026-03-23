import { useState } from "react";
import { useScrollReveal } from "../hooks/use-scroll-reveal";
import { UtensilsCrossed, Clock, Users, CheckCircle } from "lucide-react";

const meals = [
  { id: "1", name: "Breakfast (Poha + Chai)", time: "07:00 – 09:00 AM", capacity: 300, booked: 187 },
  { id: "2", name: "Lunch (Dal-Rice Thali)", time: "11:30 – 01:30 PM", capacity: 500, booked: 423 },
  { id: "3", name: "Evening Snack (Bhajani + Chai)", time: "04:00 – 05:30 PM", capacity: 200, booked: 89 },
  { id: "4", name: "Dinner (Chapati-Sabzi Thali)", time: "07:30 – 09:30 PM", capacity: 400, booked: 201 },
];

export default function PrasadalayPage() {
  const reveal = useScrollReveal();
  const [bookedMeal, setBookedMeal] = useState<string | null>(null);
  const [persons, setPersons] = useState(1);

  return (
    <div className="min-h-screen pt-20 pb-16 bg-spiritual">
      <div
        ref={reveal.ref}
        className={`container-app max-w-3xl ${reveal.isVisible ? "animate-reveal-up" : "opacity-0"}`}
      >
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
          Free Prasadalay
        </h1>
        <p className="text-muted-foreground mb-8">
          Book your free meals (Prasad) in advance to help reduce food wastage.
        </p>

        {/* Person selector */}
        <div className="card-spiritual p-5 mb-6">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-primary" />
            <span className="font-medium">Persons:</span>
            <div className="flex items-center gap-3">
              <button onClick={() => setPersons(Math.max(1, persons - 1))} className="w-8 h-8 rounded-md border border-input flex items-center justify-center hover:bg-secondary active:scale-95">−</button>
              <span className="font-semibold w-6 text-center">{persons}</span>
              <button onClick={() => setPersons(Math.min(10, persons + 1))} className="w-8 h-8 rounded-md border border-input flex items-center justify-center hover:bg-secondary active:scale-95">+</button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {meals.map((meal) => {
            const remaining = meal.capacity - meal.booked;
            const full = remaining <= 0;
            const isBooked = bookedMeal === meal.id;
            return (
              <div key={meal.id} className="card-spiritual p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <UtensilsCrossed className="w-4 h-4 text-primary" />
                      <h3 className="font-heading font-semibold text-foreground">{meal.name}</h3>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{meal.time}</span>
                      <span>{remaining} seats left</span>
                    </div>
                    <div className="w-48 h-1.5 bg-secondary rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${(meal.booked / meal.capacity) * 100}%` }}
                      />
                    </div>
                  </div>
                  {isBooked ? (
                    <span className="flex items-center gap-1 text-sm text-primary font-medium">
                      <CheckCircle className="w-4 h-4" /> Booked
                    </span>
                  ) : (
                    <button
                      onClick={() => setBookedMeal(meal.id)}
                      disabled={full}
                      className={`btn-saffron text-sm py-2 px-4 ${full ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {full ? "Full" : "Book"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
