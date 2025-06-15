"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Star, Zap } from "lucide-react"
import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"

const plans = [
  {
    name: "Free Trial",
    price: { monthly: 0, annual: 0 },
    description: "Perfect for testing our platform",
    features: ["10 resume scans per month", "Basic keyword matching", "Email support", "Standard templates"],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Basic",
    price: { monthly: 99, annual: 990 },
    description: "Great for small teams",
    features: [
      "500 resume scans per month",
      "Advanced AI matching",
      "Calendly integration",
      "Basic analytics",
      "Email & chat support",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Pro",
    price: { monthly: 299, annual: 2990 },
    description: "Perfect for growing companies",
    features: [
      "2,000 resume scans per month",
      "Custom keyword sets",
      "Advanced analytics",
      "API access",
      "Priority support",
      "Custom integrations",
    ],
    cta: "Upgrade to Pro",
    popular: false,
  },
  {
    name: "Enterprise",
    price: { monthly: "Custom", annual: "Custom" },
    description: "For large organizations",
    features: [
      "Unlimited resume scans",
      "White-label solution",
      "Dedicated account manager",
      "Custom AI training",
      "SLA guarantee",
      "On-premise deployment",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false)
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
    <section className="px-4 py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '3s' }}></div>

      <div className="mx-auto max-w-7xl relative">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-3 text-2xl font-bold text-gray-900 md:text-3xl lg:text-4xl">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </span>
          </h2>
          <p className="mb-6 text-lg text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your hiring needs and scale as you grow
          </p>

          <motion.div
            className="mb-12 inline-flex items-center rounded-xl bg-white/80 backdrop-blur-sm p-1 shadow-lg border border-gray-200"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.button
              onClick={() => setIsAnnual(false)}
              className={`rounded-lg px-6 py-3 text-sm font-medium transition-all duration-300 ${
                !isAnnual
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Monthly
            </motion.button>
            <motion.button
              onClick={() => setIsAnnual(true)}
              className={`rounded-lg px-6 py-3 text-sm font-medium transition-all duration-300 relative ${
                isAnnual
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Annual
              <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                Save 17%
              </span>
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-8 lg:grid-cols-4 pt-8"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
              whileHover={{
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <Card className={`relative h-full transition-all duration-500 ${
                plan.popular
                  ? "border-0 bg-gradient-to-br from-blue-50 to-purple-50 shadow-2xl scale-105"
                  : "border-gray-200 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl"
              } group-hover:scale-105`}>

                {/* Gradient Border Effect for Popular Plan */}
                {plan.popular && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 p-[2px] rounded-lg">
                    <div className="bg-white rounded-lg h-full w-full"></div>
                  </div>
                )}

                {/* Popular Badge */}
                {plan.popular && (
                  <motion.div
                    className="relative -mb-2 flex justify-center z-20 pt-3"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md flex items-center whitespace-nowrap">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </div>
                  </motion.div>
                )}

                <CardHeader className={`text-center relative z-10 pb-4 ${plan.popular ? 'pt-4' : ''}`}>
                  <CardTitle className="text-xl font-bold text-gray-900 mb-2">{plan.name}</CardTitle>
                  <motion.div
                    className="mt-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className={`text-4xl font-bold ${plan.popular ? 'text-gradient' : 'text-gray-900'}`}>
                      {typeof plan.price.monthly === "number"
                        ? `$${isAnnual ? plan.price.annual : plan.price.monthly}`
                        : plan.price.monthly}
                    </span>
                    {typeof plan.price.monthly === "number" && (
                      <span className="text-gray-600 text-base">/{isAnnual ? "year" : "month"}</span>
                    )}
                  </motion.div>
                  <p className="text-gray-600 mt-3">{plan.description}</p>
                </CardHeader>

                <CardContent className="relative z-10">
                  <ul className="mb-8 space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        className="flex items-center"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + featureIndex * 0.05 }}
                      >
                        <div className="mr-3 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                          <Check className="h-3 w-3 text-green-600" />
                        </div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      className={`w-full py-3 font-semibold transition-all duration-300 ${
                        plan.popular
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
                          : "bg-gray-900 hover:bg-gray-800 text-white shadow-lg hover:shadow-xl"
                      }`}
                    >
                      {plan.name === "Enterprise" && <Zap className="w-4 h-4 mr-2" />}
                      {plan.cta}
                    </Button>
                  </motion.div>
                </CardContent>

                {/* Hover Effect Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"
                  initial={false}
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
