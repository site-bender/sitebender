# Component Styles

How component styling works with the build system, CSS generation patterns, and integration with the progressive enhancement design system architecture.

## Philosophy

**Isolated Integration**: Component styles use progressive enhancement to provide universal compatibility while seamlessly integrating with the global design system through shared tokens and consistent patterns.

## Component CSS Architecture

### Automatic Discovery and Generation

The build system automatically discovers and processes component styles:

```
Component Structure:
src/components/forms/TextField/
├── index.tsx              # Component
├── index.css              # Component styles
└── index.test.ts          # Component tests

Generated Output:
dist/styles/components/forms/text-field/index.css
```

**Directory Structure Mapping:**
- `src/components/forms/TextField/` → `dist/styles/components/forms/text-field/`
- PascalCase folders converted to kebab-case
- Hierarchical structure preserved in output paths

### Cascade Order Strategy

```
Component CSS Loading Order:
1. Generic components (components/buttons/)
2. Specific components (components/buttons/button/)
3. Component variants load after base components
4. Utilities load last for overrides
```

**Cascade Precedence Rules:**
1. Later stylesheets override earlier ones
2. More specific selectors override general ones
3. Component variants override base component styles
4. Proper source order eliminates specificity conflicts

## Component Styling Patterns

### Progressive Enhancement Component Pattern

```css
/* src/components/buttons/Button/index.css */
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
  text-align: center;
}

.button:hover {
  background-color: #0056b3;
}

.button:focus {
  outline: 2px solid #0056b3;
  outline-offset: 2px;
}

/* Enhanced styles for modern browsers */
@supports (--custom: property) {
  .button {
    /* Use design tokens, not hardcoded values */
    background-color: var(--color-primary);
    color: var(--color-on-primary);
    border-color: var(--color-primary);
    font-family: var(--font-ui);
    font-size: var(--font-size-base);
    padding: var(--spacing-sm) var(--spacing-md);
  }
  
  .button:hover {
    background-color: var(--color-primary-hover);
  }
  
  .button:focus {
    outline-color: var(--color-focus);
  }
}

@supports (border-radius: 4px) {
  .button {
    border-radius: var(--border-radius-base);
  }
}

@supports (transition: all 0.2s) {
  .button {
    transition: all 0.2s ease;
  }
}

@supports (display: flex) {
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
}

/* Component variants */
.button--secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}

@supports (--custom: property) {
  .button--secondary {
    background-color: var(--color-secondary);
    border-color: var(--color-secondary);
    color: var(--color-on-secondary);
  }
  
  .button--secondary:hover {
    background-color: var(--color-secondary-hover);
  }
}
```
/* Button variants using cascade order */
.button {
  /* Base button styles... */
  
  /* Primary variant (loaded later in cascade) */
  &--primary {
    background: var(--color-primary);
    color: var(--color-on-primary);
    
    &:hover {
      background: var(--color-primary-hover);
    }
  }
  
  /* Secondary variant */
  &--secondary {
    background: var(--color-secondary);
    color: var(--color-on-secondary);
    border-color: var(--color-secondary);
    
    &:hover {
      background: var(--color-secondary-hover);
    }
  }
  
  /* Outline variant */
  &--outline {
    background: transparent;
    color: var(--color-primary);
    border-color: var(--color-primary);
    
    &:hover {
      background: var(--color-primary);
      color: var(--color-on-primary);
    }
  }
  
  /* Size variants */
  &--small {
    font-size: var(--font-size-sm);
    padding: var(--spacing-xs) var(--spacing-sm);
  }
  
  &--large {
    font-size: var(--font-size-lg);
    padding: var(--spacing-md) var(--spacing-lg);
  }
}
```

## Complex Component Patterns

### Form Component Hierarchy

```css
/* Form container styles */
.form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  max-width: var(--form-max-width);
  
  /* Progressive enhancement for modern browsers */
  @supports (display: grid) {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }
}

/* Field group styles */
.field-set {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  border: 1px solid var(--color-border);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-base);
  
  /* Enhanced layout for modern browsers */
  @supports (display: grid) {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-sm);
  }
}

.field-set__legend {
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
}

/* Individual field styles */
.text-field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.text-field__label {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-primary);
}

.text-field__input {
  padding: var(--spacing-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-base);
  font-size: var(--font-size-base);
  
  /* Progressive enhancement for focus states */
  @supports (outline-offset: 2px) {
    &:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 2px var(--color-primary-focus);
    }
  }
  
  &--invalid {
    border-color: var(--color-error);
    
    @supports (outline-offset: 2px) {
      &:focus {
        border-color: var(--color-error);
        box-shadow: 0 0 0 2px var(--color-error-focus);
      }
    }
  }
}

.text-field__help {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.text-field__error {
  font-size: var(--font-size-xs);
  color: var(--color-error);
}
```

## Responsive Component Design

### Mobile-First Approach

```css
.navigation-menu {
  /* Mobile-first base styles */
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  padding: var(--spacing-sm);
  
  /* Progressive enhancement for flexbox gap */
  @supports (gap: 1rem) {
    gap: var(--spacing-xs);
  }
  
  /* Tablet styles */
  @media (min-width: 768px) {
    flex-direction: row;
    padding: var(--spacing-md);
  }
  
  /* Desktop styles */
  @media (min-width: 1024px) {
    padding: var(--spacing-md) var(--spacing-lg);
  }
}

.navigation-menu__item {
  padding: var(--spacing-sm);
  border-bottom: 1px solid var(--color-border);
  
  /* Progressive enhancement for modern browsers */
  @supports (transition: all) {
    transition: background-color 0.2s ease;
  }
  
  &:hover {
    background-color: var(--color-hover);
  }
  
  /* Remove border on larger screens */
  @media (min-width: 768px) {
    border-bottom: none;
    border-right: 1px solid var(--color-border);
    
    &:last-child {
      border-right: none;
    }
  }
}
```

### Container Queries (Future Enhancement)

```css
/* Future: Component-based responsive design */
.card {
  /* Progressive enhancement for container queries */
  @supports (container-type: inline-size) {
    container-type: inline-size;
  }
  
  .card__title {
    font-size: var(--font-size-lg);
  }
  
  /* When card is wider than 300px */
  @supports (container-type: inline-size) {
    @container (min-width: 300px) {
      .card__title {
        font-size: var(--font-size-xl);
      }
      
      .card__content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--spacing-md);
      }
    }
  }
  
  /* Fallback for browsers without container query support */
  @supports not (container-type: inline-size) {
    @media (min-width: 400px) {
      .card__title {
        font-size: var(--font-size-xl);
      }
      
      .card__content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--spacing-md);
      }
    }
  }
}
```

## Integration with Build System

### Automatic CSS Discovery

```typescript
// Build system automatically finds component CSS
const componentStyles = await discoverComponentStyles();
// Returns array of component CSS files found recursively

// Example output:
[
  'src/components/buttons/Button/index.css',
  'src/components/forms/TextField/index.css',
  'src/components/navigation/Menu/index.css'
]
```

### Build-Time Processing

```
Processing Pipeline:
1. Scan src/components/ recursively for index.css files
2. Convert PascalCase directory names to kebab-case
3. Organize CSS files by cascade order priority
4. Copy CSS files to dist/styles/components/
5. Include required CSS files in generated HTML in proper order
```

### Asset Dependency Resolution

```typescript
// Page component analysis
const pageComponent = 'src/routes/contact/index.tsx';
const requiredAssets = await analyzeComponentDependencies(pageComponent);

// Results in automatic CSS inclusion:
// <link rel="stylesheet" href="/styles/components/forms/fields/text-field/index.css">
// <link rel="stylesheet" href="/styles/components/buttons/button/index.css">
```

## Component Styling Best Practices

### Design Token Usage

```css
/* ✅ Good: Use design tokens */
.my-component {
  color: var(--color-text-primary);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-base);
  font-family: var(--font-ui);
}

/* ❌ Avoid: Hardcoded values */
.my-component {
  color: #333333;
  padding: 16px;
  border-radius: 4px;
  font-family: "Helvetica", sans-serif;
}
```

### Naming Conventions

```css
/* Component block */
.component-name { }

/* Component elements */
.component-name__element { }

/* Component modifiers */
.component-name--modifier { }

/* Component states */
.component-name.is-active { }
.component-name.is-disabled { }
```

### Accessibility Integration

```css
.interactive-component {
  /* Focus management */
  &:focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }
  
  /* High contrast mode support */
  @media (prefers-contrast: high) {
    border: 2px solid var(--color-border);
  }
  
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    transition: none;
    transform: none;
  }
  
  /* Screen reader only content */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
  }
}
```

## Performance Optimizations

### CSS Loading Strategy

```html
<!-- Critical component styles loaded synchronously -->
<link rel="stylesheet" href="/styles/components/page/header/index.css">
<link rel="stylesheet" href="/styles/components/navigation/menu/index.css">

<!-- Non-critical component styles can be loaded asynchronously -->
<link rel="stylesheet" href="/styles/components/forms/fields/text-field/index.css" 
      media="print" onload="this.media='all'">
```

### Cascade Optimization

```css
/* Efficient specificity - rely on cascade order, not complex selectors */
.button { }              /* 0,1,0 specificity */
.button--primary { }     /* 0,1,0 specificity - wins through source order */

/* Avoid high specificity that fights the cascade */
/* ❌ .nav .menu .button.primary { } - 0,4,0 specificity */
/* ✅ Load button variants after base button styles */
```

### Caching Strategies

- **Component CSS files** cached separately for granular updates
- **Design tokens** cached long-term (design system stability)
- **Progressive enhancement styles** cached per browser capability

## Testing Component Styles

### Visual Regression Testing

```javascript
// Example: Testing component appearance
test('button component renders correctly', async () => {
  const button = document.querySelector('.button--primary');
  
  // Test computed styles
  const styles = getComputedStyle(button);
  expect(styles.backgroundColor).toBe('rgb(59, 130, 246)');
  expect(styles.color).toBe('rgb(255, 255, 255)');
  
  // Test responsive behavior
  Object.assign(button.style, { width: '300px' });
  // Assert responsive style changes
});
```

### Accessibility Testing

```javascript
// Test component accessibility features
test('button has proper focus indicators', async () => {
  const button = document.querySelector('.button');
  
  button.focus();
  const styles = getComputedStyle(button, ':focus-visible');
  expect(styles.outline).toBe('2px solid rgb(59, 130, 246)');
  expect(styles.outlineOffset).toBe('2px');
});
```

### Cross-Browser Testing

- Test component rendering across target browsers
- Verify fallback behavior for unsupported CSS features
- Validate responsive behavior on different screen sizes
- Test with different user preferences (dark mode, reduced motion)

## Component Style Documentation

### Self-Documenting CSS

```css
/* Component: Primary Button
 * Purpose: Main call-to-action button for forms and key actions
 * Variants: primary, secondary, outline, small, large
 * Dependencies: design tokens and progressive enhancement
 */
.button {
  /* Base styles using design system tokens */
  font-family: var(--font-ui);
  display: inline-block;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text-primary);
  text-decoration: none;
  cursor: pointer;
  
  /* Progressive enhancement for modern browsers */
  @supports (display: flex) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  
  /* Variant: Primary action button */
  &--primary {
    /* Uses primary brand color for high visibility */
    background: var(--color-primary);
    color: var(--color-on-primary);
    border-color: var(--color-primary);
  }
  
  /* Enhanced states for supporting browsers */
  @supports (transition: all) {
    transition: background-color 0.2s ease;
    
    &:hover {
      background: var(--color-hover);
    }
    
    &--primary:hover {
      background: var(--color-primary-hover);
    }
  }
}
```

### Usage Examples

```html
<!-- Primary button for main actions -->
<button class="button button--primary">Submit Form</button>

<!-- Secondary button for alternative actions -->
<button class="button button--secondary">Cancel</button>

<!-- Small outline button for subtle actions -->
<button class="button button--outline button--small">Learn More</button>
```

> **📖 Related Documentation**  
> - **[CSS Architecture](../css-architecture/index.md)** - Progressive enhancement approach and how components integrate with the architecture
> - **[Typography](../typography/index.md)** - Typography tokens used in component text
> - **[Color System](../color-system/index.md)** - Color tokens and accessibility considerations for components
