'use client';
import { ShrineProvider } from '@/lib/shrine-context';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import TryToday from '@/components/TryToday';
import Customizer from '@/components/Customizer';
import TopPicks from '@/components/TopPicks';
import Notes from '@/components/Notes';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import DetailModal from '@/components/DetailModal';
import ScrollReveal from '@/components/ScrollReveal';

export default function Page() {
  return (
    <ShrineProvider>
      <Nav />
      <Hero />
      <TryToday />
      <Customizer />
      <TopPicks />
      <Notes />
      <Contact />
      <Footer />
      <AuthModal />
      <DetailModal />
      <ScrollReveal />
    </ShrineProvider>
  );
}