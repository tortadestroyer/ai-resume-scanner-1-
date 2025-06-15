"use client"

import { useInView } from "framer-motion"
import { useRef } from "react"

export function useScrollAnimation(options = {}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px",
    ...options 
  })

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

  const fadeInVariants = {
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

  return {
    ref,
    isInView,
    containerVariants,
    itemVariants,
    fadeInVariants
  }
}
