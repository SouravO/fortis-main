import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { MapPin, Calendar, Layers, ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react'

/* ─── Animation Helper ───────────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Project Data ───────────────────────────────────────────────── */
const projects = [
  {
    id: 1,
    name: 'The Meridian Residences',
    type: 'Residential',
    location: 'Koramangala, Bengaluru',
    scope: 'Full Residential Development — 24 units, structural, MEP, and landscape.',
    status: 'Completed',
    year: '2024',
    images: ['/hero.png', '/img.jpg', '/hero.png'],
  },
  {
    id: 2,
    name: 'Vertex Commercial Park',
    type: 'Commercial',
    location: 'Whitefield, Bengaluru',
    scope: 'Ground + 5 commercial office complex, shell & core with MEP infrastructure.',
    status: 'Completed',
    year: '2023',
    images: ['/hero.png', '/img.jpg', '/hero.png'],
  },
  {
    id: 3,
    name: 'Azure Interior Fit-Out',
    type: 'Interior Fit-Out',
    location: 'Indiranagar, Bengaluru',
    scope: 'Full interior fit-out — partitions, ceilings, flooring, custom joinery, MEP finishes.',
    status: 'Ongoing',
    year: '2025',
    images: ['/hero.png', '/img.jpg', '/hero.png'],
  },
  {
    id: 4,
    name: 'The Crest Villa Township',
    type: 'Residential',
    location: 'Sarjapur Road, Bengaluru',
    scope: 'Premium villa township — 12 independent units with private landscaping.',
    status: 'Completed',
    year: '2023',
    images: ['/hero.png', '/img.jpg', '/hero.png'],
  },
  {
    id: 5,
    name: 'Elara Boutique Hotel',
    type: 'Hospitality',
    location: 'MG Road, Bengaluru',
    scope: 'Boutique hotel construction and complete interior fit-out, 48 rooms.',
    status: 'Completed',
    year: '2022',
    images: ['/hero.png', '/img.jpg', '/hero.png'],
  },
  {
    id: 6,
    name: 'Horizon Retail Plaza',
    type: 'Commercial',
    location: 'HSR Layout, Bengaluru',
    scope: 'Retail and F&B plaza, three floors, shell and fit-out.',
    status: 'Ongoing',
    year: '2025',
    images: ['/hero.png', '/img.jpg', '/hero.png'],
  },
  {
    id: 7,
    name: 'Prestige Apartment Renovation',
    type: 'Renovation',
    location: 'Jayanagar, Bengaluru',
    scope: 'Full refurbishment of existing 18-unit residential complex.',
    status: 'Completed',
    year: '2022',
    images: ['/hero.png', '/img.jpg', '/hero.png'],
  },
  {
    id: 8,
    name: 'TechPark Office Fit-Out',
    type: 'Interior Fit-Out',
    location: 'Electronic City, Bengaluru',
    scope: '28,000 sq ft open-plan office interior fit-out, Tier 1 finish standard.',
    status: 'Ongoing',
    year: '2025',
    images: ['/hero.png', '/img.jpg', '/hero.png'],
  },
  {
    id: 9,
    name: 'The Parkview Apartments',
    type: 'Residential',
    location: 'Bannerghatta Road, Bengaluru',
    scope: 'G+6 residential block, 36 units — turnkey design & build.',
    status: 'Ongoing',
    year: '2025',
    images: ['/hero.png', '/img.jpg', '/hero.png'],
  },
]

const categories = ['All', 'Residential', 'Commercial', 'Hospitality', 'Interior Fit-Out', 'Renovation', 'Ongoing']

/* ─── Image Carousel (card) ─────────────────────────────────────── */
function CardCarousel({ images, onImageClick }) {
  const [current, setCurrent] = useState(0)

  const prev = (e) => {
    e.stopPropagation()
    setCurrent((c) => (c - 1 + images.length) % images.length)
  }
  const next = (e) => {
    e.stopPropagation()
    setCurrent((c) => (c + 1) % images.length)
  }

  return (
    <div
      className="relative h-52 overflow-hidden cursor-pointer group/carousel"
      onClick={() => onImageClick(current)}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Arrows — always visible on mobile (sm and below), hover-only on desktop */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-opacity z-10
          opacity-100 sm:opacity-0 sm:group-hover/carousel:opacity-100"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-opacity z-10
          opacity-100 sm:opacity-0 sm:group-hover/carousel:opacity-100"
      >
        <ChevronRight size={18} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
            className={`h-1.5 rounded-full transition-all ${i === current ? 'bg-white w-3' : 'bg-white/50 w-1.5'}`}
          />
        ))}
      </div>
    </div>
  )
}

/* ─── Lightbox ──────────────────────────────────────────────────── */
function Lightbox({ images, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex)

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length)
  const next = () => setCurrent((c) => (c + 1) % images.length)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handler)
    }
  }, [current])

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors z-10"
        >
          <X size={32} />
        </button>

        {/* Image */}
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={images[current]}
            alt=""
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="w-full max-h-[78vh] object-contain rounded-lg"
          />
        </AnimatePresence>

        {/* Prev button */}
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 bg-white/15 hover:bg-white/30 text-white rounded-full p-3 transition-colors"
        >
          <ChevronLeft size={26} />
        </button>

        {/* Next button */}
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 bg-white/15 hover:bg-white/30 text-white rounded-full p-3 transition-colors"
        >
          <ChevronRight size={26} />
        </button>

        {/* Counter + dots */}
        <div className="flex flex-col items-center gap-2 mt-4">
          <div className="flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all ${i === current ? 'bg-white w-6' : 'bg-white/40 w-1.5'}`}
              />
            ))}
          </div>
          <p className="text-white/40 text-xs tracking-widest">
            {current + 1} / {images.length}
          </p>
        </div>
      </div>
    </div>
  )
}

/* ─── Main Component ─────────────────────────────────────────────── */
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [lightbox, setLightbox] = useState(null)

  const filtered = projects.filter((p) => {
    if (activeFilter === 'All') return true
    if (activeFilter === 'Ongoing') return p.status === 'Ongoing'
    return p.type === activeFilter
  })

  return (
    <div className="overflow-x-hidden">

      {/* ── PAGE HEADER ── */}
      <section className="bg-navy py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-sapphire"
            style={{ clipPath: 'polygon(40% 0%, 100% 0%, 100% 100%, 0% 100%)' }} />
        </div>
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-pattern-proj" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <polygon points="30,5 55,50 5,50" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-pattern-proj)" />
        </svg>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sapphire font-semibold tracking-widest text-xs uppercase mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-sapphire" />
              OUR PORTFOLIO
            </p>
            <h1 className="text-white font-black text-5xl md:text-6xl uppercase leading-none mb-6">
              OUR<br />
              <span className="text-sapphire">PROJECTS</span>
            </h1>
            <p className="text-white/60 max-w-xl leading-relaxed">
              A selection of completed and ongoing projects across residential, commercial, hospitality,
              and interior fit-out sectors across Karnataka and India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FILTER ── */}
      <section className="bg-white border-b border-iceblue-dark sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`shrink-0 text-xs font-semibold tracking-widest uppercase px-5 py-2.5 transition-all duration-200
                  ${activeFilter === cat ? 'bg-navy text-white' : 'text-navy hover:bg-iceblue'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS GRID ── */}
      <section className="py-16 bg-iceblue min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-white group card-hover border border-iceblue-dark/30 overflow-hidden"
                >
                  {/* Image Carousel */}
                  <div className="relative">
                    <CardCarousel
                      images={project.images}
                      onImageClick={(idx) => setLightbox({ images: project.images, index: idx })}
                    />
                    {/* Category badge */}
                    <div className="absolute top-4 left-4 bg-black/50 border border-white/20 backdrop-blur-sm z-10 pointer-events-none">
                      <span className="text-white text-xs font-semibold tracking-widest px-3 py-1 block uppercase">
                        {project.type}
                      </span>
                    </div>
                    {/* Status badge */}
                    <div className={`absolute top-4 right-4 text-xs font-bold tracking-widest px-3 py-1 z-10 pointer-events-none
                      ${project.status === 'Completed' ? 'bg-green-500 text-white' : 'bg-yellow-400 text-navy'}`}>
                      {project.status.toUpperCase()}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <h3 className="text-navy font-bold text-xl mb-4 group-hover:text-sapphire transition-colors leading-tight">
                      {project.name}
                    </h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-start gap-2">
                        <MapPin size={13} className="text-sapphire shrink-0 mt-0.5" />
                        <span className="text-gray-500 text-sm">{project.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={13} className="text-sapphire shrink-0" />
                        <span className="text-gray-500 text-sm">{project.year}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Layers size={13} className="text-sapphire shrink-0 mt-0.5" />
                        <span className="text-gray-500 text-sm">{project.scope}</span>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-iceblue-dark">
                      <Link
                        to="/contact"
                        className="text-sapphire text-xs font-bold tracking-widest uppercase flex items-center gap-2 hover:text-navy transition-colors group/link"
                      >
                        ENQUIRE ABOUT THIS PROJECT
                        <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-24 text-gray-400">
              <p className="text-lg font-medium">No projects in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-navy">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FadeUpSimple>
            <p className="text-sapphire font-semibold tracking-widest text-xs uppercase mb-4">YOUR PROJECT</p>
            <h2 className="text-white font-black text-4xl md:text-5xl uppercase leading-tight mb-6">
              Have a Project in Mind?
            </h2>
            <p className="text-white/60 leading-relaxed mb-10 max-w-xl mx-auto">
              Share your brief with our team and we'll provide an initial consultation and project assessment — at no obligation.
            </p>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
              DISCUSS YOUR PROJECT <ArrowRight size={14} />
            </Link>
          </FadeUpSimple>
        </div>
      </section>

      {/* ── LIGHTBOX PORTAL ── */}
      {lightbox && (
        <Lightbox
          images={lightbox.images}
          startIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}

    </div>
  )
}

function FadeUpSimple({ children }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
    >
      {children}
    </motion.div>
  )
}