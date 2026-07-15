<h1 align="center">
🤖 RAGent AI — Enterprise Knowledge Assistant
</h1>

<p align="center">
An enterprise-grade Retrieval-Augmented Generation (RAG) assistant that enables employees to retrieve accurate information from organizational documents using AI-powered semantic search, vector embeddings, and Large Language Models.
</p>

<p align="center">

<img src="https://img.shields.io/badge/Python-3.11-blue?style=for-the-badge&logo=python"/>

<img src="https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi"/>

<img src="https://img.shields.io/badge/Next.js-Frontend-black?style=for-the-badge&logo=nextdotjs"/>

<img src="https://img.shields.io/badge/React-TypeScript-61DAFB?style=for-the-badge&logo=react"/>

<img src="https://img.shields.io/badge/TailwindCSS-UI-38B2AC?style=for-the-badge&logo=tailwind-css"/>

<img src="https://img.shields.io/badge/ChromaDB-Vector_DB-orange?style=for-the-badge"/>

<img src="https://img.shields.io/badge/LangChain-RAG-success?style=for-the-badge"/>

<img src="https://img.shields.io/badge/HuggingFace-Embeddings-yellow?style=for-the-badge"/>

<img src="https://img.shields.io/badge/SQLite-Database-003B57?style=for-the-badge&logo=sqlite"/>

<img src="https://img.shields.io/badge/JWT-Authentication-red?style=for-the-badge"/>

<img src="https://img.shields.io/badge/License-MIT-purple?style=for-the-badge"/>

</p>

---

# 📖 Overview

RAGent AI is an Enterprise Knowledge Assistant designed to help employees retrieve information from company documents through natural language conversations.

The system combines Retrieval-Augmented Generation (RAG), semantic search, vector embeddings, and Large Language Models to provide accurate, context-aware answers with source citations.

Administrators can manage users, upload organizational documents, monitor analytics, and maintain the enterprise knowledge base, while employees can securely interact with the chatbot to access company information instantly.

---

# ✨ Features

### 🤖 AI Assistant

- Enterprise RAG Chatbot
- Semantic Document Search
- Context-Aware Responses
- Source Citations
- Persistent Conversations

### 📚 Knowledge Base

- Upload PDF Documents
- Automatic Text Chunking
- Embedding Generation
- ChromaDB Vector Storage
- Document Search
- Delete Documents

### 👥 User Management

- JWT Authentication
- Admin & Employee Roles
- Role-Based Access Control
- Password Management
- User Creation

### 📈 Analytics

- Total Users
- Total Conversations
- Total Messages
- Recent Conversations

### 💬 Chat Management

- New Chat
- Chat History
- Conversation Search
- Rename Conversations
- Delete Conversations

### 🎨 UI Features

- Responsive Design
- Dark / Light Theme
- Modern Enterprise Dashboard
- Professional Admin Panel

---

# 🏗️ System Architecture

```
                  User

                    │

                    ▼

           Next.js Frontend

                    │

                    ▼

            FastAPI Backend

        ┌───────────┴────────────┐

        ▼                        ▼

    SQLite DB              ChromaDB

        ▼                        ▼

 Authentication          Vector Embeddings

        │                        │

        └──────────► Large Language Model
```

---

# 🛠️ Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide Icons

## Backend

- FastAPI
- SQLAlchemy
- JWT Authentication
- Passlib
- SQLite

## AI Stack

- LangChain
- Sentence Transformers
- ChromaDB
- Hugging Face Embeddings
- PyPDF

---

# 📸 Screenshots

## 🔐 Login

![Login](assets/login.png)

---

## 💬 AI Chat

![Chat](assets/chat.png)

---

## 🕒 Chat History

Search, rename, export, and delete previous conversations.

![History](assets/history.png)

---

## ⚙️ Settings

### Profile Information

![Profile](assets/settings-profile.png)

### Change Password

![Password](assets/settings-password.png)

### User Management (Admin)

![User Management](assets/settings-user-management.png)

---

## 📚 Knowledge Base

Upload PDFs, view indexed documents, monitor chunk count, and manage the enterprise knowledge base.

![Knowledge Base](assets/knowledge-base.png)

---

## 📊 Analytics Dashboard

Monitor users, conversations, messages, and recent activity.

![Analytics](assets/analytics.png)
# 📂 Project Structure

```text
AI-Knowledge-Assistant/

│

├── chatbot/
│   ├── main.py
│   ├── models.py
│   ├── database.py
│   ├── security.py
│   ├── build_database.py
│   └── ...

├── data/
│   ├── Employee_Handbook.pdf
│   ├── document_metadata.json
│   └── ...

├── vector_db/

├── frontend/
│   ├── app/
│   ├── components/
│   └── ...

├── requirements.txt

└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/Mehnaz213/AI-Knowledge-Assistant.git

cd AI-Knowledge-Assistant
```

---

## Backend

```bash
python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn chatbot.main:app --reload
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🚀 Future Improvements

- Agentic AI Workflow
- Multi-Step Retrieval Planning
- Intelligent Query Expansion
- Confidence-Based Retrieval
- Multi-Document Reasoning
- Advanced RAG Evaluation
- Cloud Deployment

---

# 👩‍💻 Author

**Fathima Mehnaz**

Artificial Intelligence & Machine Learning Engineering Student

GitHub:
https://github.com/Mehnaz213

LinkedIn:
https://www.linkedin.com/in/fathima-mehnaz
