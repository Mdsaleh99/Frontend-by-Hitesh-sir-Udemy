# ✅ **Different Pages/Files in Next.js App Router & Their Roles**

## **1. `page.tsx` — Normal UI Page**

This is the **main page** the user sees when they visit a route.

Example:

```
app/about/page.tsx  →  /about
app/user/[id]/page.tsx  →  /user/123
```

**Role:**
✔ Renders the actual page content
✔ URL directly maps to this file

---

## **2. `layout.tsx` — Shared Layout for Child Routes**

A layout wraps multiple pages and stays the same while children change.

Example:

```
app/dashboard/layout.tsx
```

Applies to:

```
/dashboard
/dashboard/settings
/dashboard/users
```

**Role:**
✔ Common UI: sidebar, navbar, footer
✔ Prevents reloading of common components
✔ Provides shared structure

---

## **3. `loading.tsx` — Loading State UI**

Automatically shown **while the page or data is loading**.

Example:

```
app/dashboard/loading.tsx
```

**Role:**
✔ Show skeleton loader
✔ Replaces manual “Loading...” checks

---

## **4. `error.tsx` — Error UI Page**

Displayed when the page or layout throws an error.

```
app/dashboard/error.tsx
```

**Role:**
✔ Catch errors
✔ Display a friendly message
✔ Provide a “Try Again” button

---

## **5. `not-found.tsx` — Custom 404 Page**

Shown when a route or resource does not exist.

```
app/not-found.tsx
```

**Role:**
✔ Handles 404
✔ Custom UI for “Page not found”

---

## **6. `route.ts` — API Route (Server Action Endpoint)**

Used to create **API endpoints** inside the App Router.

Example:

```
app/api/login/route.ts
```

Maps to:

```
/api/login
```

**Role:**
✔ Handle POST/GET requests
✔ Replace old `pages/api/*`

---

## **7. `template.tsx` — Re-rendered Layout**

Unlike `layout.tsx` which **persists**, a template **re-renders on navigation**.

Use when:

* You need layout that resets every time (like step-by-step forms)

---

## **8. `default.tsx` — Fallback for Parallel Routes**

Used when a **parallel route slot** has no content.

Example:

```
app/@modal/default.tsx
```

Role: prevent blank screen for empty slots.

---

# ⭐ Quick Summary Table

| File              | Role                                                 |
| ----------------- | ---------------------------------------------------- |
| **page.tsx**      | The actual page UI for a route                       |
| **layout.tsx**    | Shared wrapper around child routes (navbar, sidebar) |
| **loading.tsx**   | Shown while data/page loads                          |
| **error.tsx**     | Shown when something breaks                          |
| **not-found.tsx** | Custom 404 page                                      |
| **route.ts**      | API endpoint                                         |
| **template.tsx**  | Layout that re-renders on navigation                 |
| **default.tsx**   | Fallback content for parallel routes                 |

---
