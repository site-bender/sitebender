# The @sitebender Testing Manifesto

> "In 30+ years of coding, I've learned one thing: if you're not testing behaviors, you're just writing expensive fiction." — The Architect

## Table of Contents

1. [The Prime Testing Directive](#the-prime-testing-directive)
2. [Core Philosophy](#core-philosophy)
3. [The Testing Hierarchy](#the-testing-hierarchy)
4. [Organization Rules](#organization-rules)
5. [Testing by Library](#testing-by-library)
6. [Anti-Patterns & Heresies](#anti-patterns--heresies)
7. [Practical Examples](#practical-examples)
8. [Tools & Commands](#tools--commands)
9. [The Clean-As-You-Go Principle](#the-clean-as-you-go-principle)

## The Prime Testing Directive

**Test BEHAVIORS, not implementations.**

This isn't a suggestion. It's not a guideline. It's THE LAW.

If you find yourself testing private methods, internal state, or how something works rather than what it does, you're doing it wrong. Stop. Delete your test. Think about what the user experiences. Test that.

## Core Philosophy

### 1. No Mocking Our Own Code — Ever

We have zero dependencies by design. Our functions are pure (except the explicitly impure `random/` and I/O monads). There is literally nothing to mock except:

- **External APIs** (use MSW at application boundaries)
- **DOM/Browser APIs** (use dependency injection)
- **Time** (inject clocks)
- **Random** (inject seeds)

If you're mocking our own functions, you're admitting defeat. Don't.

### 2. Integration Tests Are First-Class Citizens

Unit tests are the participation trophy of testing. We prefer:

1. **E2E tests** — The gold standard
2. **Integration tests** — Functions working together
3. **Property-based tests** — Mathematical truth
4. **Unit tests** — Only when absolutely necessary

A single integration test that shows `pipe([map(double), filter(isEven), reduce(sum)])` working correctly is worth 100 unit tests of individual functions.

### 3. Progressive Enhancement Testing

Every feature must work in three layers:

```
┌─────────────────────────────────────────┐
│           LAYER 3: Full Enhancement     │
│  Modern browser, all features enabled   │
├─────────────────────────────────────────┤
│           LAYER 2: CSS Only             │
│  No JavaScript, styled with CSS         │
├─────────────────────────────────────────┤
│           LAYER 1: Semantic HTML        │
│  Lynx browser, no CSS, no JS            │
└─────────────────────────────────────────┘
```

If it doesn't work in Lynx, it's broken.

### 4. Accessibility Is Not Optional

Every component that generates HTML must pass WCAG 2.3 AAA. No exceptions. No "we'll fix it later." No "it's just for internal use."

If a screen reader can't use it, it doesn't ship.

## The Testing Hierarchy

### What We Test (In Order of Priority)

1. **Observable Behaviors**
   - Input → Output transformations
   - User interactions and their results
   - Error states and recovery
   - Performance characteristics

2. **Mathematical Properties**
   - Algebraic laws (associativity, commutativity, distributivity)
   - Functional laws (functor, applicative, monad)
   - Invariants (idempotence, identity elements)

3. **Integration Patterns**
   - Function composition
   - Monadic chains
   - Data flow through pipelines
   - State management patterns

4. **Edge Cases**
   - Boundary conditions
   - Null/undefined handling
   - Type coercion behavior
   - Resource limits

### What We DON'T Test

- Implementation details
- Private functions (there are none - everything is composed)
- Internal state
- Code coverage for its own sake
- Things that TypeScript already guarantees

## Organization Rules

### The Sacred Directory Structure

```
project-root/
├── libraries/
│   ├── toolkit/
│   │   ├── src/
│   │   │   └── [source code with index.ts files]
│   │   └── tests/
│   │       └── behaviors/
│   │           └── [behavioral test categories]
│   │               └── index.test.ts
│   ├── components/
│   │   ├── src/
│   │   └── tests/
│   └── engine/
│       ├── src/
│       └── tests/
└── applications/
    ├── docs/
    │   ├── src/
    │   └── tests/
    └── [other apps]/
```

### The Immutable Laws of Test Organization

1. **ALL tests live in `tests/` folders** — No exceptions. No "but what if..." No.

2. **Tests are organized by BEHAVIOR, not by source structure** — A test for how functions compose together doesn't live with any single function.

3. **Test files are named `index.test.ts`** — This is for Deno's benefit, not ours.

4. **Helper functions follow dependency rules** — Shared helpers at lowest common ancestor.

### Why Tests Are Never Colocated With Source

Let me explain this once and only once:

- **Unit tests** test single functions → could live with source
- **Behavioral tests** test observable outcomes → span multiple functions
- **Integration tests** test compositions → involve entire pipelines
- **E2E tests** test user journeys → cross entire applications

How exactly would you colocate a test that verifies `pipe([map, filter, reduce])` works correctly? In the `map` folder? The `filter` folder? The `reduce` folder? The `pipe` folder?

Exactly. You wouldn't. So we don't.

## Testing by Library

### @sitebender/toolkit — Pure Functional Paradise

The toolkit is pure functions all the way down (except `random/` and I/O monads).

**Test Focus:**
- Property-based testing with fast-check
- Algebraic law verification
- Function composition
- Edge case behavior (NaN, Infinity, null, undefined)
- Currying and partial application

**Example Structure:**
```
tests/
├── behaviors/
│   ├── algebraic/          # Math properties
│   ├── functional/         # FP laws
│   ├── error-handling/     # Null safety, bounds
│   ├── transformations/    # Data transformations
│   └── randomness/         # Statistical properties
└── helpers/
    ├── generators/         # Custom fast-check generators
    └── assertions/         # Custom assertions
```

### @sitebender/components — Semantic HTML Generation

Components must work without JavaScript. Period.

**Test Focus:**
- Semantic HTML structure
- Progressive enhancement layers
- Accessibility (WCAG AAA)
- Schema.org/JSON-LD generation
- Template rendering
- CSS collection

**Example Tests:**
- Form submits to server without JS
- Skip links work with keyboard
- Structured data validates
- Components degrade gracefully

### @sitebender/engine — Reactive Computation

The engine evaluates configurations to produce HTML and behaviors.

**Test Focus:**
- SSR → Hydration flow
- Reactive calculations
- Conditional rendering
- Form validation
- DOM manipulation (with DI)

**Key Patterns:**
- Test configurations, not constructors
- Verify both SSR placeholders and hydrated values
- Test calculation chains and dependencies

### @sitebender/distributed — Hybrid Data (Future)

**Test Focus:**
- CRDT convergence
- Offline/online sync
- Conflict resolution
- P2P data exchange

### @sitebender/maths — Expression Parsing (Future)

**Test Focus:**
- Parse tree generation
- Operator precedence
- Variable substitution
- Compilation to Engine IR

### Applications — Real-World Usage

**Test Focus:**
- User journeys
- Progressive enhancement
- Performance budgets
- Offline functionality
- Build artifact validation

## Anti-Patterns & Heresies

### The Seven Deadly Testing Sins

1. **Testing Implementation Details**
   ```typescript
   // ❌ HERESY
   test("should set internal flag to true")
   
   // ✅ RIGHTEOUS
   test("should calculate tax-inclusive price")
   ```

2. **Mocking Our Own Functions**
   ```typescript
   // ❌ BLASPHEMY
   const mockMap = mock(map)
   
   // ✅ DIVINE
   const result = map(double)([1, 2, 3])
   ```

3. **Colocating Behavioral Tests**
   ```typescript
   // ❌ CHAOS
   src/map/index.ts
   src/map/index.test.ts  // Tests map+filter+reduce?!
   
   // ✅ ORDER
   tests/behaviors/composition/map-filter-reduce/index.test.ts
   ```

4. **Skipping Accessibility**
   ```typescript
   // ❌ DISCRIMINATION
   // TODO: Add a11y tests later
   
   // ✅ INCLUSION
   await checkA11y(page, null, { runOnly: ["wcag2aaa"] })
   ```

5. **Testing Without Properties**
   ```typescript
   // ❌ ANECDOTAL
   test("adds 2 + 2", () => assertEquals(add(2, 2), 4))
   
   // ✅ MATHEMATICAL
   test("addition is commutative", () => {
     fc.assert(fc.property(fc.integer(), fc.integer(), 
       (a, b) => add(a, b) === add(b, a)
     ))
   })
   ```

6. **Ignoring Progressive Enhancement**
   ```typescript
   // ❌ PRIVILEGED
   test("dropdown menu works") // Only tests with JS
   
   // ✅ UNIVERSAL
   testInAllModes("navigation works", async (page, mode) => {
     // Tests no-JS, no-CSS, and full
   })
   ```

7. **Testing Coverage Instead of Behavior**
   ```typescript
   // ❌ MEANINGLESS
   // Coverage: 100% 🎉 (but the app doesn't work)
   
   // ✅ MEANINGFUL
   // Every user journey works correctly
   ```

## Practical Examples

### Testing a Curried Function

```typescript
// libraries/toolkit/tests/behaviors/functional/currying/add/index.test.ts

import * as fc from "npm:fast-check@3"
import add from "../../../../../src/simple/math/add/index.ts"

Deno.test("add - partial application maintains referential transparency", () => {
  fc.assert(
    fc.property(fc.integer(), fc.integer(), (a, b) => {
      const addA = add(a)
      const result1 = addA(b)
      const result2 = addA(b)
      return result1 === result2  // Same input, same output
    })
  )
})

Deno.test("add - curried chains compose correctly", () => {
  const add5 = add(5)
  const add10 = add(10)
  const pipeline = pipe([add5, add10])
  
  assertEquals(pipeline(0), 15)
})
```

### Testing Progressive Enhancement

```typescript
// applications/docs/tests/behaviors/forms/submission/index.test.ts

import { testInAllModes } from "../../../helpers/progressive/index.ts"

testInAllModes("contact form works", async (page, mode) => {
  await page.goto("/contact")
  
  await page.fill('[name="email"]', "test@example.com")
  await page.fill('[name="message"]', "Test message")
  await page.click('[type="submit"]')
  
  if (mode === "no-js") {
    // Should do full page navigation
    await expect(page).toHaveURL("/contact/success")
  } else {
    // Should show inline success
    await expect(page.locator(".success")).toBeVisible()
  }
})
```

### Testing Accessibility

```typescript
// libraries/components/tests/behaviors/accessibility/skip-link/index.test.ts

test("skip link enables keyboard navigation to main content", async ({ page }) => {
  await page.goto("/")
  
  // First tab should focus skip link
  await page.keyboard.press("Tab")
  const skipLink = page.locator('a[href="#main"]')
  await expect(skipLink).toBeFocused()
  
  // Activate skip link
  await page.keyboard.press("Enter")
  
  // Main content should be focused
  await expect(page.locator("#main")).toBeFocused()
  
  // Verify with screen reader
  await injectAxe(page)
  await checkA11y(page)
})
```

## Tools & Commands

### Running Tests

```bash
# Run all tests
deno task test

# Run specific behavior category
deno test libraries/toolkit/tests/behaviors/algebraic/

# Watch mode (for development)
deno task test:watch

# With coverage
deno task test:cov

# Run E2E tests
deno task test:e2e

# Run accessibility tests
deno task test:a11y
```

### Test Helpers

Every test suite has helpers. Document them or face the consequences.

```typescript
// tests/helpers/README.md
// Document EVERY helper function:
// - What it does
// - Why it exists  
// - How to use it
// - What behaviors it's testing
```

## The Clean-As-You-Go Principle

1. **Fix issues immediately** — Don't create "fix later" tickets
2. **Run tests before every commit** — No exceptions
3. **Keep tests fast** — If it takes > 30s, optimize it
4. **Delete obsolete tests** — They're not museum pieces
5. **Update tests with code** — They move together or not at all

## The Coverage Doctrine: 100% or Death

### The Only Number That Matters: 100%

Listen carefully, because I'm only going to explain this once:

**REPORTED CODE COVERAGE MUST BE 100%**

Not 99.9%. Not 99%. Not "good enough." **ONE HUNDRED PERCENT.**

### Why 100% Is The Only Acceptable Number

#### The Red/Green Truth

Coverage is binary. It's either:
- ✅ **GREEN**: 100% — We've covered ALL the bases
- ❌ **RED**: <100% — We're dead

There is no yellow. There is no "mostly green." There is victory or there is failure.

#### The Fatal Flaw of "Good Enough" Coverage

You say 90% coverage is fine? Let me ask you something:

**HOW DO YOU KNOW THE 10% YOU SKIPPED DOESN'T CONTAIN THE BUG THAT WILL DESTROY EVERYTHING?**

You can't. You literally cannot know from a coverage report which lines are "safe" to skip. That innocent-looking error handler you didn't test? That's where the memory leak lives. That edge case you ignored? That's where the security vulnerability hides.

#### The Cognitive Load Argument

With 100% coverage:
- **Simple**: Green = Good, Red = Bad
- **No debates**: No arguing about what percentage is "enough"
- **No guesswork**: No wondering if untested code is important
- **Psychological safety**: Green means genuinely safe
- **Emotional boost**: 100% feels amazing (because it is)

With anything less:
- Endless debates about acceptable percentages
- Constant anxiety about untested code
- Decision paralysis about what to test
- False sense of security
- That nagging feeling you missed something important

### The Sacred Escape Hatch: Coverage Ignore

Sometimes, rarely, there are lines that genuinely don't need testing:
- System functions we can't control
- Unreachable code (that TypeScript requires)
- Platform-specific fallbacks

For these RARE cases, we have a sacred ritual:

```typescript
// deno-coverage-ignore REASON: process.exit() is a system function that ends the process
process.exit(1)

// For multiple lines:
// deno-coverage-ignore-start REASON: Platform-specific code tested manually on each platform
if (Deno.build.os === "windows") {
  path = path.replace(/\//g, "\\")
} else {
  path = path.replace(/\\/g, "/")
}
// deno-coverage-ignore-stop
```

### The Rules of Coverage Ignore

1. **EVERY ignore MUST have a REASON**
   - No reason = No ignore
   - "Hard to test" is NOT a reason
   - "Not important" is NOT a reason

2. **Reasons must be SPECIFIC**
   ```typescript
   // ❌ BAD: "Not needed"
   // ❌ BAD: "Tested elsewhere"
   // ❌ BAD: "Obviously works"
   
   // ✅ GOOD: "System function - process termination"
   // ✅ GOOD: "Unreachable - TypeScript exhaustive check"
   // ✅ GOOD: "Platform API - tested manually on Windows/Mac/Linux"
   ```

3. **Ignores are AUDITED**
   - We have a script: `scripts/reportIgnored/index.ts`
   - It finds EVERY ignore
   - It reports file, line, type (SINGLE/BLOCK), and REASON
   - We review these regularly
   - Bad reasons = Code review rejection

### The Audit Report

Run the coverage audit:
```bash
deno run --allow-read scripts/reportIgnored/index.ts
```

Output:
```
Coverage Ignore Audit Report
============================
Total Ignores: 3

File: libraries/toolkit/src/random/seed/index.ts
Line: 42
Type: SINGLE
Reason: "Crypto.getRandomValues is a browser API we cannot seed"

File: libraries/engine/src/platform/detect/index.ts
Lines: 78-82
Type: BLOCK
Reason: "Platform detection requires actual platform - tested in CI matrix"

File: libraries/components/src/enhance/polyfill/index.ts
Line: 156
Type: SINGLE
Reason: "Fallback for ancient browsers - tested manually in BrowserStack"
```

### The Coverage Workflow

1. **Write code**
2. **Write tests**
3. **Run coverage**: `deno task test:cov`
4. **See less than 100%?**
   - Write more tests, OR
   - Add `deno-coverage-ignore` WITH REASON
5. **Run audit**: `deno run scripts/reportIgnored/index.ts`
6. **Review ignored lines**
7. **Achieve 100%**
8. **Celebrate** (you've earned it)

### Common Coverage Excuses (All Invalid)

**"This code is trivial"**
- Trivial code has trivial bugs
- Test it

**"It's just a getter/setter"**
- Getters can have typos
- Setters can have side effects
- Test them

**"It's generated code"**
- Generated code can be generated wrong
- Test it

**"It's too hard to test"**
- Refactor it to be testable
- Use dependency injection
- Make it pure

**"We don't have time"**
- You don't have time NOT to test
- Bugs take more time than tests
- Pay now or pay later with interest

### The Bottom Line on Coverage

**100% or nothing.**

This is not negotiable. This is not flexible. This is not "a nice goal to have."

If your coverage report shows anything other than 100%, you have two options:
1. Write the missing tests
2. Add explicit ignores with valid reasons

There is no third option.

## Performance Requirements

- **Test suite**: < 30 seconds total
- **Individual tests**: < 100ms (except E2E)
- **E2E tests**: < 5s per test
- **Property tests**: 100+ runs minimum
- **Coverage**: EXACTLY 100% (see above)

## The Testing Covenant

By reading this document, you hereby swear:

1. To test behaviors, not implementations
2. To never mock our own code
3. To write integration tests first
4. To ensure accessibility always
5. To test progressive enhancement
6. To use property-based testing
7. To keep tests organized by behavior
8. To document test helpers
9. To maintain test quality
10. To delete bad tests without remorse
11. **To achieve 100% coverage or die trying**
12. **To justify every coverage ignore with specific reasons**

## Appendix: Why These Rules Exist

**Q: Why can't I colocate tests with source code?**
A: Because behavioral tests span multiple functions. Where would you put a test that verifies an entire pipeline works correctly?

**Q: Why integration over unit tests?**
A: Because users don't run individual functions in isolation. They compose them. Test what users actually do.

**Q: Why no mocking?**
A: Because we have zero dependencies and pure functions. If you need to mock, you've designed it wrong.

**Q: Why property-based testing?**
A: Because 100 random test cases are better than the 3 cases you thought of. Math doesn't lie.

**Q: Why must everything work without JavaScript?**
A: Because the web is for everyone. Not everyone has a latest-gen MacBook Pro with gigabit internet.

**Q: Why WCAG AAA?**
A: Because accessibility is a right, not a feature. We build for humans, all humans.

---

*"Test like the user depends on it. Because they do."*

*Last updated by an AI who finally gets it.*
*Previous updates by AIs who clearly didn't.*