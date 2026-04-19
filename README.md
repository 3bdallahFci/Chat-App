# Full Stack Real-Time Chat App

A modern, real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.io. This application allows users to register, log in, manage their profiles, and communicate in real-time. Features include image sharing and a customizable theme using DaisyUI.

![App Preview](https://media.licdn.com/dms/image/v2/D4D22AQFzYbXoEuRHNQ/feedshare-shrink_1280/B4DZsE9UW7LYAs-/0/1765314746854?e=1778112000&v=beta&t=_QOO0dLybudU9GOG6AYlBj7MjsauJLxs-WMSOwJreWk)

## 🌟 Features

- **Real-time Messaging**: Instant message delivery using Socket.io.
- **User Authentication**: Secure user registration and login with JWT and bcryptjs.
- **Profile Management**: Users can update their profile information and avatar (image upload handled via Cloudinary).
- **Online Status**: See which users are currently online.
- **Image Sharing**: Send and receive images in chat.
- **Responsive Design**: Fully responsive UI built with Tailwind CSS.
- **Theming**: Dynamic theme switching (light, dark, various colors) powered by DaisyUI.
- **State Management**: Fast and scalable state management using Zustand.

## 🛠️ Tech Stack

### Frontend
- **React.js** (built with Vite)
- **Tailwind CSS** (Styling)
- **DaisyUI** (UI Components & Themes)
- **Zustand** (State Management)
- **Socket.io-client** (Real-time connection)
- **Axios** (HTTP Client)
- **Lucide React** (Icons)
- **React Router DOM** (Routing)

### Backend
- **Node.js & Express.js**
- **MongoDB & Mongoose** (Database)
- **Socket.io** (WebSockets)
- **JSON Web Token (JWT)** (Authentication)
- **Cloudinary** (Media Storage for avatars and images)
- **Bcrypt.js** (Password hashing)

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/en) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)
- A [Cloudinary](https://cloudinary.com/) account for image uploads

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/3bdallahFci/Chat-App.git
   cd Chat-App
   ```

2. **Install all dependencies:**
   The root directory contains a script to install both backend and frontend dependencies. run:
   ```bash
   npm run build
   ```
   *Note: This specific `npm run build` command installs prefix dependencies and then builds the frontend.*

### Environment Variables

You need to set up environment variables for both the backend and frontend.

**Backend (`backend/.env`):**
Create a `.env` file in the `backend` folder and add the following variables:
```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development

# Cloudinary Variables
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Running the Application

**Development Mode:**

1. **Start the backend server:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the frontend server:**
   In a new terminal window:
   ```bash
   cd frontend
   npm run dev
   ```

The frontend will typically run on `http://localhost:5173` and the backend on the port specified in your `.env` (e.g., `http://localhost:5001`).

**Production Mode:**
From the root directory, you can build the frontend and run the production server:
```bash
# Builds the frontend
npm run build 

# Starts the backend server
npm run start
```

## 📁 Project Structure

```text
Chat-App/
├── backend/               # Node.js Express server
│   ├── src/
│   │   ├── controllers/   # Route controllers (auth, messages)
│   │   ├── lib/           # Utility functions (db connection, cloudinary, socket)
│   │   ├── middlewares/   # Custom middlewares (auth protection)
│   │   ├── models/        # Mongoose schemas
│   │   ├── routes/        # API routes
│   │   └── index.js       # Entry point for backend
│   └── package.json
├── frontend/              # React Vite app
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components (Home, Login, Profile, Settings)
│   │   ├── store/         # Zustand stores (useAuthStore, useChatStore, useThemeStore)
│   │   ├── lib/           # Axios config
│   │   ├── App.jsx        # Root component and Routing
│   │   └── main.jsx       # Entry point for frontend
│   └── package.json
└── package.json           # Root package.json for monorepo scripts
```

## 📜 License

This project is licensed under the ISC License.
