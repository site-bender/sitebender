# Color System

Color tokens, accessibility considerations, and usage patterns for creating cohesive, accessible visual experiences across the application.

## Philosophy

**Progressive Color**: The color system uses cutting-edge color spaces with graceful fallbacks, ensuring optimal visual quality on modern displays while maintaining compatibility with older browsers and devices.

## Color Space Architecture

### Multi-Format Color Definitions

Each color is defined in three formats with cascading fallbacks:

```css
--primary-blue-hsl: hsl(220, 90%, 50%);              /* HSL - Universal support */
--primary-blue-oklch: oklch(65% 0.2 250);            /* OKLCH - Perceptual uniformity */
--primary-blue-p3: color(display-p3 0.2 0.4 0.9);    /* P3 - Wide gamut displays */

--primary-blue: var(
  --primary-blue-p3,                                  /* Best quality first */
  var(--primary-blue-oklch,                          /* Modern fallback */
      var(--primary-blue-hsl))                       /* Universal fallback */
);
```

### Why Multiple Color Spaces?

**HSL (Hue, Saturation, Lightness)**
- Universal browser support (100% compatible)
- Intuitive for humans to understand
- Predictable for design systems

**OKLCH (Oklab LCH)**
- Perceptually uniform color space
- Better for programmatic color manipulation
- Consistent lightness across hues

**Display P3**
- Wide color gamut (25% more colors than sRGB)
- Better color reproduction on modern displays
- Future-proof for high-quality screens

## Color Token Structure

### Base Color Palette

**Grayscale Foundation**
```css
--lightest-gray: /* Near white - backgrounds, cards */
--light-gray:    /* Light gray - subtle borders, dividers */
--light-medium-gray: /* Medium light - secondary text */
--dark-medium-gray:  /* Medium dark - body text */
--dark-gray:     /* Dark - headings, primary text */
--darkest-gray:  /* Near black - high contrast elements */
```

**Brand Colors**
```css
--primary-blue:   /* Main brand color - actions, links */
--secondary-teal: /* Supporting brand color - accents */
--accent-orange:  /* Attention color - warnings, highlights */
```

**Semantic Color Assignments**
```css
/* Interactive Elements */
--color-primary: var(--primary-blue);
--color-secondary: var(--secondary-teal);
--color-accent: var(--accent-orange);

/* Text Colors */
--color-text-primary: var(--dark-gray);
--color-text-secondary: var(--dark-medium-gray);
--color-text-muted: var(--light-medium-gray);

/* Background Colors */
--color-background: var(--lightest-gray);
--color-surface: var(--light-gray);
--color-overlay: var(--dark-gray);

/* State Colors */
--color-success: var(--success-green);
--color-warning: var(--warning-orange);
--color-error: var(--error-red);
--color-info: var(--info-blue);
```

## Accessibility and Contrast

### WCAG 2.1 Compliance

All color combinations meet or exceed accessibility standards:

**Contrast Ratios:**
- **Normal text**: 4.5:1 minimum (AA standard)
- **Large text**: 3:1 minimum (18pt+ or 14pt+ bold)
- **UI components**: 3:1 minimum for interactive elements
- **AAA compliance**: 7:1 for critical text

### Contrast Validation

```css
/* Example: Accessible text color combinations */
.text-on-light {
  background: var(--lightest-gray);  /* #F8F8F8 */
  color: var(--dark-gray);           /* #3D3D3D - 4.8:1 ratio ✓ */
}

.text-on-dark {
  background: var(--dark-gray);      /* #3D3D3D */
  color: var(--lightest-gray);       /* #F8F8F8 - 4.8:1 ratio ✓ */
}

.primary-button {
  background: var(--primary-blue);   /* Tested for 4.5:1+ */
  color: var(--color-on-primary);    /* White or near-white */
}
```

### Color Blind Considerations

**Design Principles:**
- Never rely on color alone to convey information
- Use patterns, icons, or text alongside color coding
- Test with color blindness simulators
- Provide high contrast mode support

**Implementation:**
```css
/* ✅ Good: Multiple visual cues */
.status-success {
  background: var(--color-success);
  color: var(--color-on-success);
}
.status-success::before {
  content: "✓";  /* Icon provides non-color indicator */
}

/* ❌ Avoid: Color-only indication */
.error { color: red; }
.success { color: green; }
```

## Color Usage Guidelines

### Primary Color Usage

**Primary Blue** - Main interactive elements
- Links and navigation
- Primary buttons and CTAs
- Active states and selections
- Brand elements and logos

```css
.primary-link {
  color: var(--color-primary);
  text-decoration-color: var(--color-primary);
}

.primary-button {
  background: var(--color-primary);
  color: var(--color-on-primary);
}
```

### Secondary Color Usage

**Secondary Teal** - Supporting elements
- Secondary buttons and actions
- Accent borders and highlights
- Secondary navigation elements
- Complementary brand touches

### Text Color Hierarchy

```css
/* Primary text - headings, important content */
.text-primary {
  color: var(--color-text-primary);    /* Highest contrast */
}

/* Secondary text - body content, descriptions */
.text-secondary {
  color: var(--color-text-secondary);  /* Good contrast */
}

/* Muted text - captions, metadata, placeholders */
.text-muted {
  color: var(--color-text-muted);      /* Reduced emphasis */
}
```

## Semantic Color System

### State Colors

**Success States**
```css
--color-success: var(--success-green);
--color-success-bg: var(--light-success-green);
--color-success-border: var(--medium-success-green);
```

**Error States**
```css
--color-error: var(--error-red);
--color-error-bg: var(--light-error-red);
--color-error-border: var(--medium-error-red);
```

**Warning States**
```css
--color-warning: var(--warning-orange);
--color-warning-bg: var(--light-warning-orange);
--color-warning-border: var(--medium-warning-orange);
```

### Component Color Patterns

```css
/* Form validation example */
.field--valid {
  border-color: var(--color-success-border);
  background: var(--color-success-bg);
}

.field--invalid {
  border-color: var(--color-error-border);
  background: var(--color-error-bg);
}

.field--warning {
  border-color: var(--color-warning-border);
  background: var(--color-warning-bg);
}
```

## Dark Mode Considerations

### Future-Proof Color Structure

Colors are defined to support future dark mode implementation:

```css
/* Light mode (current) */
:root {
  --color-background: var(--lightest-gray);
  --color-text-primary: var(--dark-gray);
}

/* Dark mode (future implementation) */
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: var(--darkest-gray);
    --color-text-primary: var(--lightest-gray);
  }
}
```

### Color Token Benefits for Dark Mode

- **Semantic naming** allows easy theme switching
- **Contrast validation** ensures accessibility in both modes
- **Component isolation** prevents dark mode implementation conflicts

## Performance Considerations

### Color Space Fallbacks

```css
/* Optimized loading cascade */
--color-primary: var(
  --primary-blue-p3,      /* 0.1ms parse time, modern browsers */
  var(--primary-blue-oklch,   /* 0.05ms parse time, good support */
      var(--primary-blue-hsl))    /* 0.01ms parse time, universal */
);
```

### Browser Support Strategy

**P3 Color Support** (2021+):
- Safari 14.1+, Chrome 98+, Firefox 100+
- Provides 25% more color range
- Graceful degradation to OKLCH/HSL

**OKLCH Support** (2022+):
- Safari 15.4+, Chrome 101+, Firefox 113+
- Perceptually uniform color manipulation
- Falls back to HSL for older browsers

**HSL Support** (Universal):
- Supported by all browsers since 2009
- Reliable baseline for color definitions
- Ensures functionality across all devices

## Development Workflow

### Adding New Colors

1. **Define base color** in three formats (HSL, OKLCH, P3)
2. **Create semantic token** for the color's purpose
3. **Test contrast ratios** against background colors
4. **Validate accessibility** with color blindness tools
5. **Update documentation** with usage guidelines

### Color Testing Tools

```bash
# Contrast ratio testing
npm install @adobe/leonardo-contrast-colors

# Color blindness simulation
npm install colorblinding

# P3 gamut testing (browser dev tools)
# Chrome: Rendering tab → "Emulate CSS media feature prefers-color-scheme"
```

### Color Validation

```css
/* Test color contrast in development */
.debug-contrast {
  /* Use browser dev tools to verify contrast ratios */
  background: var(--color-background);
  color: var(--color-text-primary);
  /* Should show 4.5:1+ ratio in accessibility panel */
}
```

## Color System Maintenance

### Regular Audits

**Accessibility Testing:**
- Run contrast ratio audits quarterly
- Test with screen readers and high contrast mode
- Validate with color blindness simulators

**Performance Testing:**
- Monitor color parsing performance
- Test fallback behavior in older browsers
- Validate color accuracy across different displays

**Brand Alignment:**
- Ensure colors match brand guidelines
- Test color reproduction in print and digital
- Maintain consistency across all touchpoints

### Color Documentation Updates

When adding or modifying colors:
1. Update color token definitions
2. Test all contrast combinations
3. Update component examples
4. Verify accessibility compliance
5. Update design system documentation

> **📖 Related Documentation**  
> - **[CSS Architecture](../css-architecture/index.md)** - How color tokens integrate with progressive enhancement patterns
> - **[Typography](../typography/index.md)** - Text color considerations and contrast
> - **[Component Styles](../component-styles/index.md)** - Color usage in component design
