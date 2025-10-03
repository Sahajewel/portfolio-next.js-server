# 🚀 Portfolio Website - Backend API

A robust RESTful API built with Node.js, Express, and Prisma. Provides secure authentication and CRUD operations for managing portfolio content.

## 🌐 Live Demo

- **API Base URL**: [https://portfolio-backend-nu-two.vercel.app]


## ✨ Features

- **Secure Authentication**: JWT-based authentication with bcrypt password hashing
- **User Management**: Admin user seeding and role-based access control
- **Blog Management**: Complete CRUD operations for blog posts
- **Project Management**: CRUD operations for project showcase
- **Input Validation**: Comprehensive request validation and sanitization
- **Error Handling**: Centralized error handling with detailed responses
- **CORS Enabled**: Configured for frontend integration
- **Database**: PostgreSQL with Prisma ORM

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL 
- **ORM**: Prisma 
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Environment Variables**: dotenv
- **Deployment**: vercel

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (if using Prisma) 
- npm or yarn package manager

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Sahajewel/portfolio-next.js-server.git
cd portfolio-next.js-server
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Variables

Create a `.env` file in the root directory:

#### For PostgreSQL + Prisma:
```env
# Database
DATABASE_URL="postgresql://neondb_owner:npg_lF8qNtZpU4Qf@ep-delicate-glitter-a16ievea-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"

# JWT
JWT_SECRET="0ca973c0a210357dfbac99ae7f218d68bc4c4d47d031e891931f2d6c6f4dda1ba5bd3b25b747d8ddaef09ec9dc36854020f10e6b2bab1b46fb77a56e6ef7c477"
JWT_EXPIRES_IN=7d

# Server
PORT=5000


# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Admin Credentials 
ADMIN_EMAIL=admin@portfolio.com
or 
username=admin_portfolio
ADMIN_PASSWORD=Admin@123456
```


### 4. Database Setup

#### For Prisma (PostgreSQL):

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init
```

### 5. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Server will start at [http://localhost:5000](http://localhost:5000)

### 6. Build for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## 📁 Project Structure

```
portfolio-backend/
├── src/
│   ├── app 
         |---- config  
              |---- db.ts    
         |---- middleware  
              |---- auth.ts   
         |---- module  
              |---- analytics       
              |---- blog       
              |---- project       
              |---- resume       
              |---- user       
         |---- routes       
│   ├── app.ts         
│   └── server.ts       
├── .env                 # Environment variables
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/user/register` | Register new user (optional) | No |
| POST | `/api/user/login` | Login user | No |


### Blogs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/v1/blog` | Get all blogs | No |
| GET | `/api/v1/blog/:id` | Get single blog | No |
| POST | `/api/v1/blog/create-blog` | Create new blog | Yes (Admin) |
| patch | `/api/v1/blog/:id` | Update blog | Yes (Admin) |
| DELETE | `/api/v1/blog/:id` | Delete blog | Yes (Admin) |

### Projects

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/v1/project` | Get all projects | No |
| GET | `/api/v1/project/:id` | Get single project | No |
| POST | `/api/v1/project/create-project` | Create new project | Yes (Admin) |
| patch | `/api/v1/project/:id` | Update project | Yes (Admin) |
| DELETE | `/api/v1/project/:id` | Delete project | Yes (Admin) |

## 📝 Request/Response Examples

### Login
```bash
POST /api/v1/user/login
Content-Type: application/json

{
  "email": "admin@portfolio.com",
  or
  "username": "admin_portfolio"
  "password": "Admin@123456"
}

# Response
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1",
    "email": "admin@portfolio.com",
    "name": "Admin User"
  }
}
```

### Create Blog
```bash
POST /api/v1/blog/create-blog
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My First Blog Post",
  "content": "<p>Rich text content here...</p>",
  "excerpt": "A brief description",
  "tags": ["javascript", "nextjs"],
  "published": true
}

# Response
{
  "success": true,
  "message": "Blog created successfully",
  "data": {
    "id": "1",
    "title": "My First Blog Post",
    "content": "<p>Rich text content here...</p>",
    "excerpt": "A brief description",
    "tags": ["javascript", "nextjs"],
    "published": true,
    "createdAt": "2025-10-02T10:00:00.000Z",
    "updatedAt": "2025-10-02T10:00:00.000Z"
  }
}
```

### Get All Blogs
```bash
GET /api/v1/blog

# Response
{
  "success": true,
  "data": [
    {
      "id": "1",
      "title": "My First Blog Post",
      "excerpt": "A brief description",
      "tags": ["javascript", "nextjs"],
      "published": true,
      "createdAt": "2025-10-02T10:00:00.000Z"
    }
  ]
  }

```

## 🔐 Authentication Flow

1. User sends login credentials to `/api/v1/user/login`
2. Server validates credentials and generates JWT token
3. Client stores token ( httpOnly cookie)
4. Client includes token in Authorization header for protected routes
5. Middleware verifies token and attaches user to request
6. Controller processes request with authenticated user context

## 🗄️ Database Schema

### User Model
```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String
  role      String   @default("admin")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Blog Model
```prisma
model Blog {
  id        String   @id @default(uuid())
  title     String
  content   String   @db.Text
  excerpt   String?
  tags      String[]
  published Boolean  @default(false)
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Project Model
```prisma
model Project {
  id          String   @id @default(uuid())
  title       String
  description String   @db.Text
  image       String?
  liveUrl     String?
  githubUrl   String?
  tags        String[]
  featured    Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **CORS Configuration**: Restrict origins in production



## 🚀 Deployment

### Deploy to vercel

1. Create account on vercel
2. Add environment variables
3. Deploy cli


## 📝 Scripts

- `npm run dev` - Start development server with nodemon
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm run migrate` - Run database migrations (Prisma)


## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Your Name**
- GitHub: [Saha Jewel Kumar](https://github.com/Sahajewel)
- LinkedIn: [Saha Jewel Kumar](https://linkedin.com/in/sahajewelkumar)
- Email: jewelsaha072@gmail.com

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [JWT.io](https://jwt.io/)
- [bcrypt Documentation](https://www.npmjs.com/package/bcrypt)

---

**Note**: Remember to never commit `.env` file to version control. Add it to `.gitignore`.