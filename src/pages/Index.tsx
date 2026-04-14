import Navbar from "@/components/restaurant/Navbar";
import HeroSection from "@/components/restaurant/HeroSection";
import ReservationSection from "@/components/restaurant/ReservationSection";
import MenuSection from "@/components/restaurant/MenuSection";
import AboutSection from "@/components/restaurant/AboutSection";
import GallerySection from "@/components/restaurant/GallerySection";
import ReviewsSection from "@/components/restaurant/ReviewsSection";
import ContactSection from "@/components/restaurant/ContactSection";
import Footer from "@/components/restaurant/Footer";

export default function Index() {
  return (
    <div className="bg-surface-dark min-h-screen">
      <Navbar />
      <HeroSection />
      <MenuSection />
      <ReservationSection />
      <AboutSection />
      <GallerySection />
      <ReviewsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
