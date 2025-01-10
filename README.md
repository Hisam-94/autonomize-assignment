# Autonomize-assignment

A full-stack application for exploring GitHub users, their repositories, and connections.

## Features

- Search for GitHub users
- View user profiles and repositories
- Explore user connections (followers/following)
- Repository details view
- Responsive design
- Error handling and loading states

## Tech Stack

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- GitHub API integration
- Error handling middleware

### Frontend
- React with TypeScript
- Custom CSS styling
- Responsive design
- Loading states and error handling

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- GitHub account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Hisam-94/autonomize-assignment.git
cd autonomize-assignment
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Create .env file in backend directory:
```
MONGODB_URI=mongodb://localhost:27017/github-users
PORT=3000
```

4. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend application:
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
autonomize-assignment/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── services/
    │   ├── styles/
    │   └── utils/
    └── package.json
```
