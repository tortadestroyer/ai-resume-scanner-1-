"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { HelpCircle } from "lucide-react"

const faqs = [
  {
    question: "How accurate is the AI resume scanning?",
    answer:
      "Our AI achieves 98% accuracy in keyword extraction and candidate matching. The system is continuously trained on industry-specific data to improve performance.",
  },
  {
    question: "What file formats are supported?",
    answer:
      "Currently, we support PDF format for resume uploads. We're working on adding support for DOC and DOCX files in the near future.",
  },
  {
    question: "How is candidate data protected?",
    answer:
      "We're fully GDPR compliant and use enterprise-grade encryption for all data. Candidate information is stored securely and can be deleted upon request.",
  },
  {
    question: "Can I customize the keyword matching criteria?",
    answer:
      "Yes! Pro and Enterprise plans allow you to create custom keyword sets and adjust matching criteria based on your specific requirements.",
  },
  {
    question: "How does the Calendly integration work?",
    answer:
      "When a candidate meets your qualification threshold, the system automatically sends them a personalized email with your Calendly link for interview scheduling.",
  },
  {
    question: "Is there an API available?",
    answer:
      "Yes, our RESTful API is available for Pro and Enterprise customers, allowing you to integrate our resume scanning capabilities into your existing systems.",
  },
]

export function FAQ() {
  const { ref, isInView, containerVariants, itemVariants, fadeInVariants } = useScrollAnimation()

  return (
    <section id="faq" className="px-4 py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="mx-auto max-w-4xl relative">
        <motion.div
          className="text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInVariants}
        >
          <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full">
            <HelpCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900 md:text-3xl lg:text-4xl">
            <span className="text-blue-600 font-bold">
              Frequently Asked Questions
            </span>
          </h2>
          <p className="mb-12 text-lg text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about our AI-powered recruitment platform
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border-0 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-2 group-hover:scale-[1.02] overflow-hidden relative"
                >
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[1px] rounded-xl">
                    <div className="bg-white rounded-xl h-full w-full"></div>
                  </div>

                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300 py-6 relative z-10 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-6 relative z-10 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>

                  {/* Hover Effect Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
                    initial={false}
                  />
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
