"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Brain, Mail, Phone, MapPin, Twitter, Linkedin, Github, ArrowUp } from "lucide-react"
import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function Footer() {
  const { ref, isInView, containerVariants, itemVariants } = useScrollAnimation()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.3),transparent_50%)]"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 relative">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-8 lg:grid-cols-4"
        >
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <motion.div
              className="mb-6 flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="mr-3 p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ResuScan
              </span>
            </motion.div>
            <p className="mb-8 text-gray-300 text-lg leading-relaxed">
              AI-powered resume scanning that finds you only the best candidates. Revolutionize your hiring process with
              intelligent automation and cutting-edge technology.
            </p>
            <div className="flex max-w-md">
              <Input
                placeholder="Enter your email for updates"
                className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 transition-colors"
              />
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="ml-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                  Subscribe
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="mb-6 text-xl font-bold text-white">Product</h3>
            <ul className="space-y-3 text-gray-300">
              {[
                { label: "Features", href: "#features" },
                { label: "Pricing", href: "#pricing" },
                { label: "API Docs", href: "#" },
                { label: "Integrations", href: "#" }
              ].map((item, index) => (
                <motion.li key={index}>
                  <motion.a
                    href={item.href}
                    className="hover:text-blue-400 transition-colors duration-300 flex items-center group"
                    whileHover={{ x: 5 }}
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item.label}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="mb-6 text-xl font-bold text-white">Contact</h3>
            <ul className="space-y-4 text-gray-300">
              <motion.li
                className="flex items-center group cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <div className="mr-3 p-2 bg-gray-800 rounded-lg group-hover:bg-blue-600 transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                hello@resuscan.com
              </motion.li>
              <motion.li
                className="flex items-center group cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <div className="mr-3 p-2 bg-gray-800 rounded-lg group-hover:bg-green-600 transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                +1 (555) 123-4567
              </motion.li>
              <motion.li
                className="flex items-center group cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <div className="mr-3 p-2 bg-gray-800 rounded-lg group-hover:bg-red-600 transition-colors">
                  <MapPin className="h-4 w-4" />
                </div>
                San Francisco, CA
              </motion.li>
            </ul>

            {/* Social Links */}
            <div className="mt-8">
              <h4 className="mb-4 text-lg font-semibold text-white">Follow Us</h4>
              <div className="flex space-x-4">
                {[
                  { icon: Twitter, color: "hover:bg-blue-500" },
                  { icon: Linkedin, color: "hover:bg-blue-600" },
                  { icon: Github, color: "hover:bg-gray-600" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className={`p-3 bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-all duration-300 ${social.color}`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        <Separator className="my-12 bg-gray-700" />

        <motion.div
          className="flex flex-col items-center justify-between md:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-400 text-lg">© 2024 ResuScan. All rights reserved.</p>
          <div className="mt-4 flex items-center space-x-6 md:mt-0">
            {[
              "Privacy Policy",
              "Terms of Service",
              "Cookie Policy"
            ].map((item, index) => (
              <motion.a
                key={index}
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Scroll to Top Button */}
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <ArrowUp className="h-6 w-6" />
        </motion.button>
      </div>
    </footer>
  )
}
