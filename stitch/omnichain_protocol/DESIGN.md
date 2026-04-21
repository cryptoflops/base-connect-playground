# Design System: Multi-Chain Playground

## 1. Overview & Creative North Star
**The Creative North Star: "The Sovereign Infrastructure"**

This design system moves away from the "playful" nature of retail crypto and leans into the authoritative, high-density aesthetic of professional developer consoles and institutional trading desks. It is built on a foundation of **Restrained Precision**. 

We break the "template" look by utilizing a rigid 2-column layout that feels like an immutable architectural grid. Rather than using boxes and lines to contain information, we use **Tonal Architecture**—defining space through massive typography scales and subtle shifts in surface depth. The experience should feel like a high-end physical dashboard: heavy, intentional, and technically superior.

---

## 2. Colors & The "Four Skins" Logic
The system uses a persistent core (Dark Mode) while the "Accent Pivot" allows the entire interface to adopt the soul of the active chain (Base, Celo, Optimism, or Arbitrum).

### Tone Roles
- **Background (`#11131c`):** The absolute foundation. All depth is built *up* from here.
- **Primary / Primary Container:** These tokens pivot based on the active chain. 
    - *Base:* `#0000FF`
    - *Celo:* `#FCFF52`
    - *Optimism:* `#FF0421`
    - *Arbitrum:* `#12AAFF`
- **Surface Tiers:** Use `surface_container_lowest` to `surface_container_highest` to define hierarchy.

### The Rules of Engagement
- **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. Structural boundaries are created by placing a `surface_container_low` section against the `background` or `surface_container_high`.
- **Surface Hierarchy & Nesting:** Treat the UI as nested layers. A developer console panel should be `surface_container_low`, while the interactive code editor within it sits on `surface_container_lowest` to create a "recessed" technical feel.
- **The "Glass & Gradient" Rule:** For floating modals or "active state" overlays, use semi-transparent `surface_variant` with a `24px` backdrop-blur. 
- **Signature Textures:** Apply a 15% opacity linear gradient from `primary` to `primary_container` on high-level CTAs to provide a "machined metal" finish rather than a flat, plastic look.

---

## 3. Typography: Inter
The typography is the primary driver of the "Sovereign Infrastructure" feel. We use a high-contrast scale where display text is massive and labels are micro-scale.

| Level | Size | Weight | Tracking | Case |
| :--- | :--- | :--- | :--- | :--- |
| **display-lg** | 3.5rem | 700 | -0.02em | Sentence |
| **headline-sm** | 1.5rem | 600 | -0.01em | Sentence |
| **title-sm** | 1.0rem | 500 | 0 | Sentence |
| **body-md** | 0.875rem | 400 | 0 | Sentence |
| **label-sm** | 0.6875rem | 600 | 0.05em | ALL CAPS |

*Director's Note:* Use **label-sm** for all technical metadata (Chain ID, Gas Price, Block Height). This micro-scale, wide-tracked caps lock creates an "industrial" aesthetic.

---

## 4. Elevation & Depth
In this system, "Elevation" is a color property, not a shadow property.

- **The Layering Principle:** 
    - **Level 0:** `background` (#11131c) - Global canvas.
    - **Level 1:** `surface_container_low` - Primary 2-column sidebar.
    - **Level 2:** `surface_container` - Main content cards.
    - **Level 3:** `surface_container_high` - Active interactive elements.
- **Ambient Shadows:** Only used for floating Popovers. Use a 32px blur, 0px offset, and 4% opacity of `on_surface`. It should feel like a soft glow of light, not a shadow.
- **The Ghost Border:** If a component requires definition against a similar background, use `outline_variant` at **10% opacity**. It should be barely perceptible.

---

## 5. Components

### Buttons
- **Primary:** High-contrast background (Active Chain Color). Sharp `8px (lg)` corners. Text is `on_primary`. No gradients except for a subtle `primary_fixed_variant` top-glow on hover.
- **Secondary:** `surface_container_highest` background. No border.
- **Tertiary:** Text-only using the `primary` token.

### Cards & Lists
- **The "No-Divider" Rule:** Forbid the use of divider lines. Separate list items using `12px` of vertical whitespace or a hover state that shifts the background to `surface_bright`.
- **Infrastructure Cards:** Use `surface_container_lowest` for a "well" effect (sunken into the page).

### Technical Inputs
- **Text Fields:** Background is `surface_container_lowest`. When focused, change the `outline` to the active chain's `primary` color. 
- **The Infrastructure Console:** A specialized component for code output. Use a monospace sub-variant of Inter or a true mono font. Background must be `#0c0e17` (lowest possible) to emphasize the "developer" environment.

### Multi-Chain Switcher (Signature Component)
- A persistent floating segment at the top or bottom of the primary column. 
- Uses **Glassmorphism**: `surface_container_high` at 60% opacity with `backdrop-filter: blur(12px)`.
- The active chain is indicated by a 2px vertical "power bar" of the chain's `primary` color on the left edge of the chip.

---

## 6. Do's and Don'ts

### Do
- **Do** use `display-lg` typography to anchor the start of a flow.
- **Do** embrace asymmetry. Let the left column (Navigation/Context) be significantly narrower than the right column (Action/Console).
- **Do** use the chain's `primary` color sparingly. It is a surgical tool for focus, not a paint bucket.

### Don't
- **Don't** use standard 1px borders to separate the sidebar from the main content. Use a shift from `surface_container_low` to `background`.
- **Don't** use rounded corners above `8px`. The "Playground" is for professionals; it should feel sharp and precise, never "bubbly."
- **Don't** use pure white (#FFFFFF) for body text. Use `on_surface_variant` (#c5c4db) to reduce eye strain in the high-end dark mode.