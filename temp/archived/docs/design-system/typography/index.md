# Typography

Font choices, hierarchy, loading strategy, and usage guidelines for creating consistent text experiences across the application.

## Philosophy

**Readable Performance**: Typography balances aesthetic appeal with performance and accessibility, using variable fonts and systematic hierarchy to create clear, engaging text experiences.

## Font Stack Architecture

### Primary Fonts

**Raleway** - Sans-serif for UI and headings
```css
font-family: "Raleway", system-ui, -apple-system, "Segoe UI", sans-serif;
```

**Roboto Serif** - Serif for body text and content
```css
font-family: "Roboto Serif", "Times New Roman", Georgia, serif;
```

**Charm** - Display font for special elements
```css
font-family: "Charm", "Raleway", system-ui, sans-serif;
```

**Logo Font** - Brand-specific typography
```css
font-family: "LogoFont", "Raleway", system-ui, sans-serif;
```

### Font Loading Strategy

All fonts use variable font technology for optimal performance:

```css
@font-face {
  font-family: "Raleway";
  src: url("/fonts/Raleway-VariableFont_wght.woff2") format("woff2-variations");
  font-weight: 100 900;  /* Full weight range in single file */
  font-style: normal;
  font-display: swap;    /* Prevent invisible text */
}
```

**Benefits of Variable Fonts:**
- Single file contains entire weight range (100-900)
- Reduces HTTP requests and total file size
- Smooth weight transitions and precise control
- Better performance than multiple font files

## Typography Hierarchy

### Heading System

```css
/* Primary Headings - Raleway */
h1 { font-family: var(--font-family-sans); font-weight: 700; }
h2 { font-family: var(--font-family-sans); font-weight: 600; }
h3 { font-family: var(--font-family-sans); font-weight: 500; }

/* Body Content - Roboto Serif */
p { font-family: var(--font-family-serif); font-weight: 400; }
```

### Font Size Scale

Using a modular scale for consistent sizing:

```css
/* Typography Scale */
--font-size-xs:   0.75rem;  /* 12px */
--font-size-sm:   0.875rem; /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg:   1.125rem; /* 18px */
--font-size-xl:   1.25rem;  /* 20px */
--font-size-2xl:  1.5rem;   /* 24px */
--font-size-3xl:  1.875rem; /* 30px */
--font-size-4xl:  2.25rem;  /* 36px */
--font-size-5xl:  3rem;     /* 48px */
```

## Performance Optimization

### Font Loading Behavior

**font-display: swap** ensures text remains visible:

1. **Block Period** (0-100ms): Text invisible, waiting for font
2. **Swap Period** (100ms-3s): Fallback font shown, swap when available
3. **Failure Period** (3s+): Fallback font permanently, no swap

```css
/* Optimized loading prevents invisible text */
@font-face {
  font-family: "Raleway";
  font-display: swap;  /* Key performance setting */
  /* ...other properties */
}
```

### Fallback Font Selection

Carefully chosen fallbacks minimize layout shift:

```css
/* System fonts provide good fallbacks */
font-family: "Raleway", 
             system-ui,        /* Modern system UI fonts */
             -apple-system,    /* macOS San Francisco */
             "Segoe UI",       /* Windows */
             sans-serif;       /* Generic fallback */
```

### Preloading Critical Fonts

```html
<!-- Preload most important fonts -->
<link rel="preload" href="/fonts/Raleway-VariableFont_wght.woff2" 
      as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/RobotoSerif-VariableFont_GRAD,opsz,wdth,wght.woff2" 
      as="font" type="font/woff2" crossorigin>
```

## Usage Guidelines

### When to Use Each Font

**Raleway (Sans-serif)**
- Navigation menus and UI elements
- Headings and titles (h1-h6)
- Button labels and interactive elements
- Short informational text

**Roboto Serif (Serif)**
- Long-form content and articles
- Paragraph text and descriptions
- Documentation and explanatory text
- Reading-intensive interfaces

**Charm (Display)**
- Special decorative elements
- Emphasis or accent text
- Creative headers or callouts
- Brand-adjacent messaging

**Logo Font (Brand)**
- Logo and brand elements only
- Should not be used for general text
- Reserved for brand identity

### Font Weight Guidelines

```css
/* Weight hierarchy for visual emphasis */
font-weight: 300;  /* Light - subtle text, captions */
font-weight: 400;  /* Regular - body text, paragraphs */
font-weight: 500;  /* Medium - subheadings, labels */
font-weight: 600;  /* Semibold - headings, emphasis */
font-weight: 700;  /* Bold - primary headings, buttons */
font-weight: 800;  /* Extra bold - hero text, brand */
```

## Typography Design Tokens

### CSS Custom Properties

```css
:root {
  /* Font Families */
  --font-family-sans: "Raleway", system-ui, sans-serif;
  --font-family-serif: "Roboto Serif", Georgia, serif;
  --font-family-display: "Charm", var(--font-family-sans);
  --font-family-brand: "LogoFont", var(--font-family-sans);
  
  /* Font Sizes */
  --font-size-body: var(--font-size-base);
  --font-size-caption: var(--font-size-sm);
  --font-size-heading: var(--font-size-2xl);
  
  /* Line Heights */
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
  
  /* Letter Spacing */
  --letter-spacing-tight: -0.025em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.025em;
}
```

### Component Integration

```css
/* Example: Using typography tokens in components */
.article-content {
  font-family: var(--font-family-serif);
  font-size: var(--font-size-lg);
  line-height: var(--line-height-relaxed);
  letter-spacing: var(--letter-spacing-normal);
}

.button-primary {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-base);
  font-weight: 600;
  letter-spacing: var(--letter-spacing-wide);
}
```

## Responsive Typography

### Fluid Typography

Using clamp() for responsive font sizes:

```css
/* Responsive heading that scales with viewport */
h1 {
  font-size: clamp(
    var(--font-size-2xl),  /* Minimum size */
    4vw,                   /* Preferred (responsive) */
    var(--font-size-5xl)   /* Maximum size */
  );
}
```

### Breakpoint Considerations

```css
/* Typography adjustments at different screen sizes */
@media (max-width: 768px) {
  :root {
    --font-size-base: 0.875rem;  /* Slightly smaller on mobile */
    --line-height-normal: 1.6;   /* More generous line height */
  }
}

@media (min-width: 1200px) {
  :root {
    --font-size-base: 1.125rem;  /* Larger text on large screens */
  }
}
```

## Accessibility Considerations

### Contrast and Readability

- **Minimum contrast**: 4.5:1 for normal text, 3:1 for large text
- **Font size**: Minimum 16px for body text
- **Line height**: 1.5 minimum for body text
- **Line length**: 45-75 characters optimal for readability

### User Preferences

```css
/* Respect user motion preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
    animation: none !important;
  }
}

/* Support user font size preferences */
html {
  font-size: 100%;  /* Respects browser/OS settings */
}
```

### Screen Reader Compatibility

- Semantic font usage (headings for hierarchy)
- Proper heading structure (h1→h2→h3)
- Sufficient color contrast for all text
- No reliance on font styling alone for meaning

## Typography Testing

### Cross-Browser Testing

Test typography across:
- Chrome, Firefox, Safari, Edge
- Different operating systems (macOS, Windows, Linux)
- Various screen densities and sizes
- With and without custom fonts loaded

### Performance Testing

Monitor:
- Font loading time and Flash of Unstyled Text (FOUT)
- Cumulative Layout Shift (CLS) from font swaps
- Time to interactive with font loading
- Fallback font rendering quality

### Accessibility Testing

Verify:
- Text scales properly with browser zoom (up to 200%)
- Sufficient contrast in all color combinations
- Readable with high contrast mode enabled
- Works with screen readers and assistive technology

## Font File Management

### File Organization

```
static/fonts/
├── Raleway-VariableFont_wght.woff2           # Sans-serif regular
├── Raleway-Italic-VariableFont_wght.woff2    # Sans-serif italic
├── RobotoSerif-VariableFont_*.woff2          # Serif regular
├── RobotoSerif-Italic-VariableFont_*.woff2   # Serif italic
├── charm400.woff2                            # Display font
└── logo-font.woff2                           # Brand font
```

### Font Licensing

Ensure all fonts have appropriate licenses:
- **Google Fonts** (Raleway, Roboto Serif) - Open Font License
- **Custom fonts** - Verify commercial usage rights
- **Web font compliance** - Check embedding permissions

### Font Updates

When updating fonts:
1. Test thoroughly across all browsers and devices
2. Verify file size impacts on performance
3. Check that fallbacks still work properly
4. Update font-face declarations if needed
5. Test accessibility and readability

> **📖 Related Documentation**  
> - **[CSS Architecture](../css-architecture/index.md)** - How typography integrates with the progressive enhancement approach
> - **[Color System](../color-system/index.md)** - Text colors and contrast considerations
> - **[Component Styles](../component-styles/index.md)** - Typography in component design
