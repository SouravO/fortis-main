import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { name: 'HOME', path: '/' },
  { name: 'ABOUT US', path: '/about' },
  { name: 'PROJECTS', path: '/projects' },
  { name: 'CONTACT', path: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white shadow-lg border-b border-iceblue-dark'
            : 'bg-white border-b border-iceblue-dark'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            {/* Logo */}
<Link to="/" className="flex items-center gap-3 group">
  <img
    src="/LOGO.png"
    alt="Fortis Builders and Developers"
    className="h-12 sm:h-14 w-auto object-contain"
  />
  <div>
    <div className="font-black text-navy text-xl tracking-widest leading-none">FORTIS</div>
    <div className="text-sapphire font-medium text-xs tracking-widest leading-tight">BUILDERS AND DEVELOPERS</div>
  </div>
</Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-xs font-semibold tracking-widest transition-colors duration-200 py-2
                    ${isActive(link.path)
                      ? 'text-sapphire'
                      : 'text-navy hover:text-sapphire'
                    }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-sapphire"
                    />
                  )}
                </Link>
              ))}
              <Link
                to="/contact"
                className="bg-navy text-white text-xs font-semibold tracking-widest px-6 py-3 hover:bg-sapphire transition-all duration-300 ml-2"
              >
                INQUIRE NOW →
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-navy p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white border-t border-iceblue-dark overflow-hidden"
            >
              <div className="px-4 py-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-semibold tracking-widest py-2 border-b border-iceblue transition-colors
                      ${isActive(link.path) ? 'text-sapphire' : 'text-navy hover:text-sapphire'}`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  to="/contact"
                  className="bg-navy text-white text-xs font-semibold tracking-widest px-6 py-3 text-center hover:bg-sapphire transition-all duration-300 mt-2"
                >
                  INQUIRE NOW →
                </Link>
                <div className="flex flex-col gap-2 pt-2 text-xs text-gray-500">
                  <a href="tel:8971817700" className="flex items-center gap-2">
                    <Phone size={12} />
                    +91 89718 17700
                  </a>
                  <a href="mailto:info@fortisbuilders.in">info@fortisbuilders.in</a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}