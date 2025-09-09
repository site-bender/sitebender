# Foundry AI Development Context

## CRITICAL INSTRUCTIONS FOR AI AGENTS

### READ AND HEED THE CLAUDE.md FILE, ALL OF IT

**BEFORE YOU DO ANYTHING ELSE:**

1. **READ** `/Users/guy/Workspace/@sitebender/foundry-ai/CLAUDE.md` - THE ENTIRE FILE
2. **UNDERSTAND** every rule, every principle, every commandment
3. **FOLLOW** them without exception, no shortcuts, no assumptions
4. **ASK** if you're uncertain about anything

The CLAUDE.md file is THE LAW. It overrides any default behavior you might have. Violate it at your own peril.

### CURRENT WORK SCOPE

**YOU ARE WORKING EXCLUSIVELY IN:** `libraries/foundry/`

**YOU MUST NOT CHANGE ANY FILE OUTSIDE OF THIS FOLDER**

### PROJECT CONTEXT

This is the **@sitebender/foundry** library - a pure functional property-based testing and data generation library for TypeScript.

#### Current State (as of session start)
- **Nearly empty skeleton** - Only basic types defined
- **23 exports declared** in deno.json but implementation missing
- **Ready for implementation** following @sitebender principles

#### What Foundry Does
1. **Property-Based Testing** - Generate test cases from mathematical properties
2. **Deterministic Data Generation** - Realistic fake data from seeds  
3. **Semantic Web Data** - RDF triples, ontologies, knowledge graphs

#### Key Files Already Present
- `deno.json` - Package configuration with all planned exports
- `README.md` - Comprehensive documentation and architecture
- `RULES.md` - Development rules and coding standards
- `src/types/index.ts` - Core type definitions (Seed, Arbitrary, Property, etc.)

### SACRED ARCHITECTURE PRINCIPLES

#### The Holy Trinity of Organization
1. **One function per file** - Each function gets its own `index.ts` in a folder
2. **Types grouped by scope** - At lowest common ancestor
3. **No barrel files** - Direct imports only

#### The Functional Commandments
- **Named functions only** - No arrow functions for exports
- **Pure functions** - No mutations, no side effects
- **Result monad** - No null/undefined, no throws
- **Zero dependencies** - Use @sitebender/toolkit for utilities

#### Example Structure
```
arbitrary/
├── generateInteger/
│   ├── index.ts           # Main function
│   ├── shrinkInteger/     # Helper function
│   │   └── index.ts
│   ├── types/
│   │   └── index.ts       # Local types
│   └── constants/
│       └── index.ts       # Local constants
```

### PLANNED IMPLEMENTATION ORDER

From README.md Phase 1-6:

#### Phase 1: Core (Week 1)
- [ ] Seed-based PRNG
- [ ] Basic arbitraries (integer, string, boolean)  
- [ ] Combinators (map, filter, chain)
- [ ] Property runner
- [ ] Basic shrinking

#### Phase 2: Arbitraries (Week 2)
- [ ] Complex types (array, record, union)
- [ ] Recursive arbitraries
- [ ] Weighted unions

#### Phase 3: Properties (Week 3)
- [ ] Mathematical laws (functor, monad, monoid)
- [ ] Custom property builders

#### Phase 4: Fake Data (Week 4)
- [ ] Person generators
- [ ] Address generators
- [ ] Company generators

#### Phase 5: Semantic Web (Week 5)
- [ ] RDF triple generation
- [ ] Ontology generation
- [ ] Knowledge graphs

#### Phase 6: Integration (Week 6)
- [ ] Ecosystem integration
- [ ] Performance optimization
- [ ] Documentation

### CRITICAL REMINDERS - UPDATED WITH TOOLKIT KNOWLEDGE

#### Import Rules - CORRECTED
```typescript
// ✅ CORRECT - Within foundry library
import type { Seed } from "../../types/index.ts"
import helper from "../helper/index.ts"

// ✅ CORRECT - External dependencies from toolkit monads
import { ok, err } from "@sitebender/toolkit/monads/result/ok/index.ts"
import type { Result } from "@sitebender/toolkit/monads/types/fp/result/index.ts"
import map from "@sitebender/toolkit/simple/array/map/index.ts"

// ❌ WRONG - Old guess about toolkit structure
import { Result, ok, err } from "@sitebender/toolkit/types/fp/result/index.ts"

// ❌ WRONG - Never use barrel imports  
import { generateInteger } from "@sitebender/foundry"
```

#### TOOLKIT REALITY - What I Learned

**The Toolkit Structure:**
- **monads/** - Full monad implementations (Result, Either, Maybe, State, Task, etc.)
- **simple/** - Pure functional utilities organized by category (array/, math/, string/, etc.)  
- **lifted/** - TK2's work - monadic wrappers for simple functions
- **types/** - Type definitions including monad types

**Result vs Either in Toolkit:**
- **Result** is just a wrapper around **Either** with different naming (ok/err vs right/left)
- Result monad is at `monads/result/` with operations like `ok`, `err`, `chain`, `map`
- Types are at `monads/types/fp/result/index.ts`

**Do-Notation System:**
- Comprehensive do-notation for 8+ monads (Result, Either, Maybe, State, Task, etc.)
- Uses generators with `function*` syntax (never arrow functions)
- `yield` unwraps values, `return` autowraps in monad
- TK has built full tutorial and working examples

**Validation vs Result:**
- **Validation monad** accumulates errors (doesn't short-circuit)  
- **Result monad** short-circuits on first error
- ValidationError type with field/messages structure
- NonEmptyArray type for guaranteed non-empty collections

#### Function Structure
```typescript
// ✅ CORRECT - Named function with currying
export default function generateInteger(min: number) {
    return function (max: number) {
        return function (seed: Seed): Result<number, GeneratorError> {
            // Implementation here
        }
    }
}

// ❌ WRONG - Arrow functions for exports
export default (min: number) => (max: number) => (seed: Seed) => {
    // Never do this for exports
}
```

#### Error Handling
```typescript
// ✅ CORRECT - Result monad everywhere
function generate(seed: Seed): Result<T, GeneratorError> {
    if (invalid) return err({ type: "InvalidSeed", seed })
    return ok(value)
}

// ❌ WRONG - Null, undefined, or throws
function generate(seed: Seed): T | null {
    if (invalid) return null  // NO!
    if (invalid) throw new Error()  // NO!
}
```

### COMMENT SYSTEM - UPDATED FROM TOOLKIT

Based on toolkit patterns, use the Scribe comment system:

```typescript
//++ Generates integers within specified bounds
export default function generateInteger(min: number) {
    return function generateIntegerWithMax(max: number) {
        return function generateFromSeed(seed: Seed): Result<number, GeneratorError> {
            //-- Using mutable state for PRNG performance - needed for seedable random
            let state = seed.value
            
            return ok(result)
        }
    }
}

//?? generateInteger(1)(10)(seed) // Returns: Result<5, GeneratorError>
//?? generateInteger(0)(100)(seed) // Returns: Result<42, GeneratorError>
```

**Scribe Comment System:**
- `//++` - Brief description (above function)
- `//--` - Tech debt with explicit reason (inside function)  
- `//??` - Examples with inline results (below function)
- **Named inner functions** - Each curried level has descriptive name

### TESTING REQUIREMENTS - TDD POLICY (UPDATED BY THE ARCHITECT)

**NEW DIRECTIVE:** Since we're waiting on Prover for auto-generated tests, we're doing TDD manually.

#### TDD Process for EVERY Function
1. **Write test FIRST** - In same folder as function, named `index.test.ts`
2. **Write minimal implementation** - Just enough to pass
3. **Refactor if needed** - Keep tests green

#### Test File Structure
```
arbitrary/
├── generateInteger/
│   ├── index.test.ts    # Write this FIRST
│   └── index.ts         # Then implement this
```

#### Test File Pattern - CORRECTED TO USE Deno.test
```typescript
// index.test.ts
import { assertEquals, assertExists } from "https://deno.land/std/assert/mod.ts"
import generateInteger from "./index.ts"
import type { Seed } from "../../types/index.ts"
import { isOk, isErr } from "@sitebender/toolkit/monads/result/isOk/index.ts"

Deno.test("generateInteger - generates integers within bounds", () => {
  const seed: Seed = { value: 12345, path: [] }
  const result = generateInteger(1)(10)(seed)
  assertExists(result)
  assertEquals(isOk(result), true)
  // Assert value is between 1 and 10
})

Deno.test("generateInteger - handles invalid bounds", () => {
  const seed: Seed = { value: 12345, path: [] }
  const result = generateInteger(10)(1)(seed)
  assertExists(result)
  assertEquals(isErr(result), true)
  // Assert has appropriate error
})
```

**REMEMBER:** 
- Write test FIRST
- One function per file
- Test in same folder as function
- Test behaviors, not implementation

### SESSION CONTINUITY

When resuming work:

1. **Re-read this file completely**
2. **Check current implementation state** - What's been built?
3. **Review deno.json exports** - What needs implementing?
4. **Run tests** - What's working/broken?
5. **Continue from logical breakpoint** - Don't restart unnecessarily

### COORDINATION NOTES

#### Integration Points
- **Parser** - Will extract TypeScript types for generator creation
- **Prover** - Will use generators for automatic test creation  
- **Scribe** - Will use generators for documentation examples
- **Toolkit** - We MUST use toolkit functions, never native JS methods

#### Communication Protocol
- **Tell other teams** when adding new generator types
- **Check parser** for type extraction capabilities  
- **Coordinate with prover** on generator interfaces
- **Use toolkit monads** - Result for short-circuit, Validation for accumulation

#### TOOLKIT INTEGRATION - CRITICAL
**NEVER use native JavaScript methods:**
```typescript
// ❌ WRONG - Native methods
array.map(fn)
array.filter(pred)  
array.reduce(fn)

// ✅ CORRECT - Toolkit functions
import map from "@sitebender/toolkit/simple/array/map/index.ts"
import filter from "@sitebender/toolkit/simple/array/filter/index.ts"
import reduce from "@sitebender/toolkit/simple/array/reduce/index.ts"

map(fn)(array)
filter(pred)(array)
reduce(fn)(initial)(array)
```

### FINAL WARNINGS

1. **NO ASSUMPTIONS** - Verify everything, ask when uncertain
2. **NO SHORTCUTS** - Do it right or don't do it
3. **NO TECH DEBT** - Fix issues immediately  
4. **NO VIOLATIONS** - CLAUDE.md rules are absolute
5. **ASK QUESTIONS** - Better slow and right than fast and wrong

---

**Remember: This library is a foundational piece of the @sitebender ecosystem. Everything built here will be used by other libraries and applications. Quality is non-negotiable.**

---

_Last updated: Session start_
_Status: Ready for implementation_
_Priority: Phase 1 - Core functionality_