"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Upload, Brain, Calendar, UserX, ArrowRight } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const steps = [
  {
    icon: Upload,
    title: "Upload PDF Resumes",
    description: "Drag and drop or bulk upload candidate resumes in PDF format",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: Brain,
    title: "AI Analyzes Keywords & Qualifications",
    description: "Our AI extracts and matches job-specific keywords and qualifications",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
  },
  {
    icon: Calendar,
    title: "Qualified Candidates Get Scheduled",
    description: "Automatically send Calendly links to qualified candidates",
    color: "from-green-500 to-teal-500",
    bgColor: "bg-green-50",
  },
  {
    icon: UserX,
    title: "Auto-Reject Unqualified Applicants",
    description: "Send professional rejection emails to unqualified candidates",
    color: "from-red-500 to-orange-500",
    bgColor: "bg-red-50",
  },
]

export function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

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
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8
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
    <section className="px-4 py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="mx-auto max-w-7xl relative">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-3 text-2xl font-bold text-gray-900 md:text-3xl lg:text-4xl">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="mb-12 text-lg text-gray-600 max-w-3xl mx-auto">
            Four simple steps to revolutionize your hiring process with AI-powered automation
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-teal-200 transform -translate-y-1/2 z-0"></div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Arrow between steps */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute top-1/2 -right-4 z-20"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.2 }}
                  >
                    <ArrowRight className="h-6 w-6 text-blue-400 group-hover:text-blue-600 transition-colors" />
                  </motion.div>
                )}

                <Card className="relative h-full border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-105 overflow-hidden">
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[1px] rounded-lg">
                    <div className="bg-white rounded-lg h-full w-full"></div>
                  </div>

                  <CardContent className="p-8 text-center relative z-10">
                    <div className="relative mb-6 inline-block">
                      <motion.div
                        className={`inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r ${step.color} shadow-lg group-hover:shadow-xl transition-all duration-300`}
                        whileHover={{
                          rotate: 360,
                          scale: 1.1,
                          transition: { duration: 0.6 }
                        }}
                      >
                        <step.icon className="h-10 w-10 text-white" />
                      </motion.div>

                      {/* Step Badge positioned on top-right of icon */}
                      <motion.div
                        className="absolute -top-2 -right-2 h-8 w-8 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
                      >
                        <span className="text-xs font-bold text-blue-600">{index + 1}</span>
                      </motion.div>
                    </div>

                    <h3 className="mb-3 text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {step.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {step.description}
                    </p>

                    {/* Hover Effect Overlay */}
                    <motion.div
                      className={`absolute inset-0 ${step.bgColor} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-lg`}
                      initial={false}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
