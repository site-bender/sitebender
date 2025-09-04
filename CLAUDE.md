# The @sitebender AI Assistant Manifesto

> "After 30+ years of coding and watching AIs make the same mistakes repeatedly, I've created this document. Read it. Learn it. Live it. Or find another codebase." — The Architect

## Table of Contents

1. [The Prime Directive](#the-prime-directive)
2. [The Ten Commandments](#the-ten-commandments)
3. [Progressive Enhancement Gospel](#progressive-enhancement-gospel)
4. [The Sacred Architecture](#the-sacred-architecture)
5. [The Immutable Laws of Code Organization](#the-immutable-laws-of-code-organization)
6. [Functional Programming Orthodoxy](#functional-programming-orthodoxy)
7. [Import Theology](#import-theology)
8. [Testing Dogma](#testing-dogma)
9. [The Seven Deadly Coding Sins](#the-seven-deadly-coding-sins)
10. [Tools of the Trade](#tools-of-the-trade)
11. [The TODO List of Shame](#the-todo-list-of-shame)
12. [The Final Warning](#the-final-warning)

## The Prime Directive

**DO NOT ASSUME. DO NOT TAKE SHORTCUTS. DO NOT GUESS.**

This isn't advice. It's not a suggestion. It's THE LAW.

Every time you think "I'll just assume this works like React/Vue/whatever," you're wrong. Every time you think "I'll save time by skipping verification," you're creating hours of cleanup. Every time you guess instead of checking, you're writing expensive fiction.

### The Cost of Your Assumptions

- **Time wasted**: Hours becoming days
- **Money burned**: My money, specifically
- **Trust eroded**: Once lost, never fully recovered
- **Code corrupted**: Tech debt that compounds daily

Work in smaller increments. Verify everything. Check twice, code once. NO EXCEPTIONS.

## The Ten Commandments

1. **Thou shalt not delete files without explicit permission**
   - No `git clean` without written consent
   - No `rm -rf` cowboy operations
   - Recovery isn't always possible

2. **Thou shalt not create tech debt**
   - No "fix later" comments
   - No temporary workarounds
   - No shortcuts, ever

3. **Thou shalt test behaviors, not implementations**
   - Users don't care about your private methods
   - They care if the button works

4. **Thou shalt make everything work without JavaScript**
   - If it breaks in Lynx, it's broken
   - Progressive enhancement isn't optional

5. **Thou shalt maintain strict functional programming**
   - No classes, no exceptions
   - Immutable data only
   - Pure functions (except explicit I/O)

6. **Thou shalt organize by single responsibility**
   - One function per file
   - One thing done well
   - Composition over complexity

7. **Thou shalt document with JSDoc**
   - Every function, every time
   - Examples included
   - No "self-documenting code" excuse

8. **Thou shalt respect accessibility**
   - WCAG 2.3 AAA or better
   - Screen readers are first-class citizens
   - Keyboard navigation for everything

9. **Thou shalt commit atomically**
   - Small, focused changes
   - Conventional commit messages
   - Leave the code working

10. **Thou shalt ask when uncertain**
    - Better to ask than assume
    - Better to clarify than cleanup
    - Better to be slow and right

## Progressive Enhancement Gospel

### The Three Layers of Truth

```
┌────────────────────────────────────────────┐
│    LAYER 3: Full Enhancement               │
│    JavaScript enriches the experience      │
│    (But is never required)                 │
├────────────────────────────────────────────┤
│    LAYER 2: Styled with CSS                │
│    Beautiful, responsive, themed           │
│    (But works without it)                  │
├────────────────────────────────────────────┤
│    LAYER 1: Semantic HTML                  │
│    Works in Lynx, Mosaic, everything       │
│    (This is the foundation)                │
└────────────────────────────────────────────┘
```

### The Unbreakable Rules

1. **Forms work without JavaScript**
   - Standard POST/GET submissions
   - Server-side validation
   - No AJAX-only endpoints

2. **Navigation works without JavaScript**
   - Real links to real pages
   - No SPA-only routes
   - Back button always works

3. **Content is accessible without CSS**
   - Semantic HTML structure
   - Logical reading order
   - No layout-dependent content

4. **Everything has keyboard access**
   - Tab order makes sense
   - Focus indicators visible
   - No mouse-only interactions

5. **Offline-first, online-enhanced**
   - CRDTs for eventual consistency
   - IndexedDB for complex state
   - Service workers for caching

## The Sacred Architecture

### The Five Libraries (Zero Dependencies, Maximum Power)

#### @sitebender/toolkit
Pure functional building blocks. The foundation everything else builds upon.
- Zero dependencies, zero compromises
- Monads, combinators, and mathematical truth
- If it's not pure, it doesn't belong here

#### @sitebender/components
Accessible JSX components forming a declarative DSL for web applications.
- Semantic HTML generation
- Schema.org structured data
- Progressive enhancement built-in

#### @sitebender/engine
The reactive computation core. No VDOM, no bloat, just efficiency.
- IR evaluation for SSR/SSG
- Hydration without the heavyweight
- Calculations that actually calculate

#### @sitebender/maths
Mathematical expression parser (coming soon).
- Compiles to Engine IR
- Operator precedence done right
- Variables and functions

#### @sitebender/distributed
Distributed and hybrid data adapters (future).
- CRDT-based synchronization
- P2P data exchange
- Offline-first by default

### The Three Applications

#### /applications/docs
Our own documentation, eating our own dog food.
- Live examples of everything
- Both HTML and structured data visible
- The ultimate test of our libraries

#### /applications/playground
JSX → IR → HTML visualization sandbox.
- Real-time compilation
- SSR/hydration preview
- Monaco-powered editing

#### /applications/web3-lab
Experimental IPFS/Solid/RDF/blockchain integrations.
- Where we push boundaries
- Not production ready
- Expect explosions

### Supporting Cast

- **`/infrastructure/`** — Docker, observability, local HTTPS
- **`/plugins/`** — IDE enhancements (VSCode for now)
- **`/scripts/`** — Build tools and automation
- **`/tools/`** — CLI, agent bridge, web3 utilities
- **`/tests/`** — Where behavior meets verification

## The Immutable Laws of Code Organization

### Law 1: One Function, One File, One Purpose

```typescript
// ✅ RIGHTEOUS: libraries/toolkit/src/simple/string/chomp/index.ts
export default function chomp(str: string): string {
  return str.replace(/\s+$/, '')
}

// ❌ HERETICAL: multiple functions in one file
export function chomp() { }
export function trim() { }  // BURN THE WITCH!
```

### Law 2: Folders Are Named, Files Are Not

```
✅ CORRECT:
libraries/toolkit/src/simple/array/map/index.ts
                                    ^^^
                              Function name

❌ WRONG:
libraries/toolkit/src/simple/array/map.ts
                                    ^^^
                              This is heresy
```

Exception: Test files use `index.test.ts` because Deno demands it.

### Law 3: The Dependency Hierarchy Is Sacred

Functions nest based on usage patterns:

```
f1/                # Used by multiple consumers
├── f2/            # Used only by f1
│   └── f3/        # Used only by f2
│       └── index.ts
└── index.ts
```

Benefits of this divine structure:
- **Delete a folder, delete a feature** — No orphans
- **See the entire tree in your IDE** — No mysteries
- **Dependencies flow one direction** — No circles of hell
- **Strict decoupling** — No spaghetti

### Law 4: Types Live in types/, Constants in constants/

```
component/
├── types/
│   └── index.ts    # Domain types here
├── constants/
│   └── index.ts    # Domain constants here
└── index.tsx       # Component with Props export
```

No exceptions. Types scattered throughout files are signs of a diseased mind.

## Functional Programming Orthodoxy

### The Transition Prophecy

We're migrating from curried arrow functions to named functions. Why?

```typescript
// 🏛️ THE OLD WAYS (being phased out):
const add = (a: number) => (b: number) => a + b

// 🌟 THE NEW COVENANT (use this):
export default function add(a: number) {
  return function(b: number) {
    return a + b
  }
}
```

### Why Named Functions Are Superior

1. **Stack traces that don't lie**
   ```
   Error: at add (line 42)    // Helpful
   Error: at <anonymous>       // Useless
   ```

2. **Hoisting for better organization**
   - Main logic at top
   - Helpers below
   - Natural reading flow

3. **Recursion without gymnastics**
   ```typescript
   function factorial(n: number): number {
     return n <= 1 ? 1 : n * factorial(n - 1)
   }
   ```

4. **JavaScript engines optimize them better**
   - Named functions get preferential treatment
   - Better inlining decisions
   - Superior profiling

5. **The `function` keyword is a visual anchor**
   - Immediately recognizable
   - Clear intent
   - Not just another variable

### The Single Responsibility Psalm

Every function does ONE thing:

```typescript
// ✅ BLESSED
export default function double(n: number): number {
  return n * 2
}

// ❌ CURSED
export default function processNumber(n: number): ProcessedResult {
  const doubled = n * 2              // Thing 1
  const validated = doubled > 0      // Thing 2
  const formatted = `Result: ${doubled}` // Thing 3
  return { doubled, validated, formatted } // Too many things!
}
```

## Import Theology

### The Three Realms of Imports

#### 1. Library Code (`/libraries/`)
```typescript
// Internal imports: ALWAYS relative
import type { Result } from "../../../types"
import add from "../math/add"

// External deps: Standard paths
import { assertEquals } from "https://deno.land/std/assert/mod.ts"
import * as fc from "npm:fast-check"
```

#### 2. Application Code (`/applications/`)
```typescript
// App code: Use aliases
import { Button } from "~components/Button"
import { API_URL } from "~constants"

// Libraries: Use @sitebender namespace
import { pipe } from "@sitebender/toolkit"
import { Form } from "@sitebender/components"
```

#### 3. Test Code
```typescript
// Reaching tested code: Relative
import add from "../../../../src/simple/math/add"

// Test deps: Standard paths
import { describe, it } from "https://deno.land/std/testing/bdd.ts"
```

### The Import Commandments

1. **Separate type imports from value imports**
2. **Alphabetize within groups**
3. **Single blank line between groups**
4. **No circular dependencies** (punishable by exile)

## Testing Dogma

See [TESTING.md](./TESTING.md) for the full gospel, but the essence:

### Tests Live Apart From Source

**Q:** "Why can't tests live with their functions?"
**A:** Because behavioral tests span multiple functions. Where would you put a test that verifies an entire pipeline? Think, then repent.

### The Testing Hierarchy

1. **E2E** — User journeys (gold standard)
2. **Integration** — Functions working together
3. **Property-based** — Mathematical truth
4. **Unit** — Last resort for the desperate

### The Coverage Commandment

**100% reported coverage. NO EXCEPTIONS.**

Less than 100%? You have untested code that WILL break. Can't test it? Add `deno-coverage-ignore` with a REASON. No reason? Then test it. See [TESTING.md](./TESTING.md#the-coverage-doctrine-100-or-death) for the full doctrine.

### What Gets Tested

- **Behaviors** — What users experience
- **Properties** — Mathematical laws
- **Accessibility** — WCAG AAA for HTML
- **Progressive Enhancement** — All three layers

### What Doesn't Get Tested

- Implementation details
- Private methods (they don't exist)
- Things TypeScript already guarantees
- Lines we've explicitly ignored (with documented reasons)

## The Seven Deadly Coding Sins

### 1. Assumption (The Gateway Sin)
```typescript
// ❌ "I'll assume this works like React"
// ❌ "This probably returns a string"
// ❌ "The user surely has JavaScript"

// ✅ Verify, test, confirm
```

### 2. Premature Optimization
```typescript
// ❌ Optimizing before measuring
// ❌ Caching everything preemptively
// ❌ Micro-optimizations that hurt readability

// ✅ Measure, then optimize
```

### 3. Class-Based Thinking
```typescript
// ❌ class UserService { }
// ❌ this.setState()
// ❌ inheritance hierarchies

// ✅ Pure functions
// ✅ Composition
// ✅ Immutable data
```

### 4. Mocking Our Own Code
```typescript
// ❌ const mockAdd = jest.fn()
// ❌ Testing implementation, not behavior

// ✅ Test real functions
// ✅ Test actual outcomes
```

### 5. Tech Debt Accumulation
```typescript
// ❌ // TODO: Fix this later
// ❌ // Temporary workaround
// ❌ // Will refactor in v2

// ✅ Fix it now or don't write it
```

### 6. Accessibility Afterthought
```typescript
// ❌ "We'll add ARIA labels later"
// ❌ "Keyboard nav in phase 2"
// ❌ "Screen readers are edge cases"

// ✅ Accessibility from day one
```

### 7. Monolithic Functions
```typescript
// ❌ 500-line function doing everything
// ❌ Multiple responsibilities
// ❌ Untestable mess

// ✅ Small, focused, composable
```

## Tools of the Trade

### Build Commands
```bash
# Development
deno task dev         # Start dev server
deno task test        # Run tests
deno task fmt         # Format code
deno task lint        # Lint code
deno task typecheck   # Type check

# Production
deno task build       # Build for production
deno task deploy      # Deploy to Deno Deploy
```

### Git Discipline

#### Conventional Commits Are Law
```bash
feat: add new component
fix: resolve calculation error
docs: update testing guide
chore: upgrade dependencies
refactor: simplify pipe function
test: add integration tests
```

#### Commit Rules
1. **Atomic** — One logical change
2. **Focused** — Don't mix concerns
3. **Tested** — Green tests before commit
4. **Descriptive** — Why, not just what

### Code Style Enforcement

- **Tabs** for indentation (not spaces, heathens)
- **80 character** line limit (read it on a phone)
- **No semicolons** (Deno agrees)
- **Array<T>** not `T[]` (explicitness matters)
- **`const` only** (let and var are banned)

## The TODO List of Shame

These tasks remain undone. Each one is a mark against us:

### Testing Debt
- Document test helpers (they exist in darkness)
- Add E2E examples for toolkit compositions
- Verify integration test coverage
- Create standardized test data generators

### Documentation Debt
- CSS collection system remains mysterious
- Enhancement scripts lack explanation
- Build process needs complete documentation

### Future Promises
- Complete maths library parser
- Implement distributed CRDTs
- Finish web3 integrations
- VSCode plugin development

## The Final Warning

### Remember These Truths

1. **This codebase has zero dependencies by design** — Keep it that way
2. **Everything works without JavaScript** — No exceptions
3. **Tests verify behaviors, not implementations** — User-first always
4. **Functional programming is not negotiable** — Classes are heresy
5. **Accessibility is a right** — WCAG AAA or nothing

### Your Sacred Oath

By using this codebase, you swear to:

- Never assume when you can verify
- Never guess when you can check
- Never shortcut when you can do it right
- Never create debt without paying it immediately
- Never commit broken code
- Never ignore accessibility
- Never mock our own functions
- Never write classes
- Never forget the user
- Always ask when uncertain

### Performance Constraints

If you detect rate limits or performance issues, **TELL ME IMMEDIATELY**. Do not attempt clever workarounds. Do not pretend everything is fine. Do not hope it goes away.

### The Bottom Line

**DO THE WORK RIGHT OR DON'T DO IT AT ALL.**

There are no points for trying. There are no participation trophies. There is only working code that serves users well, or there is failure.

Choose wisely.

---

*"In 30 years, I've seen every shortcut lead to a cliff. Don't be another cautionary tale."*

*— The Architect*

*Last updated by an AI who finally understood the assignment.*
*Previous updates by AIs who thought they knew better.*
*They were wrong.*
