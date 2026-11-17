import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import DemoModal from './components/DemoModal';
import { type Project } from './data/content';

export default function App() {
  const [activeDemoProject, setActiveDemoProject] = useState<Project | null>(null);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects onOpenDemo={(project) => setActiveDemoProject(project)} />
        <Skills />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />

      {/* Modal Acessível para Demonstrações e Evidências */}
      <DemoModal
        project={activeDemoProject}
        onClose={() => setActiveDemoProject(null)}
      />
    </>
  );
}
