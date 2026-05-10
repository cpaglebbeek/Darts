# ARCHITECTURE.md — Darts Game

## Overzicht

Een browser-based darts game gebouwd als single-page HTML/CSS/JS applicatie. Spelers gooien darts op een dartboard via een canvas-gebaseerd mikken-en-loslaten mechanisme. De game ondersteunt meerdere spelmodi, 1-4 spelers, en uitgebreide audiovisuele feedback.

## Component Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                     Darts Game v1.19f                         │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────┐    ┌──────────────┐    ┌────────────────┐  │
│  │  Game Setup  │───▶│  Game Engine  │───▶│  Win/Turn      │  │
│  │  Screen      │    │  (Canvas)     │    │  Popups        │  │
│  └─────────────┘    └──────┬───────┘    └────────────────┘  │
│                            │                                 │
│          ┌─────────────────┼─────────────────┐              │
│          ▼                 ▼                  ▼              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  Scoring     │  │  Rendering   │  │  Audio/Video     │  │
│  │  Engine      │  │  Pipeline    │  │  Reward System   │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  Calibration │  │  Scoreboard  │  │  Input Handler   │  │
│  │  Panel       │  │  (Nixie)     │  │  (Mouse/Touch)   │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## Componenten

### 1. Game Setup Screen (`#gameSetup`)
- **Functie:** Spelconfiguratie vóór start
- **Opties:**
  - Speltype: 301, 501, Rotatie 301, Rotatie 501, Oefenen (301), Oefenen (501)
  - Aantal spelers: 1-4
  - Spelernamen (optioneel)
- **Transitie:** Na "Start Spel" → verberg setup, toon `#wrap` (game view)

### 2. Game Engine (Canvas `#canvas`)
- **Functie:** Hoofdcanvas voor dartboard rendering en dart-animaties
- **Technologie:** HTML5 Canvas 2D (`getContext('2d')`)
- **DPR-aware:** Schaalt met `devicePixelRatio` (max 2.5)
- **Rendering loop:** `requestAnimationFrame` voor 60fps
- **Achtergrond:** `dartboard.jpg` als foto (object-fit: contain), met optionele overlay

### 3. Scoring Engine
- **PDC dartboard layout:** 20 sectoren in standaard PDC volgorde: `[20,1,18,4,13,6,10,15,2,17,3,19,7,16,8,11,14,9,12,5]`
- **Ring ratios** (genormaliseerd op double-out radius):
  - Bull: 6.35/170
  - Outer Bull: 15.9/170
  - Triple inner: 99/170
  - Triple outer: 107/170
  - Double inner: 162/170
  - Double outer: 1.0
- **Scoring:** `scoreAtCanvas(x,y)` berekent ring, sector, multiplier, label
- **Near miss detectie:** Tolerance 0.015 radius units voor triple/double rand
- **Checkout guide:** Volledige lookup tabel voor scores 2-170 (PDC standaard checkouts)
- **Bogey scores:** [169, 168, 166, 165, 163, 162, 159] (niet uit te gooien)

### 4. Input Handler
- **Mik-mechanisme:** Hold linkermuisknop → mik → laat los om te gooien
- **Minimum hold tijd:** 100ms (voorkomt accidentele worpen)
- **Wobble:** Aimpoint beweegt met amplitude inversief aan stabiliteit
  - `MAX_WOBBLE_AMPLITUDE`: 8 * DPR pixels
  - `STABILITY_GAIN_RATE`: 0.5 (hoe langer je stilhoudt, hoe stabieler)
  - `GREEN_LIGHT_TIMEOUT`: 10 sec (maximale stabiele miktijd)
- **Touch toggle:** Kan touch-input aan/uit zetten
- **Max throw distance:** 1.05 × bord-radius (iets buiten het bord)

### 5. Rendering Pipeline
- **Achtergrond:** `dartboard.jpg` in contain-modus (met letter/pillarboxing)
- **Overlay:** Optionele doorschijnende PDC-grid overlay (ringen, sectorlijnen, cijfers)
- **Darts:** Gedetailleerd vector-getekende darts met:
  - Puntig uiteinde (point)
  - Gouden barrel
  - Zwart shaft
  - Gekleurde flights (per speler: rood/blauw/goud/groen)
- **Vlieganimatie:** Paraboolbaan met `easeOutCubic`, arc hoogte randomized
- **Dart sticking:** Na landing blijven darts zichtbaar op het bord

### 6. Scoreboard (`#scoreboard`)
- **Stijl:** Nixie tube look (DSEG7 Classic monospace font, oranje glow)
- **Per speler sectie:** Score, beurt-score, darts remaining, checkout guide
- **Active player:** Gekleurde border + glow
- **Dart throws:** Per-pijl details (Pijl 1/2/3)
- **Manual entry:** In scorekeeper-modus: handmatige score input
- **Responsive:** Desktop (fixed rechts) / Mobiel (full-width top, auto-hide)

### 7. Calibration Panel (`#ctrl`)
- **Functie:** Overlay afstemmen op fysieke dartboard-foto
- **Parameters:**
  - Rotatie (stappen: ±5° en ±0.5°)
  - Center X/Y (stappen: ±20px en ±2px)
  - Radius (stappen: ±2% en ±0.2%)
- **Persistentie:** `localStorage` key `darts-v05-cal`
- **Hold-to-repeat:** Knoppen herhalen bij ingedrukt houden (80ms interval)

### 8. Audio/Video Reward System
- **180 celebration:** Random MP3 uit deck + video popup
- **Near miss:** Video popup bij bijna-triple/double
- **Tops (double):** Video popup bij double hit
- **Triple:** Video popup bij triple hit
- **Deck shuffling:** Voorkomt herhalingen (speelt alle varianten voordat ze worden hergebruikt)
- **Media bestanden:** Automatisch ontdekt via HEAD requests (`180_audio1.mp3`, `180_video1.mp4`, etc.)
- **Muziekspeler:** Achtergrondmuziek (loop)

### 9. Game Flow

```
Setup → Playing → (Turn: 3 darts max)
                      │
                      ├── Score geldig → Aftrekken van speler-score
                      │     ├── Score = 0 → WIN popup
                      │     ├── Score < 2 → BUST (beurt ongeldig, score terugzetten)
                      │     └── Score ≥ 2 → Volgende dart of beurt
                      │
                      ├── Bust → Score terugzetten naar begin-beurt waarde
                      │
                      └── Turn popup → Samenvatting → Volgende speler
```

### 10. Game Modi

| Modus | Start Score | Speciaal |
|-------|-------------|----------|
| 301 | 301 | Standaard double-out |
| 501 | 501 | Standaard double-out |
| Rotatie 301 | 301 | Bord draait 90° na elke worp |
| Rotatie 501 | 501 | Bord draait 90° na elke worp |
| Oefenen (301) | 301 | Scorekeeper mode (handmatige invoer) |
| Oefenen (501) | 501 | Scorekeeper mode (handmatige invoer) |

### 11. UI Features
- **Fullscreen:** Via Fullscreen API
- **Auto-hide header:** Verdwijnt als muis niet bovenin scherm is
- **Auto-hide scoreboard:** Desktop: verdwijnt als muis binnen bord is; Mobiel: verdwijnt als muis op bord, verschijnt buiten bord
- **Undo:** Laatste dart ongedaan maken
- **End Game / New Game:** Via knoppen en popups
- **Turn timer:** 90 seconden per beurt (configureerbaar)

## Data Flow

```
Gebruiker → pointerdown (start aim)
         → pointermove (wobble berekening)
         → pointerup (gooi dart)
              │
              ▼
         throwDartAt(tx, ty)
              │
              ▼
         Flight animatie (parabool, 400ms)
              │
              ▼
         scoreAtCanvas(x, y)
              │
              ├── Ring bepaling (bull/outer/single/double/triple/miss)
              ├── Sector bepaling (PDC volgorde + rotatie)
              ├── Near miss check
              │
              ▼
         checkGameLogic(result)
              │
              ├── Score aftrekken
              ├── Bust check (score < 2 of score = 1)
              ├── Win check (score = 0)
              ├── Reward triggers (180, near miss, tops, triple)
              │
              ▼
         refreshScoreboard()
              │
              ▼
         Turn popup (na 3 darts of bust/win)
```

## Technische Details

### Afhankelijkheden
- **Geen externe libraries** — puur vanilla HTML/CSS/JS
- **DSEG7 Classic font** — voor nixie tube scoreboard (WOFF)
- **Media bestanden** — MP3 (audio), MP4 (video), JPG (dartboard)

### Browser Support
- Moderne browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive (auto-detectie touch/desktop)
- Fullscreen API
- Web Audio API (synthesized + buffered audio)
- Pointer Events API

### Persistentie
- `localStorage` voor calibratie settings
- Geen server-side state

## Bestandsstructuur

```
Darts/
├── website/               # Alle versies (scraped van icthorse.nl)
│   ├── darts.html         # v0.10 — eerste prototype
│   ├── darts2.html        # iteraties...
│   ├── ...
│   ├── darts81.html       # v1.19f — nieuwste versie
│   ├── dartboard.jpg      # Dartboard foto
│   ├── 180_audio1.mp3     # 180 celebration audio
│   ├── 180_audio2.mp3
│   ├── 180_video1.mp4     # 180 celebration video
│   ├── 180_video2.mp4
│   ├── near_miss1.mp4     # Near miss video
│   ├── video_tops1.mp4    # Tops (double) video
│   ├── video_triple1.mp4  # Triple video
│   └── 01a/               # Modulaire versie
│       ├── index.html      # Entry point
│       ├── setup.js        # Game setup logica
│       ├── spel.js         # Game engine
│       ├── spel.html       # Game view template
│       └── style.css       # Styling
├── variants/              # Varianten buiten Darts/
│   ├── Dartx/             # Dartx variant
│   ├── root_darts19.html  # Root-level versies
│   ├── root_darts58.html
│   ├── root_darts71.html
│   ├── public_darts57.html
│   └── public_darts67.html
├── CLAUDE.md
├── ARCHITECTURE.md
└── VERSION_HISTORY.md
```

## Relaties met andere projecten

| Project | Relatie |
|---------|---------|
| iCt Horse (icthorse.nl) | Hosting platform — game draait op icthorse.nl/Darts/ |
| Meta_Master | Projectregistratie, sync protocol |
