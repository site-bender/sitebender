# Documentation App Tests

## Testing Philosophy

We test the documentation app as users experience it across three progressive enhancement layers:

1. **No JavaScript** - Must work on Lynx, Mosaic, IE6
2. **No CSS** - Must be usable with semantic HTML only
3. **Full enhancement** - Modern browsers with all features

All testing focuses on **behaviors and tasks**, not implementation.

## Progressive Enhancement Testing Strategy

```
┌─────────────────────────────────────────────────┐
│                  MUST WORK                      │
│  ┌───────────────────────────────────────────┐  │
│  │            HTML Only (Lynx)               │  │
│  │  - Forms submit to edge functions         │  │
│  │  - Links navigate between pages           │  │
│  │  - Content is readable and structured     │  │
│  └───────────────────────────────────────────┘  │
│                                                 │
│  ┌───────────────────────────────────────────┐  │
│  │         HTML + CSS (No JavaScript)        │  │
│  │  - Visual hierarchy with typography       │  │
│  │  - Layout with CSS Grid/Flexbox           │  │
│  │  - @supports for progressive features     │  │
│  └───────────────────────────────────────────┘  │
│                                                 │
│  ┌───────────────────────────────────────────┐  │
│  │      Full Enhancement (Modern Browser)    │  │
│  │  - Client-side validation                 │  │
│  │  - Reactive calculations                  │  │
│  │  - Interactive playgrounds                │  │
│  │  - Offline capability                     │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

## Test Structure

```
tests/
├── behaviors/              # User task-focused tests
│   ├── navigation/         # Moving between pages, search
│   ├── learning/           # Tutorials, examples, guides
│   ├── experimenting/      # Playgrounds, code execution
│   ├── searching/          # Finding documentation
│   └── contributing/       # Submitting feedback, issues
├── progressive/            # Enhancement layer tests
│   ├── no-javascript/      # Forms, navigation without JS
│   ├── no-css/             # Semantic HTML only
│   ├── offline/            # Service worker, local storage
│   └── legacy/             # IE, old browsers
├── accessibility/          # WCAG 2.3 AAA compliance
│   ├── keyboard/           # Full keyboard navigation
│   ├── screen-reader/      # NVDA, JAWS, VoiceOver
│   ├── contrast/           # Color contrast testing
│   └── motion/             # Reduced motion support
├── performance/            # Load times, bundle sizes
├── edge-functions/         # API mocking with MSW
└── helpers/                # Test utilities
```

## Example Tests

### Testing Navigation Without JavaScript

```typescript
// tests/progressive/no-javascript/navigation/index.ts
import { test, expect } from "playwright-mcp"
import { injectAxe, checkA11y } from "@axe-core/playwright"

test.describe("Navigation without JavaScript", () => {
  test.beforeEach(async ({ page }) => {
    // Disable JavaScript completely
    await page.setJavaScriptEnabled(false)
  })
  
  test("can navigate entire documentation site", async ({ page }) => {
    await page.goto("/")
    
    // Check main navigation works
    await page.click('a[href="/components"]')
    await expect(page).toHaveURL("/components")
    await expect(page.locator("h1")).toContainText("Components Library")
    
    // Check sub-navigation works
    await page.click('a[href="/components/forms"]')
    await expect(page).toHaveURL("/components/forms")
    
    // Check breadcrumbs work
    await page.click('nav[aria-label="breadcrumb"] a[href="/components"]')
    await expect(page).toHaveURL("/components")
    
    // Check search form submits to edge function
    await page.fill('input[name="search"]', "Button component")
    await page.click('button[type="submit"]')
    await expect(page).toHaveURL(/\/search\?q=Button\+component/)
    await expect(page.locator(".search-results")).toBeVisible()
  })
  
  test("table of contents links work without JS", async ({ page }) => {
    await page.goto("/components/forms/validation")
    
    // All TOC links should be anchors
    const tocLinks = page.locator('nav[aria-label="On this page"] a')
    const count = await tocLinks.count()
    
    for (let i = 0; i < count; i++) {
      const href = await tocLinks.nth(i).getAttribute("href")
      expect(href).toMatch(/^#[\w-]+$/)
      
      // Click should scroll to section
      await tocLinks.nth(i).click()
      const hash = new URL(page.url()).hash
      expect(hash).toBe(href)
    }
  })
})
```

### Testing Form Submission Progressive Enhancement

```typescript
// tests/behaviors/experimenting/forms/index.ts
import { test, expect } from "playwright-mcp"
import * as fc from "fast-check"
import { setupMSW } from "../../../helpers/msw-setup"

test.describe("Form submission behaviors", () => {
  test("forms work without JavaScript", async ({ page }) => {
    await page.setJavaScriptEnabled(false)
    await page.goto("/examples/contact-form")
    
    // Fill form
    await page.fill('input[name="name"]', "Test User")
    await page.fill('input[name="email"]', "test@example.com")
    await page.fill('textarea[name="message"]', "Test message")
    
    // Submit should POST to edge function
    await page.click('button[type="submit"]')
    
    // Should redirect to success page
    await expect(page).toHaveURL("/examples/contact-form/success")
    await expect(page.locator(".success-message")).toContainText("Thank you")
  })
  
  test("forms enhance with client-side validation", async ({ page }) => {
    await page.goto("/examples/contact-form")
    
    // Wait for enhancement script to load
    await page.waitForSelector('[data-validate="enhanced"]')
    
    // Try submitting empty form
    await page.click('button[type="submit"]')
    
    // Should show client-side validation messages
    await expect(page.locator('input[name="name"]:invalid')).toBeVisible()
    const errorMessage = page.locator('[role="alert"]').first()
    await expect(errorMessage).toContainText("Name is required")
    
    // Should NOT have navigated
    await expect(page).toHaveURL("/examples/contact-form")
  })
  
  test("validation handles edge cases", async ({ page }) => {
    await fc.assert(
      fc.asyncProperty(
        fc.string().filter(s => s.length > 0 && s.length < 10000),
        fc.string().filter(s => s.includes("@") || s === ""),
        async (name, email) => {
          await page.goto("/examples/contact-form")
          
          await page.fill('input[name="name"]', name)
          await page.fill('input[name="email"]', email)
          
          if (!email.includes("@")) {
            // Should show validation error
            await page.click('button[type="submit"]')
            const hasError = await page.locator('input[name="email"]:invalid').isVisible()
            expect(hasError).toBe(true)
          }
        }
      ),
      { numRuns: 100 }
    )
  })
})
```

### Testing Adaptive Library Hydration

```typescript
// tests/behaviors/experimenting/adaptive/index.ts
import { test, expect } from "playwright-mcp"

test.describe("Adaptive configuration hydration", () => {
  test("SSR renders placeholders, client hydrates with real values", async ({ page }) => {
    // First load with JS disabled to check SSR
    await page.setJavaScriptEnabled(false)
    await page.goto("/examples/calculator")
    
    // SSR should show placeholders
    const sumElement = page.locator('[data-adaptive-type="operator"]').first()
    await expect(sumElement).toContainText("[sum]")
    
    // Now enable JS and reload
    await page.setJavaScriptEnabled(true)
    await page.reload()
    
    // Wait for hydration
    await page.waitForSelector('[data-adaptive-hydrated="true"]')
    
    // Should now show calculated value
    await expect(sumElement).not.toContainText("[sum]")
    await expect(sumElement).toContainText(/\d+/)
  })
  
  test("reactive calculations update on input", async ({ page }) => {
    await page.goto("/examples/invoice")
    
    // Change quantity
    await page.fill('input[name="quantity"]', "5")
    
    // Total should update reactively
    const total = page.locator('[data-calculation="total"]')
    await expect(total).toContainText(/\$\d+\.\d{2}/)
    
    // Change price
    await page.fill('input[name="price"]', "19.99")
    
    // Total should update again
    await expect(total).toContainText("$99.95")
  })
  
  test("conditional display based on calculations", async ({ page }) => {
    await page.goto("/examples/conditional-content")
    
    const conditionalSection = page.locator('[data-show-when]')
    
    // Initially hidden
    await expect(conditionalSection).toBeHidden()
    
    // Change input to trigger condition
    await page.fill('input[name="age"]', "18")
    
    // Should now be visible
    await expect(conditionalSection).toBeVisible()
  })
})
```

### Testing Monaco Playground

```typescript
// tests/behaviors/experimenting/playground/index.ts
import { test, expect } from "playwright-mcp"

test.describe("Code playground behaviors", () => {
  test("can execute code and see results", async ({ page }) => {
    await page.goto("/playground")
    
    // Wait for Monaco to load
    await page.waitForSelector('.monaco-editor')
    
    // Type code
    await page.click('.monaco-editor')
    await page.keyboard.type(`
      import map from "@sitebender/toolkit/simple/array/map"
      
      const double = map((x: number) => x * 2)
      console.log(double([1, 2, 3, 4]))
    `)
    
    // Run code
    await page.click('button[aria-label="Run code"]')
    
    // Check output
    const output = page.locator('[role="log"]')
    await expect(output).toContainText("[2, 4, 6, 8]")
  })
  
  test("playground works offline", async ({ page, context }) => {
    await page.goto("/playground")
    
    // Go offline
    await context.setOffline(true)
    
    // Should still be able to run code
    await page.click('.monaco-editor')
    await page.keyboard.type('console.log("offline test")')
    await page.click('button[aria-label="Run code"]')
    
    const output = page.locator('[role="log"]')
    await expect(output).toContainText("offline test")
  })
  
  test("can import and use all three libraries", async ({ page }) => {
    await page.goto("/playground")
    
    const examples = [
      {
        lib: "toolkit",
        code: `
          import pipe from "@sitebender/toolkit/simple/combinator/pipe"
          import map from "@sitebender/toolkit/simple/array/map"
          
          const result = pipe([map(x => x * 2)])([1, 2, 3])
          console.log(result)
        `,
        expected: "[2, 4, 6]"
      },
      {
        lib: "adaptive",
        code: `
          import Add from "@sitebender/adaptive/constructors/operators/Add"
          import Constant from "@sitebender/adaptive/constructors/injectors/Constant"
          
          const config = Add()([Constant()(5), Constant()(3)])
          console.log(config)
        `,
        expected: "tag: \"Add\""
      },
      {
        lib: "components",
        code: `
          import Button from "@sitebender/components/interact/buttons/Button"
          
          const btn = Button({ label: "Click me", variant: "primary" })
          console.log(btn)
        `,
        expected: "Click me"
      }
    ]
    
    for (const example of examples) {
      await page.click('.monaco-editor')
      await page.keyboard.press('Control+A')
      await page.keyboard.press('Delete')
      await page.keyboard.type(example.code)
      await page.click('button[aria-label="Run code"]')
      
      const output = page.locator('[role="log"]')
      await expect(output).toContainText(example.expected)
    }
  })
})
```

### Testing Accessibility

```typescript
// tests/accessibility/wcag/index.ts
import { test, expect } from "playwright-mcp"
import { injectAxe, checkA11y } from "@axe-core/playwright"

test.describe("WCAG 2.3 AAA Compliance", () => {
  const pages = [
    "/",
    "/components",
    "/toolkit",
    "/adaptive",
    "/examples",
    "/playground",
    "/tutorials"
  ]
  
  for (const path of pages) {
    test(`${path} meets WCAG AAA standards`, async ({ page }) => {
      await page.goto(path)
      await injectAxe(page)
      
      await checkA11y(page, null, {
        detailedReport: true,
        detailedReportOptions: {
          html: true
        },
        runOnly: {
          type: "tag",
          values: ["wcag2aaa"]
        }
      })
    })
  }
  
  test("keyboard navigation works throughout", async ({ page }) => {
    await page.goto("/")
    
    // Tab through main navigation
    await page.keyboard.press("Tab") // Skip to main
    await page.keyboard.press("Tab") // First nav item
    
    // Check focus is visible
    const focused = page.locator(":focus")
    await expect(focused).toBeVisible()
    await expect(focused).toHaveCSS("outline-style", /solid|dotted|dashed/)
    
## Golden and Smoke Tests

### Goldens (snapshot-style)
- No-JS SSR HTML snapshots for key pages: Home, Components index, Component detail, Examples (form, conditional, JSON-LD), Playground.
- Snapshot both the HTML and the embedded root IR script payload shape (schema version, node ids present).
- Tolerate dynamic IDs via stable serializers or deterministic seeds.

### Smoke tests
- Registry resolution by tag succeeds (operators, injectors, comparators) in the built app bundle.
- SSR render returns a string without throwing for representative pages.
- Hydrate walk runs once, attaches validators/events/calculations, and marks `[data-adaptive-hydrated="true"]`.
- Playground: Worker starts, executes sandboxed code, console output captured, and network is blocked by default.

## Performance & Security Budgets
- Lighthouse budgets: TTFB, LCP, CLS thresholds; track trends in CI.
- Bundle size ceilings for enhancement JS and CSS per route; enforce via CI diff checks.
- CSP: strict default-src 'self'; allowlist Monaco/worker/CDN as needed; tests assert policy headers and no violations in console.
- MSW or fetch mocks: deny-by-default for playground code; explicit allowlist for docs API examples.

## Offline and Manifest
- Validate presence and correctness of web app manifest.
- Service Worker tests: cache key assets, fallback page works offline, playground executes offline demo.

## Browser Support Policy
- Baseline: pages function without JS or CSS (semantic HTML, standard form submits, full page reloads acceptable).
- Enhancement: modern browsers get client-side validation, reactive updates, and playgrounds.
- Include a test matrix doc and minimal automated checks for “no-JS”, “no-CSS”, and “legacy-ish” modes.

## Privacy & Compliance
- Document and test telemetry policy: no PII, no third-party beacons by default; explicit opt-in where applicable.
- Validate adherence to W3C Privacy CG guidance and EU requirements (cookies/storage only for enhancements, with graceful degradation).

## Collaboration & Offline Sync Tests (Future)
- Local-first edits are persisted to IndexedDB; survive reload and offline restarts.
- CRDT sync convergence: simulate two clients with divergent edits; ensure eventual consistency after reconnection.
- Presence and cursors (optional later): basic presence messages exchanged; no personal data beyond pseudonymous IDs.
- Conflict scenarios: large edits, reorders, deletes; verify CRDT resolves without data loss.
- MCP tool smoke: AI assistant can read page context and propose tasks; guarded write operations require explicit user confirmation.

    // Navigate with arrow keys in menu
    await page.keyboard.press("ArrowDown")
    await expect(page.locator(":focus")).toHaveAttribute("role", "menuitem")
    
    // Escape closes menu
    await page.keyboard.press("Escape")
    await expect(page.locator("[role=\"menu\"]")).toBeHidden()
  })
  
  test("screen reader announces dynamic changes", async ({ page }) => {
    await page.goto("/examples/calculator")
    
    // Check live region exists
    const liveRegion = page.locator('[aria-live="polite"]')
    await expect(liveRegion).toBeAttached()
    
    // Change input
    await page.fill('input[name="value1"]', "10")
    
    // Live region should announce result
    await expect(liveRegion).toContainText(/Result.*10/)
  })
})
```

### Testing CSS Degradation

```typescript
// tests/progressive/no-css/index.ts
import { test, expect } from "playwright-mcp"

test.describe("Usability without CSS", () => {
  test.beforeEach(async ({ page }) => {
    // Disable all CSS
    await page.addInitScript(() => {
      const style = document.createElement('style')
      style.innerHTML = '*, *::before, *::after { all: unset !important; }'
      document.head.appendChild(style)
    })
  })
  
  test("content structure remains clear", async ({ page }) => {
    await page.goto("/components/forms")
    
    // Headings should create hierarchy
    const h1 = page.locator("h1").first()
    const h2 = page.locator("h2").first()
    
    await expect(h1).toBeVisible()
    await expect(h2).toBeVisible()
    
    // Lists should be clear
    const ul = page.locator("ul").first()
    const items = ul.locator("li")
    expect(await items.count()).toBeGreaterThan(0)
    
    // Forms should still be usable
    const form = page.locator("form").first()
    const labels = form.locator("label")
    const inputs = form.locator("input, textarea, select")
    
    expect(await labels.count()).toBeGreaterThan(0)
    expect(await inputs.count()).toBeGreaterThan(0)
  })
  
  test("tables remain readable", async ({ page }) => {
    await page.goto("/components/reference")
    
    const table = page.locator("table").first()
    const headers = table.locator("th")
    const cells = table.locator("td")
    
    // Should have headers and data
    expect(await headers.count()).toBeGreaterThan(0)
    expect(await cells.count()).toBeGreaterThan(0)
    
    // Headers should have scope
    const firstHeader = headers.first()
    await expect(firstHeader).toHaveAttribute("scope", /col|row/)
  })
})
```

### Testing Build Process

```typescript
// tests/behaviors/building/assets/index.ts
import { test, expect } from "@std/testing/bdd"
import { walk } from "@std/fs"
import { join } from "@std/path"

describe("Asset collection and deduplication", () => {
  it("collects CSS from all used components", async () => {
    // Run build script
    const buildProcess = new Deno.Command("deno", {
      args: ["task", "build"],
      cwd: "/app"
    })
    
    await buildProcess.output()
    
    // Check generated CSS file
    const cssPath = join(Deno.cwd(), "dist", "styles.css")
    const css = await Deno.readTextFile(cssPath)
    
    // Should include component styles
    expect(css).toContain(".button")
    expect(css).toContain(".form")
    
    // Should include ancestor styles in correct order
    const buttonIndex = css.indexOf(".interact")
    const buttonSpecificIndex = css.indexOf(".button")
    expect(buttonIndex).toBeLessThan(buttonSpecificIndex)
    
    // Should be deduped (only one .button class)
    const buttonMatches = css.match(/\.button\s*\{/g)
    expect(buttonMatches?.length).toBe(1)
  })
  
  it("collects enhancement scripts from components", async () => {
    const scriptsPath = join(Deno.cwd(), "dist", "scripts")
    
    // Should have compiled TypeScript to JavaScript
    for await (const entry of walk(scriptsPath)) {
      if (entry.isFile) {
        expect(entry.name).toMatch(/\.js$/)
        
        // Should not have TypeScript files
        expect(entry.name).not.toMatch(/\.ts$/)
      }
    }
    
    // Check specific enhancement scripts exist
    const formEnhancement = join(scriptsPath, "form-validation.js")
    const exists = await Deno.stat(formEnhancement).catch(() => null)
    expect(exists).toBeTruthy()
  })
})
```

### Testing Edge Function Mocking

```typescript
// tests/edge-functions/mocking/index.ts
import { test, expect } from "playwright-mcp"
import { setupServer } from "msw/node"
import { rest } from "msw"

const server = setupServer(
  rest.post("/api/search", (req, res, ctx) => {
    const { query } = req.body as { query: string }
    
    return res(
      ctx.json({
        results: [
          { title: `Result for ${query}`, url: "/example" }
        ]
      })
    )
  }),
  
  rest.post("/api/feedback", (req, res, ctx) => {
    return res(ctx.json({ success: true }))
  })
)

test.beforeAll(() => server.listen())
test.afterEach(() => server.resetHandlers())
test.afterAll(() => server.close())

test.describe("Edge function integration", () => {
  test("search works without client JS", async ({ page }) => {
    await page.setJavaScriptEnabled(false)
    await page.goto("/")
    
    await page.fill('input[name="search"]', "Button")
    await page.click('button[type="submit"]')
    
    // Should show results from edge function
    await expect(page.locator(".search-results")).toContainText("Result for Button")
  })
  
  test("feedback form submits to edge function", async ({ page }) => {
    await page.goto("/feedback")
    
    await page.fill('textarea[name="feedback"]', "Great documentation!")
    await page.click('button[type="submit"]')
    
    await expect(page.locator(".success")).toContainText("Thank you")
  })
})
```

## Test Helpers

```typescript
// tests/helpers/progressive-enhancement/index.ts
export async function testInAllModes(
  name: string,
  testFn: (page: Page, mode: string) => Promise<void>
) {
  const modes = [
    { name: "no-js", setup: (page) => page.setJavaScriptEnabled(false) },
    { name: "no-css", setup: (page) => disableCSS(page) },
    { name: "full", setup: () => {} }
  ]
  
  for (const mode of modes) {
    test(`${name} (${mode.name})`, async ({ page }) => {
      await mode.setup(page)
      await testFn(page, mode.name)
    })
  }
}

// tests/helpers/fixtures/index.ts
export const formTestData = {
  valid: {
    name: "Test User",
    email: "test@example.com",
    message: "Test message"
  },
  invalid: {
    name: "",
    email: "not-an-email",
    message: ""
  },
  edgeCases: {
    longName: "A".repeat(1000),
    unicodeName: "用户测试 🎉",
    sqlInjection: "'; DROP TABLE users; --",
    xss: "<script>alert('XSS')</script>"
  }
}

// tests/helpers/msw-setup/index.ts
import { setupServer } from "msw/node"
import { rest } from "msw"

export function setupMSW(handlers = []) {
  const server = setupServer(
    ...handlers,
    // Default handlers
    rest.get("/api/health", (req, res, ctx) => {
      return res(ctx.json({ status: "ok" }))
    })
  )
  
  return server
}
```

## Running Tests

```bash
# Run all tests
deno task test

# Test specific behaviors
deno task test:navigation
deno task test:forms
deno task test:playground

# Test progressive enhancement layers
deno task test:no-js
deno task test:no-css
deno task test:offline

# Accessibility tests
deno task test:a11y

# Performance tests
deno task test:perf

# Watch mode
deno task test:watch

# With coverage
deno task test:cov
```

## Testing Principles

1. **Progressive Enhancement First**: Always test no-JS, no-CSS, then full
2. **Real User Behaviors**: Test tasks, not implementation
3. **Edge Cases with Property Testing**: Use fast-check for forms, inputs
4. **Accessibility is Required**: Every page must pass WCAG AAA
5. **Performance Budgets**: Set limits for bundle size, load time
6. **Mock at Network Level**: Use MSW for edge functions, not module mocks

## Testing Checklist for Each Feature

- [ ] Works without JavaScript
- [ ] Works without CSS  
- [ ] Keyboard navigable
- [ ] Screen reader accessible
- [ ] Works offline (if applicable)
- [ ] Handles edge cases
- [ ] Performs within budget
- [ ] Degrades gracefully
- [ ] State persists appropriately (URL, storage)
- [ ] Error messages are helpful

## Future Testing Considerations

### Offline with CRDTs (To Be Implemented)
- Test sync when coming back online
- Test conflict resolution
- Test local-first data persistence

### State Management Testing (To Be Implemented)
- URL state persistence
- Cookie state (for no-JS)
- LocalStorage/SessionStorage
- IndexedDB for large data

### AI/MCP Integration (Future)
- Test search improvements
- Test contextual help
- Test code suggestions

### HTTP/3 Optimization (Research Needed)
- Test server push for preloading
- Test multiplexing benefits
- Test 0-RTT for returning visitors

## Coverage Requirements

- **Behavior Coverage**: 100% of user-facing features
- **Accessibility Coverage**: 100% of pages pass WCAG AAA
- **Progressive Enhancement**: 100% core features work without JS
- **Browser Support**: Test on Lynx, IE11, and modern browsers
- **Error Scenarios**: Test all failure modes with helpful messages
