# Design System Specification

## 1. Overview & Creative North Star: "The Architectural Ledger"

This design system is not a set of components; it is a digital manifestation of "Superchain" infrastructure. The Creative North Star is **The Architectural Ledger**. It visualizes the concept of a high-performance engine encased in a sleek, glass-and-metal chassis. 

To move beyond the "template" look of traditional crypto dashboards, this system rejects the grid in favor of **intentional asymmetry** and **tonal depth**. We treat the screen as a 3D space where data doesn't sit *on* the background, but is *embedded* within layers of translucent, technical material. The experience should feel finance-native: stable, authoritative, and impossibly fast.

---

### 2. Colors: Depth Through Luminance

Our palette is anchored in deep oceanic navies and high-energy blues. The primary objective is to eliminate "flatness."

| Token | Hex | Role |
| :--- | :--- | :--- |
| `surface` | #031429 | The foundation. Deep, light-absorbing navy. |
| `primary` | #94CCFF | High-visibility action and primary data points. |
| `primary_container` | #12AAFF | The "Glow" source—used for active states and subtle gradients. |
| `tertiary` | #04DDD7 | The "Technical Pulse." Used for success states and accent data. |
| `surface_container_low` | #0B1C31 | Secondary background layering. |
| `surface_container_high` | #1A2B40 | Tertiary background layering. |

#### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to section content. Boundaries must be defined through background shifts. A `surface-container-low` card sitting on a `surface` background is sufficient. This creates a more organic, high-end editorial feel.

#### The "Glass & Gradient" Rule
For floating modules or hero sections, use **Glassmorphism**. Combine `surface_container_highest` at 60% opacity with a `backdrop-filter: blur(12px)`. To add "soul," apply a subtle linear gradient from `primary_container` to `secondary_container` at 10% opacity across large surfaces to mimic light hitting architectural glass.

---

### 3. Typography: Technical Authority

We utilize **Inter** for its neutral, high-legibility "infrastructure" feel, paired with **Space Grotesk** for mono-spaced technical labels.

*   **Display (Lg/Md):** 3.5rem / 2.75rem. Use for high-impact data or hero headlines. Tracking should be set to -2% for a tighter, more "engineered" look.
*   **Headline (Sm):** 1.5rem. The primary entry point for sections.
*   **Title (Md):** 1.125rem. Used for card headers.
*   **Body (Md):** 0.875rem. The workhorse for all technical data and descriptions.
*   **Label (Sm/Md):** 0.6875rem / 0.75rem (Space Grotesk). Used for transaction hashes, timestamps, and metadata.

**Editorial Hierarchy:** Always pair a `display-lg` metric with a `label-sm` technical descriptor to create the "High-End Dashboard" aesthetic.

---

### 4. Elevation & Depth: The Layering Principle

In this system, elevation is not achieved through shadows, but through **Tonal Layering**.

1.  **Level 0 (Base):** `surface` (#031429)
2.  **Level 1 (Sections):** `surface_container_low` (#0B1C31)
3.  **Level 2 (Cards):** `surface_container_high` (#1A2B40)
4.  **Level 3 (Popovers/Modals):** `surface_container_highest` (#26364C) with Glassmorphism.

#### Ambient Shadows
When a component must float (e.g., a dropdown), use an **Ambient Shadow**:
*   `box-shadow: 0 24px 48px -12px rgba(0, 14, 34, 0.5);`
*   The shadow must be a tinted version of the background, never pure black.

#### The "Ghost Border" Fallback
If contrast is required for accessibility, use a **Ghost Border**: `outline_variant` (#3E4851) at 20% opacity. Never use a 100% opaque border.

---

### 5. Components: Precision Primitives

#### Buttons
*   **Primary:** Solid `primary`. Text in `on_primary`. Roundedness: `md` (0.375rem).
*   **Secondary:** Ghost style. No background, Ghost Border (20% `outline`), text in `primary`.
*   **Tertiary/Technical:** `surface_container_high` background with `tertiary` text. Use for "Copy" or "View on Explorer" actions.

#### Input Fields
*   **State:** Background `surface_container_lowest`. No border.
*   **Focus State:** A 1px "Ghost Border" at 40% opacity and a subtle `primary_container` outer glow (4px blur).
*   **Text:** `body-md` for input; `label-sm` for the floating label.

#### Cards & Lists
*   **Constraint:** Zero dividers. Use vertical whitespace (1.5rem to 2rem) to separate list items.
*   **Interaction:** On hover, a card should shift from `surface_container_high` to `surface_bright` (#2A3A50) to indicate interactivity.

#### Technical Chips
*   Small, `sm` roundedness. Background `surface_container_highest`. Use `tertiary` for status indicators (e.g., "Confirmed") to provide a high-contrast technical pulse against the navy background.

---

### 6. Do’s and Don’ts

#### Do
*   **Do** use asymmetrical layouts (e.g., a wide data column paired with a narrow technical sidebar).
*   **Do** lean into the "Superchain" feel by using `tertiary` (#04DDD7) sparingly for critical success pathing.
*   **Do** use large amounts of negative space to convey premium stability.

#### Don’t
*   **Don't** use pure black (#000000). It breaks the depth of the navy "Architectural Ledger."
*   **Don't** use standard 1px borders or lines. If you feel you need a divider, use a 16px gap instead.
*   **Don't** use "bubbly" or fully rounded (pill) buttons for primary actions; stay with `md` (0.375rem) to maintain a professional, finance-native edge.