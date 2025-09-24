# Codewright: Semantic HTML Components Library

> **Alpha Software**: This library is under active development. All features will be fully implemented before beta release. No compromises, no shortcuts.

Codewright is a **semantic HTML component library** for Static Site Generation (SSG) and Server-Side Rendering (SSR). It provides accessible, metadata-rich components that compile from JSX to pure HTML at build time.

## Core Philosophy

**Progressive Enhancement in Three Layers:**

1. **Semantic HTML** - Everything works without JavaScript (Lynx/Mosaic compatible)
2. **CSS Styling** - Visual enhancements via CSS3+ with graceful degradation
3. **JavaScript Enhancement** - Optional interactivity, never required for core functionality

**Key Principles:**

- JSX → pure vanilla HTML at build time (no React, no VDOM, no hooks)
- Direct component imports for tree-shaking (no bundles!)
- Forms work with standard POST/GET
- Real links, real pages, no SPA-only routes
- Back button always works
- Machine-readable via embedded JSON-LD and microdata

## Standards-Compliant HTML Elements

Codewright provides **typed wrappers for all HTML elements** that enforce W3C/WHATWG standards at compile time. Instead of using permissive JSX that allows any attribute on any element, Codewright's HTML components catch errors before they reach the browser.

### How It Works

The build process **automatically** substitutes typed wrappers for all HTML elements:

```tsx
// You write normal JSX:
<a href="/page" invalidAttr="oops">
  {" "}
  // Build catches: invalid attribute
  <a href="/nested">Nested link</a> // Build catches: invalid nesting
</a>;

// But behind the scenes, the build converts it to:
import { A } from "@sitebender/codewright/html/interactive/A";

<A href="/page" invalidAttr="oops">
  {" "}
  // TypeScript ERROR: invalidAttr doesn't exist
  <A href="/nested">Nested link</A> // TypeScript ERROR: A cannot contain A
</A>;
```

You can also explicitly import typed elements for immediate IDE feedback:

```tsx
import { A } from "@sitebender/codewright/html/interactive/A";

// Get errors as you type, not just at build time
<A href="/page">Valid link</A>;
```

### Element Organization

HTML elements are organized by their content categories in `src/html/`:

- **metadata/** - `<head>`, `<title>`, `<meta>`, `<link>`, etc.
- **sections/** - `<article>`, `<section>`, `<nav>`, `<aside>`, etc.
- **grouping/** - `<p>`, `<div>`, `<ul>`, `<ol>`, `<blockquote>`, etc.
- **text/** - `<span>`, `<em>`, `<strong>`, `<code>`, etc.
- **edits/** - `<ins>`, `<del>`, etc.
- **embedded/** - `<img>`, `<video>`, `<audio>`, `<iframe>`, etc.
- **tabular/** - `<table>`, `<tr>`, `<td>`, `<th>`, etc.
- **forms/** - `<form>`, `<input>`, `<select>`, `<button>`, etc.
- **interactive/** - `<a>`, `<button>`, `<details>`, etc.
- **scripting/** - `<script>`, `<noscript>`, `<template>`, etc.

### What Gets Validated

1. **Attributes** - Only valid HTML attributes for each element
2. **Attribute Values** - Enums for restricted values (e.g., `type` on `<input>`)
3. **Content Models** - Which elements can contain which children
4. **Nesting Rules** - Full descendant validation (not just immediate children)
5. **ARIA Compliance** - Valid ARIA roles and attributes per element
6. **Required Attributes** - Ensures required attributes are present

### Benefits

- **Compile-time HTML validation** - No invalid HTML reaches production
- **Better IDE support** - Autocomplete shows only valid options
- **Learning tool** - Teaches proper HTML through TypeScript errors
- **Prevents accessibility issues** - Invalid ARIA usage becomes a type error
- **Enforces semantic HTML** - Can't misuse elements against their purpose

### Implementation Notes

- **Automatic Substitution**: The build process automatically replaces lowercase HTML elements with their typed wrappers
- Even if you write `<div>`, the build converts it to use the typed `<Div>` component (with safeguards against infinite loops)
- The `createElement` function recognizes these components and renders them as their lowercase HTML equivalents
- TypeScript enforces validation rules during development with zero runtime overhead
- Obsolete and deprecated HTML elements are intentionally excluded
- **Alpha Status**: All HTML element wrappers will be fully implemented before any beta release

### Error Handling Philosophy

Following HTML's principle of "be liberal in what you accept, conservative in what you produce," Codewright gracefully handles validation errors while preserving debugging information.

#### Invalid Attributes

Invalid attributes are captured in a `data-errors` attribute:

```tsx
// Input (if TypeScript checks are bypassed):
<A href="/page" invalidAttr="oops" badProp={42}>

// Output HTML:
<a href="/page"
   data-errors='[
     {"type":"INVALID_ATTRIBUTE","name":"invalidAttr","value":"oops"},
     {"type":"INVALID_ATTRIBUTE","name":"badProp","value":42}
   ]'>
```

#### Invalid Nesting

Invalid nested elements are replaced with safe alternatives:

```tsx
// Input (invalid nesting):
<A href="/page">
  <A href="/nested">Nested link</A>  // Can't nest <a> in <a>
</A>

// Output HTML:
<a href="/page">
  <span data-errors='[{"type":"INVALID_NESTING","element":"a","context":"a"}]'
        data-original-tag="a"
        data-href="/nested">
    Nested link
  </span>
</a>
```

Replacement logic:

- Invalid block element in inline context → `<span>`
- Invalid inline element in block context → `<div>`
- Invalid interactive in interactive → `<span>` (safest)
- Original attributes → prefixed with `data-`
- Original tag → preserved in `data-original-tag`

#### Development Mode Features

In development, errors are highlighted visually and in console:

```css
/* Elements with errors get red outline */
[data-errors] {
  outline: 2px dashed red !important;
}

[data-errors]::before {
  content: "⚠️ HTML Error";
  /* Visual indicator */
}
```

Console warnings guide developers to fixes:

```js
console.warn("HTML Validation Error", {
  element: "a",
  errors: [...],
  fix: "Import { A } from '@sitebender/codewright/html/interactive/A'"
})
```

#### Strict Mode

Enable strict mode to throw errors instead of recovering:

```tsx
// In your config
{
  codewright: {
    strictMode: true; // Throws on any HTML violation
  }
}
```

This approach ensures:

- **Content never disappears** - Graceful degradation
- **Debugging is easy** - All errors tracked in DOM
- **Production is clean** - `data-errors` stripped in production builds
- **Learning is built-in** - Clear guidance on fixing issues

## What Codewright Does

- **Enforces HTML standards** via typed element wrappers
- **Generates semantic HTML** from JSX at build time
- **Embeds structured data** (Schema.org JSON-LD, microdata) automatically
- **Ensures accessibility** with proper ARIA attributes and keyboard navigation
- **Provides 1000+ semantic components** covering documents, forms, navigation, and Schema.org types
- **Supports theming** via CSS Custom Properties
- **Enables opt-in enhancement** via `data-*` attributes

## What Codewright Doesn't Do

- No client-side state management (see Architect library)
- No reactive components or re-rendering
- No SPA routing or client-side navigation
- No JavaScript event handlers in components
- No automatic progressive enhancement (must opt-in)

For reactive, client-side functionality with CSR/SSR/SSG options, use the **Architect** library, which incorporates all of Codewright and adds:

- Progressive enhancement behaviors (`__sbCalculate`, `__sbFormat`, `__sbValidate` properties)
- Pub-sub event system
- State management
- Triple store architecture
- Real-time updates and offline sync

## Component Categories

Codewright provides semantic components organized by purpose:

### Document Structure

- **Format** - Code, InlineMath, Emphasized, Highlighted, Subscripted, etc.
- **Identify** - Scientific terms, Cultural references, Historical markers, Quotations
- **Navigate** - PageNavigation, SiteNavigation, TableOfContents, Breadcrumbs
- **Group** - Article, Section, Sidebar, Lists, Tables
- **Refer** - Citations, Cross-references, Footnotes, Bibliography

### Interactive Components

- **Forms** - Form, FieldSet, Input types with built-in validation
- **Buttons** - Button, ButtonBar with accessibility features
- **Augment** - Screen reader helpers, Skip links, Live regions

### Coming Soon

- **UI Components** - Card, Accordion, Tooltip, Modal, Carousel, Tabs, etc.
  (All with full accessibility and no-JS fallbacks)

### Schema.org Components

Over 1000 components mapping to Schema.org types for rich metadata:

- Person, Organization, Event, Product
- Article, BlogPosting, Review
- LocalBusiness, Restaurant, Hotel
- And many more...

_For a complete component inventory, see `docs/component-inventory.md`_

## Getting Started

### Installation

```bash
# Using Deno (recommended)
import Form from "@sitebender/codewright/interact/forms/Form/index.tsx"
import Button from "@sitebender/codewright/interact/buttons/Button/index.tsx"
```

### TypeScript Configuration

Configure your `tsconfig.json` for JSX compilation:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@sitebender/codewright",
    "module": "NodeNext",
    "moduleResolution": "NodeNext"
  }
}
```

### Basic Usage

```tsx
// Direct imports - no barrels, no bundles!

// Import typed HTML elements for standards compliance
import H1 from "@sitebender/codewright/html/text/H1/index.tsx";
import Label from "@sitebender/codewright/html/forms/Label/index.tsx";
import Input from "@sitebender/codewright/html/forms/Input/index.tsx";

// Import semantic components for rich functionality
import Form from "@sitebender/codewright/interact/forms/Form/index.tsx";
import Button from "@sitebender/codewright/interact/buttons/Button/index.tsx";
import Article from "@sitebender/codewright/group/document/Article/index.tsx";

export function ContactPage() {
  return (
    <Article>
      <H1>Contact Us</H1>
      <Form action="/api/contact" method="POST" data-enhance="ajax validation">
        <Label>
          Email:
          <Input type="email" name="email" required />
        </Label>
        <Button type="submit">Send Message</Button>
      </Form>
    </Article>
  );
}
```

This JSX compiles to semantic HTML at build time:

```html
<article class="ld-Article" data-type="Article">
  <h1>Contact Us</h1>
  <form
    class="form"
    action="/api/contact"
    method="POST"
    data-enhance="ajax validation"
  >
    <input type="hidden" name="_charset_" value="UTF-8" />
    <label>
      Email:
      <input type="email" name="email" required />
    </label>
    <button class="button" type="submit">Send Message</button>
  </form>
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article"
    }
  </script>
</article>
```

## Progressive Enhancement Pattern

Components support opt-in enhancement via `data-*` attributes:

```tsx
// Form with opt-in AJAX and custom validation
<Form action="/api/submit" data-enhance="ajax validation">
  ...
</Form>

// Link with opt-in smooth scroll
<a href="#section" data-enhance="smooth-scroll">Jump to section</a>

// Modal that works as a regular link without JS
<a href="/help" data-enhance="modal">Help</a>
```

Progressive enhancement scripts (provided separately or via Architect) look for these attributes and add behavior only where requested. Without JavaScript, everything still works as standard HTML.

## Styling and Theming

Components use CSS Custom Properties for theming:

```css
:root {
  --cw-color-primary: #0066cc;
  --cw-color-text: #333;
  --cw-spacing-unit: 1rem;
  --cw-font-family: system-ui, sans-serif;
}
```

Each component includes its own CSS file that gets automatically collected during build. The build process:

1. Scans used components for `index.css` files
2. Walks up ancestor folders for shared styles
3. Generates deduplicated `<link>` tags in document head
4. Applies theme via CSS Custom Properties

Multiple professional themes will be available, designed following proper design principles.

## Build Process

Codewright is designed for build-time compilation:

```bash
# Type check your components
deno check --unstable-temporal src/**/*.tsx

# Build JSX → HTML (your build tool handles this)
# The JSX runtime outputs HTML objects, not React elements
```

## Key Differences from React

| React                        | Codewright                            |
| ---------------------------- | ------------------------------------- |
| Client-side rendering        | Build-time HTML generation            |
| Virtual DOM                  | Direct HTML output                    |
| useState, useEffect          | No hooks (not needed)                 |
| onClick handlers             | data-enhance attributes               |
| Controlled components        | Native HTML form behavior             |
| React.Fragment               | HTML-compatible fragments             |
| Permissive JSX               | Typed HTML with standards enforcement |
| Any attribute on any element | Only valid W3C/WHATWG attributes      |
| No nesting validation        | Enforces proper content models        |

## Development Guidelines

1. **Import components directly** - Better tree-shaking, explicit dependencies
2. **Let HTML be HTML** - Forms submit, links navigate, buttons click
3. **Progressive enhancement is opt-in** - Use data-\* attributes consciously
4. **Semantic first** - Choose components by meaning, not appearance
5. **Accessibility included** - Every component follows WCAG guidelines

## Editor/IDE Support

When configuring your editor for Codewright:

- **Disable React suggestions** - No hooks, no useState, no useEffect
- **Enable HTML validation** - Ensure semantic structure
- **Check accessibility** - ARIA attributes, keyboard navigation
- **Validate forms** - Must have action/method attributes
- **TypeScript paths** - Configure for `@sitebender/codewright/*` imports

## Examples

See the `examples/` directory for:

- Static site with full SEO optimization
- Form handling with progressive enhancement
- Accessible modal and accordion patterns
- Schema.org rich snippets
- Multi-theme implementations

## Contributing

Contributions welcome! Please ensure:

- Components work without JavaScript
- Accessibility is not compromised
- Semantic HTML is the foundation
- Direct imports are maintained (no barrels)

## License

[MIT](../../LICENSE)
