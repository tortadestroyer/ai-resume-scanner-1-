-- Seed data for AI Resume Scanner

-- Insert sample employers
INSERT INTO employers (name, company_name, email, api_key) VALUES
('John Smith', 'TechCorp Inc.', 'john@techcorp.com', 'tc_api_key_123'),
('Sarah Johnson', 'StartupXYZ', 'sarah@startupxyz.com', 'sx_api_key_456'),
('Michael Chen', 'Global Solutions', 'michael@globalsolutions.com', 'gs_api_key_789');

-- Insert sample job postings
INSERT INTO job_postings (employer_id, job_title, required_keywords, qualification_threshold) VALUES
((SELECT id FROM employers WHERE email = 'john@techcorp.com'), 
 'Software Engineer', 
 '["javascript", "python", "react", "node.js", "sql", "git", "api", "database"]', 
 75),
((SELECT id FROM employers WHERE email = 'sarah@startupxyz.com'), 
 'Data Scientist', 
 '["python", "sql", "machine learning", "pandas", "numpy", "tableau", "statistics"]', 
 80),
((SELECT id FROM employers WHERE email = 'michael@globalsolutions.com'), 
 'Marketing Manager', 
 '["marketing", "seo", "social media", "analytics", "campaign", "brand"]', 
 70);

-- Insert sample candidates
INSERT INTO candidates (job_posting_id, name, email, parsed_text, match_score, status, calendly_link) VALUES
((SELECT id FROM job_postings WHERE job_title = 'Software Engineer'), 
 'Alice Developer', 
 'alice@example.com', 
 'Experienced software engineer with 5 years in JavaScript, React, Node.js, and SQL. Strong background in API development and database design.',
 85, 
 'qualified',
 'https://calendly.com/techcorp/interview'),
((SELECT id FROM job_postings WHERE job_title = 'Data Scientist'), 
 'Bob Analyst', 
 'bob@example.com', 
 'Data scientist with expertise in Python, machine learning, pandas, and statistical analysis. Experience with Tableau and data visualization.',
 92, 
 'qualified',
 'https://calendly.com/startupxyz/interview'),
((SELECT id FROM job_postings WHERE job_title = 'Software Engineer'), 
 'Charlie Novice', 
 'charlie@example.com', 
 'Recent graduate with basic knowledge of HTML and CSS. Some exposure to JavaScript through coursework.',
 25, 
 'rejected',
 NULL);

-- Insert sample analytics data
INSERT INTO analytics (employer_id, event_type, event_data) VALUES
((SELECT id FROM employers WHERE email = 'john@techcorp.com'), 
 'resume_uploaded', 
 '{"job_title": "Software Engineer", "match_score": 85}'),
((SELECT id FROM employers WHERE email = 'sarah@startupxyz.com'), 
 'candidate_qualified', 
 '{"job_title": "Data Scientist", "match_score": 92}'),
((SELECT id FROM employers WHERE email = 'john@techcorp.com'), 
 'candidate_rejected', 
 '{"job_title": "Software Engineer", "match_score": 25}');
