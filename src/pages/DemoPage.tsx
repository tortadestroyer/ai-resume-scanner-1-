import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Textarea } from "../components/ui/textarea"
import { Upload, FileText, CheckCircle, Clock, User, Building, Mail, Phone, Zap, Target, BarChart3 } from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { toast } from "sonner"

export function DemoPage() {
  const [formData, setFormData] = useState({
    candidateName: "",
    candidateEmail: "",
    jobTitle: "",
    companyId: "demo-company"
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file)
    } else {
      toast.error("Please select a PDF file")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) {
      toast.error("Please select a resume file")
      return
    }

    setIsUploading(true)

    const formDataToSend = new FormData()
    formDataToSend.append("resume_pdf", selectedFile)
    formDataToSend.append("job_title", formData.jobTitle)
    formDataToSend.append("company_id", formData.companyId)
    formDataToSend.append("candidate_name", formData.candidateName)
    formDataToSend.append("candidate_email", formData.candidateEmail)

    try {
      const response = await fetch("/api/upload-resume", {
        method: "POST",
        body: formDataToSend,
      })

      if (response.ok) {
        const data = await response.json()
        setResult(data.candidate)
        toast.success("Resume processed successfully!")
      } else {
        toast.error("Failed to process resume")
      }
    } catch (error) {
      console.error("Upload failed:", error)
      toast.error("Upload failed. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      candidateName: "",
      candidateEmail: "",
      jobTitle: "",
      companyId: "demo-company"
    })
    setSelectedFile(null)
    setResult(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-24">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              AI Resume Scanner Demo
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600"
            >
              Upload a resume and see our AI in action. Get instant qualification scores and automated responses.
            </motion.p>
          </div>

          {result ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="border-0 shadow-xl">
                <CardContent className="p-8 text-center">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Resume Processed Successfully!
                  </h2>
                  
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <div className="grid grid-cols-2 gap-4 text-left">
                      <div>
                        <p className="text-sm text-gray-600">Match Score</p>
                        <p className={`text-2xl font-bold ${result.matchScore >= 70 ? 'text-green-600' : 'text-orange-600'}`}>
                          {result.matchScore}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <p className={`text-lg font-semibold capitalize ${
                          result.status === 'qualified' ? 'text-green-600' : 'text-orange-600'
                        }`}>
                          {result.status}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">
                    {result.status === 'qualified' 
                      ? "🎉 Candidate qualified! Automated interview invitation email sent."
                      : "📧 Automated rejection email sent with feedback."}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button onClick={resetForm} className="bg-blue-600 hover:bg-blue-700">
                      Process Another Resume
                    </Button>
                    <Link to="/analytics">
                      <Button variant="outline">
                        View Analytics Dashboard
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Upload Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-2xl">
                      <Upload className="mr-3 h-6 w-6 text-blue-600" />
                      Resume Upload
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="jobTitle">Job Title *</Label>
                        <Select value={formData.jobTitle} onValueChange={(value) => setFormData(prev => ({ ...prev, jobTitle: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a job title" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="software engineer">Software Engineer</SelectItem>
                            <SelectItem value="data scientist">Data Scientist</SelectItem>
                            <SelectItem value="marketing manager">Marketing Manager</SelectItem>
                            <SelectItem value="product manager">Product Manager</SelectItem>
                            <SelectItem value="sales representative">Sales Representative</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="candidateName">Candidate Name *</Label>
                        <Input
                          id="candidateName"
                          name="candidateName"
                          type="text"
                          required
                          value={formData.candidateName}
                          onChange={handleInputChange}
                          placeholder="Enter candidate name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="candidateEmail">Candidate Email *</Label>
                        <Input
                          id="candidateEmail"
                          name="candidateEmail"
                          type="email"
                          required
                          value={formData.candidateEmail}
                          onChange={handleInputChange}
                          placeholder="Enter candidate email"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="resume">Resume (PDF) *</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                          <input
                            id="resume"
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          <label htmlFor="resume" className="cursor-pointer">
                            {selectedFile ? (
                              <div className="flex items-center justify-center space-x-2">
                                <FileText className="h-8 w-8 text-blue-600" />
                                <span className="text-sm font-medium">{selectedFile.name}</span>
                              </div>
                            ) : (
                              <div>
                                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-600">Click to upload PDF resume</p>
                              </div>
                            )}
                          </label>
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
                        disabled={isUploading}
                      >
                        {isUploading ? (
                          <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>Processing Resume...</span>
                          </div>
                        ) : (
                          "Process Resume"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Demo Information */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-8"
              >
                <Card className="border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-2xl">
                      <Zap className="mr-3 h-6 w-6 text-blue-600" />
                      How It Works
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 rounded-full p-2">
                        <Upload className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">1. Upload Resume</h3>
                        <p className="text-gray-600">Upload a PDF resume for analysis</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 rounded-full p-2">
                        <Target className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">2. AI Analysis</h3>
                        <p className="text-gray-600">Our AI extracts skills and calculates job fit</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 rounded-full p-2">
                        <BarChart3 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">3. Instant Results</h3>
                        <p className="text-gray-600">Get qualification scores and automated responses</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-blue-50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-3">Demo Features</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Real-time resume parsing</li>
                      <li>• Job-specific keyword matching</li>
                      <li>• Automated qualification scoring</li>
                      <li>• Instant email responses</li>
                      <li>• Candidate status tracking</li>
                    </ul>
                  </CardContent>
                </Card>

                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    Want to see more features?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/analytics">
                      <Button variant="outline" className="flex items-center">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Analytics Dashboard
                      </Button>
                    </Link>
                    <Link to="/">
                      <Button variant="outline" className="flex items-center">
                        <Mail className="mr-2 h-4 w-4" />
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
