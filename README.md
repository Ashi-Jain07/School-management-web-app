# 🏫 My Schools App

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/MySQL-8.0-blue?style=for-the-badge&logo=mysql" alt="MySQL" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.0-06B6D4?style=for-the-badge&logo=tailwindcss" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Railway-Deploy-purple?style=for-the-badge&logo=railway" alt="Railway" />
  <img src="https://img.shields.io/badge/JWT-Auth-orange?style=for-the-badge&logo=jsonwebtokens" alt="JWT" />
  <img src="https://img.shields.io/badge/Brevo-Email-red?style=for-the-badge&logo=sendinblue" alt="Brevo" />
</div>

<br />

<div align="center">
  <h3>🎓 A beautiful, secure school directory management system</h3>
  <p>Built with Next.js 15, featuring stunning UI/UX, OTP authentication, and robust backend functionality</p>
</div>

---

## ✨ Features

### 🔐 **Secure Authentication**
- **Email-based Login**: Secure login using email addresses
- **OTP Verification**: Email-based OTP verification using Brevo
- **JWT Token System**: Secure session management with JWT tokens
- **Protected Routes**: Only authenticated users can add schools
- **Public Access**: Anyone can view the schools directory

### 🎨 **Beautiful User Interface**
- **Modern Design**: Glassmorphism effects, gradient backgrounds, and smooth animations
- **Responsive Layout**: Mobile-first design that works perfectly on all devices
- **Interactive Elements**: Hover effects, micro-animations, and visual feedback
- **Professional Typography**: Clean, hierarchical text styling

### 🔍 **Smart Search & Discovery**
- **Real-time Search**: Instant filtering by school name
- **Advanced Filtering**: Live search results with result counts
- **Detailed View**: Comprehensive school information pages
- **Interactive Maps**: Direct integration with Google Maps

### 📝 **Robust School Management**
- **Protected Access**: Only authenticated users can add schools
- **Form Validation**: Real-time validation using React Hook Form
- **Image Upload**: Image upload with Cloudinary storage
- **Error Handling**: Comprehensive error states and user feedback
- **Success States**: Clear confirmation and automatic navigation

### 🚀 **Performance & User Experience**
- **Loading States**: Smooth loading animations and spinners
- **Error Boundaries**: Graceful error handling
- **Optimized Images**: Efficient image loading and display
- **SEO Friendly**: Proper meta tags and semantic HTML

---

## 🔑 Authentication Flow

### 1. User Access
- **Public Access**: `/showSchools` - Anyone can view schools
- **Protected Access**: `/addSchool` - Requires authentication

### 2. Login Process
1. User enters email on `/login` page
2. System sends OTP to email via Brevo
3. User enters OTP on `/verify-otp` page
4. System validates OTP and issues JWT token
5. User gains access to add schools

### 3. Session Management
- JWT tokens stored securely in HTTP-only cookies
- Automatic token validation on protected routes
- Logout functionality clears authentication state

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| **Frontend** | Next.js 15 (App Router) | React framework with modern routing |
| **Styling** | TailwindCSS | Utility-first CSS framework |
| **Forms** | React Hook Form | Performant form validation |
| **Icons** | Lucide React | Beautiful, consistent icons |
| **Authentication** | JWT + Brevo OTP | Secure email-based authentication |
| **Backend** | Next.js API Routes | Serverless API endpoints |
| **Database** | MySQL (Railway) | Cloud-hosted relational database |
| **File Upload** | Multer + Cloudinary | Secure file handling | 
| **Email Service** | Brevo (SendinBlue) | OTP email delivery |
| **Deployment** | Railway | Cloud platform deployment |

---

## 🖼️ Image Storage

### Local Development
- Images are uploaded and stored inside a schoolImages folder at the project root.
- This satisfies the assignment requirement of using a local folder for image storage.

### Production Deployment
- Since Railway platform doesn't support persistent local storage, Cloudinary is used in production.
- Uploaded images are stored on Cloudinary, and only the image URL is saved in the database

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Railway account for database hosting
- Cloudinary account (for image storage)
- Brevo account (for email OTP service)
- Git for version control

### 1. Clone Repository
```bash
git clone https://github.com/Ashi-Jain07/School-management-web-app.git
cd my-schools-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:

```env
# Database Configuration
DB_HOST=your-railway-host
DB_USER=root
DB_PASSWORD=your-railway-password
DB_NAME=railway
DB_PORT=your-port-number

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Brevo Email Configuration
BREVO_API_KEY=your_brevo_api_key
BREVO_SENDER_EMAIL=you@yourdomain.com
BREVO_SENDER_NAME=Your_App_Name

# JWT Configuration
JWT_SECRET=your_super_secure_jwt_secret
JWT_EXPIRES_IN=24h
```

### 4. Database Setup

#### Option A: Using Railway Dashboard
1. Create a new MySQL database on [Railway](https://railway.app)
2. Copy connection details to your `.env.local`
3. Run the SQL script below in Railway's database console

#### Option B: Using Railway CLI
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and connect
railway login
railway link

# Access database
railway run mysql
```

#### SQL Schema
```sql
CREATE DATABASE IF NOT EXISTS railway;
USE railway;

CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    contact BIGINT NOT NULL,
    image TEXT,
    email_id TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS otp_codes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    code VARCHAR(10) NOT NULL,
    expires_at DATETIME NOT NULL,
    used TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX(email)
)

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

### 5. Brevo Setup
1. Create account at [Brevo](https://www.brevo.com/)
2. Generate API key from account settings
3. Verify sender email domain
4. Add credentials to `.env.local`

### 6. Start Development Server
```bash
npm run dev
```

### 7. Open Application
Navigate to `http://localhost:3000` in your browser

---

## 📱 Application Routes

| Route | Description | Access Level | Features |
|-------|-------------|--------------|----------|
| `/` | Homepage | Public | Beautiful landing page with navigation |
| `/login` | Login Page | Public | Email input for authentication |
| `/verify-otp` | OTP Verification | Public | OTP validation and token generation |
| `/addSchool` | Add School Form | **Protected** | Form validation, image upload, auto-redirect |
| `/showSchools` | Schools Directory | Public | Search, filtering, detailed school views |

---

## 🗄️ Database Schema

### Schools Table Structure
```sql
schools (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name TEXT NOT NULL,           -- School name
    address TEXT NOT NULL,        -- Street address
    city TEXT NOT NULL,           -- City name
    state TEXT NOT NULL,          -- State/Province
    contact BIGINT NOT NULL,      -- 10-digit phone number
    email_id TEXT NOT NULL,       -- Email address
    image TEXT,                   -- Cloudinary url for image
    created_at TIMESTAMP,         -- Record creation time
)
```
### otp_codes Table Structure
```sql
otp_codes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    code VARCHAR(10) NOT NULL,
    expires_at DATETIME NOT NULL,
    used TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX(email)
)
```
### Users Table Structure
```sql
users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```
---

## 🎯 API Endpoints

### Authentication Endpoints

#### `POST /api/auth/send-otp`
**Description**: Send OTP to user's email for authentication

**Request Body**:
```json
{
  "email": "user@example.com"
}
```

**Response**:
```json
{
  "message": "OTP sent successfully",
  "email": "user@example.com"
}
```

#### `POST /api/auth/verify-otp`
**Description**: Verify OTP and issue JWT token

**Request Body**:
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Response**:
```json
{
  "message": "OTP verified successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### `GET /api/auth/me`
**Description**: Verify current user's authentication status

**Headers**: `Authorization: Bearer <token>`

**Response**:
```json
{
  "user": {
    "email": "user@example.com",
    "iat": 1234567890,
    "exp": 1234567890
  }
}
```

#### `POST /api/auth/logout`
**Description**: Clear user's authentication token

**Response**:
```json
{
  "message": "Logged out successfully"
}
```

### School Management Endpoints

#### `POST /api/addSchool`
**Description**: Add a new school to the database (**Protected Route**)

**Authorization**: Requires valid JWT token

**Request Body**: FormData
- `name` (string): School name
- `address` (string): Street address
- `city` (string): City name
- `state` (string): State/Province
- `contact` (string): 10-digit phone number
- `email_id` (string): Email address
- `image` (file): School image file

**Response**:
```json
{
  "message": "School added successfully",
  "schoolId": 123
}
```

#### `GET /api/getSchools`
**Description**: Retrieve all schools from database (**Public Access**)

**Response**:
```json
[
  {
    "id": 1,
    "name": "Example School",
    "address": "123 Main St",
    "city": "Springfield",
    "state": "IL",
    "contact": "5551234567",
    "email_id": "info@example.edu",
    "image": "https://res.cloudinary.com/wdqew2/image/upload/v1564363/schoolImages/z8te6gelo7ww.png"
  }
]
```

---

## 🔐 Security Features

### Authentication Security
- **OTP-based Login**: Email verification prevents unauthorized access
- **JWT Tokens**: Secure, stateless authentication
- **Token Expiration**: Configurable token expiry (default: 24 hours)
- **Protected Routes**: Server-side authentication validation
- **Secure Cookies**: HTTP-only cookies for token storage

### Data Protection
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Prevention**: Parameterized queries
- **File Upload Security**: File type and size validation
- **Environment Variables**: Sensitive data stored securely

---

## 📂 Project Structure

```
my-schools-app/
├── app/
│   ├── addSchool/
│   │   └── page.jsx           # Add school form page (Protected)
│   ├── showSchools/
│   │   └── page.jsx           # Schools directory page (Public)
│   ├── login/
│   │   └── page.jsx           # Login page (Public)
│   ├── verify-otp/
│   │   └── page.jsx           # OTP verification page (Public)
│   ├── api/
│   │   ├── addSchool/
│   │   │   └── route.js       # Add school API endpoint (Protected)
│   │   ├── getSchools/
│   │   │   └── route.js       # Get schools API endpoint (Public)
│   │   └── auth/
│   │       ├── send-otp/
│   │       │   └── route.js   # Send OTP endpoint
│   │       ├── verify-otp/
│   │       │   └── route.js   # Verify OTP endpoint
│   │       ├── me/
│   │       │   └── route.js   # User verification endpoint
│   │       └── logout/
│   │           └── route.js   # Logout endpoint
│   ├── globals.css            # Global styles
│   ├── layout.js              # Root layout
│   ├── VerifyOtpForm.jsx      # Verify Otp Component 
│   └── page.js                # Homepage
├── lib/
│   ├── auth.js                # JWT token utilities
│   ├── db.js                  # Database connection
│   ├── initdb.js              # Database initialization
│   └── serverAuth.js          # Server-side authentication middleware
├── public/
│   └── schoolImages/          # Uploaded school images (local dev)
├── .env.local                 # Environment variables
├── package.json               # Project dependencies
└── README.md                  # This file
```

---

## 🔧 Configuration Files

### Authentication Utilities (`lib/auth.js`)
```javascript
import jwt from 'jsonwebtoken';

export function signToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  });
}

export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
```

### Server Authentication Middleware (`lib/serverAuth.js`)
```javascript
import { verifyToken } from './auth';

export function authenticateRequest(request) {
  const token = request.cookies.get('auth-token')?.value;
  
  if (!token) {
    throw new Error('No authentication token provided');
  }
  
  try {
    return verifyToken(token);
  } catch (error) {
    throw new Error('Invalid authentication token');
  }
}
```

---

## 🧪 Testing Authentication Flow

### Manual Testing Checklist
- [ ] Email OTP sending via Brevo
- [ ] OTP verification and JWT token generation
- [ ] Protected route access (addSchool)
- [ ] Public route access (showSchools)
- [ ] Token expiration handling
- [ ] Logout functionality
- [ ] Form validation on login/OTP pages
- [ ] Error handling for invalid OTP/email

### Authentication Test Cases
1. **Valid Login Flow**
   - Enter valid email → Receive OTP → Enter correct OTP → Get access
2. **Invalid Email**
   - Enter invalid email format → See validation error
3. **Invalid OTP**
   - Enter wrong OTP → See error message → Retry
4. **Expired OTP**
   - Wait for OTP expiration → Enter OTP → See error message
5. **Protected Route Access**
   - Try accessing `/addSchool` without login → Redirect to login
6. **Token Expiration**
   - Wait for token expiry → Try protected action → Re-authenticate

---

## 🚀 Deployment

### Environment Variables for Production
```env
# Database (Railway)
DB_HOST=your-production-host
DB_USER=root
DB_PASSWORD=your-production-password
DB_NAME=railway
DB_PORT=your-production-port

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Brevo Email Service
BREVO_API_KEY=your_production_api_key
BREVO_SENDER_EMAIL=noreply@yourdomain.com
BREVO_SENDER_NAME=Your School App

# JWT (Use strong secrets in production)
JWT_SECRET=your_super_secure_production_secret
JWT_EXPIRES_IN=24h
```

---

## 🎯 Future Enhancements

### Authentication Improvements
- [ ] Password-based authentication option
- [ ] Social login integration (Google, GitHub)
- [ ] Multi-factor authentication
- [ ] Rate limiting for OTP requests
- [ ] Account lockout after failed attempts

### Application Features
- [ ] User profiles and roles
- [ ] School favorites/bookmarking
- [ ] Advanced search filters
- [ ] School ratings and reviews
- [ ] Email notifications for new schools

### Technical Improvements
- [ ] Unit tests with Jest
- [ ] Integration tests with Cypress
- [ ] Performance monitoring
- [ ] SEO optimization
- [ ] Progressive Web App features

---

## 📧 Support

For issues related to:
- **Authentication**: Check Brevo configuration and JWT settings
- **Database**: Verify Railway connection and schema
- **Deployment**: Ensure all environment variables are set correctly