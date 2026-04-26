import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"
import Header from './Components/Header'
import Home from './Components/Home'
import About from './Components/About'
import Portfolio from './Components/Portfolio'
import Contact from './Components/Contact'

export default function App() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 500)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="bg-[#060606] text-white overflow-x-hidden">
      <Header />
      <Home />
      <About />
      <Portfolio />
      <Contact />

      <button
        onClick={handleBackToTop}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-xl transition-all duration-300 ${
          showBackToTop
            ? "translate-y-0 opacity-100 hover:-translate-y-1 hover:border-cyan-300/60 hover:shadow-[0_12px_30px_rgba(56,189,248,0.28)]"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <ArrowUp size={18} />
      </button>
      
      {/* Footer - Optional */}
      <footer className="bg-black/50 border-t border-white/10 py-8 px-6 md:px-[8%]">
        <div className="max-w-7xl mx-auto flex flex-col gap-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[11px] md:text-[12px] text-white/40 tracking-[2px] uppercase font-['Exo_2']">
              © 2026 Khizar Hayat. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
  )
}
