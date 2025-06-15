import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Progress } from "../components/ui/progress"
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
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts'

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

export function AnalyticsPage() {
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

  const chartData = [
    { name: 'Jan', applications: 65, qualified: 23 },
    { name: 'Feb', applications: 89, qualified: 31 },
    { name: 'Mar', applications: 123, qualified: 45 },
    { name: 'Apr', applications: 156, qualified: 58 },
    { name: 'May', applications: 198, qualified: 72 },
    { name: 'Jun', applications: 247, qualified: 89 },
  ]

  const pieData = [
    { name: 'Qualified', value: data.qualifiedCandidates, color: '#10b981' },
    { name: 'Under Review', value: Math.floor(data.totalCandidates * 0.1), color: '#f59e0b' },
    { name: 'Rejected', value: data.rejectedCandidates, color: '#ef4444' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-50 pt-20"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">ResuScan Analytics Dashboard</h1>
            <p className="text-gray-600 mt-2">Real-time recruitment insights and performance metrics</p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
              <span className="text-sm text-gray-600">{isLive ? 'Live Data' : 'Paused'}</span>
            </div>
            <Button
              onClick={() => setIsLive(!isLive)}
              variant="outline"
              size="sm"
            >
              {isLive ? 'Pause' : 'Resume'}
            </Button>
            <Link to="/demo">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Schedule Demo
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="hover-lift">
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

          <Card className="hover-lift">
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

          <Card className="hover-lift">
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

          <Card className="hover-lift">
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
        </motion.div>

        {/* Charts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
        >
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle>Applications Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="applications" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="qualified" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader>
              <CardTitle>Candidate Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Secondary Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interviews Scheduled</CardTitle>
              <Calendar className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(data.interviewsScheduled)}</div>
              <Progress value={75} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Emails Sent</CardTitle>
              <Mail className="h-4 w-4 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(data.emailsSent)}</div>
              <Progress value={85} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resumes Processed</CardTitle>
              <FileText className="h-4 w-4 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(data.resumesProcessed)}</div>
              <Progress value={90} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="hover-lift">
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
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
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
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Card className="bg-blue-50 border-blue-200 hover-lift">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Transform Your Recruitment Process?
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                This is just a preview of what ResuScan can do for your organization. 
                Schedule a personalized demo to see how we can help you save time and find better candidates.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/demo">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    Schedule Your Demo
                  </Button>
                </Link>
                <Link to="/">
                  <Button size="lg" variant="outline" className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    Learn More
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
