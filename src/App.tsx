import Navigation from './sections/Navigation'
import Hero from './sections/Hero'
import About from './sections/About'
import Products from './sections/Products'
import Advantages from './sections/Advantages'
import EngineShowcase from './sections/EngineShowcase'
import ExperiencePark from './sections/ExperiencePark'
import Contact from './sections/Contact'

function App() {
  return (
    <div className="noise-overlay">
      <Navigation />
      <Hero />
      <About />
      <Products />
      <Advantages />
      <EngineShowcase />
      <ExperiencePark />
      <Contact />
    </div>
  )
}

export default App
