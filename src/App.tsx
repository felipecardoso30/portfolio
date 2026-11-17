import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import HowIBuild from './components/HowIBuild';
import Experience from './components/Experience';
import Skills from './components/Skills';
import About from './components/About';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Projects />
        <HowIBuild />
        <Experience />
        <Skills />
        <About />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
