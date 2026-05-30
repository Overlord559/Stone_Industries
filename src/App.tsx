import { useEffect, type CSSProperties } from 'react'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Hero } from './components/sections/Hero'
import { PrimaryOffers } from './components/sections/PrimaryOffers'
import { MobileQuickJump } from './components/sections/MobileQuickJump'
import { RevenueLeakAudit } from './components/sections/RevenueLeakAudit'
import { Services } from './components/sections/Services'
import { Vision } from './components/sections/Vision'
import { trackPageView } from './lib/analytics'
import { syncHashScroll } from './lib/inquiryNavigation'

const assetBase = import.meta.env.BASE_URL
const backgroundStyle = {
  '--si-main-bg-image': `url(${assetBase}assets/stone-main-dalrm-bg.webp)`,
  '--si-lower-bg-image': `url(${assetBase}assets/stone-coastal-tech-bg.webp)`,
} as CSSProperties

function App() {
  useEffect(() => {
    syncHashScroll()

    const onHashChange = () => {
      trackPageView()
    }

    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden bg-[#0c1222] text-slate-100"
      style={backgroundStyle}
    >
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_-8%,_rgba(14,165,233,0.06),_transparent_32%)]" />
      <div
        className="si-viewport-edge-vignette pointer-events-none fixed inset-0 -z-[5]"
        aria-hidden="true"
      />
      <Navbar />
      <main className="w-full">
        <div className="relative isolate">
          <div
            className="si-main-parallax-bg pointer-events-none absolute inset-0 -z-10 min-h-[100vh]"
            aria-hidden="true"
          />
          <div
            className="si-main-bg-scrim pointer-events-none absolute inset-0 -z-10 min-h-[100vh]"
            aria-hidden="true"
          />
          <Hero />
          <MobileQuickJump />
        </div>
        <div className="relative isolate">
          <div
            className="si-lower-parallax-bg pointer-events-none absolute inset-0 -z-10"
            aria-hidden="true"
          />
          <div
            className="si-bg-transition pointer-events-none absolute inset-x-0 top-0 -z-10 h-36 sm:h-44"
            aria-hidden="true"
          />
          <div className="relative">
            <div
              className="si-lower-bg-scrim pointer-events-none absolute inset-0 -z-10"
              aria-hidden="true"
            />
            <PrimaryOffers />
            <Services />
            <About />
          </div>
          <div className="relative">
            <div
              className="si-lower-bg-scrim si-lower-bg-scrim--vision pointer-events-none absolute inset-0 -z-10"
              aria-hidden="true"
            />
            <Vision />
          </div>
          <div className="relative">
            <div
              className="si-lower-bg-scrim si-lower-bg-scrim--contact pointer-events-none absolute inset-0 -z-10"
              aria-hidden="true"
            />
            <RevenueLeakAudit />
            <Contact />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
