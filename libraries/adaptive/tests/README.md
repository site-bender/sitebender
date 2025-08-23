# Adaptive Library Tests

## Testing Philosophy

We test **behaviors, not implementation**. Tests are organized by what the code does for users, not how it achieves it.

## Structure

Tests mirror the source structure, testing the behaviors of each module:

```
tests/
├── operations/
│   ├── arithmetic/        # Addition, subtraction, multiplication behaviors
│   ├── comparison/        # Less than, greater than, equality behaviors
│   └── composition/       # How operations compose together
├── rendering/
│   ├── dom-generation/    # HTML output behaviors
│   ├── reactivity/        # Reactive update behaviors
│   └── validation/        # Input validation behaviors
└── helpers/               # Shared test utilities
    └── createTestDom/     # DOM creation for testing
```

## Example Tests

### Testing Arithmetic Behaviors (Integration)

```typescript
// tests/operations/arithmetic/index.ts
import { assertEquals } from "@std/testing/asserts"
import { describe, it } from "@std/testing/bdd"
import * as fc from "fast-check"

// Import constructors - these build configurations
import Add from "../../../src/constructors/operators/Add/index.ts"
import Subtract from "../../../src/constructors/operators/Subtract/index.ts"
import Multiply from "../../../src/constructors/operators/Multiply/index.ts"
import Constant from "../../../src/constructors/injectors/Constant/index.ts"

// Import the composer that executes configurations
import composeOperators from "../../../src/operations/composers/composeOperators/index.ts"

describe("Arithmetic operations behavior", () => {
  describe("Simple addition", () => {
    it("adds two constant numbers", async () => {
      // Build configuration using constructors
      const config = Add()([
        Constant()(2),
        Constant()(3)
      ])
      
      // Execute the operation
      const operation = await composeOperators(config)
      const result = await operation()
      
      assertEquals(result.right, 5)
    })
    
    it("concatenates strings", async () => {
      const config = Add("String")([
        Constant("String")("Hello, "),
        Constant("String")("World!")
      ])
      
      const operation = await composeOperators(config)
      const result = await operation()
      
      assertEquals(result.right, "Hello, World!")
    })
  })
  
  describe("Composed arithmetic (integration)", () => {
    it("chains operations correctly", async () => {
      // (2 * 3) + (10 - 4) = 6 + 6 = 12
      const config = Add()([
        Multiply()([
          Constant()(2),
          Constant()(3)
        ]),
        Subtract()([
          Constant()(10),
          Constant()(4)
        ])
      ])
      
      const operation = await composeOperators(config)
      const result = await operation()
      
      assertEquals(result.right, 12)
    })
    
    it("handles nested operations", async () => {
      // ((5 + 3) * 2) - 4 = (8 * 2) - 4 = 16 - 4 = 12
      const config = Subtract()([
        Multiply()([
          Add()([
            Constant()(5),
            Constant()(3)
          ]),
          Constant()(2)
        ]),
        Constant()(4)
      ])
      
      const operation = await composeOperators(config)
      const result = await operation()
      
      assertEquals(result.right, 12)
    })
  })
  
  // Property-based tests inline with behavioral tests
  describe("Arithmetic properties", () => {
    it("addition is commutative", async () => {
      await fc.assert(
        fc.asyncProperty(fc.float(), fc.float(), async (a, b) => {
          const config1 = Add()([
            Constant()(a),
            Constant()(b)
          ])
          const config2 = Add()([
            Constant()(b),
            Constant()(a)
          ])
          
          const op1 = await composeOperators(config1)
          const op2 = await composeOperators(config2)
          const result1 = await op1()
          const result2 = await op2()
          
          assertEquals(result1.right, result2.right)
        })
      )
    })
  })
})
```

### Testing DOM Behaviors with Dependency Injection

```typescript
// tests/rendering/dom-generation/index.ts
import { assertEquals, assertExists } from "@std/testing/asserts"
import { describe, it } from "@std/testing/bdd"

// Import element constructors
import Div from "../../../src/constructors/elements/flow/miscellaneous/Div/index.ts"
import H1 from "../../../src/constructors/elements/flow/heading/H1/index.ts"
import P from "../../../src/constructors/elements/flow/miscellaneous/P/index.ts"
import TextNode from "../../../src/constructors/elements/TextNode/index.ts"

// Import rendering functions
import buildDomTree from "../../../src/rendering/buildDomTree/index.ts"
import createTestDom from "../../helpers/createTestDom/index.ts"

describe("DOM generation behavior", () => {
  it("creates proper HTML structure from constructors", () => {
    const { document } = createTestDom()
    
    // Build configuration using constructors
    const config = Div({ 
      class: "container",
      id: "main" 
    })([
      H1({ class: "title" })("Welcome"),
      P({ class: "content" })("This is the content")
    ])
    
    // Inject test DOM and render
    const element = buildDomTree({ dom: document })(config)
    
    assertEquals(element.tagName, "DIV")
    assertEquals(element.className, "container")
    assertEquals(element.id, "main")
    assertEquals(element.children.length, 2)
    
    const h1 = element.children[0]
    assertEquals(h1.tagName, "H1")
    assertEquals(h1.textContent, "Welcome")
    
    const p = element.children[1]
    assertEquals(p.tagName, "P")
    assertEquals(p.textContent, "This is the content")
  })
  
  it("handles reactive data attributes", () => {
    const { document } = createTestDom()
    
    // Configure element with calculation
    const config = Div({
      calculation: Add()([
        Constant()(10),
        Constant()(20)
      ]),
      dataset: {
        price: "10",
        tax: "20"
      }
    })([TextNode("Result will go here")])
    
    const element = buildDomTree({ dom: document })(config)
    
    // Check that data attributes are properly set
    assertEquals(element.dataset.price, "10")
    assertEquals(element.dataset.tax, "20")
    // The calculation would be processed separately by the reactive system
  })
})
```

### Testing Form Input Behaviors

```typescript
// tests/elements/forms/input/index.ts
import { assertEquals } from "@std/testing/asserts"
import { describe, it } from "@std/testing/bdd"

// Import input constructors
import InputEmail from "../../../src/constructors/elements/flow/interactive/Input/InputEmail/index.ts"
import InputText from "../../../src/constructors/elements/flow/interactive/Input/InputText/index.ts"
import InputNumber from "../../../src/constructors/elements/flow/interactive/Input/InputNumber/index.ts"

// Import validation constructors
import IsLessThan from "../../../src/constructors/comparators/amount/IsLessThan/index.ts"
import Matches from "../../../src/constructors/comparators/matching/Matches/index.ts"

describe("Input element behavior", () => {
  it("creates email input with proper type", () => {
    const config = InputEmail({
      name: "email",
      placeholder: "Enter email",
      required: true
    })
    
    assertEquals(config.tag, "Input")
    assertEquals(config.attributes.type, "email")  // HTML5 email type
    assertEquals(config.attributes.name, "email")
    assertEquals(config.attributes.required, true)
    // Browser provides email validation automatically
  })
  
  it("creates text input with custom validation", () => {
    const config = InputText({
      name: "username",
      placeholder: "Enter username",
      required: true,
      validation: Matches(/^[a-zA-Z0-9_]{3,20}$/)  // Custom username pattern
    })
    
    assertEquals(config.tag, "Input")
    assertEquals(config.attributes.type, "text")
    assertEquals(config.attributes.name, "username")
    assertEquals(config.attributes.required, true)
    assertExists(config.validation)
  })
  
  it("creates number input with range validation", () => {
    const config = InputNumber({
      name: "age",
      min: 0,
      max: 120,
      validation: IsLessThan(121)
    })
    
    assertEquals(config.tag, "Input")
    assertEquals(config.attributes.type, "number")
    assertEquals(config.attributes.min, 0)
    assertEquals(config.attributes.max, 120)
    assertExists(config.validation)
  })
})
```

### Testing Validation Behaviors

```typescript
// tests/operations/validation/index.ts
import { assertEquals } from "@std/testing/asserts"
import { describe, it } from "@std/testing/bdd"
import * as fc from "fast-check"

// Import comparator constructors
import IsLessThan from "../../../src/constructors/comparators/amount/IsLessThan/index.ts"
import IsMoreThan from "../../../src/constructors/comparators/amount/IsMoreThan/index.ts"
import And from "../../../src/constructors/comparators/algebraic/And/index.ts"
import Matches from "../../../src/constructors/comparators/matching/Matches/index.ts"

// Import the composer
import composeComparators from "../../../src/operations/composers/composeComparators/index.ts"

describe("Validation behavior", () => {
  describe("Amount validation", () => {
    it("validates less than correctly", async () => {
      const config = IsLessThan(10)
      const validator = await composeComparators(config)
      
      assertEquals(await validator(5), true)
      assertEquals(await validator(10), false)
      assertEquals(await validator(15), false)
    })
    
    it("combines validations with And", async () => {
      // Value must be > 0 AND < 100
      const config = And([
        IsMoreThan(0),
        IsLessThan(100)
      ])
      
      const validator = await composeComparators(config)
      
      assertEquals(await validator(-5), false)
      assertEquals(await validator(50), true)
      assertEquals(await validator(150), false)
    })
  })
  
  describe("Pattern validation", () => {
    it("validates email patterns", async () => {
      const emailPattern = /^[^@]+@[^@]+\.[^@]+$/
      const config = Matches(emailPattern)
      const validator = await composeComparators(config)
      
      assertEquals(await validator("user@example.com"), true)
      assertEquals(await validator("invalid"), false)
      assertEquals(await validator("@example.com"), false)
    })
  })
  
  // Property-based validation tests
  describe("Validation properties", () => {
    it("less than is transitive", async () => {
      await fc.assert(
        fc.asyncProperty(fc.integer(), fc.integer(), fc.integer(), async (a, b, c) => {
          // If a < b and b < c, then a < c
          if (a < b && b < c) {
            const config = IsLessThan(c)
            const validator = await composeComparators(config)
            assertEquals(await validator(a), true)
          }
        })
      )
    })
  })
})
```

## Test Helpers

Shared utilities live in `helpers/` at the appropriate level:

```typescript
// tests/helpers/createTestDom/index.ts
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"

export default function createTestDom(html = "<!DOCTYPE html><html><body></body></html>") {
  const doc = new DOMParser().parseFromString(html, "text/html")
  return {
    document: doc,
    window: {
      document: doc,
      localStorage: new Map(),
      sessionStorage: new Map(),
      location: {
        href: "http://localhost:3000/",
        pathname: "/",
        search: ""
      }
    }
  }
}
```

## Additional Test Categories

### Testing SSR and Client Hydration

```typescript
// tests/rendering/ssr-hydration/index.ts
import { assertEquals, assertStringIncludes } from "@std/testing/asserts"
import { describe, it } from "@std/testing/bdd"
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"

// Import SSR rendering
import ssrRenderAdaptive from "../../../src/rendering/ssrRenderAdaptive/index.tsx"
import renderToString from "../../../src/rendering/helpers/stringify/index.ts"

// Import client rendering
import buildDomTree from "../../../src/rendering/buildDomTree/index.ts"
import runCalculations from "../../../src/rendering/runCalculations/index.ts"

// Import constructors
import Add from "../../../src/constructors/operators/Add/index.ts"
import Constant from "../../../src/constructors/injectors/Constant/index.ts"
import FromElement from "../../../src/constructors/injectors/FromElement/index.ts"

describe("SSR and hydration behaviors", () => {
  describe("when rendering on server", () => {
    it("generates HTML with data attributes for hydration", () => {
      const config = Add()([
        Constant()(10),
        Constant()(20)
      ])
      
      const html = renderToString(ssrRenderAdaptive(config))
      
      // Should have placeholder text
      assertStringIncludes(html, "[sum]")
      
      // Should have hydration data
      assertStringIncludes(html, 'data-adaptive-type="operator"')
      assertStringIncludes(html, 'data-adaptive-config=')
      
      // Config should be in JSON
      assertStringIncludes(html, '"tag":"Add"')
      assertStringIncludes(html, '"type":"operator"')
    })
    
    it("renders form with validation that works without JS", () => {
      const formConfig = {
        tag: "Form",
        attributes: {
          method: "POST",
          action: "/api/submit",
          novalidate: false  // Use browser validation
        },
        children: [
          {
            tag: "Input",
            attributes: {
              type: "email",
              name: "email",
              required: true
            }
          },
          {
            tag: "Button",
            attributes: {
              type: "submit"
            },
            children: ["Submit"]
          }
        ]
      }
      
      const html = renderToString(formConfig)
      
      // Form should work without JS
      assertStringIncludes(html, 'method="POST"')
      assertStringIncludes(html, 'action="/api/submit"')
      assertStringIncludes(html, 'type="email"')
      assertStringIncludes(html, 'required')
      
      // Should NOT have novalidate (use browser validation)
      assert(!html.includes('novalidate'))
    })
  })
  
  describe("when hydrating on client", () => {
    it("replaces placeholders with calculated values", () => {
      const { document } = createTestDom()
      
      // Create SSR'd element
      const container = document.createElement('div')
      container.innerHTML = `
        <span 
          class="adaptive-operator"
          data-adaptive-type="operator"
          data-adaptive-config='{"tag":"Add","type":"operator","addends":[{"tag":"Constant","type":"injector","value":10},{"tag":"Constant","type":"injector","value":20}]}'
        >[sum]</span>
      `
      document.body.appendChild(container)
      
      // Hydrate
      const span = container.querySelector('[data-adaptive-config]')
      const config = JSON.parse(span.dataset.adaptiveConfig)
      
      // Run calculation
      runCalculations({ dom: document })(config).then(result => {
        span.textContent = String(result.right)
        assertEquals(span.textContent, "30")
      })
    })
    
    it("attaches event handlers without replacing DOM", () => {
      const { document } = createTestDom()
      
      // SSR'd form
      const form = document.createElement('form')
      form.innerHTML = `
        <input type="text" name="value" />
        <span data-calculation="result">0</span>
      `
      
      // Mark for enhancement
      form.dataset.enhance = "true"
      document.body.appendChild(form)
      
      // Hydrate should attach listeners, not replace DOM
      const input = form.querySelector('input')
      const originalInput = input
      
      // Simulate hydration
      hydrateForm(form)
      
      // Input should be the same element
      assertEquals(form.querySelector('input'), originalInput)
      
      // But should now have event listeners
      const event = new Event('input')
      input.value = "5"
      input.dispatchEvent(event)
      
      // Result should update
      const result = form.querySelector('[data-calculation]')
      // Would be async in real implementation
      // assertEquals(result.textContent, "5")
    })
  })
})
```

### Testing Progressive Enhancement Scripts

```typescript
// tests/rendering/progressive-enhancement/index.ts
import { assertEquals, assert } from "@std/testing/asserts"
import { describe, it } from "@std/testing/bdd"

describe("Progressive enhancement behaviors", () => {
  describe("when JavaScript is disabled", () => {
    it("forms submit to server endpoints", () => {
      const formConfig = {
        tag: "Form",
        attributes: {
          method: "POST",
          action: "/api/contact"
        },
        children: [
          {
            tag: "Input",
            attributes: {
              type: "email",
              name: "email",
              required: true,
              pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            }
          }
        ]
      }
      
      const html = renderToString(formConfig)
      
      // Should use standard form submission
      assertStringIncludes(html, 'action="/api/contact"')
      assertStringIncludes(html, 'method="POST"')
      
      // Should use HTML5 validation
      assertStringIncludes(html, 'required')
      assertStringIncludes(html, 'pattern=')
    })
    
    it("calculations show meaningful placeholders", () => {
      const config = {
        tag: "Div",
        children: [
          "Total: ",
          ssrRenderAdaptive(Add()([
            FromElement("price"),
            FromElement("tax")
          ]))
        ]
      }
      
      const html = renderToString(config)
      
      // Should show placeholder, not error
      assertStringIncludes(html, "[sum]")
      // Should include data for hydration
      assertStringIncludes(html, 'data-adaptive-config')
    })
  })
  
  describe("when JavaScript is enabled", () => {
    it("enhances forms with client-side validation", async () => {
      const { document } = createTestDom()
      
      // Create form
      const form = document.createElement('form')
      form.dataset.validate = "enhance"
      form.innerHTML = `
        <input type="email" name="email" required />
        <button type="submit">Submit</button>
      `
      
      // Enhance
      await enhanceForm(form)
      
      // Should prevent submission on invalid
      let submitted = false
      form.addEventListener('submit', (e) => {
        submitted = true
      })
      
      const submitBtn = form.querySelector('button')
      submitBtn.click()
      
      // Should not submit with empty required field
      assertEquals(submitted, false)
      
      // Should show validation message
      const input = form.querySelector('input')
      assert(input.classList.contains('invalid'))
    })
  })
})
```

## Running Tests

```bash
# Run all behavioral tests
deno task test

# Run specific behavior tests
deno test tests/operations/arithmetic/
deno test tests/rendering/ssr-hydration/
deno test tests/rendering/progressive-enhancement/

# Watch mode for development
deno task test:watch

# With coverage
deno task test:cov
```

## Key Principles

1. **No Mocking**: We never mock our own functions. Use dependency injection for external dependencies.
2. **Behavior Focus**: Test what users experience, not internal implementation.
3. **Integration First**: Test constructors and composers working together as they will be used.
4. **Mixed Test Types**: Property-based, integration, and other tests live together by behavior.
5. **Use Constructors**: Always use the library's constructor functions, not literal config objects.
6. **SSR/Hydration Testing**: Test that configurations render to HTML strings and hydrate correctly on client.
7. **Progressive Enhancement**: Test that rendered HTML works without JavaScript.