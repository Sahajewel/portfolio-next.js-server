# 🚀 Portfolio Website - Backend API

A robust RESTful API built with Node.js, Express, and Prisma/Mongoose. Provides secure authentication and CRUD operations for managing portfolio content.

## 🌐 Live Demo

- **API Base URL**: [Your Railway/Render/Heroku URL]
- **API Documentation**: [Your API Docs URL (optional)]

## ✨ Features

- **Secure Authentication**: JWT-based authentication with bcrypt password hashing
- **User Management**: Admin user seeding and role-based access control
- **Blog Management**: Complete CRUD operations for blog posts
- **Project Management**: CRUD operations for project showcase
- **Input Validation**: Comprehensive request validation and sanitization
- **Error Handling**: Centralized error handling with detailed responses
- **CORS Enabled**: Configured for frontend integration
- **Database**: PostgreSQL with Prisma ORM / MongoDB with Mongoose

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL / MongoDB
- **ORM**: Prisma / Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Validation**: express-validator / Joi
- **Environment Variables**: dotenv
- **Deployment**: Railway / Render / Heroku

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (if using Prisma) / MongoDB (if using Mongoose)
- npm or yarn package manager

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/portfolio-backend.git
cd portfolio-backend
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
DATABASE_URL="postgresql://username:password@localhost:5432/portfolio_db"

# JWT
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRES_IN=7d

# Server
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Admin Credentials (for seeding)
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=Admin@123456
```

#### For MongoDB + Mongoose:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/portfolio_db
# or for MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio_db

# JWT
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRES_IN=7d

# Server
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Admin Credentials (for seeding)
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=Admin@123456
```

### 4. Database Setup

#### For Prisma (PostgreSQL):

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed admin user
npm run seed
# or
npx prisma db seed
```

#### For Mongoose (MongoDB):

```bash
# Seed admin user
npm run seed
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
│   ├── config/          # Configuration files
│   │   └── database.ts  # Database connection
│   ├── controllers/     # Route controllers
│   │   ├── authController.ts
│   │   ├── blogController.ts
│   │   └── projectController.ts
│   ├── middleware/      # Custom middleware
│   │   ├── auth.ts      # JWT verification
│   │   ├── errorHandler.ts
│   │   └── validator.ts
│   ├── models/          # Database models (Mongoose) or Prisma schema
│   │   ├── User.ts
│   │   ├── Blog.ts
│   │   └── Project.ts
│   ├── routes/          # API routes
│   │   ├── authRoutes.ts
│   │   ├── blogRoutes.ts
│   │   └── projectRoutes.ts
│   ├── utils/           # Utility functions
│   │   ├── jwt.ts
│   │   └── validators.ts
│   ├── types/           # TypeScript types
│   └── index.ts         # App entry point
├── prisma/              # Prisma schema and migrations (if using Prisma)
│   ├── schema.prisma
│   └── seed.ts
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
| POST | `/api/auth/register` | Register new user (optional) | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |

### Blogs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/blogs` | Get all blogs | No |
| GET | `/api/blogs/:id` | Get single blog | No |
| POST | `/api/blogs` | Create new blog | Yes (Admin) |
| PUT | `/api/blogs/:id` | Update blog | Yes (Admin) |
| DELETE | `/api/blogs/:id` | Delete blog | Yes (Admin) |

### Projects

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/projects` | Get all projects | No |
| GET | `/api/projects/:id` | Get single project | No |
| POST | `/api/projects` | Create new project | Yes (Admin) |
| PUT | `/api/projects/:id` | Update project | Yes (Admin) |
| DELETE | `/api/projects/:id` | Delete project | Yes (Admin) |

## 📝 Request/Response Examples

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@portfolio.com",
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
POST /api/blogs
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
GET /api/blogs?page=1&limit=10

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
  ],
  "pagination": {
    "total": 15,
    "page": 1,
    "limit": 10,
    "totalPages": 2
  }
}
```

## 🔐 Authentication Flow

1. User sends login credentials to `/api/auth/login`
2. Server validates credentials and generates JWT token
3. Client stores token (localStorage or httpOnly cookie)
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
- **Input Validation**: Prevent SQL injection and XSS
- **CORS Configuration**: Restrict origins in production
- **Rate Limiting**: Prevent brute force attacks (recommended)
- **Helmet.js**: Security headers (recommended)

## 🚀 Deployment

### Deploy to Railway

1. Create account on Railway
2. Connect GitHub repository
3. Add environment variables
4. Deploy automatically

### Deploy to Render

1. Create account on Render
2. Create new Web Service
3. Connect GitHub repository
4. Add environment variables
5. Deploy

### Environment Variables for Production

Make sure to update these in production:
- `DATABASE_URL` - Production database URL
- `JWT_SECRET` - Strong secret key
- `FRONTEND_URL` - Production frontend URL
- `NODE_ENV=production`

## 📝 Scripts

- `npm run dev` - Start development server with nodemon
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm run seed` - Seed admin user to database
- `npm run migrate` - Run database migrations (Prisma)

## 🧪 Testing the API

### Using cURL
```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@portfolio.com","password":"Admin@123456"}'

# Get all blogs
curl http://localhost:5000/api/blogs
```

### Using Postman
1. Import the API collection
2. Set base URL to `http://localhost:5000/api`
3. Add Authorization token for protected routes

## 🐛 Common Issues & Solutions

**Issue**: Database connection failed
**Solution**: Check DATABASE_URL in .env and ensure database is running

**Issue**: JWT token invalid
**Solution**: Check JWT_SECRET matches between requests

**Issue**: CORS errors
**Solution**: Verify FRONTEND_URL in .env and CORS configuration

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [JWT.io](https://jwt.io/)
- [bcrypt Documentation](https://www.npmjs.com/package/bcrypt)

---

**Note**: Remember to never commit `.env` file to version control. Add it to `.gitignore`.