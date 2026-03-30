import { motion } from 'framer-motion'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Hero } from './components/sections/Hero'
import { Services } from './components/sections/Services'
import { Vision } from './components/sections/Vision'

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.08),_transparent_26%),linear-gradient(180deg,#020617_0%,#020617_50%,#000814_100%)]" />
      <Navbar />
      <main>
        <Hero />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <Services />
          <About />
          <Vision />
          <Contact />
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}

export default App
