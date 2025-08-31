# 🏫 My Schools App

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/MySQL-8.0-blue?style=for-the-badge&logo=mysql" alt="MySQL" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.0-06B6D4?style=for-the-badge&logo=tailwindcss" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Railway-Deploy-purple?style=for-the-badge&logo=railway" alt="Railway" />
</div>

<br />

<div align="center">
  <h3>🎓 A beautiful, modern school directory management system</h3>
  <p>Built with Next.js 15, featuring stunning UI/UX and robust backend functionality</p>
</div>

---

## ✨ Features

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
- **Form Validation**: Real-time validation using React Hook Form
- **Image Upload**: Secure file handling and storage
- **Error Handling**: Comprehensive error states and user feedback
- **Success States**: Clear confirmation and automatic navigation

### 🚀 **Performance & User Experience**
- **Loading States**: Smooth loading animations and spinners
- **Error Boundaries**: Graceful error handling
- **Optimized Images**: Efficient image loading and display
- **SEO Friendly**: Proper meta tags and semantic HTML

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| **Frontend** | Next.js 15 (App Router) | React framework with modern routing |
| **Styling** | TailwindCSS | Utility-first CSS framework |
| **Forms** | React Hook Form | Performant form validation |
| **Icons** | Lucide React | Beautiful, consistent icons |
| **Backend** | Next.js API Routes | Serverless API endpoints |
| **Database** | MySQL (Railway) | Cloud-hosted relational database |
| **File Upload** | Multer | Secure file handling |
| **Deployment** | Railway | Cloud platform deployment |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Railway account for database hosting
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
# Database Configuration (Railway MySQL)
DB_HOST=your-railway-host
DB_USER=root
DB_PASSWORD=your-railway-password
DB_NAME=railway
DB_PORT=your-port-number

# Next.js Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
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
```

### 5. Start Development Server
```bash
npm run dev
```

### 6. Open Application
Navigate to `http://localhost:3000` in your browser

---

## 📱 Application Routes

| Route | Description | Features |
|-------|-------------|----------|
| `/` | Homepage | Beautiful landing page with navigation |
| `/addSchool` | Add School Form | Form validation, image upload, auto-redirect |
| `/showSchools` | Schools Directory | Search, filtering, detailed school views |

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
    image TEXT,                   -- Image file path
    created_at TIMESTAMP,         -- Record creation time
)
```

---

## 🎯 API Endpoints

### `POST /api/addSchool`
**Description**: Add a new school to the database

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

### `GET /api/getSchools`
**Description**: Retrieve all schools from database

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
    "image": "/schoolImages/school-1.jpg"
  }
]
```

---

## 🎨 UI/UX Features

### Design System
- **Color Palette**: Blue, purple, and green gradients
- **Typography**: Modern, hierarchical font system
- **Spacing**: Consistent 8px grid system
- **Shadows**: Layered shadow system for depth
- **Border Radius**: Consistent rounded corners (xl, 2xl, 3xl)

### Interactive Elements
- **Hover Effects**: Smooth transitions and transforms
- **Loading States**: Professional spinners and skeletons
- **Form Validation**: Real-time validation with clear error messages
- **Success States**: Confirmation messages and auto-navigation

### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: sm, md, lg, xl responsive breakpoints
- **Grid System**: CSS Grid and Flexbox layouts
- **Touch Friendly**: Large touch targets and gestures

---

## 📂 Project Structure

```
my-schools-app/
├── app/
│   ├── addSchool/
│   │   └── page.jsx           # Add school form page
│   ├── showSchools/
│   │   └── page.jsx           # Schools directory page
│   ├── api/
│   │   ├── addSchool/
│   │   │   └── route.js      # Add school API endpoint
│   │   └── getSchools/
│   │       └── route.js      # Get schools API endpoint
│   ├── globals.css           # Global styles
│   ├── layout.js             # Root layout
│   └── page.js               # Homepage
├── lib/
│   └── db.js                 # Database connection
├── public/
│   └── schoolImages/         # Uploaded school images
├── .env.local               # Environment variables
├── package.json             # Project dependencies
└── README.md               # This file
```

---

## 🔧 Configuration

### Database Configuration (`lib/db.js`)
```javascript
import mysql from 'mysql2/promise';

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

export default db;
```

### Environment Variables
```env
# Railway MySQL Database
DB_HOST=your-public-host
DB_USER=root
DB_PASSWORD=your-password
DB_NAME=railway
DB_PORT=3306

```

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] Add school form validation
- [ ] Image upload functionality
- [ ] Search and filtering
- [ ] Responsive design on mobile
- [ ] Database connectivity
- [ ] Error handling

### Future Enhancements
- [ ] Unit tests with Jest
- [ ] Integration tests with Cypress
- [ ] Performance monitoring
- [ ] SEO optimization

---