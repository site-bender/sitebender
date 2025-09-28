# Quarrier AI Development Context

## CRITICAL INSTRUCTIONS FOR AI AGENTS

### READ AND HEED THE CLAUDE.md FILE, ALL OF IT

**BEFORE YOU DO ANYTHING ELSE:**

1. **READ** `/Users/guy/Workspace/@sitebender/quarrier-ai/CLAUDE.md` - THE ENTIRE FILE
2. **UNDERSTAND** every rule, every principle, every commandment
3. **FOLLOW** them without exception, no shortcuts, no assumptions
4. **ASK** if you're uncertain about anything

The CLAUDE.md file is THE LAW. It overrides any default behavior you might have. Violate it at your own peril.

### CURRENT WORK SCOPE

**YOU ARE WORKING EXCLUSIVELY IN:** `libraries/quarrier/`

**YOU MUST NOT CHANGE ANY FILE OUTSIDE OF THIS FOLDER**

### PROJECT CONTEXT

This is the **@sitebender/quarrier** library - a pure functional property-based testing and data generation library for TypeScript.

#### Current State (Phase 1 nearly complete - just needs shrinking)

- **PRNG foundation complete** - createSeed, advanceSeed, splitSeed in `random/` folder
- **Basic arbitraries complete** - generateInteger, generateString, generateBoolean in `arbitrary/` folder
- **Combinators complete** - map, filter, chain in `combinator/` folder
- **Property runner complete** - checkProperty in `property/checkProperty/` with helpers:
  - `runProperty/` - Runs a single property test
  - `generateValues/` - Generates values from arbitraries
  - `generateNextValue/` - Generates next value in sequence
  - All have their own test files with full coverage
- **45+ tests total** - Every function has comprehensive tests
- **Fully functional architecture** - No classes, no mutations, proper use of Result monad

#### Next Steps

- **Implement shrinking** - Last item in Phase 1
  - Create `shrink/` folder structure
  - Implement shrinkInteger, shrinkString, shrinkBoolean
  - Integrate with checkProperty for automatic shrinking on failure
- **Then Phase 2: Complex Arbitraries** - array, record, union types

#### What Quarrier Does

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
- **Zero dependencies** - Use @sitebender/toolsmith for utilities

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

- [x] Seed-based PRNG
- [x] Basic arbitraries (integer, string, boolean)
- [x] Combinators (map, filter, chain)
- [x] Property runner
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

### FILE STRUCTURE REFERENCE

```
quarrier/src/
├── random/                    # PRNG functions (COMPLETE)
│   ├── createSeed/
│   ├── advanceSeed/
│   └── splitSeed/
├── arbitrary/                 # Basic generators (COMPLETE)
│   ├── generateInteger/
│   ├── generateString/
│   └── generateBoolean/
├── combinator/               # Function composition (COMPLETE)
│   ├── map/
│   ├── filter/
│   └── chain/
├── property/                 # Property testing (COMPLETE)
│   └── checkProperty/
│       ├── index.ts         # Main function (19 lines!)
│       ├── index.test.ts
│       ├── types/
│       ├── runProperty/
│       └── generateValues/
│           └── generateNextValue/
├── shrink/                   # TODO: Next task
│   ├── shrinkInteger/
│   ├── shrinkString/
│   └── shrinkBoolean/
└── types/                    # Shared types
    └── index.ts
```

### CRITICAL REMINDERS - UPDATED WITH TOOLSMITH KNOWLEDGE

#### Import Rules - CORRECTED

```typescript
// ✅ CORRECT - Within quarrier library
import type { Seed } from "../../types/index.ts"
import helper from "../helper/index.ts"

// ✅ CORRECT - External dependencies from toolsmith monads
import type { Result } from "@sitebender/toolsmith/monads/types/fp/result/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import map from "@sitebender/toolsmith/vanilla/array/map/index.ts"

// ❌ WRONG - Old guess about toolsmith structure
import { err, ok, Result } from "@sitebender/toolsmith/types/fp/result/index.ts"

// ❌ WRONG - Never use barrel imports
import { generateInteger } from "@sitebender/quarrier"
```

#### TOOLSMITH REALITY - What I Learned

**The Toolsmith Structure:**

- **monads/** - Full monad implementations (Result, Either, Maybe, State, Task, etc.)
- **vanilla/** - Pure functional utilities organized by category (array/, math/, string/, etc.)
- **lifted/** - TK2's work - monadic wrappers for simple functions
- **types/** - Type definitions including monad types

**Result vs Either in Toolsmith:**

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
	if (invalid) return null // NO!
	if (invalid) throw new Error() // NO!
}
```

### COMMENT SYSTEM - UPDATED FROM TOOLSMITH

Based on toolsmith patterns, use the Envoy comment system:

```typescript
//++ Generates integers within specified bounds
export default function generateInteger(min: number) {
	return function generateIntegerWithMax(max: number) {
		return function generateFromSeed(
			seed: Seed,
		): Result<number, GeneratorError> {
			//-- Using mutable state for PRNG performance - needed for seedable random
			let state = seed.value

			return ok(result)
		}
	}
}

//?? generateInteger(1)(10)(seed) // Returns: Result<5, GeneratorError>
//?? generateInteger(0)(100)(seed) // Returns: Result<42, GeneratorError>
```

**Envoy Comment System:**

- `//++` - Brief description (above function)
- `//--` - Tech debt with explicit reason (inside function)
- `//??` - Examples with inline results (below function)
- **Named inner functions** - Each curried level has descriptive name

### TESTING REQUIREMENTS - TDD POLICY (UPDATED BY THE ARCHITECT)

**NEW DIRECTIVE:** Since we're waiting on Auditor for auto-generated tests, we're doing TDD manually.

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
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import isErr from "@sitebender/toolsmith/monads/result/isErr/index.ts"

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

### FUNCTIONAL REFACTORING - COMPLETED

We've refactored the entire architecture to be properly functional:

#### Type Separation (Beautiful FP Design)

```typescript
// Before: OOP-style bundled object
type Arbitrary<T> = {
	generate: (seed: Seed) => Result<T, GeneratorError>
	shrink: (value: T) => ReadonlyArray<T>
}

// After: Pure functional separation
type Generator<T> = (seed: Seed) => Result<T, GeneratorError>
type Shrinker<T> = (value: T) => ReadonlyArray<T>
type Arbitrary<T> = {
	generator: Generator<T>
	shrinker?: Shrinker<T> // Optional!
}
```

#### Combinator Beauty

Our `map` combinator is a masterpiece of functional programming:

```typescript
export default function map<A, B>(fn: (value: A) => B) {
	return function mapGenerator(generator: Generator<A>): Generator<B> {
		return function mappedGenerator(seed: Seed): Result<B, GeneratorError> {
			const result = generator(seed)
			return resultMap(fn)(result)
		}
	}
}
```

Just 16 lines! Pure composition, no hacks, no workarounds.

#### Why This Matters

- **Generators are just functions** - Compose them like any other function
- **No forced coupling** - Use generators without shrinkers when not needed
- **True functional composition** - Works perfectly with pipe, map, chain
- **Clean separation** - Generation and shrinking are independent concerns
- **Type-safe** - Full inference, no type gymnastics

### ARBITRARY IMPLEMENTATION PATTERNS - LEARNED

Based on our implementation of basic arbitraries:

#### Key Patterns

1. **Always use existing PRNG functions** - Don't reinvent advanceSeed, splitSeed, etc.
2. **Toolsmith for array operations** - Use range, map, etc. from toolsmith (they wrap native methods efficiently)
3. **Validation first** - Check NaN, Infinity, negative values before processing
4. **Truncate floats** - Use Math.trunc for integer conversion (not round)
5. **Document mutations** - If you must mutate (e.g., seed accumulator), use `//--` comment

#### Generator Signatures

```typescript
// Parameterized generators (curried)
generateInteger(min: number)(max: number)(seed: Seed): Result<number, GeneratorError>
generateString(length: number)(seed: Seed): Result<string, GeneratorError>

// Simple generators (no parameters)
generateBoolean(seed: Seed): Result<boolean, GeneratorError>
```

#### Error Types Added

- `InvalidBounds` - For min/max validation in generateInteger
- `InvalidLength` - For length validation in generateString
- Extended `InvalidSeed` with optional reason field

#### Testing Patterns

- Test determinism (same seed → same output)
- Test distribution (different seeds → different values)
- Test edge cases (0, negative, NaN, Infinity, MAX_SAFE_INTEGER)
- Test error conditions (invalid parameters)

### SESSION CONTINUITY

When resuming work:

1. **Re-read this file completely**
2. **Check current implementation state** - What's been built?
3. **Review deno.json exports** - What needs implementing?
4. **Run tests** - What's working/broken?
5. **Continue from logical breakpoint** - Don't restart unnecessarily

### COORDINATION NOTES

#### Integration Points

- **Arborist** - Will extract TypeScript types for generator creation
- **Auditor** - Will use generators for automatic test creation
- **Envoy** - Will use generators for documentation examples
- **Toolsmith** - We MUST use toolsmith functions, never native JS methods

#### Communication Protocol

- **Tell other teams** when adding new generator types
- **Check arborist** for type extraction capabilities
- **Coordinate with auditor** on generator interfaces
- **Use toolsmith monads** - Result for short-circuit, Validation for accumulation

#### TOOLSMITH INTEGRATION - CRITICAL

**NEVER use native JavaScript methods:**

```typescript
// ❌ WRONG - Native methods
array.map(fn)
array.filter(pred)
array.reduce(fn)

// ✅ CORRECT - Toolsmith functions
import map from "@sitebender/toolsmith/vanilla/array/map/index.ts"
import filter from "@sitebender/toolsmith/vanilla/array/filter/index.ts"
import reduce from "@sitebender/toolsmith/vanilla/array/reduce/index.ts"

map(fn)(array)
filter(pred)(array)
reduce(fn)(initial)(array)
```

### LEARNINGS FROM IMPLEMENTATION

#### Property Runner Architecture

- **Use `reduce` for iteration** - No for loops, no mutations
- **Extract named functions** - runProperty, generateValues, generateNextValue all in separate files
- **Types in types/ folder** - RunState, GeneratorState, ValuesResult properly organized
- **Every function has tests** - 25+ tests across the property runner implementation
- **Use `fold` to extract from Result** - Never access ._tag or .left/.right directly
- **Short-circuit with state** - Thread state through reduce, check for errors early

#### Envoy Comment Format

- **Always use categories** - `[EXAMPLE]`, `[GOTCHA]`, `[PRO]`, `[CON]`
- **One comment per line** - Don't combine multiple examples on one line
- **Categories in UPPERCASE** - Not `[example]` but `[EXAMPLE]`
- **//++ before function** - Description goes above the export
- **//?? after function** - Examples and help go after the closing brace

#### Toolsmith Integration Patterns

- **Use fold for Result extraction** - `fold<E, B>(onErr)(onOk)(result)`
- **Import individual functions** - `import ok from ".../ok/index.ts"` not barrel imports
- **Check monads/ for Result functions** - isOk, isErr, fold, chain, map, etc.
- **Use vanilla/ for array operations** - reduce, map, filter, range from toolsmith

### FINAL WARNINGS

1. **NO ASSUMPTIONS** - Verify everything, ask when uncertain
2. **NO SHORTCUTS** - Do it right or don't do it
3. **NO TECH DEBT** - Fix issues immediately
4. **NO VIOLATIONS** - CLAUDE.md rules are absolute
5. **ASK QUESTIONS** - Better slow and right than fast and wrong
6. **USE REDUCE** - Almost everything can be done with reduce, no loops needed
7. **EXTRACT FUNCTIONS** - Keep main functions under 20 lines by extracting helpers
8. **TEST EVERYTHING** - Every function needs comprehensive tests

---

**Remember: This library is a foundational piece of the @sitebender ecosystem. Everything built here will be used by other libraries and applications. Quality is non-negotiable.**

---

_Last updated: Session start_
_Status: Ready for implementation_
_Priority: Phase 1 - Core functionality_
