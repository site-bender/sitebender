---
name: css-styling
description: Comprehensive CSS styling patterns for Sitebender's Architect library. Covers component-scoped CSS, IE11 baseline + progressive enhancement, three-tier custom property theming, WCAG AAA accessibility, fluid responsive design, print styles, and minimal animations. Use when creating or modifying component styles.
---

# CSS Styling

## Core Principle

**Write CSS that works everywhere, enhances progressively, and prioritizes accessibility above all else.**

CSS in Sitebender follows a layered enhancement strategy: IE11-compatible baseline (2010-era CSS) → progressive enhancement via `@supports` → optional modern features. Every component gets its own `index.css` file using a single `.bend-{component-name}` class with tag-based sub-element selectors. No BEM, no class soup, no CSS-in-JS.

Accessibility is non-negotiable: default theme must pass both APCA (modern) and WCAG 2.1 AAA (legacy) contrast standards, include focus states, support reduced motion, and meet 48×48px touch target minimums.

## When to Use This Skill

Use this skill when:
- Creating CSS for new components
- Modifying existing component styles
- Defining theme variables
- Writing responsive styles
- Adding accessibility features to styles
- Optimizing styles for print
- Adding animations or transitions
- Questioning IE11 compatibility of a CSS feature
- Unsure whether to use custom properties
- Need to support high contrast or reduced motion modes

**This skill is proactive** - apply these patterns automatically when writing any CSS.

---

## Pattern 1: Component CSS Structure

**Rule:** One `index.css` per component folder, cascading from ancestor folders.

### File Location

CSS files live alongside component implementations:

```
buttons/
  index.css                    # Shared button styles (loaded 1st)
  Button/
    index.ts                   # Component implementation
    index.css                  # Common Button styles (loaded 2nd)
    SubmitButton/
      index.ts                 # SubmitButton implementation
      index.css                # SubmitButton specific (loaded 3rd)
```

### Cascade Order

CSS loads top-down from ancestor folders to component folder:

1. Module CSS: `buttons/index.css`
2. Parent CSS: `buttons/Button/index.css`
3. Component CSS: `buttons/Button/SubmitButton/index.css`

**Why this works:** Specificity naturally increases as you descend the folder hierarchy. Module-level styles apply broadly, component-specific styles override precisely.

### Naming Convention

**Single class per component:**

Format: `.bend-{component-name}` in kebab-case

**Examples:**
- `.bend-submit-button`
- `.bend-text-field`
- `.bend-choose-one-field`
- `.bend-navigation`

**Tag-based sub-element selectors:**

```css
.bend-text-field { }
.bend-text-field label { }
.bend-text-field input[type="text"] { }
.bend-text-field .help { }
.bend-text-field input[type="text"]:focus { }
.bend-text-field input[data-touched]:invalid { }
```

**Why this works:**
- Low specificity (easy to override)
- Semantic (leverages HTML tags)
- Clean HTML (no class soup)
- Component-scoped (no conflicts)
- NO BEM (user requirement)

### CSS Discovery

The `createElement` function automatically discovers CSS files based on the component folder hierarchy, generates deduplicated `<link rel="stylesheet">` elements in correct cascade order, and includes them in the page's `<head>`.

**This is handled by the build system** - you just write the CSS files in the right locations.

### Example Component CSS

```css
/*++
 + SubmitButton component styles
 + File: buttons/Button/SubmitButton/index.css
 */

/*++ Component custom properties */
:root {
	--bend-submit-button-background-color: var(--bend-color-tertiary, #28a745);
	--bend-submit-button-color: #fff;
	--bend-submit-button-padding: var(--bend-space-m, 1rem);
}

/*++ Base component styles */
.bend-submit-button {
	/* IE11 fallback */
	display: inline-block;
	padding: 1rem 1.5rem;
	background: #28a745;
	border: none;
	color: #fff;
	font-size: 1rem;
	font-weight: 600;
	text-align: center;
	cursor: pointer;

	/* Modern override */
	padding: var(--bend-submit-button-padding) calc(var(--bend-submit-button-padding) * 1.5);
	background-color: var(--bend-submit-button-background-color);
	color: var(--bend-submit-button-color);
}

/*++ Progressive enhancement */
@supports (border-radius: 0.25rem) {
	.bend-submit-button {
		border-radius: 0.25rem;
	}
}
```

---

## Pattern 2: IE11 Baseline + Progressive Enhancement

**Rule:** Write 2010-era CSS first, enhance with `@supports`.

### IE11 Baseline Techniques

Use only these techniques for layout in base styles:

**Layout:**
- Floats with clearfix
- `inline-block` for inline elements
- Absolute/relative positioning
- Table display (rare, but works)

**Spacing:**
- Fixed margins and padding (`1rem`, `16px`)
- Percentage widths

**Typography:**
- Fixed font sizes or percentages
- Simple font stacks

**Colors:**
- Hex values only (`#007bff`)
- No `rgb()`, `hsl()`, or modern color functions in base styles

### Progressive Enhancement Pattern

```css
/* IE11 baseline: float layout */
.bend-container {
	overflow: hidden; /* clearfix */
}

.bend-item {
	float: left;
	width: 50%;
	margin-right: 2%;
}

/* Modern: flexbox */
@supports (display: flex) {
	.bend-container {
		display: flex;
		gap: 1rem;
		overflow: visible; /* reset */
	}

	.bend-item {
		float: none;  /* reset float */
		width: auto;  /* reset width */
		margin-right: 0;  /* reset margin */
		flex: 1;
	}
}

/* Even more modern: grid */
@supports (display: grid) {
	.bend-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	}

	.bend-item {
		flex: unset;  /* reset flex */
	}
}
```

**Key insight:** Always reset conflicting properties from previous enhancement levels.

### Custom Properties (No `@supports` Needed)

Custom properties use CSS cascade, not `@supports`:

```css
.bend-button {
	/* IE11 uses this */
	color: #000;
	background: #007bff;
	padding: 1rem;

	/* Modern browsers override with this (IE11 ignores invalid var()) */
	color: var(--bend-button-color, #000);
	background-color: var(--bend-button-background-color, #007bff);
	padding: var(--bend-button-padding, 1rem);
}
```

**How it works:** IE11 reads the first declaration, fails to parse the second (invalid `var()` syntax), and keeps the first. Modern browsers read both, and the second overrides the first.

### IE11 Compatibility Matrix

| Feature | IE11 Support | Strategy |
|---------|--------------|----------|
| Flexbox | Buggy (2012 spec) | Avoid completely, use floats |
| CSS Grid | No | Wrap in `@supports (display: grid)` |
| Custom properties | No | Use cascade (hard-coded → `var()` override) |
| `gap` property | No | Wrap in `@supports (gap: 1rem)` |
| Logical properties | No | Wrap in `@supports` + provide fallback |
| `clamp()` | No | Wrap in `@supports` |
| `min()`, `max()` | No | Wrap in `@supports` |
| `calc()` | Partial | Provide fallback, test carefully |
| Border-radius | Yes | Can use directly or wrap for clarity |
| Box-shadow | Yes | Can use directly |
| Opacity | Yes | Can use directly |
| Transform | Buggy | Wrap in `@supports`, test thoroughly |
| Transition | Buggy | Wrap in `@supports`, test thoroughly |
| `:is()`, `:where()`, `:has()` | No | Avoid or provide fallback selectors |
| `fit-content` | No | Wrap in `@supports` |
| `aspect-ratio` | No | Wrap in `@supports` |

### When `@supports` is NOT Needed

- Custom properties (use cascade instead)
- Border-radius (supported, but can wrap for code clarity)
- Box-shadow (supported)
- Opacity (supported)
- Simple transforms (supported, but buggy - wrap for safety)

### When `@supports` IS Needed

- Layout changes (`display: flex`, `display: grid`)
- New properties that conflict with fallback properties
- Properties that change document flow
- Modern selectors (`:is()`, `:where()`, `:has()`)
- Modern functions (`clamp()`, `min()`, `max()`)
- Logical properties (`padding-inline`, `margin-block`)
- `gap` property

---

## Pattern 3: Three-Tier Custom Properties

**Rule:** Base tokens → Semantic tokens → Component structural properties.

### Tier 1: Primitives (Specific Named Values)

Specific values with clear names defined in `themes/default/index.css`. These ARE the IE11 fallback values.

```css
:root {
	/* Color primitives - Tier 1 (specific, named) */
	--color-blue-600: #007bff;
	--color-gray-600: #6c757d;
	--color-green-600: #28a745;
	--color-red-600: #dc3545;
	--color-gray-900: #212529;
	--color-white: #fff;
	--color-black: #000;

	/* Spacing primitives - Tier 1 (clamped for fluid scaling) */
	--space-1: clamp(0.25rem, 0.25vw + 0.1875rem, 0.375rem);
	--space-2: clamp(0.5rem, 0.5vw + 0.375rem, 0.75rem);
	--space-3: clamp(0.75rem, 0.75vw + 0.5625rem, 1.125rem);
	--space-4: clamp(1rem, 1vw + 0.75rem, 1.5rem);
	--space-6: clamp(1.5rem, 1.5vw + 1.125rem, 2.25rem);
	--space-8: clamp(2rem, 2vw + 1.5rem, 3rem);

	/* Font size primitives - Tier 1 (clamped for fluid scaling) */
	--size-xs: clamp(0.75rem, 0.5vw + 0.625rem, 1rem);
	--size-s: clamp(0.875rem, 0.625vw + 0.71875rem, 1.125rem);
	--size-m: clamp(1rem, 0.75vw + 0.8125rem, 1.25rem);
	--size-l: clamp(1.25rem, 1vw + 1rem, 1.75rem);
	--size-xl: clamp(1.5rem, 1.25vw + 1.125rem, 2rem);
	--size-2xl: clamp(2rem, 1.5vw + 1.5rem, 2.75rem);

	/* Font stacks - Tier 1 */
	--font-sans-stack: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
	--font-serif-stack: Georgia, 'Times New Roman', serif;
	--font-mono-stack: 'SF Mono', Monaco, Consolas, 'Courier New', monospace;
}
```

**These are specific, well-named values. Change `--space-4` → everything using it updates automatically.**

### Tier 2: Semantic Design Tokens

Give MEANING to Tier 1 primitives. Defined in `themes/default/index.css`:

```css
:root {
	/* Colors - Tier 2 (design intent) */
	--color-primary: var(--color-blue-600);
	--color-text: var(--color-gray-900);
	--color-text-inverse: var(--color-white);
	--color-link: var(--color-blue-600);
	--color-link-hover: var(--color-blue-700);
	--color-error: var(--color-red-600);
	--color-success: var(--color-green-600);
	--color-background: var(--color-white);

	/* Spacing - Tier 2 (design intent) */
	--padding-narrow: var(--space-2);
	--padding-default: var(--space-4);
	--padding-wide: var(--space-6);
	--gap-tight: var(--space-2);
	--gap-default: var(--space-4);
	--gap-loose: var(--space-8);

	/* Typography - Tier 2 (design intent) */
	--font-body: var(--font-sans-stack);
	--font-heading: var(--font-serif-stack);
	--font-code: var(--font-mono-stack);
	--font-size-body: var(--size-m);
	--font-size-small: var(--size-s);
	--font-size-heading: var(--size-xl);

	/* Font weights - Tier 2 */
	--font-weight-normal: 400;
	--font-weight-semibold: 600;
	--font-weight-bold: 700;

	/* Opacities - Tier 2 */
	--opacity-disabled: 0.6;
	--opacity-hover: 0.8;

	/* Borders - Tier 2 */
	--border-radius-small: 0.125rem;
	--border-radius-default: 0.25rem;
	--border-radius-large: 0.5rem;

	/* Focus - Tier 2 */
	--focus-color: var(--color-blue-700);
	--focus-offset: 0.125rem;

	/* Print - Tier 2 */
	--print-text-color: var(--color-black);
	--print-border-color: var(--color-black);
	--print-background-color: transparent;
}
```

**Change ONE Tier 2 token (like `--padding-default`) → ALL components using it update automatically.**

### Tier 3: Component-Specific Properties

Define IN THE COMPONENT CSS FILE (in component class or `:root`). These reference Tier 2 semantic tokens and allow per-component overrides.

```css
/*++ Button component */
.bend-button {
	/* Tier 3 - component properties reference Tier 2 semantic */
	--bend-button-padding-block: var(--padding-default);
	--bend-button-padding-inline: var(--padding-wide);
	--bend-button-font-size: var(--font-size-body);
	--bend-button-font-weight: var(--font-weight-semibold);
	--bend-button-background-color: var(--color-primary);
	--bend-button-color: var(--color-text-inverse);
	--bend-button-border-radius: var(--border-radius-default);
	--bend-button-disabled-opacity: var(--opacity-disabled);

	/* IE11 fallback - great CSS with rem, NOT px */
	padding: 0.75rem 1.5rem;
	background-color: #007bff;
	color: #fff;
	font-family: system-ui, sans-serif;
	font-size: 1rem;
	font-weight: 600;
	border-radius: 0.25rem;

	/* Modern override */
	padding: var(--bend-button-padding-block) var(--bend-button-padding-inline);
	background-color: var(--bend-button-background-color);
	color: var(--bend-button-color);
	font-family: var(--font-body);
	font-size: var(--bend-button-font-size);
	font-weight: var(--bend-button-font-weight);
	border-radius: var(--bend-button-border-radius);
}

.bend-button:disabled {
	opacity: 0.6;
	opacity: var(--bend-button-disabled-opacity);
}
```

**Tier 3 CAN include colors** by referencing Tier 2 semantic tokens.

### Override Strategy

Users can override at ANY tier for maximum flexibility:

**Override Tier 1 primitive (affects everything using it):**

```css
:root {
	--space-4: clamp(1.25rem, 1.25vw + 0.9375rem, 1.875rem);  /* Wider spacing everywhere */
	--color-blue-600: #0000ff;  /* Different blue */
}
```

**Override Tier 2 semantic token (affects all components using that semantic):**

```css
:root {
	--padding-default: var(--space-6);  /* All default padding now uses space-6 */
	--color-primary: var(--color-green-600);  /* Primary is now green */
	--print-text-color: #333;  /* Dark gray for print instead of black */
}
```

**Override Tier 3 component property (affects ONLY that component):**

```css
:root {
	--bend-button-padding-block: var(--padding-narrow);  /* Only buttons get narrow padding */
	--bend-button-background-color: var(--color-error);  /* Only buttons use error color */
}
```

### Why Three Tiers?

1. **Cascade of changes:** Change Tier 1 → Tier 2 updates → Tier 3 updates → Components update
2. **Flexible override points:** Override at the right level (global, semantic, or component)
3. **Single source of truth:** `--space-4` defined once, used everywhere
4. **Design system alignment:** Tier 2 maps to design decisions (padding-wide, color-link)
5. **Easy theming:** Change primitives or semantics, entire site updates

---

## Pattern 4: Accessibility (WCAG AAA + APCA)

**Rule:** Default theme must meet BOTH modern (APCA) and legacy (WCAG 2.1 AAA) contrast standards.

### Contrast Requirements

**APCA (Preferred):**
- Use latest APCA calculator: https://www.myndex.com/APCA/
- Target: Lc 75+ for body text, Lc 90+ for small text

**WCAG 2.1 AAA (Legacy, must also pass):**
- Normal text: 7:1 minimum
- Large text (18pt+ or 14pt+ bold): 4.5:1 minimum

**Both standards must pass for default theme colors.** Users who override colors are responsible for their own contrast.

### Focus States (Mandatory)

Every interactive element must have visible focus styles:

```css
.bend-button:focus {
	/* IE11 fallback */
	outline: 2px solid #0056b3;
	outline-offset: 2px;

	/* Modern override */
	outline: 2px solid var(--bend-focus-color, #0056b3);
	outline-offset: var(--bend-focus-offset, 2px);
}

/*++ Use :focus-visible when appropriate (modern browsers only) */
@supports selector(:focus-visible) {
	.bend-button:focus:not(:focus-visible) {
		outline: none;
	}

	.bend-button:focus-visible {
		outline: 2px solid var(--bend-focus-color, #0056b3);
		outline-offset: var(--bend-focus-offset, 2px);
	}
}
```

**Never remove focus styles without replacement.**

### Touch Targets

**Minimum:** 48×48px (WCAG 2.2 Level AAA)

**Can be less height if wider:** For example, 36×64px is acceptable (follows WCAG 2.2 guidelines).

```css
.bend-button {
	/* IE11 fallback */
	min-height: 48px;
	min-width: 48px;
	padding: 12px 24px;

	/* Modern override */
	min-height: 48px;
	min-width: 48px;
	padding: var(--bend-button-padding-block, 12px) var(--bend-button-padding-inline, 24px);
}

/*++ Horizontal elements can be shorter if wider */
.bend-tab-button {
	min-height: 36px;
	min-width: 64px;
}
```

### Reduced Motion Support

Always provide reduced motion alternatives:

```css
.bend-button {
	/* No transition by default (IE11 + reduced motion) */
}

@supports (transition: all 0.2s) {
	.bend-button {
		transition: background-color 0.2s ease;
	}
}

@media (prefers-reduced-motion: reduce) {
	@supports (transition: all 0.2s) {
		.bend-button {
			transition: none;
		}
	}
}
```

**Pattern:** No animation by default → animation in `@supports` → removed in `prefers-reduced-motion`.

### High Contrast Mode

Support Windows High Contrast Mode:

```css
@media (forced-colors: active) {
	.bend-button {
		border: 2px solid ButtonText;
	}

	.bend-button:focus {
		outline: 2px solid Highlight;
		outline-offset: 2px;
	}

	.bend-button:disabled {
		border-color: GrayText;
		color: GrayText;
	}
}
```

**System colors:** `ButtonText`, `ButtonFace`, `Highlight`, `HighlightText`, `GrayText`, `LinkText`, `VisitedText`, etc.

### Light/Dark Mode

Support prefers-color-scheme:

```css
:root {
	--bend-background-color: #fff;
	--bend-text-color: #000;
	--bend-border-color: #ccc;
}

@media (prefers-color-scheme: dark) {
	:root {
		--bend-background-color: #1a1a1a;
		--bend-text-color: #f0f0f0;
		--bend-border-color: #444;
	}
}

.bend-card {
	/* IE11 fallback */
	background: #fff;
	color: #000;
	border: 1px solid #ccc;

	/* Modern override */
	background-color: var(--bend-background-color);
	color: var(--bend-text-color);
	border-color: var(--bend-border-color);
}
```

**Verify contrast in both modes.**

---

## Pattern 5: Responsive/Fluid Design

**Rule:** Avoid fixed breakpoints, prefer fluid layouts.

### Fluid Typography

Use `clamp()` for fluid typography:

```css
.bend-heading {
	/* IE11 fallback (middle value) */
	font-size: 2rem;
}

@supports (font-size: clamp(1rem, 1vw, 3rem)) {
	.bend-heading {
		font-size: clamp(1.5rem, 1vw + 1rem, 3rem);
	}
}
```

**`clamp(min, preferred, max)` formula:** Use `[viewport-unit] + [base]` for the preferred value to create smooth scaling.

### Multi-Column Reflow

Use `column-width` for responsive text columns:

```css
.bend-text-content {
	/* IE11 fallback: single column */
	column-count: 1;
}

@supports (column-width: 30ch) {
	.bend-text-content {
		column-count: auto;
		column-width: 30ch;
		column-gap: 2rem;
	}
}
```

**Why `column-width` over `column-count`?** Width-based reflow adapts to container size automatically.

### Breakpoints (Exception Pattern)

Fixed breakpoints are exceptions requiring justification:

```css
/*++ [EXCEPTION] Breakpoint required for navigation menu mobile/desktop toggle */
@media (width <= 768px) {
	.bend-navigation {
		display: none;
	}

	.bend-navigation-toggle {
		display: block;
	}
}

@media (width > 768px) {
	.bend-navigation {
		display: flex;
	}

	.bend-navigation-toggle {
		display: none;
	}
}
```

**Exception comment format:** `/*++ [EXCEPTION] Reason for breakpoint */`

**Prefer width range syntax:** `(width <= 768px)` over `(max-width: 768px)` for clarity.

### Container Queries (When Justified)

Use container queries only when component layout depends on container width, not viewport width:

```css
/*++
 + Container query justified: sidebar component needs different layout
 + based on container width, not viewport width
 */
@supports (container-type: inline-size) {
	.bend-sidebar {
		container-type: inline-size;
		container-name: sidebar;
	}

	@container sidebar (min-width: 400px) {
		.bend-sidebar-content {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 1rem;
		}
	}
}
```

**Always wrap in `@supports`** - container queries are not supported in IE11.

---

## Pattern 6: State Management

**Rule:** Use pseudo-classes and data attributes for state.

### Interactive States

Use standard pseudo-classes:

```css
.bend-button {
	/* Default state */
	background: #007bff;
	color: #fff;
}

.bend-button:hover {
	/* IE11 fallback */
	background: #0056b3;

	/* Modern override */
	background-color: var(--bend-button-hover-background-color, #0056b3);
}

.bend-button:focus {
	outline: 2px solid var(--bend-focus-color, #0056b3);
	outline-offset: 2px;
}

.bend-button:active {
	background: #004494;
}

.bend-button:disabled {
	opacity: 0.6;
	cursor: not-allowed;
}
```

**Order matters:** `:hover` → `:focus` → `:active` (LoVe/HAte mnemonic).

### Data Attribute States

Use data attributes for application state:

```css
.bend-text-field input[type="text"] {
	border: 1px solid #ccc;
}

/*++ Valid state (after touched) */
.bend-text-field input[data-touched]:valid {
	border-color: #28a745;
}

/*++ Invalid state (after touched) */
.bend-text-field input[data-touched]:invalid {
	border: 2px solid #dc3545;
}

/*++ Focused but not touched yet */
.bend-text-field input:focus:not([data-touched]) {
	border-color: #007bff;
}

/*++ Loading state */
.bend-button[data-loading] {
	opacity: 0.7;
	cursor: wait;
}

/*++ Error state */
.bend-form-field[data-error] input {
	border-color: #dc3545;
}

.bend-form-field[data-error] .help {
	color: #dc3545;
}
```

**Why data attributes?** More semantic than classes, easier to query in JavaScript.

### ARIA States

Style ARIA states when appropriate:

```css
.bend-disclosure-button[aria-expanded="false"]::after {
	content: "▼";
}

.bend-disclosure-button[aria-expanded="true"]::after {
	content: "▲";
}

.bend-tab[aria-selected="true"] {
	border-bottom: 3px solid var(--bend-color-primary, #007bff);
	font-weight: 700;
}

.bend-alert[aria-live="assertive"] {
	font-weight: 700;
}
```

---

## Pattern 7: Print Styles

**Rule:** Global print stylesheet + component-specific print styles.

### Global Print Stylesheet

Create `themes/print.css`:

```css
/*++
 + Global print styles
 + Remove web chrome, optimize typography, expand links
 */

@media print {
	/*++ Remove web chrome */
	nav,
	.bend-navigation,
	.bend-header,
	.bend-footer,
	.bend-sidebar,
	.bend-skip-links,
	.bend-breadcrumb {
		display: none !important;
	}

	/*++ Optimize typography for print */
	body {
		font-family: Georgia, 'Times New Roman', serif;
		font-size: 12pt;
		line-height: 1.5;
		color: #000;
		background: #fff;
	}

	h1 { font-size: 18pt; }
	h2 { font-size: 16pt; }
	h3 { font-size: 14pt; }
	h4, h5, h6 { font-size: 12pt; }

	/*++ Expand links with URL */
	a[href]::after {
		content: " (" attr(href) ")";
		font-size: 0.9em;
		color: #666;
	}

	/*++ Expand links with rel attribute */
	a[href][rel]::after {
		content: " (" attr(rel) ": " attr(href) ")";
	}

	/*++ Don't expand fragment links or javascript: links */
	a[href^="#"]::after,
	a[href^="javascript:"]::after {
		content: "";
	}

	/*++ Map common rel values to plain English */
	a[rel="external"]::after {
		content: " (external link: " attr(href) ")";
	}

	a[rel="nofollow"]::after {
		content: " (nofollow: " attr(href) ")";
	}

	a[rel="author"]::after {
		content: " (author: " attr(href) ")";
	}

	a[rel="license"]::after {
		content: " (license: " attr(href) ")";
	}

	/*++ Page breaks */
	h1, h2, h3, h4, h5, h6 {
		page-break-after: avoid;
		page-break-inside: avoid;
	}

	p, blockquote, pre, ul, ol, dl, table {
		page-break-inside: avoid;
	}

	/*++ Show URLs for images */
	img::after {
		content: " (image: " attr(src) ")";
		display: block;
		font-size: 0.8em;
		color: #666;
	}

	/*++ Ensure links are underlined */
	a {
		text-decoration: underline;
	}

	/*++ Show abbreviation expansions */
	abbr[title]::after {
		content: " (" attr(title) ")";
	}
}
```

### Component Print Styles

Add component-specific print styles when needed:

```css
/*++ buttons/Button/index.css */
@media print {
	.bend-button {
		border: 1px solid #000;
		padding: 0.25rem 0.5rem;
		background: transparent;
		color: #000;
	}
}

/*++ forms/TextField/index.css */
@media print {
	.bend-text-field input {
		border-bottom: 1px solid #000;
		border-top: none;
		border-left: none;
		border-right: none;
	}
}
```

### User Override Pattern

Users can override global print styles to keep web chrome:

```css
/*++ User stylesheet to keep navigation in print */
@media print {
	.bend-navigation,
	.bend-header,
	.bend-footer {
		display: block !important;
	}
}
```

---

## Pattern 8: Animations (Minimal)

**Rule:** Only for usability, always include reduced motion fallback.

### Acceptable Animations

Use animations only for:
- Focus indicator transitions
- Loading states
- Progressive disclosure (show/hide)
- State change feedback
- Smooth scrolling (via JavaScript enhancement)

**NOT acceptable:**
- Gratuitous effects
- Entrance animations
- Decorative animations
- Auto-playing animations
- Attention-seeking effects

### Animation Pattern

```css
.bend-button {
	/* No transition by default (IE11 + reduced motion users) */
	background: #007bff;
}

@supports (transition: all 0.2s) {
	.bend-button {
		transition: background-color 0.2s ease;
	}
}

@media (prefers-reduced-motion: reduce) {
	@supports (transition: all 0.2s) {
		.bend-button {
			transition: none;
		}
	}
}
```

**Three-layer approach:** No animation → animation in `@supports` → removed in `prefers-reduced-motion`.

### Loading States

```css
.bend-button[data-loading] {
	opacity: 0.7;
	cursor: wait;
}

.bend-button[data-loading]::after {
	content: "…";
}

/*++ Animated loading (with reduced motion fallback) */
@supports (animation: spin 1s linear infinite) {
	@keyframes spin {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}

	.bend-button[data-loading]::after {
		content: "";
		display: inline-block;
		width: 1em;
		height: 1em;
		border: 2px solid currentColor;
		border-right-color: transparent;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}
}

@media (prefers-reduced-motion: reduce) {
	@supports (animation: spin 1s linear infinite) {
		.bend-button[data-loading]::after {
			animation: none;
			content: "…";
		}
	}
}
```

### Progressive Disclosure

```css
.bend-disclosure-content {
	/* No transition by default */
	display: none;
}

.bend-disclosure-content[aria-hidden="false"] {
	display: block;
}

@supports (transition: all 0.2s) {
	.bend-disclosure-content {
		max-height: 0;
		overflow: hidden;
		transition: max-height 0.3s ease;
	}

	.bend-disclosure-content[aria-hidden="false"] {
		max-height: 1000px;
	}
}

@media (prefers-reduced-motion: reduce) {
	@supports (transition: all 0.2s) {
		.bend-disclosure-content {
			transition: none;
		}
	}
}
```

---

## Pattern 9: Property Ordering

**Rule:** Cascade order groups, alphabetical within groups.

### Cascade Groups (in order)

1. **Position:** `position`, `top`, `right`, `bottom`, `left`, `z-index`
2. **Display:** `display`, `visibility`, `opacity`
3. **Layout:** `flex-*`, `grid-*`, `float`, `clear`, `column-*`, `gap`
4. **Box Model:** `width`, `height`, `margin`, `padding`, `border`, `outline`
5. **Typography:** `font-*`, `line-height`, `text-*`, `letter-spacing`, `word-*`
6. **Colors:** `color`, `background-*`
7. **Other:** `cursor`, `overflow`, `transform`, `transition`, `animation`, `content`

### Property Ordering Example

```css
.bend-button {
	/* Position */
	position: relative;
	z-index: 1;

	/* Display */
	display: inline-block;
	opacity: 1;

	/* Box Model */
	border: 1px solid transparent;
	border-radius: 0.25rem;
	margin: 0.5rem;
	min-height: 48px;
	min-width: 48px;
	padding: 12px 24px;

	/* Typography */
	font-family: system-ui, sans-serif;
	font-size: 1rem;
	font-weight: 600;
	line-height: 1.5;
	text-align: center;
	text-decoration: none;

	/* Colors */
	background-color: #007bff;
	color: #fff;

	/* Other */
	cursor: pointer;
	transition: background-color 0.2s ease;
}
```

**Why this order?** Mirrors the CSS cascade: position affects layout, layout affects box model, box model affects typography, typography affects colors.

### Logical Properties (with Fallback)

Prefer logical properties but always provide fallback:

```css
.bend-element {
	/* IE11 fallback */
	margin-top: 1rem;
	margin-bottom: 1rem;
	padding-left: 1.5rem;
	padding-right: 1.5rem;

	/* Modern override (use if supported) */
	margin-block: var(--bend-space-m, 1rem);
	padding-inline: var(--bend-space-l, 1.5rem);
}
```

**Logical properties:** `*-block` (vertical), `*-inline` (horizontal), `*-start`, `*-end`.

---

## Pattern 10: Performance

**Rule:** Efficient selectors, never sacrifice accessibility or usability.

### Efficient Selectors

**Good selectors:**
- ✅ `.bend-button` (class)
- ✅ `.bend-navigation a` (class + tag)
- ✅ `.bend-form input[type="text"]` (class + tag + attribute)
- ✅ `.bend-list > li` (class + child combinator)

**Avoid:**
- ⚠️ `.bend-navigation > ul > li > a` (too specific, hard to override)
- ❌ `div.bend-button` (unnecessary tag, less flexible)
- ❌ `*` (universal selector in production)
- ❌ `[class^="bend-"]` (attribute selector for all bend classes)

### When to Ignore Performance

**Accessibility requirements trump performance:**

```css
/*++ Less performant but more accessible */
.bend-form input[type="text"]:focus-visible {
	outline: 2px solid var(--bend-focus-color, #0056b3);
	outline-offset: 2px;
}

/*++ More performant but less accessible */
.bend-form input:focus {
	outline: 2px solid var(--bend-focus-color, #0056b3);
}

/*++ Choose the first one - accessibility wins */
```

**Usability requirements trump performance:**

```css
/*++ More selectors but better usability */
.bend-button:hover,
.bend-button:focus,
.bend-button:active {
	background-color: var(--bend-button-hover-background-color, #0056b3);
}

/*++ Fewer selectors but worse usability */
.bend-button:hover {
	background-color: var(--bend-button-hover-background-color, #0056b3);
}

/*++ Choose the first one - usability wins */
```

### Optimization Checklist

**Do optimize:**
- Combine selectors when possible
- Use simple class selectors
- Minimize nesting depth
- Remove unused custom properties
- Use shorthand properties when appropriate

**Don't optimize:**
- At the expense of clarity
- At the expense of accessibility
- At the expense of maintainability
- By removing semantic HTML
- By sacrificing progressive enhancement

---

## Common Violations

### 1. Using BEM or Complex Class Naming

❌ **Wrong:**

```css
.bend-button__text--primary { }
.bend-form__field--error { }
.bend-card__header--large { }
```

✅ **Right:**

```css
.bend-button span { }
.bend-form-field[data-error] { }
.bend-card header { }
```

**Why:** BEM creates class soup, increases specificity, and makes HTML verbose. Tag selectors are simpler and more semantic.

### 2. Missing IE11 Fallbacks

❌ **Wrong:**

```css
.bend-button {
	color: var(--bend-button-color);
	padding: var(--bend-space-m);
}
```

✅ **Right:**

```css
.bend-button {
	/* IE11 fallback */
	color: #fff;
	padding: 1rem;

	/* Modern override */
	color: var(--bend-button-color, #fff);
	padding: var(--bend-space-m, 1rem);
}
```

**Why:** IE11 ignores `var()`, falls back to previous declaration.

### 3. Missing `@supports` Wrappers

❌ **Wrong:**

```css
.bend-container {
	display: flex;
	gap: 1rem;
}
```

✅ **Right:**

```css
.bend-container {
	/* IE11 fallback */
	overflow: hidden;
}

.bend-item {
	float: left;
	margin-right: 1rem;
}

@supports (display: flex) {
	.bend-container {
		display: flex;
		overflow: visible;
	}

	.bend-item {
		float: none;
		margin-right: 0;
	}
}

@supports (gap: 1rem) {
	.bend-container {
		gap: 1rem;
	}
}
```

**Why:** IE11 breaks with flexbox and doesn't support `gap` at all.

### 4. Insufficient Contrast

❌ **Wrong:**

```css
.bend-text {
	color: #888;  /* 3.5:1 on white - fails WCAG AA */
	background: #fff;
}
```

✅ **Right:**

```css
.bend-text {
	color: #595959;  /* 7:1 on white - passes WCAG AAA */
	background: #fff;
}

/*++ Also verify with APCA calculator */
```

**Why:** Default theme must pass both WCAG 2.1 AAA (7:1) and APCA standards.

### 5. Missing Focus States

❌ **Wrong:**

```css
.bend-button {
	outline: none;  /* Never do this! */
}
```

✅ **Right:**

```css
.bend-button:focus {
	outline: 2px solid var(--bend-focus-color, #0056b3);
	outline-offset: 2px;
}

@supports selector(:focus-visible) {
	.bend-button:focus:not(:focus-visible) {
		outline: none;
	}

	.bend-button:focus-visible {
		outline: 2px solid var(--bend-focus-color, #0056b3);
		outline-offset: 2px;
	}
}
```

**Why:** Focus states are required for keyboard navigation accessibility.

### 6. Fixed Breakpoints Without Exception Comment

❌ **Wrong:**

```css
@media (max-width: 768px) {
	.bend-navigation {
		display: none;
	}
}
```

✅ **Right:**

```css
/*++ [EXCEPTION] Breakpoint required for navigation toggle on mobile */
@media (width <= 768px) {
	.bend-navigation {
		display: none;
	}

	.bend-navigation-toggle {
		display: block;
	}
}
```

**Why:** Fixed breakpoints should be avoided in favor of fluid layouts, but when necessary, document why.

### 7. Missing Print Styles

❌ **Wrong:**

```css
/* No @media print rules */
```

✅ **Right:**

```css
@media print {
	.bend-button {
		border: 1px solid #000;
		background: transparent;
		color: #000;
	}
}
```

**Why:** Print is important. Global print stylesheet handles most cases, but components can add specific overrides.

### 8. Gratuitous Animations

❌ **Wrong:**

```css
.bend-button {
	animation: bounce 0.5s infinite;
}

@keyframes bounce {
	0%, 100% { transform: translateY(0); }
	50% { transform: translateY(-10px); }
}
```

✅ **Right:**

```css
.bend-button {
	/* No animation by default */
}

@supports (transition: all 0.2s) {
	.bend-button {
		transition: background-color 0.2s ease;
	}
}

@media (prefers-reduced-motion: reduce) {
	@supports (transition: all 0.2s) {
		.bend-button {
			transition: none;
		}
	}
}
```

**Why:** Only animate for usability, never for decoration. Always respect reduced motion preference.

### 9. Random Property Order

❌ **Wrong:**

```css
.bend-button {
	color: #fff;
	position: relative;
	padding: 1rem;
	display: inline-block;
	background: #007bff;
	font-size: 1rem;
	border: none;
}
```

✅ **Right:**

```css
.bend-button {
	/* Position */
	position: relative;

	/* Display */
	display: inline-block;

	/* Box Model */
	border: none;
	padding: 1rem;

	/* Typography */
	font-size: 1rem;

	/* Colors */
	background: #007bff;
	color: #fff;
}
```

**Why:** Consistent ordering improves readability and maintainability.

### 10. Missing Logical Property Fallbacks

❌ **Wrong:**

```css
.bend-element {
	padding-inline: 1rem;
	margin-block: 1.5rem;
}
```

✅ **Right:**

```css
.bend-element {
	/* IE11 fallback */
	margin-top: 1.5rem;
	margin-bottom: 1.5rem;
	padding-left: 1rem;
	padding-right: 1rem;

	/* Modern override */
	margin-block: var(--bend-space-l, 1.5rem);
	padding-inline: var(--bend-space-m, 1rem);
}
```

**Why:** IE11 doesn't support logical properties. Always provide physical property fallbacks.

---

## Examples

Complete working examples are in the `examples/` directory:

### Button Component

`examples/Button/index.css` - Complete button with:
- IE11 baseline styles
- Progressive enhancement
- Focus states
- Touch targets
- Reduced motion support
- Print styles

### TextField Component

`examples/TextField/index.css` - Form field with:
- Component-scoped naming
- State management (valid/invalid/touched)
- Accessibility features
- Custom properties

### Navigation Component

`examples/Navigation/index.css` - Responsive navigation with:
- Fluid layout (no fixed breakpoints)
- Mobile/desktop adaptation
- Keyboard navigation styles
- Progressive enhancement

### Theme File

`examples/theme-example.css` - Global theme with:
- Color palette (APCA + WCAG 2.1 AAA compliant)
- Typography scale
- Spacing scale
- Font stacks
- Documented contrast ratios

### Print Stylesheet

`examples/print-example.css` - Print styles with:
- Chrome removal
- Link expansion
- Typography optimization
- Page break control

### IE11 Compatibility Patterns

`examples/ie11-examples.css` - Common IE11 patterns:
- Float layouts with flexbox enhancement
- Custom property cascading
- Progressive enhancement patterns
- `@supports` usage

---

## Cross-References

**This skill references:**
- `abbreviations` - CSS class names avoid abbreviations unless whitelisted
- `naming` - Kebab-case for CSS class names
- `component` - Component structure and file organization
- `file-system-organization` - One CSS file per component folder

**Referenced by:**
- `component` - Component creation includes CSS scaffolding
- Any skill involving UI styling

---

## Generator Usage

Generate CSS scaffolding for new components:

```bash
deno task new:css ComponentName
```

The generator creates `ComponentName/index.css` with:
- Component class and custom properties
- Sub-element selectors (if specified)
- Accessibility boilerplate
- Print media query section
- Envoy comments

---

## Summary

**The 10 Patterns:**

1. **Component CSS Structure** - One `index.css` per folder, cascades from ancestors
2. **IE11 Baseline + Progressive Enhancement** - 2010 CSS + `@supports`
3. **Two-Level Custom Properties** - Global tokens + component properties
4. **Accessibility** - WCAG AAA (APCA + WCAG 2.1), focus, touch targets, reduced motion
5. **Responsive/Fluid** - Avoid breakpoints, fluid typography, exceptions documented
6. **State Management** - Pseudo-classes, data attributes
7. **Print Styles** - Global + component-specific, link expansion
8. **Animations** - Minimal, usability-focused, reduced motion fallbacks
9. **Property Ordering** - Cascade groups, alphabetical within
10. **Performance** - Efficient selectors, never sacrifice accessibility

**Key Constraints:**

- NO BEM
- IE11 baseline required
- Both APCA and WCAG 2.1 AAA contrast standards
- Fluid design preferred
- Minimal animations only
- Print is important
- Component-scoped naming
- Accessibility first, always
