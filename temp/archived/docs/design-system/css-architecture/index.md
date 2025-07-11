# CSS Architecture

Progressive enhancement CSS organization, naming conventions, and structural patterns built entirely with W3C standard CSS3/4 features using @supports queries for universal compatibility.

## Philosophy

**Pure CSS Excellence**: Our CSS architecture uses only W3C standard CSS features with 95%+ browser support, leveraging progressive enhancement through @supports queries, custom properties, and modern layout techniques without any preprocessing or frameworks.

### Vanilla CSS Principles

- **🚫 No Preprocessing**: No SCSS, LESS, Stylus, or any CSS compilation
- **🚫 No CSS-in-JS**: No styled-components, Emotion, or runtime CSS generation
- **🚫 No Frameworks**: No Tailwind, Bootstrap, or utility-first approaches
- **🚫 No CSS Layers**: CSS Layers were abandoned due to complexity and browser compatibility issues
- **✅ Pure CSS**: Only standard CSS3/4 features in vanilla `.css` files
- **✅ Modern Standards**: @supports queries, custom properties, grid, flexbox
- **✅ Progressive Enhancement**: Modern features added gracefully on top of universal base styles

## Progressive Enhancement Architecture

**Universal Foundation**: CSS architecture uses progressive enhancement to ensure all functionality works in every CSS-capable browser, then adds modern features through @supports queries for enhanced experiences.

### Cascade Order Strategy

Stylesheets load in a specific order to ensure predictable results:

```
Loading Order:
1. Reset           → Browser normalization
2. Root Tokens     → Design system variables  
3. Base Elements   → Semantic HTML styling
4. Components      → Component-specific styles (generic to specific)
5. Utilities       → Override and utility classes
```

**Cascade Precedence:**
- Later stylesheets override earlier ones
- More specific selectors override general ones
- Proper source order eliminates specificity conflicts
- Component styles load from generic to specific

### Why This Approach?

**Traditional CSS Problems:**
- Specificity wars and `!important` cascades
- Load order dependency for style precedence
- Difficulty predicting which styles will apply
- Fear of changing CSS due to unintended side effects

**Progressive Enhancement Solution:**
- Predictable cascade behavior through source order
- Universal base styles with enhanced modern features
- Safe refactoring and style updates
- Clear architectural boundaries

## Root Token Architecture

### Design Token Organization

```
root/
├── colors/index.css    # Color system and semantic tokens
├── fonts/index.css     # Typography tokens and font stacks  
├── sizing/index.css    # Layout dimensions and component sizes
└── spacing/index.css   # Margin, padding, and gap values
```

### Progressive Enhancement Token Structure

```css
/* colors/index.css */
:root {
  /* Base colors - work everywhere */
  --primary-blue: #1e40af;
  --dark-gray: #374151;
  --light-gray: #f3f4f6;
}

/* Enhanced colors for modern browsers */
@supports (--custom: property) {
  :root {
    /* Modern color spaces with fallbacks */
    --primary-blue-hsl: 220 90% 50%;
    --primary-blue-oklch: 65% 0.2 250;
    
    /* Semantic color assignments */
    --color-primary: var(--primary-blue);
    --color-text-body: var(--dark-gray);
    --color-background: var(--light-gray);
  }
}
```

**Progressive Enhancement Strategy:**
- Base hex colors for universal browser support
- CSS custom properties for supporting browsers (97%+ support)
- Modern color spaces for wide-gamut displays
- Semantic naming for consistent usage

### Typography Token Structure

```css
/* fonts/index.css */
/* Base font stacks - work everywhere */
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

/* Enhanced typography for modern browsers */
@supports (--custom: property) {
  :root {
    --font-family-sans: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
    --font-family-serif: "Crimson Pro", Georgia, serif;
    --font-size-base: 1rem;
    --line-height-normal: 1.5;
  }
  
  body {
    font-family: var(--font-family-sans);
    font-size: var(--font-size-base);
    line-height: var(--line-height-normal);
  }
}
```

## Component Architecture

### Component CSS Patterns

```css
/* Example: Button component styling */
.button {
  /* Base styles - work everywhere */
  display: inline-block;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border: 1px solid #007bff;
  font-family: Arial, sans-serif;
  cursor: pointer;
}

.button:hover {
  background-color: #0056b3;
}

/* Enhanced styles for modern browsers */
@supports (--custom: property) {
  .button {
    background-color: var(--color-primary);
    color: var(--color-on-primary);
    border-color: var(--color-primary);
    font-family: var(--font-family-ui);
    padding: var(--spacing-sm) var(--spacing-md);
  }
  
  .button:hover {
    background-color: var(--color-primary-hover);
  }
}

@supports (border-radius: 4px) {
  .button {
    border-radius: var(--border-radius-base);
  }
}

@supports (transition: all 0.2s) {
  .button {
    transition: background-color 0.2s ease;
  }
}

@supports (display: flex) {
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
}
```

### Component Naming Conventions

```css
/* Component base class */
.text-field { }

/* Component variants */
.text-field--large { }
.text-field--error { }

/* Component states */
.text-field.is-focused { }
.text-field.is-disabled { }

/* Component elements */
.text-field__label { }
.text-field__input { }
.text-field__help-text { }
```

## Base Element Architecture

### Element-Level Styling

```css
/* Base element styles - work everywhere */
h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  line-height: 1.25;
  margin: 0 0 16px 0;
}

p {
  line-height: 1.5;
  margin: 0 0 16px 0;
}

a {
  color: #007bff;
  text-decoration: underline;
}

a:hover {
  color: #0056b3;
}

/* Enhanced styles for modern browsers */
@supports (--custom: property) {
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-tight);
    margin: 0 0 var(--spacing-sm) 0;
  }
  
  p {
    font-family: var(--font-body);
    line-height: var(--line-height-normal);
    margin: 0 0 var(--spacing-md) 0;
  }
  
  a {
    color: var(--color-link);
  }
  
  a:hover {
    color: var(--color-link-hover);
  }
}
```

## Utility Class Architecture

### Override and Helper Classes

```css
/* Base utility classes - work everywhere */
.hidden { display: none; }
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

/* Spacing utilities with fallbacks */
.mt-0 { margin-top: 0; }
.mt-1 { margin-top: 8px; }
.mt-2 { margin-top: 16px; }

/* Enhanced utilities for modern browsers */
@supports (--custom: property) {
  .mt-xs { margin-top: var(--spacing-xs); }
  .mt-sm { margin-top: var(--spacing-sm); }
  .mt-md { margin-top: var(--spacing-md); }
  .mt-lg { margin-top: var(--spacing-lg); }
  
  .text-primary { color: var(--color-primary); }
  .text-secondary { color: var(--color-secondary); }
  .bg-surface { background-color: var(--color-surface); }
}

/* Screen reader only utility */
.sr-only { 
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}
```

## Build System Integration

### Automatic CSS Generation

```
Build Process:
1. Static styles (static/styles/) copied to dist/
2. Component styles discovered recursively
3. CSS files compiled and included in HTML
4. Cascade order maintained across all pages
```

### Development Workflow

```bash
# Development server watches for CSS changes
deno run -A scripts/dev/index.ts

# Changes to any CSS file trigger:
# 1. Re-compilation of affected styles
# 2. Browser refresh with updated styles
# 3. Cascade order validation
```

## Performance Considerations

### CSS Loading Strategy

```html
<!-- Critical styles loaded synchronously in proper order -->
<link rel="stylesheet" href="/styles/reset/index.css">
<link rel="stylesheet" href="/styles/root/colors/index.css">
<link rel="stylesheet" href="/styles/root/fonts/index.css">
<link rel="stylesheet" href="/styles/root/sizing/index.css">
<link rel="stylesheet" href="/styles/root/spacing/index.css">
<link rel="stylesheet" href="/styles/base/index.css">

<!-- Component styles loaded based on page needs -->
<link rel="stylesheet" href="/styles/components/forms/text-field/index.css">
<link rel="stylesheet" href="/styles/components/buttons/button/index.css">

<!-- Utilities loaded last -->
<link rel="stylesheet" href="/styles/utilities/index.css">
```

### Optimization Benefits

- **Minimal specificity** reduces cascade complexity
- **Token-based values** enable better compression and caching
- **Component isolation** allows for code splitting and lazy loading
- **Progressive enhancement** provides graceful degradation
- **Utility classes** reduce need for custom CSS

## Browser Support

### @supports Query Support

**@supports supported in:**
- Chrome 28+, Firefox 22+, Safari 9+, IE 12+
- 97.49% global browser support

**Fallback Strategy:**
```css
/* Base functionality works everywhere */
.component {
  /* Essential styles that work without @supports */
}

/* Enhanced functionality for supporting browsers */
@supports (property: value) {
  .component {
    /* Modern enhancements */
  }
}
```

### Key @supports Patterns

```css
/* CSS Custom Properties (97.66% support) */
@supports (--custom: property) { }

/* Flexbox (98.68% support) */  
@supports (display: flex) { }

/* CSS Grid (96.61% support) */
@supports (display: grid) { }

/* Border radius (98.86% support) */
@supports (border-radius: 1px) { }

/* Box shadow (98.69% support) */
@supports (box-shadow: 0 0 1px) { }

/* Transforms (98.25% support) */
@supports (transform: scale(1)) { }

/* Transitions (98.88% support) */
@supports (transition: all 0.1s) { }
```

## Development Guidelines

### Writing Component Styles

```css
/* ✅ Good: Progressive enhancement pattern */
.my-component {
  /* Base styles first - work everywhere */
  padding: 16px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
}

@supports (--custom: property) {
  .my-component {
    /* Enhanced styles for modern browsers */
    padding: var(--spacing-md);
    background-color: var(--color-surface);
    border-color: var(--color-border);
  }
}

/* ❌ Avoid: Relying only on custom properties */
.my-component {
  padding: var(--spacing-md); /* Breaks in older browsers */
  background-color: var(--color-surface);
}
```

### Managing Specificity

```css
/* ✅ Good: Low specificity, rely on cascade order */
.button { }
.button--primary { }

/* ❌ Avoid: High specificity */
.nav .menu .button.primary {
  /* Hard to override, creates conflicts */
}
```

### Testing Strategy

- Verify @supports queries work correctly
- Test fallback behavior in older browsers  
- Ensure consistent rendering across platforms
- Validate responsive behavior with progressive enhancement

## Progressive Enhancement Implementation Patterns

Our component library implements progressive enhancement using proven patterns that ensure universal compatibility while leveraging modern CSS features. These patterns were established during the 2024-2025 modernization effort where all component CSS was updated to remove `@layer` dependencies and implement comprehensive `@supports` queries.

### Core Implementation Strategy

Every component follows a three-tier enhancement approach:

1. **Universal Base Styles** - Properties that work in all CSS-capable browsers
2. **Modern Layout Enhancement** - Progressive addition of flexbox, grid, and advanced features  
3. **Visual Polish Enhancement** - Non-critical visual improvements that gracefully degrade

### Standard Progressive Enhancement Pattern

```css
/* 1. Universal Base Styles - Work Everywhere */
.component {
  /* Essential properties for all browsers */
  padding: 1rem;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  /* Fallback layout technique */
  display: block;
}

/* 2. Modern Layout Enhancement */
@supports (display: flex) {
  .component {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

/* 3. Spacing Enhancement */
@supports (gap: 1rem) {
  .component {
    gap: 1rem;
  }
}

/* 4. Visual Enhancement */
@supports (border-radius: 0.5rem) {
  .component {
    border-radius: 0.5rem;
  }
}

/* 5. Animation Enhancement */
@supports (transition: all 0.2s ease) {
  .component {
    transition: all 0.2s ease;
  }
}
```

### Layout Fallback Strategies

#### Flexbox Fallback Patterns

**Horizontal Layout with Spacing:**
```css
.flex-container {
  /* Fallback: inline-block with margins */
  text-align: center;
}

.flex-item {
  display: inline-block;
  margin-right: 1rem;
  vertical-align: top;
}

@supports (display: flex) {
  .flex-container {
    display: flex;
    align-items: center;
    text-align: initial;
  }
  
  .flex-item {
    margin-right: 0;
  }
}

@supports (gap: 1rem) {
  .flex-container {
    gap: 1rem;
  }
}
```

**Vertical Layout with Ordering:**
```css
.flex-vertical {
  /* Fallback: float-based ordering */
}

.flex-item-first {
  float: left;
  margin-right: 0.5rem;
}

.flex-item-second {
  /* Default flow position */
}

@supports (display: flex) {
  .flex-vertical {
    display: flex;
    flex-direction: column;
  }
  
  .flex-item-first {
    order: 1;
    float: none;
    margin-right: 0;
  }
  
  .flex-item-second {
    order: 2;
  }
}
```

#### CSS Grid Fallback Patterns

**Grid to Flexbox to Block:**
```css
.grid-container {
  /* Fallback: block layout */
  padding: 1rem;
}

.grid-item {
  margin-bottom: 1rem;
}

@supports (display: flex) {
  .grid-container {
    display: flex;
    flex-wrap: wrap;
  }
  
  .grid-item {
    flex: 1;
    margin-bottom: 0;
    margin-right: 1rem;
  }
}

@supports (display: grid) {
  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  
  .grid-item {
    margin-right: 0;
  }
}

@supports (gap: 1rem) {
  .grid-container {
    gap: 1rem;
  }
}
```

### Spacing Enhancement Patterns

#### Gap Property with Margin Fallbacks

**Consistent Spacing Strategy:**
```css
.spaced-container {
  /* Fallback: margin-based spacing */
}

.spaced-item {
  margin-right: 1rem;
  margin-bottom: 1rem;
}

.spaced-item:last-child {
  margin-right: 0;
}

@supports (gap: 1rem) {
  .spaced-container {
    gap: 1rem;
  }
  
  .spaced-item {
    margin-right: 0;
    margin-bottom: 0;
  }
  
  .spaced-item:last-child {
    margin-right: 0;
  }
}
```

### Visual Enhancement Patterns

#### Complex Visual Features with Fallbacks

**Custom Checkbox with Progressive Enhancement:**
```css
input[type="checkbox"]::before {
  /* Fallback: Unicode checkmark */
  content: "✓";
  color: var(--check-color);
  font-size: 1rem;
  opacity: 0;
}

@supports (clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)) {
  input[type="checkbox"]::before {
    /* Modern: Custom clip-path shape */
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    content: "";
    opacity: 1;
  }
}

@supports (transform: scale(0)) {
  input[type="checkbox"]::before {
    transform: scale(0);
  }
}

input[type="checkbox"]:checked::before {
  opacity: 1;
}

@supports (transform: scale(1)) {
  input[type="checkbox"]:checked::before {
    transform: scale(1);
  }
}
```

### Modern CSS Feature Support Reference

| Feature | Global Support | Fallback Strategy | Critical for Function |
|---------|----------------|-------------------|----------------------|
| **Flexbox** | 98.68% | `inline-block` + margins | ⚠️ Moderate |
| **CSS Grid** | 96.61% | Flexbox → block layout | ⚠️ Moderate |
| **Gap Property** | 91.29% | Margin-based spacing | ✅ Low |
| **Custom Properties** | 97.66% | Static values | ⚠️ Moderate |
| **Border-radius** | 98.86% | Square corners | ✅ Low |
| **CSS Transforms** | 98.25% | Static positioning | ✅ Low |
| **Transitions** | 98.88% | Instant state changes | ✅ Low |
| **Clamp()** | 89.35% | Static responsive values | ⚠️ Moderate |
| **Modern Viewport (svh/svw)** | 89.84% | Standard vh/vw units | ✅ Low |
| **Clip-path** | 95.83% | Unicode/text symbols | ✅ Low |

**Priority Levels:**
- 🔴 **High**: Core functionality breaks without fallback
- ⚠️ **Moderate**: Layout significantly degraded without fallback  
- ✅ **Low**: Visual enhancement only, graceful degradation

### Implementation Guidelines

#### When to Add Fallbacks

**Always Add Fallbacks For:**
- Layout properties (flexbox, grid, positioning)
- Spacing mechanisms (gap, margins that affect layout)
- Modern units that affect critical sizing
- Features with <95% support in target browsers

**Optional Fallbacks For:**
- Purely visual enhancements (border-radius, shadows)
- Animation and transition effects
- Advanced typography features
- Features with >98% support

#### Fallback Quality Standards

**Functional Equivalence:**
- Fallback must provide the same core functionality
- Users should not notice missing features in supported workflows
- Information hierarchy must be preserved

**Performance Considerations:**
- Fallbacks should not significantly impact performance
- Avoid complex calculations or excessive DOM manipulation
- Progressive enhancement should improve, not degrade, performance

### Component Examples

#### Form Elements
Our form components demonstrate comprehensive progressive enhancement:

- **Checkbox**: Unicode checkmark fallback → clip-path enhancement
- **Input Fields**: Basic styling → border-radius + transitions
- **Form Layout**: Block layout → flexbox → grid where appropriate

#### Navigation Components  
- **Menu**: Block layout → flexbox horizontal → advanced transforms
- **Skip Links**: Static positioning → transform-based hide/show

#### Layout Components
- **Transaction Layout**: Block stacking → flexbox centering → viewport units
- **Footer**: Centered text → flexbox space-between → gap spacing

### Testing Progressive Enhancement

#### Browser Testing Strategy
1. **Baseline Test**: Disable CSS features to test base functionality
2. **Feature Test**: Verify `@supports` queries work correctly  
3. **Fallback Test**: Ensure graceful degradation in older browsers
4. **Enhancement Test**: Confirm modern features enhance experience

#### Tools and Techniques
- Browser DevTools feature toggles
- Automated testing with various CSS feature support levels
- Visual regression testing across browser versions
- Accessibility testing with enhanced and fallback states

### Migration Pattern

When updating existing components to this progressive enhancement pattern:

```css
/* Before: Modern-only approach */
.component {
  display: flex;
  gap: 1rem;
  border-radius: 0.5rem;
}

/* After: Progressive enhancement approach */
.component {
  /* Universal base */
  padding: 1rem;
}

.component > * {
  /* Fallback spacing */
  margin-right: 1rem;
}

@supports (display: flex) {
  .component {
    display: flex;
  }
  
  .component > * {
    margin-right: 0;
  }
}

@supports (gap: 1rem) {
  .component {
    gap: 1rem;
  }
}

@supports (border-radius: 0.5rem) {
  .component {
    border-radius: 0.5rem;
  }
}
```

This documentation reflects the comprehensive modernization completed in 2024-2025, where all component CSS was updated to implement these progressive enhancement patterns while removing CSS layer dependencies.
