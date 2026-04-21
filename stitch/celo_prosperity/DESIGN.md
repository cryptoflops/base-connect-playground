# Design System: The Celo Developer Perspective

## 1. Overview & Creative North Star: "The Regenerative Canvas"
This design system moves away from the aggressive, neon-drenched aesthetic of typical "Web3 Playgrounds." Instead, it adopts a **Creative North Star of "The Regenerative Canvas."** 

Like a master-planned eco-sanctuary, the interface is defined by breathability, organic layering, and human-centric warmth. We utilize a premium dark-neutral foundation to allow Celo’s Prosperity Yellow to act as a source of "digital sunlight." By breaking the rigid 12-column grid with intentional asymmetry—such as offset headers and overlapping code blocks—we create an editorial experience that feels custom, purposeful, and optimistic.

---

## 2. Colors: Tonal Depth & Prosperity
The palette is rooted in deep earth tones (`#131413`) and illuminated by the "Prosperity" spectrum.

### The "No-Line" Rule
**Explicit Instruction:** Prohibition of 1px solid borders for sectioning. 
Structural boundaries must be defined exclusively through background shifts. A `surface-container-low` code editor should sit on a `background` viewport without a stroke. Use color proximity to signal relationship, not lines to signal containment.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of semi-translucent materials.
- **Base:** `surface` (#131413) - The bedrock.
- **Sectioning:** `surface-container-low` (#1B1C1B) - Large content areas.
- **Interaction:** `surface-container-high` (#292A29) - Hover states or active cards.
- **Detail:** `surface-container-highest` (#343534) - Context menus and tooltips.

### The "Glass & Gradient" Rule
Floating elements (Modals, Hover Cards) must utilize **Glassmorphism**. Use `surface-variant` at 60% opacity with a `24px` backdrop-blur. This allows the subtle greens and yellows of the background to bleed through, softening the tech-heavy developer environment.

### Signature Textures
CTAs should never be flat. Apply a subtle radial gradient:
- **Primary CTA:** `primary` (#FCFF52) to `primary-container` (#E7EA3E) at 135 degrees. This creates a "glow" that feels three-dimensional and premium.

---

## 3. Typography: Editorial Optimism
We lead with **Inter**, utilizing its high x-height for maximum legibility in complex developer data environments.

- **Display (Lg/Md):** Used for "Big Ideas" and welcome states. Tracking is set to `-0.02em` to feel tight and authoritative.
- **Headline (Sm):** The workhorse for section headers. Always paired with a `surface-tint` accent bar to the left.
- **Body (Md):** Optimized for code-heavy explanations. Line-height is a generous `1.6` to prevent visual fatigue.
- **Label (Sm):** All-caps with `0.05em` tracking, used for metadata and technical specs (Gas prices, Block height).

The hierarchy mimics a high-end technical journal—clear, spacious, and prioritizes "The Scan" over "The Read."

---

## 4. Elevation & Depth: Tonal Layering
Traditional structural lines are replaced by **Tonal Layering**.

- **The Layering Principle:** To create a "lifted" card, place a `surface-container-lowest` object on a `surface-container-low` background. The subtle 1-2% shift in brightness provides a natural, sophisticated elevation.
- **Ambient Shadows:** For floating Modals, use a `48px` blur with 6% opacity. The shadow color is not black; it is a tinted version of `on-surface` (a deep, desaturated green-charcoal) to simulate light passing through forest canopy.
- **The "Ghost Border" Fallback:** If accessibility requires a border (e.g., input focus), use `outline-variant` at **15% opacity**. High-contrast white or yellow borders are forbidden.

---

## 5. Components: The Primitive Set

### Buttons
- **Primary:** Prosperity Yellow (`primary`) with `on-primary` (#323200) text. Roundedness: `md` (0.75rem).
- **Secondary:** Glass-style. `surface-container-high` background with a `20% primary` ghost border.
- **Tertiary:** Text-only with an underline that appears on hover, utilizing the `secondary` (Prosperity Green) color.

### Chips (Transaction Tags)
- Use `surface-container-highest` for the background.
- Status is indicated by a 4px organic "dot" (Prosperity Green for success, Wood Brown for pending). Forbid large, high-saturation color blocks.

### Input Fields
- Background: `surface-container-lowest`.
- Focus State: A subtle `surface-tint` (#CBCE1D) outer glow (4px) instead of a heavy border.
- Labels: `label-md` placed 8px above the field, never inside as a placeholder.

### Code Playground Cards
- Forbid divider lines.
- Separate the "Header" (tab bar) from the "Body" (code) using a shift from `surface-container-low` to `surface-container-lowest`. 
- Use a `xl` (1.5rem) corner radius for the outer container to maintain the "approachable" brand tone.

---

## 6. Do's and Don'ts

### Do
- **Use "Wood" and "Forest" for context:** Use `secondary_fixed_variant` (Forest) for successful transaction feedback and Wood (#FCF6F1 at 10% opacity) for container backgrounds to add warmth.
- **Embrace Asymmetry:** Align text to the left but allow imagery or code snippets to bleed off the right edge of the container.
- **Prioritize Breathing Room:** When in doubt, double the vertical padding.

### Don't
- **No Cyberpunk Neon:** Avoid pure #00FF00 or #FF00FF. All colors must feel organic/nature-derived.
- **No 100% Opaque Borders:** This shatters the "Regenerative Canvas" feel.
- **No Hard Shadows:** Never use `box-shadow: 0 4px 10px #000`. Use the Ambient Shadow rule defined in Section 4.
- **No Standard Grids:** Avoid the "three-column feature row." Use overlapping layers or varied widths (e.g., 40/60 split) to feel editorial.