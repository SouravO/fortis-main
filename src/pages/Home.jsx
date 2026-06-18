import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion'
import {
  CheckCircle, Award, Users, TrendingUp, ArrowRight,
  Building2, Home as HomeIcon, Hotel, Wrench, Layers, ClipboardList,
  ChevronLeft, ChevronRight, X
} from 'lucide-react'

/* ─── Animation Helpers ──────────────────────────────────────────── */
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

/* ─── Animated Counter ───────────────────────────────────────────── */
function Counter({ end, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const step = end / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, end])

  return <span ref={ref}>{prefix}{count}{suffix}</span>
}

/* ─── Featured Card Carousel ─────────────────────────────────────── */
function FeaturedCardCarousel({ images, onImageClick }) {
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
      className="relative h-56 overflow-hidden cursor-pointer group/carousel"
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

      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 opacity-0 group-hover/carousel:opacity-100 transition-opacity z-10"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 opacity-0 group-hover/carousel:opacity-100 transition-opacity z-10"
      >
        <ChevronRight size={18} />
      </button>

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

/* ─── Featured Lightbox ──────────────────────────────────────────── */
function FeaturedLightbox({ images, startIndex, onClose }) {
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
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors z-10"
        >
          <X size={32} />
        </button>

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

        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 bg-white/15 hover:bg-white/30 text-white rounded-full p-3 transition-colors"
        >
          <ChevronLeft size={26} />
        </button>
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 bg-white/15 hover:bg-white/30 text-white rounded-full p-3 transition-colors"
        >
          <ChevronRight size={26} />
        </button>

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
          <p className="text-white/40 text-xs tracking-widest">{current + 1} / {images.length}</p>
        </div>
      </div>
    </div>
  )
}

/* ─── Data ───────────────────────────────────────────────────────── */
const stats = [
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 5, suffix: '+', label: 'Years of Excellence' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 12, suffix: '+', label: 'Ongoing Projects' },
]

const whyChoose = [
  {
    icon: <Award size={28} />,
    title: 'Quality-Driven Delivery',
    desc: 'Every project is executed with rigorous quality standards, from material selection to final finishing — no compromises.',
  },
  {
    icon: <Users size={28} />,
    title: 'Transparent Communication',
    desc: 'We keep clients informed at every stage through regular updates, clear documentation, and open project reporting.',
  },
  {
    icon: <ClipboardList size={28} />,
    title: 'Experienced Project Management',
    desc: 'Our seasoned project managers bring structure, discipline, and foresight to complex multi-phase developments.',
  },
  {
    icon: <TrendingUp size={28} />,
    title: 'On-Time Execution',
    desc: 'We plan meticulously and execute with precision to ensure every milestone and handover is met on schedule.',
  },
  {
    icon: <Layers size={28} />,
    title: 'End-to-End Solutions',
    desc: 'From concept and design through construction to interior fit-out — complete project ownership under one roof.',
  },
  {
    icon: <CheckCircle size={28} />,
    title: 'Engineering Excellence',
    desc: 'Combining proven construction methodologies with modern engineering practices for structures built to endure.',
  },
]

const services = [
  { icon: <HomeIcon size={32} />, title: 'Residential Construction', desc: 'Premium villas, apartments, and housing developments built to the highest standards.' },
  { icon: <Building2 size={32} />, title: 'Commercial Construction', desc: 'Office complexes, retail spaces, and commercial developments designed for performance.' },
  { icon: <Hotel size={32} />, title: 'Hospitality Projects', desc: 'Hotels, resorts, and hospitality spaces that blend functionality with exceptional design.' },
  { icon: <Wrench size={32} />, title: 'Interior Fit-Out', desc: 'Turnkey interior solutions — from design concept to furniture installation and final handover.' },
  { icon: <Layers size={32} />, title: 'Renovation & Refurbishment', desc: 'Breathing new life into existing spaces with precision, speed, and minimal disruption.' },
  { icon: <ClipboardList size={32} />, title: 'Project Management', desc: 'Expert consultancy and management for complex builds, ensuring scope, schedule, and budget alignment.' },
]

const featuredProjects = [
  {
    name: 'The Meridian Residences',
    type: 'Residential',
    location: 'Koramangala, Bengaluru',
    status: 'Completed',
    year: '2024',
    images: ['/hero.png', '/img.jpg', '/hero.png'],
  },
  {
    name: 'Vertex Commercial Park',
    type: 'Commercial',
    location: 'Whitefield, Bengaluru',
    status: 'Completed',
    year: '2023',
    images: ['/hero.png', '/img.jpg', '/hero.png'],
  },
  {
    name: 'Azure Interior Fit-Out',
    type: 'Interior Fit-Out',
    location: 'Indiranagar, Bengaluru',
    status: 'Ongoing',
    year: '2025',
    images: ['/hero.png', '/img.jpg', '/hero.png'],
  },
]

/* ─── Component ─────────────────────────────────────────────────── */
export default function Home() {
  const [featuredLightbox, setFeaturedLightbox] = useState(null)

  return (
    <div className="overflow-x-hidden">

      {/* ── HERO ── */}
      <section
        className="relative min-h-[92vh] flex items-center overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-navy/30 to-transparent" />
        <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white font-semibold tracking-widest text-xs uppercase mb-8 flex items-center gap-3"
              style={{ textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}
            >
              <span className="w-8 h-px bg-white/60" />
              Headquartered in Karnataka | Serving Clients Across India
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-white font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-none tracking-tight mb-8 uppercase"
              style={{ textShadow: '2px 2px 12px rgba(0,0,0,0.5)' }}
            >
              WHERE<br />
              <span style={{ WebkitTextStroke: '3px #ffffff', color: 'transparent', textShadow: 'none', filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))' }}>
                EVERY
              </span><br />
              DREAM<br />
              <span style={{ color: '#5B9BF5', textShadow: '0 0 20px rgba(91,155,245,0.7), 2px 2px 8px rgba(0,0,0,0.6)' }}>
                BEGINS.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-white text-lg leading-relaxed mb-10 max-w-xl"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.7)' }}
            >
              Transforming visions into enduring spaces through expert development,
              construction, and interior fit-out solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/projects" className="btn-primary text-center">VIEW PROJECTS</Link>
              <Link to="/contact" className="btn-outline text-center">CONTACT US</Link>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-xs tracking-widest">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="bg-white border-b border-iceblue-dark py-0">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-iceblue-dark border-x border-iceblue-dark">
            {stats.map((stat, i) => (
              <FadeUp key={stat.label} delay={i * 0.1}>
                <div className="py-10 px-6 text-center group hover:bg-navy transition-all duration-300">
                  <div className="font-black text-4xl md:text-5xl text-navy group-hover:text-white transition-colors leading-none mb-2">
                    <Counter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-gray-500 group-hover:text-white/70 text-xs font-semibold tracking-widest uppercase transition-colors">
                    {stat.label}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT SNAPSHOT ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <p className="section-label">01 // IDENTITY</p>
              <h2 className="font-black text-navy text-4xl md:text-5xl uppercase leading-tight mb-6">
                UNCOMPROMISING<br />
                <span className="text-sapphire">QUALITY.</span><br />
                UNRIVALED<br />
                EXCELLENCE.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                FORTIS delivers residential, commercial, hospitality, and mixed-use projects from
                concept to completion — combining engineering precision, disciplined project
                management, and a commitment to lasting value.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                We don't just build structures; we build partnerships that last.
              </p>
              <Link to="/about" className="btn-outline-navy inline-flex items-center gap-2">
                LEARN MORE ABOUT US <ArrowRight size={14} />
              </Link>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="relative">
                <div className="bg-iceblue p-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-sapphire/10"
                    style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-navy/5"
                    style={{ clipPath: 'polygon(0 100%, 0 0, 100% 100%)' }} />
                  <div className="space-y-6 relative z-10">
                    <div>
                      <p className="text-xs font-semibold tracking-widest text-sapphire uppercase mb-1">Our Core Mission</p>
                      <p className="text-navy font-semibold text-sm leading-relaxed">
                        Innovative & Sustainable Architecture — Executing future-proof layouts utilizing immaculate custom craftsmanship and green architecture processes.
                      </p>
                    </div>
                    <div className="w-full h-px bg-navy/10" />
                    <div>
                      <p className="text-xs font-semibold tracking-widest text-sapphire uppercase mb-1">Our Core Vision</p>
                      <p className="text-navy font-semibold text-sm leading-relaxed">
                        Globally Recognized Structural Distinction — Setting world-class benchmarks in luxury execution, timeless safety principles, and investor satisfaction.
                      </p>
                    </div>
                    <div className="w-full h-px bg-navy/10" />
                    <div className="grid grid-cols-3 gap-4 pt-2">
                      {['Integrity', 'Excellence', 'Trust'].map((val) => (
                        <div key={val} className="text-center">
                          <div className="w-2 h-2 bg-sapphire rounded-full mx-auto mb-2" />
                          <p className="text-xs font-bold tracking-widest text-navy uppercase">{val}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-navy -z-10" />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-24 bg-iceblue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="max-w-2xl mb-16">
              <p className="section-label">02 // WHAT WE DO</p>
              <h2 className="section-title">End-to-End Construction & Development Services</h2>
              <p className="section-body">
                From concept to completion, we deliver a full spectrum of construction, development,
                and project management services under one disciplined team.
              </p>
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <FadeUp key={svc.title} delay={i * 0.1}>
                <div className="bg-white p-8 group card-hover border border-iceblue-dark/30 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-0 bg-sapphire group-hover:h-full transition-all duration-500" />
                  <div className="text-sapphire mb-5 group-hover:text-navy transition-colors duration-300">{svc.icon}</div>
                  <h3 className="text-navy font-bold text-lg mb-3 group-hover:text-sapphire transition-colors">{svc.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{svc.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
              <div>
                <p className="section-label">03 // OUR WORK</p>
                <h2 className="section-title mb-0">Featured Projects</h2>
              </div>
              <Link to="/projects" className="btn-outline-navy flex items-center gap-2 self-start sm:self-auto whitespace-nowrap">
                VIEW ALL PROJECTS <ArrowRight size={14} />
              </Link>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, i) => (
              <FadeUp key={project.name} delay={i * 0.15}>
                <div className="group relative overflow-hidden card-hover border border-iceblue-dark/30">
                  <div className="relative">
                    <FeaturedCardCarousel
                      images={project.images}
                      onImageClick={(idx) => setFeaturedLightbox({ images: project.images, index: idx })}
                    />
                    <div className={`absolute top-4 right-4 text-xs font-bold tracking-widest px-3 py-1 z-10 pointer-events-none ${
                      project.status === 'Completed' ? 'bg-green-500 text-white' : 'bg-yellow-400 text-navy'
                    }`}>
                      {project.status.toUpperCase()}
                    </div>
                  </div>
                  <div className="p-6 bg-white">
                    <p className="text-xs font-semibold tracking-widest text-sapphire uppercase mb-2">{project.type}</p>
                    <h3 className="text-navy font-bold text-xl mb-1">{project.name}</h3>
                    <p className="text-gray-400 text-sm">{project.location} · {project.year}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {featuredLightbox && (
        <FeaturedLightbox
          images={featuredLightbox.images}
          startIndex={featuredLightbox.index}
          onClose={() => setFeaturedLightbox(null)}
        />
      )}

      {/* ── WHY CHOOSE FORTIS ── */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="why-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <polygon points="30,5 55,50 5,50" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#why-pattern)" />
        </svg>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-sapphire font-semibold tracking-widest text-xs uppercase mb-3">04 // WHY CHOOSE US</p>
              <h2 className="section-title-white">The FORTIS Difference</h2>
              <p className="text-white/60 leading-relaxed">
                We bring together engineering discipline, project management expertise, and a
                relentless commitment to quality on every project we undertake.
              </p>
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChoose.map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.1}>
                <div className="border border-white/10 p-8 hover:border-sapphire hover:bg-sapphire/5 transition-all duration-300 group">
                  <div className="text-sapphire mb-5 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                  <h3 className="text-white font-bold text-lg mb-3">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-24 bg-iceblue">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FadeUp>
            <p className="section-label text-center">START YOUR PROJECT</p>
            <h2 className="text-navy font-black text-4xl md:text-5xl uppercase leading-tight mb-6">
              Ready to Build Something<br />
              <span className="text-sapphire">Exceptional?</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-10 max-w-xl mx-auto">
              Whether you have a concept or a complete brief, our team is ready to discuss
              your project requirements and deliver exceptional outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary">GET IN TOUCH</Link>
              <Link to="/projects" className="btn-outline-navy flex items-center gap-2 justify-center">
                SEE OUR PORTFOLIO <ArrowRight size={14} />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

    </div>
  )
}