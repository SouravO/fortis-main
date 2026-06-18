import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Target, Eye, Shield, TrendingUp } from 'lucide-react'

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

/* ─── Data ───────────────────────────────────────────────────────── */
const services = [
  'Property Development',
  'Residential Construction',
  'Commercial Construction',
  'Interior Design & Fit-Out',
  'Renovation & Refurbishment',
  'Turnkey Design & Build Solutions',
  'Real Estate Development',
  'Project Management & Consultancy',
  'Design Coordination & Procurement Management',
]

const values = [
  {
    icon: <Shield size={24} />,
    title: 'Integrity',
    desc: 'We operate with complete transparency — in our contracts, communications, and construction practices.',
  },
  {
    icon: <Target size={24} />,
    title: 'Accountability',
    desc: 'We take ownership of every outcome — from the first design meeting to the final handover.',
  },
  {
    icon: <TrendingUp size={24} />,
    title: 'Excellence',
    desc: 'We hold ourselves to the highest standards of workmanship, materials, and project delivery.',
  },
  {
    icon: <Eye size={24} />,
    title: 'Vision',
    desc: 'We think beyond the brief — anticipating client needs and future-proofing every structure we build.',
  },
]

const milestones = [
  { year: '2019', event: 'FORTIS incorporated in Bengaluru, Karnataka' },
  { year: '2020', event: 'First residential project delivered in Koramangala' },
  { year: '2021', event: 'Expanded into commercial construction and fit-out services' },
  { year: '2022', event: 'Launched turnkey design & build division' },
  { year: '2023', event: 'Delivered 30+ projects across Karnataka' },
  { year: '2024', event: 'Entered hospitality and mixed-use development segment' },
  { year: '2025', event: 'Ongoing portfolio exceeds 50+ projects pan-India' },
]

/* ─── Component ─────────────────────────────────────────────────── */
export default function About() {
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
            <pattern id="hero-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <polygon points="30,5 55,50 5,50" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-pattern)" />
        </svg>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sapphire font-semibold tracking-widest text-xs uppercase mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-sapphire" />
              WHO WE ARE
            </p>
            <h1 className="text-white font-black text-5xl md:text-6xl uppercase leading-none mb-6">
              ABOUT<br />
              <span className="text-sapphire">FORTIS</span>
            </h1>
            <p className="text-white/60 max-w-xl leading-relaxed">
              A trusted development, construction, interior fit-out, and project management company
              delivering high-quality projects through engineering excellence, disciplined execution,
              and long-term value creation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── COMPANY STORY ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeUp>
              <p className="section-label">OUR STORY</p>
              <h2 className="section-title">
                Built on Precision.<br />Delivered with Purpose.
              </h2>
              <div className="space-y-5 text-gray-600 leading-relaxed">
                <p>
                  FORTIS is a development, construction, and project management company delivering
                  residential, commercial, hospitality, retail, and mixed-use projects from concept to completion.
                </p>
                <p>
                  We offer end-to-end services across design coordination, procurement, construction,
                  interior fit-out, renovation, and turnkey delivery — bringing engineering precision and
                  disciplined project management to every stage.
                </p>
                <p>
                  Our approach is built on transparent communication, rigorous quality control, and a
                  clear focus on delivering measurable value to clients, investors, and the communities we build in.
                </p>
                <p>
                  Beyond delivering structures, we build lasting partnerships — with clients, consultants,
                  and stakeholders — grounded in integrity, accountability, and a long-term commitment to
                  the built environment.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="space-y-6">
                {/* Mission */}
                <div className="bg-navy p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-sapphire/20"
                    style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
                  <p className="text-sapphire text-xs font-bold tracking-widest uppercase mb-3">Our Mission</p>
                  <p className="text-white font-semibold text-lg leading-relaxed">
                    Innovative &amp; Sustainable Architecture — Executing future-proof layouts utilizing
                    immaculate custom craftsmanship and green architecture processes.
                  </p>
                </div>

                {/* Vision */}
                <div className="bg-iceblue p-8 border-l-4 border-sapphire relative overflow-hidden">
                  <p className="text-sapphire text-xs font-bold tracking-widest uppercase mb-3">Our Vision</p>
                  <p className="text-navy font-semibold text-lg leading-relaxed">
                    Globally Recognized Structural Distinction — Setting world-class benchmarks in luxury
                    execution, timeless safety principles, and investor satisfaction.
                  </p>
                </div>

                {/* Brand Positioning */}
                <div className="border border-iceblue-dark p-8">
                  <p className="text-sapphire text-xs font-bold tracking-widest uppercase mb-3">Brand Positioning</p>
                  <p className="text-gray-600 leading-relaxed italic text-sm">
                    "A trusted development, construction, interior fit-out, and project management company
                    delivering high-quality projects through engineering excellence, disciplined execution,
                    and long-term value creation."
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-24 bg-iceblue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="text-center max-w-xl mx-auto mb-16">
              <p className="section-label text-center">WHAT DRIVES US</p>
              <h2 className="section-title text-center">Our Core Values</h2>
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <FadeUp key={val.title} delay={i * 0.1}>
                <div className="bg-white p-8 group card-hover border border-iceblue-dark/30 text-center">
                  <div className="w-14 h-14 bg-navy rounded-none flex items-center justify-center mx-auto mb-5 text-white group-hover:bg-sapphire transition-colors duration-300">
                    {val.icon}
                  </div>
                  <h3 className="text-navy font-bold text-lg mb-3">{val.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{val.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES LIST ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <p className="section-label">FULL SCOPE</p>
              <h2 className="section-title">Our Business Activities</h2>
              <p className="section-body mb-8">
                FORTIS offers a comprehensive suite of services spanning the entire construction
                and development lifecycle — from initial design coordination through final delivery.
              </p>
              <ul className="space-y-3">
                {services.map((svc, i) => (
                  <motion.li
                    key={svc}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="flex items-center gap-4 group"
                  >
                    <span className="w-8 h-px bg-sapphire shrink-0 group-hover:w-12 transition-all duration-300" />
                    <span className="text-navy font-medium text-sm tracking-wide">{svc}</span>
                  </motion.li>
                ))}
              </ul>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="bg-navy p-10 relative overflow-hidden">
                {/* Decorative triangle watermark */}
                <div className="absolute -right-8 -bottom-8 opacity-5">
                  <svg width="200" height="200" viewBox="0 0 200 200">
                    <polygon points="100,10 190,180 10,180" fill="none" stroke="white" strokeWidth="8" />
                    <polygon points="100,40 165,165 35,165" fill="none" stroke="white" strokeWidth="4" />
                  </svg>
                </div>

                <p className="text-sapphire text-xs font-bold tracking-widest uppercase mb-6">
                  Company Timeline
                </p>
                <div className="space-y-5 relative">
                  <div className="absolute left-[52px] top-0 bottom-0 w-px bg-white/10" />
                  {milestones.map((m, i) => (
                    <div key={m.year} className="flex gap-5 items-start relative z-10">
                      <div className="shrink-0 w-12 text-right">
                        <span className="text-sapphire font-bold text-xs">{m.year}</span>
                      </div>
                      <div className="w-3 h-3 bg-sapphire rounded-full mt-0.5 shrink-0" />
                      <p className="text-white/70 text-sm leading-relaxed">{m.event}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-sapphire">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FadeUp>
            <h2 className="text-white font-black text-4xl md:text-5xl uppercase leading-tight mb-6">
              Let's Build Something<br />Exceptional Together.
            </h2>
            <p className="text-white/70 leading-relaxed mb-10 max-w-xl mx-auto">
              Ready to start your next project? Our team is on hand to discuss your requirements
              and deliver outcomes that exceed expectations.
            </p>
            <Link to="/contact" className="btn-outline inline-flex items-center gap-2">
              START A CONVERSATION <ArrowRight size={14} />
            </Link>
          </FadeUp>
        </div>
      </section>

    </div>
  )
}