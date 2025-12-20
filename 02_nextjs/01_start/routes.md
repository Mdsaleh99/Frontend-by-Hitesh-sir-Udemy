# 1️⃣ Parallel Routes ( `@slot` )

### 👉 What problem do they solve?

Parallel Routes let you **render multiple pages at the same time in the same layout**, **independently**.

Think of them as **multiple outlets** inside one layout.

---

## 🧠 Mental Model

> “I want different sections of the page to be controlled by different routes.”

Example:

* Main content
* Sidebar
* Modal
* Notifications panel

Each can have **its own route**, **own loading state**, **own error boundary**.

---

## 📂 Folder Syntax

Parallel routes use **named slots** with `@`.

```
app/
 ├─ layout.tsx
 ├─ page.tsx
 ├─ @sidebar/
 │   └─ page.tsx
 └─ @modal/
     └─ page.tsx
```

* `@sidebar` and `@modal` are **slots**
* They do **NOT** affect the URL

---

## 🧩 layout.tsx (Very Important)

```tsx
export default function Layout({
  children,
  sidebar,
  modal,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <main>{children}</main>
      <aside>{sidebar}</aside>
      {modal}
    </>
  );
}
```

* Slot names become **props**
* `children` = default route
* `sidebar`, `modal` = parallel routes

---

## 🌐 URL Behavior

```
/dashboard
```

All render together:

* `page.tsx`
* `@sidebar/page.tsx`
* `@modal/page.tsx`

---

## 🕐 Independent Loading States

```
@sidebar/loading.tsx
@modal/loading.tsx
```

Each loads **independently** — huge UX win.

---

## 🔥 Real Use Cases

✅ Dashboards
✅ Chat apps
✅ Split screens
✅ Modals
✅ Persistent UI (music player, cart, notifications)

---

# 2️⃣ Intercepting Routes ( `(.)`, `(..)` )

### 👉 What problem do they solve?

Intercepting routes allow you to **show a route inside another route’s UI**
➡️ without changing the user’s navigation context.

Most common use case: **MODALS**.

---

## 🧠 Mental Model

> “Open a page, but show it as a modal on top of the current page.”

Example:

* `/photos` → grid
* Click photo → `/photos/123`
* BUT instead of full page → open modal

---

## 📂 Folder Syntax

### `(.)` → same level

### `(..)` → one level up

### `(...)` → root

Example:

```
app/
 ├─ photos/
 │   ├─ page.tsx
 │   └─ [id]/
 │       └─ page.tsx
 └─ @modal/
     └─ (.)photos/
         └─ [id]/page.tsx
```

---

## 🧩 What’s happening?

* Normal navigation:

  ```
  /photos/123 → full page
  ```

* From `/photos`:

  ```
  /photos/123 → opens modal
  ```

Same URL, **different UI behavior** depending on navigation source.

---

## 🧠 Why this is powerful

* No duplicate URLs
* Deep linking works
* Refresh shows full page
* Client navigation shows modal

---

## 🪄 How layout renders it

```tsx
export default function Layout({ children, modal }) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
```

---

## 🧪 Common Example: Auth Modal

```
/login
```

* From homepage → modal
* Direct visit → full page

---

# 3️⃣ Parallel vs Intercepting Routes (Comparison)

| Feature             | Parallel Routes                 | Intercepting Routes           |
| ------------------- | ------------------------------- | ----------------------------- |
| Purpose             | Render multiple routes together | Render a route inside another |
| URL change          | No                              | Yes                           |
| Typical use         | Dashboard layout                | Modal pages                   |
| Slot based          | Yes (`@slot`)                   | Often used with slots         |
| Independent loading | Yes                             | Yes                           |
| Deep linking        | N/A                             | Yes                           |

---

# 4️⃣ When to Use What?

### ✅ Use **Parallel Routes** when:

* You need **multiple areas** controlled by routes
* Sidebar, chat panel, player, notifications
* Persistent UI sections

---

### ✅ Use **Intercepting Routes** when:

* You want **modal behavior**
* Maintain URL correctness
* Want full page on refresh

---

# 5️⃣ Using Them Together (Most Real Apps)

🔥 This is the **real power**.

* Parallel routes create a `@modal` slot
* Intercepting routes decide **what appears in it**

This is how **Instagram, Twitter, LinkedIn** work.

---

# 6️⃣ One-Line Summary

* **Parallel Routes** = multiple routes rendered together
* **Intercepting Routes** = show a route differently based on navigation context
* **Together** = perfect modal + dashboard UX

---