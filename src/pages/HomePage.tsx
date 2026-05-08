import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Services from '../components/home/Services';
import Contact from '../components/home/Contact';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <About />
      <Services />
      <Contact />
    </div>
  );
}
