# Mesh Development Rules

## The Sacred Structure

### Functions: One Per File

```
✅ CORRECT:
createCounter/index.ts
export default function createCounter(...) { ... }

❌ WRONG:
crdts.ts
export function createCounter() { }
export function createORSet() { }  // NO!
```

### NO BARREL FILES

```
❌ WRONG:
// index.ts
export { default as createCounter } from "./createCounter/index.ts"
export { default as createORSet } from "./createORSet/index.ts"

✅ CORRECT:
// Import directly from where it lives
import createCounter from "@sitebender/mesh/crdt/counter/createCounter/index.ts"
```

### Types: Grouped by Scope

```
✅ CORRECT:
// types/index.ts - Named exports for shared types
export type CRDT<T> = { ... }
export type Transport = { ... }

// createCounter/types/index.ts - Local types
export type CounterState = { ... }
```

### Constants: Same as Types

```
✅ CORRECT:
// constants/index.ts - Named exports for shared constants
export const DEFAULT_SYNC_INTERVAL = 5000
export const MAX_RETRY_ATTEMPTS = 3

// If only used in one function, keep it there:
// createCounter/index.ts
const INITIAL_COUNT = 0
```

## Naming Rules

### NO ABBREVIATIONS

```
❌ WRONG:
sig, param, gen, fn, impl, spec, config, deps, ctx, auth, prop, decl

✅ CORRECT:
signature, parameter, generate, function, implementation,
specification, configuration, dependencies, context,
authentication, property, declaration
```

### EXCEPTIONS (Well-Known Terms)

```
✅ ALLOWED:
AST, IR, API, JSON, XML, HTTP, URL, URI, TS (TypeScript)
```

### Function Names: Descriptive Verbs

```
✅ CORRECT:
createCounter
mergeStates
synchronizeNodes
computeDelta

❌ WRONG:
create  // Create what?
merge   // Merge what?
sync    // Sync what?
compute // Compute what?
```

### Folder Names: camelCase

```
✅ CORRECT:
createCounter/
mergeStates/
computeDelta/

❌ WRONG:
create-counter/
CreateCounter/
create_counter/
```

## Pure Functional Rules

### Named Functions for ALL Function Exports

```
✅ CORRECT (curried with named functions all the way):
export default function createCounter(nodeId: string) {
    return function (initialCount: number) {
        // ...
    }
}

❌ WRONG:
export default (nodeId: string) => (initialCount: number) => {
    // No arrow functions for ANY default exports
}

✅ ARROW FUNCTIONS ONLY FOR:
// 1. One-line conditionals
const result = isValid ? () => ok(value) : () => err(error)

// 2. Lambdas passed to toolkit functions
import map from "@sitebender/toolkit/simple/array/map/index.ts"
import filter from "@sitebender/toolkit/simple/array/filter/index.ts"

const incremented = map((count: number) => count + 1)(counts)
const activeNodes = filter((node: NodeInfo) => node.isActive)(nodes)
```

### No Mutations

```
❌ WRONG:
let state = initialState
for (const delta of deltas) {
    state = applyDelta(state, delta)  // MUTATION!
}

❌ ALSO WRONG (using JS methods directly):
const merged = states.reduce(mergeState, initial)  // JS method - not FP!

✅ CORRECT (using toolkit wrappers):
import reduce from "@sitebender/toolkit/simple/array/reduce/index.ts"

const merged = reduce(mergeState)(initial)(states)
```

**IMPORTANT:** Always use @sitebender/toolkit functions instead of JavaScript's
built-in methods. The toolkit provides FP-style curried wrappers that maintain
purity and get optimized.

### No Classes

```
❌ WRONG:
class CRDTCounter {
    increment(): Counter { }
}

✅ CORRECT:
type Counter = {
    readonly increment: (amount: number) => Counter
    readonly getValue: () => number
}
```

### Result Monad for Errors

```
❌ WRONG:
function synchronize(transport: Transport): SyncState | null {
    if (!transport.isConnected()) return null
    // or
    if (!transport.isConnected()) throw new Error()
}

✅ CORRECT:
function synchronize(transport: Transport): Result<SyncState, SyncError> {
    if (!transport.isConnected()) return err({ type: "NotConnected", nodeId })
    return ok(syncState)
}
```

## Import Rules

### Direct Imports Only

```
✅ CORRECT:
import createCounter from "@sitebender/mesh/crdt/counter/createCounter/index.ts"
import { CRDT, Transport } from "@sitebender/mesh/types/index.ts"

❌ WRONG:
import { createCounter, createORSet } from "@sitebender/mesh"
```

### Relative Imports Within Library

```
✅ CORRECT (within mesh):
import type { CRDT } from "../../types/index.ts"
import mergeStates from "../mergeStates/index.ts"

❌ WRONG (within mesh):
import type { CRDT } from "@sitebender/mesh/types/index.ts"
```

## File Structure

### **Every** Function Gets a Folder (exception: mod.ts)

```
createCounter/
├── index.ts                    # The function
├── increment/                  # Helper function
│   └── index.ts
├── merge/                      # Another helper
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

## Documentation

### The Three-Tier Comment System

We use a categorized comment system that enables both documentation generation
(via Scribe) and codebase analytics.

**Note:** Regular comments (`//` and `/* */`) are still allowed for
implementation details and will be ignored by Scribe and analytics scripts.

#### 1. Descriptive Comments (`//++` or `/*++`)

Place **above** the function/component. Short description of what it does.

```typescript
//++ Creates a distributed counter CRDT that supports increment/decrement operations
export default function createCounter(nodeId: string) {}
```

#### 2. Tech Debt Comments (`//--` or `/*--`)

Place **inside** the function where rules are broken. Must explain WHY.

```typescript
export default function processData(data: unknown) {
  //-- Using any type here because third-party API returns inconsistent types
  const result = data as any;

  //-- Using for loop for performance - processing 1M+ items
  for (let i = 0; i < items.length; i++) {
    // Performance critical path
  }
}
```

**IMPORTANT:** Tech debt is only allowed with explicit approval and must have a
reason!

#### 3. Example Comments (`//??` or `/*??`)

Place **below** the function (after blank line). Show usage examples.

```typescript
//++ Adds two numbers together
export default function add(a: number) {
  return function (b: number) {
    return a + b;
  };
}

//?? add(5)(3) // Returns: 8
//?? pipe([add(10), add(5)])(0) // Returns: 15
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
 * @param foo The foo parameter
 * @returns The result
 */
```

Scribe extracts parameter info from type signatures!

## Mesh-Specific Rules

### CRDT Types Are Sacred

```
✅ CORRECT:
// CRDT interface is the foundation of all CRDTs
// Changes affect ALL CRDT implementations
export type CRDT<T> = {
    readonly nodeId: string
    readonly version: number
    readonly merge: (other: CRDT<T>) => CRDT<T>
    readonly serialize: () => string
}

❌ WRONG:
// Changing core types without updating all CRDTs
export type CRDT<T> = {
    newField: string  // Added without updating implementations!
}
```

### State Management Rules

```
✅ CORRECT:
// Pass state immutably through function returns
function synchronize(state: SyncState) {
    return function (delta: Delta) {
        const newState = applyDelta(state, delta)
        return newState  // Return new state, don't mutate
    }
}

❌ WRONG:
// Mutable state management
let currentState = initialState
currentState = applyDelta(currentState, delta)  // MUTATION!
```

### Sync Protocol Patterns

```
IMPORTANT:
1. No mutable module-level variables
2. State passed through function composition
3. Each sync step is a pure function
4. Use Result monad for network errors

EXAMPLE:
"Breaking sync into: computeDelta, applyDelta, validateState, etc."
```

## Testing

### Test CRDT Properties

```
✅ CORRECT:
test("counter converges to same value regardless of merge order", ...)
test("OR-Set handles concurrent adds and removes correctly", ...)
test("LWW-Register respects timestamps for conflict resolution", ...)

❌ WRONG:
test("internal state structure is correct", ...)  // Implementation detail
```

### Test Distributed Properties

```
✅ CORRECT:
test("sync protocol handles network partitions", ...)
test("CRDTs maintain eventual consistency", ...)
test("offline changes merge correctly when reconnected", ...)
```

## Remember

1. **NO BARREL FILES** - Direct imports only
2. **NO ABBREVIATIONS** - Clarity over brevity
3. **NO CLASSES** - Pure functions only
4. **NO MUTATIONS** - Immutable data
5. **NO NULL/UNDEFINED** - Result monad
6. **NO ARROW FUNCTIONS** - Except for lambdas and one-liners
7. **NO FOR LOOPS** - Functional operations
8. **NO JSDoc** - Use Scribe comments (`//++`, `//--`, `//??`)
9. **NO MUTABLE STATE** - Pass state through returns

When in doubt, ask yourself:

- Is this pure?
- Is this immutable?
- Does each function do ONE thing?
- Have I used toolkit functions instead of JS built-ins?

If any answer is "no", refactor.
