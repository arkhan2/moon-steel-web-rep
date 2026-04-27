# Neutral Layering Standard

## Goal
Create clear visual separation between background, components, and nested components using neutral surfaces with optional subtle tint.

## Layer Scale
- `layer-0`: app/page background
- `layer-1`: first-level components on background (cards, sections, containers)
- `layer-2`: components inside components (inner panels, grouped controls)
- `layer-3`: elevated overlays (popover-like surfaces, focused panels)

## Rule Set
1. Move up by one layer when nesting (`0 -> 1 -> 2 -> 3`).
2. Do not jump multiple levels unless the element is a true overlay.
3. Use border + slight elevation, not heavy shadows, for separation.
4. Use tint only for state/intent:
   - `layer-tint-primary`: active/focus/selected
   - `layer-tint-neutral`: subtle emphasis
5. Preserve contrast:
   - body text >= 4.5:1
   - UI boundaries >= 3:1 where possible

## Current Implementation
- Tokens: `--layer-0..3` in `src/index.css`
- Utilities: `.layer-0`, `.layer-1`, `.layer-2`, `.layer-3`, `.layer-tint-primary`, `.layer-tint-neutral`
- Shared card base uses `layer-1` in `src/components/ui/card.tsx`

## Practical Mapping
- Page section wrapper: `layer-0`
- Standard card: `layer-1`
- Card-within-card panel: `layer-2`
- Popover/inspector/focused container: `layer-3`
- Selected card/tab/pill: `layer-1 layer-tint-primary`

## Industry Baseline
This follows the same pattern used by major systems:
- Apple HIG: depth through restrained contrast and material layering
- Material Design: tonal elevation (surfaces differentiated by tone)
- Enterprise design systems: neutral surface ramps + semantic tint states
