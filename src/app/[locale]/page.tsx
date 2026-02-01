import Hero from '@/components/Hero';
import HeritageSection from '@/components/HeritageSection';
import BukonzoJourneySection from '@/components/BukonzoJourneySection';
import LocationsButton from '@/components/LocationsButton';
import FeaturedProductsSection from '@/components/FeaturedProductsSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-stark-white">
      <Hero />
      <FeaturedProductsSection />
      <BukonzoJourneySection />
      <HeritageSection />
      <LocationsButton />
    </main>
  );
}
