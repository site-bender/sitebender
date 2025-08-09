# Component Library Development Notes

## Core Philosophy

This library is for vanilla JS/CSS/HTML developers who want semantic, accessible components without framework dependencies.

## Progressive Enhancement Implementation

### 1. Enhancement Detection Pattern

```typescript
// Future pattern for progressive enhancement
if ("customElements" in window && "fetch" in window) {
	// Apply enhancements
}
```

### 2. Data Attributes for Enhancement

Components will use `data-*` attributes to signal enhancement opportunities:

```html
<!-- Form validation enhancement -->
<form data-enhance="ajax" data-validate>
	<!-- Enhancement script will add validation as properties of form elements -->
</form>

<!-- Temporal component live updates -->
<time data-enhance="live" data-update-interval="60">
	<!-- Enhancement script will update relative times -->
</time>
```

### 3. State Storage Hierarchy

Clear precedence for state management:

1. **URL parameters** - Shareable state (highest priority)
2. **Cookies** - Server-readable state
3. **LocalStorage** - Persistent client state
4. **SessionStorage** - Temporary client state
5. **IndexedDB** - Complex offline data (lowest priority)

### 4. CSS Architecture

- Pure vanilla CSS only
- CSS custom properties for theming
- `@supports` for progressive enhancement
- NO preprocessors (Sass, Less, etc.)
- NO CSS-in-JS
- NO Tailwind or utility frameworks
- NO CSS layers (they don't degrade gracefully)

Example theming approach:

```css
:root {
	/* Colors */
	--color-primary: #0066cc;
	--color-secondary: #333;
	--color-error: #cc0000;

	/* Spacing */
	--spacing-unit: 1rem;
	--spacing-small: calc(var(--spacing-unit) * 0.5);
	--spacing-large: calc(var(--spacing-unit) * 2);

	/* Typography */
	--font-base: system-ui, sans-serif;
	--font-mono: monospace;
}
```

### 5. Enhancement Scripts Architecture

- TypeScript compiled to vanilla JS
- No bundler dependencies where possible
- Careful deduplication of imports
- Scripts attach to DOM elements via data attributes
- All enhancements are truly optional

### 6. Testing Requirements

Before library release:

- Test with JavaScript disabled
- Test with CSS disabled
- Test with both disabled
- Test offline functionality
- Test keyboard navigation
- Test with screen readers
- Test across browsers and devices

### 7. Component Types

All components are the same type - semantic HTML that works without JS/CSS. Enhancement levels:

- **Base**: Pure semantic HTML
- **Styled**: With CSS (optional)
- **Enhanced**: With JS behaviors (optional)

## Technology Decisions

### NO Web Components

Web Components are explicitly NOT used in this library because:

1. They require JavaScript to function (breaks progressive enhancement)
2. Shadow DOM creates more problems than it solves
3. They're overcompromised by committee design
4. JSX/TSX provides better component architecture without the downsides

### YES to Modern CSS

- Container queries for component-responsive design
- Custom properties for theming
- Modern layout (Grid, Flexbox)
- All features that gracefully degrade

### Component Architecture via JSX

- JSX/TSX gives us reusable components at build time
- Compiles to vanilla HTML - no runtime required
- Best of both worlds: DX of components, output of standards

## Future Work

### Progressive Enhancements

- Mutation Observer for dynamic content updates
- Import maps for clean ES module dependencies
- Service workers for offline functionality
- Form validation enhancements
- Live updating components (time, data, etc.)

### Import from Existing Work

- Bring in progressive enhancement patterns from other projects
- Discuss and adapt patterns for this library's needs

## Principles to Remember

1. **Discipline over convenience** - Do it right, not fast
2. **Standards over trends** - WHATWG/W3C, not framework opinions
3. **Accessibility is not optional** - WCAG 2.3 AAA or newest
4. **Progressive enhancement is the way** - Base functionality requires zero JS
5. **Vanilla is powerful** - Modern browsers have everything we need
