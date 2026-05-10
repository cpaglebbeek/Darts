# CLAUDE.md — Darts Game

## Project

**Naam:** Darts Game
**Type:** Webgame (HTML/CSS/JavaScript, single-file + modulaire variant)
**Auteur:** Christian Glebbeek, iCt Horse
**Copyright:** 2025, alle rechten voorbehouden
**Live URL:** `https://icthorse.nl/Darts/`
**Huidige versie:** v1.19f (Gameplay Fix)
**Oorsprong:** Iteratief ontwikkeld in 80+ versies (darts.html t/m darts81.html)

## Locaties

| Wat | Pad |
|-----|-----|
| Project root | `/Users/christian/Documents/Gemini_Projects/Darts` |
| Alle versies (scraped) | `website/` |
| Modulaire versie (01a) | `website/01a/` |
| Varianten (Dartx, root-level) | `variants/` |
| Live server | `icthorse:domains/icthorse.nl/public_html/Darts/` |

## Versie-historie

Het project is iteratief gebouwd in 80+ opeenvolgende HTML bestanden:
- **v0.10** (darts.html) — Eerste prototype: canvas dartboard overlay, kalibratie, 180 MP3
- **v1.x** (darts14+) — Game setup, multiplayer, scoring
- **v1.19f** (darts81.html) — Nieuwste: volledige gameplay met hold-to-aim, wobble, checkout guide, video celebrations

Zie `VERSION_HISTORY.md` voor volledige versie-evolutie.

## Architectuur

Zie `ARCHITECTURE.md` voor volledige componentenbeschrijving, data flow en relaties.

## Deploy Protocol

Na wijzigingen:
```bash
rsync -avz --delete website/ icthorse:domains/icthorse.nl/public_html/Darts/
```

Gevolgd door LiteSpeed cache purge indien nodig.

## Feature & Bugfix Protocol (Color-Coded)

**Bugfix:**
- **Groen:** Snel herstel (cosmetisch, typo)
- **Geel:** Logisch (scoring, game flow)
- **Rood:** Architectureel (touch handling, rendering pipeline)

**Root Cause Analysis:** Verplicht bij elke bugfix — benoem oorzaak op Functioneel, Technisch en Architectonisch niveau.

## WhatIf Protocol

Geldt hier net als bij alle projecten. Plan → Impact → Akkoord vóór actie.

## Thematische Codenamen

Thema: **Darts Spelers** (PDC/BDO legendes)
- Groen (+0.0.1): Speelronde namen (bijv. "Phil Taylor", "Michael van Gerwen")
- Oranje (+0.1.0): Major tournament namen
- Rood (+1.0.0): World Championship namen
