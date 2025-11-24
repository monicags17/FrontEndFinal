# UNKLAB Lost & Found - Setup Guide

## Prerequisites
- Node.js installed
- npm or yarn package manager

## Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start JSON Server (Database)**
   Open a new terminal and run:
   ```bash
   npx json-server --watch db.json --port 3001
   ```
   
   This will start the JSON Server on http://localhost:3001
   The database file `db.json` will be watched for changes and update live.

3. **Start Development Server**
   In another terminal, run:
   ```bash
   npm run dev
   ```
   
   This will start the Vite development server on http://localhost:8080

## Application Structure

### Component Hierarchy

```
index.js (main.tsx)
└── App.js (App.tsx)
    ├── Header
    │   ├── Logo
    │   └── Navigation
    ├── Home (Index.tsx)
    │   ├── Hero
    │   ├── Statistics
    │   └── RecentItems
    │       └── ItemCard
    ├── Search
    │   ├── SearchBar
    │   ├── Tabs
    │   └── ItemCard (reused)
    ├── LostAndFound
    │   └── ItemForm
    │       ├── PhotoUpload
    │       └── LocationInput
    ├── Contact
    │   └── ContactForm
    ├── Admin
    │   ├── ItemsManager
    │   │   └── ItemCard (reused)
    │   └── ContactMessages
    └── Footer
```

### Pages

1. **Home** (`/`) - Hero section, statistics, and recent items
2. **Search** (`/search`) - Search and filter lost/found items
3. **Lost & Found** (`/lost-and-found`) - Report lost or found items
4. **Contact** (`/contact`) - Contact form for inquiries
5. **Admin** (`/admin`) - Manage items and view contact messages

### API Endpoints

The application uses JSON Server with the following endpoints:

**Items:**
- `GET /items` - Get all items
- `GET /items/:id` - Get single item
- `POST /items` - Create new item
- `PUT /items/:id` - Update item
- `DELETE /items/:id` - Delete item

**Contacts:**
- `GET /contacts` - Get all contacts
- `POST /contacts` - Create new contact
- `PUT /contacts/:id` - Update contact
- `DELETE /contacts/:id` - Delete contact

### Features

- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ Photo upload with preview
- ✅ Location input
- ✅ Search and filter functionality
- ✅ Contact form with admin panel
- ✅ Responsive design
- ✅ Blue and purple color scheme
- ✅ Live database updates via JSON Server
- ✅ Component-based architecture

## Database

The database is stored in `db.json` and uses JSON Server. All changes made through the application will be reflected in this file in real-time.

## Development

- Frontend runs on: http://localhost:8080
- Backend (JSON Server) runs on: http://localhost:3001
- Database file: `db.json`

## Tech Stack

- **Frontend**: Vite + React + TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: JSON Server
- **State Management**: TanStack Query (React Query)
- **Form Handling**: React Hook Form
- **Routing**: React Router DOM
