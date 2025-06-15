import { type NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

// Mock database - in production, use a real database
const mockDatabase = {
  candidates: [] as any[],
  jobPostings: [] as any[],
  employers: [] as any[],
}

// Mock keyword sets for different job titles
const jobKeywords = {
  "software engineer": ["javascript", "python", "react", "node.js", "sql", "git", "api", "database"],
  "data scientist": ["python", "sql", "machine learning", "pandas", "numpy", "tableau", "statistics"],
  "marketing manager": ["marketing", "seo", "social media", "analytics", "campaign", "brand"],
  "product manager": ["product", "roadmap", "agile", "scrum", "analytics", "user experience"],
  "sales representative": ["sales", "crm", "lead generation", "negotiation", "customer service"],
}

function extractTextFromPDF(file: File): Promise<string> {
  // Mock PDF text extraction - in production, use a library like pdf-parse
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`
        John Doe
        Software Engineer
        
        Experience:
        - 5 years of JavaScript development
        - Expert in React and Node.js
        - Database design with SQL
        - API development and integration
        - Git version control
        
        Education:
        - Bachelor's in Computer Science
        
        Skills:
        JavaScript, Python, React, Node.js, SQL, Git, API development, Database design
      `)
    }, 1000)
  })
}

function calculateMatchScore(resumeText: string, jobTitle: string): number {
  const keywords = jobKeywords[jobTitle.toLowerCase() as keyof typeof jobKeywords] || []
  const resumeLower = resumeText.toLowerCase()

  let matches = 0
  keywords.forEach((keyword) => {
    if (resumeLower.includes(keyword.toLowerCase())) {
      matches++
    }
  })

  return Math.round((matches / keywords.length) * 100)
}

async function sendEmail(to: string, subject: string, content: string) {
  // Mock email sending - in production, use SendGrid or similar
  console.log(`Sending email to ${to}: ${subject}`)
  return true
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const resumeFile = formData.get("resume_pdf") as File
    const jobTitle = formData.get("job_title") as string
    const companyId = formData.get("company_id") as string
    const candidateEmail = formData.get("candidate_email") as string
    const candidateName = formData.get("candidate_name") as string

    if (!resumeFile || !jobTitle || !companyId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Extract text from PDF
    const resumeText = await extractTextFromPDF(resumeFile)

    // Calculate match score
    const matchScore = calculateMatchScore(resumeText, jobTitle)

    // Determine qualification threshold (70% for this example)
    const qualificationThreshold = 70
    const isQualified = matchScore >= qualificationThreshold

    // Create candidate record
    const candidate = {
      id: uuidv4(),
      name: candidateName || "Unknown",
      email: candidateEmail || "unknown@example.com",
      jobTitle,
      companyId,
      resumeText,
      matchScore,
      status: isQualified ? "qualified" : "rejected",
      createdAt: new Date().toISOString(),
    }

    // Store in mock database
    mockDatabase.candidates.push(candidate)

    // Send appropriate email
    if (isQualified) {
      await sendEmail(
        candidate.email,
        "Interview Invitation",
        `Congratulations! You've been selected for an interview. Please schedule your interview: https://calendly.com/company/interview`,
      )
    } else {
      await sendEmail(
        candidate.email,
        "Application Update",
        "Thank you for your application. Unfortunately, we have decided to move forward with other candidates at this time.",
      )
    }

    return NextResponse.json({
      success: true,
      candidate: {
        id: candidate.id,
        matchScore: candidate.matchScore,
        status: candidate.status,
      },
    })
  } catch (error) {
    console.error("Error processing resume:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
