# Design System Document: Infrastructure in Motion

## 1. Overview & Creative North Star: "The Kinetic Monolith"
This design system is built to reflect the duality of the Optimism Network: the unwavering stability of Ethereum-grade infrastructure and the high-velocity energy of a scaling frontier. 

The Creative North Star is **"The Kinetic Monolith."** We move away from the "friendly SaaS" aesthetic of rounded bubbles and soft pastels. Instead, we embrace a high-contrast, editorial layout that feels like a premium racing technical manual. We break the template through **intentional asymmetry**, ultra-wide tracking on labels, and a "dark-room" atmosphere where the only light source is the radioactive glow of Optimism Red.

## 2. Colors & Tonal Depth
Our palette is rooted in a "True Dark" foundation, allowing `#FF0421` to function not just as a color, but as a signal of power and action.

### The "No-Line" Rule
**Borders are a design failure.** To achieve a premium, editorial feel, designers are prohibited from using 1px solid borders to define sections. Boundaries must be established through:
*   **Background Shifts:** Transitioning from `surface` (#0e0e0e) to `surface-container-low` (#131313).
*   **Negative Space:** Using aggressive white space (from the spacing scale) to create "invisible" gutters.
*   **Tonal Stepping:** A card should be defined by being slightly lighter (`surface-container-high`) than its parent, never by an outline.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. 
*   **Base:** `surface` (#0e0e0e) for global backgrounds.
*   **Plinth:** `surface-container-low` (#131313) for secondary content areas.
*   **Object:** `surface-container-highest` (#262626) for interactive cards or modals.
*   **The Glass Rule:** For floating overlays (modals/dropdowns), use `surface-variant` (#262626) at 70% opacity with a `24px` backdrop blur. This ensures the high-energy red accents bleed through the container, maintaining visual "soul."

### Signature Textures
*   **The Power Glow:** Use `primary_dim` (#ea001d) as a soft radial gradient (20% opacity) behind hero elements to simulate a "warm engine" effect.
*   **The Red Shift:** CTAs should use a subtle linear gradient from `primary` (#ff8e83) to `primary_dim` (#ea001d) at 135 degrees to prevent the red from looking "flat" or "digital."

## 3. Typography: Editorial Authority
We use **Inter** exclusively, but we manipulate its weight and tracking to convey "Infrastructure-Grade" reliability.

*   **Display (lg/md):** Tight kerning (-0.04em), Semi-Bold. Used for big, unapologetic statements.
*   **Headlines:** High contrast against body text. Always `on_surface` (#ffffff).
*   **Labels (md/sm):** Uppercase, +0.1em tracking. Labels are the "technical metadata" of our system; they should feel like markings on a high-end chassis.
*   **Body (md):** Use `on_surface_variant` (#adaaaa) for long-form text to reduce eye strain against the pure black background, reserving pure white for emphasis.

## 4. Elevation & Depth
In this system, depth is a product of light and layering, not drop shadows.

*   **The Layering Principle:** Depth is achieved by "stacking." A `surface-container-lowest` (#000000) card placed on a `surface-container` (#1a1919) creates a "recessed" look, perfect for input fields.
*   **Ambient Shadows:** If an element must float (e.g., a primary action toast), use a shadow color of `#FF0421` at 8% opacity with a `48px` blur. This creates a "subtle heat" rather than a grey smudge.
*   **The Ghost Border:** If accessibility requires a stroke, use `outline_variant` (#484847) at 20% opacity. It should be felt, not seen.

## 5. Components

### Buttons
*   **Primary:** Solid `primary_dim` (#ea001d) with `on_primary_fixed` (Black) text. Sharp corners (`sm`: 0.125rem).
*   **Secondary:** Ghost style. `outline` (#767575) border at 20%, white text. On hover, the background fills with `surface-bright` (#2c2c2c).
*   **Tertiary:** Pure text, uppercase labels, with a `2px` underline that expands from center on hover.

### Cards & Lists
*   **The Divider Ban:** Never use lines between list items. Use a 4px gap and alternating background tones (`surface-container-low` vs `surface-container-lowest`) or simply use the `body-sm` spacing scale to create distinction.
*   **Interactive Cards:** Should shift from `surface-container` to `surface-container-highest` on hover.

### Input Fields
*   **Base State:** `surface-container-lowest` (#000000) background. No border.
*   **Focus State:** A 1px bottom-border of `primary` (#FF0421) and a subtle `surface_tint` glow.

### Additional: The "Status Pulse"
For network indicators or active states, use a small 4px circle of `primary` with a 10px outer glow. This reinforces the "performance-oriented" infrastructure vibe.

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical layouts (e.g., a 12-column grid where content starts at column 3 but spans to 12).
*   **Do** use "Optimism Red" sparingly. It is a high-energy signal; if everything is red, nothing is important.
*   **Do** lean into extreme "sharpness." Use the `sm` (0.125rem) roundedness scale for a technical, precise feel.

### Don't
*   **Don't** use standard "Grey" (#808080). Use our `on_surface_variant` or `outline` tokens which are tuned for dark-mode harmony.
*   **Don't** use large corner radii. This system is "Sharp and Direct." Avoid `xl` or `full` rounding unless it's for a specific status pill.
*   **Don't** use traditional "Drop Shadows." They look muddy on a `#0e0e0e` background. Use tonal shifts instead.