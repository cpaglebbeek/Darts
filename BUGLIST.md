# BUGLIST.md — Darts Game

**Retrospectieve bug-analyse over 80+ versies (v0.10 t/m v1.19f)**
**Datum:** 10 mei 2026
**Totaal:** 62 bugs | 51 opgelost | 11 open

---

## Samenvatting per categorie

| Categorie | Opgelost | Open | Totaal |
|-----------|----------|------|--------|
| Crash bugs | 8 | 1 | 9 |
| Scoring/Checkout bugs | 4 | 1 | 5 |
| Rendering/UI bugs | 14 | 4 | 18 |
| Audio/Video bugs | 5 | 0 | 5 |
| Input/Aim/Wobble bugs | 9 | 0 | 9 |
| Game flow bugs | 4 | 1 | 5 |
| Calibratie bugs | 3 | 1 | 4 |
| Responsive/Mobile bugs | 4 | 1 | 5 |
| Code quality | 0 | 2 | 2 |
| **Totaal** | **51** | **11** | **62** |

---

## OPEN BUGS (11)

### BUG-009 — whoosh() geluid nooit hersteld
- **Categorie:** Audio
- **Geintroduceerd:** v0.13
- **Beschrijving:** De `whoosh()` functie (werpgeluid) werd verwijderd bij de overgang naar physics-based throwing in v0.13. Na terugkeer naar direct aim in v0.14+ is het whoosh-geluid nooit hersteld. Alleen `thunk()` (landing) bleef.
- **Impact:** Laag — cosmetisch, geen gameplay impact

### BUG-015 — Comma-operator in scoreAtCanvas
- **Categorie:** Code quality
- **Geintroduceerd:** v0.17
- **Beschrijving:** `mult=0, label='Miss'` gebruikt comma-operator i.p.v. semicolon. Functioneel correct maar syntactisch verwarrend.
- **Impact:** Geen — puur code quality

### BUG-107 — Alle darts gewist bij volgende beurt
- **Categorie:** Game flow
- **Geintroduceerd:** v0.23
- **Beschrijving:** Bij `nextTurn()` wordt `state.allDarts = []` uitgevoerd. In multiplayer verdwijnen alle pijlen van vorige beurten. Waarschijnlijk bewuste keuze.
- **Impact:** Laag — cosmetisch, mogelijk bewust

### BUG-108 / BUG-217 / BUG-218 — CSS duplicate display op popups
- **Categorie:** Rendering (CSS)
- **Geintroduceerd:** v0.19 / v1.0c
- **Beschrijving:** Video popups en popup overlays hebben `display: none;` gevolgd door `display: grid;` in CSS. De tweede overschrijft de eerste. Workaround: inline `style="display:none;"` in HTML. CSS zelf is contradictoir.
- **Impact:** Geen runtime impact — geworkaround, maar verwarrend bij refactoring

### BUG-116 — Typo "iCt Hrose" in copyright meta-tag
- **Categorie:** Code quality
- **Geintroduceerd:** v1.0d
- **Beschrijving:** `<meta name="author" content="Christian Glebbeek, iCt Hrose">` — moet "iCt Horse" zijn. Aanwezig in alle versies v1.0d+.
- **Impact:** Laag — alleen zichtbaar in page source

### BUG-219 — Kalibratie paneel toggle verloren
- **Categorie:** Calibratie
- **Geintroduceerd:** v1.19e
- **Beschrijving:** De `toggleCtrlPanel()` functie is versimpeld: paneel kan geopend worden maar niet via dezelfde knop gesloten. `btnHideCtrl` in het paneel werkt mogelijk nog.
- **Impact:** Medium — kalibratie-workflow verstoord

### BUG-220 — bgFile input element ontbreekt in HTML
- **Categorie:** UI
- **Geintroduceerd:** v1.11c
- **Beschrijving:** Het `<input id="bgFile" type="file">` element is verwijderd bij een layout refactor, maar JavaScript verwijst er mogelijk nog naar. De "Kies achtergrond" knop werkt mogelijk niet meer.
- **Impact:** Medium — achtergrond-upload feature kapot

### BUG-221 — Near miss detectie mist outer bull
- **Categorie:** Scoring
- **Geintroduceerd:** v1.1c
- **Beschrijving:** Near miss detectie kijkt alleen of een single-ring worp dichtbij triple/double valt. Een worp net buiten de outer bull ring wordt niet als near miss gedetecteerd.
- **Impact:** Laag — edge case in near miss feature

### BUG-222 — Scoreboard hidden-by-mouse state conflict na popup
- **Categorie:** Responsive/Mobile
- **Geintroduceerd:** v1.19c+
- **Beschrijving:** Na het sluiten van een popup kan het scoreboard in een mixed state komen: CSS class verwijderd maar opacity nog op 0.2. Edge case bij specifieke muispositie.
- **Impact:** Laag — zeldzame edge case

---

## OPGELOSTE BUGS — Proto-fase (v0.10 — v0.22)

### BUG-001 — Rotatie kalibratie knop +0.5 deed +5.0
- **Opgelost:** v0.10 | **Categorie:** Calibratie
- **Fix:** Waarde gecorrigeerd van 5.0 naar 0.5

### BUG-002 — Base64-embedded audio maakte bestand enorm
- **Opgelost:** v0.10 | **Categorie:** Audio/Performance
- **Fix:** Vervangen door `fetch('Best Dart 180 Voice.mp3')`

### BUG-003 — Achtergrond-scaling 'cover' sneed bord af
- **Opgelost:** v0.11 | **Categorie:** Rendering
- **Fix:** Herschreven van `computeCover()` naar `computeContain()` met letterboxing

### BUG-004 — Geen visuele feedback bij 180 score
- **Opgelost:** v0.11 | **Categorie:** Rendering
- **Fix:** `draw180Banner()` toegevoegd met fade-in/fade-out animatie (3 sec)

### BUG-005 — 180 banner bleef hangen na nieuwe beurt
- **Opgelost:** v0.11 | **Categorie:** Rendering
- **Fix:** `state.show180 = 0` in "Nieuwe beurt" handler

### BUG-006 — Standaard achtergrondbestand heette 'background.jpg' i.p.v. 'dartboard.jpg'
- **Opgelost:** v0.12 | **Categorie:** Configuratie
- **Fix:** `img.src = 'dartboard.jpg'`

### BUG-007 — CSS typo `align:items-center`
- **Opgelost:** v0.13 | **Categorie:** Rendering (CSS)
- **Fix:** Gecorrigeerd naar `align-items:center`

### BUG-008 — Physics-based throw hitdetectie onnauwkeurig
- **Opgelost:** v0.14 | **Categorie:** Scoring/Input
- **Fix:** Heel physics-systeem verwijderd, terug naar direct aim. Score op exact mikpunt.

### BUG-010 — ReferenceError 'finger is not defined' (CRASH)
- **Opgelost:** v0.15 | **Categorie:** Crash
- **Fix:** `finger` lambda bovenaan `drawHandCursor()` gedefinieerd

### BUG-011 — Score-positie niet pixel-perfect met cursor
- **Opgelost:** v0.16 | **Categorie:** Scoring/Input
- **Fix:** `state.aim` object met exacte tip-positie berekening via rotatie-wiskunde

### BUG-012 — Rechtermuisknop triggerde worp
- **Opgelost:** v0.16 | **Categorie:** Input
- **Fix:** `if (e.button !== 0) return;` — alleen linkermuisknop

### BUG-013 — Accidentele worpen door korte klikken
- **Opgelost:** v0.17 | **Categorie:** Input
- **Fix:** `MIN_HOLD_TIME_MS = 100` — worpen korter dan 100ms genegeerd

### BUG-014 — Pijl ankerpunt op midden i.p.v. tip
- **Opgelost:** v0.18 | **Categorie:** Rendering
- **Fix:** `ctx.translate(-40*s, 0)` — punt op oorspronkelijke (x,y) positie

### BUG-016 — Video popup CSS conflict (display:none vs display:grid)
- **Opgelost:** v0.19 (workaround) | **Categorie:** Rendering (CSS)
- **Fix:** Inline `style="display:none;"` op HTML-element

### BUG-017 — Alle pijlen hadden dezelfde eindhoek
- **Opgelost:** v0.19, verfijnd v0.21/v0.22 | **Categorie:** Rendering
- **Fix:** Willekeurige wobble op eindhoek, later arc-gebaseerd

### BUG-018 — Vlieghoek per-frame herberekend (inefficient)
- **Opgelost:** v0.19 | **Categorie:** Rendering
- **Fix:** Hoek eenmaal berekend bij `throwDartAt()` en opgeslagen als `d.ang`

### BUG-019 — Pijlen vlogen in rechte lijn (onrealistisch)
- **Opgelost:** v0.21 | **Categorie:** Rendering
- **Fix:** Sinusgolf-boog met willekeurige booghoogte

### BUG-020 — Standaard kalibratie-waarden klopten niet met dartboard.jpg
- **Opgelost:** v0.20 | **Categorie:** Calibratie
- **Fix:** defaultCal bijgewerkt naar `{ cx:518.0, cy:518.0, R_do:401.52 }`

### BUG-021 — Pijl-visueel onrealistisch (simpele vormen)
- **Opgelost:** v0.20 | **Categorie:** Rendering
- **Fix:** Volledige herschrijving met messing barrel, zwarte tip, gekleurde flights

### BUG-022 — Duplicaat easeOutCubic functie-definitie
- **Opgelost:** v0.11 | **Categorie:** Code quality
- **Fix:** Duplicaat verwijderd

---

## OPGELOSTE BUGS — Game-fase vroeg (v0.23 — v1.10c)

### BUG-100 — Crash: btnTest180 null reference
- **Opgelost:** v0.28-fix | **Categorie:** Crash
- **Fix:** Verwijderde knop-referentie uit JavaScript

### BUG-101 — Crash: btnNextTurn listener op verwijderd element
- **Opgelost:** v0.29-fix | **Categorie:** Crash
- **Fix:** Overbodige event listener verwijderd

### BUG-102 — 180 video en beurt-popup overlappen
- **Opgelost:** v0.30 | **Categorie:** Game flow
- **Fix:** 180 video speelt eerst volledig af, dan beurt-popup

### BUG-103 — Oefenmodus telde op i.p.v. af
- **Opgelost:** v0.29 | **Categorie:** Scoring
- **Fix:** Oefenmodus gewijzigd naar aftellen (301/501)

### BUG-104 — Bullseye (50) telde niet als geldige double-out
- **Opgelost:** v1.2c | **Categorie:** Scoring (ERNSTIG)
- **Fix:** Win-conditie uitgebreid: `ring === 'double' || ring === 'bull'`

### BUG-105 — Checkout guide lege string bij bogey scores
- **Opgelost:** v0.28 | **Categorie:** UI
- **Fix:** Return-waarde gewijzigd naar `"---"`

### BUG-106 — Meer dan 3 pijlen per beurt mogelijk
- **Opgelost:** v0.24 | **Categorie:** Game flow
- **Fix:** Guard `state.turnDarts.length >= 3` in throwDartAt()

### BUG-109 — Undo na bust correct geimplementeerd
- **Opgelost:** v1.0c | **Categorie:** Game flow
- **Fix:** Correct bij introductie — score-herberekening bij undo na bust

### BUG-110 — Near-miss video te vaak afgespeeld
- **Opgelost:** v1.5c | **Categorie:** Audio/Video
- **Fix:** Alleen afspelen als speler in finish-positie

### BUG-111 — Scoreboard hide miste client-coordinaten
- **Opgelost:** v1.10c | **Categorie:** UI
- **Fix:** `state.mouse.clientX/clientY` expliciet opgeslagen

### BUG-112 — Crash in v1.10c responsive UI refactor
- **Opgelost:** v1.10c-fix | **Categorie:** Crash
- **Fix:** Layout vereenvoudigd/gecorrigeerd

### BUG-113 — Checkout guide verborgen in oefenmodus
- **Opgelost:** v1.0c | **Categorie:** UI
- **Fix:** Checkout guide ook in oefenmodus tonen

### BUG-114 — Near-miss video hardcoded naar 1 bestand
- **Opgelost:** v1.5c | **Categorie:** Audio/Video
- **Fix:** Dynamisch media-scan systeem met shuffle deck

### BUG-115 — 180 video hardcoded naar 2 bestanden
- **Opgelost:** v1.5c | **Categorie:** Audio/Video
- **Fix:** Dynamisch media-scan systeem met shuffle deck

---

## OPGELOSTE BUGS — Game-fase laat (v1.11c — v1.19f)

### BUG-200 — Vastzittende klik/holding-state niet gereset
- **Opgelost:** v1.11c | **Categorie:** Input
- **Fix:** Globale `window` pointerup/pointerleave listeners

### BUG-201 — Game loop crash: ontbrekende requestAnimationFrame
- **Opgelost:** v1.11c | **Categorie:** Crash
- **Fix:** `requestAnimationFrame(loop)` teruggeplaatst in `startGame()`

### BUG-202 — Versienummer crash: getElementById op verborgen element
- **Opgelost:** v1.13c | **Categorie:** Crash
- **Fix:** Versienummer pas zetten nadat `#wrap` zichtbaar is

### BUG-203 — Scoreboard layout breekt op mobiel (10 versies nodig!)
- **Opgelost:** v1.14c | **Categorie:** Responsive
- **Fix:** Scoreboard definitief `position: fixed` met media queries. Kostte darts33-49.

### BUG-204 — Knoppen niet gekoppeld na layout refactor
- **Opgelost:** v1.13c | **Categorie:** Crash
- **Fix:** Knoppen-koppeling verplaatst naar `startGame()` na `wrapEl.style.display = 'grid'`

### BUG-205 — Turn Summary popup crash bij ontbrekende elementen
- **Opgelost:** v1.14c | **Categorie:** Crash
- **Fix:** Popup-elementen correct geinitialiseerd, robuustere functie

### BUG-206 — Wobble aim state niet uitgebreid
- **Opgelost:** v1.15c | **Categorie:** Wobble/Aim
- **Fix:** Aim-state uitgebreid met lastMouseX/lastMouseY, wobble herschreven

### BUG-207 — Wobble actief wanneer muis niet ingedrukt
- **Opgelost:** v1.18c | **Categorie:** Wobble/Aim
- **Fix:** Wobble alleen bij `state.mouse.holding === true`

### BUG-208 — Scoreboard verbergt in oefenmodus
- **Opgelost:** v1.16c | **Categorie:** UI
- **Fix:** Check op `state.scorekeeperMode` — scoreboard fade uitzetten

### BUG-209 — Touch scope kleur omgewisseld (groen/rood)
- **Opgelost:** v1.17c | **Categorie:** Mobile
- **Fix:** Rood = niet mikken, Groen = actief mikken

### BUG-210 — Mobile scoreboard toont met header (onafhankelijk)
- **Opgelost:** v1.17c | **Categorie:** Responsive
- **Fix:** Aparte logica, gekoppeld aan positie op bord

### BUG-211 — Scope te klein op mobiel
- **Opgelost:** v1.18c | **Categorie:** Mobile
- **Fix:** Scope grootte 3x op mobiele apparaten

### BUG-212 — Worpen buiten bord mogelijk op mobiel
- **Opgelost:** v1.19f | **Categorie:** Gameplay
- **Fix:** Worp geannuleerd als `scoreData.dist > MAX_THROW_DIST` in pointerup

### BUG-213 — Scoreboard fade identiek mobiel/desktop
- **Opgelost:** v1.19f | **Categorie:** Responsive
- **Fix:** Split logica — mobiel: doubleOut grens, desktop: MAX_THROW_DIST met opacity fade

### BUG-214 — Fullscreen bij start niet automatisch
- **Opgelost:** v1.19e | **Categorie:** UI
- **Fix:** Fullscreen request direct na user gesture, wrap in try/catch

### BUG-215 — Rode miss-grensring ontbreekt in overlay
- **Opgelost:** v1.19e | **Categorie:** UI
- **Fix:** Rode ring getekend met `ctx.arc(cx,cy,R*MAX_THROW_DIST,...)`

### BUG-216 — Desktop scoreboard verbergt niet bij mikken buiten ring
- **Opgelost:** v1.19f | **Categorie:** UI
- **Fix:** Scoreboard opacity fade naar 0.2 buiten MAX_THROW_DIST

---

## Bug-patronen

### Meest voorkomende root causes:
1. **DOM referentie naar verwijderd element** (BUG-100, 101, 202, 204) — 4 crashes
2. **Responsive layout refactor breekt bestaande functionaliteit** (BUG-112, 203, 210, 213) — kostte 15+ versies
3. **Feature toegevoegd zonder edge cases** (BUG-104, 106, 110, 208) — bullseye double-out was ernstigst
4. **CSS specificiteit/cascade fouten** (BUG-007, 016, 108/217/218) — duplicate display values

### Versies met meeste fixes:
| Versie | Fixes |
|--------|-------|
| v0.11 (darts2) | 4 bugs opgelost |
| v1.5c (darts28) | 3 bugs opgelost |
| v1.19f (darts81) | 3 bugs opgelost |
| v0.16 (darts7) | 2 bugs opgelost |
| v0.19 (darts10) | 3 bugs opgelost |

### Ernstigste bugs (gameplay impact):
1. **BUG-104** — Bullseye niet als double-out (13 versies fout, v0.23-v1.1c)
2. **BUG-008** — Physics hitdetectie onnauwkeurig (scoring klopte niet)
3. **BUG-106** — Meer dan 3 pijlen per beurt mogelijk
4. **BUG-010** — finger is not defined crash (hele game loop down)
5. **BUG-201** — requestAnimationFrame verwijderd (zwart scherm)
