import dish1 from "@/assets/dish-1.jpg";
import dish2 from "@/assets/dish-2.jpg";
import dish3 from "@/assets/dish-3.jpg";
import dish4 from "@/assets/dish-4.jpg";
import dish5 from "@/assets/dish-5.jpg";
import dish6 from "@/assets/dish-6.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import heroImg from "@/assets/hero-restaurant.jpg";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "starters" | "mains" | "desserts" | "drinks";
  image: string;
  available: boolean;
}

export interface Reservation {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  approved: boolean;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

export interface DayHours {
  day: string;
  closed: boolean;
  open: string;  // "HH:mm"
  close: string; // "HH:mm"
}

export interface RestaurantSettings {
  name: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  openingHours: string; // legacy summary string
  hours: DayHours[];
  socialMedia: { instagram: string; facebook: string; twitter: string };
}

const defaultMenu: MenuItem[] = [
  { id: "1", name: "Truffle Bruschetta", description: "Toasted sourdough with black truffle, aged parmesan & micro herbs", price: 18, category: "starters", image: dish5, available: true },
  { id: "2", name: "Seared Salmon", description: "Atlantic salmon with miso glaze, seasonal vegetables & dashi broth", price: 42, category: "mains", image: dish1, available: true },
  { id: "3", name: "Wagyu Tenderloin", description: "A5 Wagyu with truffle jus, roasted bone marrow & pomme purée", price: 68, category: "mains", image: dish2, available: true },
  { id: "4", name: "Chocolate Sphere", description: "Valrhona dark chocolate dome, gold leaf, raspberry coulis", price: 22, category: "desserts", image: dish3, available: true },
  { id: "5", name: "Golden Hour", description: "Aged whisky, honey syrup, orange bitters, gold flake", price: 24, category: "drinks", image: dish4, available: true },
  { id: "6", name: "Lobster Thermidor", description: "Butter-poached lobster tail with saffron cream & gruyère gratin", price: 58, category: "mains", image: dish6, available: true },
];

const defaultReviews: Review[] = [
  { id: "1", author: "Alexandra M.", rating: 5, text: "An absolutely extraordinary dining experience. The Wagyu was perfection and the ambiance is unmatched in the city.", date: "2026-03-15", approved: true },
  { id: "2", author: "James R.", rating: 5, text: "From the moment we walked in, every detail was impeccable. Chef Laurent's tasting menu is a work of art.", date: "2026-03-20", approved: true },
  { id: "3", author: "Sophie L.", rating: 4, text: "Stunning interior and exceptional service. The chocolate sphere dessert alone is worth the visit.", date: "2026-04-01", approved: true },
];

const defaultGallery: GalleryImage[] = [
  { id: "1", src: heroImg, alt: "Main dining room" },
  { id: "2", src: gallery1, alt: "Private dining" },
  { id: "3", src: gallery2, alt: "Bar area" },
  { id: "4", src: dish1, alt: "Seared salmon" },
  { id: "5", src: dish2, alt: "Wagyu tenderloin" },
  { id: "6", src: dish3, alt: "Chocolate sphere" },
];

const defaultSettings: RestaurantSettings = {
  name: "Aurum",
  tagline: "Where Every Dish Tells a Story",
  phone: "+1 (555) 890-1234",
  email: "reservations@aurum.com",
  address: "42 Gold Street, Manhattan, New York, NY 10005",
  openingHours: "Tue–Sun: 6:00 PM – 11:00 PM | Mon: Closed",
  socialMedia: { instagram: "#", facebook: "#", twitter: "#" },
};

function load<T>(key: string, fallback: T): T {
  try {
    const d = localStorage.getItem(key);
    return d ? JSON.parse(d) : fallback;
  } catch { return fallback; }
}
function save<T>(key: string, data: T) { localStorage.setItem(key, JSON.stringify(data)); }

export const store = {
  getMenu: (): MenuItem[] => load("aurum_menu", defaultMenu),
  setMenu: (m: MenuItem[]) => save("aurum_menu", m),
  getReservations: (): Reservation[] => load("aurum_reservations", []),
  setReservations: (r: Reservation[]) => save("aurum_reservations", r),
  addReservation: (r: Reservation) => { const all = store.getReservations(); all.push(r); store.setReservations(all); },
  getReviews: (): Review[] => load("aurum_reviews", defaultReviews),
  setReviews: (r: Review[]) => save("aurum_reviews", r),
  getGallery: (): GalleryImage[] => load("aurum_gallery", defaultGallery),
  setGallery: (g: GalleryImage[]) => save("aurum_gallery", g),
  getSettings: (): RestaurantSettings => load("aurum_settings", defaultSettings),
  setSettings: (s: RestaurantSettings) => save("aurum_settings", s),
};
