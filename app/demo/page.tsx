"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, User, Building, Mail, Phone, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function DemoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitted(true)
    setIsLoading(false)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="border-0 shadow-xl">
              <CardContent className="p-12">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Thank You for Your Interest!
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  We've received your demo request. Our team will contact you within 24 hours to schedule your personalized demo.
                </p>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    In the meantime, feel free to explore our analytics dashboard:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/analytics">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        View Analytics Demo
                      </Button>
                    </Link>
                    <Link href="/">
                      <Button variant="outline">
                        Back to Home
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-16">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Schedule Your Free Demo
            </h1>
            <p className="text-xl text-gray-600">
              See how ResuScan can transform your recruitment process. Book a personalized demo with our team.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <User className="mr-3 h-6 w-6 text-blue-600" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name *</Label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      required
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Enter your company name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Information</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your hiring needs, team size, or any specific questions..."
                      rows={4}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Schedule Demo"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Demo Information */}
            <div className="space-y-8">
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Calendar className="mr-3 h-6 w-6 text-blue-600" />
                    What to Expect
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold">30-Minute Demo</h3>
                      <p className="text-gray-600">Personalized walkthrough of ResuScan's features</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <User className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold">Expert Consultation</h3>
                      <p className="text-gray-600">Discuss your specific recruitment challenges</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Building className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold">Custom Solution</h3>
                      <p className="text-gray-600">Learn how ResuScan fits your organization</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-blue-50">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3">Why Choose ResuScan?</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 98% accuracy in resume analysis</li>
                    <li>• Save 200+ hours per month</li>
                    <li>• 50% faster hiring process</li>
                    <li>• Seamless integration with existing tools</li>
                    <li>• Enterprise-grade security</li>
                  </ul>
                </CardContent>
              </Card>

              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Need immediate assistance?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" className="flex items-center">
                    <Mail className="mr-2 h-4 w-4" />
                    sales@resuscan.com
                  </Button>
                  <Button variant="outline" className="flex items-center">
                    <Phone className="mr-2 h-4 w-4" />
                    +1 (555) 123-4567
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
