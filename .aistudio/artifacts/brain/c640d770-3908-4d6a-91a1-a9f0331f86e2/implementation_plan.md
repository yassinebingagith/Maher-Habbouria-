# Velo Reglo — Championship Bicycle & E-Bike Scrollytelling Atelier

An interactive, physics-driven scrollytelling flagship experience for **Velo Reglo** (founded by 10x Tunisian National Champion & 3x Arab Champion **Maher Habouria** in Nabeul, Tunisia). Inspired by the seamless vertical continuity of the *POUR / PLAY* reference film, the site transforms the user's scroll into a continuous mechanical assembly—from **Raw Carbon Frame** to **Custom Drivetrain & E-Motor Build** to **Podium Finish**—culminating in a trilingual (**Français**, **Tunisien Derja**, **English**) interactive repair estimator and direct WhatsApp workshop booking.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> Please review the confirmed architectural choices and the **Custom Asset Production Prompts** in Section 2. Once you approve the plan (or share any custom assets you've generated from the prompts), we will build the full interactive experience.

- **Confirmed Decision 1 — 3-Stage Vertical Scroll Story**: **Raw Carbon Frame → Custom Build (Drivetrain & E-Motor) → Podium Finish**. Just as coffee beans fall from the grinder into the V60 dripper and drip into the cup in the reference video, precision bicycle components (ceramic bearings, gold XX1 Eagle chains, Bosch/Shimano e-bike drive units, and carbon wheelsets) descend vertically across section boundaries to assemble a race-ready machine.
- **Confirmed Decision 2 — Visual Palette & Atmosphere**: **Light Industrial Studio (`#F4F6F9`) with Park Tool Blue (`#0073CF` / `#00A8E8`) and Deep Navy (`#0A1120`) Contrast**. Extracted directly from the Velo Reglo emblem and Maher's Park Tool workshop wall—60% crisp anodized studio light canvas, 30% deep navy structural panels and brushed aluminum dividers, and 10% electric Park Tool cyan/blue and gold-chain accents.
- **Confirmed Decision 3 — Hybrid Asset Pipeline (PNG Cutouts + Scroll-Scrubbed Video)**: The scroll engine supports **both high-resolution transparent PNG layers** (for multi-plane parallax and floating spec cards) and **scroll-scrubbed MP4/WebM video sequences** linked to scroll progress (`currentTime = scrollProgress * duration`), backed by procedural high-precision SVG/Canvas mechanical fallbacks so every frame is razor-sharp immediately.
- **Confirmed Decision 4 — Conversion & Trilingual Experience**: **Interactive Repair & Maintenance Estimator with Direct WhatsApp Booking**, supporting instant switching between **Français** (default), **Tunisien Derja** (authentic Tunisian cycling & workshop vernacular), and **English**.

---

### 1. Overview & Core Concept

- **What It Does**:
  1. **Connected Vertical Scrollytelling**: Translates the exact spatial choreography of the reference coffee film into high-end bicycle engineering across three seamlessly linked viewport chapters.
  2. **Champion Pedigree & Workshop Proof**: Showcases Maher Habouria's credentials (10x National Champion MTB/Road, 3x Arab Champion XCO, Elite Mechanic since 2017 in Nabeul) alongside real workshop reels and telemetry-grade repair standards.
  3. **Interactive Diagnostic & Estimator**: Lets riders select their bike category (Route / Carbon Road, VTT / MTB Cross-Country, Gravel, or E-Bike / Bosch & Shimano Steps), pick service modules or symptoms, view transparent turnaround and pricing tiers, and send a structured diagnostic sheet directly to Velo Reglo's WhatsApp.
- **Target Audience / Persona**: Competitive cyclists, triathlon/road enthusiasts, mountain bikers, and e-bike commuters across Nabeul, Cap Bon, Tunis, and international cycling visitors seeking championship-level mechanical precision.
- **Key Value**: Elevates a local workshop into an international-grade cycling atelier—proving mechanical trust through visual craftsmanship before a rider ever steps into the shop.

---

### 2. User Experience & Visual Design

#### A. Frame-by-Frame Deconstruction of Reference Video (`refernce_516525cc.mp4`) → Velo Reglo Adaptation

| Reference Video Timestamp & Mechanic | Visual Layering in Reference | Velo Reglo Scrollytelling Equivalent |
| :--- | :--- | :--- |
| **00:00–00:01 · Stage 01 (`GRIND`)**<br>Whole beans drop from top into central grinder; giant editorial title sits behind the machine; freshly ground coffee exits the bottom nozzle on scroll. | **Layer 1 (Back)**: Light studio canvas + organic floating 3D forms.<br>**Layer 2 (Mid-Back)**: Giant condensed display word (`GRIND`) spanning viewport width.<br>**Layer 3 (Center)**: Sharp cutout hardware.<br>**Layer 4 (Front)**: Left-aligned editorial number `01`, concise copy, and magnetic dark CTA button. | **Stage 01 · `01. CADRE` (Raw Carbon Frame & Diagnostic)**<br>An ultralight raw carbon frame hangs in a Park Tool prep stand at center screen. As the user scrolls, laser alignment lines scan the frame geometry while a **gold Ti-Nitride chain & ceramic bottom bracket assembly** drops vertically out of the lower frame shell toward Stage 02. |
| **00:02–00:03 · Stage 02 (`POUR`)**<br>Viewport transitions downward into a split color block; falling grounds land directly inside the glass V60 cone while a matte kettle pours from the right; liquid coffee drips out the bottom. | **Split Background**: Left 45% structural color block, right 55% light studio field.<br>**Vertical Hand-off**: Particle stream from Stage 01 lands precisely in Stage 02's focal object.<br>**Bilateral Callouts**: Left primary narrative + right technical micro-note. | **Stage 02 · `02. MÉCANIQUE` (Custom Build & E-Motor Calibration)**<br>Split studio backdrop (Deep Navy `#0A1120` left panel / Anodized Light `#F4F6F9` right field). The descending gold chain & bearings lock onto a **precision 12-speed cassette & open e-bike mid-drive motor** at center. Park Tool torque wrenches calibrate the gears, releasing a **high-velocity rotational energy drop** downward into Stage 03. |
| **00:04–00:05 · Stage 03 (`SIP`)**<br>Falling drop splashes into the ceramic cup; 3 floating glass/tilted specification cards (`Origin`, `Roast`, `Taste`) fan out in 3D space around the cup with interactive pagination dots. | **Impact Reveal**: Vertical drop triggers radial ripple.<br>**Floating Spec Cards**: 3 tilted tactile cards with clean typography hovering in foreground parallax around the central hero object. | **Stage 03 · `03. PODIUM` (Race-Ready Championship Machine)**<br>The descending assembly locks into a **complete, race-prepped Carbon MTB / Road superbike**. Three tilted, tactile specification cards fan out around the bike: **Card 1: Transmission Shimano/SRAM Pro**, **Card 2: Diagnostic E-Bike & Batterie**, **Card 3: Préparation Course (Standard Champion)**. Clicking any card inspects the exact workshop protocol. |
| **00:06–00:07 · Finale (`FIND YOUR CUP`)**<br>Centered bold headline, magnetic dark pill button, and asymmetric 2-column visual showcase cards below. | **Transition to Action**: Moves from kinetic scroll story into structured interactive selection and visual proof. | **Stage 04 · `TROUVEZ VOTRE RÉGLAGE` (Interactive Workshop Estimator & Maher's Atelier)**<br>Transitions into Maher Habouria's Championship Pedigree bento showcase, real Workshop Reels gallery, and the interactive Repair Estimator + WhatsApp Booking engine. |

#### B. Visual Identity, Palette & Typography

- **Aesthetic Direction**: **Swiss-Tunisian Precision Atelier**. Combines the tactile warmth and mechanical authority of a Park Tool master workshop with the kinetic editorial clarity of European cycling marques (BMC, Canyon, Rapha).
- **Color Palette (60-30-10 Rule)**:
  - **60% Dominant Neutral Canvas**:
    - `--bg-studio`: `#F4F6F9` (Anodized Aluminum Light — primary scrollytelling canvas)
    - `--bg-surface`: `#FFFFFF` (Pure workshop bench card surface)
  - **30% Structural Surfaces & Contrast**:
    - `--bg-navy`: `#0A1120` (Velo Reglo Emblem Deep Navy — used for the Stage 02 split panel, Maher's Championship proof section, and tactile primary buttons)
    - `--text-primary`: `#0A1120` (Deep Navy ink)
    - `--text-secondary`: `#475569` (Machined Slate)
    - `--border-hairline`: `rgba(10, 17, 32, 0.09)`
  - **10% High-Intent Accent Budget**:
    - `--accent-park-blue`: `#0073CF` (Authentic Park Tool Blue — primary interactive highlights, precision indicators)
    - `--accent-cyan`: `#00B4D8` (Velo Reglo Logo Electric Cyan — active states, scroll progress filament)
    - `--accent-gold`: `#D97706` (XX1 Gold Chain / Championship Medal accent — strictly for championship credentials and drivetrain highlights)
- **Typography & Hierarchy (The 2+1 Font Rule)**:
  - **Display / Giant Backdrop & Section Titles**: `Barlow Condensed` (Bold 700 / ExtraBold 800) paired with `Syne` for sculpted editorial impact—delivering the tall, athletic European cycling presence required for the giant background words (`CADRE`, `MÉCANIQUE`, `PODIUM`) without clipping.
  - **Body & UI Prose**: `Plus Jakarta Sans` (Regular 400, Medium 500, SemiBold 600) for crisp legibility across French, Latin-script Derja, and English, paired with `Noto Sans Arabic` support when Arabic script terms are displayed.
  - **Technical Specs & Estimator Numerals**: `JetBrains Mono` (`tabular-nums`) strictly for torque values (`5.2 Nm`), cassette ratios (`10-52T`), championship years, and estimator price/time calculations.

#### C. Anti-Slop & High-Craft Button Architecture

To ensure **zero generic AI-slop buttons**, every interactive control uses bespoke mechanical micro-engineering inspired by award-winning creative repositories:
1. **Magnetic Directional Fill Buttons**: Primary CTAs (`#0A1120` Deep Navy background with crisp `#FFFFFF` label) feature a directional liquid-cyan curtain fill (`translate3d` compositor animation in `180ms cubic-bezier(0.16, 1, 0.3, 1)`) and an integrated mechanical arrow housing that shifts `4px` on hover with a subtle gear-tooth rotation.
2. **Tactile Segmented Trilingual & Bike-Type Switchers**: Machined recessed track (`bg-slate-200/80 p-1 rounded-lg`) with a spring-animated active thumb (`layoutId` via Motion) and tabular index markers—no floating candy pills or glowing neon borders.
3. **Top Bar Contract Compliance**:
   - **Zone 1 (Left)**: Extracted SVG emblem + `VELO REGLO` single-line wordmark (`whitespace-nowrap shrink-0`).
   - **Zone 2 (Center)**: 4 single-line navigation links (`L'Atelier`, `Le Processus`, `Le Champion`, `Diagnostic`) + compact `FR / TN / EN` language selector.
   - **Zone 3 (Right)**: 1 primary magnetic CTA (`Prendre RDV`).

#### D. Custom Asset Folder & AI Generation Prompts (For Your Preparation)

You can generate and drop any of these assets into `/public/assets/velo-reglo/`, or share them in chat. We will also build a live **Asset Studio Drawer** (accessible via a subtle workshop calibration button) so you can preview or swap your custom PNGs and videos directly in the browser!

##### 1. Transparent PNG Cutouts (Generate on clean solid white or transparent background, 1:1 or 3:4 aspect ratio)
- **`stage1_carbon_frame.png` (Stage 01 Centerpiece)**
  > **Prompt**: *"Studio product photography of an ultra-modern matte raw carbon fiber road and mountain bicycle frame suspended vertically in a professional blue Park Tool mechanic repair clamp, exposed carbon weave texture, internal cable routing ports visible, dramatic studio rim lighting, crisp shadows, isolated on a pure solid white background, 8k commercial photography, photorealistic."*
- **`stage1_falling_chain_gears.png` (Stage 01 → 02 Vertical Transition Element)**
  > **Prompt**: *"High-speed studio macro photography of a gleaming gold titanium-nitride bicycle chain uncoiling vertically downward alongside precision anodized blue and silver CNC derailleur pulleys and ceramic bearings, dynamic vertical motion, sharp metallic reflections, isolated on a pure solid white background, 8k commercial product shot."*
- **`stage2_drivetrain_emotor.png` (Stage 02 Centerpiece)**
  > **Prompt**: *"Exploded-view studio product photography of a high-end 12-speed gold and gunmetal bicycle cassette mated with a sleek compact e-bike mid-drive motor housing (Bosch Performance Line style) and a blue Park Tool torque wrench engaging the lockring, precision Swiss mechanical aesthetic, isolated on a pure solid white background, 8k resolution."*
- **`stage3_podium_superbike.png` (Stage 03 Centerpiece)**
  > **Prompt**: *"Three-quarter studio hero angle of a championship-winning custom carbon cross-country mountain bike / aero road bike hybrid in deep midnight navy with electric cyan accents and gold chain, deep-section carbon wheels, Tan-wall racing tires, studio floor reflection, isolated on a pure solid white background, 8k commercial photography."*
- **`floating_tools_parallax.png` (Background Parallax Accents — Replaces the coffee beans/blobs in the reference video)**
  > **Prompt**: *"Knolling studio photography of individual precision bicycle components floating at angled perspectives: a blue Park Tool 3-way hex wrench, a gold chain link, a carbon spacer, and a CNC disc brake rotor, soft studio lighting, isolated on a pure solid white background, 8k."*

##### 2. Scroll-Scrubbed Video Prompts (Runway Gen-3 / Kling / Veo / Luma — 5 seconds, 9:16 or 1:1, 60fps)
- **`scroll_transition_1_to_2.mp4` (Frame to Drivetrain Hand-off)**
  > **Video Prompt**: *"Locked-off studio camera on a clean light gray industrial background. Starts on a raw matte carbon bicycle bottom bracket shell; a golden bicycle chain drops smoothly downward through the frame in slow motion as the camera pedestals down to reveal a spinning 12-speed gold cassette and e-bike motor assembly locking into place with a crisp mechanical click. Ultra-clean commercial product cinematography, soft studio lighting."*
- **`scroll_transition_2_to_3.mp4` (Drivetrain to Full Podium Bike Zoom-Out)**
  > **Video Prompt**: *"Smooth continuous camera pull-back from an extreme close-up of a calibrated spinning gold bicycle cassette and blue Park Tool wrench to reveal the entire custom deep-navy and electric-cyan carbon racing bicycle standing proudly on a minimalist studio plinth. Crisp studio lighting, commercial automotive-grade cinematography."*

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1 — Hybrid Scroll Engine (DOM/Motion + HTML5 Canvas/Video Scrubbing)**
  - *Chosen Approach*: Combine `motion/react` scroll-linked transforms (`useScroll`, `useTransform`, `useSpring`) with a dedicated frame-accurate video/canvas scrubber and high-precision vector/cutout layers.
  - *Why*: Pure video files alone cannot render crisp trilingual typography or interactive floating cards (like the 3 tilted cards in Stage 03 `SIP`), whereas pure static HTML lacks the fluid vertical physical hand-off between sections. Combining both mirrors the exact architecture of the *POUR / PLAY* reference video.
  - *Alternatives Considered*: Full WebGL Three.js heavy 3D scene—passed over as the primary dependency because real photographic cutouts + scroll-scrubbed video deliver higher photorealism for Park Tool tools and carbon weaves while maintaining 60fps on mobile devices.
- **Decision 2 — Authentic Trilingual Localization (`FR` / `TN Derja` / `EN`)**
  - *Chosen Approach*: A reactive localization dictionary supporting French (primary commercial language in Tunisia), Tunisian Derja (authentic local cycling expressions such as *"Baskla Reglo 100%"*, *"Révision Kemla"*, *"Moteur E-Bike & Batterie"*, *"Barcha Précision men 3and Champion"*), and English.
  - *Why*: Honors Velo Reglo's local roots in Nabeul ("Velo Reglo, bien reglo") while presenting an international-class interface for expats and foreign cyclists.
- **Decision 3 — Client-Side Diagnostic Estimator + Pre-Formatted WhatsApp Dispatch**
  - *Chosen Approach*: Interactive multi-step configurator that computes estimated workshop time and transparent service scope in real time, then generates a structured, localized WhatsApp message (`https://wa.me/...`) alongside an instant copyable diagnostic ticket.
  - *Why*: As seen on Velo Reglo's Facebook page, WhatsApp is the primary direct communication channel for riders in Nabeul; pre-formatting the bike type, drivetrain symptoms, and requested date removes friction for both Maher and the customer.

---

### 4. Technical Architecture & Data Strategy *(Technical Reference)*

#### Architecture & Component Diagram

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                        VELO REGLO APPLICATION SHELL                          │
│     [Language Context: FR | TN | EN]   [Custom Asset Registry & Loader]      │
└───────────────────┬──────────────────────────────────────┬───────────────────┘
                    │                                      │
                    ▼                                      ▼
┌───────────────────────────────────────┐  ┌───────────────────────────────────┐
│      STICKY 3-ZONE TOP BAR            │  │   CUSTOM ASSET STUDIO DRAWER      │
│  • Extracted SVG Velo Reglo Emblem    │  │  • Live preview of user PNG/MP4   │
│  • Single-line Nav + FR/TN/EN Switch  │  │  • Copy-paste AI Prompt Cards     │
│  • Magnetic "Prendre RDV" CTA         │  │  • Drag & Drop local file tester  │
└───────────────────┬───────────────────┘  └───────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│            CONNECTED 3-STAGE SCROLLYTELLING VIEWPORT ENGINE                  │
│          (useScroll + Spring Physics + Video/Canvas Frame Scrubber)          │
├──────────────────────────────────────────────────────────────────────────────┤
│  STAGE 01: CADRE BRUT (Raw Carbon Frame & Laser Geometry Check)              │
│   ├── Giant Backdrop Typography ("CADRE" / "FRAME")                          │
│   ├── Central Suspended Carbon Frame Layer + Park Tool Clamp                 │
│   └── Vertical Hand-Off Particle: Descending Gold Chain & Ceramic Bearings   │
│                              │ (Seamless Scroll Crossing)                    │
│                              ▼                                               │
│  STAGE 02: MÉCANIQUE & E-MOTOR (Split Navy/Light Studio Backdrop)            │
│   ├── Giant Backdrop Typography ("MÉCANIQUE" / "BUILD")                      │
│   ├── Central 12-Speed Cassette + Bosch/Shimano E-Motor Calibration          │
│   ├── Bilateral Technical Spec Callouts (Torque Nm & Ultrasonic Bath)        │
│   └── Vertical Hand-Off: Rotational Torque Impulse into Stage 03             │
│                              │ (Seamless Scroll Crossing)                    │
│                              ▼                                               │
│  STAGE 03: FINITION PODIUM (Championship Superbike + 3 Tilted Spec Cards)    │
│   ├── Giant Backdrop Typography ("PODIUM" / "FINISH")                        │
│   ├── Central Assembled Race Bike + Radial Studio Plinth                     │
│   └── 3 Interactive Tilted Cards (Transmission, E-Bike Diag, Race Prep)      │
└──────────────────────────────┬───────────────────────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│            PROOF & CONVERSION SECTIONS (BELOW SCROLL STORY)                  │
├──────────────────────────────────────┬───────────────────────────────────────┤
│  MAHER HABOURIA CHAMPION BENTO       │  INTERACTIVE REPAIR ESTIMATOR         │
│  • 10x National & 3x Arab Champion   │  • Bike Selector (Road/MTB/Gravel/E)  │
│  • Park Tool Master Wall Showcase    │  • Service & Symptom Toggles          │
│  • Curated Workshop Reels Grid       │  • Live Turnaround & Tier Calculation │
│    (BMC, Canyon, Orbea, Gold XX1)    │  • Direct WhatsApp + Ticket Generator │
└──────────────────────────────────────┴───────────────────────────────────────┘
```

#### Data Model & State

- **`LanguageState` (`'fr' | 'tn' | 'en'`)**: Drives all headlines, giant background scrollytelling words, technical callouts, Maher's biography, and the WhatsApp booking template.
- **`ScrollProgressState`**:
  - `globalScrollYProgress` (`0` to `1` across the 300vh pinned/connected scrollytelling container).
  - Stage interpolation curves controlling:
    - Vertical Y-translation and rotation of the connecting mechanical elements (Chain/Bearings from `0.15` to `0.45`, Torque/Wheel assembly from `0.50` to `0.80`).
    - Background split-curtain wipe in Stage 02.
    - 3D fan-out (`rotateZ`, `translateX`, `translateY`, `opacity`) of the 3 floating inspection cards in Stage 03.
- **`EstimatorState`**:
  - `bikeCategory`: `'road' | 'mtb' | 'gravel' | 'ebike'`
  - `selectedServices`: Array of modular workshop operations (`complete_overhaul`, `drivetrain_ultrasonic`, `hydraulic_bleed`, `ebike_diagnostics`, `suspension_service`, `custom_wheel_true`).
  - `urgencyLevel`: `'standard' | 'race_prep'`
  - `riderNotes` & `bikeBrand` (e.g., BMC, Canyon, Orbea, Trek, Specialized).
- **`AssetOverrideState`**: Allows hot-swapping any of the 3 stage centerpieces or transition videos via local file upload/URL or `/public/assets/velo-reglo/` paths so the user can immediately test newly generated AI assets.

#### Interactive Component & State Mapping

- **Stage 03 Floating Spec Cards**: Clicking any of the 3 tilted cards around the bike (`01. Transmission Ultrasonic`, `02. Firmware & Moteur E-Bike`, `03. Réglage Podium`) opens a detailed technical inspection drawer showing the exact Park Tool tolerances and pre-selects that package in the Repair Estimator below.
- **Workshop Reels Showcase**: Filterable grid (`Tout`, `VTT / MTB`, `Route / Carbon`, `E-Bike`) modeled after Velo Reglo's real workshop work (gold XX1 cassettes, BMC/Canyon builds, internal e-bike motor planetary gears) with interactive before/after mechanical notes.
- **Interactive Repair Estimator & WhatsApp Dispatch**: Validates bike selection and rider contact details, calculates estimated workshop duration (in hours/days) and transparent service breakdown using tabular numerals, and triggers a one-click WhatsApp link (`wa.me`) pre-populated in the user's active language (`FR`, `TN`, or `EN`).
