# Content Violation Detection

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)](https://nodejs.org/)

## 📋 Project Overview

Content Violation Detection is a sophisticated web application designed to automatically identify, analyze, and flag content violations across various digital platforms. This tool leverages advanced machine learning algorithms and natural language processing to detect inappropriate content, policy violations, and harmful material in real-time.

The system provides a comprehensive dashboard for monitoring, reviewing, and managing flagged content with detailed analytics and reporting capabilities.

### Key Benefits
- **Real-time Detection**: Instantaneous identification of violating content
- **High Accuracy**: ML-powered models trained on diverse datasets
- **Scalable Architecture**: Handle millions of content items efficiently
- **User-Friendly Interface**: Intuitive dashboard for content moderators
- **Detailed Analytics**: Comprehensive insights and reporting

---

## ✨ Features

### Core Detection Capabilities
- **Multi-Category Detection**
  - Hate speech and discriminatory content
  - Explicit and adult content
  - Violence and harmful content
  - Spam and suspicious links
  - Misinformation and false claims
  - Harassment and bullying

### Dashboard & Monitoring
- Interactive real-time dashboard
- Content queue management system
- Violation statistics and trends
- Custom filtering and search
- Bulk action capabilities

### Analytics & Reporting
- Detailed violation reports
- Trend analysis and patterns
- Performance metrics
- Exportable data in multiple formats
- Custom date range selection

### Moderation Tools
- Quick review interface
- One-click approval/rejection
- Custom comment templates
- User appeal management
- Action audit logs

### Configuration & Customization
- Adjustable detection sensitivity
- Custom violation categories
- Whitelist/blacklist management
- Workflow customization

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js 18+
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS / Material-UI
- **HTTP Client**: Axios
- **Charts & Analytics**: Chart.js / Recharts
- **Icons**: FontAwesome / Heroicons

### Backend
- **Runtime**: Node.js (v14+)
- **Framework**: Express.js
- **Database**: MongoDB / PostgreSQL
- **ML Integration**: TensorFlow.js / Python ML Services
- **Authentication**: JWT / OAuth2
- **Task Queue**: Bull / Redis

### Machine Learning
- **NLP Models**: BERT, RoBERTa, DistilBERT
- **Model Serving**: TensorFlow Serving / FastAPI
- **Data Processing**: Pandas, NumPy
- **Training Framework**: PyTorch / TensorFlow

### DevOps & Infrastructure
- **Containerization**: Docker
- **Orchestration**: Kubernetes (optional)
- **CI/CD**: GitHub Actions
- **Cloud Services**: AWS / Google Cloud / Azure
- **Monitoring**: Prometheus, Grafana

### Additional Tools
- **Testing**: Jest, Mocha, Pytest
- **Code Quality**: ESLint, Prettier, SonarQube
- **Documentation**: Swagger/OpenAPI
- **Version Control**: Git

---

## 🚀 Getting Started

### Prerequisites
- Node.js v14 or higher
- npm or yarn package manager
- MongoDB or PostgreSQL installed locally (or cloud instance)
- Python 3.8+ (for ML services)
- Git

### Installation Steps

#### 1. Clone the Repository
```bash
git clone https://github.com/RaaghavAgarwal28/Content-Violation-Detection.git
cd Content-Violation-Detection
```

#### 2. Install Frontend Dependencies
```bash
cd frontend
npm install
```

#### 3. Install Backend Dependencies
```bash
cd ../backend
npm install
```

#### 4. Set Up Environment Variables

Create a `.env` file in the backend directory:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL=mongodb://localhost:27017/content-violation-db
# OR for PostgreSQL:
# DATABASE_URL=postgresql://user:password@localhost:5432/content_violation_db

# Authentication
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# ML Service
ML_SERVICE_URL=http://localhost:8000
ML_API_KEY=your_ml_service_key

# Redis (for task queue)
REDIS_URL=redis://localhost:6379

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# AWS S3 (for file storage)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET=your_bucket_name

# Logging
LOG_LEVEL=debug
```

Create a `.env` file in the frontend directory:
```env
REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

#### 5. Set Up Machine Learning Service (Optional)

If using Python ML services:
```bash
cd ../ml-service
pip install -r requirements.txt
python app.py
```

#### 6. Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

---

## 📦 Deployment Options

### Vercel Deployment (Recommended for Frontend)

#### Prerequisites
- Vercel account ([signup here](https://vercel.com))
- GitHub repository connected to Vercel

#### Steps

1. **Connect Repository to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Select the project

2. **Configure Build Settings**
   ```
   Framework: Create React App
   Build Command: npm run build
   Output Directory: build
   ```

3. **Set Environment Variables**
   - In Vercel Dashboard, go to Settings → Environment Variables
   - Add all variables from your `.env` file
   ```
   REACT_APP_API_BASE_URL=https://your-backend-domain.com/api
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically rebuild on every push to main

5. **Custom Domain (Optional)**
   - Go to Settings → Domains
   - Add your custom domain
   - Configure DNS settings

### Netlify Deployment (Alternative for Frontend)

#### Prerequisites
- Netlify account ([signup here](https://netlify.com))
- GitHub repository

#### Steps

1. **Connect Repository**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Authorize GitHub and select repository

2. **Configure Build Settings**
   ```
   Build command: npm run build
   Publish directory: build
   ```

3. **Set Environment Variables**
   - Go to Site Settings → Build & Deploy → Environment
   - Add environment variables

4. **Deployment**
   ```bash
   # Or deploy via CLI
   npm install -g netlify-cli
   netlify login
   netlify deploy --prod --dir=build
   ```

5. **Configure Redirects**
   - Create `_redirects` file in `public/` directory:
   ```
   /* /index.html 200
   ```

### Backend Deployment Options

#### Option 1: Heroku
```bash
# Install Heroku CLI
heroku login
heroku create your-app-name
heroku config:set JWT_SECRET=your_secret
heroku config:set DATABASE_URL=your_db_url
git push heroku main
heroku logs --tail
```

#### Option 2: Railway
```bash
# Install Railway CLI
railway login
railway init
# Follow prompts to select services (Node.js, PostgreSQL, etc.)
railway up
```

#### Option 3: Docker + AWS EC2
```bash
# Build Docker image
docker build -t content-violation-detection:latest .

# Tag for AWS ECR
docker tag content-violation-detection:latest 123456789.dkr.ecr.us-east-1.amazonaws.com/content-violation-detection:latest

# Push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789.dkr.ecr.us-east-1.amazonaws.com
docker push 123456789.dkr.ecr.us-east-1.amazonaws.com/content-violation-detection:latest

# Deploy to EC2 using Docker Compose
docker-compose up -d
```

#### Option 4: Google Cloud Run
```bash
# Configure gcloud
gcloud config set project YOUR_PROJECT_ID

# Build and push to Google Container Registry
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/content-violation-detection

# Deploy to Cloud Run
gcloud run deploy content-violation-detection \
  --image gcr.io/YOUR_PROJECT_ID/content-violation-detection \
  --platform managed \
  --region us-central1 \
  --set-env-vars DATABASE_URL=your_db_url,JWT_SECRET=your_secret
```

---

## 🔧 Environment Setup

### Development Environment

#### 1. Database Setup

**MongoDB:**
```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or install locally and start
mongod
```

**PostgreSQL:**
```bash
# Using Docker
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=password --name postgres postgres:latest

# Create database
psql -U postgres -c "CREATE DATABASE content_violation_db;"
```

#### 2. Redis Setup
```bash
# Using Docker
docker run -d -p 6379:6379 --name redis redis:latest

# Or install locally and start
redis-server
```

#### 3. ML Service Setup
```bash
cd ml-service
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### Production Environment Checklist

- [ ] Use environment variables for all sensitive data
- [ ] Enable HTTPS/SSL certificates
- [ ] Set up database backups
- [ ] Configure monitoring and alerting
- [ ] Implement rate limiting
- [ ] Set up error tracking (Sentry)
- [ ] Enable CORS with specific domains
- [ ] Configure firewall and security groups
- [ ] Set up CDN for static assets
- [ ] Enable database replication for high availability

---

## 📁 Project Structure

```
Content-Violation-Detection/
├── frontend/                      # React.js frontend application
│   ├── public/                    # Static assets
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/            # Reusable React components
│   │   │   ├── Dashboard/
│   │   │   ├── ContentReview/
│   │   │   ├── Analytics/
│   │   │   ├── Navigation/
│   │   │   └── ...
│   │   ├── pages/                 # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ContentQueue.jsx
│   │   │   ├── Reports.jsx
│   │   │   └── Settings.jsx
│   │   ├── services/              # API services
│   │   │   ├── api.js
│   │   │   ├── auth.js
│   │   │   └── contentService.js
│   │   ├── redux/                 # State management
│   │   │   ├── slices/
│   │   │   ├── store.js
│   │   │   └── ...
│   │   ├── styles/                # Global styles
│   │   │   ├── App.css
│   │   │   └── index.css
│   │   ├── utils/                 # Utility functions
│   │   │   ├── formatters.js
│   │   │   ├── validators.js
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   └── index.js
│   ├── .env                       # Environment variables
│   ├── .env.example               # Example environment variables
│   ├── package.json
│   └── README.md
│
├── backend/                       # Express.js backend application
│   ├── src/
│   │   ├── models/                # Database models/schemas
│   │   │   ├── Content.js
│   │   │   ├── User.js
│   │   │   ├── Violation.js
│   │   │   └── ...
│   │   ├── routes/                # API routes
│   │   │   ├── auth.js
│   │   │   ├── content.js
│   │   │   ├── violations.js
│   │   │   ├── analytics.js
│   │   │   └── ...
│   │   ├── controllers/           # Route controllers
│   │   │   ├── authController.js
│   │   │   ├── contentController.js
│   │   │   ├── violationController.js
│   │   │   └── ...
│   │   ├── middleware/            # Custom middleware
│   │   │   ├── auth.js
│   │   │   ├── errorHandler.js
│   │   │   ├── validation.js
│   │   │   └── logger.js
│   │   ├── services/              # Business logic
│   │   │   ├── contentService.js
│   │   │   ├── violationService.js
│   │   │   ├── mlService.js
│   │   │   ├── emailService.js
│   │   │   └── ...
│   │   ├── utils/                 # Utility functions
│   │   │   ├── constants.js
│   │   │   ├── logger.js
│   │   │   └── validators.js
│   │   ├── config/                # Configuration files
│   │   │   ├── database.js
│   │   │   ├── redis.js
│   │   │   └── mail.js
│   │   ├── jobs/                  # Background jobs
│   │   │   ├── processContent.js
│   │   │   └── generateReports.js
│   │   └── app.js                 # Express app setup
│   ├── .env                       # Environment variables
│   ├── .env.example               # Example environment variables
│   ├── server.js                  # Entry point
│   ├── package.json
│   └── README.md
│
├── ml-service/                    # Python ML service (optional)
│   ├── models/                    # Trained ML models
│   │   ├── violation_detector.pkl
│   │   └── ...
│   ├── app.py                     # FastAPI/Flask app
│   ├── requirements.txt           # Python dependencies
│   ├── .env
│   └── README.md
│
├── docker-compose.yml             # Docker Compose configuration
├── Dockerfile                     # Docker configuration
├── .github/
│   └── workflows/                 # GitHub Actions CI/CD
│       ├── test.yml
│       └── deploy.yml
├── .gitignore
├── LICENSE
└── README.md
```

---

## 📖 Usage Guide

### For Content Moderators

#### 1. Accessing the Dashboard
- Navigate to the application URL
- Log in with your credentials
- You'll see the main dashboard with key metrics

#### 2. Reviewing Flagged Content
1. Click on "Content Queue" from the navigation menu
2. Browse through flagged items
3. Click on any item to view full details
4. Review the violation details and confidence score
5. Make a decision: Approve, Reject, or Request More Info
6. Add optional comments
7. Submit your decision

#### 3. Managing Content
- **Filter Options**: Filter by violation type, date, severity, status
- **Bulk Actions**: Select multiple items and apply actions
- **Search**: Use the search bar to find specific content
- **Sort**: Click column headers to sort

#### 4. Viewing Analytics
1. Go to "Reports" section
2. Select date range
3. Choose violation categories or time period
4. View charts and statistics
5. Export data in CSV/PDF format

#### 5. User Management
1. Go to "Settings" → "Users"
2. View list of users and their roles
3. Add new users or modify permissions
4. Manage user appeals

### For Administrators

#### 1. System Configuration
- Access "Admin Settings"
- Configure detection sensitivity levels
- Manage custom violation categories
- Set up whitelist/blacklist rules

#### 2. Monitoring & Logs
- View system logs and audit trails
- Monitor API performance
- Check service health status
- Review error logs

#### 3. User Management
- Create and manage user accounts
- Assign roles and permissions
- Set up department/team hierarchies
- Manage access levels

#### 4. Workflow Customization
- Create custom workflows
- Define escalation rules
- Set up automated actions
- Configure notifications

### For Developers

#### 1. API Documentation
API docs are available at: `http://localhost:5000/api/docs`

Common endpoints:
```bash
# Authentication
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout

# Content
GET /api/content                 # List all content
POST /api/content                # Submit content for analysis
GET /api/content/:id             # Get content details
PUT /api/content/:id             # Update content

# Violations
GET /api/violations              # List violations
GET /api/violations/:id          # Get violation details
PUT /api/violations/:id          # Update violation decision

# Analytics
GET /api/analytics/dashboard     # Dashboard metrics
GET /api/analytics/reports       # Generate reports
```

#### 2. Making API Requests
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// Add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Example request
const getContent = async () => {
  try {
    const response = await api.get('/content');
    return response.data;
  } catch (error) {
    console.error('Error fetching content:', error);
  }
};
```

#### 3. Contributing
See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on:
- Code style
- Git workflow
- Pull request process
- Testing requirements

---

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm test                          # Run tests
npm run test:coverage            # Generate coverage report
```

### Backend Testing
```bash
cd backend
npm test                          # Run tests
npm run test:watch               # Watch mode
npm run test:coverage            # Coverage report
```

### Integration Testing
```bash
npm run test:integration         # Run integration tests
```

---

## 📊 Performance Optimization

### Frontend
- Code splitting with React.lazy()
- Image optimization
- Lazy loading for routes
- Redux selector memoization
- React DevTools Profiler for performance analysis

### Backend
- Database indexing
- Query optimization
- Caching with Redis
- Database connection pooling
- Compression middleware

### ML Service
- Model quantization
- Batch processing
- GPU acceleration
- Model caching

---

## 🔒 Security

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (RBAC)
- Two-factor authentication (2FA)
- Session management

### Data Protection
- HTTPS/TLS encryption
- Database encryption at rest
- Encrypted password storage (bcrypt)
- CORS configuration

### API Security
- Rate limiting
- Input validation
- SQL injection prevention
- CSRF protection
- API key management

### Best Practices
- Keep dependencies updated
- Use environment variables for secrets
- Regular security audits
- Implement logging and monitoring
- Follow OWASP guidelines

---

## 📝 Logging & Monitoring

### Logging Configuration
- Winston for Node.js logging
- Morgan for HTTP request logging
- Sentry for error tracking
- CloudWatch/ELK Stack for aggregation

### Monitoring Metrics
- API response times
- Error rates
- Database query performance
- Memory and CPU usage
- User activity

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

For detailed guidelines, see [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 🆘 Support & Troubleshooting

### Common Issues

**Issue**: Port already in use
```bash
# Change port in .env
PORT=5001
```

**Issue**: Database connection error
```bash
# Verify DATABASE_URL in .env
# Check if database service is running
# Verify credentials
```

**Issue**: ML service not responding
```bash
# Ensure ML service is running
# Check ML_SERVICE_URL in .env
# Verify network connectivity
```

### Getting Help
- 📧 Email: support@example.com
- 💬 Issues: [GitHub Issues](https://github.com/RaaghavAgarwal28/Content-Violation-Detection/issues)
- 📚 Documentation: [Full Documentation](./docs)
- 💭 Discussions: [GitHub Discussions](https://github.com/RaaghavAgarwal28/Content-Violation-Detection/discussions)

---

## 🚦 Roadmap

- [ ] Multi-language support
- [ ] Advanced ML models integration
- [ ] Real-time collaboration features
- [ ] Mobile app (iOS/Android)
- [ ] Browser extension
- [ ] API v2 with GraphQL
- [ ] Webhook support
- [ ] Custom ML model training

---

## 📫 Contact

**Author**: Raghav Agarwal  
**GitHub**: [@RaaghavAgarwal28](https://github.com/RaaghavAgarwal28)  
**Email**: raghav@example.com

---

## ⭐ Acknowledgments

Thanks to all the open-source projects and libraries that made this project possible:
- React.js and the awesome ecosystem
- Express.js and Node.js community
- TensorFlow and PyTorch teams
- All contributors and supporters

---

**Made with ❤️ by Raghav Agarwal**
