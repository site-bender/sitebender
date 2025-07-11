# Design System Documentation

This section documents the comprehensive design system that provides consistent visual language, typography, and component styling across the entire application.

## Philosophy

**Vanilla CSS with Progressive Enhancement**: Our design system is built entirely with W3C standard CSS3/4 in `index.css` files, using progressive enhancement through @supports queries to provide modern features with universal browser compatibility.

### Core CSS Principles

- **🚫 No Preprocessors**: No SCSS, LESS, Stylus, or any CSS preprocessing
- **🚫 No CSS-in-JS**: No styled-components, Emotion, or runtime CSS generation  
- **🚫 No Frameworks**: No Tailwind, Bootstrap, or utility-first frameworks
- **✅ Pure CSS**: Only W3C standard CSS3/4 features in vanilla `.css` files
- **✅ Modern Features**: CSS custom properties, CSS grid, flexbox, @supports queries
- **✅ Progressive Enhancement**: @supports queries add modern features on top of universal base styles

### Key Principles

- **Progressive Enhancement**: Base styles work in all browsers, modern features added via @supports queries
- **Design Tokens**: Centralized color, spacing, and typography values defined as CSS custom properties
- **Component-Driven**: Each UI component has its own isolated styling that integrates with the global system
- **Cascade Order**: Proper stylesheet loading order ensures predictable styling without specificity conflicts
- **Performance-First**: Optimized font loading, minimal CSS footprint, and efficient asset delivery
- **Accessibility-Ready**: Color contrast, typography scales, and interaction patterns designed for accessibility
- **Print-Ready**: Comprehensive print stylesheet support (planned implementation)

## Design System Architecture

```
static/styles/
├── reset/              # CSS reset and normalization
├── root/               # Design tokens (colors, spacing, typography)
├── base/               # Base element styling
├── fonts/              # Font face declarations and loading
└── utilities/          # Utility classes and helpers
```

**Stylesheet Loading Order:**
1. **Reset** - Normalize browser defaults
2. **Root Tokens** - Define design system variables  
3. **Base Elements** - Style semantic HTML elements
4. **Component Styles** - Component CSS files loaded in cascade order (generic to specific)
5. **Utilities** - Utility classes for common patterns

## Documentation Sections

### [Typography](./typography/index.md)
Font choices, hierarchy, loading strategy, and usage guidelines for creating consistent text experiences.

### [CSS Architecture](./css-architecture/index.md)  
Progressive enhancement strategy, @supports patterns, and how CSS is structured for universal compatibility with modern enhancements.

### [Color System](./color-system/index.md)
Color tokens, accessibility considerations, and usage patterns for creating cohesive visual experiences.

### [Component Styles](./component-styles/index.md)
How component styling works with the build system, CSS generation, and integration patterns.

## Using the Design System

### Development Workflow

1. **Reference Design Tokens**: Use CSS custom properties from the root stylesheets
2. **Follow Cascade Order**: Understand which order your styles load in
3. **Component Isolation**: Keep component styles in component directories
4. **Build Integration**: Leverage the automatic CSS discovery and compilation

```css
/* Example: Progressive enhancement approach */
.my-component {
  /* Base styles - work everywhere */
  color: #333;
  font-family: Arial, sans-serif;
  padding: 16px;
  border: 1px solid #ccc;
}

/* Enhanced styles for modern browsers */
@supports (--custom: property) {
  .my-component {
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
    padding: var(--spacing-md);
    border-color: var(--color-border);
  }
}

@supports (border-radius: 4px) {
  .my-component {
    border-radius: var(--border-radius-base);
  }
}
```

### Design Token Categories

- **Colors**: Primary, secondary, semantic, and surface colors
- **Typography**: Font families, sizes, weights, and line heights  
- **Spacing**: Consistent spacing scale for margins, padding, and gaps
- **Layout**: Grid systems, breakpoints, and container widths
- **Effects**: Shadows, borders, and visual effects

## Performance Considerations

### Font Loading Strategy

```css
/* Optimized font loading with fallbacks */
@font-face {
  font-family: "Raleway";
  src: url("/fonts/Raleway-VariableFont_wght.woff2") format("woff2-variations");
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;  /* Ensures text remains visible during font swap */
}
```

**Benefits:**
- Variable fonts reduce file size while providing weight flexibility
- `font-display: swap` prevents invisible text during font load
- WOFF2 format provides optimal compression and browser support

### CSS Optimization

- **Cascade-based loading** prevents CSS specificity conflicts through proper stylesheet order
- **Component-scoped styles** enable better caching and code splitting
- **Design token system** reduces CSS duplication and ensures consistency
- **Progressive enhancement** provides modern features without breaking older browsers
- **Utility classes** provide common patterns without custom CSS

## Accessibility Features

### Color Contrast

All color combinations meet WCAG 2.1 AA standards:
- **Text colors** have minimum 4.5:1 contrast ratio
- **Interactive elements** have clear hover and focus states
- **Color semantics** don't rely solely on color for meaning

### Typography Accessibility

- **Scalable font sizes** that respect user preferences
- **Readable line heights** for improved text comprehension
- **Font weight hierarchy** that works with screen readers
- **Responsive typography** that adapts to viewport and user settings

## Integration with Build System

The design system integrates seamlessly with the build pipeline:

```
Build Process:
1. Static styles from static/styles/ are copied to dist/
2. Component styles are discovered and compiled automatically  
3. Stylesheets load in proper cascade order (generic to specific)
4. Asset discovery includes all required stylesheets in HTML
```

**Automatic Discovery:**
- Component CSS files are automatically found and included
- Cascade ordering is maintained across all generated pages (base → components → utilities)
- CSS is deduplicated to prevent multiple inclusions
- Pretty-printed output for development debugging

## Extending the Design System

### Adding New Design Tokens

1. **Define tokens** in appropriate root/ files
2. **Document usage** in design system documentation
3. **Update components** to use new tokens
4. **Test across** all component combinations

### Creating New Components

1. **Component CSS** goes in `src/components/ComponentName/index.css`
2. **Follow naming** conventions for CSS classes
3. **Use design tokens** instead of hardcoded values
4. **Include via build system** through automatic discovery

### Modifying Typography

1. **Add font files** to `static/fonts/`
2. **Define @font-face** in `static/styles/fonts/index.css`
3. **Add font variables** to root typography tokens
4. **Update fallback** font stacks for performance

## Browser Support & CSS Standards

**95% Browser Support Requirement**: All CSS features used must have 95%+ global browser support according to caniuse.com, with graceful fallbacks for legacy browsers through @supports queries.

### Modern CSS Features (95%+ Support)
- **CSS Custom Properties** (CSS variables) - 97.66% support
- **CSS Grid Layout** - 96.61% support  
- **Flexbox** - 98.68% support
- **@supports Queries** - 97.49% support (used for progressive enhancement)
- **Variable Fonts** - 95.29% support (with static font fallbacks)

### Progressive Enhancement Strategy
```css
/* Base styles work everywhere */
.component {
  display: block;
  background-color: #f0f0f0;
  padding: 16px;
  font-family: Arial, sans-serif;
}

/* Enhanced styles for supporting browsers */
@supports (display: grid) {
  .component {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 16px;
  }
}

@supports (--custom: property) {
  .component {
    background-color: var(--color-surface);
    padding: var(--spacing-md);
    font-family: var(--font-family-sans);
  }
}

/* Example: Flexbox with fallback */
.button-group {
  /* Fallback: inline-block layout */
  text-align: center;
}

.button-group .button {
  display: inline-block;
  margin: 4px;
}

@supports (display: flex) {
  .button-group {
    display: flex;
    gap: 8px;
    justify-content: center;
    text-align: initial;
  }
  
  .button-group .button {
    margin: 0;
  }
}

/* Example: Variable fonts with static fallbacks */
@font-face {
  font-family: "Raleway";
  src: url("raleway-variable.woff2") format("woff2-variations"),
       url("raleway-regular.woff2") format("woff2"); /* Fallback */
  font-weight: 100 900;
  font-display: swap;
}
```

### Standards Compliance
- **W3C CSS3/4**: Only standardized CSS features, no vendor prefixes without fallbacks
- **No Preprocessing**: Pure CSS without SCSS, LESS, Stylus compilation
- **No CSS-in-JS**: No runtime CSS generation or styled-components
- **No Frameworks**: No Tailwind, Bootstrap, or utility-first frameworks
- **Vanilla CSS Files**: All styles in standard `.css` files (typically `index.css`)

### Progressive Enhancement
- **Base functionality** works in all CSS-capable browsers
- **Font fallbacks** ensure text remains readable
- **Color system** works with or without custom properties
- **@supports queries** add modern features without breaking compatibility
- **Print stylesheet** support (comprehensive implementation planned)

### Roadmap
- **🖨️ Print Styles**: Comprehensive print stylesheet with optimized typography, layout, and color handling
- **📱 Container Queries**: Implementation when browser support reaches 95%
- **🎨 CSS Nesting**: Native CSS nesting when support reaches 95% threshold

> **📖 Related Documentation**  
> - **[Build System](../build-system/index.md)** - How CSS is processed and served
> - **[Development Workflow](../development-workflow/index.md)** - Working with styles during development
> - **[Component Architecture](../code-organization/index.md)** - How components and styles are organized
