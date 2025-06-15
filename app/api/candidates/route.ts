import { type NextRequest, NextResponse } from "next/server"

// Mock database - same as in upload-resume route
const mockDatabase = {
  candidates: [] as any[],
  jobPostings: [] as any[],
  employers: [] as any[],
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const companyId = searchParams.get("company_id")
  const status = searchParams.get("status")
  const jobTitle = searchParams.get("job_title")

  let candidates = mockDatabase.candidates

  // Filter by company
  if (companyId) {
    candidates = candidates.filter((c) => c.companyId === companyId)
  }

  // Filter by status
  if (status) {
    candidates = candidates.filter((c) => c.status === status)
  }

  // Filter by job title
  if (jobTitle) {
    candidates = candidates.filter((c) => c.jobTitle.toLowerCase().includes(jobTitle.toLowerCase()))
  }

  return NextResponse.json({
    candidates: candidates.map((c) => ({
      id: c.id,
      name: c.name,
      email: c.email,
      jobTitle: c.jobTitle,
      matchScore: c.matchScore,
      status: c.status,
      createdAt: c.createdAt,
    })),
  })
}
