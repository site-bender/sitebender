# Foundry Development Rules

## The Sacred Structure

### Functions: One Per File
```
✅ CORRECT:
arbitrary/integer/index.ts
export default function integer(...) { ... }

❌ WRONG:
arbitrary/generators.ts
export function integer() { }
export function string() { }  // NO!
```

### NO BARREL FILES
```
❌ WRONG:
// arbitrary/index.ts
export { default as integer } from "./integer/index.ts"
export { default as string } from "./string/index.ts"

✅ CORRECT:
// Import directly from where it lives
import integer from "@sitebender/foundry/arbitrary/integer"
```

### Types: Grouped by Scope
```
✅ CORRECT:
// types/index.ts - Named exports for shared types
export type Seed = { ... }
export type Arbitrary<T> = { ... }

// arbitrary/integer/types/index.ts - Local types
export type IntegerConstraints = { ... }
```

### Constants: Same as Types
```
✅ CORRECT:
// constants/index.ts - Named exports for shared constants
export const DEFAULT_RUNS = 100
export const MAX_SHRINK_DEPTH = 1000

// If only used in one function, keep it there:
// arbitrary/integer/index.ts
const MIN_SAFE_INTEGER = -2147483648
```

## Naming Rules

### NO ABBREVIATIONS
```
❌ WRONG:
args, config, gen, arb, pred, ctx, req, res, auth, impl

✅ CORRECT:
arguments, configuration, generate, arbitrary, predicate, 
context, request, response, authentication, implementation
```

### EXCEPTIONS (Well-Known Acronyms/Initialisms)
```
✅ ALLOWED:
RDF, SPARQL, OWL, URI, IRI, URL, API, HTML, CSS, JSON, XML
```

### Function Names: Descriptive Verbs
```
✅ CORRECT:
generateInteger
shrinkToMinimal
checkProperty
createArbitrary

❌ WRONG:
intGen
shrink  // Too vague
check   // Check what?
make    // Make what?
```

### Folder Names: camelCase
```
✅ CORRECT:
generateInteger/
shrinkToMinimal/
checkProperty/

❌ WRONG:
generate-integer/
GenerateInteger/
generate_integer/
```

## Pure Functional Rules

### Named Functions for ALL Function Exports
```
✅ CORRECT (curried with named functions all the way):
export default function generateInteger(min: number) {
    return function (max: number) {
        return function (seed: Seed) {
            // ...
        }
    }
}

❌ WRONG:
export default (min: number) => (max: number) => (seed: Seed) => {
    // No arrow functions for ANY default exports
}

✅ ARROW FUNCTIONS ONLY FOR:
// 1. One-line conditionals
const result = isValid ? () => ok(value) : () => err(error)

// 2. Lambdas passed to toolkit functions
import map from "@sitebender/toolkit/simple/array/map/index.ts"
import filter from "@sitebender/toolkit/simple/array/filter/index.ts"

const doubled = map((x: number) => x * 2)(array)
const filtered = filter((x: number) => x > 0)(array)
```

### No Mutations
```
❌ WRONG:
let result = []
for (const item of items) {
    result.push(transform(item))
}

❌ ALSO WRONG (using JS methods directly):
const result = items.map(transform)  // JS method - not FP!

✅ CORRECT (using toolkit wrappers):
import map from "@sitebender/toolkit/simple/array/map/index.ts"

const result = map(transform)(items)
```

**IMPORTANT:** Always use @sitebender/toolkit functions instead of JavaScript's built-in methods. The toolkit provides FP-style curried wrappers that maintain purity and get optimized.

### No Classes
```
❌ WRONG:
class Generator<T> {
    generate(seed: Seed): T { }
}

✅ CORRECT:
type Generator<T> = {
    readonly generate: (seed: Seed) => T
}
```

### Result Monad for Errors
```
❌ WRONG:
function generate(seed: Seed): T | null {
    if (invalid) return null
    // or
    if (invalid) throw new Error()
}

✅ CORRECT:
function generate(seed: Seed): Result<T, GeneratorError> {
    if (invalid) return err({ type: "InvalidSeed", seed })
    return ok(value)
}
```

## Import Rules

### Direct Imports Only
```
✅ CORRECT:
import integer from "@sitebender/foundry/arbitrary/integer"
import { Seed, Arbitrary } from "@sitebender/foundry/types"

❌ WRONG:
import { integer, string, boolean } from "@sitebender/foundry"
```

### Relative Imports Within Library
```
✅ CORRECT (within foundry):
import type { Seed } from "../../types/index.ts"
import shrinkInteger from "../shrinkInteger/index.ts"

❌ WRONG (within foundry):
import type { Seed } from "@sitebender/foundry/types"
```

## File Structure

### Every Function Gets a Folder
```
arbitrary/
├── integer/
│   ├── index.ts           # The function
│   ├── shrinkInteger/     # Helper function
│   │   └── index.ts
│   ├── validateBounds/    # Another helper
│   │   └── index.ts
│   ├── types/
│   │   └── index.ts       # Local types
│   └── constants/
│       └── index.ts       # Local constants
```

### Types Hierarchy
```
Place types at the lowest common ancestor:
- Used in one function? → function/types/index.ts
- Used in one module? → module/types/index.ts  
- Used everywhere? → src/types/index.ts
```

## The Result Monad Rule

Every operation that can fail MUST return a Result:

```typescript
✅ CORRECT:
function generatePerson(seed: Seed): Result<Person, GeneratorError> {
    return generateFirstName(seed)
        .chain(firstName => 
            generateLastName(seed).map(lastName => ({
                firstName,
                lastName
            }))
        )
}

❌ WRONG:
function generatePerson(seed: Seed): Person | undefined {
    const firstName = generateFirstName(seed)
    if (!firstName) return undefined
    // ...
}
```

## Testing Rules

### Test Behaviors, Not Implementation
```
✅ CORRECT:
test("generates integers within bounds", ...)

❌ WRONG:
test("calls randomSeed function", ...)
```

### Property Tests Over Examples
```
✅ CORRECT:
property("all generated integers are within bounds",
    [seed(), integerBounds()],
    ([seed, bounds]) => {
        const result = integer(bounds)(seed)
        return result.map(n => 
            n >= bounds.min && n <= bounds.max
        ).getOrElse(false)
    }
)

❌ WRONG:
test("generates 5 when seed is 42", ...)
```

## Documentation

### The Three-Tier Comment System

We use a categorized comment system that enables both documentation generation (via Scribe) and codebase analytics.

**Note:** Regular comments (`//` and `/* */`) are still allowed for implementation details and will be ignored by Scribe and analytics scripts.

#### 1. Descriptive Comments (`//++` or `/*++`)
Place **above** the function/component. Short description of what it does.
```typescript
//++ Generates an integer within the specified bounds
export default function generateInteger(min: number) { }
```

#### 2. Tech Debt Comments (`//--` or `/*--`)
Place **inside** the function where rules are broken. Must explain WHY.
```typescript
export default function generateRandom(seed: Seed) {
	//-- Mutable state required for PRNG algorithm
	let state = seed.value
	
	//-- Using bitwise ops for performance - generates millions of values
	state = (state * 1103515245 + 12345) & 0x7fffffff
}
```

**IMPORTANT:** Tech debt is only allowed with explicit approval and must have a reason!

#### 3. Example Comments (`//??` or `/*??`)
Place **below** the function (after blank line). Show usage examples.
```typescript
//++ Generates integers between min and max
export default function integer(min: number) {
	return function (max: number) {
		// Implementation
	}
}

//?? integer(1)(10)(seed) // Returns: Result<5, GeneratorError>
//?? integer(0)(100)(seed) // Returns: Result<42, GeneratorError>
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
 * @param min The minimum value
 * @returns A generator
 */
```

Scribe extracts parameter info from type signatures!

## Remember

1. **NO BARREL FILES** - Direct imports only
2. **NO ABBREVIATIONS** - Clarity over brevity
3. **NO CLASSES** - Pure functions only
4. **NO MUTATIONS** - Immutable data
5. **NO NULL/UNDEFINED** - Result monad
6. **NO ARROW FUNCTIONS** - Except for lambdas and one-liners
7. **NO FOR LOOPS** - Functional operations
8. **NO JSDoc** - Single-line comments only

When in doubt, ask yourself:
- Is this pure?
- Is this immutable?
- Is this clear to read?
- Does this follow the sacred structure?

If any answer is "no", refactor.