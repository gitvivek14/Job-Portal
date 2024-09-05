<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
<!--     <title>Job Portal Backend - README</title> -->
</head>
<body>

<h1>Job Portal Backend</h1>
<p>This project is a backend service for a Job Portal application. It provides RESTful APIs for managing job listings, user profiles, and resume uploads. The application is built with Node.js, Express, and MongoDB.</p>
<h2>Postman API Collection</h2>
<p>You can find the Postman collection for testing all the API endpoints <a href= "https://www.postman.com/security-physicist-61325734/workspace/job-portal">here</a>.</p>

<h2>Features</h2>
<ul>
    <li><strong>User Authentication & Authorization:</strong> Secure authentication using JWT tokens.</li>
    <li><strong>User Profile Management:</strong> Users can create a profile, upload their latest resume, and edit their information, including education, experience, and projects.</li>
    <li><strong>Job Listings:</strong> CRUD operations for job listings with filters for location, job type, experience, and compensation.</li>
    <li><strong>Job Browsing and Filtering:</strong> Users can view all available jobs and filter them based on various categories such as location, job type, job title, required years of experience, and compensation.</li>
    <li><strong>Application Tracking:</strong> Users can view all the jobs they have applied to and manage their applications.</li>
    <li><strong>Employer Profile Management:</strong> Employers can create profiles, add, view, edit, and delete job postings.</li>
    <li><strong>Applicant Tracking for Employers:</strong> Employers can view all applicants for their job postings and filter applicants based on various criteria.</li>
    <li><strong>Enhanced Filtering Categories:</strong> Enhanced job filtering capabilities by adding more intuitive categories to the job descriptions in the JSON file.</li>
    <li>
        <strong>Rate Limiting: Implemented rate limiting to protect the APIs from abuse and ensure fair usage.
    </li>
    <li><strong>Resume Upload:</strong> Upload resumes to Cloudinary and associate them with user profiles.</li>
</ul>

<h2>API Endpoints</h2>

<h3>Authentication</h3>
<ul>
    <li><code>POST /api/auth/register</code><br>
    Register a new user.<br>
    <strong>Body:</strong> 
    <pre>{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}</pre>
    </li>
    <li><code>POST /api/auth/login</code><br>
    Login a user.<br>
    <strong>Body:</strong> 
    <pre>{
  "email": "john@example.com",
  "password": "password123"
}</pre>
    </li>
</ul>

<h3>Profile</h3>
<ul>
    <li><code>GET /api/profile</code><br>
    Get the profile of the logged-in user.</li>
    <li><code>POST /api/profile/upload-resume</code><br>
    Upload a resume PDF.<br>
    <strong>Form-Data:</strong> resume (file)</li>
</ul>

<h3>Jobs</h3>
<ul>
    <li><code>GET /api/jobs</code><br>
    Get all jobs with optional filters for location, jobType, title, experience, and compensation.<br>
    <strong>Query Parameters:</strong> location, jobType, title, experience, compensation.</li>
    <li><code>POST /api/jobs</code><br>
    Create a new job (employer only).<br>
    <strong>Body:</strong> 
    <pre>{
  "title": "Software Engineer",
  "company": "Tech Corp",
  "location": "San Francisco",
  "jobType": "Full-Time",
  "experienceRequired": 2,
  "compensation": "100000",
  "description": "Job description here",
  "employer": "employer_id"
}</pre>
    </li>
    <li><code>PUT /api/jobs</code><br>
    Edit an existing job (employer only).<br>
    <strong>Body:</strong> 
    <pre>{
  "id": "job_id",
  "data": {
    "title": "Updated Title",
    "location": "New York"
  }
}</pre>
    </li>
    <li><code>DELETE /api/jobs/:id</code><br>
    Delete a job by its ID (employer only).</li>
</ul>

<h2>Environment Variables</h2>
<p>Create a <code>.env</code> file in the root directory with the following environment variables:</p>
<ul>
    <li><code>MONGO_URI=mongodb://localhost:27017/job-portal</code></li>
    <li><code>JWT_SECRET=your_jwt_secret_key</code></li>
    <li><code>CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name</code></li>
    <li><code>CLOUDINARY_API_KEY=your_cloudinary_api_key</code></li>
    <li><code>CLOUDINARY_API_SECRET=your_cloudinary_api_secret</code></li>
</ul>

<h2>How to Run the Application</h2>
<ol>
    <li>Clone the repository:<br>
    <pre>git clone https://github.com/gitvivek14/Job-Portal.git</pre>
    <pre>cd Job-Portal</pre>
    </li>
    <li>Install dependencies:<br>
    <pre>npm install</pre>
    </li>
    <li>Set up environment variables:<br>
    <ul>
        <li>Create a <code>.env</code> file in the root directory.</li>
        <li>Add the environment variables as described above.</li>
    </ul>
    </li>
    <li>Run the application:<br>
    <pre>npm run  start</pre>
    </li>
</ol>

<p>The API will be accessible at <code>http://localhost:4000</code>.</p>

<h2>Database Schema (ER Diagram)</h2>
<p>Here's a basic ER diagram representing the relationships between the entities in the database:</p>
<p>Working on it. </p>





<h2>Contributing</h2>
<p>Feel free to fork this repository, submit issues, and pull requests. For major changes, please open an issue first to discuss what you would like to change.</p>

<h2>License</h2>
<p>This project is licensed under the MIT License. See the <a href="LICENSE">LICENSE</a> file for details.</p>

</body>
</html>
