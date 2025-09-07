# Prover Development Rules

## The Sacred Structure

### Functions: One Per File

```
✅ CORRECT:
generateTests/index.ts
export default function generateTests(...) { ... }

❌ WRONG:
generators.ts
export function generateTests() { }
export function generateEdgeCases() { }  // NO!
```

### NO BARREL FILES

```
❌ WRONG:
// index.ts
export { default as generateTests } from "./generateTests/index.ts"
export { default as parseSignature } from "./parseSignature/index.ts"

✅ CORRECT:
// Import directly from where it lives
import generateTests from "@sitebender/prover/generateTests"
```

### Types: Grouped by Scope

```
✅ CORRECT:
// types/index.ts - Named exports for shared types
export type TestCase = { ... }
export type FunctionSignature = { ... }

// generateTests/types/index.ts - Local types
export type GenerationOptions = { ... }
```

### Constants: Same as Types

```
✅ CORRECT:
// constants/index.ts - Named exports for shared constants
export const DEFAULT_TEST_COUNT = 100
export const MAX_ITERATIONS = 1000

// If only used in one function, keep it there:
// generateTests/index.ts
const MIN_EDGE_CASES = 5
```

## Naming Rules

### NO ABBREVIATIONS

```
❌ WRONG:
sig, gen, fn, impl, spec, config, deps, ctx, auth

✅ CORRECT:
signature, generate, function, implementation, 
specification, configuration, dependencies, context, authentication
```

### EXCEPTIONS (Well-Known Terms)

```
✅ ALLOWED:
AST, IR, API, JSON, XML, HTTP, URL, URI
```

### Function Names: Descriptive Verbs

```
✅ CORRECT:
generateTests
parseSignature
extractBranches
validateCoverage

❌ WRONG:
gen
parse  // Parse what?
extract // Extract what?
validate // Validate what?
```

### Folder Names: camelCase

```
✅ CORRECT:
generateTests/
parseSignature/
extractBranches/

❌ WRONG:
generate-tests/
GenerateTests/
generate_tests/
```

## Pure Functional Rules

### Named Functions for ALL Function Exports

```
✅ CORRECT (curried with named functions all the way):
export default function generateTests(signature: FunctionSignature) {
    return function (options: GenerationOptions) {
        // ...
    }
}

❌ WRONG:
export default (signature: FunctionSignature) => (options: GenerationOptions) => {
    // No arrow functions for ANY default exports
}

✅ ARROW FUNCTIONS ONLY FOR:
// 1. One-line conditionals
const result = isValid ? () => ok(value) : () => err(error)

// 2. Lambdas passed to toolkit functions
import map from "@sitebender/toolkit/simple/array/map/index.ts"
import filter from "@sitebender/toolkit/simple/array/filter/index.ts"

const doubled = map((t: TestCase) => t.expectedOutput)(tests)
const filtered = filter((b: Branch) => b.isCovered)(branches)
```

### No Mutations

```
❌ WRONG:
let tests = []
for (const branch of branches) {
    tests.push(generateBranchTest(branch))
}

❌ ALSO WRONG (using JS methods directly):
const tests = branches.map(generateBranchTest)  // JS method - not FP!

✅ CORRECT (using toolkit wrappers):
import map from "@sitebender/toolkit/simple/array/map/index.ts"

const tests = map(generateBranchTest)(branches)
```

**IMPORTANT:** Always use @sitebender/toolkit functions instead of JavaScript's built-in methods. The toolkit provides FP-style curried wrappers that maintain purity and get optimized.

### No Classes

```
❌ WRONG:
class TestGenerator {
    generate(): TestCase[] { }
}

✅ CORRECT:
type TestGenerator = {
    readonly generate: () => ReadonlyArray<TestCase>
}
```

### Result Monad for Errors

```
❌ WRONG:
function parseSignature(code: string): FunctionSignature | null {
    if (invalid) return null
    // or
    if (invalid) throw new Error()
}

✅ CORRECT:
function parseSignature(code: string): Result<FunctionSignature, ParseError> {
    if (invalid) return err({ type: "InvalidSyntax", line })
    return ok(signature)
}
```

## Import Rules

### Direct Imports Only

```
✅ CORRECT:
import generateTests from "@sitebender/prover/generateTests"
import { TestCase, FunctionSignature } from "@sitebender/prover/types"

❌ WRONG:
import { generateTests, parseSignature } from "@sitebender/prover"
```

### Relative Imports Within Library

```
✅ CORRECT (within prover):
import type { TestCase } from "../../types/index.ts"
import extractParameters from "../extractParameters/index.ts"

❌ WRONG (within prover):
import type { TestCase } from "@sitebender/prover/types"
```

## File Structure

### Every Function Gets a Folder

```
generateTests/
├── index.ts                    # The function
├── generateEdgeCases/          # Helper function
│   └── index.ts
├── generatePropertyTests/      # Another helper
│   └── index.ts
├── types/
│   └── index.ts               # Local types
└── constants/
    └── index.ts               # Local constants
```

### Types Hierarchy

```
Place types at the lowest common ancestor:
- Used in one function? → function/types/index.ts
- Used in one module? → module/types/index.ts  
- Used everywhere? → src/types/index.ts
```

## Special Prover Rules

### Type-Aware Generation

```
✅ CORRECT:
// Generate appropriate test data based on TypeScript types
if (type === "string") {
    return generateStringTests(signature)
} else if (type === "number") {
    return generateNumberTests(signature)
}

❌ WRONG:
// Assuming undefined is valid for all types
return [undefined, null, 0, "", false]  // Not all types accept these!
```

### Coverage Is Sacred

```
✅ CORRECT:
// 100% coverage or explicit ignore with REASON
if (unreachable) {
    // deno-coverage-ignore REASON: TypeScript exhaustive check
    throw new Error("Unreachable")
}

❌ WRONG:
// Uncovered code with no explanation
if (someRareCondition) {
    // This might never run but who knows?
}
```

### Test Behaviors, Not Implementation

```
✅ CORRECT:
// Test that the function returns the expected type
assertEquals(typeof result, "string")

❌ WRONG:
// Test that it calls internal helper
assertEquals(mockHelper.calledTimes, 1)
```

## The ONE Exception: Memoization

For recursive algorithms like Levenshtein distance:

```typescript
✅ ALLOWED (performance critical):
function levenshteinDistance(a: string, b: string): number {
    const cache = new Map<string, number>()  // Mutable for memoization
    
    function compute(i: number, j: number): number {
        const key = `${i},${j}`
        if (cache.has(key)) return cache.get(key)!
        
        const result = // ... recursive computation
        cache.set(key, result)  // Mutation for performance
        return result
    }
    
    return compute(a.length, b.length)
}
```

## Documentation

### The Three-Tier Comment System

We use a categorized comment system that enables both documentation generation (via Scribe) and codebase analytics.

**Note:** Regular comments (`//` and `/* */`) are still allowed for implementation details and will be ignored by Scribe and analytics scripts.

#### 1. Descriptive Comments (`//++` or `/*++`)

Place **above** the function/component. Short description of what it does.

```typescript
//++ Generates test cases for a function signature
export default function generateTests(signature: FunctionSignature) {}
```

#### 2. Tech Debt Comments (`//--` or `/*--`)

Place **inside** the function where rules are broken. Must explain WHY.

```typescript
export default function analyzeBranches(code: string) {
	//-- Using regex instead of AST for now - parser library not ready
	const branches = code.match(/if\s*\(/g)

	//-- Mutable cache for memoization - performance critical with 10K+ branches
	const cache = new Map()
}
```

**IMPORTANT:** Tech debt is only allowed with explicit approval and must have a reason!

#### 3. Example Comments (`//??` or `/*??`)

Place **below** the function (after blank line). Show usage examples.

```typescript
//++ Generates property-based tests for a function
export default function generatePropertyTests(signature: FunctionSignature) {
	// Implementation
}

//?? generatePropertyTests(addSignature) // Returns functor law tests
//?? generatePropertyTests(mapSignature) // Returns array property tests
```

### Why This System?

1. **Scribe Integration** - Automatically extracts documentation
2. **Dashboard Analytics** - Can report on:
   - Number of tech debt instances
   - Examples per function (min/max/mean/median)
   - Functions with tech debt
3. **Clear Categories** - Easy to grep/search for specific comment types
4. **Enforcement** - Makes tech debt visible and trackable

### NO Traditional JSDoc

```
❌ WRONG:
/**
 * @param signature The function signature
 * @returns Test cases
 */
```

Scribe extracts parameter info from type signatures!

## Remember

1. **NO BARREL FILES** - Direct imports only
2. **NO ABBREVIATIONS** - Clarity over brevity
3. **NO CLASSES** - Pure functions only
4. **NO MUTATIONS** - Immutable data (except memoization)
5. **NO NULL/UNDEFINED** - Result monad for errors
6. **NO ARROW FUNCTIONS** - Except for lambdas and one-liners
7. **NO FOR LOOPS** - Functional operations (except for-await)
8. **NO JSDoc** - Single-line comments only
9. **100% COVERAGE** - Or explicit ignores with reasons

When in doubt, ask yourself:

- Is this pure?
- Is this immutable?
- Is this type-safe?
- Does this follow the sacred structure?

If any answer is "no", refactor.
