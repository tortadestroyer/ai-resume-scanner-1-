import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Mock database
const mockDatabase = {
  candidates: [],
  jobPostings: [],
  employers: [],
};

// Mock keyword sets for different job titles
const jobKeywords = {
  "software engineer": ["javascript", "python", "react", "node.js", "sql", "git", "api", "database"],
  "data scientist": ["python", "sql", "machine learning", "pandas", "numpy", "tableau", "statistics"],
  "marketing manager": ["marketing", "seo", "social media", "analytics", "campaign", "brand"],
  "product manager": ["product", "roadmap", "agile", "scrum", "analytics", "user experience"],
  "sales representative": ["sales", "crm", "lead generation", "negotiation", "customer service"],
};

// Mock PDF text extraction
function extractTextFromPDF(buffer) {
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
      `);
    }, 1000);
  });
}

// Calculate match score
function calculateMatchScore(resumeText, jobTitle) {
  const keywords = jobKeywords[jobTitle.toLowerCase()] || [];
  const resumeLower = resumeText.toLowerCase();

  let matches = 0;
  keywords.forEach((keyword) => {
    if (resumeLower.includes(keyword.toLowerCase())) {
      matches++;
    }
  });

  return Math.round((matches / keywords.length) * 100);
}

// Mock email sending
async function sendEmail(to, subject, content) {
  console.log(`Sending email to ${to}: ${subject}`);
  return true;
}

// API Routes
app.post('/api/upload-resume', upload.single('resume_pdf'), async (req, res) => {
  try {
    const { job_title, company_id, candidate_email, candidate_name } = req.body;
    const resumeFile = req.file;

    if (!resumeFile || !job_title || !company_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Extract text from PDF
    const resumeText = await extractTextFromPDF(resumeFile.buffer);

    // Calculate match score
    const matchScore = calculateMatchScore(resumeText, job_title);

    // Determine qualification threshold (70% for this example)
    const qualificationThreshold = 70;
    const isQualified = matchScore >= qualificationThreshold;

    // Create candidate record
    const candidate = {
      id: uuidv4(),
      name: candidate_name || "Unknown",
      email: candidate_email || "unknown@example.com",
      jobTitle: job_title,
      companyId: company_id,
      resumeText,
      matchScore,
      status: isQualified ? "qualified" : "rejected",
      createdAt: new Date().toISOString(),
    };

    // Store in mock database
    mockDatabase.candidates.push(candidate);

    // Send appropriate email
    if (isQualified) {
      await sendEmail(
        candidate.email,
        "Interview Invitation",
        `Congratulations! You've been selected for an interview. Please schedule your interview: https://calendly.com/company/interview`
      );
    } else {
      await sendEmail(
        candidate.email,
        "Application Update",
        "Thank you for your application. Unfortunately, we have decided to move forward with other candidates at this time."
      );
    }

    res.json({
      success: true,
      candidate: {
        id: candidate.id,
        matchScore: candidate.matchScore,
        status: candidate.status,
      },
    });
  } catch (error) {
    console.error("Error processing resume:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/api/candidates', (req, res) => {
  const { company_id, status, job_title } = req.query;

  let candidates = mockDatabase.candidates;

  // Filter by company
  if (company_id) {
    candidates = candidates.filter((c) => c.companyId === company_id);
  }

  // Filter by status
  if (status) {
    candidates = candidates.filter((c) => c.status === status);
  }

  // Filter by job title
  if (job_title) {
    candidates = candidates.filter((c) => c.jobTitle.toLowerCase().includes(job_title.toLowerCase()));
  }

  res.json({
    candidates: candidates.map((c) => ({
      id: c.id,
      name: c.name,
      email: c.email,
      jobTitle: c.jobTitle,
      matchScore: c.matchScore,
      status: c.status,
      createdAt: c.createdAt,
    })),
  });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Frontend: http://localhost:${PORT}`);
  console.log(`🔗 API: http://localhost:${PORT}/api`);
});
