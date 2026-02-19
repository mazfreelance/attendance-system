# Frontend Integration

This document describes the Next.js frontend integration with the Laravel backend.

## Overview

The frontend is built with Next.js 16, TypeScript, and Tailwind CSS. It provides a modern, responsive user interface that integrates seamlessly with the Laravel API backend.

## Directory Structure

```
attendance-system/
├── app/                    # Laravel backend
├── frontend/               # Next.js frontend (new)
│   ├── app/               # Next.js pages and layouts
│   ├── components/        # Reusable React components
│   ├── contexts/          # React contexts (Auth)
│   ├── lib/              # Utility libraries (API, Auth)
│   └── public/           # Static assets
└── [other Laravel files]
```

## Setup Instructions

### Backend Setup (Laravel)

1. Install PHP dependencies:
```bash
composer install
```

2. Configure environment:
```bash
cp .env.example .env
php artisan key:generate
```

3. Run migrations:
```bash
php artisan migrate
```

4. Create a test user (optional):
```bash
php artisan tinker
>>> \App\Models\User::create(['name' => 'Test User', 'email' => 'test@example.com', 'password' => bcrypt('password'), 'role' => 'user']);
>>> \App\Models\User::create(['name' => 'Admin User', 'email' => 'admin@example.com', 'password' => bcrypt('password'), 'role' => 'admin']);
```

5. Start Laravel server:
```bash
php artisan serve
```

The API will be available at `http://localhost:8000`

### Frontend Setup (Next.js)

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment:
```bash
cp .env.example .env.local
```

Edit `.env.local` to set the API URL (should match your Laravel backend):
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

4. Start development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Features

### Authentication
- **Login**: Email and password authentication
- **Logout**: Secure token revocation
- **Protected Routes**: Automatic redirect for unauthenticated users
- **Token Management**: Automatic token inclusion in API requests

### User Interface
- **Dashboard**: User overview with stats and information
- **Profile**: Detailed user profile page
- **Admin Panel**: Admin-only features (requires admin role)
- **Navigation**: Responsive navigation bar with logout

### API Integration
- **Axios Client**: Configured HTTP client with interceptors
- **Error Handling**: Automatic 401 handling and redirect
- **Cookie Management**: Secure token storage in cookies
- **TypeScript**: Full type safety for API responses

## API Endpoints

The frontend integrates with the following Laravel API endpoints:

- `POST /api/login` - User authentication
- `POST /api/logout` - User logout (authenticated)
- `GET /api/user` - Get current user data (authenticated)
- `GET /api/admin` - Admin-only endpoint (requires admin role)

## Development Workflow

### Running Both Services

1. **Terminal 1** - Laravel Backend:
```bash
php artisan serve
```

2. **Terminal 2** - Next.js Frontend:
```bash
cd frontend
npm run dev
```

### Testing the Integration

1. Open `http://localhost:3000` in your browser
2. You'll be redirected to `/login`
3. Login with test credentials:
   - Email: `test@example.com`
   - Password: `password`
4. You'll be redirected to `/dashboard`
5. Navigate through Profile and Admin (if admin user) pages

### Making Changes

- **Backend Changes**: Edit files in `app/`, `routes/`, etc.
- **Frontend Changes**: Edit files in `frontend/app/`, `frontend/components/`, etc.
- Both services support hot-reload during development

## Production Deployment

### Backend (Laravel)

```bash
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Frontend (Next.js)

```bash
cd frontend
npm run build
npm start
```

Or deploy to Vercel, Netlify, or similar platforms.

## Technology Stack

### Backend
- PHP 8.x
- Laravel 11.x
- Laravel Sanctum (API authentication)
- SQLite/MySQL

### Frontend
- Node.js 18+
- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- Axios (HTTP client)
- js-cookie (Cookie management)

## Security Considerations

1. **API Tokens**: Stored securely in HTTP-only cookies
2. **CORS**: Configure Laravel CORS settings for production
3. **Environment Variables**: Never commit `.env` or `.env.local` files
4. **HTTPS**: Use HTTPS in production for both frontend and backend
5. **Token Expiry**: Tokens expire after 7 days by default

## Troubleshooting

### CORS Issues
If you encounter CORS errors, ensure Laravel CORS configuration allows requests from your frontend origin. Update `config/cors.php`:

```php
'allowed_origins' => [env('FRONTEND_URL', 'http://localhost:3000')],
'supports_credentials' => true,
```

### API Connection Issues
- Verify backend is running on `http://localhost:8000`
- Check `NEXT_PUBLIC_API_URL` in `frontend/.env.local`
- Check browser console for error messages

### Authentication Issues
- Clear cookies if experiencing login issues
- Check Laravel logs in `storage/logs/laravel.log`
- Verify user exists in database

## Future Enhancements

- [ ] User registration page
- [ ] Password reset functionality
- [ ] Attendance tracking features
- [ ] Real-time updates with WebSockets
- [ ] User management interface
- [ ] Reports and analytics
- [ ] Mobile responsive improvements
- [ ] Dark mode support

## Support

For issues or questions, please create an issue in the repository.
