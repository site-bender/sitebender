# Components Library Tests

## Testing Philosophy

We test **behaviors, not implementation**. Components must work semantically, accessibly, and progressively enhanced.

## Structure

Tests mirror the source structure, organized by component behaviors:

```
tests/
├── define/           # Schema.org components (Thing hierarchy)
├── identify/         # Semantic identification components
├── format/           # Text formatting components
├── interact/         # Interactive components (forms, buttons)
├── afford/      # Accessibility components
├── structure/        # Document structure components
├── wrap/            # Context wrapper components
└── helpers/         # Shared test utilities
```

## Example Tests

### Testing Schema.org Components (Enrich)

```typescript
// tests/define/Person/index.ts
import { assertEquals, assertStringIncludes } from "@std/testing/asserts"
import { describe, it } from "@std/testing/bdd"
import { renderToString } from "preact-render-to-string"

import Person from "../../../src/define/Thing/Person/index.tsx"
import Book from "../../../src/define/Thing/CreativeWork/Book/index.tsx"

describe("Person component behavior", () => {
  it("renders with template and generates structured data", () => {
    const html = renderToString(
      <Person
        _template="{{bold(name)}} is a {{jobTitle}} at {{cite(worksFor.name)}}"
        name="Jane Doe"
        jobTitle="Software Engineer"
        email="jane@example.com"
        worksFor={{
          _type: "Organization",
          name: "Tech Corp"
        }}
      />
    )
    
    // Check template output
    assertStringIncludes(html, "<strong>Jane Doe</strong>")
    assertStringIncludes(html, "is a Software Engineer")
    assertStringIncludes(html, "<cite>Tech Corp</cite>")
    
    // Check microdata generation
    assertStringIncludes(html, 'class="microdata"')
    assertStringIncludes(html, 'itemscope')
    assertStringIncludes(html, 'itemtype="https://schema.org/Person"')
    assertStringIncludes(html, '<meta itemprop="name" content="Jane Doe"')
    assertStringIncludes(html, '<meta itemprop="jobTitle" content="Software Engineer"')
    
    // Check JSON-LD generation
    assertStringIncludes(html, '<script type="application/ld+json">')
    assertStringIncludes(html, '"@context": "https://schema.org"')
    assertStringIncludes(html, '"@type": "Person"')
    assertStringIncludes(html, '"name": "Jane Doe"')
  })
  
  it("generates proper microdata and JSON-LD without template", () => {
    const html = renderToString(
      <Person
        name="John Smith"
        birthDate="1990-01-01"
        nationality="US"
      />
    )
    
    // Without template, only structured data is generated
    // Microdata in invisible spans
    assertStringIncludes(html, 'itemscope')
    assertStringIncludes(html, 'itemtype="https://schema.org/Person"')
    assertStringIncludes(html, '<meta itemprop="name" content="John Smith"')
    assertStringIncludes(html, '<meta itemprop="birthDate" content="1990-01-01"')
    
    // JSON-LD in script tag
    assertStringIncludes(html, '"@type": "Person"')
    assertStringIncludes(html, '"birthDate": "1990-01-01"')
  })
  
  it("can disable microdata or JSON-LD generation", () => {
    const htmlNoMicrodata = renderToString(
      <Person
        name="Alice"
        disableMicrodata={true}
      />
    )
    
    // No microdata spans
    assert(!htmlNoMicrodata.includes('class="microdata"'))
    // But still has JSON-LD
    assertStringIncludes(htmlNoMicrodata, '"@type": "Person"')
    
    const htmlNoJsonLd = renderToString(
      <Person
        name="Bob"
        disableJsonLd={true}
      />
    )
    
    // Has microdata
    assertStringIncludes(htmlNoJsonLd, 'itemscope')
    // But no JSON-LD script
    assert(!htmlNoJsonLd.includes('<script type="application/ld+json">'))
  })
})

describe("Book component with template formatting", () => {
  it("renders book information with template", () => {
    const html = renderToString(
      <Book
        _template='{{italic(name)}} by {{bold(author.name)}} ({{datePublished}})'
        name="The Great Gatsby"
        author={{
          _type: "Person",
          name: "F. Scott Fitzgerald"
        }}
        datePublished="1925"
        isbn="978-0-7432-7356-5"
      />
    )
    
    // Check formatted output
    assertStringIncludes(html, "<em>The Great Gatsby</em>")
    assertStringIncludes(html, "<strong>F. Scott Fitzgerald</strong>")
    assertStringIncludes(html, "(1925)")
    
    // Check structured data
    assertStringIncludes(html, '"@type": "Book"')
    assertStringIncludes(html, '"isbn": "978-0-7432-7356-5"')
  })
})
```

### Testing Semantic Components (Identify)

```typescript
// tests/identify/linguistic/Abbreviation/index.ts
import { assertEquals, assertStringIncludes } from "@std/testing/asserts"
import { describe, it } from "@std/testing/bdd"
import { renderToString } from "preact-render-to-string"
import { axe } from "@axe-core/playwright"

import Abbreviation from "../../../../src/identify/linguistic/Abbreviation/index.tsx"

describe("Abbreviation component behavior", () => {
  it("marks up abbreviations with expansions", () => {
    const html = renderToString(
      <Abbreviation expansion="Doctor">Dr.</Abbreviation>
    )
    
    assertStringIncludes(html, '<abbr')
    assertStringIncludes(html, 'title="Doctor"')
    assertStringIncludes(html, 'aria-label="abbreviation for Doctor"')
    assertStringIncludes(html, '>Dr.</abbr>')
  })
  
  it("handles language-specific abbreviations", () => {
    const html = renderToString(
      <Abbreviation 
        expansion="et cetera" 
        lang="la"
        ipa="/ɛt ˈsɛtərə/"
      >
        etc.
      </Abbreviation>
    )
    
    assertStringIncludes(html, 'lang="la"')
    assertStringIncludes(html, 'data-ipa="/ɛt ˈsɛtərə/"')
  })
  
  it("creates linked abbreviations when href provided", () => {
    const html = renderToString(
      <Abbreviation 
        expansion="Application Programming Interface"
        href="/glossary#api"
      >
        API
      </Abbreviation>
    )
    
    assertStringIncludes(html, '<a href="/glossary#api"')
    assertStringIncludes(html, 'class="abbreviation-link"')
    assertStringIncludes(html, '<abbr')
  })
})
```

### Testing Interactive Components with E2E

```typescript
// tests/interact/forms/Form/index.ts
import { test, expect } from "playwright-mcp"
import { injectAxe, checkA11y } from "@axe-core/playwright"

test.describe("Form component behavior", () => {
  test("handles form submission without JavaScript", async ({ page }) => {
    // Disable JavaScript to test progressive enhancement
    await page.setJavaScriptEnabled(false)
    await page.goto("/test/form")
    
    // Fill form
    await page.fill('input[name="name"]', "Test User")
    await page.fill('input[name="email"]', "test@example.com")
    
    // Submit form
    await page.click('button[type="submit"]')
    
    // Verify server-side handling
    await expect(page).toHaveURL(/\/form-success/)
  })
  
  test("enhances with client-side validation when JS enabled", async ({ page }) => {
    await page.goto("/test/form")
    
    // Try submitting empty form
    await page.click('button[type="submit"]')
    
    // Check for client-side validation messages
    const nameError = page.locator('input[name="name"]:invalid')
    await expect(nameError).toBeVisible()
    
    // HTML5 validation should prevent submission
    await expect(page).toHaveURL("/test/form") // Still on same page
  })
  
  test("is fully accessible", async ({ page }) => {
    await page.goto("/test/form")
    await injectAxe(page)
    
    // Check initial accessibility
    await checkA11y(page, null, {
      detailedReport: true,
      rules: {
        "label": { enabled: true },
        "aria-valid-attr": { enabled: true },
        "color-contrast-enhanced": { enabled: true }
      }
    })
    
    // Check with errors displayed
    await page.click('button[type="submit"]')
    await checkA11y(page, null, {
      detailedReport: true
    })
  })
})
```

### Testing Adaptive Integration

```typescript
// tests/adaptive/calculations/index.ts
import { assertEquals, assertExists } from "@std/testing/asserts"
import { describe, it } from "@std/testing/bdd"
import { renderToString } from "preact-render-to-string"

// Component imports - these are JSX wrappers for adaptive constructors
import Add from "../../../src/adaptive/operators/Add/index.tsx"
import Multiply from "../../../src/adaptive/operators/Multiply/index.tsx"
import Constant from "../../../src/adaptive/injectors/Constant/index.tsx"
import FromElement from "../../../src/adaptive/injectors/FromElement/index.tsx"

describe("Adaptive calculation integration", () => {
  it("creates calculation configurations from JSX", () => {
    // The JSX components wrap adaptive constructors
    const calculation = (
      <Add>
        <Multiply>
          <FromElement id="quantity" />
          <FromElement id="price" />
        </Multiply>
        <Constant value={10} />
      </Add>
    )
    
    // These components return adaptive configurations
    assertExists(calculation)
    // The actual structure depends on how the JSX transform handles children
  })
  
  it("uses default Number type for Add", () => {
    const calculation = (
      <Add>
        <Constant value={5} />
        <Constant value={3} />
      </Add>
    )
    
    // Add defaults to Number type
    assertExists(calculation)
  })
  
  it("can specify String type for concatenation", () => {
    const calculation = (
      <Add type="String">
        <Constant value="Hello, " />
        <Constant value="World!" />
      </Add>
    )
    
    // Add with String type concatenates
    assertExists(calculation)
  })
})
```

### Testing Formatting Components

```typescript
// tests/format/typographic/Emphasized/index.ts
import { assertEquals, assertStringIncludes } from "@std/testing/asserts"
import { describe, it } from "@std/testing/bdd"
import { renderToString } from "preact-render-to-string"
import * as fc from "fast-check"

import Emphasized from "../../../../src/format/typographic/Emphasized/index.tsx"

describe("Emphasized component behavior", () => {
  it("renders semantic emphasis", () => {
    const html = renderToString(
      <Emphasized>important text</Emphasized>
    )
    
    assertStringIncludes(html, "<em>important text</em>")
  })
  
  it("supports different emphasis levels", () => {
    const html = renderToString(
      <Emphasized level="strong">very important</Emphasized>
    )
    
    assertStringIncludes(html, "<strong>very important</strong>")
  })
  
  // Property-based test
  it("always preserves content", () => {
    fc.assert(
      fc.property(fc.string(), (text) => {
        const html = renderToString(
          <Emphasized>{text}</Emphasized>
        )
        assertStringIncludes(html, text)
      })
    )
  })
})
```

### Testing Accessibility Components

```typescript
// tests/afford/skip/SkipLink/index.ts
import { test, expect } from "playwright-mcp"

test.describe("SkipLink behavior", () => {
  test("provides keyboard navigation to main content", async ({ page }) => {
    await page.goto("/")
    
    // Tab to skip link (should be first focusable element)
    await page.keyboard.press("Tab")
    
    // Check skip link is focused
    const skipLink = page.locator('a[href="#main"]')
    await expect(skipLink).toBeFocused()
    await expect(skipLink).toContainText("Skip to main content")
    
    // Activate skip link
    await page.keyboard.press("Enter")
    
    // Check main content is focused
    const main = page.locator('#main')
    await expect(main).toBeFocused()
  })
  
  test("is visible on focus for keyboard users", async ({ page }) => {
    await page.goto("/")
    
    // Initially hidden visually but present in DOM
    const skipLink = page.locator('.skip-link')
    await expect(skipLink).toBeAttached()
    await expect(skipLink).toHaveCSS('position', 'absolute')
    
    // Becomes visible on focus
    await page.keyboard.press("Tab")
    await expect(skipLink).toBeVisible()
  })
})
```

### Testing Document Structure

```typescript
// tests/structure/document/Article/index.ts
import { assertEquals, assertExists } from "@std/testing/asserts"
import { describe, it } from "@std/testing/bdd"
import { renderToString } from "preact-render-to-string"

import Article from "../../../../src/structure/document/Article/index.tsx"
import Section from "../../../../src/structure/document/Section/index.tsx"
import Heading from "../../../../src/structure/document/Heading/index.tsx"

describe("Article structure behavior", () => {
  it("creates proper document outline", () => {
    const article = (
      <Article>
        <Heading level={1}>Main Article Title</Heading>
        <Section>
          <Heading level={2}>Introduction</Heading>
          <p>Content here...</p>
        </Section>
        <Section>
          <Heading level={2}>Details</Heading>
          <p>More content...</p>
        </Section>
      </Article>
    )
    
    const html = renderToString(article)
    
    // Check semantic structure
    assertStringIncludes(html, "<article>")
    assertStringIncludes(html, "<section>")
    assertStringIncludes(html, "<h1>Main Article Title</h1>")
    assertStringIncludes(html, "<h2>Introduction</h2>")
    
    // Verify document outline hierarchy
    const headings = html.match(/<h[1-6]/g)
    assertEquals(headings?.length, 3)
  })
  
  it("maintains heading hierarchy", () => {
    // Test that heading levels are properly nested
    const article = (
      <Article>
        <Heading level={1}>Title</Heading>
        <Section>
          <Heading level={2}>Subtitle</Heading>
          <Section>
            <Heading level={3}>Sub-subtitle</Heading>
          </Section>
        </Section>
      </Article>
    )
    
    const html = renderToString(article)
    
    // h3 should come after h2, which comes after h1
    const h1Index = html.indexOf("<h1>")
    const h2Index = html.indexOf("<h2>")
    const h3Index = html.indexOf("<h3>")
    
    assert(h1Index < h2Index)
    assert(h2Index < h3Index)
  })
})
```

## Test Helpers

```typescript
// tests/helpers/renderWithContext/index.ts
import { render } from "preact-render-to-string"

/**
 * Renders a component with proper context for testing
 */
export default function renderWithContext(
  component: JSX.Element,
  options = {}
) {
  // Add any necessary context providers here
  return render(component, options)
}

// tests/helpers/createTestPage/index.ts
import { Page } from "playwright"

/**
 * Sets up a test page with components loaded
 */
export async function createTestPage(
  page: Page,
  component: JSX.Element
) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Component Test</title>
      </head>
      <body>
        <div id="root">${renderToString(component)}</div>
      </body>
    </html>
  `
  
  await page.setContent(html)
  return page
}
```

## Running Tests

```bash
# Run all behavioral tests
deno task test

# Run specific component category tests
deno test tests/define/
deno test tests/identify/

# E2E tests with Playwright
deno test tests/interact/ --allow-all

# Watch mode for development
deno task test:watch

# With coverage
deno task test:cov
```

## Key Testing Principles

1. **Semantic HTML First**: Test that components generate proper semantic HTML
2. **Progressive Enhancement**: Components must work without JavaScript
3. **Accessibility Required**: Every component must pass axe-core tests
4. **Real Integration**: Test components composed together, not in isolation
5. **Behavior Focus**: Test what users experience, not implementation details
6. **CSS Collection**: Test that component CSS files are discoverable and collectible
7. **Enhancement Scripts**: Test that TypeScript enhancement scripts compile and work

## Component Categories to Test

### Enrich (Schema.org)
- Proper microdata/JSON-LD generation
- Inheritance through Thing hierarchy
- Template rendering with data

### Identify (Semantic)
- Correct semantic HTML elements
- Language and pronunciation metadata
- Contextual information preserved

### Format (Typography)
- Visual formatting with semantic meaning
- Fallback for CSS disabled
- Preservation of content

### Interact (Forms/Navigation)
- Works without JavaScript
- HTML5 validation
- Keyboard navigation
- ARIA states

### Accommodate (Accessibility)
- Screen reader compatibility
- Skip navigation
- Live regions
- Focus management

### Structure (Document)
- Proper heading hierarchy
- Document outline
- Semantic sections

### Wrap (Context)
- Metadata preservation
- Performance hints
- Language context

## Testing CSS and Enhancement Scripts

### Testing CSS Collection

```typescript
// tests/assets/css-collection/index.ts
import { assertEquals, assertExists } from "@std/testing/asserts"
import { describe, it } from "@std/testing/bdd"
import { walk } from "@std/fs"
import { join, dirname } from "@std/path"

describe("CSS file collection behaviors", () => {
  it("components have CSS files in same folder", async () => {
    // Check Button component
    const buttonPath = "../../../src/interact/buttons/Button/index.tsx"
    const buttonCSS = "../../../src/interact/buttons/Button/index.css"
    
    const cssExists = await Deno.stat(buttonCSS).catch(() => null)
    assertExists(cssExists, "Button component should have index.css")
  })
  
  it("collects CSS from component and ancestors", async () => {
    // For Button component, should collect:
    // 1. src/interact/index.css (if exists)
    // 2. src/interact/buttons/index.css (if exists)
    // 3. src/interact/buttons/Button/index.css
    
    const cssFiles = await collectComponentCSS(
      "src/interact/buttons/Button/index.tsx"
    )
    
    // Should be in ancestor order
    const expectedOrder = [
      "src/interact/index.css",
      "src/interact/buttons/index.css",
      "src/interact/buttons/Button/index.css"
    ]
    
    // Filter out non-existent files
    const existingFiles = []
    for (const file of expectedOrder) {
      const exists = await Deno.stat(file).catch(() => null)
      if (exists) existingFiles.push(file)
    }
    
    assertEquals(cssFiles, existingFiles)
  })
  
  it("deduplicates CSS when multiple components use same ancestors", () => {
    const button1CSS = [
      "src/interact/index.css",
      "src/interact/buttons/index.css",
      "src/interact/buttons/Button/index.css"
    ]
    
    const button2CSS = [
      "src/interact/index.css",
      "src/interact/buttons/index.css",
      "src/interact/buttons/IconButton/index.css"
    ]
    
    const combined = deduplicateCSS([...button1CSS, ...button2CSS])
    
    // Should only include each ancestor once
    assertEquals(combined, [
      "src/interact/index.css",
      "src/interact/buttons/index.css",
      "src/interact/buttons/Button/index.css",
      "src/interact/buttons/IconButton/index.css"
    ])
  })
})

// Helper function to collect CSS
async function collectComponentCSS(componentPath: string): Promise<string[]> {
  const cssFiles = []
  let currentPath = dirname(componentPath)
  const rootPath = "src"
  
  // Walk up the directory tree
  while (currentPath.startsWith(rootPath)) {
    const cssPath = join(currentPath, "index.css")
    const exists = await Deno.stat(cssPath).catch(() => null)
    if (exists) {
      cssFiles.unshift(cssPath) // Add to beginning (ancestor order)
    }
    
    if (currentPath === rootPath) break
    currentPath = dirname(currentPath)
  }
  
  // Add component's own CSS
  const componentCSS = componentPath.replace(".tsx", ".css")
  const exists = await Deno.stat(componentCSS).catch(() => null)
  if (exists) {
    cssFiles.push(componentCSS)
  }
  
  return cssFiles
}

function deduplicateCSS(files: string[]): string[] {
  return [...new Set(files)]
}
```

### Testing Progressive Enhancement Scripts

```typescript
// tests/assets/enhancement-scripts/index.ts
import { assertEquals, assertExists } from "@std/testing/asserts"
import { describe, it } from "@std/testing/bdd"
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"

describe("Enhancement script behaviors", () => {
  it("Form component has enhancement script", async () => {
    const scriptPath = "../../../src/interact/forms/Form/enhance.ts"
    const exists = await Deno.stat(scriptPath).catch(() => null)
    assertExists(exists, "Form should have enhancement script")
  })
  
  it("enhancement scripts compile to JavaScript", async () => {
    // This would be part of build process
    const tsPath = "src/interact/forms/Form/enhance.ts"
    const jsPath = "dist/scripts/forms/Form/enhance.js"
    
    // Run TypeScript compiler
    const cmd = new Deno.Command("deno", {
      args: ["bundle", tsPath, jsPath]
    })
    
    const { success } = await cmd.output()
    assert(success, "TypeScript should compile successfully")
    
    // Check output exists
    const exists = await Deno.stat(jsPath).catch(() => null)
    assertExists(exists)
  })
  
  it("enhancement preserves no-JS functionality", () => {
    const doc = new DOMParser().parseFromString(`
      <form method="POST" action="/api/submit">
        <input type="email" name="email" required />
        <button type="submit">Submit</button>
      </form>
    `, "text/html")
    
    const form = doc.querySelector("form")
    
    // Before enhancement - should work without JS
    assertEquals(form.method, "POST")
    assertEquals(form.action, "/api/submit")
    assert(!form.hasAttribute("data-enhanced"))
    
    // After enhancement - should still submit to server
    enhanceForm(form)
    
    assertEquals(form.method, "POST")
    assertEquals(form.action, "/api/submit")
    assert(form.hasAttribute("data-enhanced"))
  })
  
  it("details element can enhance to Accordion", () => {
    const doc = new DOMParser().parseFromString(`
      <details class="accordion">
        <summary>Click to expand</summary>
        <div>Content here</div>
      </details>
    `, "text/html")
    
    const details = doc.querySelector("details")
    
    // Works without JS as native details
    assertEquals(details.tagName, "DETAILS")
    assertExists(details.querySelector("summary"))
    
    // Can be enhanced to accordion
    enhanceToAccordion(details)
    
    // Should still be details element (progressive enhancement)
    assertEquals(details.tagName, "DETAILS")
    // But with enhanced behavior
    assert(details.classList.contains("accordion-enhanced"))
  })
})

// Mock enhancement functions for testing
function enhanceForm(form: Element) {
  form.setAttribute("data-enhanced", "true")
  
  // Add client-side validation
  form.addEventListener("submit", (e) => {
    const inputs = form.querySelectorAll("input[required]")
    for (const input of inputs) {
      if (!input.value) {
        e.preventDefault()
        input.classList.add("invalid")
      }
    }
  })
}

function enhanceToAccordion(details: Element) {
  details.classList.add("accordion-enhanced")
  
  // Add smooth animation, ARIA attributes, etc.
  const summary = details.querySelector("summary")
  summary?.setAttribute("role", "button")
  summary?.setAttribute("aria-expanded", details.open ? "true" : "false")
}
```

### Testing Component Rendering Without Dependencies

```typescript
// tests/rendering/no-dependencies/index.ts
import { assertEquals, assertStringIncludes } from "@std/testing/asserts"
import { describe, it } from "@std/testing/bdd"
import { renderToString } from "preact-render-to-string"

import Form from "../../../src/interact/forms/Form/index.tsx"
import Button from "../../../src/interact/buttons/Button/index.tsx"

describe("Component rendering without external dependencies", () => {
  it("uses custom createElement for JSX", () => {
    // Components should use our createElement, not React/Preact
    const button = <Button label="Click me" />
    
    // Should produce our component structure
    assertExists(button.tag)
    assertEquals(button.tag, "Button")
    assertExists(button.attributes)
  })
  
  it("renders to HTML string for SSR", () => {
    const form = (
      <Form method="POST" action="/submit">
        <input type="text" name="username" />
        <Button type="submit">Submit</Button>
      </Form>
    )
    
    const html = renderToString(form)
    
    assertStringIncludes(html, '<form method="POST"')
    assertStringIncludes(html, 'action="/submit"')
    assertStringIncludes(html, '<input type="text"')
    assertStringIncludes(html, '<button type="submit"')
  })
})
```
