# NUS ModSentry 🎓
**Academic Survival Dashboard for NUS Students**

A fully client-side single-page app — no backend, no build step.  
Live data from the [NUSMods V2 Public API](https://api.nusmods.com/v2/).

## Features

### 📋 CourseReg Bidding Strategist
- Add module codes (e.g. `CS2040`, `MA1521`) or paste an NUSMods share URL
- Visual weekly timetable of all your modules
- Per-module **Risk Cards** (`LOW / MEDIUM / HIGH`) based on:
  - Peak-hour tutorial congestion (12–2 PM window)
  - Hidden lecture/tutorial clashes
  - Slot competition heuristics
- Collapsible **Mitigation Strategy** suggestions per module
- Persists across page refreshes via `localStorage`

### 👻 Ghost Room Finder
- Filter by Faculty/Zone, Day, and Time Block
- "📍 Right Now" button auto-sets to current day & time
- Room cards showing `AVAILABLE` / `OCCUPIED` status
- "Empty for X hours until [Module] starts" countdown
- Community crowdsourcing — **Confirm Empty** / **Report Occupied** per room

## Tech Stack
- **React 18** (CDN, no build step)
- **Tailwind CSS v3** (CDN, JIT)
- **Babel Standalone** (JSX transform at runtime)
- **NUSMods V2 API** (live module data)

## Running Locally

```bash
# Start a local HTTP server (Node.js built-in)
node -e "
const h=require('http'),fs=require('fs'),p=require('path');
const mime={html:'text/html',js:'application/javascript',json:'application/json'};
h.createServer((req,res)=>{
  if(req.url==='/favicon.ico'){res.writeHead(204);res.end();return;}
  let fp=p.join(process.cwd(),req.url==='/'?'index.html':req.url);
  try{res.writeHead(200,{'Content-Type':mime[p.extname(fp).slice(1)]||'text/plain'});fs.createReadStream(fp).pipe(res);}
  catch{res.writeHead(404);res.end('404');}
}).listen(5173,()=>console.log('Open: http://localhost:5173'));
"
```

Then open **http://localhost:5173**

## Deploy to GitHub Pages

1. Push this folder to a GitHub repository
2. Go to **Settings → Pages → Source: Deploy from branch → main / root**
3. Your app will be live at `https://<username>.github.io/<repo>/`

> No `vite build` or `npm install` needed — just static files!

## Academic Year

Currently configured for **AY2024-2025** (edit `AY` constant in `app.js` to update).
