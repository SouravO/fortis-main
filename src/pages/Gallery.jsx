import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react'

const galleryImages = Object.entries(
  import.meta.glob('../data/gallery/*.{jpg,jpeg,png,webp}', { eager: true })
).map(([, mod]) => mod.default)

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
          <p className="text-white/40 text-xs tracking-widest">
            {current + 1} / {images.length}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)

  return (
    <div className="overflow-x-hidden">

      <section className="bg-navy py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-sapphire"
            style={{ clipPath: 'polygon(40% 0%, 100% 0%, 100% 100%, 0% 100%)' }} />
        </div>
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="gallery-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <polygon points="30,5 55,50 5,50" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gallery-pattern)" />
        </svg>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sapphire font-semibold tracking-widest text-xs uppercase mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-sapphire" />
              OUR WORK
            </p>
            <h1 className="text-white font-black text-5xl md:text-6xl uppercase leading-none mb-6">
              PHOTO<br />
              <span className="text-sapphire">GALLERY</span>
            </h1>
            <p className="text-white/60 max-w-xl leading-relaxed">
              A visual journey through our completed projects — showcasing quality, craftsmanship, and attention to detail.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-iceblue min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="overflow-hidden cursor-pointer group"
                onClick={() => setLightbox({ images: galleryImages, index: i })}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={src}
                    alt=""
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-navy">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FadeUpSimple>
            <p className="text-sapphire font-semibold tracking-widest text-xs uppercase mb-4">YOUR PROJECT</p>
            <h2 className="text-white font-black text-4xl md:text-5xl uppercase leading-tight mb-6">
              Ready to Create Something Beautiful?
            </h2>
            <p className="text-white/60 leading-relaxed mb-10 max-w-xl mx-auto">
              Let's discuss your vision and turn it into reality with the same quality and craftsmanship you see in our portfolio.
            </p>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
              START YOUR PROJECT <ArrowRight size={14} />
            </Link>
          </FadeUpSimple>
        </div>
      </section>

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
