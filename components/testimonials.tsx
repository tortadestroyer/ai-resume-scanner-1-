"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "HR Director",
    company: "TechCorp Inc.",
    content:
      "This platform has revolutionized our hiring process. We've reduced screening time by 80% and improved candidate quality significantly.",
    rating: 5,
    stats: "Saved 200+ hours/month",
  },
  {
    name: "Michael Chen",
    role: "Talent Acquisition Manager",
    company: "StartupXYZ",
    content:
      "The AI accuracy is incredible. It consistently identifies the best candidates while filtering out unqualified applicants automatically.",
    rating: 5,
    stats: "98% accuracy rate",
  },
  {
    name: "Emily Rodriguez",
    role: "Recruiting Lead",
    company: "Global Solutions",
    content:
      "The Calendly integration is seamless. Qualified candidates are automatically scheduled, making our process incredibly efficient.",
    rating: 5,
    stats: "50% faster hiring",
  },
]

export function Testimonials() {
  const { ref, isInView, containerVariants, itemVariants, fadeInVariants } = useScrollAnimation()

  return (
    <section className="px-4 py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '3s' }}></div>

      <div className="mx-auto max-w-7xl relative">
        <motion.div
          className="text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInVariants}
        >
          <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full">
            <Quote className="w-8 h-8 text-yellow-600" />
          </div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900 md:text-3xl lg:text-4xl">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
              Trusted by HR Teams Worldwide
            </span>
          </h2>
          <p className="mb-12 text-lg text-gray-600 max-w-3xl mx-auto">
            See what our customers are saying about their incredible results and transformative experiences
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-8 md:grid-cols-3"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
              whileHover={{
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm group-hover:scale-105 overflow-hidden relative h-full">
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[1px] rounded-lg">
                  <div className="bg-white rounded-lg h-full w-full"></div>
                </div>

                <CardContent className="p-8 relative z-10 h-full flex flex-col">
                  {/* Stars */}
                  <motion.div
                    className="mb-6 flex"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, rotate: -180 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        <Star className="h-6 w-6 fill-yellow-400 text-yellow-400 mr-1" />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Quote */}
                  <div className="relative mb-6 flex-grow">
                    <Quote className="absolute -top-2 -left-2 h-8 w-8 text-blue-200 opacity-50" />
                    <p className="text-gray-700 text-lg leading-relaxed italic pl-6">
                      "{testimonial.content}"
                    </p>
                  </div>

                  {/* Stats Badge */}
                  <motion.div
                    className="mb-6 inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold"
                    whileHover={{ scale: 1.05 }}
                  >
                    {testimonial.stats}
                  </motion.div>

                  {/* Author Info */}
                  <div className="border-t border-gray-100 pt-6">
                    <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                    <div className="text-blue-600 font-medium">{testimonial.role}</div>
                    <div className="text-gray-600">{testimonial.company}</div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"
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
