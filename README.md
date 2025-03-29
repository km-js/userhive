# UserHive - User Management System 🔐

A modern user management application built with React that integrates with the Reqres API. Implements authentication, paginated user listing, and CRUD operations with responsive design.

**Live Demo**: [https://userhive.vercel.app/](https://userhive.vercel.app/)

## ✨ Features

- 🔒 JWT-based authentication system
- 📄 Paginated user listing 
- ✏️ Edit user details with modal form
- 🗑️ Delete users with confirmation dialog
- 📱 Fully responsive design (mobile-first)
- 🚨 Error handling with toast notifications
- 🔄 Auto-redirect on unauthorized access
- 🛣️ React Router navigation

## 🚀 Quick Start

### Prerequisites
- Node.js ≥18.x
- npm ≥9.x

### Installation
```bash
# Clone repository
git clone https://github.com/<your-username>/userhive.git

# Navigate to project directory
cd userhive

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🌐 Live Demo

Check out the live version hosted on Netlify:  
[https://userhive.vercel.app/](https://userhive.vercel.app/)  

Test credentials:  
📧 Email: `eve.holt@reqres.in`  
🔑 Password: `cityslicka`

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Routing**: React Router 6
- **UI Library**: shadcn/ui + Tailwind CSS
- **HTTP Client**: Fetch API
- **Icons**: Lucide React
- **Hosting**: Vercel


## 🖥️ Running the App

```bash
# Development mode (http://localhost:5173)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

---

**Note**: This project uses a mock API - changes won't persist on the server but are handled optimistically in the UI.

