import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Phone, Mail, Send, CheckCircle, ChevronDown } from 'lucide-react'

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
const serviceOptions = [
  'Property Development',
  'Residential Construction',
  'Commercial Construction',
  'Interior Design & Fit-Out',
  'Renovation & Refurbishment',
  'Turnkey Design & Build Solutions',
  'Real Estate Development',
  'Project Management & Consultancy',
  'Design Coordination & Procurement Management',
  'Other',
]

const contactInfo = [
  {
    icon: <MapPin size={22} />,
    label: 'Registered Office',
    value: 'Total Mall, Police Station, opposite to Madiwala, Sidharata Colony, Santhosapuram, Koramangala 2nd Block, Koramangala, Bengaluru, Karnataka 560068',
    link: null,
  },
  {
    icon: <Phone size={22} />,
    label: 'Phone',
    value: '+91 89718 17700',
    link: 'tel:8971817700',
  },
  {
    icon: <Mail size={22} />,
    label: 'Email',
    value: 'info@fortisbuilders.in',
    link: 'mailto:info@fortisbuilders.in',
  },
]

/* ─── Component ─────────────────────────────────────────────────── */
export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    company: '',
    service: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.service) newErrors.service = 'Please select a service'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    // In production: send to backend/email service
    setSubmitted(true)
  }

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
            <pattern id="contact-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <polygon points="30,5 55,50 5,50" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-pattern)" />
        </svg>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sapphire font-semibold tracking-widest text-xs uppercase mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-sapphire" />
              GET IN TOUCH
            </p>
            <h1 className="text-white font-black text-5xl md:text-6xl uppercase leading-none mb-6">
              CONTACT<br />
              <span className="text-sapphire">US</span>
            </h1>
            <p className="text-white/60 max-w-xl leading-relaxed">
              Let's discuss your project. Our team is ready to provide an initial consultation
              and assessment — with no obligation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT INFO + FORM ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <FadeUp>
                <p className="section-label">REACH US</p>
                <h2 className="section-title">Our Office</h2>
                <p className="section-body mb-10">
                  We are headquartered in Bengaluru, Karnataka, and serve clients across India.
                  Reach out for project inquiries, partnerships, or general information.
                </p>

                <div className="space-y-8">
                  {contactInfo.map((info) => (
                    <div key={info.label} className="flex gap-5">
                      <div className="w-12 h-12 bg-navy flex items-center justify-center text-white shrink-0">
                        {info.icon}
                      </div>
                      <div>
                        <p className="text-xs font-bold tracking-widest text-sapphire uppercase mb-1">
                          {info.label}
                        </p>
                        {info.link ? (
                          <a href={info.link} className="text-navy font-medium hover:text-sapphire transition-colors leading-relaxed">
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-navy font-medium leading-relaxed">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map */}
                <div className="mt-10 border border-iceblue-dark overflow-hidden">
                  <iframe
                    title="FORTIS Office Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.6009174087074!2d77.6208!3d12.9252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1505b76e9d1d%3A0x999123456789!2sKoramangala%2C%20Bengaluru%2C%20Karnataka%20560034!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="260"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </FadeUp>
            </div>

            {/* Inquiry Form */}
            <div className="lg:col-span-3">
              <FadeUp delay={0.2}>
                {!submitted ? (
                  <div className="bg-iceblue p-8 md:p-10 border border-iceblue-dark">
                    <div className="mb-8">
                      <p className="section-label">INQUIRY FORM</p>
                      <h2 className="section-title">Send Us a Message</h2>
                      <p className="text-gray-500 text-sm">
                        Fill in your details below and a member of our team will be in touch within one business day.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                      {/* Row 1: Name + Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold tracking-widest text-navy uppercase mb-2">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="John Smith"
                            className={`w-full bg-white border px-4 py-3 text-navy placeholder-gray-400 text-sm font-medium focus:outline-none focus:border-sapphire transition-colors
                              ${errors.fullName ? 'border-red-400' : 'border-iceblue-dark'}`}
                          />
                          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-bold tracking-widest text-navy uppercase mb-2">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+91 00000 00000"
                            className={`w-full bg-white border px-4 py-3 text-navy placeholder-gray-400 text-sm font-medium focus:outline-none focus:border-sapphire transition-colors
                              ${errors.phone ? 'border-red-400' : 'border-iceblue-dark'}`}
                          />
                          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                        </div>
                      </div>

                      {/* Row 2: Email + Company */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold tracking-widest text-navy uppercase mb-2">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@company.com"
                            className={`w-full bg-white border px-4 py-3 text-navy placeholder-gray-400 text-sm font-medium focus:outline-none focus:border-sapphire transition-colors
                              ${errors.email ? 'border-red-400' : 'border-iceblue-dark'}`}
                          />
                          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-bold tracking-widest text-navy uppercase mb-2">
                            Company Name
                          </label>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Your Company (optional)"
                            className="w-full bg-white border border-iceblue-dark px-4 py-3 text-navy placeholder-gray-400 text-sm font-medium focus:outline-none focus:border-sapphire transition-colors"
                          />
                        </div>
                      </div>

                      {/* Service Required */}
                      <div>
                        <label className="block text-xs font-bold tracking-widest text-navy uppercase mb-2">
                          Service Required <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className={`w-full bg-white border px-4 py-3 text-sm font-medium focus:outline-none focus:border-sapphire transition-colors appearance-none cursor-pointer
                              ${errors.service ? 'border-red-400' : 'border-iceblue-dark'}
                              ${formData.service ? 'text-navy' : 'text-gray-400'}`}
                          >
                            <option value="" disabled>Select a service...</option>
                            {serviceOptions.map((opt) => (
                              <option key={opt} value={opt} className="text-navy">{opt}</option>
                            ))}
                          </select>
                          <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                        {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-xs font-bold tracking-widest text-navy uppercase mb-2">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          placeholder="Tell us about your project — location, type, scope, timeline..."
                          className={`w-full bg-white border px-4 py-3 text-navy placeholder-gray-400 text-sm font-medium focus:outline-none focus:border-sapphire transition-colors resize-none
                            ${errors.message ? 'border-red-400' : 'border-iceblue-dark'}`}
                        />
                        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        className="w-full bg-navy text-white font-bold tracking-widest text-xs uppercase py-4 hover:bg-sapphire transition-all duration-300 flex items-center justify-center gap-2 mt-2"
                      >
                        SUBMIT INQUIRY <Send size={14} />
                      </button>

                      <p className="text-gray-400 text-xs text-center">
                        We respond within 1 business day. Your information is kept confidential.
                      </p>
                    </form>
                  </div>
                ) : (
                  /* Success State */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-navy p-10 text-center flex flex-col items-center justify-center min-h-96"
                  >
                    <div className="w-16 h-16 bg-green-500 flex items-center justify-center mb-6">
                      <CheckCircle size={32} className="text-white" />
                    </div>
                    <h3 className="text-white font-black text-3xl uppercase mb-4">
                      Inquiry Received!
                    </h3>
                    <p className="text-white/70 leading-relaxed max-w-sm mb-8">
                      Thank you, <strong className="text-white">{formData.fullName}</strong>. Our team will review
                      your inquiry and be in touch within one business day.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false)
                        setFormData({ fullName: '', phone: '', email: '', company: '', service: '', message: '' })
                      }}
                      className="btn-outline"
                    >
                      SEND ANOTHER INQUIRY
                    </button>
                  </motion.div>
                )}
              </FadeUp>
            </div>

          </div>
        </div>
      </section>

      {/* ── COMPANY LEGAL ── */}
      <section className="py-16 bg-iceblue border-t border-iceblue-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <p className="text-xs font-bold tracking-widest text-sapphire uppercase mb-2">Registered Company</p>
                <p className="text-navy font-semibold text-sm">FORTIS BUILDERS AND DEVELOPERS PRIVATE LIMITED</p>
              </div>
              <div>
                <p className="text-xs font-bold tracking-widest text-sapphire uppercase mb-2">Headquarters</p>
                <p className="text-navy font-semibold text-sm">Bengaluru, Karnataka, India — 560068</p>
              </div>
              <div>
                <p className="text-xs font-bold tracking-widest text-sapphire uppercase mb-2">Service Area</p>
                <p className="text-navy font-semibold text-sm">Karnataka | Pan-India</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

    </div>
  )
}