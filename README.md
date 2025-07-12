# 🔁 Skill Swap Platform

A collaborative web application that enables users to list the skills they offer and request others in return — fostering a peer-to-peer learning ecosystem.

---

## 🚀 Team Xcalibur — Hackathon Submission

| Name     | Role            | Responsibility                        |
|----------|------------------|----------------------------------------|
| Fenil    | Git & Repo Lead  | Version control, collaboration setup  |
| Dhruv    | Frontend Dev     | ReactJS interface, UI integration      |
| Vishva   | Backend Dev      | Node.js, Express APIs, MongoDB logic   |
| Vansh    | UI/UX Designer   | User flow, wireframes, and mockups    |

---

## 🧠 Project Overview

The **Skill Swap Platform** allows users to connect by exchanging skills — e.g., "I’ll teach you React if you teach me Photoshop." Users create profiles, add the skills they can offer and want to learn, and send/accept swap requests in a secure, interactive environment.

---

## 🧩 Key Features

### 👤 User Features
- Public/private skill profiles
- Add: name, location, photo, skills offered/wanted, availability
- Search other users by skill
- Send, accept, or reject swap requests
- Leave feedback after swaps
- In-app messaging (if enabled)
- Delete pending requests

### 🛡️ Admin Features
- Moderate/flag inappropriate skills
- Ban users violating policies
- View & manage all swaps
- Broadcast platform-wide messages
- Export logs and usage reports

---

## ⚙️ Tech Stack

| Area          | Technology Used                 |
|---------------|----------------------------------|
| Frontend      | React.js + Tailwind CSS         |
| Backend       | Node.js + Express.js            |
| Database      | MongoDB (via Mongoose)          |
| Authentication| JWT-based login/auth            |
| Storage       | Cloudinary / local              |
| Hosting       | **Local only for judges**       |
| Versioning    | Git + GitHub                    |
| Design        | Figma, Excalidraw               |

---

## 🖥️ Local Setup & Deployment Instructions (For Judges)

⚠️ Due to deployment limitations, our application is not hosted online.  
Please follow these steps to run the project **locally**:

---

### 📁 1. Clone the Repository

```bash
git clone https://github.com/xcalibur-team/skill-swap-platform.git
cd skill-swap-platform
 2. Install Dependencies
Backend (Node.js + Express)
bash
Copy
Edit
cd server
npm install
Frontend (React)
Open a new terminal:

bash
Copy
Edit
cd client
npm install
🧪 3. Set Up Environment Variables
Create a file named .env inside the server/ folder:

bash
Copy
Edit
cd server
touch .env
Paste the following into .env:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
You can use MongoDB Atlas or a local MongoDB instance.

▶️ 4. Run the Application Locally
Start Backend Server
bash
Copy
Edit
cd server
npm start
Start Frontend App
Open a second terminal window:

bash
Copy
Edit
cd client
npm start
🌐 5. Access the Application
Once both servers are running:

Frontend: http://localhost:3000

Backend API: http://localhost:5000

Test account credentials can be used to log in or sign up.

🔐 6. Admin Access Instructions
To test admin features, you can:

Use this test login (if configured):

bash
Copy
Edit
Email: admin@xcalibur.com
Password: admin123
Or manually set role: "admin" in MongoDB for any user.

📃 Sample .env Example
env
Copy
Edit
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/skillswap
JWT_SECRET=supersecretkey
📂 Project Structure
bash
Copy
Edit
skill-swap-platform/
├── client/                 # React frontend
│   ├── public/
│   └── src/
├── server/                 # Express backend
│   ├── models/
│   ├── routes/
│   └── controllers/
├── README.md
└── .env (ignored)
