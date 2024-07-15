# Vac Vac

Vac Vac is a comprehensive job application platform designed for both job seekers and employers. The
application ensures secure access for authenticated users only, maintaining their sessions even
after page reloads. The platform consists of six main pages, each catering to the different needs of
job seekers and employers.

## Features

### Common Pages

- **Vacancies Page**: Accessible by both job seekers and employers, displaying a list of available
  job postings.
- **Vacancy Details Page**: Accessible by both job seekers and employers, displaying detailed
  information about a specific job posting.

### Job Seeker Pages

- **My Vacancies Page**: Lists the job postings the user has applied to.

### Employer Pages

- **Active Vacancies Page**: Lists the active job postings created by the employer.
- **Active Vacancy Details Page**: Displays detailed information about a specific active job posting
  created by the employer, with options to close the vacancy.
- **Create Vacancy Page**: Allows employers to create new job postings.

### Authentication Pages

- **Login Page**: For user authentication.
- **Job Seeker Registration Page**: For job seekers to register.
- **Employer Registration Page**: For companies to register.

## User Permissions

- **Employers**: Can view the number of applicants for their job postings, close vacancies, and
  create new job postings. They cannot access the job seeker-specific pages.
- **Job Seekers**: Can view and apply to job postings, see which jobs they have applied to, and
  cancel applications. They cannot access employer-specific pages and will be redirected to the
  Vacancies Page if attempting to access restricted pages.

## Backend Endpoints

- **POST /login**: User login.
- **POST /signup**: User registration.
- **GET /vacancies**: Retrieve a list of all vacancies.
- **GET /vacancies/:id**: Retrieve details of a specific vacancy.
- **POST /vacancies**: Create a new vacancy.
- **PUT /vacancies**: Update an existing vacancy.
- **DELETE /vacancies**: Delete a vacancy.
- **GET /my-vacancies**: Retrieve a list of vacancies the user has applied to.

## Technology Stack

- **Frontend**: React with Redux for state management.
- **Backend**: Node.js (or any other preferred technology stack, as specified in the instructions).

## Setup Instructions

### Backend

1. Navigate to the backend directory.
2. Install dependencies: `npm install`.
3. Start the backend server: `node {file_path}`.

### Frontend

1. Open a new terminal and navigate to the React application directory.
2. Install dependencies: `yarn install`.
3. Start the frontend application: `yarn start`.

*Note: If port 3000 is occupied by the backend server, the frontend application will automatically
prompt to use a different port.*

## Repository Structure

- **backend/**: Contains backend server code.
- **frontend/**: Contains React application code.
- **instructions.md**: Detailed setup and deployment instructions.

Vac Vac is designed to streamline the job application process, providing a user-friendly interface
for both job seekers and employers to interact seamlessly.
