# MedTrack Web

Angular front end for MedTrack, a small personal health journal. Log symptoms,
keep track of medications (with a daily reminder time) and appointments, and see
everything on one timeline.

Talks to the ASP.NET Core API in the `medtrack-api` repo.

## Running locally

Requires Node 12+ and the Angular CLI 10.

```
npm install
npm start
```

Then open http://localhost:4200. The API is expected at `https://localhost:5001/api`
(see `src/environments/environment.ts`). The API already allows CORS from
`localhost:4200` in Development.

## Structure

- `core/` - models, services, the auth guard and the http interceptor that adds the JWT
- `shared/` - shared module and the `app-field-error` component used by all forms
- `auth/` - login and register pages
- `symptoms/`, `medications/`, `appointments/`, `timeline/` - lazy loaded feature modules

## Tests

```
npm test
```
