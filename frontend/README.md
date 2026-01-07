# User Management Dashboard

Modern admin dashboard built with Next.js, React, and Tailwind CSS for managing users connected to a Node.js/Express backend with Prisma ORM.

## Features

- ✨ Dark mode with neon accents (green, blue, purple)
- 📊 User management system with table view
- ➕ Create new users with modal form
- 🗑️ Delete users
- 📱 Responsive design
- 🎨 Modern SaaS admin dashboard UI
- ⚡ Real-time API integration

## Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Node.js, Express, Prisma ORM
- **Database**: SQLite (development)
- **API**: REST API

## Getting Started

### Prerequisites

- Node.js 18+
- Backend server running on `http://localhost:3000`

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── components/
│   ├── Sidebar.tsx      # Navigation sidebar
│   ├── UserTable.tsx    # User list table
│   └── UserModal.tsx    # Create user modal
├── pages/
│   ├── _app.tsx         # App wrapper
│   ├── _document.tsx    # Document setup
│   └── index.tsx        # Main dashboard page
├── styles/
│   └── globals.css      # Global styles
└── public/              # Static assets
```

## API Endpoints Used

- `GET /api/users` - List all users
- `POST /api/users` - Create new user
- `DELETE /api/users/:id` - Delete user

## License

MIT
