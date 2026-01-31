import Hero from '@/components/Hero';
import HeritageSection from '@/components/HeritageSection';
import TeamSection from '@/components/TeamSection';
import LocationsButton from '@/components/LocationsButton';

export default function Home() {
  return (
    <main className="min-h-screen bg-stark-white">
      <Hero />
      <HeritageSection />
      <TeamSection />
      <LocationsButton />
    </main>
  );
}
