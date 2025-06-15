"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Zap, Target, BarChart3 } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Link } from "react-router-dom"
import { useRef } from "react"

export function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }

  const floatingIcons = [
    { icon: Zap, delay: 0, x: "10%", y: "20%" },
    { icon: Target, delay: 1, x: "80%", y: "30%" },
    { icon: BarChart3, delay: 2, x: "15%", y: "70%" },
  ]

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-20 md:py-32 bg-mesh">
      {/* Animated Background */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-teal-600/10"
      />

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className="absolute -z-10"
            style={{ left: item.x, top: item.y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 0.08,
              scale: 1,
              y: [0, -20, 0],
            }}
            transition={{
              delay: item.delay,
              duration: 2,
              y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <item.icon className="h-16 w-16 text-blue-500" />
          </motion.div>
        ))}
      </div>



      <div className="relative mx-auto max-w-7xl text-center z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl relative z-20"
        >
          <motion.div
            variants={itemVariants}
            className="mb-6 inline-flex items-center rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-3 text-sm font-medium text-blue-700 shadow-lg hover-lift magnetic-hover relative z-30"
          >
            <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
            AI-Powered Recruitment Revolution
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl relative z-30"
          >
            AI-Powered Resume Scanning That Finds You{" "}
            <span className="text-blue-600 font-bold">
              Only the Best Candidates
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mb-6 text-lg text-gray-600 md:text-xl max-w-3xl mx-auto leading-relaxed relative z-30"
          >
            Automatically analyze resumes, filter qualified candidates, and schedule interviews. Save 200+ hours per
            month with intelligent recruitment automation.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4 sm:flex-row sm:justify-center"
          >
            <Link to="/demo">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse-glow">
                Try Free Demo
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/analytics">
              <Button size="lg" variant="outline" className="border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                View Analytics Demo
              </Button>
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-12 grid grid-cols-3 gap-6 text-center"
          >
            {[
              { value: "98%", label: "Accuracy Rate", delay: 0 },
              { value: "200+", label: "Hours Saved/Month", delay: 0.2 },
              { value: "50%", label: "Faster Hiring", delay: 0.4 }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + stat.delay, duration: 0.6 }}
                className="group cursor-pointer"
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-600 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 mt-1 group-hover:text-gray-800 transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
