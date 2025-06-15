"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Zap, Target, BarChart3, Shield, Clock, Users } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const features = [
  {
    icon: Zap,
    title: "AI-Powered Resume Parsing",
    description: "Advanced NLP algorithms extract and analyze key information from resumes with 98% accuracy",
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    icon: Target,
    title: "Job-Specific Keyword Extraction",
    description: "Intelligent matching based on role-specific requirements and industry standards",
    gradient: "from-red-400 to-pink-500",
  },
  {
    icon: BarChart3,
    title: "Candidate Qualification Scoring",
    description: "Automated scoring system ranks candidates based on relevance and qualifications",
    gradient: "from-green-400 to-blue-500",
  },
  {
    icon: Shield,
    title: "Auto-Rejection System",
    description: "Professional automated rejection emails for unqualified candidates",
    gradient: "from-purple-400 to-indigo-500",
  },
  {
    icon: Clock,
    title: "Calendly Integration",
    description: "Seamless interview scheduling with qualified candidates",
    gradient: "from-blue-400 to-cyan-500",
  },
  {
    icon: Users,
    title: "Real-Time Analytics Dashboard",
    description: "Track hiring metrics, candidate pipeline, and recruitment performance",
    gradient: "from-teal-400 to-green-500",
  },
]

export function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }

  return (
    <section className="px-4 py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.3),transparent_50%)]"></div>
      </div>

      <div className="mx-auto max-w-7xl relative">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-3 text-2xl font-bold text-gray-900 md:text-3xl lg:text-4xl">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h2>
          <p className="mb-12 text-lg text-gray-600 max-w-3xl mx-auto">
            Everything you need to streamline your recruitment process with cutting-edge AI technology
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group"
            >
              <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm hover:bg-white group-hover:scale-105 overflow-hidden relative">
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[1px] rounded-lg">
                  <div className="bg-white rounded-lg h-full w-full"></div>
                </div>

                <CardContent className="p-8 relative z-10">
                  <motion.div
                    className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r ${feature.gradient} shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    whileHover={{
                      rotate: 360,
                      scale: 1.1,
                      transition: { duration: 0.6 }
                    }}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </motion.div>

                  <h3 className="mb-3 text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>

                  {/* Hover Effect Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"
                    initial={false}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
