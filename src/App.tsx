import Navigation from './components/Navigation';
import Hero from './components/Hero';
import WhoAmI from './components/WhoAmI';
import Projects from './components/Projects';
import Footer from './components/Footer';
import './App.css';

function App() {
  window.addEventListener("scroll", () => {
  console.log("scroll event at", window.scrollY);
});
  return (
    <>
      
      <Navigation />
      <Hero />
      <WhoAmI />
      <Projects />
      <Footer />
    </>
  );
}

export default App;
