AI-Assisted Knowledge Quiz

This project is a simple AI-powered quiz app where users enter a topic and the system generates 5 MCQs using an AI model. After answering the quiz, the user gets a final score and AI-generated feedback.

This assignment was built using React + TypeScript + Vite (frontend) and Node.js + Express (backend). The backend acts as a proxy for secure AI calls.

# How to Run the Project:
1. Start the Backend (server):
cd server
npm install
cp ../.env.example .env     
npm run dev-server

2. Start the Frontend
npm install
npm run dev

# Project Flow:

User enters a topic.

Backend sends a strict JSON prompt to the AI model.

AI returns 5 MCQs (question, 4 options, correct answer, explanation).

User answers the quiz using next/previous navigation.

Final screen shows score + AI-generated feedback.




# AI Prompts (Summary)

First prompt generates 5 MCQs in strict JSON format.

Second prompt generates feedback based on score.

Both prompts force the model to return only JSON, nothing else.

# Features

Enter any topic

AI-generated 5-question quiz

Navigate forward/backward

Explanation toggle

Final score and AI feedback

Error handling (loading states, invalid JSON retry)

# Known Issues

If AI sends malformed JSON, app retries once.

Page refresh clears quiz (state stored in memory only).

# Improvements (if given more time)

Add localStorage for quiz history

Add dark mode

Add animations

Deploy backend as serverless functions

Better validation for user input