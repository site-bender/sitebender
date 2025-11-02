# CSS Styling Skill - Detailed Implementation Plan

**Status:** Planning Complete - Ready for Implementation
**Last Updated:** 2025-11-02
**Context:** This plan captures all requirements from the architecture discussion

---

## Executive Summary

Create comprehensive CSS skill for Sitebender's Architect library with:
- Component-scoped CSS (`.bend-{component-name}` + tag selectors)
- IE11 baseline + progressive enhancement via `@supports`
- Two-level custom property theming system
- WCAG AAA (both APCA + WCAG 2.1) accessibility
- Fluid responsive design (avoid breakpoints)
- Comprehensive print styles
- Minimal animations with reduced motion fallbacks

---

## Core Architecture Decisions

### 1. Component CSS Structure

**File Organization:**
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

**Cascade Order:** Ancestor folders → parent folders → component folder (top-down)

**CSS Discovery:** `createElement` function discovers and links CSS automatically, generates deduplicated `<link>` tags in correct order

### 2. Naming Convention

**Single class per component:**
- Format: `.bend-{component-name}` (kebab-case)
- Examples: `.bend-submit-button`, `.bend-text-field`, `.bend-choose-one-field`

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
- NO BEM (user explicitly hates BEM)

### 3. IE11 Compatibility Strategy

**Baseline: 2010-era CSS**
- Floats for layout
- Inline-block for inline elements
- Positioning for complex layouts
- No flexbox (IE11 has buggy flexbox)
- No CSS Grid
- No custom properties

**Progressive Enhancement via `@supports`:**
```css
/* IE11 baseline */
.container {
  overflow: hidden; /* clearfix */
}

.item {
  float: left;
  width: 33.33%;
}

/* Modern: flexbox */
@supports (display: flex) {
  .container {
    display: flex;
    gap: 1rem;
    overflow: visible;
  }

  .item {
    float: none;  /* Reset float */
    width: auto;  /* Reset width */
    flex: 1;
  }
}

/* Even more modern: grid */
@supports (display: grid) {
  .container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .item {
    flex: unset;  /* Reset flex */
  }
}
```

**Custom Properties Don't Need `@supports`:**
```css
.button {
  /* IE11 uses this */
  color: #000;
  /* Modern browsers override with this (IE11 ignores invalid var()) */
  color: var(--button-color, #000);
}
```

**Features Requiring `@supports`:**
- `display: flex` (and all flex properties)
- `display: grid` (and all grid properties)
- `gap` property
- Logical properties (`padding-inline`, `margin-block`, etc.)
- `clamp()`, `min()`, `max()` (calc has partial IE11 support)
- `aspect-ratio`
- Modern selectors (`:is()`, `:where()`, `:has()`)
- `fit-content`, `min-content`, `max-content`
- Transform/transition (has partial support but buggy)
- Modern color functions

### 4. Two-Level Custom Property System

**Level 1: Global Semantic Tokens** (in `themes/default/index.css`)
```css
:root {
  /* Colors */
  --bend-color-primary: #007bff;
  --bend-color-secondary: #6c757d;
  --bend-color-tertiary: #28a745;
  --bend-color-interactive: #0056b3;
  --bend-color-error: #dc3545;
  --bend-color-warning: #ffc107;
  --bend-color-success: #28a745;

  /* Typography */
  --bend-font-sans: system-ui, -apple-system, sans-serif;
  --bend-font-serif: Georgia, serif;
  --bend-font-mono: 'Courier New', monospace;

  /* Sizes (fluid/clamped) */
  --bend-size-1: clamp(0.75rem, 0.5vw + 0.625rem, 1rem);
  --bend-size-2: clamp(1rem, 0.75vw + 0.8125rem, 1.5rem);
  --bend-size-3: clamp(1.25rem, 1vw + 1rem, 2rem);
  --bend-size-4: clamp(1.5rem, 1vw + 1rem, 2rem);
  --bend-size-5: clamp(2rem, 1.5vw + 1.5rem, 3rem);

  /* Spacing */
  --bend-space-xs: 0.25rem;
  --bend-space-s: 0.5rem;
  --bend-space-m: 1rem;
  --bend-space-l: 1.5rem;
  --bend-space-xl: 2rem;
}
```

**Level 2: Component-Specific Properties** (in component CSS)
```css
:root {
  --bend-h1-font-size: var(--bend-size-4, 2rem);
  --bend-h1-color: var(--bend-color-primary, #007bff);
  --bend-submit-button-bg: var(--bend-color-tertiary, #28a745);
  --bend-submit-button-color: #fff;
}

.bend-header h1 {
  font-size: var(--bend-h1-font-size);
  color: var(--bend-h1-color);
}
```

**Override Strategy:**
Users can override at EITHER level:
1. Override global tokens: `:root { --bend-color-primary: red; }`
2. Override component properties: `:root { --bend-h1-font-size: 3rem; }`

**Why Two Levels:**
- Prevents loading thousands of unused component properties
- Centralizes design tokens
- Allows granular component overrides
- Pages only load CSS for components they use

---

## The 10 Patterns

### Pattern 1: Component CSS Structure

**Rule:** One `index.css` per component folder, cascades from ancestor folders

**File Location:**
- Component: `ComponentName/index.css`
- Co-located with: `ComponentName/index.ts`

**Cascade Order:**
1. Module CSS: `buttons/index.css`
2. Parent CSS: `buttons/Button/index.css`
3. Component CSS: `buttons/Button/SubmitButton/index.css`

**Class Naming:**
- Single component class: `.bend-component-name`
- Sub-element selectors: `.bend-component-name tagName`
- State selectors: `.bend-component-name tagName:state`
- Data attributes: `.bend-component-name tagName[data-touched]`

**Example:**
```css
/* buttons/Button/SubmitButton/index.css */
.bend-submit-button {
  /* IE11 baseline */
  padding: 0.5rem 1rem;
  background: #28a745;
  color: #fff;

  /* Modern override */
  padding: var(--bend-space-s) var(--bend-space-m);
  background-color: var(--bend-submit-button-bg, #28a745);
  color: var(--bend-submit-button-color, #fff);
}

@supports (border-radius: 0.25rem) {
  .bend-submit-button {
    border-radius: 0.25rem;
  }
}
```

---

### Pattern 2: IE11 Baseline + Progressive Enhancement

**Rule:** Write 2010-era CSS first, enhance with `@supports`

**IE11 Baseline Techniques:**
- **Layout:** Floats, inline-block, positioning
- **Spacing:** Fixed/percentage margins and padding
- **Typography:** Fixed sizes or percentages
- **Colors:** Hex values only

**Modern Enhancements:**
```css
/* IE11 baseline: float layout */
.container {
  overflow: hidden;
}

.item {
  float: left;
  width: 50%;
}

/* Modern: flexbox */
@supports (display: flex) {
  .container {
    display: flex;
    overflow: visible;
  }

  .item {
    float: none;
    width: auto;
    flex: 1;
  }
}

@supports (gap: 1rem) {
  .container {
    gap: 1rem;
  }
}
```

**When `@supports` is NOT needed:**
- Custom properties (use cascade)
- Border-radius (supported but can wrap for clarity)
- Box-shadow (supported)
- Opacity (supported)

**When `@supports` IS needed:**
- Layout changes (flex, grid)
- New properties that conflict with fallback
- Properties that change document flow

**IE11 Compatibility Matrix:**

| Feature | IE11 Support | Strategy |
|---------|--------------|----------|
| Flexbox | Buggy (old spec) | Avoid, use floats |
| Grid | No | Wrap in `@supports (display: grid)` |
| Custom properties | No | Use cascade (hard-coded → var() override) |
| `gap` | No | Wrap in `@supports (gap: 1rem)` |
| Logical properties | No | Wrap in `@supports` |
| `clamp()` | No | Wrap in `@supports` |
| `calc()` | Partial | Test carefully, provide fallback |
| Border-radius | Yes | Can use directly or wrap for clarity |
| Transform | Buggy | Wrap in `@supports`, test thoroughly |
| Transition | Buggy | Wrap in `@supports`, test thoroughly |
| `:is()`, `:where()`, `:has()` | No | Avoid or provide fallback selectors |

---

### Pattern 3: Two-Level Custom Properties

**Rule:** Global tokens + component properties

**Global Theme File:** `themes/default/index.css`
```css
:root {
  /* Color Palette */
  --bend-color-primary: #007bff;
  --bend-color-secondary: #6c757d;
  --bend-color-tertiary: #28a745;

  /* Typography Scale */
  --bend-size-1: clamp(0.75rem, 0.5vw + 0.625rem, 1rem);
  --bend-size-2: clamp(1rem, 0.75vw + 0.8125rem, 1.5rem);
  --bend-size-3: clamp(1.25rem, 1vw + 1rem, 2rem);

  /* Spacing Scale */
  --bend-space-xs: 0.25rem;
  --bend-space-s: 0.5rem;
  --bend-space-m: 1rem;

  /* Font Stacks */
  --bend-font-sans: system-ui, -apple-system, sans-serif;
  --bend-font-serif: Georgia, serif;
}
```

**Component CSS:**
```css
:root {
  /* Reference global tokens */
  --bend-button-bg: var(--bend-color-primary, #007bff);
  --bend-button-color: #fff;
  --bend-button-padding: var(--bend-space-m, 1rem);
}

.bend-button {
  /* IE11 fallback */
  padding: 1rem;
  background: #007bff;
  color: #fff;

  /* Modern override */
  padding: var(--bend-button-padding);
  background-color: var(--bend-button-bg);
  color: var(--bend-button-color);
}
```

**Override in User Stylesheet:**
```css
/* Override global token (affects all buttons) */
:root {
  --bend-color-primary: #ff0000;
}

/* Override component property (affects specific button type) */
:root {
  --bend-button-bg: #00ff00;
}
```

---

### Pattern 4: Accessibility (WCAG AAA + APCA)

**Rule:** Default theme must meet BOTH contrast standards

**Contrast Requirements:**
- **APCA (Preferred):** Use latest APCA calculator
- **WCAG 2.1 AAA (Legacy):** Must also pass for compatibility
  - Normal text: 7:1
  - Large text (18pt+ or 14pt+ bold): 4.5:1
- User overrides are their responsibility (we provide warnings)

**Focus States (Mandatory):**
```css
.bend-button:focus {
  /* IE11 fallback */
  outline: 2px solid #0056b3;
  outline-offset: 2px;

  /* Modern */
  outline: 2px solid var(--bend-focus-color, #0056b3);
  outline-offset: var(--bend-focus-offset, 2px);
}
```

**Touch Targets:**
- **Minimum:** 48×48px (WCAG 2.2 Level AAA)
- **Can be less height if wider** (e.g., 36×64px acceptable)
- Follow WCAG 2.2 guidelines exactly

```css
.bend-button {
  min-height: 48px;
  min-width: 48px;
}
```

**Reduced Motion:**
```css
@supports (transition: all 0.2s) {
  .bend-button {
    transition: all 0.2s ease;
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

**High Contrast Mode:**
```css
@media (forced-colors: active) {
  .bend-button {
    border: 2px solid ButtonText;
  }

  .bend-button:focus {
    outline: 2px solid Highlight;
  }
}
```

**Dark Mode:**
```css
:root {
  --bend-bg-color: #fff;
  --bend-text-color: #000;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bend-bg-color: #000;
    --bend-text-color: #fff;
  }
}
```

---

### Pattern 5: Responsive/Fluid Design

**Rule:** Avoid fixed breakpoints, prefer fluid layouts

**Fluid Typography:**
```css
.bend-heading {
  /* IE11 fallback */
  font-size: 2rem;
}

@supports (font-size: clamp(1rem, 1vw, 3rem)) {
  .bend-heading {
    font-size: clamp(1.5rem, 1vw + 1rem, 3rem);
  }
}
```

**Multi-Column Reflow:**
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

**Breakpoints (Exception Pattern):**
```css
/*++ [EXCEPTION] Breakpoint required for navigation menu mobile/desktop toggle */
@media (width <= 768px) {
  .bend-nav-menu {
    display: none;
  }

  .bend-nav-toggle {
    display: block;
  }
}
```

**Container Queries (When Justified):**
```css
/*++ Container query justified: sidebar component needs different layout based on container width, not viewport */
@supports (container-type: inline-size) {
  .bend-sidebar {
    container-type: inline-size;
  }

  @container (min-width: 400px) {
    .bend-sidebar-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
}
```

---

### Pattern 6: State Management

**Rule:** Use pseudo-classes and data attributes for states

**Interactive States:**
```css
.bend-button {
  /* Default state */
}

.bend-button:hover {
  /* IE11 fallback */
  background: #0056b3;
  /* Modern */
  background-color: var(--bend-button-hover-bg, #0056b3);
}

.bend-button:focus {
  outline: 2px solid var(--bend-focus-color, #0056b3);
  outline-offset: 2px;
}

.bend-button:active {
  transform: translateY(1px);
}

.bend-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

**Data Attribute States:**
```css
.bend-text-field input[type="text"] {
  border: 1px solid #ccc;
}

.bend-text-field input[data-touched]:valid {
  border-color: #28a745;
}

.bend-text-field input[data-touched]:invalid {
  border: 2px dashed #dc3545;
}

.bend-text-field input:focus:not([data-touched]) {
  border-color: #007bff;
}
```

---

### Pattern 7: Print Styles

**Rule:** Global print stylesheet + component-specific print styles

**Global Print Stylesheet:** `themes/print.css`
```css
@media print {
  /* Remove web chrome */
  nav,
  .bend-nav,
  .bend-header,
  .bend-footer,
  .bend-sidebar,
  .bend-skip-links {
    display: none !important;
  }

  /* Optimize typography for print */
  body {
    font-family: Georgia, serif;
    font-size: 12pt;
    line-height: 1.5;
    color: #000;
    background: #fff;
  }

  /* Expand links */
  a[href]::after {
    content: " (" attr(href) ")";
    font-size: 0.9em;
    color: #666;
  }

  /* Expand links with rel attribute */
  a[href][rel]::after {
    content: " (" attr(rel) ": " attr(href) ")";
  }

  /* Don't expand fragment links or javascript: links */
  a[href^="#"]::after,
  a[href^="javascript:"]::after {
    content: "";
  }

  /* Map common rel values to plain English */
  a[rel="external"]::after {
    content: " (external link: " attr(href) ")";
  }

  a[rel="nofollow"]::after {
    content: " (nofollow: " attr(href) ")";
  }

  /* Page breaks */
  h1, h2, h3, h4, h5, h6 {
    page-break-after: avoid;
  }

  p, blockquote, pre, ul, ol {
    page-break-inside: avoid;
  }

  /* Show URLs for images */
  img::after {
    content: " (image: " attr(src) ")";
    display: block;
    font-size: 0.8em;
    color: #666;
  }
}
```

**Component Print Styles:**
```css
/* buttons/Button/index.css */
@media print {
  .bend-button {
    border: 1px solid #000;
    padding: 0.25rem 0.5rem;
  }
}
```

**User Override Pattern:**
```css
/* User stylesheet to keep chrome */
@media print {
  .bend-nav,
  .bend-header,
  .bend-footer {
    display: block !important;
  }
}
```

---

### Pattern 8: Animations (Minimal)

**Rule:** Only for usability, always include reduced motion fallback

**Acceptable Animations:**
- Focus indicator transitions
- Loading states
- Progressive disclosure
- Smooth scrolling (via JS enhancement only)

**NOT Acceptable:**
- Gratuitous effects
- Entrance animations
- Decorative animations
- Auto-playing animations

**Pattern:**
```css
.bend-button {
  /* No transition by default (IE11 + reduced motion users) */
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

---

### Pattern 9: Property Ordering

**Rule:** Cascade order groups, alphabetical within groups

**Cascade Groups (in order):**
1. **Position:** `position`, `top`, `right`, `bottom`, `left`, `z-index`
2. **Display:** `display`, `visibility`, `opacity`
3. **Layout:** `flex-*`, `grid-*`, `float`, `clear`, `column-*`
4. **Box Model:** `width`, `height`, `margin`, `padding`, `border`, `outline`
5. **Typography:** `font-*`, `line-height`, `text-*`, `letter-spacing`, `word-*`
6. **Colors:** `color`, `background-*`
7. **Other:** `cursor`, `overflow`, `transform`, `transition`, `animation`

**Alphabetical Within Groups:**
```css
.bend-button {
  /* Position */
  position: relative;
  z-index: 1;

  /* Display */
  display: inline-block;

  /* Box Model */
  border: 1px solid #ccc;
  margin: 0.5rem;
  padding: 0.5rem 1rem;

  /* Typography */
  font-family: sans-serif;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;

  /* Colors */
  background-color: #007bff;
  color: #fff;

  /* Other */
  cursor: pointer;
}
```

**Logical Properties Preferred (but IE11 fallback required):**
```css
.bend-element {
  /* IE11 fallback */
  margin-top: 1rem;
  margin-bottom: 1rem;

  /* Modern override */
  margin-block-start: var(--bend-space-m);
  margin-block-end: var(--bend-space-m);
}
```

---

### Pattern 10: Performance

**Rule:** Efficient selectors, never sacrifice accessibility/usability

**Efficient Selectors:**
- ✅ `.bend-button` (class)
- ✅ `.bend-nav a` (class + tag)
- ✅ `.bend-form input[type="text"]` (class + tag + attribute)
- ⚠️ `.bend-nav > ul > li > a` (too specific, hard to override)
- ❌ `div.bend-button` (unnecessary tag)
- ❌ `*` (universal selector - avoid in production)

**When to Ignore Performance:**
- Accessibility requirements trump performance
- Usability requirements trump performance
- Correct rendering trumps micro-optimizations

**Example:**
```css
/* Less performant but more accessible */
.bend-form input[type="text"]:focus-visible {
  outline: 2px solid var(--bend-focus-color);
}

/* More performant but less accessible */
.bend-form input:focus {
  outline: 2px solid var(--bend-focus-color);
}

/* Choose the first one - accessibility wins */
```

---

## Common Violations

1. **Using BEM or complex class naming**
   - ❌ Wrong: `.bend-button__text--primary`
   - ✅ Right: `.bend-button`, `.bend-button span`

2. **Missing IE11 fallbacks**
   - ❌ Wrong: `color: var(--button-color);` (no fallback)
   - ✅ Right: `color: #000; color: var(--button-color, #000);`

3. **Missing `@supports` wrappers**
   - ❌ Wrong: `display: flex;` (breaks IE11 layout)
   - ✅ Right: IE11 fallback + `@supports (display: flex) { }`

4. **Insufficient contrast**
   - ❌ Wrong: `#888 on #fff` (only 3.5:1)
   - ✅ Right: `#666 on #fff` (7:1 for AAA)
   - ✅ Also verify APCA passes

5. **Missing focus states**
   - ❌ Wrong: No `:focus` styles
   - ✅ Right: High contrast focus outline with offset

6. **Fixed breakpoints without exception comment**
   - ❌ Wrong: `@media (max-width: 768px) { }`
   - ✅ Right: `/*++ [EXCEPTION] ... */ @media (width <= 768px) { }`

7. **Missing print styles**
   - ❌ Wrong: No `@media print` rules
   - ✅ Right: Global print stylesheet + component overrides

8. **Gratuitous animations**
   - ❌ Wrong: Entrance animations, bouncing effects
   - ✅ Right: Only functional transitions with reduced motion fallback

9. **Random property order**
   - ❌ Wrong: Properties in random order
   - ✅ Right: Cascade groups, alphabetical within groups

10. **Properties without fallbacks for IE11**
    - ❌ Wrong: `padding-inline: 1rem;` (no fallback)
    - ✅ Right: `padding-left: 1rem; padding-right: 1rem; padding-inline: var(--bend-space-m);`

---

## Generator Requirements

### Input: CSSConfig

```typescript
type CSSConfig = {
	readonly componentName: string          // PascalCase
	readonly className: string              // kebab-case (auto-generated from componentName)
	readonly subElements?: ReadonlyArray<{
		readonly tagName: string
		readonly selector?: string          // Optional additional selector
		readonly states?: ReadonlyArray<string>  // hover, focus, active, etc.
	}>
	readonly includeAccessibility?: boolean // Default: true
	readonly includeResponsive?: boolean    // Default: true
	readonly includePrint?: boolean         // Default: true
}
```

### Output: CSS Scaffold

**Generated file:** `ComponentName/index.css`

**Includes:**
1. Component class with IE11 fallback + custom property structure
2. Sub-element selectors
3. Accessibility boilerplate (focus states, touch targets, reduced motion)
4. Print media query section
5. Envoy comments explaining each section

**Example Generated CSS:**

```css
/*++
 + ComponentName styles
 + Generated by css-styling generator
 */

/*++ Component variables */
:root {
	--bend-component-name-bg: var(--bend-color-primary, #007bff);
	--bend-component-name-color: #fff;
	--bend-component-name-padding: var(--bend-space-m, 1rem);
}

/*++ Component base styles */
.bend-component-name {
	/* IE11 fallback */
	padding: 1rem;
	background: #007bff;
	color: #fff;

	/* Modern override */
	padding: var(--bend-component-name-padding);
	background-color: var(--bend-component-name-bg);
	color: var(--bend-component-name-color);
}

/*++ Sub-element styles */
.bend-component-name label {
	display: block;
	margin-bottom: 0.5rem;
	font-weight: 600;
}

.bend-component-name input {
	width: 100%;
	padding: 0.5rem;
	border: 1px solid #ccc;
}

/*++ Accessibility: Focus states */
.bend-component-name:focus {
	outline: 2px solid var(--bend-focus-color, #0056b3);
	outline-offset: 2px;
}

/*++ Accessibility: Touch targets */
.bend-component-name {
	min-height: 48px;
	min-width: 48px;
}

/*++ Accessibility: Reduced motion */
@media (prefers-reduced-motion: reduce) {
	.bend-component-name {
		transition: none;
	}
}

/*++ Print styles */
@media print {
	.bend-component-name {
		/* Print-optimized styles */
	}
}
```

---

## File Structure

```
.claude/skills/css-styling/
├── PLAN.md (this file)
├── skill.md (~1000-1400 lines)
│   ├── Core Principle
│   ├── When to Use This Skill
│   ├── Pattern 1: Component CSS Structure
│   ├── Pattern 2: IE11 Baseline + Progressive Enhancement
│   ├── Pattern 3: Two-Level Custom Properties
│   ├── Pattern 4: Accessibility (WCAG AAA + APCA)
│   ├── Pattern 5: Responsive/Fluid Design
│   ├── Pattern 6: State Management
│   ├── Pattern 7: Print Styles
│   ├── Pattern 8: Animations (Minimal)
│   ├── Pattern 9: Property Ordering
│   ├── Pattern 10: Performance
│   ├── Common Violations
│   ├── Examples
│   └── Cross-References
├── types.ts
│   ├── CSSConfig type
│   ├── SubElement type
│   └── Supporting types
├── generator.ts
│   ├── generateCSS function (takes CSSConfig, returns CSS string)
│   ├── generateComponentStyles function
│   ├── generateSubElementStyles function
│   ├── generateAccessibilityStyles function
│   ├── generatePrintStyles function
│   └── All functions curried, no loops, no mutations
├── script.ts
│   ├── CLI interface
│   ├── Parse config file or command-line args
│   ├── Call generator
│   ├── Write CSS file
│   └── Report success/errors
└── examples/
    ├── Button/
    │   └── index.css (complete button example)
    ├── TextField/
    │   └── index.css (complete form field example)
    ├── Navigation/
    │   └── index.css (responsive navigation example)
    ├── theme-example.css (global theme file example)
    ├── print-example.css (print stylesheet example)
    └── ie11-examples.css (IE11 compatibility patterns)
```

**Also Create:**
```
themes/
└── default/
    └── index.css (global theme with APCA + WCAG 2.1 AAA compliant colors)
```

---

## Implementation Checklist

### Phase 1: Research ✅
- [x] Query MCP servers
- [x] Review accessibility rules
- [x] Confirm architecture with user

### Phase 2: Documentation
- [ ] Write skill.md (1000-1400 lines)
  - [ ] Core Principle section
  - [ ] When to Use section
  - [ ] All 10 patterns with examples
  - [ ] IE11 compatibility matrix
  - [ ] APCA + WCAG 2.1 AAA guidance
  - [ ] Common violations section
  - [ ] Examples section
  - [ ] Cross-references section

### Phase 3: Types
- [ ] Create types.ts
  - [ ] CSSConfig type
  - [ ] SubElement type
  - [ ] Supporting types
  - [ ] Verify all types follow constitutional rules

### Phase 4: Generator
- [ ] Create generator.ts
  - [ ] generateCSS (main function)
  - [ ] generateComponentStyles
  - [ ] generateSubElementStyles
  - [ ] generateAccessibilityStyles
  - [ ] generatePrintStyles
  - [ ] All functions curried
  - [ ] No loops (use map/reduce from Toolsmith)
  - [ ] No mutations
  - [ ] No arrow functions
  - [ ] Return Result monad for errors

### Phase 5: CLI Script
- [ ] Create script.ts
  - [ ] Parse config file
  - [ ] Call generator
  - [ ] Write CSS file
  - [ ] Handle errors
  - [ ] All functions curried
  - [ ] Constitutional rules compliant

### Phase 6: Examples
- [ ] Create examples/Button/index.css
- [ ] Create examples/TextField/index.css
- [ ] Create examples/Navigation/index.css
- [ ] Create examples/theme-example.css
- [ ] Create examples/print-example.css
- [ ] Create examples/ie11-examples.css

### Phase 7: Theme File
- [ ] Create themes/default/index.css
  - [ ] Color palette (APCA + WCAG 2.1 AAA compliant)
  - [ ] Typography scale
  - [ ] Spacing scale
  - [ ] Font stacks
  - [ ] Test all color combinations
  - [ ] Document contrast ratios

### Phase 8: Integration
- [ ] Update deno.jsonc
  - [ ] Add `new:css` task
  - [ ] Or integrate with `new:component`

### Phase 9: Verification
- [ ] Run constitutional verification
  - [ ] No classes
  - [ ] No mutations
  - [ ] No loops
  - [ ] No exceptions
  - [ ] No arrow functions
  - [ ] One function per file
  - [ ] All functions curried

### Phase 10: Testing
- [ ] Test generator with sample components
- [ ] Verify generated CSS is valid
- [ ] Test IE11 compatibility (if possible)
- [ ] Run linting

---

## Key Reminders

1. **NO BEM** - User explicitly hates BEM
2. **IE11 baseline** - 2010-era CSS only
3. **Both contrast standards** - APCA + WCAG 2.1 AAA
4. **Fluid design** - Avoid breakpoints (exceptions allowed with comment)
5. **Minimal animations** - Only for usability
6. **Print is important** - Link expansion, chrome removal
7. **Component-scoped** - Single class + tag selectors
8. **Two-level properties** - Global tokens + component properties
9. **Constitutional rules** - No loops, mutations, arrow functions, etc.
10. **Accessibility first** - Never compromise for performance

---

## Notes

- This skill documents the INTENDED architecture (future state)
- Some features (createElement CSS discovery) not yet implemented
- Skill documents how it WILL work when complete
- Generator is standalone but can integrate with component generator later
- Print stylesheet is global but components can add print styles
- Theme file must be manually maintained (APCA + WCAG 2.1 AAA is non-negotiable)
- User will likely ignore contrast warnings and break accessibility - not our problem

---

## Questions for Next Session

None - architecture complete, ready for implementation.

---

**End of Plan**
