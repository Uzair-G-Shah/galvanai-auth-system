# GalvanAI - Full-Stack Authentication System

This is a full-stack application featuring a role-based authentication system. The backend is built with Flask-RESTX and the frontend with Next.js and TypeScript.

## ✨ Features

-   **User Authentication**: Secure Login & Registration with email/password.
-   **OTP Verification**: Email-based One-Time Password verification for new users.
-   **Token Management**: Uses JWT for secure access and refresh tokens.
-   **Role-Based Access**:
    -   **Super Admin**: Pre-defined credentials, can manage all users.
    -   **User**: Can log in and access their own dashboard.
-   **Admin Dashboard**: A clean UI for the Super Admin to View, Create, Edit, and Delete users.

---

## 🛠️ Tech Stack

-   **Backend**: Python, Flask, Flask-RESTX, SQLAlchemy, Flask-Migrate, PyJWT, Flask-Mail
-   **Frontend**: Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, Axios, Zod
-   **Database**: SQLite

---

## 📸 Screenshots


*Front Page*


*Super Admin Login*


*Super Admin Dashboard*


*Adding a New User*


*Email Verification*


*User Login*


*User Dashboard*

---

## 🚀 Getting Started

Follow these instructions to get the project running on your local machine.

### Prerequisites

-   **Python** (3.8 or newer)
-   **Node.js** (v18 or newer) & **npm**
-   **Git**

### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/galvanai-auth-system.git](https://github.com/your-username/galvanai-auth-system.git)
cd galvanai-auth-system