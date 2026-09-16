# 🌌 WHAT IF...? — Marvel Alternate Timeline Simulator

> **An interactive, full-stack multiverse simulation engine that explores causal divergence, nexus events, and alternate reality ripple effects inspired by Marvel stories.**

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-4.19-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![Project Status](https://img.shields.io/badge/Status-Educational%20%2F%20Hackathon-f59e0b?style=flat)](#disclaimer)

---

## 📖 Overview

**WHAT IF...? — Marvel Alternate Timeline Simulator** is an interactive, fan-made educational web application inspired by the concept of the Marvel multiverse and the Sacred Timeline. 

What happens if Thor aims for Thanos' head in *Infinity War*? What if Steve Rogers refuses to pass on his shield at the end of *Endgame*? What if Peter Parker survives the Decimation on Titan?

This simulator enables users to query pivotal turning points in Marvel Cinematic Universe history. The underlying simulation engine analyzes the causal divergence, identifies the historical nexus point, cancels obsolete canonical downstream events, calculates shifting character trajectories, determines timeline quantum stability, and generates a dramatic, episodic story complete with a multiversal twist and interactive branching timeline visualization.

---

## ✨ Core Features

| Feature | Description |
| :--- | :--- |
| 🧠 **Semantic Scenario Analyzer** | Parses natural-language What-If questions to identify primary actors, target entities, canonical events, and specific action alterations. |
| 🔀 **Causal Timeline Engine** | Computes non-destructive timeline bifurcations, determining voided canon events, downstream simulated occurrences, and quantum stability scores (0–100%). |
| 🎬 **Cinematic Story Generator** | Crafts multi-act episodic narratives written in punchy, dramatic beats (*The Divergence*, *The Moment*, *The Ripple Effect*, *Years Later*, *The Twist*, and *Alternate Ending*). |
| 🌐 **Interactive Branching Visualizer** | Renders a dual-path timeline comparing MCU Prime (Earth-616) with the newly established alternate reality stream, illustrating nexus split points. |
| ⚡ **Curated Nexus Scenarios** | Provides one-click access to curated multiverse scenarios, including Thor's Final Snap, Steve Rogers keeping the shield, and Peter Parker withstanding the Blip. |
| 🛠️ **Technical Diagnostics Drawer** | An expandable telemetry console displaying timeline IDs, designation labels, quantum stability ratings, voided canon logs, and chronological node streams. |
| 🎨 **Immersive Sci-Fi Interface** | Designed with a cosmic starfield backdrop, glowing glassmorphism, TVA-inspired status monitors, and custom responsive layouts. |

---

## ⚙️ How It Works

The simulation pipeline processes user inquiries through a deterministic, four-stage causal chain:

```
[ User Input / Curated Preset ]
               │
               ▼
   [ 1. Scenario Analyzer ] ────────► Extracts Actor, Target, Event & Action Intent
               │                     (Cross-references local Canon Knowledge Base)
               ▼
   [ 2. Timeline Engine ]   ────────► Calculates Nexus Divergence Point
               │                     - Cancels Voided Canon Events
               │                     - Generates Simulated Future Nodes
               │                     - Evaluates Character Impact & Stability
               ▼
   [ 3. Story Generator ]   ────────► Constructs Episodic Story Beats:
               │                     - The Divergence & The Moment
               │                     - Character Ripple Comparisons
               │                     - Years Later & Multiversal Twist
               ▼
   [ 4. Cinematic UI View ] ────────► Renders Story Experience, Branch Tree & Telemetry
```

1. **Query Ingestion**: The user enters a question (e.g., *"What if Thor went for the head in Infinity War?"*) or picks a curated preset from the Observatory console.
2. **Scenario Parsing (`scenarioAnalyzer.js`)**: Evaluates natural-language patterns against an MCU knowledge base of characters, movies, and canonical events to establish the exact nexus moment.
3. **Timeline Recalculation (`timelineEngine.js`)**: Identifies which future canon events become void (e.g., beheading Thanos prevents the Snap, the Time Heist, and Tony Stark's death), introduces new simulated events, and calculates timeline stability.
4. **Episodic Story Synthesis (`storyGenerator.js`)**: Generates structured narrative blocks comparing prime fates to alternate outcomes and introducing unforeseen cosmic consequences.
5. **Interactive Presentation (`App.jsx`, `CinematicStoryView.jsx`, `TimelineVisualizer.jsx`)**: The UI displays the cinematic story view, a side-by-side branch graph, and an optional technical telemetry drawer.

---

## 💻 Tech Stack

### Frontend
- **Framework**: [React 18](https://react.dev/) (Vite single-page application)
- **Tooling & Dev Server**: [Vite 6](https://vitejs.dev/) with automated API reverse proxy
- **Styling**: Vanilla CSS Design System with custom tokens, glassmorphism, flex/grid layouts, and responsive CSS variables
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend & Simulation
- **Runtime**: [Node.js](https://nodejs.org/) (v18+)
- **Web Framework**: [Express 4](https://expressjs.com/)
- **Middleware**: `cors`, `express.json()`
- **Architecture**: Modular services (`scenarioAnalyzer`, `timelineEngine`, `storyGenerator`) and REST routing (`/api/simulate`, `/api/scenarios/presets`, `/api/canon/*`)

### Knowledge Base Data Layer
- Curated, local JSON datasets located in `/data`:
  - `characters.json` — MCU character profiles, affiliations, aliases, and canonical milestones
  - `events.json` — Chronological canon anchor events with locations, years, and participants
  - `movies.json` — MCU film continuity registry
  - `scenarios.json` — Curated preset nexus points
  - `timelines.json`, `artifacts.json`, `locations.json`, `relationships.json` — Supplemental multiverse continuity data

---

## 📁 Project Structure

```text
What if-PR/
├── backend/
│   ├── routes/
│   │   └── simulate.js              # Simulation REST endpoints & routing
│   ├── services/
│   │   ├── scenarioAnalyzer.js      # Semantic query parser & entity extractor
│   │   ├── storyGenerator.js        # Episodic narrative arc synthesis
│   │   └── timelineEngine.js        # Causal divergence & stability calculator
│   ├── package.json                 # Backend dependencies (Express, CORS)
│   └── server.js                    # Express server entry point (Port 5000)
├── data/
│   ├── artifacts.json               # Relics & items (Infinity Stones, Gauntlet)
│   ├── characters.json              # Canonical MCU character profiles & metadata
│   ├── events.json                  # Canonical MCU timeline events & anchors
│   ├── locations.json               # Key cosmic & terrestrial locations
│   ├── movies.json                  # MCU movie registry
│   ├── relationships.json           # Character dynamics & alliances
│   ├── scenarios.json               # Curated multiverse preset scenarios
│   └── timelines.json               # Baseline continuity designations
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CinematicStoryView.jsx  # Episodic story reader & ripple cards
│   │   │   ├── CosmicBackground.jsx    # Animated canvas-free multiverse background
│   │   │   ├── ImpactCard.jsx          # Character shift comparison widget
│   │   │   ├── SimulationLoader.jsx    # Thematic quantum calculation loader
│   │   │   ├── TimelineVisualizer.jsx  # Interactive dual-branch timeline tree
│   │   │   └── WatcherNarrative.jsx    # Ambient observer commentary
│   │   ├── pages/
│   │   │   ├── ObservatoryHome.jsx     # Query console & curated preset selector
│   │   │   └── TimelineResult.jsx      # Result orchestrator & telemetry drawer
│   │   ├── styles/
│   │   │   ├── index.css               # Global baseline typography & resets
│   │   │   ├── observatory.css         # Observatory console & hero styling
│   │   │   ├── timeline.css            # Cinematic story, cards & branch styling
│   │   │   └── variables.css           # Color tokens, glow utilities, gradients
│   │   ├── utils/
│   │   │   └── api.js                  # Frontend fetch wrapper for backend endpoints
│   │   ├── App.jsx                     # Top-level state & view coordinator
│   │   └── main.jsx                    # React 18 DOM mount point
│   ├── index.html                   # HTML entry point with sci-fi typography
│   ├── package.json                 # Frontend dependencies (React, Vite, Lucide)
│   └── vite.config.js               # Vite config with /api proxy to port 5000
├── .gitignore                       # Node, Vite, build & environment exclusions
├── package.json                     # Root orchestrator scripts (install & dev)
└── README.md                        # Project documentation
```

---

## ⚡ Example Scenario

### Scenario: *What if Thor went for the head in Infinity War?*

```text
Query: "What if Thor went for the head in Infinity War?"
Nexus Point: Battle of Wakanda (2018)
Divergent Performer: Thor Odinson (replaces Thanos' Snap)
```

| Factor | MCU Prime (Canon) | This Alternate Timeline |
| :--- | :--- | :--- |
| **The Moment** | Thor strikes Thanos in the chest; Thanos snaps his fingers. | Stormbreaker strikes Thanos' head, slaying him instantly. |
| **The Snap** | Occurs; 50% of universal life turns to dust. | **Cancelled.** The Blip never takes place. |
| **Tony Stark** | Stranded on Titan; sacrifices his life in 2023. | Brought home safely in 2018; lives to raise Morgan in peace. |
| **Vision** | Destroyed as Mind Stone is forcibly extracted. | Repaired and restored by Shuri and Wanda in Wakanda. |
| **Thor** | Suffers 5 years of crippling depression and guilt. | Revered as the triumphant Savior of the Cosmos. |
| **The Twist** | Stones scattered across time and destroyed in 2018. | All six stones remain together on Earth, alerting ancient cosmic entities. |
| **Timeline Stability** | Baseline Prime (100%) | **88%** (Coherent reality branch). |

---

## 🚀 How to Run Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (version **18.0.0** or higher recommended)
- `npm` (bundled with Node.js)

### Option A: Using Root Helper Scripts (Recommended)

1. **Clone or navigate to the repository:**
   ```bash
   cd "What if-PR"
   ```

2. **Install all dependencies (Backend & Frontend):**
   ```bash
   npm run install:all
   ```

3. **Start the Backend Simulation API (Terminal 1):**
   ```bash
   npm run dev:backend
   ```
   *The backend will initialize on `http://localhost:5000`.*

4. **Start the Frontend Development Server (Terminal 2):**
   ```bash
   npm run dev:frontend
   ```
   *The frontend Vite dev server will initialize on `http://localhost:5173`.*

5. **Open your browser and navigate to:**
   ```
   http://localhost:5173
   ```

---

### Option B: Manual Setup (Separate Terminals)

If you prefer running commands directly within each subpackage:

#### 1. Backend Setup
```bash
cd backend
npm install
npm start
```
*Health check endpoint: `http://localhost:5000/api/health`*

#### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*Frontend application: `http://localhost:5173`*

---

## 🔮 Future Improvements

- [ ] **Expanded Knowledge Graph**: Incorporate Phase 4 and Phase 5 characters, Multiverse Saga incursions, and TVA continuity rules.
- [ ] **Hybrid LLM Reasoning Engine**: Integrate an optional generative AI layer (such as the Gemini API) to synthesize novel, unconstrained What-If inquiries alongside the deterministic rule engine.
- [ ] **Multi-Hop Decision Branching**: Enable users to make sequential choices on top of previously simulated alternate branches to explore deeper causal trees.
- [ ] **Audio & Ambient Narration**: Add cinematic sound design and synthesized character voiceovers for episodic story sections.
- [ ] **Shareable Multiverse Permalinks**: Allow users to share simulated timeline configurations with unique URL hash links.

---

## ⚖️ Disclaimer

- **Fan-Made / Educational Project**: This is an independent, fan-created open-source educational and simulation project created purely for demonstration and portfolio purposes.
- **No Affiliation**: This project is **not** affiliated with, endorsed by, sponsored by, or associated with Marvel Entertainment, LLC, Marvel Studios, The Walt Disney Company, or any of their subsidiaries or affiliates.
- **Fictional Alternate Timelines**: All What-If scenarios, ripple effects, stability metrics, and narratives generated by this application are fictional alternate-timeline explorations inspired by comic and cinematic storytelling.
- **Intellectual Property**: All character names, logos, titles, and related indicia are trademarks and copyrighted property of Marvel Entertainment, LLC and/or The Walt Disney Company.

---

## 👤 Author

Developed with passion by **manoarh92**.

- **GitHub**: [@manoarh92](https://github.com/manoarh92)
- **Project**: WHAT IF...? — Marvel Alternate Timeline Simulator

*“Time. Space. Reality. It’s more than a linear path. It’s a prism of endless possibility...”*
