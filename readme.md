CCN (Candidate Collaboration Notes)
GitHub Repository
Repository: https://github.com/sudarshanmane/ccn
________________________________________

Setup Instructions
Prerequisites
•	Node.js (v18 or above)
•	MongoDB (local or MongoDB Atlas)
•	Vite for frontend

Backend Setup
git clone https://github.com/sudarshanmane/ccn.git
cd ccn/ccn_backend
npm install
node index.js

⚙️ Backend Architecture: Express.js (MVC + Service/Repo Layered Pattern)
We use a modular, scalable structure that separates business logic, database access, and routing.
bash
CopyEdit
src/
├── config/               # DB config, server config, constants
│   ├── dbConfig.js       # MongoDB connection
│   └── serverConfig.js   # Port, environment variables
├── controllers/          # Handle HTTP request/response logic
│   └── noteController.js
├── services/             # Business logic, orchestrates between controller & repo
│   └── noteService.js
├── repository/           # DB abstraction via Mongoose (NoteRepo.js)
├── models/               # Mongoose models (User.js, Note.js, Notification.js)
├── routes/               # Route definitions (apiRoutes.js, authRoutes.js)
├── sockets/              # Socket.io handlers (noteSocket.js, notifySocket.js)
└── utils/                # Common helper utilities (extractTaggedUsernames)
•	✅ Flow Example for Notes

Route (POST /notes)
    ⬇
Controller: noteController.createNote
    ⬇
Service: noteService.createNote
    ⬇
Repository: noteRepo.create
    ⬇
Mongoose: Note.create()
•	✅ Why this structure?
o	Encourages single responsibility across layers
o	Makes code testable, maintainable, and easier to scale
o	Clean separation of API, business logic, and data access

Frontend Setup
cd ccn/ccn_frontend
npm install
npm run dev

🧩 Frontend Architecture: React + Atomic Design

We followed Atomic Design principles to structure the frontend for maintainability, reusability, and scalability.
src/
├── assets/               # Static files (images, icons)
├── components/           # Atomic components
│   ├── atoms/            # Basic building blocks (Button, Input, Avatar)
│   ├── molecules/        # Group of atoms (FormRow, ModalHeader)
│   ├── organisms/        # Complex reusable blocks (CandidateCard, ChatBox)
├── pages/                # Route-based pages (Dashboard, Login, Notes)
├── hooks/                # Custom React hooks (e.g., useAuth, useNotifications)
├── context/              # React Context API setup (UserAuthProvider)
├── utils/                # Utility functions (date formatters, extract tags)
├── services/             # API abstraction layer (authService, noteService)
├── App.jsx               # Main app wrapper
└── main.jsx              # Vite entry point

✅ Why Atomic?
•	Encourages separation of concerns
•	Makes UI building blocks reusable and testable
•	Helps organize components based on their complexity and composition level

________________________________________
Usage Guide
1.	User Signup/Login – Start by registering or logging in from the homepage.
2.	Dashboard – View assigned candidates, their statuses, and notes.
3.	Candidate Notes – Click on a candidate to see real-time notes.
4.	@Tagging – Tag teammates using @username in messages. Tagged users receive in-app and dashboard notifications.
5.	Notifications – Access tagged messages from the top bar bell icon or Dashboard Notifications card.
________________________________________
Loom Video Walkthrough
Link: Proided in the Form
Duration: 2–5 minutes
Covers:
•	Signup/Login
•	Dashboard navigation
•	Real-time notes + tagging
•	In-app and dashboard notifications
________________________________________

Technical Document
Architecture Diagram
[Frontend - React + Tailwind (Vite)]
       |
       | Socket.IO + REST API
       |
[Backend - Express.js + MongoDB]
       |
[Database - MongoDB with Mongoose ODM]aa

Tech Stack and Libraries

Frontend
•	React – UI framework
•	Vite – Fast dev server
•	Tailwind CSS – Styling
•	Socket.IO Client – Real-time messaging
•	Axios – API requests
•	Sonner – Toast notifications

Backend
•	Express.js – API server
•	Socket.IO – Real-time communication
•	Mongoose – MongoDB ORM
•	jsonwebtoken – Auth
•	bcryptjs – Password encryption
•	CORS & Helmet – Security and CORS handling
•	Rate Limiting
•	Input sanitation

 

 
 
 
 
