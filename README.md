# NUS ModSentry 🛡️

**Academic Survival Dashboard for National University of Singapore students**

A gorgeous, fully client-side dashboard built with React + Vite + Tailwind CSS, deployable to GitHub Pages in minutes.

---

## Features

### Tab 1 — CourseReg Bidding Strategist & Risk Analyzer
- 🔍 **Live module lookup** via the public NUSMods V2 API (`api.nusmods.com/v2/`)
- 🎯 **Risk scoring** — HIGH / MEDIUM / LOW badges per module based on:
  - Tutorial slot scarcity (number of sections available)
  - Peak-hour congestion (12pm–2pm slots)
  - Alternate-week clash detection
  - Small-venue enrollment caps
- ⚡ **Clash detection** — finds overlapping slots across all added modules, including hidden alternate-week clashes
- 📅 **Visual timetable** — colour-coded weekly grid showing all lesson slots
- 💡 **Mitigation strategies** — actionable, per-module bidding advice
- 🔗 **NUSMods URL import** — paste a share URL to import your full timetable instantly
- 💾 **Persistent state** — modules saved to localStorage, survive page refresh

### Tab 2 — Ghost Room Finder
- 🏛️ **Empty classroom finder** across 6 campus zones (COM, FOS, FASS, BIZ, ENG, UTown)
- 🕐 **"Find Now" button** — auto-sets to current day & time
- ⏱️ **Vacancy duration** — "Empty for 2h 30m, then CS2040S Lecture"
- 👥 **Crowdsourcing toggles** — Report Occupied / Confirm Empty per room (persisted in localStorage)
- 🔎 **Search + filter** by building name, room type, capacity
- 📊 **Occupancy bar** — visual campus density indicator

### Design
- 🌙 **Dark / Light mode** toggle (respects system preference by default)
- ✨ **Premium academic-tech aesthetic** — DM Serif Display + DM Sans + JetBrains Mono
- 🎨 **Deep navy dark theme** + emerald/amber/rose risk accents
- 🔔 **Toast notifications** — success, error, warning, info
- 📱 **Responsive layout** — works on tablet and desktop

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 18 | UI framework |
| Vite | 5 | Build tool |
| Tailwind CSS | 3 | Styling |
| Lucide React | latest | Icons |
| NUSMods API v2 | — | Module data |

---

## Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/nus-modsentry.git
cd nus-modsentry

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
# → http://localhost:5173/nus-modsentry/
```

---

## Deploy to GitHub Pages

### Method A — GitHub Actions (recommended, automatic)

1. Push this repo to GitHub as `nus-modsentry`
2. Go to **Settings → Pages → Source** → select **"GitHub Actions"**
3. Push any commit to `main` — the workflow at `.github/workflows/deploy.yml` builds and deploys automatically
4. Your site will be live at: `https://YOUR_USERNAME.github.io/nus-modsentry/`

### Method B — Manual deploy with gh-pages

```bash
npm run build
npx gh-pages -d dist
```

### ⚠️ Important: Repo Name Configuration

The app is pre-configured for a repo named **`nus-modsentry`**. If your repo has a different name, update the `base` field in `vite.config.js`:

```js
// vite.config.js
export default defineConfig({
  plugins: [react()],
  base: '/YOUR_REPO_NAME/',  // ← change this
})
```

Also update the `<link rel="icon">` href in `index.html` if needed.

---

## Project Structure

```
nus-modsentry/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Auto GitHub Pages deployment
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx         # Navigation sidebar
│   │   ├── StrategistTab.jsx   # CourseReg tab (main container)
│   │   ├── RiskCard.jsx        # Per-module risk analysis card
│   │   ├── Timetable.jsx       # Visual weekly timetable grid
│   │   ├── ClashAlert.jsx      # Clash detection banner
│   │   ├── GhostRoomTab.jsx    # Ghost room finder tab
│   │   ├── RoomCard.jsx        # Individual room card
│   │   └── Toast.jsx           # Notification toasts
│   ├── data/
│   │   └── venues.js           # NUS venue data + mock schedules
│   ├── hooks/
│   │   ├── useModules.js       # Module fetch + risk logic
│   │   └── useToast.js         # Toast state management
│   ├── App.jsx                 # Root component
│   ├── main.jsx                # Entry point
│   └── index.css               # Tailwind + custom styles
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## Extending the App

### Add more venues to Ghost Room Finder
Edit `src/data/venues.js` — add entries to `VENUES` and `SCHEDULES`. The format mirrors [NUSMods venue data](https://api.nusmods.com/v2/2024-2025/venueInformation.json).

### Change the academic year
Update `CURRENT_AY` in `src/hooks/useModules.js`:
```js
const CURRENT_AY = '2024-2025'; // ← change to '2025-2026' etc.
```

### Fetch live venue data
The NUSMods API exposes full venue information at:
```
https://api.nusmods.com/v2/2024-2025/venueInformation.json
```
You can replace the static `SCHEDULES` dict by fetching this endpoint and parsing it client-side.

---

## Data Sources & Disclaimer

- Module data is fetched live from the [NUSMods Public API](https://api.nusmods.com/v2/)
- Ghost Room schedules are curated representative data for AY2024/25 Sem 1
- **Not affiliated with the National University of Singapore or NUSMods**
- Always verify room availability at [nusmods.com/venues](https://nusmods.com/venues) before visiting

---

## License

MIT
