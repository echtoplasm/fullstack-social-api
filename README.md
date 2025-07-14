# Social Media API & Dashboard

A full-stack social media platform featuring a React dashboard and comprehensive Express.js REST API with PostgreSQL database integration.

## 🎯 What This Demonstrates

- **Complete REST API**: 15+ endpoints with full CRUD operations for users, posts, and interactions
- **Database Design**: PostgreSQL schema with normalized tables, relationships, and indexing
- **Complex Queries**: JOIN operations for categorized feeds, aggregations, and data relationships
- **Data Validation**: Input validation, error handling, and duplicate prevention
- **React Integration**: Frontend dashboard consuming API endpoints with proper state management
- **Social Media Features**: User management, posts, likes system, and category-based content filtering

## 🚀 Key Features

**Backend API:**
- **User Management**: Complete CRUD operations with validation
- **Social Posts**: Create, delete, and categorize posts by topic
- **Interaction System**: Like/unlike posts with duplicate prevention
- **Category Feeds**: Filtered content by Technology, Programming, Math, Fintech, Tech Advice
- **Data Aggregation**: Post counts, like counts, and relationship queries
- **Database Integration**: PostgreSQL with proper indexing and triggers

**Frontend Dashboard:**
- **Responsive Interface**: Clean, modern UI for viewing social content
- **Data Visualization**: Display posts, comments, and user interactions
- **Category Navigation**: Browse posts by specific topics
- **Real-time Updates**: Live data fetching from Express API

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/echtoplasm/simple-social-dashboard.git
   cd simple-social-dashboard
   ```

2. **Install dependencies for both client and server**
   ```bash
   # Install server dependencies
   cd server
   npm install
   
   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Start the development servers**
   ```bash
   # Start the Express server (from server directory)
   cd server
   npm start
   
   # In a new terminal, start React app (from client directory)
   cd client
   npm start
   ```

## 🛠️ Tech Stack

**Frontend:**
- React.js with hooks and state management
- CSS3 (responsive design)
- JavaScript (ES6+)
- Fetch API for backend communication

**Backend:**
- Node.js runtime
- Express.js framework
- PostgreSQL database
- pg (node-postgres) for database connections
- CORS middleware
- RESTful API architecture

**Database:**
- PostgreSQL with normalized schema
- Custom indexes for performance optimization
- Triggers for automatic timestamp updates
- Relationship management with foreign keys

## 📁 Project Structure

```
simple-social-dashboard/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── styles/         # CSS files
│   │   └── App.js         # Main App component
│   └── public/
├── server/                 # Express backend
│   ├── routes/            # API routes
│   ├── db-scripts/        # Database setup and seed files
│   ├── db.js             # PostgreSQL connection config
│   └── server.js          # Express server
└── README.md
```

## 🗄️ Database Schema

**Core Tables:**
- `users` - User profiles and authentication data
- `social_posts` - Post content with user relationships
- `post_likes` - Like system with duplicate prevention
- `post_comments` - Comment system (schema ready)
- `user_relationships` - Follow/following system (schema ready)

**Features:**
- Foreign key relationships with cascade deletes
- Automatic timestamp triggers
- Performance indexes on frequently queried columns
- Unique constraints for data integrity

## 🔄 API Endpoints

**User Management:**
- `POST /users/new` - Create new user with validation
- `GET /users/:id` - Get user profile
- `PUT /users/:id` - Update user information
- `DELETE /users/:id` - Delete user account

**Posts & Content:**
- `POST /posts` - Create new post
- `DELETE /posts/:id` - Delete post
- `GET /posts/all` - Get all posts with aggregated data
- `GET /:id/posts` - Get posts by specific user
- `GET /posts/:category` - Get posts by category (tech, math, programming, fintech, techadvice)

**Social Interactions:**
- `POST /posts/:id/likes` - Like a post (with duplicate prevention)
- `DELETE /posts/:id/likes` - Unlike a post
- `GET /posts/:id/likes` - Get like count for post

**Categories Available:**
- Technology, Programming, Math, Fintech, Tech Advice



## 🎓 Learning Demonstration

This project showcases advanced full-stack development skills:
- **Database Design**: Normalized PostgreSQL schema with relationships and constraints
- **API Architecture**: RESTful design with proper HTTP methods and status codes
- **Data Validation**: Input sanitization and error handling
- **Query Optimization**: Database indexing and efficient JOIN operations
- **Frontend Integration**: React components consuming backend APIs
- **Social Media Logic**: Like systems, user relationships, and content categorization

*Note: This is a comprehensive demonstration project focused on backend API development and database design. Authentication and user sessions are planned for future implementation.*

## 🚧 Future Learning Opportunities

Ready-to-implement features:
- [ ] **User Authentication**: JWT tokens and login/logout system
- [ ] **Redux Integration**: Centralized state management for user sessions
- [ ] **Personal Dashboards**: User-specific views and content management
- [ ] **Comment System**: Complete the post_comments table implementation
- [ ] **Follow System**: Activate the user_relationships functionality
- [ ] **Real-time Features**: WebSocket integration for live updates
- [ ] **Image Uploads**: CDN integration for profile pictures and post media

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

---

Built with ❤️ by [Zachary Massey](https://github.com/echtoplasm)
