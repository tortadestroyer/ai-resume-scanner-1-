"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Users, 
  UserCheck, 
  UserX, 
  TrendingUp, 
  Clock, 
  Target,
  BarChart3,
  Calendar,
  Mail,
  FileText,
  ArrowUp,
  ArrowDown
} from "lucide-react"
import Link from "next/link"

interface AnalyticsData {
  totalCandidates: number
  qualifiedCandidates: number
  rejectedCandidates: number
  avgMatchScore: number
  timeToHire: number
  interviewsScheduled: number
  emailsSent: number
  resumesProcessed: number
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData>({
    totalCandidates: 0,
    qualifiedCandidates: 0,
    rejectedCandidates: 0,
    avgMatchScore: 0,
    timeToHire: 0,
    interviewsScheduled: 0,
    emailsSent: 0,
    resumesProcessed: 0
  })

  const [isLive, setIsLive] = useState(true)

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (isLive) {
        setData(prev => ({
          totalCandidates: Math.min(prev.totalCandidates + Math.floor(Math.random() * 3), 1247),
          qualifiedCandidates: Math.min(prev.qualifiedCandidates + Math.floor(Math.random() * 2), 423),
          rejectedCandidates: Math.min(prev.rejectedCandidates + Math.floor(Math.random() * 2), 824),
          avgMatchScore: Math.min(prev.avgMatchScore + Math.random() * 2, 87),
          timeToHire: Math.max(prev.timeToHire - Math.random() * 0.5, 12),
          interviewsScheduled: Math.min(prev.interviewsScheduled + Math.floor(Math.random() * 2), 156),
          emailsSent: Math.min(prev.emailsSent + Math.floor(Math.random() * 5), 2341),
          resumesProcessed: Math.min(prev.resumesProcessed + Math.floor(Math.random() * 4), 1247)
        }))
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [isLive])

  // Initialize with demo data
  useEffect(() => {
    setData({
      totalCandidates: 1234,
      qualifiedCandidates: 412,
      rejectedCandidates: 822,
      avgMatchScore: 84,
      timeToHire: 14.5,
      interviewsScheduled: 152,
      emailsSent: 2298,
      resumesProcessed: 1234
    })
  }, [])

  const recentActivity = [
    { id: 1, action: "Resume processed", candidate: "Sarah Johnson", score: 92, time: "2 min ago" },
    { id: 2, action: "Interview scheduled", candidate: "Mike Chen", score: 88, time: "5 min ago" },
    { id: 3, action: "Candidate rejected", candidate: "Alex Smith", score: 34, time: "8 min ago" },
    { id: 4, action: "Resume processed", candidate: "Emily Davis", score: 91, time: "12 min ago" },
    { id: 5, action: "Interview scheduled", candidate: "David Wilson", score: 85, time: "15 min ago" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 break-words">ResuScan Analytics Dashboard</h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base break-words">Real-time recruitment insights and performance metrics</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 flex-shrink-0">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              <span className="text-sm text-gray-600 whitespace-nowrap">{isLive ? 'Live Data' : 'Paused'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setIsLive(!isLive)}
                variant="outline"
                size="sm"
                className="whitespace-nowrap"
              >
                {isLive ? 'Pause' : 'Resume'}
              </Button>
              <Link href="/demo">
                <Button className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap">
                  Schedule Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(data.totalCandidates)}</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUp className="h-3 w-3 mr-1" />
                +12% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Qualified</CardTitle>
              <UserCheck className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{Math.round(data.qualifiedCandidates)}</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUp className="h-3 w-3 mr-1" />
                +8% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Match Score</CardTitle>
              <Target className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{Math.round(data.avgMatchScore)}%</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUp className="h-3 w-3 mr-1" />
                +3% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Time to Hire</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{data.timeToHire.toFixed(1)} days</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowDown className="h-3 w-3 mr-1" />
                -15% from last month
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interviews Scheduled</CardTitle>
              <Calendar className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(data.interviewsScheduled)}</div>
              <Progress value={75} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Emails Sent</CardTitle>
              <Mail className="h-4 w-4 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(data.emailsSent)}</div>
              <Progress value={85} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resumes Processed</CardTitle>
              <FileText className="h-4 w-4 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(data.resumesProcessed)}</div>
              <Progress value={90} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {Math.round((data.qualifiedCandidates / data.totalCandidates) * 100)}%
              </div>
              <Progress value={(data.qualifiedCandidates / data.totalCandidates) * 100} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <div className="font-medium">{activity.action}</div>
                      <div className="text-sm text-gray-600">{activity.candidate}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge 
                      variant={activity.score >= 80 ? "default" : activity.score >= 60 ? "secondary" : "destructive"}
                    >
                      {activity.score}% match
                    </Badge>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Transform Your Recruitment Process?
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                This is just a preview of what ResuScan can do for your organization. 
                Schedule a personalized demo to see how we can help you save time and find better candidates.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/demo">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Schedule Your Demo
                  </Button>
                </Link>
                <Link href="/">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
