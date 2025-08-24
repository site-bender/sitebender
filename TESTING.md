# Testing Philosophy & Strategy

## Core Principles

### 1. Test Behaviors, Not Implementation
We test **what** the code does, not **how** it does it. We don't care about internal state, private methods, or implementation details. We care about observable behaviors that users experience.

### 2. No Mocking
We **never** mock our own functions or components. Since we don't use external libraries (zero dependencies), there's nothing external to mock either. At the application edges, we use:
- **MSW (Mock Service Worker)** for external API calls
- **Dependency Injection** for DOM, storage, and other browser APIs

### 3. Integration Over Unit Tests
We prefer testing functions working together as they will be used. Unit tests are acceptable only when a behavior cannot be tested through integration. Our test priority:
1. **E2E tests** (playwright-mcp) - First line of defense for app and components
2. **Integration tests** - Functions working together
3. **Property-based tests** - Edge cases and invariants
4. **Unit tests** - Only when necessary

### 4. Accessibility is Non-Negotiable
Every component must pass accessibility tests using axe-core. We target WCAG 2.3 AAA compliance. Accessibility tests live alongside other behavioral tests.

## Test Organization

### Folder Structure - Behavior-Focused

Tests mirror source structure but are organized by **behaviors**, not test types:

```
libraries/adaptive/tests/
├── operations/
│   ├── arithmetic/         # All arithmetic behavior tests (unit, property, integration)
│   ├── comparison/         # All comparison behavior tests
│   └── composition/        # Tests for composed operations
├── rendering/
│   ├── dom-generation/     # DOM output behavior tests
│   └── reactivity/         # Reactive update behavior tests
└── helpers/               # Shared test utilities
    └── createTestDom/     # DOM injection helper

docs/tests/
├── routes/
│   ├── documentation/     # E2E tests for documentation pages
│   └── navigation/        # E2E tests for navigation behavior
├── components/
│   └── forms/            # E2E tests for form interactions
└── helpers/
    └── setupTestServer/  # MSW server setup
```

**Key Points:**
- Test files are always named `index.ts`
- Folders are named for the behavior being tested
- Related behaviors can be grouped (e.g., `arithmetic` for add/subtract/multiply)
- Test types (unit, property, E2E) are mixed in the same file

## Dependency Injection Pattern

For functions that need DOM or other browser APIs:

```typescript
// Source function with injectable dependency
// src/dom/querySelector/index.ts
export default function querySelector(
  config = { dom: globalThis.document }
) {
  return (selector: string) => config.dom.querySelector(selector)
}

// Test with injected test DOM
// tests/dom/querySelector/index.ts
import createTestDom from "../../helpers/createTestDom/index.ts"

test("querySelector finds elements", () => {
  const { document } = createTestDom(`<div class="target">Found</div>`)
  const query = querySelector({ dom: document })
  
  const element = query(".target")
  assertEquals(element?.textContent, "Found")
})
```

### When to Use Dependency Injection

Use DI for functions that interact with:
- DOM operations
- localStorage/sessionStorage
- Network requests (though prefer MSW)
- File system (though we shouldn't be doing this)
- Time/Date (inject clock)
- Random numbers (inject seed/generator)

**Don't** use DI for pure functions like mathematical operations.

## Testing Patterns

### Property-Based Testing (Inline)

```typescript
// tests/operations/arithmetic/index.ts
import * as fc from "fast-check"

describe("Addition behavior", () => {
  // Regular test
  it("adds positive numbers", () => {
    assertEquals(add([2, 3]), 5)
  })
  
  // Property test in same file
  it("is commutative", () => {
    fc.assert(
      fc.property(fc.float(), fc.float(), (a, b) => {
        assertEquals(add([a, b]), add([b, a]))
      })
    )
  })
})
```

### E2E Testing with Playwright-MCP

```typescript
// docs/tests/routes/documentation/index.ts
import { test, expect } from "playwright-mcp"

test.describe("Documentation behavior", () => {
  test("user can navigate between libraries", async ({ page }) => {
    await page.goto("/")
    
    // Real user behavior
    await page.click('text="Adaptive"')
    await expect(page).toHaveURL("/libraries/adaptive")
    
    // Verify content loaded
    await expect(page.locator("h1")).toContainText("Adaptive")
    
    // Test accessibility inline
    await injectAxe(page)
    await checkA11y(page)
  })
})
```

### Component Testing

```typescript
// libraries/components/tests/enrich/Article/index.ts
describe("Article component behavior", () => {
  // Rendering behavior
  it("generates semantic HTML", () => {
    const article = Article({ 
      headline: "Test Article",
      content: "Content" 
    })
    
    const html = article.toHTML()
    assertStringIncludes(html, '<article')
    assertStringIncludes(html, 'itemtype="https://schema.org/Article"')
  })
  
  // Accessibility behavior (using axe)
  it("is accessible", async () => {
    const html = Article({ headline: "Test" }).toHTML()
    const results = await axe.run(html)
    assertEquals(results.violations.length, 0)
  })
  
  // Property-based test
  it("always includes required schema.org properties", () => {
    fc.assert(
      fc.property(fc.string(), fc.string(), (headline, content) => {
        const html = Article({ headline, content }).toHTML()
        assertStringIncludes(html, 'itemprop="headline"')
      })
    )
  })
})
```

## Test Helpers

### Placement Rules

1. **Local helpers**: Used by one test folder → place in that folder
2. **Shared helpers**: Used by multiple tests → place at lowest common ancestor
3. **Global helpers**: Used across packages → place in root test utilities

### Example Helper Structure

```
libraries/adaptive/tests/
├── operations/
│   ├── arithmetic/
│   │   ├── index.ts
│   │   └── helpers/
│   │       └── createTestNumbers/  # Only used by arithmetic tests
│   └── helpers/
│       └── createTestOperands/     # Shared by all operations tests
└── helpers/
    └── createTestDom/              # Shared by all adaptive tests
```

## MSW for External Services

At the application edges only:

```typescript
// docs/tests/helpers/setupTestServer/index.ts
import { setupServer } from "msw/node"
import { rest } from "msw"

export const server = setupServer(
  rest.get("/api/users", (req, res, ctx) => {
    return res(ctx.json([{ id: 1, name: "Test User" }]))
  })
)

// In tests
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

## Running Tests

```bash
# Run all tests for a package
cd libraries/adaptive
deno task test

# Run specific behavior tests
deno test tests/operations/arithmetic/

# Watch mode
deno task test:watch

# With coverage
deno task test:cov
```

## Standards & Requirements

### Coverage Goals
- **Behavioral Coverage**: 100% of expected behaviors tested
- **Code Coverage**: >80% minimum, >90% for user-facing code
- **E2E Coverage**: All critical user paths

### Performance Requirements
- Test suite runs in <30 seconds
- Individual tests <100ms (except E2E)
- E2E tests <5s per test

### Accessibility Requirements
- All components pass axe-core tests
- WCAG 2.3 AAA compliance
- Keyboard navigation tested
- Screen reader compatibility verified

## Anti-Patterns to Avoid

❌ **Don't test implementation details**
```typescript
// BAD - Testing internal state
it("sets internal flag to true", () => {
  const obj = new Thing()
  obj.doSomething()
  assertEquals(obj._internalFlag, true) // Don't do this
})
```

❌ **Don't mock our own code**
```typescript
// BAD - Mocking our own function
const mockAdd = mock(add)
mockAdd.returns(5)
```

❌ **Don't separate by test type**
```typescript
// BAD - Separate folders for test types
tests/
├── unit/
├── integration/
├── e2e/
└── property/
```

✅ **Do test behaviors**
```typescript
// GOOD - Testing observable behavior
it("calculates total price including tax", () => {
  const total = calculateTotal({ price: 100, taxRate: 0.1 })
  assertEquals(total, 110)
})
```

✅ **Do use dependency injection**
```typescript
// GOOD - Injectable dependencies
const fetchData = (config = { fetch: globalThis.fetch }) =>
  (url: string) => config.fetch(url)
```

✅ **Do organize by behavior**
```typescript
// GOOD - Behavior-focused structure
tests/
├── calculations/
│   └── pricing/     # All pricing behavior tests
└── validation/
    └── user-input/  # All input validation tests
```

## Questions?

This approach ensures:
1. Tests are maintainable (behavior-focused)
2. Tests are reliable (no mocks)
3. Tests are comprehensive (E2E first)
4. Tests are accessible (axe-core integrated)
5. Tests are fast (proper DI, no unnecessary abstraction)
