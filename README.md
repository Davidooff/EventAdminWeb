# EventAdminWeb

Admin panel for the event platform, written in React 19 and TypeScript with Material UI. It talks to [EventAppApi](https://github.com/Davidooff/EventAppApi), the ASP.NET Core backend.

## Stack

- **React 19** + **TypeScript**, built with **Vite**
- **Material UI 7** + **Toolpad Core** (dashboard layout, CRUD list views)
- **React Router 7** (data router, nested and protected routes)

## Features

- **Sign-in with cookie-based JWT.** The API sets the access and refresh tokens as cookies, so the frontend never stores tokens itself.
- **Silent token refresh.** `authenticatedFetch` retries a request once after a `401` by calling `/api/auth/refresh`. If the refresh fails too, it fires an `auth-failed` event that the `AuthProvider` handles by logging the user out.
- **Protected routes.** Everything except `/login` sits under a `ProtectedRoute` that redirects to sign-in and remembers where the user was going.
- **Role-driven navigation.** The dashboard menu is built from `GET /api/auth/admin`, so each user sees only the panels (Events, Users, Categories) their role allows. Access is still enforced by the backend.

## Structure

```
src/
  contexts/authContext.tsx    auth state, login/logout, auth-failed listener
  services/authService.ts     login / register / refresh calls
  utils/requests/             fetch wrapper with refresh-and-retry, typed responses
  pages/                      login, dashboard shell, protected route
  dashboard/events.tsx        events list (Toolpad CRUD)
  routes.ts                   router configuration
```

## Running locally

Start EventAppApi first (it listens on `http://localhost:5009`). The Vite dev server proxies `/api` to it, so there are no CORS problems in development.

```bash
npm install
npm run dev      # http://localhost:5173
```

## Status

Work in progress. Sign-in, refresh, protected routing and the role-based menu are done. The events page uses a Toolpad data source that is not yet wired to the events API, and the Users and Categories pages are not built yet.
