"use client"

import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { Features } from "@/components/features"
import { Pricing } from "@/components/pricing"
import { Testimonials } from "@/components/testimonials"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <AnimatePresence>
      {isLoaded && (
        <motion.main
          className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 pt-16 relative overflow-hidden"
          variants={pageVariants}
          initial="initial"
          animate="animate"
        >
          {/* Global Background Elements */}
          <div className="fixed inset-0 pointer-events-none -z-50">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-300/15 to-purple-300/15 rounded-full mix-blend-multiply filter blur-xl animate-float -z-50"></div>
            <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-300/15 to-pink-300/15 rounded-full mix-blend-multiply filter blur-xl animate-float -z-50" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-teal-300/15 to-blue-300/15 rounded-full mix-blend-multiply filter blur-xl animate-float -z-50" style={{ animationDelay: '4s' }}></div>
          </div>

          <Hero />

          <motion.div
            id="how-it-works"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <HowItWorks />
          </motion.div>

          <motion.div
            id="features"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Features />
          </motion.div>

          <motion.div
            id="pricing"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Pricing />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Testimonials />
          </motion.div>

          <motion.div
            id="faq"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <FAQ />
          </motion.div>

          <Footer />
        </motion.main>
      )}
    </AnimatePresence>
  )
}
