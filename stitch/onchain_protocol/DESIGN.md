# Design System: Multi-Chain Developer Experience

## 1. Overview & Creative North Star

### Creative North Star: "The Digital Curator"
This design system moves away from the "utility dashboard" aesthetic and toward a "High-End Editorial" experience. The goal is to treat blockchain interactions not as messy data points, but as curated events within a premium environment. 

The system achieves this through **Atmospheric Depth**. By utilizing high-contrast typography scales (Inter) and intentional asymmetry, we break the rigid "box-on-box" layout typical of developer tools. We lean into the void of `surface: #131313`, using it as a canvas where information is revealed through light, tonal layering, and sophisticated glassmorphism rather than structural lines.

---

## 2. Colors

### The Foundation
The palette is built on deep blacks and evolving greys to create a sense of infinite space.

*   **Primary Background:** `surface: #131313`
*   **Surface Tiers:** 
    *   `surface-container-lowest: #0E0E0E` (Inset areas, terminal backgrounds)
    *   `surface-container: #202020` (Standard cards)
    *   `surface-container-high: #2A2A2A` (Hover states and active highlights)
*   **Neutral Content:** `on-surface: #E5E2E1`, `on-surface-variant: #C5C4DB` (Subtle secondary text)

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders for sectioning. Boundaries must be defined solely through background color shifts. A `surface-container` section should sit on a `surface` background to create a natural edge. This creates a "monolithic" feel that looks custom-engineered.

### Multi-Chain Adaptive Tokens
The system adapts its accent profile based on the active chain.

| Element | **Base (Default)** | **Celo (Optimistic)** | **Optimism (High-Energy)** | **Arbitrum (Technical)** |
| :--- | :--- | :--- | :--- | :--- |
| **Accent Primary** | `#0000FF` | `#35D07F` (Prosperity) | `#FF0421` | `#28A0F0` |
| **Accent Glow** | `rgba(0,0,255,0.1)` | `rgba(53,208,127,0.1)` | `rgba(255,4,33,0.1)` | `rgba(40,160,240,0.1)` |
| **CTA Fill** | `primary_container` | `Custom: Celo Gold` | `primary: #FF0421` | `tertiary: #A4C9FF` |
| **Active Tab** | `on-surface` | `Accent Primary` | `Accent Primary` | `Accent Primary` |

---

## 3. Typography

The system utilizes **Inter** as a singular, authoritative typeface, relying on extreme scale shifts to establish hierarchy.

*   **Display (Display-LG: 3.5rem):** Reserved for hero chain titles. Should be tracked tight (-0.02em) with a bold weight.
*   **Headlines (Headline-SM: 1.5rem):** Used for primary section headers. These provide the "Editorial" anchor for each card.
*   **Body (Body-MD: 0.875rem):** The workhorse for developer descriptions. High line-height (1.6) for maximum readability against dark backgrounds.
*   **Labels (Label-SM: 0.6875rem):** All-caps, tracked out (+0.05em) for category headers like "INFRASTRUCTURE" or "STORAGE".

---

## 4. Elevation & Depth

### The Layering Principle
Depth is achieved through **Tonal Layering** instead of shadows.
*   **Lowest Level:** `surface-container-lowest` is used for the log output or terminal window, creating an "etched" look into the interface.
*   **Mid Level:** `surface-container` serves as the primary card surface.
*   **High Level:** `surface-container-high` is used for floating tooltips or active inputs.

### The "Ghost Border" Fallback
If accessibility requires a container boundary, use a **Ghost Border**: `outline-variant: #454558` at **15% opacity**. It should be felt, not seen.

### Glassmorphism & Light
For floating menus or chain-switchers, use:
*   **Background:** `surface` at 70% opacity.
*   **Backdrop Blur:** `24px`.
*   **Inner Glow:** A top-aligned 1px "highlight" stroke using `on-surface` at 10% opacity to mimic light hitting the edge of glass.

---

## 5. Components

### Buttons
*   **Primary:** High-contrast. For **Base**, use `#0000FF` background with `#FFFFFF` text. For other chains, use the respective Accent Primary.
*   **Secondary:** Ghost style. No background, Ghost Border (15% opacity), and `on-surface` text.
*   **Hover State:** Subtle scale-up (1.02x) and an increase in the "Accent Glow" intensity.

### Input Fields
*   **Base State:** `surface-container-lowest` background. No border.
*   **Active State:** A subtle bottom-border glow using the chain's Accent Primary.
*   **Typography:** Use `body-md` for user input to ensure technical clarity.

### Cards & Lists
*   **Rule:** Forbid divider lines. Use **80px vertical spacing** between major sections to let the design breathe.
*   **Interaction:** On hover, a card should transition from `surface-container` to `surface-container-high`.

### Chain Switcher (Signature Component)
A floating pill-shaped element using **Glassmorphism**. The active chain is indicated by a "Soft Background Glow" behind the chain icon, utilizing the specific chain's accent color at very low opacity.

---

## 6. Do's and Don'ts

### Do
*   **Do** use generous whitespace (32px, 48px, 64px) to create a premium feel.
*   **Do** use `surface-container-highest` for subtle button backgrounds on hover.
*   **Do** ensure all primary actions use the active chain's specific accent token.
*   **Do** use "Ambient Shadows" (large blur, 4% opacity) for floating modals only.

### Don't
*   **Don't** use 1px solid white or light grey borders. It breaks the "curated" dark-mode immersion.
*   **Don't** use pure black `#000000`. It creates "smearing" on OLED screens and feels unfinished. Use `surface: #131313`.
*   **Don't** use traditional "Drop Shadows" on cards; rely on color shifts between `surface` tiers.
*   **Don't** crowd the interface. If the screen feels full, increase the container padding.