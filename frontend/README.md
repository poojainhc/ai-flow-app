#  AI Flow Builder

A full-stack MERN application that allows users to create a simple AI workflow using a visual interface. Users can input a prompt, run it through an AI model, and view the response in a connected flow.

---

##  Features

*  AI-powered response generation (OpenRouter API)
*  Visual workflow using React Flow
*  Save prompt & response to MongoDB
*  Fast frontend built with React (Vite)
*  Clean UI with Tailwind CSS
*  Secure backend (API key hidden)

---

## Tech Stack

### Frontend

* React (Vite)
* React Flow
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### AI Integration

* OpenRouter API (Free LLM models)

---

##  Project Structure

ai-flow-app/
│
├── backend/
│   ├── server.js
│   └── .env
│
└── frontend/
├── src/
├── index.html
└── package.json

---

## Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/ai-flow-app.git
cd ai-flow-app
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```
MONGO_URI=mongodb+srv://poojakhawle:Pooja%40123@cluster0.jth7oa7.mongodb.net/aiflow

OPENROUTER_API_KEY=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
```

Run backend:

```bash
node server.js
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

##  API Endpoints

### ➤ Generate AI Response

POST `/api/ask-ai`

```json
{
  "prompt": "What is AI?"
}
```

---

###  Save Data

POST `/api/save`

```json
{
  "prompt": "What is AI?",
  "response": "AI stands for Artificial Intelligence"
}
```

---

##  How It Works

1. User enters a prompt in the input node
2. Clicks "Run Flow"
3. Frontend sends request to backend
4. Backend calls OpenRouter API
5. Response is displayed in output node
6. User can save data to MongoDB

---

## Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas
---

##  Author

**Pooja Jadhav**

---

##  Future Improvements

* Drag & drop nodes
* Multiple AI nodes (workflow chain)
* Chat history UI
* Authentication system

---

##  License

This project is for assignment and portfolio purposes.
