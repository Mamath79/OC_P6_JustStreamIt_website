# JustStreamIt — Vanilla JS (P6)

> **Educational project (OpenClassrooms)** — a small front‑end app to browse the best‑rated movies, by category, with **carousels** and a **modal** that shows detailed information.

---

## ✨ Features

- 🎞️ **Top movies** section (overall best‑rated)
- 🗂️ **Categories** (e.g., Animation, Sci‑Fi…) each displayed as a **carousel**
- ℹ️ **Movie modal** with poster, rating, genres, year, cast, synopsis
- 🔎 Optional search/filter helpers (if implemented in your version)
- 📱 **Responsive** layout & basic **keyboard accessibility** for the modal

> Scope intentionally focuses on DOM, async `fetch`, and clean JS.

---

## 🧱 Tech stack

- **HTML5**, **CSS3** (vanilla)
- **JavaScript (ES6+)** — no framework or bundler required
- Data source: a REST API (e.g., *OCMovies API* run locally)

---

## 📦 Repository layout

```
.
├─ index.html
├─ juststreamit_scripts/      # JS modules (API calls, UI, modal, carousel)
├─ juststreamit_styles/       # CSS files
└─ logo/                      # Static assets (icons, logos)
```

> Your exact file names may vary slightly; adjust instructions accordingly.

---

## 🚀 Getting started

### 1) Serve the static files

You can open `index.html` directly in a browser, but using a tiny local server avoids CORS issues:

```bash
# Option A (Python)
python3 -m http.server 5500
# then open http://127.0.0.1:5500/index.html

# Option B (Node)
npx serve .
```

### 2) Run / point to the movie API

This app expects a REST API (e.g., **OCMovies‑API**) available on `http://127.0.0.1:8000`.

- If you use OCMovies‑API, follow its README to launch it locally.
- Set the **API base URL** in your JS (look in `juststreamit_scripts/` for a file like `api.js` or a constant such as `API_BASE_URL`).

```js
// Example inside juststreamit_scripts/api.js
export const API_BASE_URL = "http://127.0.0.1:8000/api/v1";
```

Reload the page once the API is running.

---

## 🕹️ Usage

- The **Best rated** banner shows the #1 movie.
- Each **category** renders a **carousel**; use arrows to navigate.
- Click a **poster** (or a “More info” button) to open the **modal** with details.
- Press `Esc` or the close button to dismiss the modal.

---

## 🔧 Configuration & notes

- Edit **endpoints / categories** in `api.js` (or the relevant module) if your API uses different routes.
- Image quality and card counts per row can be tuned in the carousel module.
- Basic accessibility: the modal traps focus, `aria-*` attributes are set on open/close (additionally refine as you wish).

---

## 🧭 Roadmap ideas

- Add a **search bar** with debounce
- Persist user preferences (last category, dark theme)
- Lazy‑load posters with `loading="lazy"`
- Extract a small **Router** for hash‑based navigation

---

## 👤 Author

**Mathieu Vieillefont**\
LinkedIn: [https://www.linkedin.com/in/mathieu-vieillefont/](https://www.linkedin.com/in/mathieu-vieillefont/)

---

## 📄 License

Published for **educational purposes** (OpenClassrooms). Add a license (e.g., MIT) if you plan to reuse/redistribute.

