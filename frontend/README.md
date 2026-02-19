# Attendance System - Frontend

This is the Next.js frontend application for the Attendance System, integrating with the Laravel backend API.

## Technologies

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **js-cookie** - Cookie management

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Backend API running (Laravel)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and set the API URL:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Build the application for production:

```bash
npm run build
```

### Production

Start the production server:

```bash
npm start
```

## Features

### Authentication
- **Login page** (`/login`) - User authentication with email and password
- **Logout** - Secure logout with token revocation
- **Protected routes** - Automatic redirect to login for unauthenticated users

### Dashboard
- **Main dashboard** (`/dashboard`) - Overview with user information and stats
- **Profile page** (`/dashboard/profile`) - User profile details
- **Admin panel** (`/dashboard/admin`) - Admin-only features (role-based access)

### API Integration
- Axios-based API client with interceptors
- Automatic token management using cookies
- 401 error handling with automatic redirect
- Bearer token authentication

## Project Structure

```
frontend/
├── app/                      # Next.js app directory
│   ├── dashboard/           # Protected dashboard pages
│   │   ├── admin/          # Admin-only pages
│   │   ├── profile/        # User profile
│   │   ├── layout.tsx      # Dashboard layout with auth check
│   │   └── page.tsx        # Dashboard home
│   ├── login/              # Login page
│   ├── layout.tsx          # Root layout with AuthProvider
│   └── page.tsx            # Home page (redirects)
├── components/             # Reusable React components
│   └── Navigation.tsx      # Navigation bar
├── contexts/               # React contexts
│   └── AuthContext.tsx     # Authentication context
├── lib/                    # Library code
│   ├── api.ts             # Axios API client
│   └── auth.ts            # Auth service functions
└── public/                # Static files
```

## API Endpoints Used

- `POST /api/login` - User login
- `POST /api/logout` - User logout (authenticated)
- `GET /api/user` - Get current user (authenticated)
- `GET /api/admin` - Admin endpoint (admin role only)

## Authentication Flow

1. User enters credentials on login page
2. Frontend sends POST request to `/api/login`
3. Backend returns user data and API token
4. Token stored in cookie (`auth_token`)
5. Token automatically included in subsequent requests via Axios interceptor
6. On 401 response, user redirected to login

## Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend API base URL (default: `http://localhost:8000/api`)

## Development Notes

- Uses Next.js App Router with client components for interactivity
- Authentication state managed via React Context
- Cookies used for token storage (7 day expiry)
- Tailwind CSS for styling with responsive design
- TypeScript for type safety

## Testing Backend Integration

1. Ensure Laravel backend is running on `http://localhost:8000`
2. Create a test user in the database (use Laravel seeders or tinker)
3. Start the frontend dev server
4. Navigate to `http://localhost:3000`
5. Login with test credentials

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## License

MIT

