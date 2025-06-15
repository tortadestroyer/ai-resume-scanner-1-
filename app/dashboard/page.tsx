"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Users, UserCheck, UserX, TrendingUp, Upload, Filter } from "lucide-react"

interface Candidate {
  id: string
  name: string
  email: string
  jobTitle: string
  matchScore: number
  status: "qualified" | "rejected"
  createdAt: string
}

export default function Dashboard() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([])
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isUploading, setIsUploading] = useState(false)

  // Mock data for demonstration
  useEffect(() => {
    const mockCandidates: Candidate[] = [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        jobTitle: "Software Engineer",
        matchScore: 85,
        status: "qualified",
        createdAt: "2024-01-15T10:30:00Z",
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        jobTitle: "Data Scientist",
        matchScore: 92,
        status: "qualified",
        createdAt: "2024-01-15T11:15:00Z",
      },
      {
        id: "3",
        name: "Bob Johnson",
        email: "bob@example.com",
        jobTitle: "Software Engineer",
        matchScore: 45,
        status: "rejected",
        createdAt: "2024-01-15T12:00:00Z",
      },
    ]
    setCandidates(mockCandidates)
    setFilteredCandidates(mockCandidates)
  }, [])

  // Filter candidates based on status and search term
  useEffect(() => {
    let filtered = candidates

    if (statusFilter !== "all") {
      filtered = filtered.filter((c) => c.status === statusFilter)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredCandidates(filtered)
  }, [candidates, statusFilter, searchTerm])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)

    const formData = new FormData()
    formData.append("resume_pdf", file)
    formData.append("job_title", "Software Engineer")
    formData.append("company_id", "demo-company")
    formData.append("candidate_name", "Demo Candidate")
    formData.append("candidate_email", "demo@example.com")

    try {
      const response = await fetch("/api/upload-resume", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        // Refresh candidates list
        window.location.reload()
      }
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const stats = {
    total: candidates.length,
    qualified: candidates.filter((c) => c.status === "qualified").length,
    rejected: candidates.filter((c) => c.status === "rejected").length,
    avgScore:
      candidates.length > 0 ? Math.round(candidates.reduce((sum, c) => sum + c.matchScore, 0) / candidates.length) : 0,
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Recruitment Dashboard</h1>
          <p className="text-gray-600">Manage your candidate pipeline and analytics</p>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Qualified</CardTitle>
              <UserCheck className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.qualified}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <UserX className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.avgScore}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Upload Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="mr-2 h-5 w-5" />
              Upload Resume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="max-w-md"
              />
              {isUploading && <div className="text-sm text-gray-600">Processing...</div>}
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="mr-2 h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Input
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Candidates</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Candidates Table */}
        <Card>
          <CardHeader>
            <CardTitle>Candidates ({filteredCandidates.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredCandidates.map((candidate) => (
                <div key={candidate.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex-1">
                    <div className="font-medium">{candidate.name}</div>
                    <div className="text-sm text-gray-600">{candidate.email}</div>
                    <div className="text-sm text-gray-600">{candidate.jobTitle}</div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-lg font-bold">{candidate.matchScore}%</div>
                      <div className="text-xs text-gray-600">Match Score</div>
                    </div>

                    <Badge variant={candidate.status === "qualified" ? "default" : "destructive"}>
                      {candidate.status}
                    </Badge>

                    <div className="text-sm text-gray-600">{new Date(candidate.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
              ))}

              {filteredCandidates.length === 0 && (
                <div className="text-center py-8 text-gray-600">No candidates found matching your criteria.</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
