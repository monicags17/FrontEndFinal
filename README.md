# UNKLAB Lost & Found

A modern Lost and Found system for Universitas Klabat, built with React and Vite.

## Features

- 🔍 Search for lost items
- 📝 Report lost or found items
- 👤 User authentication (Admin & Regular Users)
- 🛡️ Admin dashboard with user management
- 📱 Responsive glassmorphism design
- 💾 JSON Server for local database

## Tech Stack

- **Frontend**: React 18, React Router, TanStack Query
- **UI**: Tailwind CSS, Radix UI, Shadcn/ui
- **Backend**: JSON Server (local development)
- **Build Tool**: Vite
- **Forms**: React Hook Form
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server and JSON server concurrently:

```bash
# Terminal 1: Start Vite dev server
npm run dev

# Terminal 2: Start JSON Server
npm run server
```

The app will be available at `http://localhost:8080`
The API will be available at `http://localhost:3001`

### Default Admin Credentials

- Email: `admin@unklab.ac.id`
- Password: `admin123`

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── lib/            # Utilities and API functions
└── main.jsx        # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run server` - Start JSON Server
- `npm run lint` - Run ESLint

## Database

The application uses `db.json` as a local database with the following collections:
- `items` - Lost and found items
- `contacts` - Contact messages
- `users` - User accounts

## License

This project is for educational purposes at Universitas Klabat.
