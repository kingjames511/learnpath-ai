# 🎓 AI-Powered Learning Recommendation Platform

> Your Personal Learning Guide - Discover the perfect courses tailored to your goals, skill level, and learning style.

![Project Status](https://img.shields.io/badge/status-in%20development-yellow)
![License](https://img.shields.io/badge/license-MIT-blue)

## 📖 Overview

An intelligent learning platform that uses AI to provide personalized course recommendations. Instead of getting lost in thousands of courses across multiple platforms, users receive curated suggestions based on their interests, current skill level, available time, and learning preferences.

## ✨ Key Features

- 🤖 **AI-Powered Recommendations** - Smart course suggestions using embeddings and semantic search
- 🎯 **Personalized Learning Paths** - Custom roadmaps generated based on your goals
- 📊 **Progress Tracking** - Monitor your learning journey with detailed analytics
- 🔍 **Semantic Search** - Find courses by meaning, not just keywords
- 💬 **AI Assistant** - Chat with an AI advisor for learning guidance
- 🎨 **Beautiful UI** - Clean, modern, and responsive design

## 🚀 Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Navigation

### Backend & Services
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Authentication
  - Real-time subscriptions
  - Edge Functions
- **pgvector** - Vector similarity search

### AI & ML
- **Hugging Face** - Text embeddings for semantic search
- **Google Gemini API** - AI-generated explanations and chat
- **Sentence Transformers** - Course similarity matching

### APIs
- YouTube Data API
- Additional course platforms (coming soon)

## 🎯 How It Works

1. **Onboarding** - Users answer 5 quick questions about their interests, skill level, goals, time availability, and learning style
2. **Profile Creation** - System creates a personalized learner profile
3. **Smart Recommendations** - Hybrid algorithm combines rule-based filtering with AI-powered semantic matching
4. **Learning Paths** - AI generates structured roadmaps with prerequisites and progression
5. **Continuous Learning** - System adapts recommendations based on user behavior and progress

## 🏗️ Architecture
```
Frontend (React + Vite)
    ↓
Supabase Backend
    ├── Authentication (User management)
    ├── PostgreSQL + pgvector (Data storage)
    └── Edge Functions (Server-side logic)
    ↓
AI Services
    ├── Hugging Face (Embeddings)
    └── Gemini API (Explanations & Chat)
```

## 📊 Database Schema
```
users
├── User profiles and preferences
├── Learning goals and interests
└── Skill levels

courses
├── Course metadata
├── Embeddings for semantic search
└── Platform information

user_courses
├── Progress tracking
├── Completion status
└── Time invested

recommendations
└── Cached AI recommendations
```

## 🚧 Current Status

**Phase 1: Foundation** ✅
- [x] Project setup ✅
- [x] Basic UI structure ✅
- [x] Authentication✅

**Phase 2: Core Features** 🚧 (In Progress)
- [ ] Onboarding flow
- [ ] Recommendation engine
- [ ] Dashboard
- [ ] Course management

**Phase 3: AI Integration** 📅 (Planned)
- [ ] Semantic search
- [ ] AI explanations
- [ ] Chat assistant

**Phase 4: Advanced Features** 📅 (Planned)
- [ ] Learning paths
- [ ] Progress analytics
- [ ] Achievements system

## 🎨 Screenshots

_Coming soon..._

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Supabase account (free tier)

### Installation
```bash
# Clone the repository
git clone https://github.com/kingjames511/ai-learning-platform.git

# Navigate to project directory
cd ai-learning-platform

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your API keys to .env

# Start development server
npm run dev
```

### Environment Variables
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_HUGGINGFACE_API_KEY=your_hf_api_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

## 📝 Roadmap

- [x] Project planning and architecture
- [ ] MVP with basic recommendations
- [ ] AI-powered semantic search
- [ ] Learning path generator
- [ ] Mobile responsive design
- [ ] User analytics dashboard
- [ ] Social features (study groups, sharing)
- [ ] Content from multiple platforms
- [ ] Offline mode support

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome! Feel free to open an issue or reach out.

## 📄 License

MIT License - feel free to use this project for learning purposes.

## 👨‍💻 Author

King James
- GitHub: [@kingjames511](https://github.com/kingjames511)

## 🙏 Acknowledgments

- Inspired by the need for personalized learning in a world of overwhelming course options
- Built as part of my journey to master full-stack development and AI integration

---

⭐ If you find this project interesting, please consider giving it a star!

**Note:** This project is under active development. Features and documentation will be updated regularly.
