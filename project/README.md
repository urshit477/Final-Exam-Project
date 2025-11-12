# Recipe Sharing Platform

A full-featured recipe sharing platform built with Node.js, Express, EJS, MongoDB, JWT authentication, and role-based access control.

## Features

- User Authentication (Register/Login/Logout) with JWT and Cookies
- Role-Based Access Control (User/Admin)
- Create, Read, Update, Delete (CRUD) operations for recipes
- User-specific recipe management
- Comment system with ratings and Mongoose populate
- Responsive culinary-themed design
- Secure password hashing with bcrypt
- MongoDB database with Mongoose ODM

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken), bcryptjs, cookie-parser
- **Template Engine**: EJS
- **Styling**: Custom CSS with culinary theme

## Project Structure

```
recipe-sharing-platform/
├── controllers/
│   ├── authController.js       # Authentication logic
│   └── recipeController.js     # Recipe CRUD operations
├── middleware/
│   └── authMiddleware.js       # JWT authentication & authorization
├── models/
│   ├── User.js                 # User model with roles
│   ├── Recipe.js               # Recipe model
│   └── Comment.js              # Comment model with populate
├── routes/
│   ├── authRoutes.js           # Auth routes
│   └── recipeRoutes.js         # Recipe routes
├── views/
│   ├── partials/
│   │   ├── header.ejs          # HTML head
│   │   ├── navbar.ejs          # Navigation bar
│   │   └── footer.ejs          # Footer
│   ├── recipes/
│   │   ├── index.ejs           # All recipes list
│   │   ├── myRecipes.ejs       # User's recipes
│   │   ├── new.ejs             # Create recipe form
│   │   ├── edit.ejs            # Edit recipe form
│   │   └── detail.ejs          # Recipe details with comments
│   ├── login.ejs               # Login page
│   ├── register.ejs            # Registration page
│   └── error.ejs               # Error page
├── public/
│   └── css/
│       └── style.css           # Culinary themed styles
├── server.js                   # Main application file
├── .env                        # Environment variables
└── package.json                # Dependencies

```

## Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**

   Edit the `.env` file:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/recipe-platform
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_EXPIRE=7d
   ```

3. **Start MongoDB**

   Make sure MongoDB is running on your system:
   ```bash
   mongod
   ```

4. **Run the Application**
   ```bash
   npm start
   ```

   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

5. **Access the Application**

   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage

### Registration
1. Navigate to `/register`
2. Fill in username, email, password
3. Select role (User or Admin)
4. Click "Create Account"

### Login
1. Navigate to `/login`
2. Enter email and password
3. Click "Sign In"

### Creating Recipes
1. After login, click "Create Recipe" in navbar
2. Fill in recipe details:
   - Title
   - Description
   - Category (Breakfast, Lunch, Dinner, etc.)
   - Cooking Time
   - Difficulty Level
   - Ingredients (comma-separated)
   - Instructions
3. Click "Create Recipe"

### Viewing Recipes
- **All Recipes**: View all recipes shared by the community
- **My Recipes**: View only your own recipes
- **Recipe Details**: Click on any recipe to see full details

### Comments & Ratings
1. Open any recipe detail page
2. Select a rating (1-5 stars)
3. Write your comment
4. Click "Add Comment"

### Editing & Deleting
- Only recipe authors and admins can edit/delete recipes
- Click "Edit" to modify recipe details
- Click "Delete" to remove a recipe (with confirmation)

## API Routes

### Authentication Routes
- `GET /register` - Registration page
- `POST /register` - Create new user
- `GET /login` - Login page
- `POST /login` - Authenticate user
- `GET /logout` - Logout user

### Recipe Routes (Protected)
- `GET /recipes` - All recipes
- `GET /recipes/my-recipes` - User's recipes
- `GET /recipes/new` - Create recipe form
- `POST /recipes` - Create new recipe
- `GET /recipes/:id` - Recipe details
- `GET /recipes/:id/edit` - Edit recipe form
- `POST /recipes/:id/edit` - Update recipe
- `POST /recipes/:id/delete` - Delete recipe
- `POST /recipes/:id/comments` - Add comment

## Key Features Explained

### 1. JWT Authentication with Cookies
- JWT tokens are generated on login/register
- Tokens stored in httpOnly cookies for security
- Tokens include user ID and role in payload

### 2. Role-Based Access Control
- Two roles: 'user' and 'admin'
- Admins can edit/delete any recipe
- Users can only edit/delete their own recipes

### 3. Mongoose Populate
- Comments populate author details
- Recipes populate author username
- Efficient data retrieval with related documents

### 4. Multiuser Support
- Each user has their own account
- Users can view all recipes
- Users manage their own recipes separately

### 5. Culinary Theme
- Food-related colors and gradients
- Recipe-themed icons and emojis
- Clean, modern, and appetizing design
- Responsive layout for all devices

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- httpOnly cookies to prevent XSS
- Protected routes with middleware
- Role-based authorization
- Input validation and sanitization

## Database Models

### User Model
```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  role: String (user/admin),
  createdAt: Date
}
```

### Recipe Model
```javascript
{
  title: String,
  description: String,
  ingredients: [String],
  instructions: String,
  category: String,
  cookingTime: Number,
  difficulty: String,
  author: ObjectId (ref: User),
  createdAt: Date
}
```

### Comment Model
```javascript
{
  content: String,
  rating: Number (1-5),
  author: ObjectId (ref: User),
  recipe: ObjectId (ref: Recipe),
  createdAt: Date
}
```

## Exam Requirements Checklist (50 Points)

- [x] **Project Setup (5 points)** - Express server with all dependencies
- [x] **MongoDB Setup (5 points)** - Database with recipes, users, and comments collections
- [x] **User Model with Roles (5 points)** - User model with role-based access and password hashing
- [x] **Authentication (10 points)** - Register, login, logout with JWT and cookies
- [x] **Recipe Management (10 points)** - CRUD operations for recipes
- [x] **Comments with Populate (5 points)** - Comment system with Mongoose populate
- [x] **Culinary Theme (5 points)** - Food-themed design with appropriate colors and styling
- [x] **Navbar (5 points)** - Navigation with all required links and user info

## Notes

- Default JWT expiration: 7 days
- MongoDB connection uses localhost by default
- All routes except login/register are protected
- Admins have elevated privileges across the platform

## License

MIT License - Feel free to use for educational purposes
