import './App.css';
import Hero from './components/Hero/Hero';
import TableSection from "./TableSection/TableSection";
import Footer from './Footer/Footer';

function App() {
  return (
    <>
      <Hero />

      <section id="planets">
        <TableSection />
      </section>

      <section id="contact">
        {/* form section */}
      </section>

      <Footer />
    </>
  );
}

export default App;
