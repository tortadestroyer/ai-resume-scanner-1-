import { Hero } from "../components/hero"
import { HowItWorks } from "../components/how-it-works"
import { Features } from "../components/features"
import { Pricing } from "../components/pricing"
import { Testimonials } from "../components/testimonials"
import { FAQ } from "../components/faq"
import { Footer } from "../components/footer"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function HomePage() {
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
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate={isLoaded ? "animate" : "initial"}
      className="min-h-screen"
    >
      <Hero />
      <HowItWorks />
      <Features />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Footer />
    </motion.div>
  )
}
